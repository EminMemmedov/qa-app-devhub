// Quick integration template for Banking and Ecommerce
// This file documents the changes needed for each module

/*
STEP 1: Add imports (at top of file)
*/
import { useState, useEffect } from 'react';
import BugDiscoveryAnimation from '../../components/BugDiscoveryAnimation';
import AchievementUnlocked from '../../components/AchievementUnlocked';
import { useAchievements } from '../../hooks/useAchievements';
import { useBugAnimation } from '../../hooks/useBugAnimation';
import { celebrateCompletion } from '../../utils/confetti';

/*
STEP 2: Update useGameProgress destructuring
*/
const { foundBugs, addBug, resetProgress, getBugDifficulty, xp, getBugPoints, deductXP } = useGameProgress();
const { newAchievement, checkAchievements } = useAchievements();
const { showAnimation, animationData, triggerBugAnimation } = useBugAnimation();

/*
STEP 3: Add handleBugClick function (before pageBugs)
*/
const handleBugClick = (bugId, message) => {
    const result = addBug(bugId);
    if (result.isNew) {
        setToast({ show: true, message });

        triggerBugAnimation({
            ...result,
            bugName: message
        });

        checkAchievements({
            foundBugs,
            totalBugs: bugs.length,
            moduleBugs: { [moduleName]: bugs }, // banking or ecommerce
            getBugDifficulty
        });
    }
};

/*
STEP 4: Add confetti celebration (after pageBugs)
*/
useEffect(() => {
    if (foundPageBugs.length === pageBugs.length && pageBugs.length > 0) {
        celebrateCompletion();
    }
}, [foundPageBugs.length, pageBugs.length]);

/*
STEP 5: Add animation components (before BugList)
*/
<AnimatePresence>
    {showAnimation && animationData && (
        <BugDiscoveryAnimation
            bugName={animationData.bugName}
            points={animationData.points}
            onComplete={() => { }}
        />
    )}
</AnimatePresence>

{
    newAchievement && (
        <AchievementUnlocked
            achievement={newAchievement}
            onClose={() => { }}
        />
    )
}

/*
STEP 6: Update BugList props
*/
<BugList
    bugs={pageBugs}
    foundBugs={foundPageBugs}
    onReset={resetProgress}
    xp={xp}
    getBugPoints={getBugPoints}
    getBugDifficulty={getBugDifficulty}
    deductXP={deductXP}
/>
