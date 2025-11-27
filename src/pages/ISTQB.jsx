import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { GraduationCap, Clock, BarChart2, BookOpen, ChevronRight, ArrowLeft, CheckCircle, XCircle, HelpCircle, Play, Target, ArrowRight, Calculator, BrainCircuit, Info, Flag, LayoutGrid, StopCircle, Eye, EyeOff, PauseCircle, PlayCircle } from 'lucide-react';
import PageTransition from '../components/PageTransition';
import { istqbChapters, istqbQuestions } from '../data/istqb';
import { glossaryTerms } from '../data/glossary';
import { getStorageItem, setStorageItem } from '../utils/storage';
import confetti from 'canvas-confetti';

export default function ISTQB() {
    const { t, i18n } = useTranslation();
    const lang = i18n.language || 'az';
    const [mode, setMode] = useState('dashboard'); // dashboard, chapters, quiz, flashcards, analytics
    const [selectedChapter, setSelectedChapter] = useState(null);
    const [showInfoModal, setShowInfoModal] = useState(false);
    
    // Exam State
    const [userExamAnswers, setUserExamAnswers] = useState({});
    const [timeLeft, setTimeLeft] = useState(3600); // 60 minutes
    const [isExamMode, setIsExamMode] = useState(false);
    const [flaggedQuestions, setFlaggedQuestions] = useState(new Set());
    const [showGrid, setShowGrid] = useState(false);
    const [isPaused, setIsPaused] = useState(false);
    const [eliminatedOptions, setEliminatedOptions] = useState({});

    // Quiz State
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [showResults, setShowResults] = useState(false);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [quizQuestions, setQuizQuestions] = useState([]);

    // Flashcards State
    const [flashcardIndex, setFlashcardIndex] = useState(0);
    const [isFlipped, setIsFlipped] = useState(false);

    // Analytics State
    const [progressData, setProgressData] = useState([]);

    // Timer Effect
    useEffect(() => {
        let timer;
        if (mode === 'exam' && timeLeft > 0 && !showResults && !isPaused) {
            timer = setInterval(() => {
                setTimeLeft((prev) => prev - 1);
            }, 1000);
        } else if (timeLeft === 0 && mode === 'exam' && !showResults) {
            submitExam();
        }
        return () => clearInterval(timer);
    }, [mode, timeLeft, showResults, isPaused]);

    // Start Exam
    const startExam = () => {
        // Shuffle and select 40 questions
        const shuffled = [...istqbQuestions].sort(() => 0.5 - Math.random());
        const selected = shuffled.slice(0, 40);
        
        setQuizQuestions(selected);
        setCurrentQuestionIndex(0);
        setUserExamAnswers({});
        setFlaggedQuestions(new Set());
        setEliminatedOptions({});
        setScore(0);
        setShowResults(false);
        setTimeLeft(3600); // Reset timer
        setIsExamMode(true);
        setShowGrid(false);
        setIsPaused(false);
        setMode('exam');
    };

    const stopExam = () => {
        if (window.confirm("İmtahanı dayandırmaq istədiyinizə əminsiniz? Bütün nəticələr itəcək.")) {
            setMode('dashboard');
            setIsExamMode(false);
        }
    };

    const toggleFlag = (questionId) => {
        setFlaggedQuestions(prev => {
            const newSet = new Set(prev);
            if (newSet.has(questionId)) {
                newSet.delete(questionId);
            } else {
                newSet.add(questionId);
            }
            return newSet;
        });
    };

    const toggleEliminateOption = (questionId, optionIndex, e) => {
        e.stopPropagation();
        setEliminatedOptions(prev => {
            const currentEliminated = prev[questionId] || [];
            const isEliminated = currentEliminated.includes(optionIndex);
            
            let newEliminated;
            if (isEliminated) {
                newEliminated = currentEliminated.filter(i => i !== optionIndex);
            } else {
                newEliminated = [...currentEliminated, optionIndex];
            }
            
            return { ...prev, [questionId]: newEliminated };
        });
    };

    const handleExamAnswer = (index) => {
        if (showResults) return;
        const questionId = quizQuestions[currentQuestionIndex].id;
        setUserExamAnswers(prev => ({
            ...prev,
            [questionId]: index
        }));
    };

    const submitExam = () => {
        let calculatedScore = 0;
        quizQuestions.forEach(q => {
            if (userExamAnswers[q.id] === q.correctAnswer) {
                calculatedScore++;
            }
        });
        setScore(calculatedScore);
        setShowResults(true);
        
        // Save to history? Maybe separate exam history?
        // For now, let's not mix exam attempts with learning history to avoid skewing analytics
    };

    const formatTime = (seconds) => {
        const m = Math.floor(seconds / 60);
        const s = seconds % 60;
        return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
    };

    const renderExam = () => {
        const question = quizQuestions[currentQuestionIndex];
        const isAnswered = userExamAnswers[question.id] !== undefined;
        const isFlagged = flaggedQuestions.has(question.id);
        const eliminated = eliminatedOptions[question.id] || [];

        if (showResults) {
            const percentage = Math.round((score / 40) * 100);
            const passed = percentage >= 65; // ISTQB Pass mark is 65% (26/40)

            // Calculate chapter stats
            const chapterPerformance = {};
            istqbChapters.forEach(ch => {
                const chapterQs = quizQuestions.filter(q => q.chapterId === ch.id);
                if (chapterQs.length > 0) {
                    const correct = chapterQs.filter(q => userExamAnswers[q.id] === q.correctAnswer).length;
                    chapterPerformance[ch.id] = {
                        total: chapterQs.length,
                        correct,
                        percent: Math.round((correct / chapterQs.length) * 100),
                        title: ch.title
                    };
                }
            });

            return (
                <div className="text-center py-8">
                    <div className={`w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6 text-white shadow-xl ${passed ? 'bg-green-500' : 'bg-red-500'}`}>
                        {passed ? <CheckCircle size={48} /> : <XCircle size={48} />}
                    </div>
                    <h2 className="text-3xl font-black text-slate-900 dark:text-white mb-2">
                        {passed ? 'Təbriklər! İmtahanı Keçdiniz' : 'Təəssüf ki, Kəsilmisiniz'}
                    </h2>
                    <p className="text-slate-500 dark:text-slate-400 mb-8">
                        Keçid balı: 65% (26 sual)
                    </p>
                    
                    <div className="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-slate-900 to-slate-700 dark:from-white dark:to-slate-300 mb-2">
                        {score} / 40
                    </div>
                    <p className={`text-lg font-bold mb-8 ${passed ? 'text-green-600' : 'text-red-600'}`}>
                        {percentage}%
                    </p>

                    <div className="bg-slate-50 dark:bg-slate-800 rounded-2xl p-6 mb-8 max-w-md mx-auto border border-slate-100 dark:border-slate-700 text-left">
                        <h3 className="font-bold text-slate-900 dark:text-white mb-4 text-sm uppercase tracking-wider">Fəsillər üzrə Nəticələr</h3>
                        <div className="space-y-3">
                            {Object.keys(chapterPerformance).map(chId => {
                                const stat = chapterPerformance[chId];
                                return (
                                    <div key={chId}>
                                        <div className="flex justify-between text-xs font-bold text-slate-600 dark:text-slate-300 mb-1">
                                            <span>Fəsil {chId}: {stat.title}</span>
                                            <span>{stat.percent}%</span>
                                        </div>
                                        <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2 overflow-hidden">
                                            <div 
                                                className={`h-full rounded-full ${stat.percent >= 65 ? 'bg-green-500' : 'bg-red-500'}`} 
                                                style={{ width: `${stat.percent}%` }}
                                            ></div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    <div className="flex gap-4 justify-center mb-8">
                        <button 
                            onClick={startExam}
                            className="px-8 py-3 bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white font-bold rounded-xl hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                        >
                            Yenidən Cəhd Et
                        </button>
                        <button 
                            onClick={() => setMode('dashboard')}
                            className="px-8 py-3 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 shadow-lg shadow-blue-500/30 transition-colors"
                        >
                            Əsas Menyu
                        </button>
                    </div>

                    {/* Review Section */}
                    <div className="text-left space-y-4 max-w-2xl mx-auto">
                        <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">Səhvlərin Təhlili</h3>
                        {quizQuestions.map((q, idx) => {
                            const userAnswer = userExamAnswers[q.id];
                            const isCorrect = userAnswer === q.correctAnswer;
                            if (isCorrect) return null; // Show only incorrect

                            return (
                                <div key={q.id} className="p-4 rounded-xl bg-red-50 dark:bg-red-900/20 border border-red-100 dark:border-red-900/30">
                                    <div className="flex justify-between mb-2">
                                        <span className="text-xs font-bold text-red-500">Sual {idx + 1}</span>
                                        <span className="text-xs text-red-400">Səhv Cavab</span>
                                    </div>
                                    <p className="font-medium text-slate-900 dark:text-white mb-3 text-sm">{q.question}</p>
                                    <div className="text-xs space-y-1">
                                        <div className="flex gap-2 items-center text-red-600 dark:text-red-400">
                                            <XCircle size={14} />
                                            Sizin cavab: {userAnswer !== undefined ? q.options[userAnswer] : 'Cavab verilməyib'}
                                        </div>
                                        <div className="flex gap-2 items-center text-green-600 dark:text-green-400">
                                            <CheckCircle size={14} />
                                            Düzgün cavab: {q.options[q.correctAnswer]}
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            );
        }

        return (
            <div className="max-w-2xl mx-auto h-full flex flex-col relative">
                {/* Progress Bar */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden mb-2">
                    <div 
                        className="h-full bg-blue-500 transition-all duration-300"
                        style={{ width: `${((Object.keys(userExamAnswers).length) / 40) * 100}%` }}
                    ></div>
                </div>

                {/* Pause Overlay */}
                {isPaused && (
                    <div className="absolute inset-0 z-30 bg-white/90 dark:bg-slate-900/95 backdrop-blur-sm flex flex-col items-center justify-center rounded-3xl">
                        <PauseCircle size={64} className="text-blue-500 mb-4 animate-pulse" />
                        <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-2">İmtahan Dayandırılıb</h2>
                        <p className="text-slate-500 dark:text-slate-400 mb-8">Vaxt dayandırıldı. Davam etmək üçün aşağıdakı düyməni sıxın.</p>
                        <button 
                            onClick={() => setIsPaused(false)}
                            className="flex items-center gap-2 px-8 py-4 bg-blue-600 text-white font-bold rounded-2xl shadow-xl shadow-blue-500/30 hover:bg-blue-700 transition-transform hover:scale-105"
                        >
                            <PlayCircle size={24} />
                            Davam Et
                        </button>
                    </div>
                )}

                {/* Exam Header */}
                <div className="flex items-center justify-between mb-6 bg-white dark:bg-slate-800 p-4 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 mt-4">
                    <div className="flex items-center gap-2">
                        <button 
                            onClick={stopExam}
                            className="p-2 rounded-lg bg-red-50 text-red-500 hover:bg-red-100 dark:bg-red-900/20 dark:text-red-400 transition-colors"
                            title="Çıxış"
                        >
                            <StopCircle size={20} />
                        </button>
                        <button 
                            onClick={() => setIsPaused(true)}
                            className="p-2 rounded-lg bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-700 dark:text-slate-300 transition-colors"
                            title="Pauza"
                        >
                            <PauseCircle size={20} />
                        </button>
                        <div className={`p-2 rounded-lg flex items-center gap-2 ${timeLeft < 300 ? 'bg-red-100 text-red-600' : 'bg-blue-100 text-blue-600'}`}>
                            <Clock size={18} />
                            <span className="font-mono font-bold text-lg">
                                {formatTime(timeLeft)}
                            </span>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <button
                            onClick={() => toggleFlag(question.id)}
                            className={`p-2 rounded-lg transition-colors ${
                                isFlagged 
                                    ? 'bg-orange-100 text-orange-600 dark:bg-orange-900/30 dark:text-orange-400' 
                                    : 'bg-slate-50 text-slate-400 dark:bg-slate-700 dark:text-slate-500 hover:bg-slate-100'
                            }`}
                        >
                            <Flag size={20} fill={isFlagged ? "currentColor" : "none"} />
                        </button>
                        <div className="text-sm font-bold text-slate-500">
                            {currentQuestionIndex + 1} / 40
                        </div>
                    </div>
                </div>

                {/* Question Grid Modal */}
                <AnimatePresence>
                    {showGrid && (
                        <motion.div 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 20 }}
                            className="absolute inset-0 z-20 bg-white dark:bg-slate-900 rounded-3xl p-6 overflow-y-auto border border-slate-100 dark:border-slate-700 shadow-2xl"
                        >
                            <div className="flex justify-between items-center mb-6">
                                <h3 className="text-xl font-bold text-slate-900 dark:text-white">Suallar Xəritəsi</h3>
                                <button onClick={() => setShowGrid(false)} className="p-2 bg-slate-100 dark:bg-slate-800 rounded-full">
                                    <XCircle size={24} className="text-slate-500" />
                                </button>
                            </div>
                            <div className="grid grid-cols-5 gap-3">
                                {quizQuestions.map((q, idx) => {
                                    const isAns = userExamAnswers[q.id] !== undefined;
                                    const isFlg = flaggedQuestions.has(q.id);
                                    const isCurr = idx === currentQuestionIndex;
                                    
                                    return (
                                        <button
                                            key={q.id}
                                            onClick={() => {
                                                setCurrentQuestionIndex(idx);
                                                setShowGrid(false);
                                            }}
                                            className={`p-3 rounded-xl font-bold text-sm flex flex-col items-center justify-center gap-1 border-2 transition-all ${
                                                isCurr ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 text-blue-600' :
                                                isFlg ? 'border-orange-400 bg-orange-50 dark:bg-orange-900/20 text-orange-600' :
                                                isAns ? 'border-green-500 bg-green-50 dark:bg-green-900/20 text-green-600' :
                                                'border-slate-100 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-400'
                                            }`}
                                        >
                                            {idx + 1}
                                            {isFlg && <Flag size={10} fill="currentColor" />}
                                        </button>
                                    );
                                })}
                            </div>
                            <div className="mt-6 flex gap-4 text-xs text-slate-500 justify-center">
                                <div className="flex items-center gap-1"><div className="w-3 h-3 rounded-full bg-green-500"></div> Cavablanıb</div>
                                <div className="flex items-center gap-1"><div className="w-3 h-3 rounded-full bg-orange-400"></div> İşarələnib</div>
                                <div className="flex items-center gap-1"><div className="w-3 h-3 rounded-full border border-slate-300"></div> Boş</div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Question */}
                <div className="flex-1 overflow-y-auto pb-24">
                    <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-6 leading-relaxed">
                        {question.question}
                    </h2>

                    <div className="space-y-3">
                        {question.options.map((option, index) => {
                            const isSelected = userExamAnswers[question.id] === index;
                            const isEliminated = eliminated.includes(index);

                            return (
                                <div key={index} className="flex gap-2">
                                    <button
                                        onClick={() => !isEliminated && handleExamAnswer(index)}
                                        disabled={isEliminated}
                                        className={`flex-1 p-4 rounded-xl text-left font-medium transition-all border-2 relative ${
                                            isEliminated 
                                                ? 'opacity-40 border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 cursor-not-allowed grayscale' 
                                                : isSelected 
                                                    ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400 shadow-md transform scale-[1.01]' 
                                                    : 'border-slate-100 dark:border-slate-700 hover:border-blue-200 dark:hover:border-slate-600 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'
                                        }`}
                                    >
                                        {isEliminated && (
                                            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                                <div className="w-full h-0.5 bg-slate-400/50 rotate-1"></div>
                                            </div>
                                        )}
                                        <div className="flex items-center gap-3">
                                            <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${
                                                isSelected ? 'border-blue-500 bg-blue-500' : 'border-slate-300 dark:border-slate-600'
                                            }`}>
                                                {isSelected && <div className="w-2 h-2 bg-white rounded-full" />}
                                            </div>
                                            {option}
                                        </div>
                                    </button>
                                    
                                    <button 
                                        onClick={(e) => toggleEliminateOption(question.id, index, e)}
                                        className={`p-3 rounded-xl border-2 transition-colors ${
                                            isEliminated 
                                                ? 'bg-red-50 border-red-100 text-red-500 dark:bg-red-900/20 dark:border-red-900/30' 
                                                : 'bg-white dark:bg-slate-800 border-slate-100 dark:border-slate-700 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300'
                                        }`}
                                        title={isEliminated ? "Bərpa et" : "Variantı çıxdaş et"}
                                    >
                                        {isEliminated ? <EyeOff size={20} /> : <Eye size={20} />}
                                    </button>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Navigation Footer */}
                <div className="fixed bottom-20 left-0 right-0 p-4 bg-white/80 dark:bg-slate-900/80 backdrop-blur-lg border-t border-slate-100 dark:border-slate-800 flex justify-between max-w-md mx-auto w-full z-10">
                    <button
                        onClick={() => setCurrentQuestionIndex(Math.max(0, currentQuestionIndex - 1))}
                        disabled={currentQuestionIndex === 0}
                        className="p-3 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 disabled:opacity-50"
                    >
                        <ArrowLeft size={20} />
                    </button>

                    <button 
                        onClick={() => setShowGrid(!showGrid)}
                        className="p-3 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:text-blue-600 transition-colors"
                    >
                        <LayoutGrid size={20} />
                    </button>

                    {currentQuestionIndex === 39 ? (
                        <button
                            onClick={submitExam}
                            className="px-6 py-3 bg-green-600 text-white font-bold rounded-xl shadow-lg shadow-green-500/30 hover:bg-green-700"
                        >
                            İmtahanı Bitir
                        </button>
                    ) : (
                        <button
                            onClick={() => setCurrentQuestionIndex(Math.min(39, currentQuestionIndex + 1))}
                            className="px-6 py-3 bg-blue-600 text-white font-bold rounded-xl shadow-lg shadow-blue-500/30 hover:bg-blue-700 flex items-center gap-2"
                        >
                            Növbəti
                            <ChevronRight size={20} />
                        </button>
                    )}
                </div>
            </div>
        );
    };

    // Load Analytics
    const loadAnalytics = () => {
        const history = getStorageItem('istqb_history', []);
        
        // Get Set of ALL correctly answered question IDs (unique)
        const solvedQuestionIds = new Set(
            history.filter(h => h.isCorrect).map(h => h.questionId)
        );

        // Calculate progress for Practice Levels ONLY
        const practiceLevels = [
            { id: 'K3', title: 'Texniki Məsələlər (K3)', color: 'bg-orange-500', desc: 'BVA, EP, State Transition' },
            { id: 'K4', title: 'Analitik Məsələlər (K4)', color: 'bg-purple-500', desc: 'Risk Analizi, Strategiya' }
        ];

        const practiceStats = practiceLevels.map(level => {
            // Find all questions belonging to this Level in the database
            const levelQuestions = istqbQuestions.filter(q => q.level === level.id);
            const totalAvailable = levelQuestions.length;

            // Count how many of THESE questions are in the solved set
            const solvedCount = levelQuestions.filter(q => solvedQuestionIds.has(q.id)).length;
            
            const percent = totalAvailable > 0 ? Math.round((solvedCount / totalAvailable) * 100) : 0;

            // Detailed Topic Analysis
            const topics = [...new Set(levelQuestions.map(q => q.topic).filter(Boolean))];
            const topicStats = topics.map(topic => {
                const topicQuestions = levelQuestions.filter(q => q.topic === topic);
                const topicTotal = topicQuestions.length;
                const topicSolved = topicQuestions.filter(q => solvedQuestionIds.has(q.id)).length;
                const topicPercent = topicTotal > 0 ? Math.round((topicSolved / topicTotal) * 100) : 0;
                return { topic, total: topicTotal, solved: topicSolved, percent: topicPercent };
            });

            // Determine status and feedback
            let status = 'Başlanğıc';
            let feedback = 'Hələ yolun başındasan.';
            
            if (percent >= 30 && percent < 70) {
                status = 'Orta';
                feedback = level.id === 'K3' 
                    ? 'Yaxşı irəliləyiş var, amma hesablamalarda diqqətli ol.' 
                    : 'Analiz qabiliyyətin yaxşıdır, amma daha çox təcrübə lazımdır.';
            } else if (percent >= 70) {
                status = 'Ekspert';
                feedback = level.id === 'K3'
                    ? 'Texniki tapşırıqları mükəmməl bilirsən! İndi K4-ə keç.'
                    : 'Mükəmməl analitik düşüncə! Sən artıq Senior səviyyəsinə yaxınsan.';
            } else {
                 feedback = level.id === 'K3' 
                    ? 'Texnikaları (BVA, EP) öyrənməyə davam et.' 
                    : 'Analitik suallar çətin ola bilər. Riskləri və strategiyanı təkrarla.';
            }

            return { 
                ...level, 
                type: 'practice', 
                total: totalAvailable, 
                correct: solvedCount, 
                percent,
                status,
                feedback,
                topicStats // Add detailed stats
            };
        });

        // Calculate progress for Chapters (Theory)
        const chapterStats = istqbChapters.map(chapter => {
            // Find all questions belonging to this chapter
            const chapterQuestions = istqbQuestions.filter(q => q.chapterId === chapter.id);
            const totalAvailable = chapterQuestions.length;
            
            // Count solved
            const solvedCount = chapterQuestions.filter(q => solvedQuestionIds.has(q.id)).length;
            const percent = totalAvailable > 0 ? Math.round((solvedCount / totalAvailable) * 100) : 0;
            
            return { 
                ...chapter, 
                type: 'chapter', 
                total: totalAvailable, 
                correct: solvedCount, 
                percent 
            };
        });

        setProgressData([...practiceStats, ...chapterStats]);
        setMode('analytics');
    };

    // Start Practice Quiz based on Level (K3 or K4)
    const startPractice = (level) => {
        const practicalQuestions = istqbQuestions.filter(q => q.level === level);
        
        if (practicalQuestions.length === 0) {
            alert(`${level} səviyyəsi üçün hələ suallar əlavə edilməyib.`);
            return;
        }

        setQuizQuestions(practicalQuestions);
        setCurrentQuestionIndex(0);
        setScore(0);
        setShowResults(false);
        setSelectedAnswer(null);
        setSelectedChapter(level); // Using level as ID for tracking
        setMode('quiz'); 
    };

    // Start Quiz for a specific chapter
    const startChapterQuiz = (chapterId) => {
        const questions = istqbQuestions.filter(q => q.chapterId === chapterId);
        if (questions.length === 0) {
            alert("Bu fəsil üçün hələ suallar əlavə edilməyib.");
            return;
        }
        setQuizQuestions(questions);
        setCurrentQuestionIndex(0);
        setScore(0);
        setShowResults(false);
        setSelectedAnswer(null);
        setSelectedChapter(chapterId);
        setMode('quiz');
    };

    const handleAnswer = (index) => {
        if (selectedAnswer !== null) return;
        setSelectedAnswer(index);
        
        const isCorrect = index === quizQuestions[currentQuestionIndex].correctAnswer;
        
        // Save progress
        const history = getStorageItem('istqb_history', []);
        history.push({
            chapterId: selectedChapter,
            questionId: quizQuestions[currentQuestionIndex].id,
            isCorrect,
            timestamp: Date.now()
        });
        setStorageItem('istqb_history', history);

        if (isCorrect) {
            setScore(score + 1);
            confetti({
                particleCount: 50,
                spread: 60,
                origin: { y: 0.7 },
                colors: ['#22c55e', '#4ade80']
            });
        }
    };

    const nextQuestion = () => {
        if (currentQuestionIndex < quizQuestions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
            setSelectedAnswer(null);
        } else {
            setShowResults(true);
        }
    };

    const resetQuiz = () => {
        setMode('dashboard');
        setSelectedChapter(null);
    };

    // K-Level Info Modal
    const renderInfoModal = () => (
        <AnimatePresence>
            {showInfoModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm" onClick={() => setShowInfoModal(false)}>
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        className="bg-white dark:bg-slate-800 rounded-3xl p-6 max-w-md w-full shadow-2xl border border-slate-100 dark:border-slate-700 max-h-[80vh] overflow-y-auto"
                        onClick={e => e.stopPropagation()}
                    >
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-2xl font-black text-slate-900 dark:text-white">K-Səviyyələr Nədir?</h3>
                            <button onClick={() => setShowInfoModal(false)} className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-full transition-colors">
                                <XCircle size={24} className="text-slate-400" />
                            </button>
                        </div>

                        <div className="space-y-4">
                            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-700/30 border border-slate-100 dark:border-slate-700">
                                <div className="flex items-center gap-2 mb-2">
                                    <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-lg text-xs font-bold">K1</span>
                                    <h4 className="font-bold text-slate-900 dark:text-white">Yadda Saxlamaq (Remember)</h4>
                                </div>
                                <p className="text-sm text-slate-500 dark:text-slate-400">
                                    Terminləri, tərifləri və faktları olduğu kimi xatırlamaq.
                                    <br/><span className="italic text-xs opacity-75">Məsələn: "Baq nədir?"</span>
                                </p>
                            </div>

                            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-700/30 border border-slate-100 dark:border-slate-700">
                                <div className="flex items-center gap-2 mb-2">
                                    <span className="px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-lg text-xs font-bold">K2</span>
                                    <h4 className="font-bold text-slate-900 dark:text-white">Başa Düşmək (Understand)</h4>
                                </div>
                                <p className="text-sm text-slate-500 dark:text-slate-400">
                                    Konsepsiyaları izah etmək, müqayisə etmək və fərqləndirmək.
                                    <br/><span className="italic text-xs opacity-75">Məsələn: "Qara qutu və Ağ qutu testlərinin fərqi nədir?"</span>
                                </p>
                            </div>

                            <div className="p-4 rounded-2xl bg-orange-50 dark:bg-orange-900/20 border border-orange-100 dark:border-orange-900/30">
                                <div className="flex items-center gap-2 mb-2">
                                    <span className="px-2 py-1 bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 rounded-lg text-xs font-bold">K3</span>
                                    <h4 className="font-bold text-slate-900 dark:text-white">Tətbiq Etmək (Apply)</h4>
                                </div>
                                <p className="text-sm text-slate-500 dark:text-slate-400">
                                    Bilikləri konkret situasiyada və ya məsələdə istifadə etmək.
                                    <br/><span className="italic text-xs opacity-75">Məsələn: "Sərhəd Dəyərləri (BVA) istifadə edərək test dəyərlərini tapın."</span>
                                </p>
                            </div>

                            <div className="p-4 rounded-2xl bg-purple-50 dark:bg-purple-900/20 border border-purple-100 dark:border-purple-900/30">
                                <div className="flex items-center gap-2 mb-2">
                                    <span className="px-2 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 rounded-lg text-xs font-bold">K4</span>
                                    <h4 className="font-bold text-slate-900 dark:text-white">Təhlil Etmək (Analyze)</h4>
                                </div>
                                <p className="text-sm text-slate-500 dark:text-slate-400">
                                    Mürəkkəb problemi hissələrə bölmək, strukturu və səbəb-nəticə əlaqələrini anlamaq.
                                    <br/><span className="italic text-xs opacity-75">Məsələn: "Bu situasiyada niyə bu risk daha vacibdir?"</span>
                                </p>
                            </div>
                        </div>
                        
                        <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-700">
                            <p className="text-xs text-center text-slate-400">
                                ISTQB imtahanında uğur qazanmaq üçün bütün səviyyələri bilmək vacibdir.
                            </p>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );

    // Render Practice Selection Menu
    const renderPracticeSelection = () => (
        <div className="space-y-4">
            <div className="flex items-center gap-4 mb-6">
                <button 
                    onClick={() => setMode('dashboard')}
                    className="p-2 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
                >
                    <ArrowLeft size={20} className="text-slate-600 dark:text-slate-400" />
                </button>
                <h2 className="text-2xl font-black text-slate-900 dark:text-white">Praktiki Məsələlər</h2>
            </div>

            <div className="grid gap-4">
                 <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => startPractice('K3')}
                    className="bg-white dark:bg-slate-800 p-6 rounded-3xl border border-slate-100 dark:border-slate-700 shadow-sm cursor-pointer flex items-center gap-4"
                >
                    <div className="p-3 bg-orange-100 dark:bg-orange-900/30 rounded-2xl text-orange-600 dark:text-orange-400">
                        <Calculator size={24} />
                    </div>
                    <div className="flex-1">
                        <div className="flex justify-between items-center">
                             <h3 className="font-bold text-slate-900 dark:text-white">Texniki Məsələlər</h3>
                             <span className="text-xs font-bold px-2 py-1 bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 rounded-lg">K3</span>
                        </div>
                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">BVA, EP, State Transition hesablamaları</p>
                    </div>
                    <ChevronRight className="text-slate-300 dark:text-slate-600" />
                </motion.div>

                <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => startPractice('K4')}
                    className="bg-white dark:bg-slate-800 p-6 rounded-3xl border border-slate-100 dark:border-slate-700 shadow-sm cursor-pointer flex items-center gap-4"
                >
                    <div className="p-3 bg-purple-100 dark:bg-purple-900/30 rounded-2xl text-purple-600 dark:text-purple-400">
                        <BrainCircuit size={24} />
                    </div>
                    <div className="flex-1">
                        <div className="flex justify-between items-center">
                            <h3 className="font-bold text-slate-900 dark:text-white">Analitik Məsələlər</h3>
                             <span className="text-xs font-bold px-2 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 rounded-lg">K4</span>
                        </div>
                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Test strategiyası, risk analizi</p>
                    </div>
                    <ChevronRight className="text-slate-300 dark:text-slate-600" />
                </motion.div>
            </div>
        </div>
    );

    // Render Components
    const renderDashboard = () => (
        <div className="grid gap-6">
            {/* Exam Simulator Card */}
            <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="bg-gradient-to-br from-indigo-600 to-purple-700 rounded-3xl p-8 text-white shadow-xl shadow-indigo-500/20 relative overflow-hidden cursor-pointer group"
                onClick={startExam}
            >
                <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full blur-3xl -mr-10 -mt-10 group-hover:scale-150 transition-transform duration-500"></div>
                <div className="relative z-10">
                    <div className="flex items-center justify-between mb-4">
                        <div className="p-3 bg-white/20 rounded-2xl backdrop-blur-md">
                            <Clock size={32} className="text-white" />
                        </div>
                    </div>
                    <h2 className="text-2xl font-black mb-2">Sınaq İmtahanı</h2>
                    <p className="text-indigo-100 mb-6">Real imtahan simulyasiyası: 40 sual, 60 dəqiqə.</p>
                    
                    <div className="flex items-center gap-2 text-sm font-bold text-white/80">
                        <Play size={16} fill="currentColor" />
                        Başla
                    </div>
                </div>
            </motion.div>

            {/* Chapter Practice Card */}
            <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="bg-white dark:bg-slate-800 rounded-3xl p-8 shadow-lg border border-slate-100 dark:border-slate-700 cursor-pointer group relative overflow-hidden"
                onClick={() => setMode('chapters')}
            >
                <div className="absolute right-0 top-0 w-32 h-32 bg-blue-50 dark:bg-blue-900/20 rounded-bl-full -mr-8 -mt-8 transition-transform group-hover:scale-110"></div>
                <div className="relative z-10">
                    <div className="flex items-center gap-4 mb-4">
                        <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-2xl text-blue-600 dark:text-blue-400">
                            <BookOpen size={32} />
                        </div>
                        <div>
                            <h2 className="text-2xl font-black text-slate-900 dark:text-white">Fəsil üzrə Məşq</h2>
                            <p className="text-slate-500 dark:text-slate-400 text-sm">Zəif nöqtələrinizi gücləndirin</p>
                        </div>
                    </div>
                    <div className="flex justify-between items-center mt-6">
                        <div className="flex -space-x-2">
                            {[1, 2, 3].map(i => (
                                <div key={i} className="w-8 h-8 rounded-full bg-slate-200 dark:bg-slate-700 border-2 border-white dark:border-slate-800 flex items-center justify-center text-[10px] font-bold text-slate-500 dark:text-slate-400">
                                    {i}
                                </div>
                            ))}
                            <div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 border-2 border-white dark:border-slate-800 flex items-center justify-center text-[10px] font-bold text-slate-400">+3</div>
                        </div>
                        <ArrowRight className="text-slate-300 group-hover:text-blue-500 transition-colors" />
                    </div>
                </div>
            </motion.div>

            {/* Analytics & Practice Row */}
            <div className="grid grid-cols-2 gap-4">
                <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={loadAnalytics}
                    className="bg-white dark:bg-slate-800 p-6 rounded-3xl border border-slate-100 dark:border-slate-700 shadow-sm cursor-pointer"
                >
                    <BarChart2 className="text-emerald-500 mb-3" size={28} />
                    <h3 className="font-bold text-slate-900 dark:text-white">Analitika</h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">İnkişafınızı izləyin</p>
                </motion.div>
                <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setMode('practice_selection')}
                    className="bg-white dark:bg-slate-800 p-6 rounded-3xl border border-slate-100 dark:border-slate-700 shadow-sm cursor-pointer"
                >
                    <Calculator className="text-orange-500 mb-3" size={28} />
                    <h3 className="font-bold text-slate-900 dark:text-white">Praktiki Məsələlər</h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">K3/K4 Texnikalar</p>
                </motion.div>
            </div>
        </div>
    );

    const renderChapters = () => (
        <div className="space-y-4">
            <div className="flex items-center gap-4 mb-6">
                <button 
                    onClick={() => setMode('dashboard')}
                    className="p-2 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
                >
                    <ArrowLeft size={20} className="text-slate-600 dark:text-slate-400" />
                </button>
                <h2 className="text-2xl font-black text-slate-900 dark:text-white">Fəsillər</h2>
            </div>

            {istqbChapters.map((chapter) => (
                <motion.div
                    key={chapter.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    onClick={() => startChapterQuiz(chapter.id)}
                    className="bg-white dark:bg-slate-800 p-5 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-sm flex items-center gap-4 cursor-pointer group"
                >
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-white shadow-md ${chapter.color}`}>
                        <BookOpen size={20} />
                    </div>
                    <div className="flex-1">
                        <h3 className="font-bold text-slate-900 dark:text-white text-lg group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                            {chapter.id}. {chapter.title}
                        </h3>
                        <p className="text-sm text-slate-500 dark:text-slate-400">{chapter.desc}</p>
                    </div>
                    <ChevronRight className="text-slate-300 dark:text-slate-600 group-hover:text-blue-500 dark:group-hover:text-blue-400" />
                </motion.div>
            ))}
        </div>
    );

    const renderAnalytics = () => (
        <div className="space-y-6">
            <div className="flex items-center gap-4 mb-6">
                <button 
                    onClick={() => setMode('dashboard')}
                    className="p-2 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
                >
                    <ArrowLeft size={20} className="text-slate-600 dark:text-slate-400" />
                </button>
                <h2 className="text-2xl font-black text-slate-900 dark:text-white">Analitika</h2>
            </div>

            <div className="bg-white dark:bg-slate-800 p-6 rounded-3xl border border-slate-100 dark:border-slate-700 shadow-sm">
                <div className="flex items-center gap-3 mb-6">
                    <div className="p-3 bg-emerald-100 dark:bg-emerald-900/30 rounded-2xl text-emerald-600 dark:text-emerald-400">
                        <BarChart2 size={24} />
                    </div>
                    <div>
                        <h3 className="font-bold text-lg text-slate-900 dark:text-white">Ümumi Statistika</h3>
                        <p className="text-slate-500 dark:text-slate-400 text-sm">Həll edilmiş unikal suallar</p>
                    </div>
                </div>

                <div className="space-y-8">
                    {/* Practice Stats */}
                    <div className="space-y-6">
                        <h4 className="font-bold text-slate-400 uppercase tracking-wider text-xs">Praktiki Biliklər</h4>
                        {progressData.filter(i => i.type === 'practice').map((item) => (
                            <div key={item.id}>
                                <div className="flex justify-between mb-2 items-end">
                                    <div>
                                        <span className="text-sm font-bold text-slate-700 dark:text-slate-300 block">
                                            {item.title}
                                        </span>
                                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                                            item.status === 'Ekspert' ? 'bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400' :
                                            item.status === 'Orta' ? 'bg-yellow-100 text-yellow-600 dark:bg-yellow-900/30 dark:text-yellow-400' :
                                            'bg-slate-100 text-slate-600 dark:bg-slate-700 dark:text-slate-400'
                                        }`}>
                                            {item.status}
                                        </span>
                                    </div>
                                    <span className="text-2xl font-black text-slate-900 dark:text-white">{item.percent}%</span>
                                </div>

                                <div className="w-full bg-slate-100 dark:bg-slate-700 rounded-full h-3 overflow-hidden mb-4">
                                    <motion.div
                                        initial={{ width: 0 }}
                                        animate={{ width: `${item.percent}%` }}
                                        transition={{ duration: 1, delay: 0.1 }}
                                        className={`h-full rounded-full ${item.color}`}
                                    />
                                </div>

                                {/* Topic Breakdown */}
                                {item.topicStats && item.topicStats.length > 0 && (
                                    <div className="mb-4 space-y-2 bg-slate-50 dark:bg-slate-900/50 p-3 rounded-xl">
                                        <p className="text-xs font-bold text-slate-500 dark:text-slate-400 mb-2">Mövzular üzrə detallar:</p>
                                        {item.topicStats.map((topic, idx) => (
                                            <div key={idx} className="flex items-center justify-between text-xs">
                                                <span className="text-slate-600 dark:text-slate-300 truncate w-2/3">{topic.topic}</span>
                                                <div className="flex items-center gap-2 w-1/3 justify-end">
                                                    <div className="w-12 bg-slate-200 dark:bg-slate-700 rounded-full h-1.5">
                                                        <div 
                                                            className={`h-1.5 rounded-full ${topic.percent === 100 ? 'bg-green-500' : topic.percent > 0 ? item.color.replace('bg-', 'bg-') : 'bg-slate-300'}`} 
                                                            style={{ width: `${topic.percent}%` }}
                                                        ></div>
                                                    </div>
                                                    <span className="font-mono text-[10px] text-slate-400">{topic.solved}/{topic.total}</span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}

                                <div className="bg-slate-50 dark:bg-slate-700/50 p-3 rounded-xl border border-slate-100 dark:border-slate-700/50 mb-2">
                                    <p className="text-xs text-slate-500 dark:text-slate-400 italic">
                                        "{item.feedback}"
                                    </p>
                                </div>

                                <div className="text-xs text-slate-400 text-right font-medium">
                                    {item.correct} / {item.total} sual həll olunub
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Theory Stats */}
                    <div className="space-y-6 pt-6 border-t border-slate-100 dark:border-slate-700">
                        <h4 className="font-bold text-slate-400 uppercase tracking-wider text-xs">Nəzəri Biliklər (Fəsillər)</h4>
                        {progressData.filter(i => i.type === 'chapter').map((chapter) => (
                            <div key={chapter.id}>
                                <div className="flex justify-between mb-2">
                                    <span className="text-sm font-bold text-slate-700 dark:text-slate-300">{chapter.id}. {chapter.title}</span>
                                    <span className="text-sm font-bold text-emerald-600 dark:text-emerald-400">{chapter.percent}%</span>
                                </div>
                                <div className="w-full bg-slate-100 dark:bg-slate-700 rounded-full h-2.5 overflow-hidden">
                                    <motion.div
                                        initial={{ width: 0 }}
                                        animate={{ width: `${chapter.percent}%` }}
                                        transition={{ duration: 1, delay: 0.1 * chapter.id }}
                                        className={`h-full rounded-full ${chapter.color}`}
                                    />
                                </div>
                                <div className="text-xs text-slate-400 mt-1 text-right">
                                    {chapter.correct} / {chapter.total} sual
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );

    const renderFlashcards = () => {
        const term = glossaryTerms[flashcardIndex];
        const definition = term?.definition[lang] || term?.definition['en'];

        // Icon mapping based on category
        const getCategoryIcon = (category) => {
            switch(category) {
                case 'basics': return BookOpen;
                case 'documentation': return FileText;
                case 'types': return ListChecks;
                case 'techniques': return Target;
                case 'process': return RotateCw;
                case 'bug_management': return Bug;
                case 'automation': return Bot;
                case 'agile': return Zap;
                default: return HelpCircle;
            }
        };

        const CategoryIcon = getCategoryIcon(term?.category);

        const nextCard = () => {
            setFlashcardIndex((prev) => (prev + 1) % glossaryTerms.length);
            setIsFlipped(false);
        };

        return (
            <div className="h-[calc(100vh-200px)] flex flex-col">
                <div className="flex items-center gap-4 mb-6">
                    <button 
                        onClick={() => setMode('dashboard')}
                        className="p-2 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
                    >
                        <ArrowLeft size={20} className="text-slate-600 dark:text-slate-400" />
                    </button>
                    <h2 className="text-2xl font-black text-slate-900 dark:text-white">Terminlər</h2>
                </div>

                <div className="flex-1 flex flex-col items-center justify-center" style={{ perspective: '1000px' }}>
                    <motion.div
                        className="relative w-full max-w-sm aspect-[3/4] cursor-pointer"
                        animate={{ rotateY: isFlipped ? 180 : 0 }}
                        transition={{ duration: 0.6, type: "spring", stiffness: 260, damping: 20 }}
                        onClick={() => setIsFlipped(!isFlipped)}
                        style={{ transformStyle: 'preserve-3d' }}
                    >
                        {/* Front */}
                        <div 
                            className="absolute inset-0 bg-white dark:bg-slate-800 rounded-3xl shadow-xl border-2 border-slate-100 dark:border-slate-700 p-8 flex flex-col items-center justify-center text-center"
                            style={{ backfaceVisibility: 'hidden' }}
                        >
                            <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mb-6">
                                <CategoryIcon size={32} className="text-blue-600 dark:text-blue-400" />
                            </div>
                            <h3 className="text-3xl font-black text-slate-900 dark:text-white mb-4">{term.term}</h3>
                            <p className="text-slate-400 text-sm font-medium uppercase tracking-wider">Toxun və çevir</p>
                        </div>

                        {/* Back */}
                        <div 
                            className="absolute inset-0 bg-gradient-to-br from-indigo-600 to-purple-700 rounded-3xl shadow-xl p-8 flex flex-col items-center justify-center text-center" 
                            style={{ 
                                backfaceVisibility: 'hidden',
                                transform: 'rotateY(180deg)' 
                            }}
                        >
                            <h3 className="text-xl font-bold text-white mb-4">{term.term}</h3>
                            <p className="text-indigo-100 text-lg leading-relaxed">{definition}</p>
                        </div>
                    </motion.div>
                </div>

                <div className="flex justify-center gap-4 mt-8">
                    <button
                        onClick={nextCard}
                        className="flex items-center gap-2 px-8 py-4 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl shadow-sm font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 transition-all"
                    >
                        <XCircle size={20} className="text-red-500" />
                        Bilmirəm
                    </button>
                    <button
                        onClick={nextCard}
                        className="flex items-center gap-2 px-8 py-4 bg-blue-600 text-white rounded-2xl shadow-lg shadow-blue-500/30 font-bold hover:bg-blue-700 transition-all"
                    >
                        <CheckCircle size={20} className="text-white" />
                        Bilirəm
                    </button>
                </div>
            </div>
        );
    };

    const renderQuiz = () => {
        const question = quizQuestions[currentQuestionIndex];
        const chapter = istqbChapters.find(c => c.id === selectedChapter);

        if (showResults) {
            const percentage = Math.round((score / quizQuestions.length) * 100);
            return (
                <div className="text-center py-12">
                    <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6 text-white shadow-xl">
                        <Target size={48} />
                    </div>
                    <h2 className="text-3xl font-black text-slate-900 dark:text-white mb-2">Nəticə</h2>
                    <p className="text-slate-500 dark:text-slate-400 mb-8">Fəsil {selectedChapter}: {chapter?.title}</p>
                    
                    <div className="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-emerald-600 mb-2">
                        {percentage}%
                    </div>
                    <p className="text-lg font-medium text-slate-600 dark:text-slate-300 mb-8">
                        {score} / {quizQuestions.length} düzgün cavab
                    </p>

                    <div className="flex gap-4 justify-center">
                        <button 
                            onClick={() => startChapterQuiz(selectedChapter)}
                            className="px-8 py-3 bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white font-bold rounded-xl hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                        >
                            Yenidən
                        </button>
                        <button 
                            onClick={resetQuiz}
                            className="px-8 py-3 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 shadow-lg shadow-blue-500/30 transition-colors"
                        >
                            Bitir
                        </button>
                    </div>
                </div>
            );
        }

        return (
            <div className="max-w-2xl mx-auto">
                <div className="flex items-center justify-between mb-8">
                    <button 
                        onClick={resetQuiz}
                        className="p-2 -ml-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors"
                    >
                        <ArrowLeft className="text-slate-400" />
                    </button>
                    <div className="text-sm font-bold text-slate-500 dark:text-slate-400">
                        Sual {currentQuestionIndex + 1} / {quizQuestions.length}
                    </div>
                </div>

                <div className="mb-2 flex items-center gap-2">
                    <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-md bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400`}>
                        {question.level}
                    </span>
                    {question.topic && (
                        <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
                             • {question.topic}
                        </span>
                    )}
                </div>

                <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-8 leading-relaxed">
                    {question.question}
                </h2>

                <div className="space-y-3 mb-8">
                    {question.options.map((option, index) => {
                        const isSelected = selectedAnswer === index;
                        const isCorrect = index === question.correctAnswer;
                        let buttonClass = "w-full p-4 rounded-xl text-left font-medium transition-all border-2 ";
                        
                        if (selectedAnswer !== null) {
                            if (isCorrect) buttonClass += "border-green-500 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400";
                            else if (isSelected) buttonClass += "border-red-500 bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400";
                            else buttonClass += "border-slate-100 dark:border-slate-800 text-slate-400 dark:text-slate-600 opacity-50";
                        } else {
                            buttonClass += "border-slate-100 dark:border-slate-700 hover:border-blue-500 dark:hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/10 text-slate-700 dark:text-slate-300";
                        }

                        return (
                            <button
                                key={index}
                                onClick={() => handleAnswer(index)}
                                disabled={selectedAnswer !== null}
                                className={buttonClass}
                            >
                                <div className="flex items-center justify-between">
                                    <span>{option}</span>
                                    {selectedAnswer !== null && isCorrect && <CheckCircle size={20} className="text-green-500" />}
                                    {selectedAnswer !== null && isSelected && !isCorrect && <XCircle size={20} className="text-red-500" />}
                                </div>
                            </button>
                        );
                    })}
                </div>

                {selectedAnswer !== null && (
                    <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-xl border border-blue-100 dark:border-blue-800 mb-6"
                    >
                        <div className="flex gap-2 text-blue-700 dark:text-blue-300 font-bold text-sm mb-1">
                            <HelpCircle size={16} />
                            İzahı:
                        </div>
                        <p className="text-blue-900 dark:text-blue-100 text-sm leading-relaxed">
                            {question.explanation}
                        </p>
                    </motion.div>
                )}

                <div className="flex justify-end">
                    <button
                        onClick={nextQuestion}
                        disabled={selectedAnswer === null}
                        className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition-all ${
                            selectedAnswer !== null
                                ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow-lg hover:scale-105'
                                : 'bg-slate-100 dark:bg-slate-800 text-slate-400 dark:text-slate-600 cursor-not-allowed'
                        }`}
                    >
                        {currentQuestionIndex === quizQuestions.length - 1 ? 'Bitir' : 'Növbəti'}
                        <ChevronRight size={20} />
                    </button>
                </div>
            </div>
        );
    };

    return (
        <PageTransition className="p-6 pt-12 pb-24 min-h-screen bg-slate-50 dark:bg-slate-900 transition-colors duration-300">
            <div className="max-w-md mx-auto">
                {mode === 'dashboard' && (
                    <header className="mb-8">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3 mb-2">
                                <div className="p-3 bg-indigo-100 dark:bg-indigo-900/30 rounded-2xl text-indigo-600 dark:text-indigo-400">
                                    <GraduationCap size={32} />
                                </div>
                                <div>
                                    <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">ISTQB Mərkəzi</h1>
                                    <p className="text-slate-500 dark:text-slate-400 font-medium text-sm">Sertifikasiyaya hazırlıq</p>
                                </div>
                            </div>
                            <button 
                                onClick={() => setShowInfoModal(true)}
                                className="p-3 bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                            >
                                <Info size={24} />
                            </button>
                        </div>
                    </header>
                )}

                {renderInfoModal()}

                <AnimatePresence mode="wait">
                    <motion.div
                        key={mode}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.2 }}
                    >
                        {mode === 'dashboard' && renderDashboard()}
                        {mode === 'practice_selection' && renderPracticeSelection()}
                        {mode === 'chapters' && renderChapters()}
                        {mode === 'quiz' && renderQuiz()}
                        {mode === 'exam' && renderExam()}
                        {mode === 'analytics' && renderAnalytics()}
                    </motion.div>
                </AnimatePresence>
            </div>
        </PageTransition>
    );
}
