import { useEffect, useState, useCallback } from 'react';

// Haptic Feedback Helper
export const triggerHaptic = (type = 'light') => {
    if (!window.navigator || !window.navigator.vibrate) return;

    try {
        switch (type) {
            case 'success':
                window.navigator.vibrate([10, 30, 10]);
                break;
            case 'error':
                window.navigator.vibrate([50, 30, 50, 30, 50]);
                break;
            case 'warning':
                window.navigator.vibrate([30, 30, 30]);
                break;
            case 'medium':
                window.navigator.vibrate(20);
                break;
            case 'heavy':
                window.navigator.vibrate(40);
                break;
            case 'light':
            default:
                window.navigator.vibrate(5); // Very short vibration for clicks
                break;
        }
    } catch (e) {
        // Ignore errors if vibration is not supported or blocked
        console.debug('Haptic feedback failed:', e);
    }
};

// Pull-to-Refresh Hook
export const usePullToRefresh = (onRefresh) => {
    const [startY, setStartY] = useState(0);
    const [refreshing, setRefreshing] = useState(false);
    const [pullDistance, setPullDistance] = useState(0);
    const THRESHOLD = 150; // Pixels to pull down to trigger refresh

    const handleTouchStart = useCallback((e) => {
        if (window.scrollY === 0) {
            setStartY(e.touches[0].clientY);
        }
    }, []);

    const handleTouchMove = useCallback((e) => {
        const y = e.touches[0].clientY;
        if (startY > 0 && y > startY && window.scrollY === 0) {
            const distance = y - startY;
            // Add resistance
            setPullDistance(distance * 0.4);

            // Prevent default only if we are pulling down at the top
            if (distance > 10 && e.cancelable) {
                e.preventDefault();
            }
        }
    }, [startY]);

    const handleTouchEnd = useCallback(async () => {
        if (pullDistance > 60) { // Trigger threshold
            setRefreshing(true);
            triggerHaptic('medium');
            try {
                await onRefresh();
                triggerHaptic('success');
            } catch (error) {
                triggerHaptic('error');
            } finally {
                setRefreshing(false);
            }
        }
        setStartY(0);
        setPullDistance(0);
    }, [pullDistance, onRefresh]);

    useEffect(() => {
        document.addEventListener('touchstart', handleTouchStart, { passive: true });
        document.addEventListener('touchmove', handleTouchMove, { passive: false });
        document.addEventListener('touchend', handleTouchEnd);

        return () => {
            document.removeEventListener('touchstart', handleTouchStart);
            document.removeEventListener('touchmove', handleTouchMove);
            document.removeEventListener('touchend', handleTouchEnd);
        };
    }, [handleTouchStart, handleTouchMove, handleTouchEnd]);

    return { refreshing, pullDistance };
};
