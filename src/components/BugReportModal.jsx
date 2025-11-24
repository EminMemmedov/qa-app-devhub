import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle, CheckCircle2, X } from 'lucide-react';

export default function BugReportModal({ isOpen, onClose, onSubmit, bug }) {
    const [severity, setSeverity] = useState('');
    const [priority, setPriority] = useState('');

    if (!isOpen || !bug) return null;

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit({ severity, priority });
        setSeverity('');
        setPriority('');
    };

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
            >
                <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.9, opacity: 0 }}
                    className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden"
                >
                    <div className="bg-slate-900 text-white p-6 flex justify-between items-start">
                        <div>
                            <h2 className="text-xl font-bold flex items-center gap-2">
                                <AlertTriangle className="text-yellow-400" />
                                Baq Reportu
                            </h2>
                            <p className="text-slate-400 text-sm mt-1">Tapılan xətanı qiymətləndirin</p>
                        </div>
                        <button onClick={onClose} className="text-slate-400 hover:text-white transition-colors">
                            <X size={24} />
                        </button>
                    </div>

                    <div className="p-6">
                        <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 mb-6">
                            <h3 className="text-xs font-bold text-slate-500 uppercase mb-1">Xəta Təsviri</h3>
                            <p className="text-slate-800 font-medium">{bug.description}</p>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-bold text-slate-700 mb-2">Severity (Vaciblik)</label>
                                <div className="grid grid-cols-3 gap-2">
                                    {['Critical', 'Major', 'Minor'].map((s) => (
                                        <button
                                            key={s}
                                            type="button"
                                            onClick={() => setSeverity(s)}
                                            className={`py-2 px-3 rounded-lg text-sm font-bold border-2 transition-all ${severity === s
                                                    ? 'border-indigo-500 bg-indigo-50 text-indigo-700'
                                                    : 'border-slate-200 text-slate-500 hover:border-slate-300'
                                                }`}
                                        >
                                            {s}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-slate-700 mb-2">Priority (Prioritet)</label>
                                <div className="grid grid-cols-3 gap-2">
                                    {['High', 'Medium', 'Low'].map((p) => (
                                        <button
                                            key={p}
                                            type="button"
                                            onClick={() => setPriority(p)}
                                            className={`py-2 px-3 rounded-lg text-sm font-bold border-2 transition-all ${priority === p
                                                    ? 'border-orange-500 bg-orange-50 text-orange-700'
                                                    : 'border-slate-200 text-slate-500 hover:border-slate-300'
                                                }`}
                                        >
                                            {p}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={!severity || !priority}
                                className="w-full py-3 bg-emerald-600 text-white rounded-xl font-bold shadow-lg shadow-emerald-200 hover:bg-emerald-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed mt-4"
                            >
                                Təsdiqlə və XP Qazan
                            </button>
                        </form>
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
}
