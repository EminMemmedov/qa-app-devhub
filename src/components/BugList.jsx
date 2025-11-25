import { motion, AnimatePresence } from 'framer-motion';
import { Bug, CheckCircle, Terminal, Lightbulb, X, Coins } from 'lucide-react';
import { useState } from 'react';
import DifficultyBadge from './DifficultyBadge';

export default function BugList({ bugs, foundBugs, onReset, xp, getBugPoints, getBugDifficulty, deductXP }) {
    const [showHint, setShowHint] = useState(false);
    const [currentHint, setCurrentHint] = useState(null);

    const progress = bugs.length > 0 ? (foundBugs.length / bugs.length) * 100 : 0;

    // All available hints
    const allHints = [
        'Formu doldurun və hər sahəyə müxtəlif məlumatlar daxil edin',
        'Mənfi rəqəmlər daxil etməyə çalışın (-1, -100)',
        'Həddən artıq uzun mətn yazın (məsələn, 1000 simvol)',
        'Xüsusi simvollar istifadə edin: @#$%^&*()',
        'Rənglərə diqqət yetirin - düzgün rənglərdir?',
        'Hərflərdə səhvlər ola bilər - diqqətlə oxuyun',
        'Düymələrin hizalanmasına baxın',
        'Input sahələrinin border rənginə fikir verin',
        'Placeholder mətnlərini yoxlayın',
        'Label mətnlərində səhvlər ola bilər',
        'DevTools açın (F12) və Console tabına baxın',
        'Elements tabında gizli elementlər ola bilər',
        'LocalStorage-ə baxın (Application tab)',
        'XSS üçün <script> teqləri yazmağa çalışın',
        'Formu göndərmədən əvvəl və sonra nə baş verir?',
        'Düymələrə 2 dəfə tez-tez klikləyin',
        'Maksimum uzunluq məhdudiyyətlərini yoxlayın',
        'Keçmiş tarixlər seçməyə çalışın',
        'Gələcək tarixlər seçməyə çalışın',
        'Sıfır (0) dəyərlər daxil edin'
    ];

    const handleGetHint = () => {
        const HINT_COST = 20;

        if (xp < HINT_COST) {
            alert(`Kifayət qədər XP yoxdur. Lazım: ${HINT_COST} XP, Sizin: ${xp} XP`);
            return;
        }

        // Deduct XP
        if (deductXP(HINT_COST)) {
            // Show random hint
            const randomHint = allHints[Math.floor(Math.random() * allHints.length)];
            setCurrentHint(randomHint);
            setShowHint(true);
        }
    };

    return (
        <div className="mt-8">
            {/* Mobile-optimized Header */}
            <div className="bg-gradient-to-r from-slate-50 to-slate-100 rounded-2xl p-4 sm:p-6 mb-4 border border-slate-200">
                {/* Title and Icon Row */}
                <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-sm flex-shrink-0">
                        <Bug size={24} className="text-slate-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                        <h3 className="font-bold text-slate-900 text-base sm:text-lg">Tapılan Baqlar</h3>
                        <div className="flex items-center gap-2 mt-1 flex-wrap">
                            <span className="text-sm font-bold text-slate-600">
                                {foundBugs.length}/{bugs.length}
                            </span>
                            <span className="text-slate-300">•</span>
                            <div className="flex items-center gap-1.5">
                                <Coins size={14} className="text-indigo-500" />
                                <span className="text-sm font-bold text-indigo-600">{xp} XP</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Action Buttons - Stacked on mobile */}
                <div className="grid grid-cols-2 gap-2 mb-4">
                    <button
                        onClick={handleGetHint}
                        className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-bold text-sm transition-all bg-yellow-400 text-yellow-900 hover:bg-yellow-500 shadow-sm active:scale-95 min-h-[44px]"
                    >
                        <Lightbulb size={16} />
                        <span>İpucu</span>
                        <span className="opacity-70 text-xs">-20 XP</span>
                    </button>
                    <button
                        onClick={() => {
                            if (confirm('Bütün tərəqqini sıfırlamaq istədiyinizə əminsiniz?')) {
                                onReset();
                            }
                        }}
                        className="px-4 py-3 text-sm text-red-600 font-bold hover:bg-red-50 active:bg-red-100 rounded-xl transition-colors border-2 border-red-200 min-h-[44px]"
                    >
                        Sıfırla
                    </button>
                </div>

                {/* Progress Bar */}
                <div className="bg-white rounded-xl p-4 shadow-sm">
                    <div className="flex items-center justify-between mb-3">
                        <span className="text-sm font-bold text-slate-600">Proqres</span>
                        <span className="text-sm font-bold text-emerald-600">{Math.round(progress)}%</span>
                    </div>
                    <div className="w-full bg-slate-100 rounded-full h-3 overflow-hidden">
                        <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${progress}%` }}
                            transition={{ duration: 0.5 }}
                            className="h-full bg-gradient-to-r from-green-500 to-emerald-500 rounded-full"
                        />
                    </div>
                </div>
            </div>

            <div className="space-y-3">
                {bugs.map((bug) => {
                    const isFound = foundBugs.includes(bug.id);
                    const difficulty = getBugDifficulty(bug.id);
                    const points = getBugPoints(bug.id);

                    return (
                        <motion.div
                            key={bug.id}
                            initial={false}
                            animate={{
                                backgroundColor: isFound ? 'rgb(240 253 244)' : 'rgb(255 255 255)',
                                borderColor: isFound ? 'rgb(187 247 208)' : 'rgb(241 245 249)',
                                scale: isFound ? 1.02 : 1
                            }}
                            className={`p-4 rounded-2xl border-2 transition-all shadow-sm ${!isFound && 'opacity-60 grayscale'
                                }`}
                        >
                            <div className="flex items-start gap-4">
                                <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${isFound ? 'bg-green-100 text-green-600' : 'bg-slate-100 text-slate-400'
                                    }`}>
                                    {isFound ? <CheckCircle size={16} /> : (bug.isDevTool ? <Terminal size={16} /> : <Bug size={16} />)}
                                </div>
                                <div className="flex-1">
                                    <div className="flex items-start justify-between gap-2 mb-2">
                                        <span className={`font-medium block ${isFound ? 'text-slate-700' : 'text-slate-400'}`}>
                                            {isFound ? bug.description : '???'}
                                        </span>
                                        {isFound && (
                                            <DifficultyBadge difficulty={difficulty} points={points} />
                                        )}
                                    </div>
                                    {bug.isDevTool && !isFound && (
                                        <span className="text-xs text-indigo-400 font-bold mt-1 block">DevTools tələb olunur</span>
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    );
                })}
            </div>

            <AnimatePresence>
                {showHint && currentHint && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
                        onClick={() => setShowHint(false)}
                    >
                        <motion.div
                            initial={{ scale: 0.9 }}
                            animate={{ scale: 1 }}
                            className="bg-gradient-to-br from-yellow-50 to-amber-50 rounded-2xl border-2 border-yellow-300 shadow-2xl max-w-md w-full p-6"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
                                    <Lightbulb className="text-yellow-600" size={24} />
                                </div>
                                <div>
                                    <h3 className="font-bold text-yellow-900">İpucu</h3>
                                    <p className="text-xs text-yellow-700">20 XP çıxıldı</p>
                                </div>
                            </div>

                            <div className="bg-white rounded-xl p-4 mb-4 border border-yellow-200">
                                <p className="text-sm text-slate-700 leading-relaxed">
                                    {currentHint}
                                </p>
                            </div>

                            <button
                                onClick={() => setShowHint(false)}
                                className="w-full py-3 bg-yellow-500 text-white rounded-xl font-bold hover:bg-yellow-600 transition-colors"
                            >
                                Başa düşdüm
                            </button>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
