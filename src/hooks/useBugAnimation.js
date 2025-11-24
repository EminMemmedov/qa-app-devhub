import { useState } from 'react';
import { celebrateBugFound, celebrateCompletion } from '../utils/confetti';

export function useBugAnimation() {
    const [showAnimation, setShowAnimation] = useState(false);
    const [animationData, setAnimationData] = useState(null);

    const triggerBugAnimation = (bugInfo) => {
        if (bugInfo.isNew) {
            // Show animation
            setAnimationData({
                bugName: bugInfo.bugName || 'Baq tapıldı',
                points: bugInfo.points,
                difficulty: bugInfo.difficulty
            });
            setShowAnimation(true);

            // Trigger confetti
            celebrateBugFound(bugInfo.difficulty);

            // Hide animation after 3 seconds
            setTimeout(() => {
                setShowAnimation(false);
                setAnimationData(null);
            }, 3000);
        }
    };

    const triggerCompletionCelebration = () => {
        celebrateCompletion();
    };

    return {
        showAnimation,
        animationData,
        triggerBugAnimation,
        triggerCompletionCelebration
    };
}
