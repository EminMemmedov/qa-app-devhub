import { Outlet, useLocation } from 'react-router-dom';
import BottomNav from './BottomNav';
import ThemeToggle from './ThemeToggle';
import LanguageSelector from './LanguageSelector';
import AchievementUnlocked from './AchievementUnlocked';
import { useOfflineSync } from '../hooks/useOfflineSync';
import { useAchievements } from '../hooks/useAchievements';
import { useCallback } from 'react';
import { WifiOff } from 'lucide-react';

export default function Layout() {
    const location = useLocation();
    const { isOnline } = useOfflineSync();
    const { newAchievement } = useAchievements();

    // Memoized callback for achievement close handler
    const handleAchievementClose = useCallback(() => {
        // Achievement close logic can be added here if needed
    }, []);


    const isWidePage = ['/practice/api', '/practice/database', '/practice/automation', '/resume-builder'].includes(location.pathname);
    const isHomePage = location.pathname === '/';

    return (
        <>
            <div
                className="min-h-screen bg-slate-50 dark:bg-slate-900 safe-bottom transition-colors duration-300"
                style={{
                    paddingBottom: 'max(env(safe-area-inset-bottom), 5rem)',
                    paddingTop: 'env(safe-area-inset-top)'
                }}
            >
                <div className={`w-full mx-auto min-h-screen bg-white dark:bg-slate-800 md:shadow-2xl relative overflow-hidden transition-colors duration-300 ${isWidePage ? 'max-w-7xl' : 'max-w-md'}`}>
                    {/* Top Controls */}
                    <div className={`fixed top-4 right-4 z-50 flex items-center gap-2 ${isHomePage ? 'sm:hidden' : ''}`}>
                        <ThemeToggle />
                        {/* LanguageSelector temporarily hidden - using only Azerbaijani */}
                        {/* <LanguageSelector /> */}
                    </div>

                    {/* Offline Banner - Handled by global OfflineIndicator component now */}
                    {/* {!isOnline && (
                        <div className="bg-slate-900 text-white px-4 py-2 flex items-center justify-center gap-2 text-sm font-medium animate-pulse sticky top-0 z-40">
                            <WifiOff size={16} />
                            <span>İnternet bağlantısı yoxdur. Oflayn rejim aktivdir.</span>
                        </div>
                    )} */}

                    {/* Achievement Notification */}
                    <AchievementUnlocked achievement={newAchievement} onClose={handleAchievementClose} />

                    <Outlet />
                </div>
            </div>
            <BottomNav />
        </>
    );
}
