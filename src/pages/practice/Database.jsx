import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Database as DbIcon, Play, CheckCircle, AlertCircle, RefreshCw, Terminal, ChevronLeft, Lock, Unlock, Table, Eye, RotateCcw, Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import PageTransition from '../../components/PageTransition';
import { useGameProgress } from '../../hooks/useGameProgress';
import { useAchievements } from '../../hooks/useAchievements';
import { useTranslation } from 'react-i18next';
import confetti from 'canvas-confetti';

// Mock Database Data
const initialDB = {
    users: [
        { id: 1, username: 'admin', email: 'admin@example.com', status: 'active', role: 'admin' },
        { id: 2, username: 'john_doe', email: 'john@test.com', status: 'active', role: 'user' },
        { id: 3, username: 'jane_smith', email: 'jane@test.com', status: 'inactive', role: 'user' },
        { id: 4, username: 'hacker_1337', email: 'x@hacked.com', status: 'banned', role: 'user' },
        { id: 5, username: 'guest', email: 'guest@temp.mail', status: 'active', role: 'guest' }
    ],
    orders: [
        { id: 101, user_id: 2, amount: 50.00, status: 'completed' },
        { id: 102, user_id: 2, amount: 120.50, status: 'pending' },
        { id: 103, user_id: 3, amount: 15.00, status: 'cancelled' }
    ]
};

