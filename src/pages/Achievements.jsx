import { motion } from 'framer-motion';
import { Trophy, Lock } from 'lucide-react';
import { achievements } from '../data/achievements';

export default function AchievementsPage({ unlockedAchievements }) {
    return (
        <div className="p-6 pt-12 pb-24 min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
            <div className="max-w-4xl mx-auto">
                <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-2xl flex items-center justify-center shadow-lg">
                        <Trophy className="text-white" size={24} />
                    </div>
                    <div>
                        <h1 className="text-2xl font-black text-slate-900">Nailiyyətlər</h1>
                        <p className="text-sm text-slate-600">
                            {unlockedAchievements.length}/{achievements.length} açıldı
                        </p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {achievements.map((achievement) => {
                        const isUnlocked = unlockedAchievements.includes(achievement.id);

                        return (
                            <motion.div
                                key={achievement.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className={`relative overflow-hidden rounded-2xl border-2 transition-all ${isUnlocked
                                        ? 'bg-gradient-to-br from-yellow-50 to-orange-50 border-yellow-300 shadow-lg'
                                        : 'bg-white border-slate-200 opacity-60'
                                    }`}
                            >
                                <div className="p-5">
                                    <div className="flex items-start gap-4">
                                        <div className={`text-5xl ${!isUnlocked && 'grayscale'}`}>
                                            {achievement.icon}
                                        </div>
                                        <div className="flex-1">
                                            <h3 className="font-bold text-lg text-slate-900 mb-1">
                                                {achievement.title}
                                            </h3>
                                            <p className="text-sm text-slate-600 mb-3">
                                                {achievement.description}
                                            </p>
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center gap-2">
                                                    {isUnlocked ? (
                                                        <span className="text-xs font-bold text-green-600 bg-green-100 px-2 py-1 rounded-full">
                                                            ✓ Açıldı
                                                        </span>
                                                    ) : (
                                                        <span className="text-xs font-bold text-slate-400 bg-slate-100 px-2 py-1 rounded-full flex items-center gap-1">
                                                            <Lock size={10} />
                                                            Kilidli
                                                        </span>
                                                    )}
                                                </div>
                                                <span className="text-sm font-bold text-yellow-600">
                                                    +{achievement.reward} XP
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {isUnlocked && (
                                    <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-yellow-400/20 to-orange-500/20 rounded-full blur-3xl" />
                                )}
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
