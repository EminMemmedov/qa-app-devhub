import { Home, BookOpen, Bug, LibraryBig, GraduationCap, Trophy } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import clsx from 'clsx';
import { memo, useCallback } from 'react';

const BottomNav = memo(function BottomNav() {
    const navigate = useNavigate();
    const location = useLocation();

    const navItems = [
        { icon: Home, label: 'Ana Səhifə', path: '/' },
        { icon: BookOpen, label: 'Nəzəriyyə', path: '/theory' },
        { icon: Bug, label: 'Təcrübə', path: '/practice' },
        { icon: GraduationCap, label: 'ISTQB', path: '/istqb' },
        { icon: LibraryBig, label: 'Lüğət', path: '/glossary' },
    ];

    // REMOVED: Problematic popstate handler that was causing double navigation
    // React Router already handles browser back/forward navigation correctly

    const handleNavigation = useCallback((path) => {
        if (location.pathname !== path) {
            // Haptic feedback on supported devices
            if (navigator.vibrate) navigator.vibrate(30);
            navigate(path, { replace: false, state: { from: location.pathname, timestamp: Date.now() } });
        }
    }, [location.pathname, navigate]);

    return (
        <nav
            className="fixed bottom-0 left-0 right-0 bg-white dark:bg-slate-800 border-t border-slate-200 dark:border-slate-700 z-[100] transition-colors duration-300 shadow-[0_-1px_10px_rgba(0,0,0,0.05)]"
            style={{
                paddingBottom: 'max(env(safe-area-inset-bottom), 16px)',
                paddingTop: '8px',
                // Prevent iOS bottom bar jumpiness
                height: 'calc(60px + max(env(safe-area-inset-bottom), 16px))'
            }}
        >
            <div className="flex justify-around items-center max-w-md mx-auto px-4">
                {navItems.map((item) => {
                    const isActive = location.pathname === item.path || (item.path === '/practice' && location.pathname.startsWith('/practice'));
                    return (
                        <button
                            key={item.path}
                            onClick={() => handleNavigation(item.path)}
                            aria-label={item.label}
                            aria-current={isActive ? 'page' : undefined}
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
});

export default BottomNav;
