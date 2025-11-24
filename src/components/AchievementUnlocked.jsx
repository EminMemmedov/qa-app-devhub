import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, X } from 'lucide-react';

export default function AchievementUnlocked({ achievement, onClose }) {
    if (!achievement) return null;

    return (
        <AnimatePresence>
            <motion.div
                initial={{ x: 400, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: 400, opacity: 0 }}
                transition={{ type: "spring", damping: 20 }}
                className="fixed top-20 right-4 z-50 max-w-sm"
            >
                <div className="bg-gradient-to-br from-yellow-400 via-orange-400 to-red-500 p-1 rounded-2xl shadow-2xl">
                    <div className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-xl p-4">
                        <button
                            onClick={onClose}
                            className="absolute top-2 right-2 text-orange-600 hover:text-orange-700 transition-colors"
                        >
                            <X size={16} />
                        </button>

                        <div className="flex items-center gap-3 mb-3">
                            <motion.div
                                initial={{ scale: 0, rotate: -180 }}
                                animate={{ scale: 1, rotate: 0 }}
                                transition={{ type: "spring", delay: 0.2 }}
                                className="text-5xl"
                            >
                                {achievement.icon}
                            </motion.div>
                            <div className="flex-1">
                                <div className="flex items-center gap-2 mb-1">
                                    <Trophy className="text-yellow-600" size={16} />
                                    <span className="text-xs font-bold text-yellow-700 uppercase tracking-wide">
                                        Nailiyyət Açıldı!
                                    </span>
                                </div>
                                <h3 className="font-black text-lg text-slate-900">
                                    {achievement.title}
                                </h3>
                                <p className="text-sm text-slate-600">
                                    {achievement.description}
                                </p>
                            </div>
                        </div>

                        <div className="flex items-center justify-between pt-3 border-t border-orange-200">
                            <span className="text-xs text-slate-500">Mükafat</span>
                            <div className="flex items-center gap-1 bg-yellow-100 px-3 py-1 rounded-full">
                                <span className="text-sm font-bold text-yellow-700">
                                    +{achievement.reward} XP
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </motion.div>
        </AnimatePresence>
    );
}
