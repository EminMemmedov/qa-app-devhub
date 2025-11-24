import { motion, AnimatePresence } from 'framer-motion';
import { FileText, X } from 'lucide-react';

export default function SpecModal({ isOpen, onClose, spec }) {
    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[60]"
                    />
                    <motion.div
                        initial={{ opacity: 0, y: '100%' }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: '100%' }}
                        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                        className="fixed bottom-0 left-0 right-0 z-[60] bg-white rounded-t-[2rem] p-6 max-w-md mx-auto shadow-2xl max-h-[85vh] overflow-y-auto"
                    >
                        <div className="flex justify-between items-start mb-6">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600">
                                    <FileText size={20} />
                                </div>
                                <h3 className="text-xl font-bold text-slate-900">{spec.title}</h3>
                            </div>
                            <button
                                onClick={onClose}
                                className="p-2 bg-slate-100 rounded-full hover:bg-slate-200 transition-colors"
                            >
                                <X size={20} className="text-slate-500" />
                            </button>
                        </div>

                        <div className="space-y-4 mb-8">
                            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                                <h4 className="font-bold text-slate-700 mb-3 text-sm uppercase tracking-wider">Tələblər:</h4>
                                <ul className="space-y-3">
                                    {spec.requirements.map((req, index) => (
                                        <li key={index} className="flex gap-3 text-slate-600 text-sm leading-relaxed">
                                            <span className="w-1.5 h-1.5 bg-indigo-400 rounded-full mt-2 shrink-0" />
                                            {req}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>

                        <button
                            onClick={onClose}
                            className="w-full py-4 bg-slate-900 text-white rounded-xl font-bold hover:bg-slate-800 transition-colors"
                        >
                            Aydındır, bağla
                        </button>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
