// Mobile Performance Utilities

/**
 * Check if device prefers reduced motion
 */
export const prefersReducedMotion = () => {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

/**
 * Get optimized animation config based on device capabilities
 */
export const getAnimationConfig = () => {
    const isReducedMotion = prefersReducedMotion();
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

    return {
        // Disable stagger on mobile for better performance
        staggerChildren: (isReducedMotion || isMobile) ? 0 : 0.1,

        // Simpler transitions on mobile
        spring: (isReducedMotion || isMobile)
            ? { type: "tween", duration: 0.2 }
            : { type: "spring", stiffness: 200, damping: 20 },

        // Reduce blur effects on mobile (GPU intensive)
        blur: isMobile ? 0 : 1,

        // Disable complex animations on reduced motion
        enableComplex: !isReducedMotion && !isMobile,
    };
};

/**
 * Debounce function for performance
 */
export const debounce = (func, wait) => {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
};

/**
 * Throttle function for scroll/resize events
 */
export const throttle = (func, limit) => {
    let inThrottle;
    return function (...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
};
