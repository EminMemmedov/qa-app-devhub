import { useState, useEffect } from 'react';
import { db } from '../lib/firebase';
import { collection, query, orderBy, limit, onSnapshot, doc, setDoc, where, getDocs } from 'firebase/firestore';
import { getStorageItem, setStorageItem } from '../utils/storage';
import { useGameProgress } from './useGameProgress';
import { useAchievements } from './useAchievements';
import { logger } from '../utils/logger';

export function useLeaderboard(shouldFetchLeaders = true) {
    const [leaders, setLeaders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [userProfile, setUserProfile] = useState(() => getStorageItem('qa_user_profile', null));

    const { xp, foundBugs } = useGameProgress();
    const { unlockedAchievements } = useAchievements();

    // Calculate level manually since it's not returned by useGameProgress
    const currentLevel = Math.floor(xp / 500) + 1;

    // Determine collection name based on environment (dev or prod)
    const COLLECTION_NAME = import.meta.env.DEV ? 'users_test' : 'users';

    // 1. Listen to leaderboard changes in real-time (Conditional)
    useEffect(() => {
        if (!shouldFetchLeaders) {
            setLoading(false);
            return;
        }

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
            logger.error("Error getting leaderboard:", error);
            setLoading(false);
        });

        return () => unsubscribe();
    }, [shouldFetchLeaders]);

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
                if (error.code === 'permission-denied') {
                    logger.error("Sync Failed: Security Rules prevented this update. Are you cheating? 😉");
                } else {
                    logger.error("Error syncing user data:", error);
                }
            }
        };

        const timeoutId = setTimeout(syncUser, 2000); // Debounce sync
        return () => clearTimeout(timeoutId);
    }, [xp, currentLevel, unlockedAchievements, userProfile, foundBugs]);

    // 4. Listen for remote changes (Admin updates or multi-device sync)
    useEffect(() => {
        if (!userProfile?.uid) return;

        const unsubscribe = onSnapshot(doc(db, COLLECTION_NAME, userProfile.uid), (docSnap) => {
            if (docSnap.exists()) {
                const data = docSnap.data();

                // Compare all key data points
                const remoteXP = data.xp || 0;
                const localXP = getStorageItem('qa_game_xp', 0);

                const remoteBadges = data.badges || [];
                const localBadges = getStorageItem('qa_achievements', []);
                // Sort for comparison
                const badgesChanged = JSON.stringify(remoteBadges.sort()) !== JSON.stringify(localBadges.sort());

                const xpChanged = remoteXP !== localXP;

                // If ANY significant difference is detected (Admin Edit or Data Loss), trust Remote
                if (xpChanged || badgesChanged) {
                    logger.log("Remote data mismatch detected (Admin Edit or Sync). Syncing down...", { remoteXP, localXP, badgesChanged });

                    // 1. Update XP
                    setStorageItem('qa_game_xp', remoteXP);

                    // 2. Update Badges
                    setStorageItem('qa_achievements', remoteBadges);

                    // 3. Update Progress (Bugs & Levels) if available
                    if (data.progress) {
                        if (data.progress.foundBugs) {
                            setStorageItem('qa_game_progress', data.progress.foundBugs);
                        }
                        if (data.progress.completedLevels) {
                            const { sql, automation, api, mobile } = data.progress.completedLevels;
                            if (sql) setStorageItem('qa_db_completed_levels', sql);
                            if (automation) setStorageItem('qa_automation_completed_levels', automation);
                            if (api) setStorageItem('qa_api_completed_levels', api);
                            if (mobile) setStorageItem('qa_mobile_completed_levels', mobile);
                        }
                    }

                    // Reload to apply changes immediately
                    window.location.reload();
                }
            }
        }, (error) => {
            // Handle permission errors gracefully (e.g. if Security Rules block read/write)
            if (error.code === 'permission-denied') {
                logger.warn("Firestore Permission Denied: Check your Security Rules.");
            } else {
                logger.error("Firestore Error:", error);
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
                logger.log("User restored:", cleanName, uid);
            } else {
                // New User - ALWAYS generate a new UID
                uid = `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
            }

            const profile = { uid, name: cleanName };
            setStorageItem('qa_user_profile', profile);

            // Logic to determine what data to use
            let finalXP;
            let finalLevel;
            let finalBadges;
            let finalProgress;
            let shouldReload = false;

            if (isNewUser) {
                // New user - start with empty progress
                finalXP = 0;
                finalLevel = 1;
                finalBadges = [];
                finalProgress = {
                    foundBugs: [],
                    completedLevels: {
                        sql: [],
                        automation: [],
                        api: [],
                        mobile: []
                    }
                };
                // Clear localStorage for new user
                setStorageItem('qa_game_xp', 0);
                setStorageItem('qa_achievements', []);
                setStorageItem('qa_game_progress', []);
                setStorageItem('qa_db_completed_levels', []);
                setStorageItem('qa_automation_completed_levels', []);
                setStorageItem('qa_api_completed_levels', []);
                setStorageItem('qa_mobile_completed_levels', []);
                shouldReload = true;
            } else if (remoteData) {
                // Existing user - use current local data as baseline
                finalXP = xp;
                finalLevel = currentLevel;
                finalBadges = unlockedAchievements;
                finalProgress = {
                    foundBugs: foundBugs || [],
                    completedLevels: {
                        sql: getStorageItem('qa_db_completed_levels', []),
                        automation: getStorageItem('qa_automation_completed_levels', []),
                        api: getStorageItem('qa_api_completed_levels', []),
                        mobile: getStorageItem('qa_mobile_completed_levels', [])
                    }
                };

                const remoteXP = remoteData.xp || 0;
                const currentXP = xp || 0;

                // Check if we are switching to a different user
                const isSwitchingUser = userProfile && userProfile.uid !== uid;

                // If remote is ahead of local, OR if we are switching users, use remote
                if (remoteXP > currentXP || isSwitchingUser) {
                    logger.log("Syncing from DB to LocalStorage...");
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
            logger.error("Error saving/restoring profile:", error);
            return false;
        }
    };

    // 5. Update Name (Rename existing user)
    const updateName = async (newName) => {
        if (!userProfile?.uid) return false;

        const cleanName = newName.trim();
        const nameLower = cleanName.toLowerCase();

        try {
            // Update Local State & Storage
            const updatedProfile = { ...userProfile, name: cleanName };
            // Update local storage first
            setStorageItem('qa_user_profile', updatedProfile);
            // Update state
            setUserProfile(updatedProfile);

            // Update Firestore
            await setDoc(doc(db, COLLECTION_NAME, userProfile.uid), {
                name: cleanName,
                name_lower: nameLower
            }, { merge: true });

            return true;
        } catch (error) {
            logger.error("Error updating name:", error);
            return false;
        }
    };

    return {
        leaders,
        loading,
        userProfile,
        saveProfile,
        updateName
    };
}
