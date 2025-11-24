import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lightbulb, ChevronRight, Lock, Unlock, Star } from 'lucide-react';

export default function HintSystem({ totalBugs, foundBugsCount }) {
    const [showHints, setShowHints] = useState(false);

    // Hints unlock based on progress
    const hints = [
        {
            level: 1,
            title: 'Başlanğıc məsləhəti',
            unlockAt: 0, // Always unlocked
            icon: Lightbulb,
            content: 'Formanı diqqətlə yoxlayın. Hər bir sahəyə müxtəlif məlumatlar daxil edin və nə baş verdiyinə baxın.'
        },
        {
            level: 2,
            title: 'Validasiya yoxlaması',
            unlockAt: Math.ceil(totalBugs * 0.2), // Unlock at 20% progress
            icon: Star,
            content: 'Input sahələrinə düzgün olmayan məlumatlar daxil etməyə çalışın: mənfi rəqəmlər, həddən artıq uzun mətnlər, xüsusi simvollar.'
        },
        {
            level: 3,
            title: 'Vizual elementlər',
            unlockAt: Math.ceil(totalBugs * 0.4), // Unlock at 40% progress
            icon: Star,
            content: 'Düymələrə, yazılara və rənglərə diqqət yetirin. Hərflərdə səhvlər, yanlış rənglər və ya düzgün olmayan hizalanmalar ola bilər.'
        },
        {
            level: 4,
            title: 'DevTools istifadəsi',
            unlockAt: Math.ceil(totalBugs * 0.6), // Unlock at 60% progress
            icon: Star,
            content: 'Bəzi baqları tapmaq üçün brauzerin DevTools alətindən istifadə edin. Console və Elements tablarına baxın.'
        },
        {
            level: 5,
            title: 'Təhlükəsizlik yoxlaması',
            unlockAt: Math.ceil(totalBugs * 0.8), // Unlock at 80% progress
            icon: Star,
            content: 'XSS hücumları üçün <script> teqləri, SQL injection üçün \' simvolları və digər təhlükəsizlik problemlərini yoxlayın.'
        }
    ];

    const getUnlockedHints = () => {
        return hints.filter(hint => foundBugsCount >= hint.unlockAt);
    };

    const getNextHintProgress = () => {
        const lockedHints = hints.filter(hint => foundBugsCount < hint.unlockAt);
        if (lockedHints.length === 0) return null;

        const nextHint = lockedHints[0];
        const progress = (foundBugsCount / nextHint.unlockAt) * 100;
        const remaining = nextHint.unlockAt - foundBugsCount;

        return { progress, remaining, hint: nextHint };
    };

    const unlockedHints = getUnlockedHints();
    const nextHintInfo = getNextHintProgress();

    return (
        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-4 border-2 border-blue-200">
            <button
                onClick={() => setShowHints(!showHints)}
                className="w-full flex items-center justify-between text-left"
            >
                <div className="flex items-center gap-2">
                    <Lightbulb className="text-blue-600" size={20} />
                    <span className="font-bold text-blue-900">
                        İpucular ({unlockedHints.length}/{hints.length})
                    </span>
                </div>
                <motion.div
                    animate={{ rotate: showHints ? 90 : 0 }}
                    transition={{ duration: 0.2 }}
                >
                    <ChevronRight className="text-blue-600" size={20} />
                </motion.div>
            </button>

            <AnimatePresence>
                {showHints && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="mt-4 space-y-3 overflow-hidden"
                    >
                        {hints.map((hint) => {
                            const isUnlocked = foundBugsCount >= hint.unlockAt;
                            const Icon = isUnlocked ? Unlock : Lock;

                            return (
                                <motion.div
                                    key={hint.level}
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: hint.level * 0.1 }}
                                    className={`p-3 rounded-xl border-2 transition-all ${isUnlocked
                                            ? 'bg-white border-blue-300 shadow-sm'
                                            : 'bg-blue-50 border-blue-200 opacity-60'
                                        }`}
                                >
                                    <div className="flex items-center gap-2 mb-2">
                                        <Icon
                                            className={isUnlocked ? 'text-green-600' : 'text-slate-400'}
                                            size={16}
                                        />
                                        <span className="text-sm font-bold text-blue-900">
                                            {hint.title}
                                        </span>
                                        {!isUnlocked && (
                                            <span className="ml-auto text-xs text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full">
                                                {hint.unlockAt} baq
                                            </span>
                                        )}
                                    </div>

                                    {isUnlocked ? (
                                        <p className="text-sm text-slate-700 leading-relaxed">
                                            {hint.content}
                                        </p>
                                    ) : (
                                        <p className="text-sm text-slate-400 italic">
                                            {hint.unlockAt - foundBugsCount} baq daha tapın
                                        </p>
                                    )}
                                </motion.div>
                            );
                        })}

                        {nextHintInfo && (
                            <div className="pt-3 border-t border-blue-200">
                                <div className="flex items-center justify-between mb-2">
                                    <span className="text-xs font-bold text-blue-700">
                                        Növbəti ipucu
                                    </span>
                                    <span className="text-xs text-blue-600">
                                        {nextHintInfo.remaining} baq qalıb
                                    </span>
                                </div>
                                <div className="w-full bg-blue-100 rounded-full h-2 overflow-hidden">
                                    <motion.div
                                        initial={{ width: 0 }}
                                        animate={{ width: `${nextHintInfo.progress}%` }}
                                        transition={{ duration: 0.5 }}
                                        className="h-full bg-gradient-to-r from-blue-500 to-indigo-500"
                                    />
                                </div>
                            </div>
                        )}

                        {unlockedHints.length === hints.length && (
                            <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                className="p-3 bg-gradient-to-r from-green-100 to-emerald-100 border-2 border-green-300 rounded-xl text-center"
                            >
                                <p className="text-sm font-bold text-green-700">
                                    🎉 Bütün ipucular açıldı!
                                </p>
                            </motion.div>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
