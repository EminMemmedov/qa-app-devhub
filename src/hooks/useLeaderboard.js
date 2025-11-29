import { useState, useEffect } from 'react';
import { db } from '../lib/firebase';
import { collection, query, orderBy, limit, onSnapshot, doc, setDoc, where, getDocs } from 'firebase/firestore';
import { getStorageItem, setStorageItem } from '../utils/storage';
import { useGameProgress } from './useGameProgress';
import { useAchievements } from './useAchievements';

export function useLeaderboard() {
    const [leaders, setLeaders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [userProfile, setUserProfile] = useState(() => getStorageItem('qa_user_profile', null));
    
    const { xp, foundBugs } = useGameProgress();
    const { unlockedAchievements } = useAchievements();

    // Calculate level manually since it's not returned by useGameProgress
    const currentLevel = Math.floor(xp / 500) + 1;

    // Determine collection name based on environment (dev or prod)
    const COLLECTION_NAME = import.meta.env.DEV ? 'users_test' : 'users';

    // 1. Listen to leaderboard changes in real-time
    useEffect(() => {
        const q = query(
            collection(db, COLLECTION_NAME),
            orderBy('xp', 'desc'),
            limit(50) // Top 50
        );

        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const users = [];
            querySnapshot.forEach((doc) => {
                users.push({ id: doc.id, ...doc.data() });
            });
            setLeaders(users);
            setLoading(false);
        }, (error) => {
            console.error("Error getting leaderboard:", error);
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    // 2. Sync current user data to Firestore
    useEffect(() => {
        const syncUser = async () => {
            if (!userProfile?.uid) return;

            try {
                // Gather all progress data from LocalStorage
                const dbLevels = getStorageItem('qa_db_completed_levels', []);
                const autoLevels = getStorageItem('qa_automation_completed_levels', []);
                const apiLevels = getStorageItem('qa_api_completed_levels', []);
                const mobileLevels = getStorageItem('qa_mobile_completed_levels', []);

                const progressData = {
                    foundBugs: foundBugs || [],
                    completedLevels: {
                        sql: dbLevels,
                        automation: autoLevels,
                        api: apiLevels,
                        mobile: mobileLevels
                    }
                };

                await setDoc(doc(db, COLLECTION_NAME, userProfile.uid), {
                    name: userProfile.name,
                    name_lower: userProfile.name.toLowerCase().trim(),
                    xp: xp,
                    level: currentLevel,
                    badges: unlockedAchievements,
                    progress: progressData, // Store full progress
                    lastActive: new Date().toISOString()
                }, { merge: true });
            } catch (error) {
                console.error("Error syncing user data:", error);
            }
        };

        const timeoutId = setTimeout(syncUser, 2000); // Debounce sync
        return () => clearTimeout(timeoutId);
    }, [xp, currentLevel, unlockedAchievements, userProfile, foundBugs]); // Added foundBugs dependency

    // 4. Listen for remote changes (Admin updates or multi-device sync)
    useEffect(() => {
        if (!userProfile?.uid) return;

        const unsubscribe = onSnapshot(doc(db, COLLECTION_NAME, userProfile.uid), (docSnap) => {
            if (docSnap.exists()) {
                const data = docSnap.data();
                const remoteXP = data.xp || 0;
                const localXP = getStorageItem('qa_game_xp', 0);

                // If remote XP is different from local storage (e.g. changed in Firebase Console)
                // We check against localStorage to avoid loop with pending state updates
                if (remoteXP !== localXP && Math.abs(remoteXP - localXP) > 5) { // Tolerance of 5 to avoid race conditions with small updates
                    console.log("Remote XP update detected:", remoteXP);
                    setStorageItem('qa_game_xp', remoteXP);
                    // Reload to apply changes
                    window.location.reload();
                }
            }
        });

        return () => unsubscribe();
    }, [userProfile?.uid]);

    // 3. Create or Restore User Profile
    const saveProfile = async (name) => {
        const cleanName = name.trim();
        const nameLower = cleanName.toLowerCase();

        try {
            // Check if user with this name already exists (Login Logic)
            // Try searching by lowercase name first (preferred)
            let q = query(collection(db, COLLECTION_NAME), where("name_lower", "==", nameLower));
            let querySnapshot = await getDocs(q);

            // Fallback: Try searching by exact name (for legacy records without name_lower)
            if (querySnapshot.empty) {
                q = query(collection(db, COLLECTION_NAME), where("name", "==", cleanName));
                querySnapshot = await getDocs(q);
            }

            let uid;
            let isNewUser = true;
            let remoteData = null;

            if (!querySnapshot.empty) {
                // User exists! Restore account
                // Prefer the user with the highest XP if duplicates exist
                const docs = querySnapshot.docs.map(d => ({ id: d.id, ...d.data() }));
                const bestMatch = docs.sort((a, b) => (b.xp || 0) - (a.xp || 0))[0];
                
                uid = bestMatch.id; 
                isNewUser = false;
                remoteData = bestMatch;
                console.log("User restored:", cleanName, uid);
            } else {
                // New User
                uid = userProfile?.uid || `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
            }
            
            const profile = { uid, name: cleanName };
            setStorageItem('qa_user_profile', profile);
            
            // Logic to determine what data to use
            let finalXP = xp;
            let finalLevel = currentLevel;
            let finalBadges = unlockedAchievements;
            // Capture current local state for fallback/merge
            let finalProgress = {
                foundBugs: foundBugs || [],
                completedLevels: {
                    sql: getStorageItem('qa_db_completed_levels', []),
                    automation: getStorageItem('qa_automation_completed_levels', []),
                    api: getStorageItem('qa_api_completed_levels', []),
                    mobile: getStorageItem('qa_mobile_completed_levels', [])
                }
            };
            let shouldReload = false;

            if (!isNewUser && remoteData) {
                const remoteXP = remoteData.xp || 0;
                const currentXP = xp || 0;

                // If remote is ahead of local (which is 0 on fresh login), use remote
                if (remoteXP > currentXP) {
                    console.log("Syncing from DB to LocalStorage...");
                    finalXP = remoteXP;
                    finalLevel = remoteData.level || 1;
                    finalBadges = remoteData.badges || [];
                    if (remoteData.progress) finalProgress = remoteData.progress;
                    shouldReload = true;
                    
                    // 1. Sync XP
                    setStorageItem('qa_game_xp', remoteXP);

                    // 2. Sync Badges
                    if (remoteData.badges && remoteData.badges.length > 0) {
                        setStorageItem('qa_achievements', remoteData.badges);
                    }

                    // 3. Sync Progress (Bugs & Levels)
                    if (remoteData.progress) {
                        if (remoteData.progress.foundBugs) {
                            setStorageItem('qa_game_progress', remoteData.progress.foundBugs);
                        }
                        if (remoteData.progress.completedLevels) {
                            const { sql, automation, api, mobile } = remoteData.progress.completedLevels;
                            if (sql) setStorageItem('qa_db_completed_levels', sql);
                            if (automation) setStorageItem('qa_automation_completed_levels', automation);
                            if (api) setStorageItem('qa_api_completed_levels', api);
                            if (mobile) setStorageItem('qa_mobile_completed_levels', mobile);
                        }
                    }
                }
            }

            // Sync to DB FIRST to ensure remote state is preserved/updated correctly
            const userData = {
                name: cleanName,
                name_lower: nameLower,
                xp: finalXP, 
                level: finalLevel,
                badges: finalBadges,
                progress: finalProgress,
                lastActive: new Date().toISOString()
            };

            if (isNewUser) {
                userData.createdAt = new Date().toISOString();
            }

            await setDoc(doc(db, COLLECTION_NAME, uid), userData, { merge: true });

            // Only set user profile state if we are NOT going to reload immediately
            // This prevents the 'syncUser' effect from firing with stale state before reload
            if (shouldReload) {
                window.location.reload();
            } else {
                setUserProfile(profile);
            }

            return true;
        } catch (error) {
            console.error("Error saving/restoring profile:", error);
            return false;
        }
    };

    return {
        leaders,
        loading,
        userProfile,
        saveProfile
    };
}
