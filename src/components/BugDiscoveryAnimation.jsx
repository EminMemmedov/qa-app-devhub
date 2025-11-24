import { motion } from 'framer-motion';
import { CheckCircle, Sparkles, Coins } from 'lucide-react';

export default function BugDiscoveryAnimation({ bugName, points, onComplete }) {
    return (
        <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ type: "spring", bounce: 0.6 }}
            onAnimationComplete={onComplete}
            className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none"
        >
            <div className="flex flex-col items-center gap-6">
                {/* Check circle with sparkles */}
                <div className="relative">
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: [0, 1.5, 0], rotate: [0, 180, 360] }}
                        transition={{ duration: 1, times: [0, 0.5, 1] }}
                        className="absolute inset-0 flex items-center justify-center"
                    >
                        <Sparkles className="text-yellow-400" size={80} />
                    </motion.div>

                    <motion.div
                        initial={{ scale: 0, rotate: -180 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{ type: "spring", bounce: 0.5, delay: 0.1 }}
                        className="relative z-10"
                    >
                        <div className="w-32 h-32 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center shadow-2xl">
                            <CheckCircle className="text-white" size={64} strokeWidth={3} />
                        </div>
                    </motion.div>
                </div>

                {/* XP Badge - Below the circle, fully visible */}
                <motion.div
                    initial={{ scale: 0, y: 20 }}
                    animate={{ scale: 1, y: 0 }}
                    transition={{ type: "spring", delay: 0.3, bounce: 0.6 }}
                >
                    <div className="bg-gradient-to-r from-yellow-400 via-orange-400 to-orange-500 px-6 py-3 rounded-2xl shadow-2xl border-4 border-white">
                        <div className="flex items-center gap-2">
                            <Coins className="text-white" size={24} />
                            <span className="text-white font-black text-2xl">
                                +{points} XP
                            </span>
                        </div>
                    </div>
                </motion.div>

                {/* Success message */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="bg-slate-900 text-white px-4 py-2 rounded-xl text-sm font-medium shadow-xl"
                >
                    Baq tapıldı! 🎉
                </motion.div>
            </div>
        </motion.div>
    );
}
