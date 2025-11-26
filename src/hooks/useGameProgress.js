import { useState, useEffect } from 'react';

export function useGameProgress() {
    const [foundBugs, setFoundBugs] = useState(() => {
        try {
            const saved = localStorage.getItem('qa_game_progress');
            return saved ? JSON.parse(saved) : [];
        } catch (e) {
            console.error('Error parsing game progress:', e);
            return [];
        }
    });

    const [xp, setXp] = useState(() => {
        try {
            const saved = localStorage.getItem('qa_game_xp');
            return saved ? parseInt(saved) : 0;
        } catch (e) {
            return 0;
        }
    });

    // Bug difficulty points mapping
    const bugPoints = {
        // Easy bugs (1-3 points)
        'btn_typo': 2,
        'product_typo': 2,
        'name_label': 2,
        'amount_label': 2,
        'placeholder_typo': 2,
        'img_broken': 3,
        'card_icon': 3,
        'border_color': 3,
        'form_spacing': 3,
        'price_alignment': 3,
        'total_font': 3,
        'qty_btn_size': 3,
        'btn_alignment': 3,

        // Medium bugs (5-7 points)
        'card_len': 5,
        'card_char': 5,
        'card_special': 5,
        'name_numbers': 5,
        'name_short': 5,
        'cvv_len': 5,
        'cvv_letters': 5,
        'expiry_past': 6,
        'expiry_current': 6,
        'neg_amount': 6,
        'zero_amount': 6,
        'neg_qty': 6,
        'zero_qty': 6,
        'float_qty': 6,
        'decimal_places': 7,
        'stock_limit': 7,
        'balance_limit': 7,
        'currency_mix': 7,
        'price_calc': 7,
        'total_wrong': 7,

        // Hard bugs (10-15 points)
        'cvv_visible': 10,
        'self_transfer': 10,
        'del_btn': 10,
        'no_confirmation': 12,
        'balance_static': 12,
        'loading_state': 12,
        'success_msg': 12,
        'btn_double': 15,
        'desc_xss': 15,
        'coupon_100': 15,
        'card_format': 10,
        'luhn_invalid': 15,
        'address_xss': 15,
        'checkout_disabled': 10,
        'stock_info': 10,
        'history_missing': 10,
        'balance_color': 5,
        'icon_missing': 5,
        'focus_color': 5,
        'border_inconsistent': 5,
        'discount_color': 5,
        'img_no_alt': 7,
        'no_size': 7,
        'no_color': 7,
        'currency_symbol': 5
    };

    useEffect(() => {
        localStorage.setItem('qa_game_progress', JSON.stringify(foundBugs));
    }, [foundBugs]);

    useEffect(() => {
        localStorage.setItem('qa_game_xp', xp.toString());
    }, [xp]);

    const addBug = (bugId) => {
        if (!foundBugs.includes(bugId)) {
            setFoundBugs(prev => [...prev, bugId]);
            const points = bugPoints[bugId] || 5;
            const difficulty = getBugDifficulty(bugId);
            // Add XP
            setXp(prev => prev + points);
            return { isNew: true, points, difficulty }; // Return info for animations
        }
        return { isNew: false }; // Bug already found
    };

    const resetProgress = () => {
        setFoundBugs([]);
        setXp(0);
        localStorage.removeItem('qa_game_progress');
        localStorage.removeItem('qa_game_xp');
    };

    const getBugPoints = (bugId) => {
        return bugPoints[bugId] || 5;
    };

    const getBugDifficulty = (bugId) => {
        const points = bugPoints[bugId] || 5;
        if (points <= 3) return 'easy';
        if (points <= 9) return 'medium';
        return 'hard';
    };

    const deductXP = (amount) => {
        // Simply deduct XP without removing bugs
        if (xp >= amount) {
            setXp(prev => prev - amount);
            return true;
        }
        return false;
    };

    const addXP = (amount) => {
        // Add XP directly (for interview, exam, etc.)
        setXp(prev => prev + amount);
    };

    return { foundBugs, addBug, xp, resetProgress, getBugPoints, getBugDifficulty, deductXP, addXP };
}
