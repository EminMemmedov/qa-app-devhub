import { motion } from 'framer-motion';
import { Trophy, Lock } from 'lucide-react';
import { achievements } from '../data/achievements';
import { useAchievements } from '../hooks/useAchievements';
import { useGameProgress } from '../hooks/useGameProgress';
import { useTranslation } from 'react-i18next';
import confetti from 'canvas-confetti';
import { useEffect } from 'react';

export default function AchievementsPage() {
    const { t } = useTranslation();
    const { unlockedAchievements } = useAchievements();
    const { xp } = useGameProgress();

    // Trigger confetti on mount if there are unlocked achievements
    useEffect(() => {
        if (unlockedAchievements.length > 0) {
            confetti({
                particleCount: 50,
                spread: 60,
                origin: { y: 0.7 }
            });
        }
    }, []);

    // Calculate progress for each achievement
    const getProgress = (achievement) => {
        let savedDbLevels = [];
        let savedAutoLevels = [];

        try {
            savedDbLevels = JSON.parse(localStorage.getItem('qa_database_completed') || '[]');
        } catch (e) {
            console.error('Error parsing db levels:', e);
        }

        try {
            savedAutoLevels = JSON.parse(localStorage.getItem('qa_automation_completed') || '[]');
        } catch (e) {
            console.error('Error parsing auto levels:', e);
        }

        if (!achievement.requirement) return 0;

        switch (achievement.requirement.type) {
            case 'practice_level':
                const moduleLevels = achievement.requirement.module === 'database' ? savedDbLevels : savedAutoLevels;
                return moduleLevels.includes(achievement.requirement.level) ? 1 : 0;

            case 'practice_complete':
                const allLevels = achievement.requirement.module === 'database' ? savedDbLevels : savedAutoLevels;
                return Math.min(allLevels.length / 5, 1);

            case 'xp_earned':
                return Math.min(xp / achievement.requirement.amount, 1);

            case 'both_practice_complete':
                const dbProgress = savedDbLevels.length / 5;
                const autoProgress = savedAutoLevels.length / 5;
                return Math.min((dbProgress + autoProgress) / 2, 1);

            default:
                return 0;
        }
    };

    return (
        <div className="p-4 sm:p-8 min-h-screen bg-slate-50 dark:bg-slate-900">
            <div className="max-w-5xl mx-auto">
                {/* Page Header */}
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-8">
                    <div className="flex items-center gap-4">
                        <div className="w-14 h-14 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-2xl flex items-center justify-center shadow-lg shadow-orange-500/20 transform -rotate-3">
                            <Trophy className="text-white" size={28} />
                        </div>
                        <div>
                            <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">
                                {t('achievements.title')}
                            </h1>
                            <p className="text-slate-500 dark:text-slate-400 font-medium text-base">
                                {unlockedAchievements.length} / {achievements.length} {t('achievements.unlocked').toLowerCase()}
                            </p>
                        </div>
                    </div>

                    {/* XP Summary Badge */}
                    <div className="bg-white dark:bg-slate-800 px-5 py-3 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-yellow-100 dark:bg-yellow-900/30 flex items-center justify-center text-yellow-600 dark:text-yellow-400">
                            <Trophy size={20} />
                        </div>
                        <div>
                            <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">Total XP</div>
                            <div className="text-xl font-black text-slate-900 dark:text-white">{xp}</div>
                        </div>
                    </div>
                </div>

                {/* Achievements Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    {achievements.map((achievement) => {
                        const isUnlocked = unlockedAchievements.includes(achievement.id);
                        const progress = getProgress(achievement);

                        return (
                            <motion.div
                                key={achievement.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                whileHover={{ y: -4 }}
                                className={`relative overflow-hidden rounded-[2rem] p-1 transition-all duration-300 ${isUnlocked
                                    ? 'bg-gradient-to-br from-yellow-300 via-orange-300 to-yellow-300 shadow-xl shadow-orange-500/10'
                                    : 'bg-slate-200 dark:bg-slate-700'
                                    }`}
                            >
                                <div className={`h-full rounded-[1.8rem] p-6 flex flex-col relative z-10 ${isUnlocked
                                    ? 'bg-white dark:bg-slate-900'
                                    : 'bg-slate-50 dark:bg-slate-800 opacity-95'
                                    }`}>

                                    {/* Card Header: Icon & XP */}
                                    <div className="flex justify-between items-start mb-5 gap-4">
                                        <div className={`w-16 h-16 rounded-2xl flex items-center justify-center text-4xl shadow-sm flex-shrink-0 ${isUnlocked
                                            ? 'bg-orange-50 dark:bg-orange-900/20 text-orange-500'
                                            : 'bg-slate-200 dark:bg-slate-700 text-slate-400 grayscale'
                                            }`}>
                                            {achievement.icon}
                                        </div>
                                        <div className={`px-3 py-1.5 rounded-lg text-xs font-bold border shadow-sm whitespace-nowrap ${isUnlocked
                                            ? 'bg-yellow-50 dark:bg-yellow-900/20 text-yellow-700 dark:text-yellow-400 border-yellow-200 dark:border-yellow-800'
                                            : 'bg-slate-200 dark:bg-slate-700 text-slate-500 dark:text-slate-400 border-slate-300 dark:border-slate-600'
                                            }`}>
                                            +{achievement.reward} XP
                                        </div>
                                    </div>

                                    {/* Card Content */}
                                    <div className="mb-6 flex-grow">
                                        <h3 className={`text-xl font-black mb-2 leading-tight break-words hyphens-auto ${isUnlocked ? 'text-slate-900 dark:text-white' : 'text-slate-500 dark:text-slate-400'}`}>
                                            {achievement.title}
                                        </h3>
                                        <p className={`text-sm font-medium leading-relaxed break-words ${isUnlocked ? 'text-slate-600 dark:text-slate-400' : 'text-slate-400 dark:text-slate-500'}`}>
                                            {achievement.description}
                                        </p>
                                    </div>

                                    {/* Card Footer: Progress/Status */}
                                    <div className="mt-auto pt-5 border-t border-slate-100 dark:border-slate-800">
                                        {!isUnlocked && progress > 0 ? (
                                            <div className="space-y-2">
                                                <div className="flex justify-between text-xs font-bold text-slate-500">
                                                    <span>Proqress</span>
                                                    <span>{Math.round(progress * 100)}%</span>
                                                </div>
                                                <div className="h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                                                    <motion.div
                                                        initial={{ width: 0 }}
                                                        animate={{ width: `${progress * 100}%` }}
                                                        className="h-full bg-gradient-to-r from-yellow-400 to-orange-500"
                                                    />
                                                </div>
                                            </div>
                                        ) : (
                                            <div className={`flex items-center gap-2 text-sm font-bold ${isUnlocked ? 'text-green-600 dark:text-green-400' : 'text-slate-400'}`}>
                                                {isUnlocked ? (
                                                    <div className="flex items-center gap-2 bg-green-50 dark:bg-green-900/20 px-3 py-1.5 rounded-lg border border-green-100 dark:border-green-800/50">
                                                        <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                                                        {t('achievements.unlocked')}
                                                    </div>
                                                ) : (
                                                    <div className="flex items-center gap-2 bg-slate-100 dark:bg-slate-800 px-3 py-1.5 rounded-lg">
                                                        <Lock size={14} />
                                                        {t('achievements.locked')}
                                                    </div>
                                                )}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
