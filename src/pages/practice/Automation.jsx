import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Code, Play, CheckCircle, AlertCircle, Bug, Terminal, ChevronLeft, Lock, Unlock, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import PageTransition from '../../components/PageTransition';
import { useGameProgress } from '../../hooks/useGameProgress';
import { useAchievements } from '../../hooks/useAchievements';
import { useTranslation } from 'react-i18next';
import confetti from 'canvas-confetti';

export default function Automation() {
    const { t } = useTranslation();
    const { addXP, xp } = useGameProgress();
    const { checkAchievements } = useAchievements();

    const [level, setLevel] = useState(1);
    const [userAnswers, setUserAnswers] = useState(() => {
        const saved = localStorage.getItem('qa_automation_answers');
        return saved ? JSON.parse(saved) : {};
    });
    const [feedback, setFeedback] = useState(null);
    const [completedLevels, setCompletedLevels] = useState(() => {
        const saved = localStorage.getItem('qa_automation_completed');
        return saved ? JSON.parse(saved) : [];
    });

    // Persist to localStorage
    useEffect(() => {
        localStorage.setItem('qa_automation_answers', JSON.stringify(userAnswers));
    }, [userAnswers]);

    useEffect(() => {
        localStorage.setItem('qa_automation_completed', JSON.stringify(completedLevels));
    }, [completedLevels]);

    // Level Data
    const levels = {
        1: {
            title: t('automation.levels.level1'),
            description: t('automation.levels.level1_desc'),
            buggyCode: `// Test Login Page
@Test
public void testLogin() {
    WebDriver driver = new ChromeDriver();
    driver.get("https://example.com/login");

    // Bug: Unstable XPath & No Wait
    driver.findElement(By.xpath("//div[@class='input-field']")).sendKeys("user");
    
    driver.findElement(By.id("loginBtn")).click();
}`,
            hint: "Use By.id() and WebDriverWait.",
            validate: (code) => {
                const lower = code.toLowerCase();
                const hasId = code.includes('By.id');
                const hasWait = code.includes('WebDriverWait') || code.includes('ExpectedConditions');
                const hasXpath = lower.includes('xpath');
                return hasId && hasWait && !hasXpath;
            }
        },
        2: {
            title: t('automation.levels.level2'),
            description: t('automation.levels.level2_desc'),
            buggyCode: `// Page Object Model (POM)
public class LoginPage {
    // Bug: Public elements & Hardcoded data
    public WebElement username = driver.findElement(By.id("user"));
    
    public void login() {
        username.sendKeys("admin"); // Hardcoded
    }
}`,
            hint: "Make elements private and accept data as parameters.",
            validate: (code) => {
                const lower = code.toLowerCase();
                const isPrivate = lower.includes('private webelement');
                const hasParam = lower.includes('string username') || lower.includes('string user');
                return isPrivate && hasParam;
            }
        },
        3: {
            title: t('automation.levels.level3'),
            description: t('automation.levels.level3_desc'),
            buggyCode: `// API Test
@Test
public void testApi() {
    // Bug: Exposed Token
    String token = "Bearer abc-123-secret-key";
    
    given().header("Authorization", token).get("/api/users");
}`,
            hint: "Use System.getenv() or a config file for secrets.",
            validate: (code) => {
                const hasEnv = code.includes('System.getenv') || code.includes('Config.getProperty');
                const hasHardcodedToken = code.includes('abc-123');
                return hasEnv && !hasHardcodedToken;
            }
        },
        4: {
            title: t('automation.levels.level4'),
            description: t('automation.levels.level4_desc'),
            buggyCode: `// IFrame Handling
@Test
public void testFrame() {
    driver.get("https://example.com/frames");
    
    // Bug: Trying to find element inside iframe without switching
    driver.findElement(By.id("button-inside-frame")).click();
}`,
            hint: "Switch to iframe using driver.switchTo().frame().",
            validate: (code) => {
                const hasSwitch = code.includes('driver.switchTo().frame');
                return hasSwitch;
            }
        },
        5: {
            title: t('automation.levels.level5'),
            description: t('automation.levels.level5_desc'),
            buggyCode: `// Alert Handling
@Test
public void testAlert() {
    driver.findElement(By.id("trigger-alert")).click();
    
    // Bug: Ignoring alert popup
    driver.findElement(By.id("result")).getText();
}`,
            hint: "Switch to alert and accept it: driver.switchTo().alert().accept().",
            validate: (code) => {
                const hasAlert = code.includes('driver.switchTo().alert()') || code.includes('Alert alert =');
                const hasAccept = code.includes('accept()');
                return hasAlert && hasAccept;
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
            setFeedback({ type: 'success', message: t('automation.correct') });
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
                const savedDbLevels = JSON.parse(localStorage.getItem('qa_database_completed') || '[]');

                checkAchievements({
                    xp: xp + 200,
                    completedLevels: {
                        database: savedDbLevels,
                        automation: newCompletedLevels
                    },
                    addXP,
                    foundBugs: [],
                    moduleBugs: {},
                    getBugDifficulty: () => 'easy'
                });
            }
        } else {
            setFeedback({ type: 'error', message: t('automation.incorrect') });
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
                            <Code size={32} className="text-cyan-500" />
                            {t('automation.title')}
                        </h1>
                        <p className="text-slate-400">{t('automation.description')}</p>
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
                                    ? 'border-cyan-500 bg-cyan-500/10 text-white'
                                    : isLocked
                                        ? 'border-slate-800 bg-slate-800/50 text-slate-600 cursor-not-allowed'
                                        : 'border-slate-700 bg-slate-800 text-slate-400 hover:border-slate-600'
                                    }`}
                            >
                                <div className="flex items-center gap-2">
                                    {isLocked ? <Lock size={16} /> : isCompleted ? <CheckCircle size={16} className="text-green-500" /> : <Unlock size={16} />}
                                    <span className="font-bold">{t(`automation.levels.level${lvl}`)}</span>
                                </div>
                            </button>
                        );
                    })}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Left: Buggy Code (Read-only) */}
                    <div className="bg-slate-800 rounded-2xl overflow-hidden shadow-xl border border-slate-700 flex flex-col min-h-[300px] lg:h-[600px]">
                        <div className="px-4 py-3 bg-slate-950 border-b border-slate-700 flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <Bug size={18} className="text-red-400" />
                                <span className="font-mono text-sm font-bold text-slate-200">Buggy Code</span>
                            </div>
                            <span className="text-xs text-slate-400 italic ml-4 text-right hidden sm:block">
                                {currentLevelData.description}
                            </span>
                        </div>
                        <div className="p-4 font-mono text-sm overflow-auto flex-1 bg-slate-900/50">
                            <pre className="text-red-300/80">{currentLevelData.buggyCode}</pre>
                        </div>
                    </div>

                    {/* Right: Solution Editor */}
                    <div className="bg-slate-800 rounded-2xl overflow-hidden shadow-xl border border-slate-700 flex flex-col min-h-[300px] lg:h-[600px]">
                        <div className="px-4 py-3 bg-slate-950 border-b border-slate-700 flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <CheckCircle size={18} className="text-green-400" />
                                <span className="font-mono text-sm font-bold text-slate-200">{t('automation.fix_instruction')}</span>
                            </div>
                            <button
                                onClick={checkAnswer}
                                className="flex items-center gap-2 px-4 py-1.5 rounded-lg text-sm font-bold bg-cyan-600 hover:bg-cyan-700 text-white transition-all shadow-lg shadow-cyan-500/20"
                            >
                                {t('automation.check')}
                                <ArrowRight size={14} />
                            </button>
                        </div>
                        <textarea
                            value={userAnswers[level] || ''}
                            onChange={handleCodeChange}
                            placeholder={t('automation.placeholder')}
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
                                            {t('automation.hint')}: {currentLevelData.hint}
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
