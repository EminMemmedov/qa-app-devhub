import { motion } from 'framer-motion';

export default function PageTransition({ children, className }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.98 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }} // Custom bezier for smooth "Apple-like" feel
            className={className}
        >
            {children}
        </motion.div>
    );
}
