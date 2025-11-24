import { motion } from 'framer-motion';

export default function DifficultyBadge({ difficulty, points }) {
    const styles = {
        easy: {
            bg: 'bg-green-100',
            text: 'text-green-700',
            border: 'border-green-300',
            icon: '🟢'
        },
        medium: {
            bg: 'bg-yellow-100',
            text: 'text-yellow-700',
            border: 'border-yellow-300',
            icon: '🟡'
        },
        hard: {
            bg: 'bg-red-100',
            text: 'text-red-700',
            border: 'border-red-300',
            icon: '🔴'
        }
    };

    const style = styles[difficulty] || styles.medium;

    return (
        <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className={`inline-flex items-center gap-1.5 px-2 py-1 rounded-full text-xs font-bold border ${style.bg} ${style.text} ${style.border}`}
        >
            <span>{style.icon}</span>
            <span className="uppercase">{difficulty}</span>
            <span className="ml-1">+{points} XP</span>
        </motion.div>
    );
}
