import { useLocation, useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Trophy, Home, RotateCcw, CheckCircle, XCircle } from 'lucide-react';
import { useEffect } from 'react';
import { celebrateCompletion } from '../../utils/confetti';

export default function ExamResults() {
    const location = useLocation();
    const navigate = useNavigate();
    const foundCount = location.state?.foundCount || 0;
    const totalBugs = 3; // Should match examBugs.length from Exam.jsx
    const percentage = Math.round((foundCount / totalBugs) * 100);
    const passed = percentage >= 70;

    useEffect(() => {
        if (passed) {
            celebrateCompletion();
        }
    }, [passed]);

    return (
        <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white dark:from-slate-900 dark:to-slate-800 p-6 pt-12 pb-24 transition-colors duration-300">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-xl mx-auto"
            >
                <div className="bg-white dark:bg-slate-800 rounded-3xl shadow-xl p-8 mb-6">
                    <div className="flex justify-center mb-6">
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ type: 'spring', bounce: 0.5, delay: 0.2 }}
                            className={`w-24 h-24 rounded-full flex items-center justify-center ${passed ? 'bg-green-100 dark:bg-green-900/30' : 'bg-red-100 dark:bg-red-900/30'
                                }`}
                        >
                            {passed ? (
                                <CheckCircle size={48} className="text-green-600 dark:text-green-400" />
                            ) : (
                                <XCircle size={48} className="text-red-600 dark:text-red-400" />
                            )}
                        </motion.div>
                    </div>

                    <h1 className="text-3xl font-black text-center text-slate-900 dark:text-white mb-2">
                        {passed ? 'Поздравляем! 🎉' : 'Попробуйте еще раз'}
                    </h1>
                    <p className="text-center text-slate-600 dark:text-slate-400 mb-8">
                        {passed ? 'Вы успешно прошли экзамен!' : 'Нужно найти больше багов для прохождения'}
                    </p>

                    <div className="bg-slate-50 dark:bg-slate-900/50 rounded-2xl p-6 mb-6">
                        <div className="flex items-center justify-between mb-4">
                            <span className="text-slate-600 dark:text-slate-400 font-medium">Найдено багов</span>
                            <span className="text-2xl font-black text-slate-900 dark:text-white">
                                {foundCount} / {totalBugs}
                            </span>
                        </div>
                        <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-3 overflow-hidden">
                            <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${percentage}%` }}
                                transition={{ duration: 1, delay: 0.5 }}
                                className={`h-full rounded-full ${passed ? 'bg-gradient-to-r from-green-500 to-emerald-500' : 'bg-gradient-to-r from-orange-500 to-red-500'
                                    }`}
                            />
                        </div>
                        <div className="text-center mt-2">
                            <span className={`text-lg font-bold ${passed ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
                                }`}>
                                {percentage}%
                            </span>
                        </div>
                    </div>

                    <div className="space-y-3">
                        <Link to="/practice/exam" className="block">
                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold flex items-center justify-center gap-2 transition-colors"
                            >
                                <RotateCcw size={20} />
                                Попробовать снова
                            </motion.button>
                        </Link>
                        <Link to="/practice" className="block">
                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className="w-full py-4 bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 text-slate-900 dark:text-white rounded-xl font-bold flex items-center justify-center gap-2 transition-colors"
                            >
                                <Home size={20} />
                                Вернуться к практике
                            </motion.button>
                        </Link>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
