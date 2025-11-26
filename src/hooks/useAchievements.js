import { useState, useEffect } from 'react';
import { achievements } from '../data/achievements';

export function useAchievements() {
    const [unlockedAchievements, setUnlockedAchievements] = useState(() => {
        try {
            const saved = localStorage.getItem('qa_achievements');
            return saved ? JSON.parse(saved) : [];
        } catch (e) {
            console.error('Error parsing achievements:', e);
            return [];
        }
    });

    const [newAchievement, setNewAchievement] = useState(null);
    const [hintsUsed, setHintsUsed] = useState(() => {
        try {
            const saved = localStorage.getItem('qa_hints_used');
            return saved ? parseInt(saved) : 0;
        } catch (e) {
            return 0;
        }
    });

    useEffect(() => {
        localStorage.setItem('qa_achievements', JSON.stringify(unlockedAchievements));
    }, [unlockedAchievements]);

    useEffect(() => {
        localStorage.setItem('qa_hints_used', hintsUsed.toString());
    }, [hintsUsed]);

    const checkAchievements = (stats) => {
        const { foundBugs, totalBugs, moduleBugs, getBugDifficulty, xp, completedLevels, examScore, interviewComplete, addXP } = stats;
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

                case 'practice_level':
                    const moduleLevels = completedLevels?.[achievement.requirement.module] || [];
                    shouldUnlock = moduleLevels.includes(achievement.requirement.level);
                    break;

                case 'practice_complete':
                    const allLevels = completedLevels?.[achievement.requirement.module] || [];
                    shouldUnlock = allLevels.length >= 5;
                    break;

                case 'interview_complete':
                    shouldUnlock = interviewComplete === true;
                    break;

                case 'exam_score':
                    shouldUnlock = examScore >= achievement.requirement.score;
                    break;

                case 'xp_earned':
                    shouldUnlock = xp >= achievement.requirement.amount;
                    break;

                case 'both_practice_complete':
                    const dbComplete = (completedLevels?.database || []).length >= 5;
                    const autoComplete = (completedLevels?.automation || []).length >= 5;
                    shouldUnlock = dbComplete && autoComplete;
                    break;

                case 'all_modules_complete':
                    const allDb = (completedLevels?.database || []).length >= 5;
                    const allAuto = (completedLevels?.automation || []).length >= 5;
                    const hasInterview = interviewComplete === true;
                    const hasExam = examScore >= 80;
                    shouldUnlock = allDb && allAuto && hasInterview && hasExam;
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

            // Award XP for each achievement
            if (addXP) {
                newUnlocks.forEach(achievement => {
                    addXP(achievement.reward);
                });
            }

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
