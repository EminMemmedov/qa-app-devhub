import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock, CheckCircle, XCircle, ArrowRight, Award } from 'lucide-react';
import { getRandomQuestions } from '../../data/examQuestions';
import PageTransition from '../../components/PageTransition';

export default function Exam() {
    const navigate = useNavigate();
    const [questions, setQuestions] = useState([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [userAnswers, setUserAnswers] = useState([]);
    const [timeLeft, setTimeLeft] = useState(600); // 10 minutes in seconds
    const [examStarted, setExamStarted] = useState(false);

    // Initialize exam with random questions
    useEffect(() => {
        const randomQuestions = getRandomQuestions(30);
        setQuestions(randomQuestions);
    }, []);

    // Timer countdown
    useEffect(() => {
        if (!examStarted || timeLeft <= 0) return;

        const timer = setInterval(() => {
            setTimeLeft(prev => {
                if (prev <= 1) {
                    finishExam();
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, [examStarted, timeLeft]);

    const startExam = () => {
        setExamStarted(true);
    };

    const handleAnswerSelect = (answerIndex) => {
        setSelectedAnswer(answerIndex);
    };

    const handleNextQuestion = () => {
        // Save answer
        const newAnswers = [...userAnswers];
        newAnswers[currentQuestionIndex] = selectedAnswer;
        setUserAnswers(newAnswers);

        // Move to next question or finish
        if (currentQuestionIndex + 1 < questions.length) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
            setSelectedAnswer(userAnswers[currentQuestionIndex + 1] ?? null);
        } else {
            finishExam();
        }
    };

    const finishExam = () => {
        // Calculate score
        let correctCount = 0;
        const categoryScores = {};

        questions.forEach((question, index) => {
            const userAnswer = userAnswers[index];
            if (userAnswer === question.correctAnswer) {
                correctCount++;
            }

            // Track category scores
            if (!categoryScores[question.category]) {
                categoryScores[question.category] = { correct: 0, total: 0 };
            }
            categoryScores[question.category].total++;
            if (userAnswer === question.correctAnswer) {
                categoryScores[question.category].correct++;
            }
        });

        // Navigate to results
        navigate('/practice/exam-results', {
            state: {
                foundCount: correctCount,
                totalQuestions: questions.length,
                categoryScores,
                userAnswers,
                questions,
                timeSpent: 600 - timeLeft
            }
        });
    };

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    if (questions.length === 0) {
        return (
            <PageTransition className="min-h-screen bg-gradient-to-b from-slate-50 to-white dark:from-slate-900 dark:to-slate-800 flex items-center justify-center">
                <div className="text-slate-600 dark:text-slate-400">Yüklənir...</div>
            </PageTransition>
        );
    }

    if (!examStarted) {
        return (
            <PageTransition className="min-h-screen bg-gradient-to-b from-slate-50 to-white dark:from-slate-900 dark:to-slate-800 p-6 pt-12 pb-24">
                <div className="max-w-2xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-white dark:bg-slate-800 rounded-3xl shadow-xl p-8"
                    >
                        <div className="flex justify-center mb-6">
                            <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center">
                                <Award size={40} className="text-white" />
                            </div>
                        </div>

                        <h1 className="text-3xl font-black text-center text-slate-900 dark:text-white mb-4">
                            QA Bilik İmtahanı
                        </h1>

                        <div className="space-y-4 mb-8">
                            <div className="flex items-center gap-3 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl">
                                <CheckCircle className="text-blue-600 dark:text-blue-400" size={24} />
                                <div>
                                    <p className="font-bold text-slate-900 dark:text-white">30 sual</p>
                                    <p className="text-sm text-slate-600 dark:text-slate-400">QA nəzəriyyəsi üzrə</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-3 p-4 bg-orange-50 dark:bg-orange-900/20 rounded-xl">
                                <Clock className="text-orange-600 dark:text-orange-400" size={24} />
                                <div>
                                    <p className="font-bold text-slate-900 dark:text-white">10 dəqiqə</p>
                                    <p className="text-sm text-slate-600 dark:text-slate-400">Vaxt limiti</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-3 p-4 bg-green-50 dark:bg-green-900/20 rounded-xl">
                                <Award className="text-green-600 dark:text-green-400" size={24} />
                                <div>
                                    <p className="font-bold text-slate-900 dark:text-white">70% keçid balı</p>
                                    <p className="text-sm text-slate-600 dark:text-slate-400">Minimum tələb</p>
                                </div>
                            </div>
                        </div>

                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={startExam}
                            className="w-full py-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-xl font-bold text-lg flex items-center justify-center gap-2 transition-all shadow-lg"
                        >
                            İmtahana Başla
                            <ArrowRight size={20} />
                        </motion.button>
                    </motion.div>
                </div>
            </PageTransition>
        );
    }

    const currentQuestion = questions[currentQuestionIndex];
    const progress = ((currentQuestionIndex + 1) / questions.length) * 100;

    return (
        <PageTransition className="min-h-screen bg-gradient-to-b from-slate-50 to-white dark:from-slate-900 dark:to-slate-800 p-6 pt-12 pb-24">
            <div className="max-w-3xl mx-auto">
                {/* Header */}
                <div className="mb-6 flex items-center justify-between">
                    <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
                        <span className="font-bold text-lg">Sual {currentQuestionIndex + 1}</span>
                        <span>/</span>
                        <span>{questions.length}</span>
                    </div>
                    <div className={`flex items-center gap-2 px-4 py-2 rounded-xl font-bold ${timeLeft < 60 ? 'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400' : 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400'
                        }`}>
                        <Clock size={20} />
                        <span className="text-lg font-mono">{formatTime(timeLeft)}</span>
                    </div>
                </div>

                {/* Progress Bar */}
                <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2 mb-8">
                    <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${progress}%` }}
                        className="bg-gradient-to-r from-blue-500 to-indigo-500 h-full rounded-full"
                    />
                </div>

                {/* Question Card */}
                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentQuestionIndex}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="bg-white dark:bg-slate-800 rounded-3xl shadow-xl p-8 mb-6"
                    >
                        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-8">
                            {currentQuestion.question}
                        </h2>

                        <div className="space-y-3">
                            {currentQuestion.options.map((option, index) => (
                                <motion.button
                                    key={index}
                                    whileHover={{ scale: 1.01 }}
                                    whileTap={{ scale: 0.99 }}
                                    onClick={() => handleAnswerSelect(index)}
                                    className={`w-full p-4 rounded-xl text-left transition-all ${selectedAnswer === index
                                            ? 'bg-blue-600 text-white shadow-lg'
                                            : 'bg-slate-50 dark:bg-slate-700 text-slate-900 dark:text-white hover:bg-slate-100 dark:hover:bg-slate-600'
                                        }`}
                                >
                                    <div className="flex items-center gap-3">
                                        <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${selectedAnswer === index
                                                ? 'bg-white text-blue-600'
                                                : 'bg-slate-200 dark:bg-slate-600 text-slate-600 dark:text-slate-300'
                                            }`}>
                                            {String.fromCharCode(65 + index)}
                                        </div>
                                        <span className="flex-1">{option}</span>
                                    </div>
                                </motion.button>
                            ))}
                        </div>
                    </motion.div>
                </AnimatePresence>

                {/* Next Button */}
                <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleNextQuestion}
                    disabled={selectedAnswer === null}
                    className={`w-full py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-2 transition-all ${selectedAnswer === null
                            ? 'bg-slate-200 dark:bg-slate-700 text-slate-400 dark:text-slate-500 cursor-not-allowed'
                            : 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-lg'
                        }`}
                >
                    {currentQuestionIndex + 1 === questions.length ? 'Bitir' : 'Növbəti Sual'}
                    <ArrowRight size={20} />
                </motion.button>
            </div>
        </PageTransition>
    );
}
