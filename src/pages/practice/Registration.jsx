import { useState, useEffect } from 'react';
import { Search, User, Calendar, Phone, Image as ImageIcon, Home, Settings, Terminal, Key, ArrowLeft, CheckCircle, FileText } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import PageTransition from '../../components/PageTransition';
import Toast from '../../components/Toast';
import BugList from '../../components/BugList';
import SpecModal from '../../components/SpecModal';
import BugDiscoveryAnimation from '../../components/BugDiscoveryAnimation';
import AchievementUnlocked from '../../components/AchievementUnlocked';
import { useGameProgress } from '../../hooks/useGameProgress';
import { useAchievements } from '../../hooks/useAchievements';
import { useBugAnimation } from '../../hooks/useBugAnimation';
import { useDevTools } from '../../context/DevToolsContext';
import BugReportModal from '../../components/BugReportModal';
import { celebrateCompletion } from '../../utils/confetti';
import { practiceSpecs } from '../../data/practiceSpecs';

export default function Registration() {
    const { foundBugs, addBug, resetProgress, getBugDifficulty, xp, getBugPoints, deductXP } = useGameProgress();
    const { newAchievement, checkAchievements } = useAchievements();
    const { showAnimation, animationData, triggerBugAnimation } = useBugAnimation();
    const { addLog, addRequest } = useDevTools();
    const [flagInput, setFlagInput] = useState('');
    const [toast, setToast] = useState({ show: false, message: '' });
    const [showSpec, setShowSpec] = useState(false);
    const [genderState, setGenderState] = useState({ male: false, female: false });

    // Initialize DevTools bugs
    useEffect(() => {
        console.error("CRITICAL_ERROR: API Connection Failed! Error Code: BUG_CONSOLE_LOG");
        localStorage.setItem('user_session', 'BUG_LOCAL_STORE');
        return () => localStorage.removeItem('user_session');
    }, []);

    // 24 Simulated bugs
    const [bugs] = useState([
        { id: 'title_typo', description: 'Başlıqda hərf səhvi: "Qeydiyyat" əvəzinə "Qeydiyat"', severity: 'Minor', priority: 'Low' },
        { id: 'logo_pixel', description: 'Loqo çox keyfiyyətsizdir (piksel-piksel)', severity: 'Minor', priority: 'Low' },
        { id: 'nav_broken', description: '"Ana Səhifə" linki işləmir (kliklənmir)', severity: 'Major', priority: 'Medium' },
        { id: 'username_bg', description: 'İnput rəngi fərqlidir (boz əvəzinə sarımtıl)', severity: 'Minor', priority: 'Low' },
        { id: 'email_placeholder', description: 'Email sahəsində placeholder yoxdur', severity: 'Minor', priority: 'Low' },
        { id: 'email_validation', description: 'Email formatı yoxlanılmır (yanlış email qəbul edilir)', severity: 'Critical', priority: 'High' },
        { id: 'password_visibility', description: 'Şifrəni göstər düyməsi işləmir', severity: 'Major', priority: 'Medium' },
        { id: 'dob_validation', description: 'Gələcək tarix seçilə bilir (Doğum tarixi)', severity: 'Major', priority: 'Medium' },
        { id: 'phone_input', description: 'Telefon nömrəsinə hərflər daxil edilə bilir', severity: 'Minor', priority: 'Low' },
        { id: 'terms_checkbox', description: 'Qaydalar qəbul edilmədən qeydiyyat mümkündür', severity: 'Critical', priority: 'High' },
        { id: 'password_type', description: 'Şifrə sahəsi gizli deyil (text type)', severity: 'Critical', priority: 'High' },
        { id: 'password_len', description: 'Maksimum uzunluq 5 simvoldur (çox qısa)', severity: 'Major', priority: 'Medium' },
        { id: 'phone_type', description: 'Telefon sahəsi hərfləri qəbul edir', severity: 'Major', priority: 'Medium' },
        { id: 'dob_future', description: 'Doğum tarixi gələcəyi göstərir (2050)', severity: 'Major', priority: 'Medium' },
        { id: 'gender_radio', description: 'Hər iki cinsiyyəti seçmək olur (radio qrup səhvi)', severity: 'Major', priority: 'Medium' },
        { id: 'avatar_broken', description: 'Profil şəkli yüklənməyib (sınıq şəkil)', severity: 'Minor', priority: 'Low' },
        { id: 'terms_typo', description: 'Şərtlərdə səhv: "Qaydalar" əvəzinə "Qaydar"', severity: 'Minor', priority: 'Low' },
        { id: 'btn_contrast', description: 'Düymə kontrastı çox zəifdir', severity: 'Minor', priority: 'Low' },
        { id: 'btn_align', description: 'Düymə mətni mərkəzdə deyil', severity: 'Minor', priority: 'Low' },
        { id: 'btn_cursor', description: 'Düymədə kursor "text" formasındadır', severity: 'Minor', priority: 'Low' },
        { id: 'cancel_color', description: '"Ləğv et" düyməsi yaşıl rəngdədir (çaşdırıcı)', severity: 'Major', priority: 'Medium' },
        { id: 'footer_year', description: 'Müəllif hüquqları ili köhnədir (1999)', severity: 'Minor', priority: 'Low' },
        { id: 'footer_typo', description: '"Məxfilik" sözündə hərf səhvi', severity: 'Minor', priority: 'Low' },
        { id: 'dev_console', description: 'Konsol xətası (Console Tab)', isDevTool: true, severity: 'Major', priority: 'Medium' },
        { id: 'dev_hidden', description: 'Gizli input sahəsi (Elements Tab)', isDevTool: true, severity: 'Major', priority: 'Medium' },
        { id: 'dev_data', description: 'Gizli data atributu (Elements Tab)', isDevTool: true, severity: 'Minor', priority: 'Low' },
        { id: 'dev_storage', description: 'Local Storage dəyəri (Application Tab)', isDevTool: true, severity: 'Minor', priority: 'Low' }
    ]);

    const devToolFlags = {
        'BUG_CONSOLE_LOG': 'dev_console',
        'BUG_HIDDEN_VAL': 'dev_hidden',
        'BUG_DATA_ATTR': 'dev_data',
        'BUG_LOCAL_STORE': 'dev_storage'
    };

    const handleBugClick = (bugId) => {
        if (foundBugs.includes(bugId)) return;
        setSelectedBugId(bugId);
        setReportModalOpen(true);
    };

    const handleReportSubmit = ({ severity, priority }) => {
        const bug = bugs.find(b => b.id === selectedBugId);
        let bonus = 0;
        if (severity === bug.severity) bonus += 5;
        if (priority === bug.priority) bonus += 5;

        const basePoints = getBugPoints(getBugDifficulty(selectedBugId));
        const totalPoints = basePoints + bonus;

        addBug(selectedBugId);
        triggerBugAnimation(totalPoints);
        setReportModalOpen(false);
        setSelectedBugId(null);

        if (bonus > 0) {
            setToast({ show: true, message: `Əla! Düzgün qiymətləndirmə üçün +${bonus} XP bonus! 🎯` });
        }

        // Check achievements after bug is added
        checkAchievements({
            foundBugs: [...foundBugs, selectedBugId], // Pass updated foundBugs
            totalBugs: bugs.length,
            moduleBugs: { registration: bugs },
            getBugDifficulty
        });
    };

    const handleFlagSubmit = (e) => {
        e.preventDefault();
        const bugId = devToolFlags[flagInput.trim()];
        if (bugId) {
            const result = addBug(bugId);
            if (result.isNew) {
                const bug = bugs.find(b => b.id === bugId);
                setFlagInput('');
                setToast({ show: true, message: bug.description });

                // Trigger animation
                triggerBugAnimation({
                    ...result,
                    bugName: bug.description
                });

                // Check achievements
                checkAchievements({
                    foundBugs,
                    totalBugs: bugs.length,
                    moduleBugs: { registration: bugs },
                    getBugDifficulty
                });
            } else {
                setToast({ show: true, message: 'Bu baq artıq tapılıb!' });
            }
        } else {
            alert('Yanlış kod! DevTools-u diqqətlə yoxlayın.');
        }
    };

    // Filter bugs for this page
    const pageBugs = bugs;
    const foundPageBugs = foundBugs.filter(id => pageBugs.find(b => b.id === id));

    // Celebrate completion
    useEffect(() => {
        if (foundPageBugs.length === pageBugs.length && pageBugs.length > 0) {
            celebrateCompletion();
        }
    }, [foundPageBugs.length, pageBugs.length]);

    return (
        <PageTransition className="p-6 pt-12 pb-24 min-h-screen">
            <Toast
                isVisible={toast.show}
                message={toast.message}
                onClose={() => setToast({ ...toast, show: false })}
            />

            <SpecModal
                isOpen={showSpec}
                onClose={() => setShowSpec(false)}
                spec={practiceSpecs.registration}
            />

            <header className="mb-8">
                <Link to="/practice" className="inline-flex items-center text-slate-500 mb-4 hover:text-slate-800 transition-colors">
                    <ArrowLeft size={20} className="mr-1" />
                    Geri qayıt
                </Link>
                <div className="flex justify-between items-start">
                    <div>
                        <h1 className="text-3xl font-black text-slate-900 tracking-tight mb-2">Qeydiyyat Forması</h1>
                        <div className="flex items-center gap-2 text-slate-500 font-medium">
                            <Search size={18} />
                            <p>Bu formda {bugs.length} baq gizlənib.</p>
                        </div>
                    </div>
                    <button
                        onClick={() => setShowSpec(true)}
                        className="p-3 bg-indigo-100 text-indigo-600 rounded-xl hover:bg-indigo-200 transition-colors"
                    >
                        <FileText size={24} />
                    </button>
                </div>
            </header>

            {/* DevTools Challenge Section */}
            <div className="mb-8 bg-slate-900 text-slate-200 p-6 rounded-2xl shadow-xl relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-10">
                    <Terminal size={120} />
                </div>
                <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                    <Terminal size={24} className="text-green-400" />
                    DevTools Tapşırıqları
                </h2>
                <p className="text-sm text-slate-400 mb-6 max-w-md">
                    Bəzi baqlar gözlə görünmür! Brauzerin <b>Developer Tools</b> (F12) panelini açın və gizli kodları (Flag) axtarın.
                </p>

                <form onSubmit={handleFlagSubmit} className="flex gap-2 relative z-10">
                    <div className="relative flex-1">
                        <Key className="absolute left-3 top-3.5 text-slate-500" size={18} />
                        <input
                            type="text"
                            value={flagInput}
                            onChange={(e) => setFlagInput(e.target.value)}
                            placeholder="Baq kodunu bura yazın (məs: BUG_...)"
                            className="w-full pl-10 p-3 bg-slate-800 border border-slate-700 rounded-xl text-white placeholder:text-slate-600 focus:border-green-500 outline-none transition-all"
                        />
                    </div>
                    <button
                        type="submit"
                        className="bg-green-600 text-white px-6 rounded-xl font-bold hover:bg-green-500 transition-colors"
                    >
                        Yoxla
                    </button>
                </form>
            </div>

            <div className="bg-white rounded-[2rem] shadow-xl shadow-slate-200/50 border border-slate-100 relative overflow-hidden mb-8">
                {/* Fake Header inside the form */}
                <div className="bg-slate-50 p-4 border-b flex justify-between items-center">
                    {/* Bug 2: Pixelated Logo */}
                    <div
                        className="flex items-center gap-2 cursor-pointer"
                        onClick={() => handleBugClick('logo_pixel')}
                    >
                        <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center text-white font-bold text-xs overflow-hidden">
                            <span className="scale-150 blur-[1px]">QA</span>
                        </div>
                        <span className="font-bold text-slate-700">App</span>
                    </div>

                    {/* Bug 3: Broken Nav */}
                    <div className="flex gap-4 text-sm text-slate-400">
                        <span
                            className="cursor-not-allowed hover:text-slate-400"
                            onClick={() => handleBugClick('nav_broken')}
                        >
                            <Home size={18} />
                        </span>
                        <Settings size={18} />
                    </div>
                </div>

                <div className="p-6 space-y-6">
                    {/* Bug 1: Title Typo */}
                    <h2
                        className="text-2xl font-bold text-slate-800 cursor-pointer hover:bg-red-50 rounded px-2 -ml-2 inline-block"
                        onClick={() => handleBugClick('title_typo')}
                    >
                        Qeydiyat
                    </h2>

                    {/* Bug 13: Broken Avatar */}
                    <div
                        className="flex justify-center mb-6"
                        onClick={() => handleBugClick('avatar_broken')}
                    >
                        <div className="w-24 h-24 bg-slate-100 rounded-full border-2 border-dashed border-slate-300 flex items-center justify-center cursor-pointer hover:bg-red-50">
                            <ImageIcon size={32} className="text-slate-300" />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 gap-5">
                        {/* Username */}
                        <div>
                            {/* Bug 4: Label Typo */}
                            <label
                                className="block text-sm font-bold text-slate-700 mb-2 cursor-pointer hover:text-red-500"
                                onClick={() => handleBugClick('username_label')}
                            >
                                İstifadəçi ad
                            </label>
                            {/* Bug 5: Wrong BG Color */}
                            <div className="relative">
                                <User className="absolute left-3 top-3.5 text-slate-400" size={18} />
                                <input
                                    type="text"
                                    className="w-full pl-10 p-3 bg-yellow-50/50 border border-slate-200 rounded-xl outline-none focus:border-blue-500 cursor-pointer"
                                    onClick={() => handleBugClick('username_bg')}
                                    defaultValue="test_user"
                                />
                            </div>
                        </div>

                        {/* Email */}
                        <div>
                            <label className="block text-sm font-bold text-slate-700 mb-2">Email</label>
                            <div className="relative">
                                {/* Bug 6: Missing Placeholder */}
                                <input
                                    type="email"
                                    className="w-full p-3 border border-slate-200 rounded-xl outline-none focus:border-blue-500"
                                    onChange={(e) => {
                                        // Bug 6: If they type, they might notice missing placeholder. 
                                        // But placeholder is visual. Let's keep it simple or trigger on focus?
                                        // User asked for logic. Let's trigger if they submit empty?
                                    }}
                                    onClick={() => handleBugClick('email_placeholder')}
                                />
                                {/* Bug 7: Wrong Validation Message */}
                                <p
                                    className="text-xs text-red-500 mt-1 cursor-pointer hover:underline"
                                    onClick={() => handleBugClick('email_validation')}
                                >
                                    * Email must contain $ symbol
                                </p>
                            </div>
                        </div>

                        {/* Password */}
                        <div>
                            <label className="block text-sm font-bold text-slate-700 mb-2">Şifrə</label>
                            {/* Bug 8: Text Type, Bug 9: Max Length */}
                            <input
                                type="text"
                                maxLength={5}
                                className="w-full p-3 border border-slate-200 rounded-xl outline-none focus:border-blue-500"
                                onChange={(e) => {
                                    if (e.target.value.length > 0) handleBugClick('password_type');
                                    if (e.target.value.length === 5) handleBugClick('password_len');
                                }}
                            />
                            <p className="text-xs text-slate-400 mt-1">
                                Maksimum 5 simvol
                            </p>
                        </div>

                        {/* Phone */}
                        <div>
                            <label className="block text-sm font-bold text-slate-700 mb-2">Telefon</label>
                            <div className="relative">
                                <Phone className="absolute left-3 top-3.5 text-slate-400" size={18} />
                                {/* Bug 10: Text Type for Phone */}
                                <input
                                    type="text"
                                    placeholder="ABC-DEF-GHI"
                                    className="w-full pl-10 p-3 border border-slate-200 rounded-xl outline-none focus:border-blue-500"
                                    onChange={(e) => {
                                        if (/[a-zA-Z]/.test(e.target.value)) {
                                            handleBugClick('phone_type');
                                        }
                                    }}
                                />
                            </div>
                        </div>

                        {/* Date of Birth */}
                        <div>
                            <label className="block text-sm font-bold text-slate-700 mb-2">Doğum Tarixi</label>
                            <div className="relative">
                                <Calendar className="absolute left-3 top-3.5 text-slate-400" size={18} />
                                {/* Bug 11: Future Date */}
                                <input
                                    type="date"
                                    defaultValue="2050-01-01"
                                    className="w-full pl-10 p-3 border border-slate-200 rounded-xl outline-none focus:border-blue-500"
                                    onChange={(e) => {
                                        const date = new Date(e.target.value);
                                        if (date > new Date()) handleBugClick('dob_future');
                                    }}
                                />
                            </div>
                        </div>

                        {/* Gender */}
                        <div>
                            <label className="block text-sm font-bold text-slate-700 mb-2">Cins</label>
                            <div className="flex gap-4">
                                {/* Bug 12: Radio Group Issue (different names or missing name) */}
                                <label className="flex items-center gap-2 cursor-pointer">
                                    <input
                                        type="radio"
                                        name="g1"
                                        className="w-4 h-4 text-blue-600"
                                        onChange={(e) => {
                                            const newState = { ...genderState, male: e.target.checked };
                                            setGenderState(newState);
                                            if (newState.male && newState.female) {
                                                handleBugClick('gender_radio');
                                            }
                                        }}
                                    />
                                    Kişi
                                </label>
                                <label className="flex items-center gap-2 cursor-pointer">
                                    <input
                                        type="radio"
                                        name="g2"
                                        className="w-4 h-4 text-blue-600"
                                        onChange={(e) => {
                                            const newState = { ...genderState, female: e.target.checked };
                                            setGenderState(newState);
                                            if (newState.male && newState.female) {
                                                handleBugClick('gender_radio');
                                            }
                                        }}
                                    />
                                    Qadın
                                </label>
                            </div>
                        </div>

                        {/* Terms */}
                        <div className="flex items-center gap-2">
                            <input type="checkbox" className="w-4 h-4 rounded text-blue-600" />
                            {/* Bug 14: Typo in Terms */}
                            <span
                                className="text-sm text-slate-600 cursor-pointer hover:text-red-500"
                                onClick={() => handleBugClick('terms_typo')}
                            >
                                Mən <span className="underline">Qaydar</span> ilə razıyam
                            </span>
                        </div>

                        {/* Bug 23: Hidden Input (DevTools) */}
                        <input type="hidden" value="BUG_HIDDEN_VAL" />

                        {/* Buttons */}
                        <div className="flex gap-3 mt-4">
                            {/* Bug 18: Cancel Button Green */}
                            <button
                                className="flex-1 py-3 bg-green-100 text-green-700 rounded-xl font-bold cursor-pointer hover:bg-green-200"
                                onClick={() => handleBugClick('cancel_color')}
                            >
                                Ləğv et
                            </button>

                            {/* Bug 15: Low Contrast, Bug 16: Bad Alignment, Bug 17: Text Cursor */}
                            {/* Bug 24: Data Attribute (DevTools) */}
                            <button
                                data-secret-key="BUG_DATA_ATTR"
                                className="flex-1 py-3 bg-blue-200 text-white rounded-xl font-bold cursor-text hover:bg-blue-300 flex justify-start pl-8"
                                onClick={() => {
                                    handleBugClick('btn_contrast');
                                    handleBugClick('btn_align');
                                    handleBugClick('btn_cursor');
                                }}
                            >
                                Təsdiqlə
                            </button>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="bg-slate-50 p-4 border-t text-center text-xs text-slate-400">
                    {/* Bug 19: Old Year */}
                    <p
                        className="cursor-pointer hover:text-red-500"
                        onClick={() => handleBugClick('footer_year')}
                    >
                        © 1999 QA App Inc.
                    </p>
                    {/* Bug 20: Typo in Link */}
                    <div className="flex justify-center gap-3 mt-2">
                        <span>Terms</span>
                        <span
                            className="cursor-pointer hover:text-red-500"
                            onClick={() => handleBugClick('footer_typo')}
                        >
                            Privcy
                        </span>
                    </div>
                </div>

                {/* Success Overlay */}
                <AnimatePresence>
                    {foundPageBugs.length === pageBugs.length && (
                        <motion.div
                            initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
                            animate={{ opacity: 1, backdropFilter: "blur(4px)" }}
                            className="absolute inset-0 bg-white/90 flex flex-col items-center justify-center text-center p-6 z-20"
                        >
                            <motion.div
                                initial={{ scale: 0.5, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                transition={{ type: "spring", bounce: 0.5 }}
                            >
                                <CheckCircle size={64} className="text-green-500 mb-4 drop-shadow-lg" />
                            </motion.div>
                            <h3 className="text-2xl font-black text-slate-900 mb-2">Möhtəşəm!</h3>
                            <p className="text-slate-600 font-medium">Siz əsl QA mühəndisisiniz! <br />Bütün {pageBugs.length} baqı tapdınız.</p>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* Bug Discovery Animation */}
            <AnimatePresence>
                {showAnimation && animationData && (
                    <BugDiscoveryAnimation
                        bugName={animationData.bugName}
                        points={animationData.points}
                        onComplete={() => { }}
                    />
                )}
            </AnimatePresence>

            {/* Achievement Notification */}
            {newAchievement && (
                <AchievementUnlocked
                    achievement={newAchievement}
                    onClose={() => { }}
                />
            )}

            <BugList
                bugs={bugs} // Use local bugs array which has descriptions
                foundBugs={foundBugs}
                onReset={resetProgress}
                xp={xp}
                getBugPoints={getBugPoints}
                getBugDifficulty={getBugDifficulty}
                deductXP={deductXP}
            />

            <BugReportModal
                isOpen={reportModalOpen}
                onClose={() => setReportModalOpen(false)}
                onSubmit={handleReportSubmit}
                bug={bugs.find(b => b.id === selectedBugId)}
            />
        </PageTransition>
    );
}

import BugReportModal from '../../components/BugReportModal';
