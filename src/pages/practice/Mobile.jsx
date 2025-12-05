import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Smartphone, RotateCw, Wifi, WifiOff, MapPin, MapPinOff, ChevronLeft, CheckCircle, Bug, RefreshCw, Lock, Unlock, Terminal, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import PageTransition from '../../components/PageTransition';
import { useGameProgress } from '../../hooks/useGameProgress';
import { useAchievements } from '../../hooks/useAchievements';
import { useTranslation } from 'react-i18next';
import confetti from 'canvas-confetti';

export default function Mobile() {
    const { t } = useTranslation();
    const { addXP, xp } = useGameProgress();
    const { checkAchievements } = useAchievements();

    const [level, setLevel] = useState(1);
    const [orientation, setOrientation] = useState('portrait'); // portrait, landscape
    const [network, setNetwork] = useState(true);
    const [gps, setGps] = useState(true);
    const [appState, setAppState] = useState('home'); // home, list, map, error
    const [showLogs, setShowLogs] = useState(false);
    const [logs, setLogs] = useState([]);

    const [completedLevels, setCompletedLevels] = useState(() => {
        const saved = localStorage.getItem('qa_mobile_completed');
        return saved ? JSON.parse(saved) : [];
    });

    useEffect(() => {
        localStorage.setItem('qa_mobile_completed', JSON.stringify(completedLevels));
    }, [completedLevels]);

    const levels = {
        1: {
            id: 1,
            title: t('mobile.levels.level1') || "Level 1",
            task: t('mobile.levels.level1_task'),
            check: () => orientation === 'landscape'
        },
        2: {
            id: 2,
            title: t('mobile.levels.level2') || "Level 2",
            task: t('mobile.levels.level2_task'),
            check: () => !network && appState === 'error'
        },
        3: {
            id: 3,
            title: t('mobile.levels.level3') || "Level 3",
            task: t('mobile.levels.level3_task'),
            check: () => !gps && appState === 'error'
        }
    };

    const currentLevel = levels[level];

    // Add log helper
    const addLog = (type, message) => {
        const time = new Date().toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' }) + "." + Math.floor(Math.random() * 999);
        setLogs(prev => [...prev, { time, type, message }].slice(-50)); // Keep last 50 logs
    };

    // Simulate system logs
    useEffect(() => {
        const interval = setInterval(() => {
            if (Math.random() > 0.7) {
                const sysLogs = [
                    "D/PowerManagerService: releaseWakeLockInternal: lock=1123",
                    "I/Choreographer: Skipped 3 frames!  The application may be doing too much work on its main thread.",
                    "D/ConnectivityService: NetworkAgentInfo [WIFI () - 101] validation passed",
                    "V/ActivityThread: Reporting activity stop"
                ];
                addLog('debug', sysLogs[Math.floor(Math.random() * sysLogs.length)]);
            }
        }, 2000);
        return () => clearInterval(interval);
    }, []);

    // Level Check Logic
    useEffect(() => {
        if (currentLevel.check()) {
            if (!completedLevels.includes(level)) {
                const newCompleted = [...completedLevels, level];
                setCompletedLevels(newCompleted);
                addXP(150);
                checkAchievements({
                    xp: xp + 150,
                    completedLevels: { mobile: newCompleted },
                    addXP,
                    foundBugs: [],
                    moduleBugs: {},
                    getBugDifficulty: () => 'easy'
                });
                confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
            }
        }
    }, [orientation, network, gps, appState, level]);

    // Reset device on level change
    useEffect(() => {
        setOrientation('portrait');
        setNetwork(true);
        setGps(true);
        setAppState('home');
        setLogs([]);
        addLog('info', 'System boot completed.');
    }, [level]);

    const handleAppAction = (action) => {
        if (action === 'refresh') {
            if (!network) {
                setAppState('error');
                addLog('error', 'NetworkError: UnknownHostException: api.superapp.com');
            } else {
                setAppState('list');
                addLog('info', 'GET /api/v1/feed 200 OK');
            }
        } else if (action === 'map') {
            if (!gps) {
                setAppState('error');
                addLog('error', 'SecurityException: GPS permission denied by user');
            } else {
                setAppState('map');
                addLog('info', 'LocationManager: Requesting location updates');
            }
        } else if (action === 'home') {
            setAppState('home');
            addLog('info', 'ActivityManager: Resumed HomeActivity');
        }
    };

    // Orientation Logic
    const toggleOrientation = () => {
        const newO = orientation === 'portrait' ? 'landscape' : 'portrait';
        setOrientation(newO);
        addLog('info', `WindowManager: rotation changed to ${newO === 'portrait' ? '0' : '90'} deg`);
    };

    const toggleNetwork = () => {
        const newN = !network;
        setNetwork(newN);
        addLog('warn', `ConnectivityService: Network is now ${newN ? 'CONNECTED' : 'DISCONNECTED'}`);
    };

    const toggleGps = () => {
        const newG = !gps;
        setGps(newG);
        addLog('warn', `LocationManager: GPS provider ${newG ? 'ENABLED' : 'DISABLED'}`);
    };

    return (
        <PageTransition className="min-h-screen bg-slate-900 text-slate-300 p-4 pt-20 pb-24">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div className="flex items-start gap-4 mb-8">
                    <Link to="/practice" className="mt-1 p-2 bg-slate-800 rounded-xl hover:bg-slate-700 transition-colors shrink-0 border border-slate-700">
                        <ChevronLeft className="text-white" size={20} />
                    </Link>
                    <div>
                        <h1 className="text-2xl sm:text-4xl font-bold text-white flex items-center gap-3 mb-2">
                            <div className="p-2 bg-purple-500/20 rounded-lg shrink-0">
                                <Smartphone size={24} className="text-purple-500" />
                            </div>
                            {t('mobile.title')}
                        </h1>
                        <p className="text-slate-400 text-sm sm:text-base leading-relaxed">{t('mobile.description')}</p>
                    </div>
                </div>

                {/* Level Selector */}
                <div className="flex gap-3 mb-6 overflow-x-auto pb-2 justify-center sm:justify-start no-scrollbar">
                    {[1, 2, 3].map((lvl) => {
                        const isLocked = lvl > 1 && !completedLevels.includes(lvl - 1);
                        const isCompleted = completedLevels.includes(lvl);
                        return (
                            <button
                                key={lvl}
                                onClick={() => !isLocked && setLevel(lvl)}
                                disabled={isLocked}
                                className={`flex-1 min-w-[100px] max-w-[120px] p-3 rounded-xl border-2 transition-all flex flex-col items-center gap-1 ${level === lvl
                                    ? 'border-purple-500 bg-purple-500/10 text-white'
                                    : isLocked
                                        ? 'border-slate-800 bg-slate-800/50 text-slate-600 cursor-not-allowed'
                                        : 'border-slate-700 bg-slate-800 text-slate-400 hover:border-slate-600'
                                    }`}
                            >
                                <span className="text-xs font-bold uppercase tracking-wider">Level {lvl}</span>
                                {isLocked ? <Lock size={14} /> : isCompleted ? <CheckCircle size={14} className="text-green-500" /> : <Bug size={14} />}
                            </button>
                        );
                    })}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
                    {/* Left: Controls & Task */}
                    <div className="lg:col-span-1 space-y-6 order-2 lg:order-1">
                        <div className="bg-slate-800 rounded-2xl p-6 border border-slate-700 shadow-xl">
                            <div className="flex items-center gap-2 mb-4">
                                <Bug className="text-purple-400" />
                                <h2 className="text-xl font-bold text-white">{currentLevel.title}</h2>
                            </div>
                            <div className="bg-slate-900/50 p-4 rounded-xl border border-slate-700 mb-6">
                                <h3 className="text-xs font-bold text-slate-500 uppercase mb-2">{t('mobile.task')}</h3>
                                <p className="text-lg text-slate-200 font-medium">{currentLevel.task}</p>
                            </div>

                            <h3 className="text-sm font-bold text-slate-500 mb-3 uppercase tracking-wider">{t('mobile.device_controls')}</h3>
                            <div className="grid grid-cols-2 gap-3">
                                <button
                                    onClick={toggleOrientation}
                                    className={`p-4 rounded-2xl border-2 flex flex-col items-center gap-2 transition-all ${orientation === 'landscape' ? 'bg-purple-600 border-purple-500 text-white' : 'bg-slate-700 border-slate-600 text-slate-300 hover:bg-slate-600'}`}
                                >
                                    <RotateCw size={24} />
                                    <span className="text-xs font-bold">{t('mobile.rotate')}</span>
                                </button>
                                <button
                                    onClick={() => setShowLogs(!showLogs)}
                                    className={`p-4 rounded-2xl border-2 flex flex-col items-center gap-2 transition-all ${showLogs ? 'bg-slate-200 border-white text-slate-900' : 'bg-slate-700 border-slate-600 text-slate-300 hover:bg-slate-600'}`}
                                >
                                    <Terminal size={24} />
                                    <span className="text-xs font-bold">Logs</span>
                                </button>
                                <button
                                    onClick={toggleNetwork}
                                    className={`p-4 rounded-2xl border-2 flex flex-col items-center gap-2 transition-all ${!network ? 'bg-red-600 border-red-500 text-white' : 'bg-slate-700 border-slate-600 text-slate-300 hover:bg-slate-600'}`}
                                >
                                    {network ? <Wifi size={24} /> : <WifiOff size={24} />}
                                    <span className="text-xs font-bold">{t('mobile.network')}</span>
                                </button>
                                <button
                                    onClick={toggleGps}
                                    className={`p-4 rounded-2xl border-2 flex flex-col items-center gap-2 transition-all ${!gps ? 'bg-red-600 border-red-500 text-white' : 'bg-slate-700 border-slate-600 text-slate-300 hover:bg-slate-600'}`}
                                >
                                    {gps ? <MapPin size={24} /> : <MapPinOff size={24} />}
                                    <span className="text-xs font-bold">{t('mobile.gps')}</span>
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Right: Device Simulator */}
                    <div className="lg:col-span-2 flex flex-col items-center justify-start order-1 lg:order-2 relative min-h-[600px]">

                        {/* Scale Wrapper for Mobile: Uses CSS transform to fit phone on small screens */}
                        <div className="origin-top transform scale-[0.55] sm:scale-[0.7] md:scale-[0.85] xl:scale-100 transition-all duration-500 ease-in-out">
                            <motion.div
                                layout
                                initial={false}
                                animate={{
                                    rotate: orientation === 'landscape' ? 90 : 0,
                                    width: 320, // Fixed logical width
                                    height: 640 // Fixed logical height
                                }}
                                transition={{ type: "spring", stiffness: 120, damping: 20 }}
                                className="bg-black rounded-[3rem] border-[8px] border-slate-800 shadow-2xl relative overflow-hidden flex flex-col shrink-0 mx-auto"
                            >
                                {/* Notch */}
                                <div className="absolute bg-black w-32 h-6 top-0 left-1/2 -translate-x-1/2 rounded-b-xl z-30" />

                                {/* Status Bar */}
                                <div className="flex justify-between items-center px-6 py-3 text-white text-xs font-bold z-20 select-none mt-2">
                                    <span>9:41</span>
                                    <div className="flex gap-1.5 items-center">
                                        {!gps && <MapPinOff size={10} className="text-red-400" />}
                                        {network ? <Wifi size={12} /> : <WifiOff size={12} className="text-slate-500" />}
                                        <div className="w-5 h-2.5 bg-white rounded-[2px] relative"><div className="absolute right-0 top-0 bottom-0 bg-black w-0.5 h-full" /></div>
                                    </div>
                                </div>

                                {/* App Content */}
                                <div className="flex-1 bg-white text-slate-900 relative overflow-hidden flex flex-col rounded-b-[2.5rem] z-10">
                                    {/* App Header */}
                                    <div className="bg-purple-600 text-white p-4 shadow-md flex justify-between items-center z-10 shrink-0">
                                        <h2 className="font-bold text-lg">{t('mobile.app_name')}</h2>
                                        {appState !== 'home' && (
                                            <button onClick={() => handleAppAction('home')} className="p-1 hover:bg-white/20 rounded-full">
                                                <ChevronLeft size={24} />
                                            </button>
                                        )}
                                    </div>

                                    {/* App Body */}
                                    <div className="flex-1 p-4 overflow-y-auto relative bg-slate-50">
                                        {appState === 'home' && (
                                            <div className="grid grid-cols-2 gap-4 mt-4">
                                                <button
                                                    onClick={() => handleAppAction('refresh')}
                                                    className="aspect-square bg-white rounded-2xl flex flex-col items-center justify-center gap-3 hover:bg-slate-100 transition-colors shadow-sm border border-slate-100 active:scale-95"
                                                >
                                                    <div className="w-12 h-12 bg-purple-50 rounded-full flex items-center justify-center">
                                                        <RefreshCw className="text-purple-600" size={24} />
                                                    </div>
                                                    <span className="font-bold text-sm text-slate-600">Feed</span>
                                                </button>
                                                <button
                                                    onClick={() => handleAppAction('map')}
                                                    className="aspect-square bg-white rounded-2xl flex flex-col items-center justify-center gap-3 hover:bg-slate-100 transition-colors shadow-sm border border-slate-100 active:scale-95"
                                                >
                                                    <div className="w-12 h-12 bg-purple-50 rounded-full flex items-center justify-center">
                                                        <MapPin className="text-purple-600" size={24} />
                                                    </div>
                                                    <span className="font-bold text-sm text-slate-600">Map</span>
                                                </button>
                                            </div>
                                        )}

                                        {appState === 'list' && (
                                            <div className="space-y-3">
                                                {[1, 2, 3, 4, 5].map(i => (
                                                    <div key={i} className="bg-white p-4 rounded-xl flex gap-4 items-center shadow-sm border border-slate-100">
                                                        <div className="w-10 h-10 bg-slate-100 rounded-full shrink-0" />
                                                        <div className="flex-1 min-w-0">
                                                            <div className="h-3 w-24 bg-slate-200 rounded mb-2" />
                                                            <div className="h-2 w-full bg-slate-100 rounded" />
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        )}

                                        {appState === 'map' && (
                                            <div className="w-full h-full bg-blue-50 rounded-2xl border-2 border-blue-100 flex items-center justify-center relative overflow-hidden shadow-inner">
                                                <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(#3b82f6 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
                                                <MapPin className="text-red-500 drop-shadow-xl animate-bounce" size={40} />
                                            </div>
                                        )}

                                        {appState === 'error' && (
                                            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center text-center p-6 z-20">
                                                <motion.div
                                                    initial={{ scale: 0.8, opacity: 0 }}
                                                    animate={{ scale: 1, opacity: 1 }}
                                                    className="bg-white rounded-2xl p-6 w-full shadow-2xl"
                                                >
                                                    <div className="w-14 h-14 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                                        <AlertCircle className="text-red-500" size={28} />
                                                    </div>
                                                    <h3 className="font-bold text-lg text-slate-900 mb-2">Error!</h3>
                                                    <p className="text-slate-500 text-sm mb-6 leading-relaxed">
                                                        {!network ? "Connection failed. Please check your internet settings." : !gps ? "Location permission is required to view the map." : "Unknown Error"}
                                                    </p>
                                                    <button
                                                        onClick={() => handleAppAction('home')}
                                                        className="w-full py-3 bg-slate-900 text-white rounded-xl font-bold text-sm hover:bg-slate-800 transition-colors"
                                                    >
                                                        Dismiss
                                                    </button>
                                                </motion.div>
                                            </div>
                                        )}

                                        {/* Bug Visual for Level 1 */}
                                        {orientation === 'landscape' && level === 1 && (
                                            <motion.div
                                                initial={{ opacity: 0, y: 20 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                className="absolute bottom-4 right-4 bg-red-500 text-white px-4 py-2 rounded-lg font-bold text-xs shadow-lg animate-pulse z-20 flex items-center gap-2"
                                            >
                                                <Bug size={16} />
                                                {t('mobile.bug_found')}
                                            </motion.div>
                                        )}
                                    </div>

                                    {/* App Footer (Nav) */}
                                    <div className="bg-white border-t border-slate-100 p-4 flex justify-center gap-12 shrink-0">
                                        <div className="w-1.5 h-1.5 rounded-full bg-slate-300" />
                                        <div className="w-1.5 h-1.5 rounded-full bg-slate-300" />
                                    </div>
                                    {/* Home Indicator */}
                                    <div className="bg-white pb-2 pt-1 flex justify-center">
                                        <div className="w-24 h-1 bg-slate-200 rounded-full" />
                                    </div>
                                </div>
                            </motion.div>
                        </div>

                        {/* Logcat / Logs Drawer */}
                        <AnimatePresence>
                            {showLogs && (
                                <motion.div
                                    initial={{ y: "100%" }}
                                    animate={{ y: 0 }}
                                    exit={{ y: "100%" }}
                                    className="absolute bottom-0 left-0 right-0 bg-slate-900/95 backdrop-blur-md border-t border-slate-700 h-64 z-40 rounded-t-2xl flex flex-col shadow-2xl"
                                >
                                    <div className="flex justify-between items-center px-4 py-2 border-b border-slate-700 bg-slate-950/50 rounded-t-2xl">
                                        <div className="flex items-center gap-2">
                                            <Terminal size={14} className="text-slate-400" />
                                            <span className="text-xs font-bold text-slate-300 font-mono">Logcat</span>
                                        </div>
                                        <button onClick={() => setShowLogs(false)} className="text-slate-400 hover:text-white">
                                            <X size={16} />
                                        </button>
                                    </div>
                                    <div className="flex-1 overflow-y-auto p-2 font-mono text-[10px] space-y-1">
                                        {logs.map((log, i) => (
                                            <div key={i} className="flex gap-2">
                                                <span className="text-slate-500 shrink-0">{log.time}</span>
                                                <span className={`uppercase font-bold w-4 shrink-0 ${log.type === 'error' ? 'text-red-500' :
                                                        log.type === 'warn' ? 'text-yellow-500' :
                                                            log.type === 'debug' ? 'text-blue-500' : 'text-green-500'
                                                    }`}>{log.type[0]}</span>
                                                <span className={log.type === 'error' ? 'text-red-300' : 'text-slate-300'}>{log.message}</span>
                                            </div>
                                        ))}
                                        <div ref={el => el && el.scrollIntoView({ behavior: 'smooth' })} />
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </PageTransition>
    );
}
import { AlertCircle } from 'lucide-react';
