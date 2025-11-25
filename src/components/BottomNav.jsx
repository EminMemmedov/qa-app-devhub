import { Home, BookOpen, Bug } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import clsx from 'clsx';

export default function BottomNav() {
    const navigate = useNavigate();
    const location = useLocation();

    const navItems = [
        { icon: Home, label: 'Ana Səhifə', path: '/' },
        { icon: BookOpen, label: 'Nəzəriyyə', path: '/theory' },
        { icon: Bug, label: 'Təcrübə', path: '/practice' },
    ];

    // Handle browser back/forward navigation and provide haptic feedback
    useEffect(() => {
        const handlePopState = (event) => {
            // Navigate back in history when user presses back button on Android
            navigate(-1);
        };
        window.addEventListener('popstate', handlePopState);
        return () => window.removeEventListener('popstate', handlePopState);
    }, [navigate]);

    const handleNavigation = (path) => {
        if (location.pathname !== path) {
            // Haptic feedback on supported devices
            if (navigator.vibrate) navigator.vibrate(30);
            navigate(path, { replace: false, state: { from: location.pathname, timestamp: Date.now() } });
        }
    };

    return (
        <nav
            className="fixed bottom-0 left-0 right-0 bg-white/95 dark:bg-slate-800/95 backdrop-blur-lg border-t border-slate-200 dark:border-slate-700 z-50 transition-colors duration-300"
            style={{ paddingBottom: 'max(env(safe-area-inset-bottom), 0.5rem)', paddingTop: '0.5rem' }}
        >
            <div className="flex justify-around items-center max-w-md mx-auto px-4">
                {navItems.map((item) => {
                    const isActive = location.pathname === item.path || (item.path === '/practice' && location.pathname.startsWith('/practice'));
                    return (
                        <button
                            key={item.path}
                            onClick={() => handleNavigation(item.path)} aria-label={item.label}
                            className={clsx(
                                "flex flex-col items-center gap-1 p-3 rounded-xl transition-all duration-300 min-w-[60px] min-h-[60px] justify-center touch-manipulation",
                                isActive
                                    ? "text-blue-600 dark:text-blue-400 scale-105 bg-blue-50 dark:bg-blue-900/30"
                                    : "text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300 active:scale-95"
                            )}
                        >
                            <item.icon size={24} strokeWidth={2.5} />
                            <span className="text-[10px] font-bold tracking-wide whitespace-nowrap">{item.label}</span>
                        </button>
                    );
                })}
            </div>
        </nav>
    );
}
