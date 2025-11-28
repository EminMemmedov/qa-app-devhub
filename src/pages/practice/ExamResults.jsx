import { useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, Home, RotateCcw, CheckCircle, XCircle, Award, Clock, TrendingUp, ChevronDown, ChevronUp } from 'lucide-react';
import { useEffect } from 'react';
import { celebrateCompletion } from '../../utils/confetti';
import { categories } from '../../data/examQuestions';

export default function ExamResults() {
    const location = useLocation();
    const {
        foundCount = 0,
        totalQuestions = 30,
        categoryScores = {},
        timeSpent = 0,
        questions = [],
        userAnswers = [],
        xpEarned = 0
    } = location.state || {};

    const [showDetails, setShowDetails] = useState(false);

    const percentage = Math.round((foundCount / totalQuestions) * 100);
    const passed = percentage >= 70;

    // Grade calculation
    const getGrade = (percent) => {
        if (percent >= 90) return { text: 'Əla', color: 'green', emoji: '🏆' };
        if (percent >= 70) return { text: 'Yaxşı', color: 'blue', emoji: '👍' };
        if (percent >= 50) return { text: 'Kafi', color: 'orange', emoji: '📚' };
        return { text: 'Qeyri-kafi', color: 'red', emoji: '📖' };
    };

    const grade = getGrade(percentage);

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

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
                className="max-w-2xl mx-auto space-y-6"
            >
                {/* Main Results Card */}
                <div className="bg-white dark:bg-slate-800 rounded-3xl shadow-xl p-8">
                    {/* Icon */}
                    <div className="flex justify-center mb-6">
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ type: 'spring', bounce: 0.5, delay: 0.2 }}
                            className={`w-24 h-24 rounded-full flex items-center justify-center ${passed ? 'bg-green-100 dark:bg-green-900/30' : 'bg-orange-100 dark:bg-orange-900/30'
                                }`}
                        >
                            {passed ? (
                                <Trophy size={48} className="text-green-600 dark:text-green-400" />
                            ) : (
                                <Award size={48} className="text-orange-600 dark:text-orange-400" />
                            )}
                        </motion.div>
                    </div>

                    {/* Title */}
                    <h1 className="text-3xl font-black text-center text-slate-900 dark:text-white mb-2">
                        {passed ? `Təbriklər! ${grade.emoji}` : 'Yaxşı cəhd!'}
                    </h1>
                    <p className="text-center text-slate-600 dark:text-slate-400 mb-8">
                        {passed ? 'Siz imtahandan uğurla keçdiniz!' : 'Bir az daha çalışın və yenidən cəhd edin'}
                    </p>

                    {/* XP Earned Badge */}
                    {xpEarned > 0 && (
                        <div className="flex justify-center mb-6">
                            <div className="bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 px-4 py-2 rounded-xl font-black text-lg flex items-center gap-2 border-2 border-indigo-200 dark:border-indigo-800">
                                <Award size={20} />
                                +{xpEarned} XP
                            </div>
                        </div>
                    )}

                    {/* Score */}
                    <div className="bg-slate-50 dark:bg-slate-900/50 rounded-2xl p-6 mb-6">
                        <div className="flex items-center justify-between mb-4">
                            <span className="text-slate-600 dark:text-slate-400 font-medium">Nəticə</span>
                            <span className="text-3xl font-black text-slate-900 dark:text-white">
                                {foundCount} / {totalQuestions}
                            </span>
                        </div>
                        <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-4 overflow-hidden mb-3">
                            <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${percentage}%` }}
                                transition={{ duration: 1, delay: 0.5 }}
                                className={`h-full rounded-full ${percentage >= 90 ? 'bg-gradient-to-r from-green-500 to-emerald-500' :
                                        percentage >= 70 ? 'bg-gradient-to-r from-blue-500 to-indigo-500' :
                                            percentage >= 50 ? 'bg-gradient-to-r from-orange-500 to-yellow-500' :
                                                'bg-gradient-to-r from-red-500 to-pink-500'
                                    }`}
                            />
                        </div>
                        <div className="flex items-center justify-between">
                            <span className={`text-2xl font-black ${grade.color === 'green' ? 'text-green-600 dark:text-green-400' :
                                    grade.color === 'blue' ? 'text-blue-600 dark:text-blue-400' :
                                        grade.color === 'orange' ? 'text-orange-600 dark:text-orange-400' :
                                            'text-red-600 dark:text-red-400'
                                }`}>
                                {percentage}%
                            </span>
                            <span className={`px-4 py-2 rounded-xl font-bold ${grade.color === 'green' ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300' :
                                    grade.color === 'blue' ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300' :
                                        grade.color === 'orange' ? 'bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300' :
                                            'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300'
                                }`}>
                                {grade.text}
                            </span>
                        </div>
                    </div>

                    {/* Time Spent */}
                    <div className="flex items-center justify-center gap-2 text-slate-600 dark:text-slate-400 mb-6">
                        <Clock size={20} />
                        <span>Vaxt: {formatTime(timeSpent)}</span>
                    </div>
                </div>

                {/* Category Breakdown */}
                {Object.keys(categoryScores).length > 0 && (
                    <div className="bg-white dark:bg-slate-800 rounded-3xl shadow-xl p-8">
                        <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
                            <TrendingUp size={24} />
                            Kateqoriyalar üzrə nəticə
                        </h2>
                        <div className="space-y-4">
                            {Object.entries(categoryScores).map(([category, scores]) => {
                                const catPercentage = Math.round((scores.correct / scores.total) * 100);
                                return (
                                    <div key={category} className="space-y-2">
                                        <div className="flex items-center justify-between">
                                            <span className="text-slate-700 dark:text-slate-300 font-medium">
                                                {categories[category]}
                                            </span>
                                            <span className="text-slate-900 dark:text-white font-bold">
                                                {scores.correct}/{scores.total}
                                            </span>
                                        </div>
                                        <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2">
                                            <div
                                                className="bg-gradient-to-r from-blue-500 to-indigo-500 h-full rounded-full transition-all"
                                                style={{ width: `${catPercentage}%` }}
                                            />
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                )}

                {/* Question Analysis */}
                {questions.length > 0 && (
                    <div className="bg-white dark:bg-slate-800 rounded-3xl shadow-xl overflow-hidden">
                        <button
                            onClick={() => setShowDetails(!showDetails)}
                            className="w-full p-8 flex items-center justify-between text-left hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors"
                        >
                            <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                                {showDetails ? <ChevronUp size={24} /> : <ChevronDown size={24} />}
                                Sualların Analizi
                            </h2>
                            <span className="text-sm text-slate-500 font-medium">
                                {showDetails ? 'Gizlət' : 'Göstər'}
                            </span>
                        </button>
                        
                        <AnimatePresence>
                            {showDetails && (
                                <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: 'auto', opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    className="border-t border-slate-100 dark:border-slate-700"
                                >
                                    <div className="p-8 space-y-6">
                                        {questions.map((q, idx) => {
                                            const userAnswer = userAnswers[idx];
                                            const isCorrect = userAnswer === q.correctAnswer;
                                            
                                            return (
                                                <div 
                                                    key={idx} 
                                                    className={`p-4 rounded-xl border-2 ${
                                                        isCorrect 
                                                            ? 'border-green-100 bg-green-50/50 dark:border-green-900/30 dark:bg-green-900/10' 
                                                            : 'border-red-100 bg-red-50/50 dark:border-red-900/30 dark:bg-red-900/10'
                                                    }`}
                                                >
                                                    <div className="flex items-start gap-3 mb-3">
                                                        {isCorrect ? (
                                                            <CheckCircle className="text-green-500 shrink-0 mt-1" size={20} />
                                                        ) : (
                                                            <XCircle className="text-red-500 shrink-0 mt-1" size={20} />
                                                        )}
                                                        <div>
                                                            <h3 className="font-bold text-slate-900 dark:text-white mb-2">
                                                                {idx + 1}. {q.question}
                                                            </h3>
                                                            <div className="space-y-1 text-sm">
                                                                <p className={`${isCorrect ? 'text-green-700 dark:text-green-400' : 'text-red-700 dark:text-red-400'}`}>
                                                                    <span className="font-bold">Sizin cavabınız:</span> {q.options[userAnswer]}
                                                                </p>
                                                                {!isCorrect && (
                                                                    <p className="text-green-700 dark:text-green-400">
                                                                        <span className="font-bold">Doğru cavab:</span> {q.options[q.correctAnswer]}
                                                                    </p>
                                                                )}
                                                                {isCorrect && (
                                                                    <div className="mt-2 inline-flex items-center gap-1 px-2 py-1 rounded-lg bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 text-xs font-bold">
                                                                        <Award size={12} />
                                                                        +10 XP
                                                                    </div>
                                                                )}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                )}

                {/* Action Buttons */}
                <div className="space-y-3">
                    <Link to="/practice/exam" className="block">
                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="w-full py-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-xl font-bold flex items-center justify-center gap-2 transition-all shadow-lg"
                        >
                            <RotateCcw size={20} />
                            Yenidən Cəhd Et
                        </motion.button>
                    </Link>
                    <Link to="/" className="block">
                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="w-full py-4 bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 text-slate-900 dark:text-white rounded-xl font-bold flex items-center justify-center gap-2 transition-colors"
                        >
                            <Home size={20} />
                            Ana Səhifəyə Qayıt
                        </motion.button>
                    </Link>
                </div>
            </motion.div>
        </div>
    );
}
