import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Code, Play, CheckCircle, AlertCircle, Bug, Terminal, ChevronLeft, Lock, Unlock, Globe, MousePointer2, Loader2, RotateCcw, Eye, Trash2 } from 'lucide-react';
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
    const [userCodes, setUserCodes] = useState({}); // { levelId: code }
    const [code, setCode] = useState('');
    const [hasSeenAnswer, setHasSeenAnswer] = useState(false);

    const [isRunning, setIsRunning] = useState(false);
    const [testStatus, setTestStatus] = useState('idle'); // idle, running, success, error
    const [logs, setLogs] = useState([]);
    const [browserState, setBrowserState] = useState('initial'); // initial, loading, typing, clicking, success, error

    const [completedLevels, setCompletedLevels] = useState(() => {
        const saved = localStorage.getItem('qa_automation_completed');
        return saved ? JSON.parse(saved) : [];
    });

    // Persist completed levels
    useEffect(() => {
        localStorage.setItem('qa_automation_completed', JSON.stringify(completedLevels));
    }, [completedLevels]);

    // Level Data
    const levels = {
        1: {
            title: t('automation.levels.level1'),
            desc: t('automation.levels.level1_desc'),
            task: "Login düyməsini tapmaq üçün düzgün lokatoru (By.id) və gözləməni (WebDriverWait) əlavə edin.",
            initialCode: `// Test Login
@Test
public void testLogin() {
    WebDriver driver = new ChromeDriver();
    driver.get("https://app.com/login");
    
    // TODO: Fix Locator & Add Wait
    driver.findElement(By.xpath("//div[@class='btn']")).click();
}`,
            answerCode: `// Test Login
@Test
public void testLogin() {
    WebDriver driver = new ChromeDriver();
    driver.get("https://app.com/login");
    
    // Fixed Locator & Added Wait
    WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(10));
    wait.until(ExpectedConditions.elementToBeClickable(By.id("login-btn"))).click();
}`,
            validate: (c) => {
                const lower = c.toLowerCase();
                return lower.includes('by.id') && (lower.includes('webdriverwait') || lower.includes('expectedconditions'));
            },
            simulation: {
                url: "https://app.com/login",
                steps: [
                    { action: 'load', duration: 1000 },
                    { action: 'find', target: 'login-btn', duration: 1000, failMsg: "NoSuchElementException: no such element: Unable to locate element: {\"method\":\"xpath\",\"selector\":\"//div[@class='btn']\"}" },
                    { action: 'click', target: 'login-btn', duration: 500 }
                ]
            }
        },
        2: {
            title: t('automation.levels.level2'),
            desc: t('automation.levels.level2_desc'),
            task: "Elementləri Private edin və məlumatları birbaşa metoda ötürün (Hardcoding-dən qaçın).",
            initialCode: `public class LoginPage {
    // TODO: Fix Visibility
    public WebElement username = driver.findElement(By.id("user"));
    
    public void login() {
        // TODO: Remove Hardcoded Data
        username.sendKeys("admin"); 
    }
}`,
            answerCode: `public class LoginPage {
    // Fixed Visibility
    private WebElement username = driver.findElement(By.id("user"));
    
    // Removed Hardcoded Data
    public void login(String user) {
        username.sendKeys(user); 
    }
}`,
            validate: (c) => {
                const lower = c.toLowerCase();
                return lower.includes('private webelement') && (lower.includes('string user') || lower.includes('string login') || lower.includes('string username'));
            },
            simulation: {
                url: "https://app.com/login",
                steps: [
                    { action: 'load', duration: 500 },
                    { action: 'type', target: 'username-field', duration: 1000 },
                    { action: 'success', msg: "Logged in securely!" }
                ]
            }
        },
        3: {
            title: t('automation.levels.level3'),
            desc: t('automation.levels.level3_desc'),
            task: "API Tokeni koddan silin və System.getenv() istifadə edin.",
            initialCode: `@Test
public void testApi() {
    // TODO: Hide Token
    String token = "Bearer abc-123-secret";
    
    given().header("Authorization", token).get("/api");
}`,
            answerCode: `@Test
public void testApi() {
    // Token from Environment
    String token = System.getenv("API_TOKEN");
    
    given().header("Authorization", token).get("/api");
}`,
            validate: (c) => {
                return (c.includes('System.getenv') || c.includes('Config.get')) && !c.includes('abc-123');
            },
            simulation: {
                url: "API Client",
                steps: [
                    { action: 'api_call', duration: 1500, failMsg: "SecurityAlert: Hardcoded secret detected in source code!" }
                ]
            }
        },
        4: {
            title: t('automation.levels.level4'),
            desc: t('automation.levels.level4_desc'),
            task: "IFrame daxilindəki düyməyə klikləmək üçün əvvəlcə driver.switchTo().frame() istifadə edin.",
            initialCode: `@Test
public void testFrame() {
    driver.get("https://app.com/ads");
    
    // TODO: Switch to Frame first
    driver.findElement(By.id("ad-close")).click();
}`,
            answerCode: `@Test
public void testFrame() {
    driver.get("https://app.com/ads");
    
    // Switch to Frame
    driver.switchTo().frame("ad-frame");
    driver.findElement(By.id("ad-close")).click();
}`,
            validate: (c) => {
                return c.includes('driver.switchTo().frame');
            },
            simulation: {
                url: "https://app.com/ads",
                steps: [
                    { action: 'load', duration: 800 },
                    { action: 'find', target: 'ad-frame', duration: 800, failMsg: "ElementNotInteractableException: element not interactable" },
                    { action: 'switch', duration: 500 },
                    { action: 'click', target: 'close-btn', duration: 500 }
                ]
            }
        },
        5: {
            title: t('automation.levels.level5'),
            desc: t('automation.levels.level5_desc'),
            task: "Alert pəncərəsini qəbul etmək üçün driver.switchTo().alert().accept() istifadə edin.",
            initialCode: `@Test
public void testAlert() {
    driver.findElement(By.id("btn")).click();
    
    // TODO: Handle Alert
}`,
            answerCode: `@Test
public void testAlert() {
    driver.findElement(By.id("btn")).click();
    
    // Handle Alert
    driver.switchTo().alert().accept();
}`,
            validate: (c) => {
                return c.includes('switchTo().alert()') && c.includes('accept()');
            },
            simulation: {
                url: "https://app.com/popup",
                steps: [
                    { action: 'load', duration: 500 },
                    { action: 'click', target: 'btn', duration: 500 },
                    { action: 'alert', duration: 1000, failMsg: "UnhandledAlertException: unexpected alert open: {Alert text : Confirm?}" },
                    { action: 'accept', duration: 500 }
                ]
            }
        }
    };

    const currentLevel = levels[level];

    // Reset code on level change
    useEffect(() => {
        // Load saved code or initial
        if (userCodes[level]) {
            setCode(userCodes[level]);
        } else {
            setCode(currentLevel.initialCode);
        }
        setHasSeenAnswer(false); // Reset cheat flag

        setLogs([]);
        setTestStatus('idle');
        setBrowserState('initial');
    }, [level]);

    const handleCodeChange = (val) => {
        setCode(val);
        setUserCodes(prev => ({ ...prev, [level]: val }));
    };

    const handleShowAnswer = () => {
        setHasSeenAnswer(true);
        handleCodeChange(currentLevel.answerCode);
    };

    const runTest = async () => {
        if (isRunning) return;
        setIsRunning(true);
        setTestStatus('running');
        setLogs([{ time: new Date().toLocaleTimeString(), type: 'info', msg: 'Starting test execution...' }]);
        setBrowserState('loading');

        // Check logic immediately but delay UI for effect
        const isValid = currentLevel.validate(code);
        const steps = currentLevel.simulation.steps;

        for (let i = 0; i < steps.length; i++) {
            const step = steps[i];

            // Simulate delay
            await new Promise(r => setTimeout(r, step.duration));

            // If step fails (and code is invalid)
            if (!isValid && step.failMsg) {
                setLogs(prev => [...prev, {
                    time: new Date().toLocaleTimeString(),
                    type: 'error',
                    msg: step.failMsg
                }]);
                setTestStatus('error');
                setBrowserState('error');
                setIsRunning(false);
                return;
            }

            // Log step success
            let logMsg = '';
            switch (step.action) {
                case 'load': logMsg = `Navigating to ${currentLevel.simulation.url}`; break;
                case 'find': logMsg = `Found element: ${step.target}`; break;
                case 'click': logMsg = `Clicked element: ${step.target}`; setBrowserState('clicking'); break;
                case 'type': logMsg = `Typed text into: ${step.target}`; setBrowserState('typing'); break;
                case 'switch': logMsg = `Switched context`; break;
                case 'alert': logMsg = `Alert detected`; break;
                case 'accept': logMsg = `Alert accepted`; break;
                case 'api_call': logMsg = `Sending request...`; break;
            }
            if (logMsg) {
                setLogs(prev => [...prev, { time: new Date().toLocaleTimeString(), type: 'info', msg: logMsg }]);
            }
        }

        // Final success
        if (isValid) {
            setLogs(prev => [...prev, { time: new Date().toLocaleTimeString(), type: 'success', msg: 'Test Passed Successfully!' }]);
            setTestStatus('success');
            setBrowserState('success');

            if (!completedLevels.includes(level)) {
                const newCompleted = [...completedLevels, level];
                setCompletedLevels(newCompleted);

                const xpAmount = hasSeenAnswer ? 0 : 250;
                if (xpAmount > 0) addXP(xpAmount);

                checkAchievements({
                    xp: xp + xpAmount,
                    completedLevels: { automation: newCompleted },
                    addXP,
                    foundBugs: [],
                    moduleBugs: {},
                    getBugDifficulty: () => 'medium'
                });
                confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
            }
        } else {
            // Fallback if no specific failMsg triggered but validation failed
            setLogs(prev => [...prev, { time: new Date().toLocaleTimeString(), type: 'error', msg: 'AssertionError: Test logic is incorrect.' }]);
            setTestStatus('error');
            setBrowserState('error');
        }

        setIsRunning(false);
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
                                <Code size={32} className="text-cyan-500" />
                                {t('automation.title')}
                            </h1>
                            <p className="text-slate-400">{t('automation.description')}</p>
                        </div>
                    </div>
                    <button
                        onClick={() => {
                            if (window.confirm(t('common.reset_confirm') || "Are you sure you want to reset progress?")) {
                                setCompletedLevels([]);
                                setLevel(1);
                                setUserCodes({});
                                setCode(levels[1].initialCode);
                                setLogs([]);
                                setTestStatus('idle');
                                setBrowserState('initial');
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
                                    ? 'border-cyan-500 bg-cyan-500/10 text-white'
                                    : isLocked
                                        ? 'border-slate-800 bg-slate-800/50 text-slate-600 cursor-not-allowed'
                                        : 'border-slate-700 bg-slate-800 text-slate-400 hover:border-slate-600'
                                    }`}
                            >
                                <div className="flex items-center gap-2">
                                    {isLocked ? <Lock size={16} /> : isCompleted ? <CheckCircle size={16} className="text-green-500" /> : <Unlock size={16} />}
                                    <span className="font-bold text-sm">{t(`automation.levels.level${lvl}`)}</span>
                                </div>
                            </button>
                        );
                    })}
                </div>

                {/* Main Grid */}
                <div className="flex flex-col lg:grid lg:grid-cols-2 gap-6 min-h-[600px]">
                    {/* Left: Code Editor */}
                    <div className="flex flex-col gap-4 order-2 lg:order-1">
                        {/* Task Card */}
                        <div className="bg-slate-800 rounded-2xl p-6 border border-slate-700 shadow-xl">
                            <div className="flex items-center gap-2 mb-2">
                                <Bug className="text-red-400" />
                                <h2 className="text-lg font-bold text-white">{t('automation.task')}</h2>
                            </div>
                            <p className="text-slate-300 mb-4">{currentLevel.task}</p>

                            {/* Buttons */}
                            <div className="flex gap-2">
                                <button
                                    onClick={() => handleCodeChange(currentLevel.initialCode)}
                                    className="flex-1 py-2 px-3 rounded-lg bg-slate-700 hover:bg-slate-600 text-white text-sm font-bold flex items-center justify-center gap-2 transition-colors"
                                >
                                    <RotateCcw size={14} />
                                    Sıfırla
                                </button>
                                <button
                                    onClick={handleShowAnswer}
                                    disabled={hasSeenAnswer}
                                    className={`flex-1 py-2 px-3 rounded-lg border text-sm font-bold flex items-center justify-center gap-2 transition-colors ${hasSeenAnswer
                                            ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30 cursor-default'
                                            : 'bg-cyan-900/50 hover:bg-cyan-900 border-cyan-500/30 text-cyan-300'
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

                        {/* Editor */}
                        <div className="flex-1 bg-slate-900 rounded-2xl border border-slate-700 overflow-hidden flex flex-col min-h-[400px] shadow-2xl">
                            <div className="bg-slate-950 px-4 py-2 flex items-center justify-between border-b border-slate-800">
                                <span className="text-xs font-mono text-slate-500">Test.java</span>
                                <button
                                    onClick={runTest}
                                    disabled={isRunning}
                                    className={`px-4 py-1.5 rounded-lg font-bold text-sm flex items-center gap-2 transition-all ${isRunning
                                            ? 'bg-slate-800 text-slate-500 cursor-wait'
                                            : 'bg-green-600 hover:bg-green-500 text-white shadow-lg shadow-green-500/20'
                                        }`}
                                >
                                    {isRunning ? <Loader2 size={14} className="animate-spin" /> : <Play size={14} fill="currentColor" />}
                                    {t('automation.run')}
                                </button>
                            </div>
                            <textarea
                                value={code}
                                onChange={(e) => handleCodeChange(e.target.value)}
                                className="flex-1 w-full bg-transparent p-4 font-mono text-sm text-cyan-300 focus:outline-none resize-none leading-relaxed"
                                spellCheck="false"
                            />
                        </div>

                        {/* Console Logs */}
                        <div className="h-[200px] bg-slate-950 rounded-xl border border-slate-800 p-4 overflow-y-auto font-mono text-xs">
                            <div className="text-slate-500 mb-2 sticky top-0 bg-slate-950 pb-2 border-b border-slate-900 uppercase tracking-wider font-bold">
                                {t('automation.console')}
                            </div>
                            {logs.length === 0 && <span className="text-slate-700 italic">Ready...</span>}
                            {logs.map((log, i) => (
                                <div key={i} className={`mb-1 ${log.type === 'error' ? 'text-red-400' :
                                        log.type === 'success' ? 'text-green-400' : 'text-slate-400'
                                    }`}>
                                    <span className="text-slate-600 mr-2">[{log.time}]</span>
                                    {log.msg}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Right: Browser Simulation */}
                    <div className="order-1 lg:order-2 bg-slate-200 rounded-2xl overflow-hidden shadow-2xl flex flex-col border-4 border-slate-800 min-h-[300px]">
                        {/* Fake Browser Bar */}
                        <div className="bg-slate-100 px-4 py-2 flex items-center gap-4 border-b border-slate-300">
                            <div className="flex gap-1.5">
                                <div className="w-3 h-3 rounded-full bg-red-400" />
                                <div className="w-3 h-3 rounded-full bg-yellow-400" />
                                <div className="w-3 h-3 rounded-full bg-green-400" />
                            </div>
                            <div className="flex-1 bg-white rounded-md px-3 py-1 text-xs text-slate-500 flex items-center gap-2 shadow-inner">
                                <Globe size={12} />
                                {currentLevel.simulation.url}
                            </div>
                        </div>

                        {/* Viewport */}
                        <div className="flex-1 relative bg-white p-8 flex items-center justify-center">
                            {browserState === 'initial' && (
                                <div className="text-center text-slate-400">
                                    <Globe size={48} className="mx-auto mb-2 opacity-20" />
                                    <p>Browser Ready</p>
                                </div>
                            )}

                            {browserState === 'loading' && (
                                <div className="flex flex-col items-center gap-3">
                                    <Loader2 size={48} className="animate-spin text-cyan-500" />
                                    <p className="text-slate-500 font-medium">Loading page...</p>
                                </div>
                            )}

                            {(browserState === 'success' || browserState === 'clicking' || browserState === 'typing') && (
                                <motion.div
                                    initial={{ scale: 0.9, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    className="w-full max-w-sm bg-white rounded-xl shadow-lg border border-slate-100 p-6 relative"
                                >
                                    <div className="h-4 w-24 bg-slate-200 rounded mb-4" />
                                    <div className="space-y-3">
                                        <div className="h-10 w-full bg-slate-50 border border-slate-200 rounded-lg relative overflow-hidden">
                                            {browserState === 'typing' && (
                                                <motion.div
                                                    initial={{ width: 0 }}
                                                    animate={{ width: '60%' }}
                                                    className="h-full bg-slate-200/50"
                                                />
                                            )}
                                        </div>
                                        <div className={`h-10 w-full rounded-lg flex items-center justify-center text-white font-bold transition-colors ${browserState === 'success' ? 'bg-green-500' : 'bg-cyan-500'
                                            }`}>
                                            {browserState === 'success' ? 'Success!' : 'Submit'}
                                        </div>
                                    </div>

                                    {/* Mouse Cursor Animation */}
                                    <motion.div
                                        initial={{ x: 100, y: 100, opacity: 0 }}
                                        animate={
                                            browserState === 'clicking' ? { x: 50, y: 80, opacity: 1, scale: 0.9 } :
                                                browserState === 'typing' ? { x: 50, y: 40, opacity: 1 } :
                                                    { opacity: 0 }
                                        }
                                        transition={{ duration: 0.5 }}
                                        className="absolute top-0 left-0 pointer-events-none text-black drop-shadow-lg"
                                    >
                                        <MousePointer2 size={32} fill="black" className="text-white" />
                                    </motion.div>
                                </motion.div>
                            )}

                            {browserState === 'error' && (
                                <motion.div
                                    initial={{ scale: 0.9 }}
                                    animate={{ scale: 1, rotate: [0, -2, 2, 0] }}
                                    className="text-center"
                                >
                                    <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <AlertCircle size={40} className="text-red-500" />
                                    </div>
                                    <h3 className="text-xl font-bold text-slate-800 mb-1">Test Failed</h3>
                                    <p className="text-slate-500 text-sm">Check console for details</p>
                                </motion.div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </PageTransition>
    );
}
