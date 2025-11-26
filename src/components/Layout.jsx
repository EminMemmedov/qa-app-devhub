import { Outlet, useLocation } from 'react-router-dom';
import BottomNav from './BottomNav';
import ThemeToggle from './ThemeToggle';
import LanguageSelector from './LanguageSelector';
import AchievementUnlocked from './AchievementUnlocked';
import { useOfflineSync } from '../hooks/useOfflineSync';
import { useAchievements } from '../hooks/useAchievements';
import { motion, useAnimation } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { WifiOff } from 'lucide-react';

export default function Layout() {
    const navigate = useNavigate();
    const location = useLocation();
    const controls = useAnimation();
    const { isOnline } = useOfflineSync();
    const { newAchievement } = useAchievements();

    // Swipe gestures for main sections (Home, Theory, Practice)
    const handleDragEnd = (event, info) => {
        const threshold = 100; // px
        if (info.offset.x > threshold) {
            // swipe right -> previous section
            if (location.pathname === '/theory') navigate('/');
            else if (location.pathname.startsWith('/practice')) navigate('/theory');
        } else if (info.offset.x < -threshold) {
            // swipe left -> next section
            if (location.pathname === '/') navigate('/theory');
            else if (location.pathname === '/theory') navigate('/practice');
        }
    };

    // Ensure animation resets on route change
    useEffect(() => {
        controls.start({ x: 0 });
    }, [location.pathname, controls]);

    const isWidePage = ['/practice/database', '/practice/automation'].includes(location.pathname);

    return (
        <motion.div
            className="min-h-screen bg-slate-50 dark:bg-slate-900 safe-bottom transition-colors duration-300"
            style={{
                paddingBottom: 'max(env(safe-area-inset-bottom), 5rem)',
                paddingTop: 'env(safe-area-inset-top)'
            }}
            drag={isWidePage ? false : "x"}
            dragConstraints={{ left: 0, right: 0 }}
            onDragEnd={handleDragEnd}
            animate={controls}
        >
            <div className={`w-full mx-auto min-h-screen bg-white dark:bg-slate-800 md:shadow-2xl relative overflow-hidden transition-colors duration-300 ${isWidePage ? 'max-w-7xl' : 'max-w-md'}`}>
                {/* Top Controls */}
                <div className="fixed top-4 right-4 z-50 flex items-center gap-2">
                    <ThemeToggle />
                    {/* LanguageSelector temporarily hidden - using only Azerbaijani */}
                    {/* <LanguageSelector /> */}
                </div>

                {/* Offline Banner */}
                {!isOnline && (
                    <div className="bg-slate-900 text-white px-4 py-2 flex items-center justify-center gap-2 text-sm font-medium animate-pulse sticky top-0 z-40">
                        <WifiOff size={16} />
                        <span>İnternet bağlantısı yoxdur. Oflayn rejim aktivdir.</span>
                    </div>
                )}

                {/* Achievement Notification */}
                <AchievementUnlocked achievement={newAchievement} onClose={() => { }} />

                <Outlet />
                <BottomNav />
            </div>
        </motion.div>
    );
}
