import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Bug, CheckCircle, Lock, Terminal, AlertTriangle, AlertCircle, Info, Check } from 'lucide-react';
import { useGameProgress } from '../hooks/useGameProgress';
import { moduleBugs } from '../data/bugs';

const getSeverityLabel = (severity, t) => {
    switch (severity?.toLowerCase()) {
        case 'critical': return "Critical";
        case 'major': return "Major";
        case 'minor': return "Minor";
        default: return severity;
    }
};

const getSeverityColor = (severity) => {
    switch (severity?.toLowerCase()) {
        case 'critical': return 'bg-red-100 text-red-700';
        case 'major': return 'bg-orange-100 text-orange-700';
        case 'minor': return 'bg-blue-100 text-blue-700';
        default: return 'bg-slate-100 text-slate-700';
    }
};

const getPriorityColor = (priority) => {
    // Using layout from image: Yellowish for points/priority combo if possible, but let's stick to badges
    // actually image shows "MEDIUM • +5 XP" in yellow
    return 'bg-yellow-100 text-yellow-800';
};

export default function AllFoundBugs() {
    const { t } = useTranslation();
    const { foundBugs, xp } = useGameProgress();

    // Group bugs by module
    const modules = Object.keys(moduleBugs);

    return (
        <div className="space-y-6 pb-20">
            {/* Header / Stats Card */}
            <div className="mb-8">
                <div className="flex flex-col gap-1 mb-6">
                    <h2 className="text-2xl md:text-3xl font-black text-slate-900 dark:text-white">Tapılan Baqlar</h2>
                    <p className="text-sm md:text-base text-slate-500 dark:text-slate-400 font-medium">Praktika modullarında tapdığınız bütün baqlar</p>
                </div>

                <div className="bg-gradient-to-r from-orange-500 to-red-500 rounded-[2rem] p-6 text-white shadow-xl shadow-orange-500/20 relative overflow-hidden">
                    {/* Decorative Circles */}
                    <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -mr-10 -mt-10"></div>
                    <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full blur-xl -ml-8 -mb-8"></div>

                    <div className="flex items-center justify-around relative z-10">
                        <div>
                            <div className="text-orange-100 text-xs md:text-sm font-medium mb-1 leading-tight">Ümumi<br />Tapılmış<br />Baqlar</div>
                            <div className="text-4xl md:text-5xl font-black">{foundBugs.length}</div>
                        </div>
                        <div className="w-px h-16 bg-white/20"></div>
                        <div>
                            <div className="text-orange-100 text-xs md:text-sm font-medium mb-1 leading-tight">Qazanılan<br />XP</div>
                            <div className="text-4xl md:text-5xl font-black">{xp}</div>
                        </div>
                    </div>
                </div>
            </div>

            {modules.map((moduleName, index) => {
                const bugs = moduleBugs[moduleName];
                const moduleFoundBugs = bugs.filter(b => foundBugs.includes(b.id));

                if (moduleFoundBugs.length === 0) return null;

                return (
                    <motion.div
                        key={moduleName}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="rounded-3xl overflow-hidden shadow-lg shadow-slate-200/50 dark:shadow-black/20"
                    >
                        {/* Module Header */}
                        <div className="bg-[#0EA5E9] p-5 flex items-center justify-between text-white">
                            <h3 className="text-xl font-black capitalize">
                                {t(`practice.modules.${moduleName}.title`, moduleName)}
                            </h3>
                            <div className="bg-white/20 backdrop-blur-md px-3 py-1.5 rounded-xl text-sm font-bold flex items-center gap-2">
                                <Check size={16} />
                                <span>{moduleFoundBugs.length} baq</span>
                            </div>
                        </div>

                        {/* Bugs List */}
                        <div className="bg-white dark:bg-slate-800 p-5 space-y-4">
                            {moduleFoundBugs.map((bug) => (
                                <div
                                    key={bug.id}
                                    className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/50"
                                >
                                    <div className="flex gap-4">
                                        <div className="w-10 h-10 rounded-full flex items-center justify-center shrink-0 mt-0.5 bg-green-100 text-green-600 dark:bg-green-900/20 dark:text-green-400">
                                            <CheckCircle size={22} />
                                        </div>

                                        <div className="flex-1">
                                            <p className="font-bold text-base mb-3 leading-snug text-slate-900 dark:text-white">
                                                {bug.description}
                                            </p>

                                            <div className="flex flex-wrap gap-2">
                                                <span className="px-3 py-1 bg-[#FFF9C4] text-[#7F6000] dark:bg-yellow-900/30 dark:text-yellow-300 text-xs font-black rounded-full uppercase tracking-wide">
                                                    {bug.priority} • +5 XP
                                                </span>
                                                <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide ${getSeverityColor(bug.severity)}`}>
                                                    {getSeverityLabel(bug.severity)}
                                                </span>
                                                {bug.isDevTool && (
                                                    <span className="px-3 py-1 bg-slate-200 text-slate-600 dark:bg-slate-700 dark:text-slate-300 text-xs font-bold rounded-full uppercase tracking-wide flex items-center gap-1">
                                                        <Terminal size={12} />
                                                        DevTools
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                );
            })}
        </div>
    );
}
