import { useState, useEffect } from 'react';
import { CreditCard, Calendar, Lock, ArrowLeft, Search, FileText, User, AlertCircle, CheckCircle2, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import PageTransition from '../../components/PageTransition';
import Toast from '../../components/Toast';
import BugList from '../../components/BugList';
import SpecModal from '../../components/SpecModal';
import BugDiscoveryAnimation from '../../components/BugDiscoveryAnimation';
import AchievementUnlocked from '../../components/AchievementUnlocked';
import { useGameProgress } from '../../hooks/useGameProgress';
import { useAchievements } from '../../hooks/useAchievements';
import { useBugAnimation } from '../../hooks/useBugAnimation';
import { celebrateCompletion } from '../../utils/confetti';
import { practiceSpecs } from '../../data/practiceSpecs';

export default function Payment() {
    const { foundBugs, addBug, resetProgress, getBugDifficulty, xp, getBugPoints, deductXP } = useGameProgress();
    const { newAchievement, checkAchievements } = useAchievements();
    const { showAnimation, animationData, triggerBugAnimation } = useBugAnimation();
    const [cardNumber, setCardNumber] = useState('');
    const [cardName, setCardName] = useState('');
    const [expiry, setExpiry] = useState('');
    const [cvv, setCvv] = useState('');
    const [toast, setToast] = useState({ show: false, message: '' });
    const [showSpec, setShowSpec] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false);
    const [errors, setErrors] = useState({});
    const [touched, setTouched] = useState({});

    const bugs = [
        { id: 'card_len', description: 'Kart nömrəsi 16 rəqəmdən çox qəbul edir' },
        { id: 'card_char', description: 'Kart nömrəsinə hərf yazmaq olur' },
        { id: 'card_special', description: 'Kart nömrəsinə xüsusi simvollar daxil olur' },
        { id: 'name_numbers', description: 'Ad sahəsinə rəqəm yazmaq olur' },
        { id: 'name_short', description: 'Ad sahəsi 2 simvoldan az qəbul edir' },
        { id: 'name_label', description: 'Ad sahəsində label səhvi: "Kart sahibi" əvəzinə "Kart sahbi"' },
        { id: 'expiry_past', description: 'Keçmiş tarix seçmək mümkündür' },
        { id: 'expiry_current', description: 'Cari ay seçilə bilir (artıq bitib)' },
        { id: 'cvv_visible', description: 'CVV kodu gizli deyil (görünür)' },
        { id: 'cvv_len', description: 'CVV 3 rəqəmdən çox qəbul edir' },
        { id: 'cvv_letters', description: 'CVV sahəsinə hərf yazmaq olur' },
        { id: 'btn_typo', description: 'Düymədə hərf səhvi: "Ödəniş" əvəzinə "Ödəni"' },
        { id: 'btn_double', description: 'Düyməyə 2 dəfə klik ödənişi təkrarlayır' },
        { id: 'total_wrong', description: 'Yekun məbləğ səhv hesablanıb (100 + 5 = 1005)' },
        { id: 'amount_label', description: 'Məbləğ yazısında rəng kontrastı zəifdir' },
        { id: 'form_spacing', description: 'Form elementləri arasında boşluq qeyri-bərabərdir' },
        { id: 'card_icon', description: 'Kart ikonası yanlış rəngdədir (qırmızı əvəzinə yaşıl)' },
        { id: 'border_color', description: 'Focus zamanı border rəngi səhvdir' },
        { id: 'loading_state', description: 'Ödəniş zamanı yükləmə göstəricisi yoxdur' },
        { id: 'success_msg', description: 'Uğurlu ödəniş mesajı göstərilmir' }
    ];

    const validateForm = () => {
        const newErrors = {};
        let detectedBugs = [];

        // Card number validation
        if (!cardNumber) {
            newErrors.cardNumber = 'Kart nömrəsi tələb olunur';
        } else {
            if (cardNumber.length > 16) {
                detectedBugs.push('card_len');
                newErrors.cardNumber = 'Kart nömrəsi 16 rəqəmdən çox ola bilməz';
            }
            if (/[a-zA-Z]/.test(cardNumber)) {
                detectedBugs.push('card_char');
                newErrors.cardNumber = 'Kart nömrəsi yalnız rəqəmlərdən ibarət olmalıdır';
            }
            if (/[^0-9]/.test(cardNumber)) {
                detectedBugs.push('card_special');
                newErrors.cardNumber = 'Kart nömrəsində xüsusi simvollar ola bilməz';
            }
        }

        // Card name validation
        if (!cardName) {
            newErrors.cardName = 'Kart sahibinin adı tələb olunur';
        } else {
            if (/[0-9]/.test(cardName)) {
                detectedBugs.push('name_numbers');
                newErrors.cardName = 'Ad sahəsində rəqəmlər ola bilməz';
            }
            if (cardName.length > 0 && cardName.length < 2) {
                detectedBugs.push('name_short');
                newErrors.cardName = 'Ad ən azı 2 simvol olmalıdır';
            }
        }

        // Expiry validation
        if (!expiry) {
            newErrors.expiry = 'Bitmə tarixi tələb olunur';
        } else {
            const selectedDate = new Date(expiry);
            const now = new Date();

            if (selectedDate < now) {
                detectedBugs.push('expiry_past');
                newErrors.expiry = 'Keçmiş tarix seçilə bilməz';
            }

            const currentMonth = now.getMonth();
            const currentYear = now.getFullYear();
            const selectedMonth = selectedDate.getMonth();
            const selectedYear = selectedDate.getFullYear();

            if (selectedYear === currentYear && selectedMonth === currentMonth) {
                detectedBugs.push('expiry_current');
                newErrors.expiry = 'Cari ay artıq bitib, gələcək ay seçin';
            }
        }

        // CVV validation
        if (!cvv) {
            newErrors.cvv = 'CVV kodu tələb olunur';
        } else {
            if (cvv.length > 3) {
                detectedBugs.push('cvv_len');
                newErrors.cvv = 'CVV 3 rəqəmdən çox ola bilməz';
            }
            if (/[a-zA-Z]/.test(cvv)) {
                detectedBugs.push('cvv_letters');
                newErrors.cvv = 'CVV yalnız rəqəmlərdən ibarət olmalıdır';
            }
        }

        // Always trigger these bugs on submission
        detectedBugs.push('btn_typo');
        detectedBugs.push('total_wrong');
        detectedBugs.push('loading_state');
        detectedBugs.push('success_msg');

        setErrors(newErrors);
        return { isValid: Object.keys(newErrors).length === 0, detectedBugs };
    };

    const handlePayment = async () => {
        // Prevent double submission
        if (isProcessing) {
            handleBugClick('btn_double', 'Düyməyə 2 dəfə klik ödənişi təkrarlayır');
            return;
        }

        const { isValid, detectedBugs } = validateForm();

        // Report all detected bugs
        let foundNew = false;
        detectedBugs.forEach(bugId => {
            const bug = bugs.find(b => b.id === bugId);
            // Use handleBugClick to trigger animations and achievements
            // We pass the bug description as the message
            handleBugClick(bugId, bug.description);

            // Check if it was new (we can't easily get the return value here without modifying handleBugClick to return it, 
            // but for the purpose of foundNew flag, we can check if it's in foundBugs before calling, 
            // OR just rely on the fact that handleBugClick handles the UI feedback)
            if (!foundBugs.includes(bugId)) {
                foundNew = true;
            }
        });

        if (!isValid) {
            // Show first error
            const firstError = Object.values(errors)[0];
            if (!foundNew) {
                setToast({ show: true, message: firstError });
            }
            return;
        }

        // Simulate processing (Bug: no loading state shown)
        setIsProcessing(true);

        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 1500));

        setIsProcessing(false);

        // Bug: No success message shown
        if (!foundNew) {
            // Just silently "succeed" - this is the bug
            console.log('Payment processed (but no message shown to user)');
        }
    };

    const handleBlur = (field) => {
        setTouched({ ...touched, [field]: true });
    };

    const handleBugClick = (bugId, message) => {
        const result = addBug(bugId);
        if (result.isNew) {
            setToast({ show: true, message });

            // Trigger animation
            triggerBugAnimation({
                ...result,
                bugName: message
            });

            // Check achievements
            checkAchievements({
                foundBugs,
                totalBugs: bugs.length,
                moduleBugs: { payment: bugs },
                getBugDifficulty
            });
        }
    };

    // Filter bugs for this page
    const pageBugs = bugs;
    const foundPageBugs = foundBugs.filter(id => pageBugs.find(b => b.id === id));

    // Celebrate completion
    useEffect(() => {
        if (foundPageBugs.length === pageBugs.length && pageBugs.length > 0) {
            celebrateCompletion();
        }
    }, [foundPageBugs.length, pageBugs.length]);

    return (
        <PageTransition className="p-6 pt-12 pb-24 min-h-screen">
            <Toast
                show={toast.show}
                message={toast.message}
                onClose={() => setToast({ show: false, message: '' })}
            />

            <SpecModal
                isOpen={showSpec}
                onClose={() => setShowSpec(false)}
                spec={practiceSpecs.payment}
            />

            {/* Bug Discovery Animation */}
            <AnimatePresence>
                {showAnimation && animationData && (
                    <BugDiscoveryAnimation
                        bugName={animationData.bugName}
                        points={animationData.points}
                        onComplete={() => { }}
                    />
                )}
            </AnimatePresence>

            {/* Achievement Notification */}
            {newAchievement && (
                <AchievementUnlocked
                    achievement={newAchievement}
                    onClose={() => { }}
                />
            )}

            <header className="mb-8">
                <Link to="/practice" className="inline-flex items-center text-slate-500 mb-4 hover:text-slate-800 transition-colors">
                    <ArrowLeft size={20} className="mr-1" />
                    Geri qayıt
                </Link>
                <div className="flex justify-between items-start">
                    <div>
                        <h1 className="text-3xl font-black text-slate-900 tracking-tight mb-2">Ödəniş Səhifəsi</h1>
                        <div className="flex items-center gap-2 text-slate-500 font-medium">
                            <Search size={18} />
                            <p>Bu səhifədə {bugs.length} baq gizlənib.</p>
                        </div>
                    </div>
                    <button
                        onClick={() => setShowSpec(true)}
                        className="p-3 bg-indigo-100 text-indigo-600 rounded-xl hover:bg-indigo-200 transition-colors"
                    >
                        <FileText size={24} />
                    </button>
                </div>
            </header>

            <div className="bg-white p-8 rounded-[2rem] shadow-xl shadow-purple-200/50 border border-slate-100 relative overflow-hidden mb-8">
                <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-purple-500 to-pink-500"></div>

                <form onSubmit={(e) => { e.preventDefault(); handlePayment(); }} className="space-y-6">
                    {/* Card Number */}
                    <div className="mb-8">
                        <label className="block text-sm font-bold text-slate-700 mb-2">Kart Nömrəsi</label>
                        <div className="relative">
                            <CreditCard
                                className="absolute left-3 top-3.5 text-green-400 cursor-pointer"
                                size={18}
                                onClick={() => handleBugClick('card_icon', 'Kart ikonası yanlış rəngdədir (qırmızı əvəzinə yaşıl)')}
                            />
                            <input
                                type="text"
                                placeholder="0000 0000 0000 0000"
                                className={`w-full pl-10 p-3 border-2 rounded-xl outline-none transition-colors ${touched.cardNumber && errors.cardNumber
                                    ? 'border-red-300 focus:border-red-500'
                                    : 'border-slate-200 focus:border-green-500'
                                    }`}
                                value={cardNumber}
                                onChange={(e) => setCardNumber(e.target.value)}
                                onBlur={() => handleBlur('cardNumber')}
                                onClick={() => handleBugClick('border_color', 'Focus zamanı border rəngi səhvdir')}
                            />
                            {touched.cardNumber && errors.cardNumber && (
                                <div className="flex items-center gap-2 mt-2 text-red-600 text-sm">
                                    <AlertCircle size={16} />
                                    <span>{errors.cardNumber}</span>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Card Name */}
                    <div className="mb-3">
                        <label
                            className="block text-sm font-bold text-slate-700 mb-2 cursor-pointer"
                            onClick={() => handleBugClick('name_label', 'Ad sahəsində label səhvi: "Kart sahibi" əvəzinə "Kart sahbi"')}
                        >
                            Kart sahbi
                        </label>
                        <div className="relative">
                            <User className="absolute left-3 top-3.5 text-slate-400" size={18} />
                            <input
                                type="text"
                                placeholder="Ad Soyad"
                                className={`w-full pl-10 p-3 border-2 rounded-xl outline-none transition-colors ${touched.cardName && errors.cardName
                                    ? 'border-red-300 focus:border-red-500'
                                    : 'border-slate-200 focus:border-purple-500'
                                    }`}
                                value={cardName}
                                onChange={(e) => setCardName(e.target.value)}
                                onBlur={() => handleBlur('cardName')}
                            />
                            {touched.cardName && errors.cardName && (
                                <div className="flex items-center gap-2 mt-2 text-red-600 text-sm">
                                    <AlertCircle size={16} />
                                    <span>{errors.cardName}</span>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Bug: Inconsistent spacing */}
                    <div
                        className="flex gap-4 mb-10 cursor-pointer"
                        onClick={() => handleBugClick('form_spacing', 'Form elementləri arasında boşluq qeyri-bərabərdir')}
                    >
                        {/* Expiry */}
                        <div className="flex-1">
                            <label className="block text-sm font-bold text-slate-700 mb-2">Bitmə Tarixi</label>
                            <div className="relative">
                                <Calendar className="absolute left-3 top-3.5 text-slate-400" size={18} />
                                <input
                                    type="month"
                                    className={`w-full pl-10 p-3 border-2 rounded-xl outline-none transition-colors ${touched.expiry && errors.expiry
                                        ? 'border-red-300 focus:border-red-500'
                                        : 'border-slate-200 focus:border-purple-500'
                                        }`}
                                    value={expiry}
                                    onChange={(e) => setExpiry(e.target.value)}
                                    onBlur={() => handleBlur('expiry')}
                                />
                                {touched.expiry && errors.expiry && (
                                    <div className="flex items-center gap-2 mt-2 text-red-600 text-sm">
                                        <AlertCircle size={16} />
                                        <span>{errors.expiry}</span>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* CVV */}
                        <div className="flex-1">
                            <label className="block text-sm font-bold text-slate-700 mb-2">CVV</label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-3.5 text-slate-400" size={18} />
                                <input
                                    type="text"
                                    placeholder="123"
                                    className={`w-full pl-10 p-3 border-2 rounded-xl outline-none transition-colors ${touched.cvv && errors.cvv
                                        ? 'border-red-300 focus:border-red-500'
                                        : 'border-slate-200 focus:border-purple-500'
                                        }`}
                                    value={cvv}
                                    onChange={(e) => {
                                        setCvv(e.target.value);
                                        if (e.target.value.length > 0 && !foundBugs.includes('cvv_visible')) {
                                            addBug('cvv_visible') && setToast({ show: true, message: 'CVV kodu gizli deyil (görünür)' });
                                        }
                                    }}
                                    onBlur={() => handleBlur('cvv')}
                                />
                                {touched.cvv && errors.cvv && (
                                    <div className="flex items-center gap-2 mt-2 text-red-600 text-sm">
                                        <AlertCircle size={16} />
                                        <span>{errors.cvv}</span>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="bg-slate-50 p-4 rounded-xl space-y-2">
                        <div className="flex justify-between text-sm text-slate-600">
                            <span>Məbləğ:</span>
                            <span>100 AZN</span>
                        </div>
                        <div className="flex justify-between text-sm text-slate-600">
                            <span>Komissiya:</span>
                            <span>5 AZN</span>
                        </div>
                        <div className="border-t border-slate-200 pt-2 flex justify-between font-bold text-slate-900">
                            <span
                                className="text-slate-300 cursor-pointer"
                                onClick={() => handleBugClick('amount_label', 'Məbləğ yazısında rəng kontrastı zəifdir')}
                            >
                                Cəmi:
                            </span>
                            <span className="text-red-500">1005 AZN</span>
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={isProcessing}
                        className="w-full py-4 bg-purple-600 text-white rounded-xl font-bold shadow-lg shadow-purple-200 hover:bg-purple-700 transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                        {isProcessing ? (
                            <>
                                <Loader2 className="animate-spin" size={20} />
                                <span>Emal edilir...</span>
                            </>
                        ) : (
                            'Ödəni et'
                        )}
                    </button>
                </form>
            </div>

            <BugList
                bugs={pageBugs}
                foundBugs={foundPageBugs}
                onReset={resetProgress}
                xp={xp}
                getBugPoints={getBugPoints}
                getBugDifficulty={getBugDifficulty}
                deductXP={deductXP}
            />
        </PageTransition>
    );
}
