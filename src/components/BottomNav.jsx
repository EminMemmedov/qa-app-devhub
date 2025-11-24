
import { Home, BookOpen, Bug } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import clsx from 'clsx';

export default function BottomNav() {
    const navItems = [
        { icon: Home, label: 'Ana Səhifə', path: '/' },
        { icon: BookOpen, label: 'Nəzəriyyə', path: '/theory' },
        { icon: Bug, label: 'Təcrübə', path: '/practice' },
    ];

    return (
        <nav className="fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-lg border-t border-slate-200 pb-safe pt-2 px-6 z-50">
            <div className="flex justify-around items-center max-w-md mx-auto">
                {navItems.map((item) => (
                    <NavLink
                        key={item.path}
                        to={item.path}
                        className={({ isActive }) =>
                            clsx(
                                "flex flex-col items-center gap-1 p-2 rounded-xl transition-all duration-300",
                                isActive ? "text-blue-600 scale-110" : "text-slate-400 hover:text-slate-600"
                            )
                        }
                    >
                        <item.icon size={24} strokeWidth={2.5} />
                        <span className="text-[10px] font-bold tracking-wide">{item.label}</span>
                    </NavLink>
                ))}
            </div>
        </nav>
    );
}

