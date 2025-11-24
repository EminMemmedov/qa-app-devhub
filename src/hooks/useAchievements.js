import { useState, useEffect } from 'react';
import { achievements } from '../data/achievements';

export function useAchievements() {
    const [unlockedAchievements, setUnlockedAchievements] = useState(() => {
        const saved = localStorage.getItem('qa_achievements');
        return saved ? JSON.parse(saved) : [];
    });

    const [newAchievement, setNewAchievement] = useState(null);
    const [hintsUsed, setHintsUsed] = useState(() => {
        const saved = localStorage.getItem('qa_hints_used');
        return saved ? parseInt(saved) : 0;
    });

    useEffect(() => {
        localStorage.setItem('qa_achievements', JSON.stringify(unlockedAchievements));
    }, [unlockedAchievements]);

    useEffect(() => {
        localStorage.setItem('qa_hints_used', hintsUsed.toString());
    }, [hintsUsed]);

    const checkAchievements = (stats) => {
        const { foundBugs, totalBugs, moduleBugs, getBugDifficulty } = stats;
        const newUnlocks = [];

        achievements.forEach(achievement => {
            // Skip if already unlocked
            if (unlockedAchievements.includes(achievement.id)) return;

            let shouldUnlock = false;

            switch (achievement.requirement.type) {
                case 'bugs_found':
                    shouldUnlock = foundBugs.length >= achievement.requirement.count;
                    break;

                case 'module_complete':
                    // Check if any module is complete
                    const moduleComplete = Object.values(moduleBugs).some(bugs => {
                        const foundInModule = foundBugs.filter(id =>
                            bugs.some(b => b.id === id)
                        );
                        return foundInModule.length === bugs.length;
                    });
                    shouldUnlock = moduleComplete;
                    break;

                case 'devtools_bugs':
                    // Count DevTools bugs found
                    const devToolsBugs = foundBugs.filter(id => {
                        return Object.values(moduleBugs).some(bugs =>
                            bugs.find(b => b.id === id && b.isDevTool)
                        );
                    });
                    const totalDevTools = Object.values(moduleBugs).reduce((sum, bugs) => {
                        return sum + bugs.filter(b => b.isDevTool).length;
                    }, 0);
                    shouldUnlock = devToolsBugs.length === totalDevTools;
                    break;

                case 'bugs_without_hints':
                    const bugsWithoutHints = foundBugs.length - hintsUsed;
                    shouldUnlock = bugsWithoutHints >= achievement.requirement.count;
                    break;

                case 'difficulty':
                    const difficultyBugs = foundBugs.filter(id =>
                        getBugDifficulty(id) === achievement.requirement.difficulty
                    );
                    shouldUnlock = difficultyBugs.length >= achievement.requirement.count;
                    break;

                default:
                    break;
            }

            if (shouldUnlock) {
                newUnlocks.push(achievement);
            }
        });

        if (newUnlocks.length > 0) {
            setUnlockedAchievements(prev => [...prev, ...newUnlocks.map(a => a.id)]);
            // Show first new achievement
            setNewAchievement(newUnlocks[0]);
            setTimeout(() => setNewAchievement(null), 5000);
        }
    };

    const incrementHintsUsed = () => {
        setHintsUsed(prev => prev + 1);
    };

    const resetAchievements = () => {
        setUnlockedAchievements([]);
        setHintsUsed(0);
        localStorage.removeItem('qa_achievements');
        localStorage.removeItem('qa_hints_used');
    };

    return {
        unlockedAchievements,
        newAchievement,
        checkAchievements,
        incrementHintsUsed,
        resetAchievements,
        hintsUsed
    };
}
