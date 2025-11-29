import { useState, useEffect } from 'react';
import { Wifi, WifiOff } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';

export default function OfflineIndicator() {
    const [isOnline, setIsOnline] = useState(navigator.onLine);
    // If we start offline, show the toast immediately
    const [showToast, setShowToast] = useState(!navigator.onLine);

    useEffect(() => {
        const handleOnline = () => {
            setIsOnline(true);
            setShowToast(true);
            // Only hide toast automatically if we are back online
            setTimeout(() => setShowToast(false), 3000);
        };

        const handleOffline = () => {
            setIsOnline(false);
            setShowToast(true);
            // Do NOT hide toast while offline
        };

        window.addEventListener('online', handleOnline);
        window.addEventListener('offline', handleOffline);

        return () => {
            window.removeEventListener('online', handleOnline);
            window.removeEventListener('offline', handleOffline);
        };
    }, []);

    return (
        <AnimatePresence>
            {showToast && (
                <motion.div
                    initial={{ y: -100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -100, opacity: 0 }}
                    className="fixed top-0 left-0 right-0 z-[100] flex justify-center p-4 pointer-events-none"
                >
                    <div className={`
                        flex items-center gap-3 px-6 py-3 rounded-full shadow-xl backdrop-blur-md border
                        ${isOnline 
                            ? 'bg-green-500/90 border-green-400 text-white' 
                            : 'bg-slate-800/90 border-slate-600 text-slate-200'}
                    `}>
                        {isOnline ? <Wifi size={20} /> : <WifiOff size={20} />}
                        <span className="font-bold text-sm">
                            {isOnline ? 'İnternet bağlantısı bərpa olundu' : 'İnternet bağlantısı yoxdur'}
                        </span>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
