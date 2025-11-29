import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Download, X, Smartphone } from 'lucide-react';
import { createPortal } from 'react-dom';
import { isStandalone, isIOS, isAndroid } from '../utils/nativeFeatures';

export default function PWAInstallPrompt() {
    const [showPrompt, setShowPrompt] = useState(false);
    const [deferredPrompt, setDeferredPrompt] = useState(null);

    useEffect(() => {
        // Don't show if already installed
        if (isStandalone()) {
            return;
        }

        // Check if user has dismissed the prompt before
        const dismissed = localStorage.getItem('pwa_install_dismissed');
        const dismissedDate = localStorage.getItem('pwa_install_dismissed_date');
        
        if (dismissed && dismissedDate) {
            const daysSinceDismissed = (Date.now() - new Date(dismissedDate)) / (1000 * 60 * 60 * 24);
            if (daysSinceDismissed < 7) {
                // Don't show again for 7 days
                return;
            }
        }

        // Listen for the beforeinstallprompt event
        const handleBeforeInstallPrompt = (e) => {
            e.preventDefault();
            setDeferredPrompt(e);
            
            // Show prompt after 30 seconds of usage
            setTimeout(() => setShowPrompt(true), 30000);
        };

        window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

        // For iOS, show manual instructions
        if (isIOS() && !isStandalone()) {
            setTimeout(() => setShowPrompt(true), 30000);
        }

        return () => {
            window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
        };
    }, []);

    const handleInstall = async () => {
        if (!deferredPrompt) {
            return;
        }

        deferredPrompt.prompt();
        const { outcome } = await deferredPrompt.userChoice;
        
        if (outcome === 'accepted') {
            localStorage.setItem('pwa_installed', 'true');
        }
        
        setDeferredPrompt(null);
        setShowPrompt(false);
    };

    const handleDismiss = () => {
        localStorage.setItem('pwa_install_dismissed', 'true');
        localStorage.setItem('pwa_install_dismissed_date', new Date().toISOString());
        setShowPrompt(false);
    };

    if (!showPrompt) return null;

    return createPortal(
        <AnimatePresence>
            {showPrompt && (
                <motion.div
                    initial={{ y: 100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 100, opacity: 0 }}
                    className="fixed bottom-24 left-4 right-4 sm:left-auto sm:right-4 sm:max-w-md z-[250]"
                >
                    <div className="bg-gradient-to-br from-indigo-600 to-purple-600 rounded-2xl shadow-2xl p-6 text-white">
                        <button
                            onClick={handleDismiss}
                            className="absolute top-2 right-2 p-2 rounded-full hover:bg-white/10 transition-colors"
                        >
                            <X size={20} />
                        </button>

                        <div className="flex items-start gap-4">
                            <div className="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center shrink-0">
                                <Smartphone size={28} />
                            </div>
                            
                            <div className="flex-1">
                                <h3 className="text-xl font-black mb-2">
                                    Tətbiqi Quraşdır
                                </h3>
                                
                                {isIOS() ? (
                                    <div className="text-sm text-indigo-100 space-y-2 mb-4">
                                        <p>Safari brauzerində:</p>
                                        <ol className="list-decimal list-inside space-y-1">
                                            <li>Aşağıdakı "Paylaş" düyməsinə toxunun</li>
                                            <li>"Ana Ekrana Əlavə Et" seçin</li>
                                            <li>"Əlavə Et" düyməsinə toxunun</li>
                                        </ol>
                                    </div>
                                ) : (
                                    <p className="text-sm text-indigo-100 mb-4">
                                        Tətbiqi quraşdırıb daha sürətli giriş əldə edin. 
                                        İnternet olmadan da işləyir!
                                    </p>
                                )}

                                {!isIOS() && deferredPrompt && (
                                    <button
                                        onClick={handleInstall}
                                        className="w-full py-3 bg-white text-indigo-600 rounded-xl font-bold flex items-center justify-center gap-2 transition-all active:scale-95 shadow-lg"
                                    >
                                        <Download size={20} />
                                        Quraşdır
                                    </button>
                                )}

                                <button
                                    onClick={handleDismiss}
                                    className="w-full py-2 mt-2 text-sm text-indigo-100 hover:text-white transition-colors"
                                >
                                    Sonra xatırlat
                                </button>
                            </div>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>,
        document.body
    );
}

