import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Database as DbIcon, Play, CheckCircle, AlertCircle, Bug, Table, Search, ChevronLeft, Lock, Unlock, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import PageTransition from '../../components/PageTransition';
import { useGameProgress } from '../../hooks/useGameProgress';
import { useAchievements } from '../../hooks/useAchievements';
import { useTranslation } from 'react-i18next';
import confetti from 'canvas-confetti';

export default function Database() {
    const { t } = useTranslation();
    const { addXP, xp } = useGameProgress();
    const { checkAchievements } = useAchievements();

    const [level, setLevel] = useState(1);
    const [userAnswers, setUserAnswers] = useState(() => {
        const saved = localStorage.getItem('qa_database_answers');
        return saved ? JSON.parse(saved) : {};
    });
    const [feedback, setFeedback] = useState(null);
    const [completedLevels, setCompletedLevels] = useState(() => {
        const saved = localStorage.getItem('qa_database_completed');
        return saved ? JSON.parse(saved) : [];
    });

    // Persist to localStorage
    useEffect(() => {
        localStorage.setItem('qa_database_answers', JSON.stringify(userAnswers));
    }, [userAnswers]);

    useEffect(() => {
        localStorage.setItem('qa_database_completed', JSON.stringify(completedLevels));
    }, [completedLevels]);

    // Level Data
    const levels = {
        1: {
            title: t('database.levels.level1'),
            description: t('database.levels.level1_desc'),
            buggyCode: `// Get user orders
const userId = req.body.userId;

// Bug: SQL Injection & SELECT *
const query = "SELECT * FROM Users, Orders WHERE Users.id = " + userId;

db.execute(query);`,
            hint: "Use parameterized queries (?) and specify columns instead of *.",
            validate: (code) => {
                const hasParams = code.includes('?') || code.includes('$1');
                const hasSelectAll = code.includes('SELECT *');
                const hasConcat = code.includes('+ userId') || code.includes('${userId}');
                return hasParams && !hasSelectAll && !hasConcat;
            }
        },
        2: {
            title: t('database.levels.level2'),
            description: t('database.levels.level2_desc'),
            buggyCode: `// Get active orders
// Bug: Missing JOIN condition & Index
const query = \`
    SELECT u.name, o.amount 
    FROM Users u, Orders o 
    WHERE o.status = 'active'
\`;`,
            hint: "Use INNER JOIN ... ON ... to avoid Cartesian Product.",
            validate: (code) => {
                const lower = code.toLowerCase();
                const hasJoin = lower.includes('join') && lower.includes('on');
                return hasJoin;
            }
        },
        3: {
            title: t('database.levels.level3'),
            description: t('database.levels.level3_desc'),
            buggyCode: `// Transfer money
const transfer = async (fromId, toId, amount) => {
    // Bug: No Transaction & N+1 Problem
    await db.query('UPDATE Accounts SET balance = balance - ? WHERE id = ?', [amount, fromId]);
    
    const history = await db.query('SELECT * FROM History');
    for(let h of history) {
        await db.query('SELECT * FROM Meta WHERE h_id = ?', [h.id]);
    }

    await db.query('UPDATE Accounts SET balance = balance + ? WHERE id = ?', [amount, toId]);
};`,
            hint: "Wrap updates in BEGIN/COMMIT transaction.",
            validate: (code) => {
                const lower = code.toLowerCase();
                const hasTransaction = (lower.includes('begin') || lower.includes('start transaction')) && lower.includes('commit');
                return hasTransaction;
            }
        },
        4: {
            title: t('database.levels.level4'),
            description: t('database.levels.level4_desc'),
            buggyCode: `// Get users with more than 5 orders
// Bug: Filtering aggregate in WHERE
const query = \`
    SELECT user_id, COUNT(*) as order_count
    FROM Orders
    WHERE COUNT(*) > 5
    GROUP BY user_id
\`;`,
            hint: "Use HAVING for filtering aggregate functions (COUNT, SUM).",
            validate: (code) => {
                const lower = code.toLowerCase();
                const hasHaving = lower.includes('having count');
                const hasWhereCount = lower.includes('where count');
                return hasHaving && !hasWhereCount;
            }
        },
        5: {
            title: t('database.levels.level5'),
            description: t('database.levels.level5_desc'),
            buggyCode: `// Register User
const register = async (username, password) => {
    // Bug: Storing password in plain text
    await db.query('INSERT INTO Users (username, password) VALUES (?, ?)', [username, password]);
};`,
            hint: "Hash the password before storing (e.g., bcrypt.hash).",
            validate: (code) => {
                const lower = code.toLowerCase();
                const hasHash = lower.includes('hash') || lower.includes('bcrypt') || lower.includes('md5') || lower.includes('sha');
                return hasHash;
            }
        }
    };

    const currentLevelData = levels[level];

    // Reset feedback on level change
    useEffect(() => {
        setFeedback(null);
    }, [level]);

    const handleCodeChange = (e) => {
        const newCode = e.target.value;
        setUserAnswers(prev => ({
            ...prev,
            [level]: newCode
        }));
    };

    const checkAnswer = () => {
        const codeToCheck = userAnswers[level] || '';
        const isValid = currentLevelData.validate(codeToCheck);

        if (isValid) {
            setFeedback({ type: 'success', message: t('database.correct') });
            confetti({
                particleCount: 100,
                spread: 70,
                origin: { y: 0.6 }
            });

            if (!completedLevels.includes(level)) {
                const newCompletedLevels = [...completedLevels, level];
                setCompletedLevels(newCompletedLevels);
                addXP(200);

                // Check achievements
                const savedAutoLevels = JSON.parse(localStorage.getItem('qa_automation_completed') || '[]');

                checkAchievements({
                    xp: xp + 200,
                    completedLevels: {
                        database: newCompletedLevels,
                        automation: savedAutoLevels
                    },
                    addXP,
                    foundBugs: [],
                    moduleBugs: {},
                    getBugDifficulty: () => 'easy'
                });
            }
        } else {
            setFeedback({ type: 'error', message: t('database.incorrect') });
        }
    };

    return (
        <PageTransition className="min-h-screen bg-slate-900 text-slate-300 p-6 pt-20 pb-24">
            <div className="max-w-7xl mx-auto">
                {/* Header & Back Button */}
                <div className="flex items-center gap-4 mb-8">
                    <Link to="/practice" className="p-2 bg-slate-800 rounded-xl hover:bg-slate-700 transition-colors">
                        <ChevronLeft className="text-white" />
                    </Link>
                    <div>
                        <h1 className="text-3xl font-bold text-white flex items-center gap-3">
                            <DbIcon size={32} className="text-indigo-500" />
                            {t('database.title')}
                        </h1>
                        <p className="text-slate-400">{t('database.description')}</p>
                    </div>
                </div>

                {/* Level Selector */}
                <div className="flex gap-4 mb-8 overflow-x-auto pb-2">
                    {[1, 2, 3, 4, 5].map((lvl) => {
                        const isLocked = lvl > 1 && !completedLevels.includes(lvl - 1);
                        const isCompleted = completedLevels.includes(lvl);

                        return (
                            <button
                                key={lvl}
                                onClick={() => !isLocked && setLevel(lvl)}
                                disabled={isLocked}
                                className={`flex-1 min-w-[150px] p-4 rounded-xl border-2 transition-all flex flex-col items-center gap-2 ${level === lvl
                                    ? 'border-indigo-500 bg-indigo-500/10 text-white'
                                    : isLocked
                                        ? 'border-slate-800 bg-slate-800/50 text-slate-600 cursor-not-allowed'
                                        : 'border-slate-700 bg-slate-800 text-slate-400 hover:border-slate-600'
                                    }`}
                            >
                                <div className="flex items-center gap-2">
                                    {isLocked ? <Lock size={16} /> : isCompleted ? <CheckCircle size={16} className="text-green-500" /> : <Unlock size={16} />}
                                    <span className="font-bold">{t(`database.levels.level${lvl}`)}</span>
                                </div>
                            </button>
                        );
                    })}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-[600px]">
                    {/* Left: Buggy Code (Read-only) */}
                    <div className="bg-slate-800 rounded-2xl overflow-hidden shadow-xl border border-slate-700 flex flex-col">
                        <div className="px-4 py-3 bg-slate-950 border-b border-slate-700 flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <Bug size={18} className="text-red-400" />
                                <span className="font-mono text-sm font-bold text-slate-200">Buggy Code</span>
                            </div>
                            <span className="text-xs text-slate-400 italic ml-4 text-right">
                                {currentLevelData.description}
                            </span>
                        </div>
                        <div className="p-4 font-mono text-sm overflow-auto flex-1 bg-slate-900/50">
                            <pre className="text-red-300/80">{currentLevelData.buggyCode}</pre>
                        </div>
                    </div>

                    {/* Right: Solution Editor */}
                    <div className="bg-slate-800 rounded-2xl overflow-hidden shadow-xl border border-slate-700 flex flex-col">
                        <div className="px-4 py-3 bg-slate-950 border-b border-slate-700 flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <CheckCircle size={18} className="text-green-400" />
                                <span className="font-mono text-sm font-bold text-slate-200">{t('database.fix_instruction')}</span>
                            </div>
                            <button
                                onClick={checkAnswer}
                                className="flex items-center gap-2 px-4 py-1.5 rounded-lg text-sm font-bold bg-indigo-600 hover:bg-indigo-700 text-white transition-all shadow-lg shadow-indigo-500/20"
                            >
                                {t('database.check')}
                                <ArrowRight size={14} />
                            </button>
                        </div>
                        <textarea
                            value={userAnswers[level] || ''}
                            onChange={handleCodeChange}
                            placeholder={t('database.placeholder')}
                            className="flex-1 w-full bg-slate-900 p-4 font-mono text-sm text-green-300 focus:outline-none resize-none"
                            spellCheck="false"
                        />

                        {/* Feedback Area */}
                        <AnimatePresence>
                            {feedback && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0 }}
                                    className={`p-4 border-t ${feedback.type === 'success'
                                        ? 'bg-green-500/10 border-green-500/20 text-green-400'
                                        : 'bg-red-500/10 border-red-500/20 text-red-400'
                                        }`}
                                >
                                    <div className="flex items-center gap-2 font-bold">
                                        {feedback.type === 'success' ? <CheckCircle size={18} /> : <AlertCircle size={18} />}
                                        {feedback.message}
                                    </div>
                                    {feedback.type === 'error' && (
                                        <div className="mt-1 text-xs opacity-70 ml-6">
                                            {t('database.hint')}: {currentLevelData.hint}
                                        </div>
                                    )}
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </PageTransition>
    );
}
