import { Moon, Sun } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { motion } from 'framer-motion';

export default function ThemeToggle() {
  const { isDark, toggleTheme } = useTheme();
  
  return (
    <motion.button
      whileTap={{ scale: 0.95 }}
      onClick={toggleTheme}
      className={`relative w-14 h-8 rounded-full p-1 transition-colors duration-300 ${
        isDark ? 'bg-slate-700' : 'bg-sky-200'
      }`}
      aria-label="Toggle theme"
    >
      <motion.div
        className="w-6 h-6 bg-white rounded-full shadow-md flex items-center justify-center"
        layout
        transition={{ type: "spring", stiffness: 700, damping: 30 }}
        style={{
            x: isDark ? 24 : 0
        }}
      >
        <motion.div
            initial={false}
            animate={{ rotate: isDark ? 360 : 0, scale: isDark ? 1 : 1 }}
        >
            {isDark ? (
            <Moon size={14} className="text-slate-800" />
            ) : (
            <Sun size={14} className="text-yellow-500" />
            )}
        </motion.div>
      </motion.div>
    </motion.button>
  );
}
