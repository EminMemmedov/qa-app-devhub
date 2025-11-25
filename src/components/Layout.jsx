import { Outlet, useLocation } from 'react-router-dom';
import BottomNav from './BottomNav';
import ThemeToggle from './ThemeToggle';
import FAB from './FAB';
import { motion, useAnimation } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

export default function Layout() {
    const navigate = useNavigate();
    const location = useLocation();
    const controls = useAnimation();

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

    return (
        <motion.div
            className="min-h-screen bg-slate-50 dark:bg-slate-900 safe-bottom transition-colors duration-300"
            style={{
                paddingBottom: 'max(env(safe-area-inset-bottom), 5rem)',
                paddingTop: 'env(safe-area-inset-top)'
            }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            onDragEnd={handleDragEnd}
            animate={controls}
        >
            <div className="w-full max-w-md mx-auto min-h-screen bg-white dark:bg-slate-800 md:shadow-2xl relative overflow-hidden transition-colors duration-300">
                {/* Theme Toggle Button */}
                <div className="fixed top-4 right-4 z-50">
                    <ThemeToggle />
                </div>
                {/* Floating Action Button for quick access */}
                <FAB />
                <Outlet />
                <BottomNav />
            </div>
        </motion.div>
    );
}
