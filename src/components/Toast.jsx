import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, Bug } from 'lucide-react';
import { useEffect } from 'react';

export default function Toast({ message, isVisible, onClose }) {
    useEffect(() => {
        if (isVisible) {
            const timer = setTimeout(() => {
                onClose();
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [isVisible, onClose]);

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ opacity: 0, y: -50, x: '-50%' }}
                    animate={{ opacity: 1, y: 0, x: '-50%' }}
                    exit={{ opacity: 0, y: -50, x: '-50%' }}
                    className="fixed top-6 left-1/2 z-50 flex items-center gap-3 bg-slate-900 text-white px-6 py-4 rounded-2xl shadow-2xl shadow-slate-500/50 min-w-[300px]"
                >
                    <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center shrink-0 text-slate-900">
                        <Bug size={20} fill="currentColor" />
                    </div>
                    <div>
                        <h4 className="font-bold text-lg leading-none mb-1">Baq tapıldı!</h4>
                        <p className="text-slate-400 text-sm">{message}</p>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