export default function Database() {
    const { t } = useTranslation();
    const { addXP, xp } = useGameProgress();
    const { checkAchievements } = useAchievements();

    const [level, setLevel] = useState(1);
    const [userInputs, setUserInputs] = useState({}); // { levelId: query }
    const [query, setQuery] = useState('');
    const [hasSeenAnswer, setHasSeenAnswer] = useState(false); // Reset on level change

    const [history, setHistory] = useState([]);
    const [historyIndex, setHistoryIndex] = useState(-1);
    const [result, setResult] = useState(null);
    const [completedLevels, setCompletedLevels] = useState(() => {
        const saved = localStorage.getItem('qa_database_completed');
        return saved ? JSON.parse(saved) : [];
    });

    const textareaRef = useRef(null);

    // Persist completed levels
    useEffect(() => {
        localStorage.setItem('qa_database_completed', JSON.stringify(completedLevels));
    }, [completedLevels]);

    // Level Logic
    const levels = {
        1: {
            id: 1,
            task: t('database.levels.level1_task'),
            expected: (db) => db.users,
            validate: (res) => res.length === 5 && res[0].username,
            hint: "Bütün istifadəçiləri seçmək üçün: SELECT * FROM users",
            answer: "SELECT * FROM users"
        },
        2: {
            id: 2,
            task: t('database.levels.level2_task'),
            expected: (db) => db.users.filter(u => u.status === 'active'),
            validate: (res) => res.length === 3 && res.every(r => r.status === 'active'),
            hint: "Yalnız aktiv istifadəçiləri seçmək üçün WHERE şərtindən istifadə edin",
            answer: "SELECT * FROM users WHERE status = 'active'"
        },
        3: {
            id: 3,
            task: t('database.levels.level3_task'),
            expected: (db) => db.users.map(u => ({ username: u.username, email: u.email })),
            validate: (res) => res.length > 0 && Object.keys(res[0]).length === 2 && res[0].username && res[0].email && !res[0].id,
            hint: "Yalnız username və email sütunlarını seçin (vergüllə ayırın)",
            answer: "SELECT username, email FROM users"
        },
        4: {
            id: 4,
            task: t('database.levels.level4_task'),
            expected: (db) => [...db.users].sort((a, b) => b.id - a.id),
            validate: (res) => res.length === 5 && res[0].id === 5,
            hint: "Nəticələri ID-yə görə azalan sıra ilə göstərin (ORDER BY ... DESC)",
            answer: "SELECT * FROM users ORDER BY id DESC"
        },
        5: {
            id: 5,
            task: t('database.levels.level5_task'),
            expected: (db) => db.users,
            validate: (res, q) => res.length === 5 && (q.toLowerCase().includes('or 1=1') || q.toLowerCase().includes('or true')),
            hint: "SQL Injection: WHERE şərtində həmişə doğru olan ifadə yazın (OR 1=1)",
            answer: "SELECT * FROM users WHERE username = 'admin' OR 1=1"
        }
    };

    const currentLevel = levels[level];

    // Handle Level Change
    useEffect(() => {
        // Load saved input for this level or empty
        setQuery(userInputs[level] || '');
        setHasSeenAnswer(false); // Reset cheat flag
        setResult(null); // Clear previous results
    }, [level]);

    const handleQueryChange = (val) => {
        setQuery(val);
        setUserInputs(prev => ({ ...prev, [level]: val }));
    };

    const handleShowAnswer = () => {
        setHasSeenAnswer(true);
        handleQueryChange(currentLevel.answer);
    };

    // Simple SQL Engine
    const executeSQL = (sql) => {
        const q = sql.trim();
        if (!q) return;

        const lowerQ = q.toLowerCase();

        setHistory(prev => [...prev, q]);
        setHistoryIndex(-1);

        try {
            // Basic validation
            if (!lowerQ.startsWith('select')) {
                throw new Error("Only SELECT queries are supported in this terminal.");
            }

            let data = [...initialDB.users]; // Default table
            let columns = Object.keys(initialDB.users[0]);

            // 1. Parse Table (FROM)
            const fromMatch = lowerQ.match(/from\s+(\w+)/);
            if (!fromMatch) throw new Error("Syntax Error: Missing FROM clause.");

            const tableName = fromMatch[1];
            if (!initialDB[tableName]) throw new Error(`Table '${tableName}' not found.`);
            data = [...initialDB[tableName]];
            columns = Object.keys(data[0]);

            // 2. Parse WHERE
            if (lowerQ.includes('where')) {
                const wherePart = q.substring(lowerQ.indexOf('where') + 5).split(/order by/i)[0].trim();

                // Handle SQL Injection Level 5
                if (level === 5 && (wherePart.includes('OR 1=1') || wherePart.includes('OR true'))) {
                    // Return all data (Injection successful)
                } else {
                    // Simple parser
                    const conditionMatch = wherePart.match(/(\w+)\s*(=|!=|>|<)\s*['"]?([^'"]+)['"]?/);

                    if (conditionMatch) {
                        const [_, field, op, val] = conditionMatch;
                        data = data.filter(row => {
                            const rowVal = row[field];
                            const cmpVal = isNaN(val) ? val : Number(val);

                            switch (op) {
                                case '=': return rowVal == cmpVal;
                                case '!=': return rowVal != cmpVal;
                                case '>': return rowVal > cmpVal;
                                case '<': return rowVal < cmpVal;
                                default: return false;
                            }
                        });
                    }
                }
            }

            // 3. Parse SELECT columns
            const selectPart = q.substring(6, lowerQ.indexOf('from')).trim();
            if (selectPart !== '*') {
                const requestedCols = selectPart.split(',').map(c => c.trim());
                // Validate columns
                const invalidCol = requestedCols.find(c => !columns.includes(c));
                if (invalidCol) throw new Error(`Column '${invalidCol}' not found in '${tableName}'.`);

                data = data.map(row => {
                    const newRow = {};
                    requestedCols.forEach(col => newRow[col] = row[col]);
                    return newRow;
                });
                columns = requestedCols;
            }

            // 4. Parse ORDER BY
            if (lowerQ.includes('order by')) {
                const orderPart = lowerQ.split('order by')[1].trim();
                const [field, dir] = orderPart.split(/\s+/);

                if (field && columns.includes(field)) {
                    data.sort((a, b) => {
                        if (dir === 'desc') return b[field] > a[field] ? 1 : -1;
                        return a[field] > b[field] ? 1 : -1;
                    });
                }
            }

            // Validation check
            const passed = currentLevel.validate(data, q);

            setResult({
                columns: columns,
                rows: data,
                success: passed,
                error: null
            });

            if (passed && !completedLevels.includes(level)) {
                handleLevelComplete();
            } else if (passed) {
                confetti({ particleCount: 50, spread: 50, origin: { y: 0.7 } });
            }

        } catch (err) {
            setResult({
                columns: [],
                rows: [],
                success: false,
                error: err.message
            });
        }
    };

    const handleLevelComplete = () => {
        confetti({ particleCount: 150, spread: 70, origin: { y: 0.6 } });
        const newCompleted = [...completedLevels, level];
        setCompletedLevels(newCompleted);

        // Only award XP if answer wasn't shown
        const xpAmount = hasSeenAnswer ? 0 : 300;
        if (xpAmount > 0) addXP(xpAmount);

        // Check achievements
        checkAchievements({
            xp: xp + xpAmount,
            completedLevels: { database: newCompleted },
            addXP, // Pass function, but achievements hook might add XP internally. 
            // Ideally we should control XP here, but for now let's pass 0 if cheated.
            foundBugs: [],
            moduleBugs: {},
            getBugDifficulty: () => 'medium'
        });
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            executeSQL(query);
        }
        if (e.key === 'ArrowUp') {
            e.preventDefault();
            if (historyIndex < history.length - 1) {
                const newIndex = historyIndex + 1;
                setHistoryIndex(newIndex);
                handleQueryChange(history[history.length - 1 - newIndex]);
            }
        }
        if (e.key === 'ArrowDown') {
            e.preventDefault();
            if (historyIndex > 0) {
                const newIndex = historyIndex - 1;
                setHistoryIndex(newIndex);
                handleQueryChange(history[history.length - 1 - newIndex]);
            } else {
                setHistoryIndex(-1);
                handleQueryChange('');
            }
        }
    };

    return (
        <PageTransition className="min-h-screen bg-slate-900 text-slate-300 p-4 sm:p-6 pt-20 pb-24">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-4">
                        <Link to="/practice" className="p-2 bg-slate-800 rounded-xl hover:bg-slate-700 transition-colors">
                            <ChevronLeft className="text-white" />
                        </Link>
                        <div>
                            <h1 className="text-2xl sm:text-4xl font-bold text-white flex items-center gap-3">
                                <DbIcon size={32} className="text-indigo-500" />
                                {t('database.title')}
                            </h1>
                            <p className="text-slate-400">{t('database.description')}</p>
                        </div>
                    </div>
                    <button
                        onClick={() => {
                            if (window.confirm(t('common.reset_confirm') || "Are you sure you want to reset progress?")) {
                                setCompletedLevels([]);
                                setLevel(1);
                                setUserInputs({});
                                setHistory([]);
                                setResult(null);
                            }
                        }}
                        className="p-2 text-slate-500 hover:text-red-400 transition-colors"
                        title="Reset Progress"
                    >
                        <Trash2 size={20} />
                    </button>
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
                                    <span className="font-bold text-sm">{t(`database.levels.level${lvl}`)}</span>
                                </div>
                            </button>
                        );
                    })}
                </div>

                {/* Main Content Grid: Changed to be mobile-friendly (flex-col) */}
                <div className="flex flex-col lg:grid lg:grid-cols-3 gap-6 min-h-[600px]">
                    {/* Left: Schema & Task */}
                    <div className="lg:col-span-1 flex flex-col gap-6 order-2 lg:order-1">
                        {/* Task Card */}
                        <div className="bg-slate-800 rounded-2xl p-6 border border-slate-700 shadow-xl">
                            <div className="flex items-center gap-2 mb-4">
                                <Terminal className="text-indigo-400" />
                                <h2 className="text-xl font-bold text-white">{t('database.task')}</h2>
                            </div>
                            <p className="text-lg text-slate-200 font-medium mb-4">
                                {currentLevel.task}
                            </p>
                            <div className="bg-slate-900/50 p-4 rounded-xl border border-slate-700 text-sm text-slate-400 mb-4">
                                <p className="font-bold text-slate-500 mb-1">{t('database.hint')}:</p>
                                {currentLevel.hint}
                            </div>

                            {/* Control Buttons */}
                            <div className="flex gap-2">
                                <button
                                    onClick={() => handleQueryChange('')}
                                    className="flex-1 py-2 px-3 rounded-lg bg-slate-700 hover:bg-slate-600 text-white text-sm font-bold flex items-center justify-center gap-2 transition-colors"
                                >
                                    <RotateCcw size={14} />
                                    Sıfırla
                                </button>
                                <button
                                    onClick={handleShowAnswer}
                                    disabled={hasSeenAnswer}
                                    className={`flex-1 py-2 px-3 rounded-lg border text-sm font-bold flex items-center justify-center gap-2 transition-colors ${hasSeenAnswer
                                            ? 'bg-slate-800 border-slate-700 text-slate-500 cursor-not-allowed'
                                            : 'bg-indigo-900/50 hover:bg-indigo-900 border-indigo-500/30 text-indigo-300'
                                        }`}
                                >
                                    <Eye size={14} />
                                    {hasSeenAnswer ? 'Göstərilib' : 'Cavab'}
                                </button>
                            </div>
                            {hasSeenAnswer && (
                                <div className="mt-2 text-xs text-amber-500 text-center font-bold">
                                    Cavaba baxdığınız üçün XP verilməyəcək!
                                </div>
                            )}
                        </div>

                        {/* Schema Card */}
                        <div className="bg-slate-800 rounded-2xl p-6 border border-slate-700 shadow-xl flex-1 overflow-y-auto max-h-[300px] lg:max-h-none">
                            <div className="flex items-center gap-2 mb-4">
                                <Table className="text-emerald-400" />
                                <h2 className="text-xl font-bold text-white">{t('database.tables')}</h2>
                            </div>

                            {/* Users Table Schema */}
                            <div className="mb-6">
                                <h3 className="text-sm font-bold text-slate-400 mb-2 uppercase tracking-wider">Users Table</h3>
                                <div className="bg-slate-900 rounded-xl overflow-hidden border border-slate-700">
                                    <div className="grid grid-cols-2 bg-slate-950 p-2 text-xs font-bold text-slate-500">
                                        <div>Column</div>
                                        <div>Type</div>
                                    </div>
                                    <div className="divide-y divide-slate-800 text-sm">
                                        <div className="grid grid-cols-2 p-2 hover:bg-slate-800/50">
                                            <span className="font-mono text-indigo-300">id</span>
                                            <span className="text-slate-500">INT (PK)</span>
                                        </div>
                                        <div className="grid grid-cols-2 p-2 hover:bg-slate-800/50">
                                            <span className="font-mono text-indigo-300">username</span>
                                            <span className="text-slate-500">VARCHAR</span>
                                        </div>
                                        <div className="grid grid-cols-2 p-2 hover:bg-slate-800/50">
                                            <span className="font-mono text-indigo-300">email</span>
                                            <span className="text-slate-500">VARCHAR</span>
                                        </div>
                                        <div className="grid grid-cols-2 p-2 hover:bg-slate-800/50">
                                            <span className="font-mono text-indigo-300">status</span>
                                            <span className="text-slate-500">ENUM</span>
                                        </div>
                                        <div className="grid grid-cols-2 p-2 hover:bg-slate-800/50">
                                            <span className="font-mono text-indigo-300">role</span>
                                            <span className="text-slate-500">ENUM</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right: SQL Terminal & Results */}
                    <div className="lg:col-span-2 flex flex-col gap-4 order-1 lg:order-2">
                        {/* Terminal */}
                        <div className="bg-slate-900 rounded-2xl border border-slate-700 shadow-2xl flex flex-col overflow-hidden">
                            <div className="bg-slate-950 px-4 py-2 flex items-center justify-between border-b border-slate-800">
                                <div className="flex gap-2">
                                    <div className="w-3 h-3 rounded-full bg-red-500/20 border border-red-500/50" />
                                    <div className="w-3 h-3 rounded-full bg-yellow-500/20 border border-yellow-500/50" />
                                    <div className="w-3 h-3 rounded-full bg-green-500/20 border border-green-500/50" />
                                </div>
                                <span className="text-xs font-mono text-slate-500">mysql-client — v8.0</span>
                            </div>
                            <div className="p-4 flex-1 relative min-h-[150px]">
                                <textarea
                                    ref={textareaRef}
                                    value={query}
                                    onChange={(e) => handleQueryChange(e.target.value)}
                                    onKeyDown={handleKeyDown}
                                    placeholder={t('database.terminal_placeholder')}
                                    className="w-full h-full bg-transparent font-mono text-base text-emerald-400 placeholder:text-slate-700 focus:outline-none resize-none pb-12"
                                    spellCheck="false"
                                />
                                <div className="absolute bottom-4 right-4 flex gap-2">
                                    <button
                                        onClick={() => handleQueryChange('')}
                                        className="p-2 rounded-lg bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-white transition-colors"
                                        title={t('database.clear')}
                                    >
                                        <RefreshCw size={16} />
                                    </button>
                                    <button
                                        onClick={() => executeSQL(query)}
                                        className="px-4 py-2 rounded-lg bg-indigo-600 text-white font-bold hover:bg-indigo-500 transition-colors flex items-center gap-2 shadow-lg shadow-indigo-500/20"
                                    >
                                        <Play size={16} fill="currentColor" />
                                        {t('database.execute')}
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Results Table */}
                        <div className="flex-1 bg-slate-800 rounded-2xl border border-slate-700 shadow-xl overflow-hidden flex flex-col min-h-[200px]">
                            <div className="px-4 py-3 bg-slate-950 border-b border-slate-800 flex justify-between items-center">
                                <span className="font-bold text-slate-400 text-sm uppercase tracking-wider">{t('database.result')}</span>
                                {result?.success && (
                                    <span className="bg-green-500/10 text-green-400 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                                        <CheckCircle size={12} />
                                        {t('database.success')}
                                    </span>
                                )}
                            </div>

                            {/* Mobile-friendly table wrapper */}
                            <div className="flex-1 overflow-x-auto p-0">
                                {result?.error ? (
                                    <div className="p-8 flex flex-col items-center justify-center text-center h-full text-red-400">
                                        <AlertCircle size={48} className="mb-4 opacity-50" />
                                        <h3 className="text-lg font-bold mb-2">{t('database.error')}</h3>
                                        <p className="font-mono bg-red-950/30 px-4 py-2 rounded-lg border border-red-900/50">
                                            {result.error}
                                        </p>
                                    </div>
                                ) : result?.rows?.length > 0 ? (
                                    <div className="min-w-[500px]"> {/* Ensure table has min width to scroll */}
                                        <table className="w-full text-left border-collapse">
                                            <thead className="bg-slate-900/50 text-xs uppercase font-bold text-slate-500 sticky top-0">
                                                <tr>
                                                    {result.columns.map(col => (
                                                        <th key={col} className="p-4 border-b border-slate-700">{col}</th>
                                                    ))}
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-slate-700/50 font-mono text-sm text-slate-300">
                                                {result.rows.map((row, idx) => (
                                                    <tr key={idx} className="hover:bg-slate-700/30 transition-colors">
                                                        {result.columns.map(col => (
                                                            <td key={col} className="p-4">{row[col]}</td>
                                                        ))}
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                ) : (
                                    <div className="h-full flex flex-col items-center justify-center text-slate-600 p-8">
                                        <Table size={48} className="mb-4 opacity-20" />
                                        <p className="text-center text-sm">{t('database.terminal_placeholder')}</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </PageTransition>
    );
}
