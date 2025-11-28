import { useState, useEffect } from 'react';
import { db } from '../lib/firebase';
import { collection, query, orderBy, limit, onSnapshot, doc, setDoc, getDoc } from 'firebase/firestore';
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

    // 1. Listen to leaderboard changes in real-time
    useEffect(() => {
        const q = query(
            collection(db, 'users'),
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
                await setDoc(doc(db, 'users', userProfile.uid), {
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

    // 3. Create or Update User Profile
    const saveProfile = async (name) => {
        // Generate a simple ID if not exists
        const uid = userProfile?.uid || `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
        
        const profile = { uid, name };
        setStorageItem('qa_user_profile', profile);
        setUserProfile(profile);

        // Initial push to DB
        try {
            await setDoc(doc(db, 'users', uid), {
                name: name,
                xp: xp,
                level: currentLevel,
                badges: unlockedAchievements,
                createdAt: new Date().toISOString()
            }, { merge: true });
            return true;
        } catch (error) {
            console.error("Error saving profile:", error);
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

