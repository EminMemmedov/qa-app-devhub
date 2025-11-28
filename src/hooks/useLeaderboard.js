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
    
    const { xp } = useGameProgress();
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
                await setDoc(doc(db, COLLECTION_NAME, userProfile.uid), {
                    name: userProfile.name,
                    xp: xp,
                    level: currentLevel,
                    badges: unlockedAchievements,
                    lastActive: new Date().toISOString()
                }, { merge: true });
            } catch (error) {
                console.error("Error syncing user data:", error);
            }
        };

        const timeoutId = setTimeout(syncUser, 2000); // Debounce sync to avoid too many writes
        return () => clearTimeout(timeoutId);
    }, [xp, currentLevel, unlockedAchievements, userProfile]);

    // 3. Create or Restore User Profile
    const saveProfile = async (name) => {
        try {
            // Check if user with this name already exists (Login Logic)
            const q = query(collection(db, COLLECTION_NAME), where("name", "==", name));
            const querySnapshot = await getDocs(q);

            let uid;
            let isNewUser = true;

            if (!querySnapshot.empty) {
                // User exists! Restore account
                const existingUser = querySnapshot.docs[0].data();
                uid = querySnapshot.docs[0].id; // Use the Document ID as UID
                isNewUser = false;
                console.log("User restored:", name, uid);
            } else {
                // New User
                uid = userProfile?.uid || `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
            }
            
            const profile = { uid, name };
            setStorageItem('qa_user_profile', profile);
            setUserProfile(profile);

            // Sync to DB (Update XP/Level/Badges to current local state or merge)
            // Note: Ideally we should pull remote XP if it's higher, but for simplicity we sync current local state
            // or keep remote state if local is fresh (0 XP).
            
            const userData = {
                name: name,
                xp: xp, 
                level: currentLevel,
                badges: unlockedAchievements,
                lastActive: new Date().toISOString()
            };

            if (isNewUser) {
                userData.createdAt = new Date().toISOString();
            }

            await setDoc(doc(db, COLLECTION_NAME, uid), userData, { merge: true });
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
