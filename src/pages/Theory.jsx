import { theoryModules } from '../data/theory';
import { BookOpen, ChevronRight, ArrowLeft, Sparkles, Target, Bug, FileCheck, CheckCircle, AlertTriangle, Info, Lightbulb, XCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useState, useEffect } from 'react';
import PageTransition from '../components/PageTransition';
import confetti from 'canvas-confetti';

const moduleIcons = {
    'qa-basics': Bug,
    'test-types': FileCheck,
    'bug-reporting': Target,
    'test-planning': Sparkles
};

const moduleImages = {
    'qa-basics': '/theory-qa-basics.png',
    'test-types': '/theory-test-types.png',
    'bug-reporting': '/theory-bug-reporting.png',
    'test-planning': '/theory-test-planning.png'
};

const SimpleMarkdown = ({ content }) => {
    return (
        <div className="prose prose-slate prose-lg max-w-none">
            {content.split('\n').map((line, i) => {
                // Headers
                if (line.trim().startsWith('###')) {
                    return (
                        <h3 key={i} className="text-2xl font-black mt-10 mb-6 text-slate-800 flex items-center gap-3">
                            <span className="w-1.5 h-8 bg-gradient-to-b from-indigo-500 to-purple-500 rounded-full"></span>
                            {line.replace('###', '').trim()}
                        </h3>
                    );
                }

                // Bold text blocks (Alerts)
                if (line.trim().startsWith('**') && line.trim().endsWith('**')) {
                    return (
                        <div key={i} className="bg-indigo-50 border-l-4 border-indigo-500 p-5 rounded-r-2xl my-6 shadow-sm">
                            <strong className="text-indigo-900 font-bold flex items-start gap-3">
                                <Info className="w-6 h-6 text-indigo-600 flex-shrink-0 mt-0.5" />
                                <span>{line.replace(/\*\*/g, '')}</span>
                            </strong>
                        </div>
                    );
                }

                // List items
                if (line.trim().startsWith('-')) {
                    return (
                        <li key={i} className="ml-6 list-none pl-2 mb-3 relative flex items-start gap-3">
                            <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 mt-2.5 flex-shrink-0"></span>
                            <span className="text-slate-700 leading-relaxed text-lg">{line.replace('-', '').trim()}</span>
                        </li>
                    );
                }

                // Code blocks (simplified)
                if (line.trim().startsWith('```')) {
                    return null; // Skip code fence markers
                }

                // Empty lines
                if (line.trim() === '') {
                    return <br key={i} />;
                }

                // Regular paragraphs
                return (
                    <p key={i} className="text-slate-600 leading-relaxed mb-4 text-lg">
                        {line}
                    </p>
                );
            })}
        </div>
    );
};

const QuizComponent = ({ quiz, onComplete }) => {
    const [answers, setAnswers] = useState({});
    const [showResults, setShowResults] = useState(false);

    const handleSelect = (qIndex, optionIndex) => {
        if (showResults) return;
        setAnswers(prev => ({ ...prev, [qIndex]: optionIndex }));
    };

    const handleSubmit = () => {
        setShowResults(true);
        const allCorrect = quiz.every((q, i) => answers[i] === q.correct);
        if (allCorrect) {
            confetti({
                particleCount: 100,
                spread: 70,
                origin: { y: 0.6 }
            });
            onComplete();
        }
    };

    const isComplete = Object.keys(answers).length === quiz.length;

    return (
        <div className="mt-12 bg-slate-50 rounded-3xl p-8 border border-slate-200">
            <h3 className="text-2xl font-black text-slate-900 mb-6 flex items-center gap-3">
                <Sparkles className="text-yellow-500" />
                Biliyinizi Yoxlayın
            </h3>

            <div className="space-y-8">
                {quiz.map((q, qIndex) => (
                    <div key={qIndex} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                        <p className="font-bold text-lg text-slate-800 mb-4">{qIndex + 1}. {q.question}</p>
                        <div className="space-y-3">
                            {q.options.map((option, oIndex) => {
                                const isSelected = answers[qIndex] === oIndex;
                                const isCorrect = q.correct === oIndex;
                                let buttonClass = "w-full text-left p-4 rounded-xl border-2 transition-all duration-200 flex items-center justify-between ";

                                if (showResults) {
                                    if (isCorrect) buttonClass += "border-green-500 bg-green-50 text-green-900";
                                    else if (isSelected) buttonClass += "border-red-500 bg-red-50 text-red-900";
                                    else buttonClass += "border-slate-100 text-slate-500 opacity-50";
                                } else {
                                    if (isSelected) buttonClass += "border-indigo-500 bg-indigo-50 text-indigo-900";
                                    else buttonClass += "border-slate-100 hover:border-indigo-200 hover:bg-slate-50 text-slate-700";
                                }

                                return (
                                    <button
                                        key={oIndex}
                                        onClick={() => handleSelect(qIndex, oIndex)}
                                        disabled={showResults}
                                        className={buttonClass}
                                    >
                                        <span className="font-medium">{option}</span>
                                        {showResults && isCorrect && <CheckCircle size={20} className="text-green-500" />}
                                        {showResults && isSelected && !isCorrect && <XCircle size={20} className="text-red-500" />}
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                ))}
            </div>

            {!showResults && (
                <button
                    onClick={handleSubmit}
                    disabled={!isComplete}
                    className={`mt-8 w-full py-4 rounded-xl font-bold text-lg transition-all ${isComplete
                            ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/30 hover:bg-indigo-700 transform hover:-translate-y-1'
                            : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                        }`}
                >
                    Nəticəni Yoxla
                </button>
            )}

            {showResults && (
                <div className="mt-8 p-6 bg-white rounded-2xl border border-slate-100 text-center">
                    <p className="text-xl font-bold text-slate-900 mb-2">
                        {quiz.filter((q, i) => answers[i] === q.correct).length} / {quiz.length} düzgün cavab
                    </p>
                    {quiz.every((q, i) => answers[i] === q.correct) ? (
                        <p className="text-green-600 font-medium">Əla nəticə! 🎉</p>
                    ) : (
                        <p className="text-orange-500 font-medium">Yenidən cəhd edin 💪</p>
                    )}
                </div>
            )}
        </div>
    );
};

const container = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1
        }
    }
};

const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
};

