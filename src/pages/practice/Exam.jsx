import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock, CheckCircle, XCircle, ArrowRight, Award } from 'lucide-react';
import { getRandomQuestions } from '../../data/examQuestions';
import { useAdaptiveExam } from '../../hooks/useAdaptiveExam';
import { useGameProgress } from '../../hooks/useGameProgress';
import PageTransition from '../../components/PageTransition';
import { Sparkles, Brain } from 'lucide-react';

export default function Exam() {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const { getNextQuestion, currentDifficulty, resetExam } = useAdaptiveExam();
    const { addXP } = useGameProgress();

    const [questions, setQuestions] = useState([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [userAnswers, setUserAnswers] = useState([]);
    const [timeLeft, setTimeLeft] = useState(900); // 15 minutes in seconds
    const [examStarted, setExamStarted] = useState(false);
    const [isAdaptiveMode, setIsAdaptiveMode] = useState(false);

    // Helper to shuffle options
    const shuffleQuestionOptions = (question) => {
        const optionsWithIndex = question.options.map((opt, i) => ({ text: opt, originalIndex: i }));
        const shuffledOptions = optionsWithIndex.sort(() => Math.random() - 0.5);
        const newCorrectIndex = shuffledOptions.findIndex(opt => opt.originalIndex === question.correctAnswer);
        
        return {
            ...question,
            options: shuffledOptions.map(opt => opt.text),
            correctAnswer: newCorrectIndex
        };
    };

    // Initialize exam
    useEffect(() => {
        if (!isAdaptiveMode) {
            const randomQuestions = getRandomQuestions(30);
            const shuffledQuestions = randomQuestions.map(shuffleQuestionOptions);
            setQuestions(shuffledQuestions);
        }
    }, [isAdaptiveMode]);

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
        if (isAdaptiveMode) {
            resetExam();
            const firstQuestion = getNextQuestion(null);
            setQuestions([shuffleQuestionOptions(firstQuestion.question)]);
        }
        setTimeLeft(900); // Reset timer to 15 minutes on start
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

        // Check correctness for adaptive logic
        const currentQ = questions[currentQuestionIndex];
        const isCorrect = selectedAnswer === currentQ.correctAnswer;

        if (isAdaptiveMode) {
            if (currentQuestionIndex + 1 < 30) { // Limit to 30 questions
                const nextQ = getNextQuestion(isCorrect);
                setQuestions(prev => [...prev, shuffleQuestionOptions(nextQ.question)]);
                setCurrentQuestionIndex(currentQuestionIndex + 1);
                setSelectedAnswer(null);
            } else {
                finishExam(newAnswers);
            }
        } else {
            // Standard mode
            if (currentQuestionIndex + 1 < questions.length) {
                setCurrentQuestionIndex(currentQuestionIndex + 1);
                setSelectedAnswer(userAnswers[currentQuestionIndex + 1] ?? null);
            } else {
                finishExam(newAnswers);
            }
        }
    };

    const finishExam = (finalUserAnswers = userAnswers) => {
        // Calculate score
        let correctCount = 0;
        const categoryScores = {};

        questions.forEach((question, index) => {
            const userAnswer = finalUserAnswers[index];
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

        // Award XP for correct answers (e.g., 10 XP per correct answer)
        const xpEarned = correctCount * 10;
        if (xpEarned > 0) {
            addXP(xpEarned);
        }

        // Navigate to results
        navigate('/practice/exam-results', {
            state: {
                foundCount: correctCount,
                totalQuestions: questions.length,
                categoryScores,
                userAnswers: finalUserAnswers,
                questions,
                timeSpent: 900 - timeLeft,
                xpEarned // Pass XP to results page
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
                            {/* Mode Selection */}
                            <div className="flex gap-4 mb-6">
                                <button
                                    onClick={() => setIsAdaptiveMode(false)}
                                    className={`flex-1 p-4 rounded-xl border-2 transition-all ${!isAdaptiveMode
                                        ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                                        : 'border-slate-200 dark:border-slate-700 hover:border-blue-300'
                                        }`}
                                >
                                    <div className="font-bold text-slate-900 dark:text-white mb-1">Standart</div>
                                    <div className="text-xs text-slate-500">Təsadüfi suallar</div>
                                </button>
                                <button
                                    onClick={() => setIsAdaptiveMode(true)}
                                    className={`flex-1 p-4 rounded-xl border-2 transition-all ${isAdaptiveMode
                                        ? 'border-purple-500 bg-purple-50 dark:bg-purple-900/20'
                                        : 'border-slate-200 dark:border-slate-700 hover:border-purple-300'
                                        }`}
                                >
                                    <div className="flex items-center justify-center gap-2 font-bold text-slate-900 dark:text-white mb-1">
                                        Adaptiv <Sparkles size={14} className="text-purple-500" />
                                    </div>
                                    <div className="text-xs text-slate-500">Səviyyəyə uyğun</div>
                                </button>
                            </div>

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
                                    <p className="font-bold text-slate-900 dark:text-white">15 dəqiqə</p>
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
                        <span>{isAdaptiveMode ? 30 : questions.length}</span>
                        {isAdaptiveMode && (
                            <span className={`ml-2 px-2 py-1 rounded text-xs font-bold uppercase ${currentDifficulty === 'easy' ? 'bg-green-100 text-green-700' :
                                currentDifficulty === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                                    'bg-red-100 text-red-700'
                                }`}>
                                {currentDifficulty}
                            </span>
                        )}
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