export default function Theory() {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const { moduleId } = useParams();
    const selectedModule = theoryModules.find(m => m.id === moduleId);

    // Progress state
    const [completedModules, setCompletedModules] = useState(() => {
        try {
            return JSON.parse(localStorage.getItem('theory_progress') || '[]');
        } catch {
            return [];
        }
    });

    const handleModuleComplete = (moduleId) => {
        if (!completedModules.includes(moduleId)) {
            const newCompleted = [...completedModules, moduleId];
            setCompletedModules(newCompleted);
            localStorage.setItem('theory_progress', JSON.stringify(newCompleted));
        }
    };

    const handleModuleClick = (module) => {
        navigate(`/theory/${module.id}`);
    };

    const handleBackClick = () => {
        navigate('/theory');
    };

    const handleNextModule = () => {
        const currentIndex = theoryModules.findIndex(m => m.id === selectedModule.id);
        if (currentIndex < theoryModules.length - 1) {
            navigate(`/theory/${theoryModules[currentIndex + 1].id}`);
            window.scrollTo(0, 0);
        } else {
            navigate('/theory');
        }
    };

    return (
        <PageTransition className="p-6 pt-12 pb-24 min-h-screen bg-gradient-to-b from-slate-50 to-white">
            <AnimatePresence mode="wait">
                {!selectedModule ? (
                    <motion.div
                        key="list"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        <header className="mb-8">
                            <motion.div
                                initial={{ opacity: 0, y: -20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="flex items-center gap-3 mb-4"
                            >
                                <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg shadow-indigo-200">
                                    <BookOpen size={24} className="text-white" />
                                </div>
                                <div>
                                    <h1 className="text-4xl font-black text-slate-900 tracking-tight">{t('theory.title')}</h1>
                                    <p className="text-slate-500 font-medium">{t('theory.subtitle')}</p>
                                </div>
                            </motion.div>
                        </header>

                        <motion.div
                            variants={container}
                            initial="hidden"
                            animate="show"
                            className="space-y-4"
                        >
                            {theoryModules.map((module) => {
                                const Icon = moduleIcons[module.id] || BookOpen;
                                const titleKey = module.id.replace(/-([a-z])/g, (g) => g[1].toUpperCase());
                                const isCompleted = completedModules.includes(module.id);

                                return (
                                    <motion.div
                                        key={module.id}
                                        variants={item}
                                        whileHover={{ scale: 1.02, y: -4 }}
                                        whileTap={{ scale: 0.98 }}
                                        onClick={() => handleModuleClick(module)}
                                        className="group bg-white rounded-3xl p-6 shadow-md border-2 border-slate-100 flex items-center gap-5 cursor-pointer hover:shadow-2xl hover:shadow-indigo-100/50 hover:border-indigo-200 transition-all duration-300 relative overflow-hidden"
                                    >
                                        <div className="absolute inset-0 bg-gradient-to-r from-indigo-50/0 via-indigo-50/50 to-purple-50/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                                        <div className={`relative w-16 h-16 rounded-2xl ${module.color} flex items-center justify-center text-white shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-all duration-300`}>
                                            <Icon size={28} strokeWidth={2.5} />
                                            {isCompleted && (
                                                <div className="absolute -top-2 -right-2 bg-green-500 text-white rounded-full p-1 border-2 border-white shadow-sm">
                                                    <CheckCircle size={12} fill="currentColor" />
                                                </div>
                                            )}
                                        </div>

                                        <div className="flex-1 relative z-10">
                                            <h3 className="text-xl font-bold text-slate-900 mb-1 group-hover:text-indigo-600 transition-colors flex items-center gap-2">
                                                {t(`theory.${titleKey}`, module.title)}
                                                {isCompleted && <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-bold">Tamamlandı</span>}
                                            </h3>
                                            <p className="text-slate-500 text-sm leading-snug">
                                                {module.description}
                                            </p>
                                        </div>

                                        <ChevronRight
                                            size={24}
                                            className="text-slate-300 group-hover:text-indigo-500 group-hover:translate-x-1 transition-all duration-300 relative z-10"
                                        />
                                    </motion.div>
                                );
                            })}
                        </motion.div>
                    </motion.div>
                ) : (
                    <motion.div
                        key="detail"
                        initial={{ opacity: 0, y: '100%' }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: '100%' }}
                        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                        className="fixed inset-0 z-50 bg-gradient-to-b from-white to-slate-50 flex flex-col"
                    >
                        <div className="p-6 border-b border-slate-200 flex items-center gap-4 bg-white/90 backdrop-blur-md sticky top-0 shadow-sm z-50">
                            <button
                                onClick={handleBackClick}
                                className="flex items-center gap-2 px-4 py-2 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors group"
                            >
                                <ArrowLeft size={18} className="text-slate-600 group-hover:-translate-x-1 transition-transform" />
                                <span className="font-medium text-slate-700">{t('common.back')}</span>
                            </button>
                            <div className="flex-1">
                                <h2 className="text-xl font-bold text-slate-900">{selectedModule.title}</h2>
                                <p className="text-sm text-slate-500 mt-0.5">{selectedModule.description}</p>
                            </div>
                            <div className="w-12"></div> {/* Spacer for balance */}
                        </div>

                        <div className="flex-1 overflow-y-auto">
                            <div className="max-w-3xl mx-auto p-6 pb-32">
                                <div className="mb-8 p-8 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-3xl shadow-xl relative overflow-hidden">
                                    <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16"></div>
                                    <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full -ml-12 -mb-12"></div>
                                    <div className="relative z-10">
                                        {moduleImages[selectedModule.id] && (
                                            <div className="mb-6 flex justify-center">
                                                <img
                                                    src={moduleImages[selectedModule.id]}
                                                    alt={selectedModule.title}
                                                    loading="lazy"
                                                    decoding="async"
                                                    width="192"
                                                    height="192"
                                                    className="w-48 h-48 object-contain rounded-2xl bg-white/10 p-4 backdrop-blur-sm"
                                                />
                                            </div>
                                        )}
                                        <div className={`inline-flex items-center justify-center w-16 h-16 ${selectedModule.color} bg-white/20 backdrop-blur-sm rounded-2xl mb-4`}>
                                            {(() => {
                                                const Icon = moduleIcons[selectedModule.id] || BookOpen;
                                                return <Icon size={32} className="text-white" strokeWidth={2.5} />;
                                            })()}
                                        </div>
                                        <h1 className="text-3xl font-black text-white mb-2">{selectedModule.title}</h1>
                                        <p className="text-blue-100 text-lg">{selectedModule.description}</p>
                                    </div>
                                </div>

                                <div className="bg-white rounded-3xl p-8 shadow-lg border border-slate-100 mb-8">
                                    <SimpleMarkdown content={selectedModule.content} />
                                </div>

                                {selectedModule.quiz && (
                                    <QuizComponent
                                        quiz={selectedModule.quiz}
                                        onComplete={() => handleModuleComplete(selectedModule.id)}
                                    />
                                )}

                                <div className="mt-12 flex justify-end">
                                    <button
                                        onClick={handleNextModule}
                                        className="flex items-center gap-2 px-8 py-4 bg-slate-900 text-white rounded-2xl font-bold hover:bg-slate-800 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                                    >
                                        Növbəti Dərs <ChevronRight size={20} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </PageTransition>
    );
}
