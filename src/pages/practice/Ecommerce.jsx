import { useState, useEffect } from 'react';
import { ShoppingCart, Minus, Plus, Trash2, ArrowLeft, Search, FileText, Tag, Package, AlertCircle, Loader2, CheckCircle2 } from 'lucide-react';
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

export default function Ecommerce() {
    const { foundBugs, addBug, resetProgress, getBugDifficulty, xp, getBugPoints, deductXP } = useGameProgress();
    const { newAchievement, checkAchievements } = useAchievements();
    const { showAnimation, animationData, triggerBugAnimation } = useBugAnimation();
    const [count, setCount] = useState(1);
    const [couponCode, setCouponCode] = useState('');
    const [appliedCoupon, setAppliedCoupon] = useState(null);
    const [stock, setStock] = useState(5);
    const [toast, setToast] = useState({ show: false, message: '' });
    const [showSpec, setShowSpec] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false);
    const [errors, setErrors] = useState({});
    const [touched, setTouched] = useState({});

    const bugs = [
        { id: 'neg_qty', description: 'Məhsul sayı mənfi ola bilir (-1)' },
        { id: 'zero_qty', description: 'Məhsul sayı 0 ola bilir' },
        { id: 'float_qty', description: 'Məhsul sayı kəsr ola bilir (1.5)' },
        { id: 'price_calc', description: 'Endirim hesablanarkən qiymət artır' },
        { id: 'img_broken', description: 'Məhsul şəkli yüklənməyib' },
        { id: 'del_btn', description: 'Silmə düyməsi işləmir' },
        { id: 'stock_limit', description: 'Stokda olandan çox məhsul seçmək olur' },
        { id: 'product_typo', description: 'Məhsul adında səhv: "iPhone" əvəzinə "iPone"' },
        { id: 'currency_symbol', description: 'Valyuta simvolu yanlışdır ($ əvəzinə ₼)' },
        { id: 'coupon_100', description: 'Kupon kodu "FREE100" 100% endirim verir' },
        { id: 'no_size', description: 'Ölçü seçimi yoxdur' },
        { id: 'no_color', description: 'Rəng seçimi yoxdur' },
        { id: 'img_no_alt', description: 'Şəkildə alt atributu yoxdur (accessibility)' },
        { id: 'price_alignment', description: 'Qiymət sağa deyil, sola yönəlib' },
        { id: 'btn_typo', description: 'Düymədə səhv: "rəsmiləşdir" əvəzinə "rəsmiləşdır"' },
        { id: 'total_font', description: 'Yekun məbləğ şrifti çox kiçikdir' },
        { id: 'qty_btn_size', description: 'Miqdar düymələri fərqli ölçüdədir' },
        { id: 'discount_color', description: 'Endirim mənfi olduğu halda yaşıl rəngdədir' },
        { id: 'checkout_disabled', description: 'Checkout düyməsi heç vaxt disabled olmur' },
        { id: 'stock_info', description: 'Stok məlumatı göstərilmir' }
    ];

    const validateCart = () => {
        const newErrors = {};
        let detectedBugs = [];

        // Quantity validation
        if (count < 0) {
            detectedBugs.push('neg_qty');
            newErrors.quantity = 'Məhsul sayı mənfi ola bilməz';
        }
        if (count === 0) {
            detectedBugs.push('zero_qty');
            newErrors.quantity = 'Məhsul sayı 0 ola bilməz';
        }
        if (count % 1 !== 0) {
            detectedBugs.push('float_qty');
            newErrors.quantity = 'Məhsul sayı tam ədəd olmalıdır';
        }
        if (count > stock) {
            detectedBugs.push('stock_limit');
            newErrors.quantity = `Stokda yalnız ${stock} ədəd var`;
        }

        // Always trigger these bugs
        detectedBugs.push('btn_typo');
        detectedBugs.push('checkout_disabled');

        setErrors(newErrors);
        return { isValid: Object.keys(newErrors).length === 0, detectedBugs };
    };

    const handleDecrement = () => {
        const newCount = count - 1;
        setCount(newCount);

        if (newCount === 0) {
            handleBugClick('zero_qty', 'Məhsul sayı 0 ola bilir');
        }
        if (newCount < 0) {
            handleBugClick('neg_qty', 'Məhsul sayı mənfi ola bilir (-1)');
        }
    };

    const handleIncrement = () => {
        const newCount = count + 1;
        setCount(newCount);

        if (newCount > stock) {
            handleBugClick('stock_limit', 'Stokda olandan çox məhsul seçmək olur');
        }
    };

    const handleQuantityChange = (e) => {
        const val = parseFloat(e.target.value);
        setCount(val);

        if (val % 1 !== 0) {
            handleBugClick('float_qty', 'Məhsul sayı kəsr ola bilir (1.5)');
        }
    };

    const handleDelete = () => {
        handleBugClick('del_btn', 'Silmə düyməsi işləmir');
        // Button doesn't actually delete - this is the bug
    };

    const handleCouponApply = () => {
        if (couponCode.toUpperCase() === 'FREE100') {
            handleBugClick('coupon_100', 'Kupon kodu "FREE100" 100% endirim verir');
            setAppliedCoupon({ code: 'FREE100', discount: 100 });
        } else if (couponCode) {
            setToast({ show: true, message: 'Yanlış kupon kodu' });
        }
    };

    const handleCheckout = async () => {
        const { isValid, detectedBugs } = validateCart();

        // Report all detected bugs
        let foundNew = false;
        detectedBugs.forEach(bugId => {
            const bug = bugs.find(b => b.id === bugId);
            handleBugClick(bugId, bug.description);
            if (!foundBugs.includes(bugId)) {
                foundNew = true;
            }
        });

        if (!isValid) {
            const firstError = Object.values(errors)[0];
            if (!foundNew) {
                setToast({ show: true, message: firstError });
            }
            return;
        }

        setIsProcessing(true);

        // Simulate checkout process
        await new Promise(resolve => setTimeout(resolve, 1500));

        setIsProcessing(false);

        // Bug: Stock doesn't decrease
        const oldStock = stock;
        // setStock(stock - count); // This line is commented out - the bug!

        if (oldStock === stock) {
            handleBugClick('stock_info', 'Stok məlumatı göstərilmir');
        }

        setToast({ show: true, message: 'Sifariş qəbul edildi! ✅' });
    };

    const basePrice = 2999;
    const discount = appliedCoupon ? (appliedCoupon.discount / 100) * basePrice * count : -50; // Bug: negative discount adds to price
    const total = basePrice * count + discount;

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
                moduleBugs: { ecommerce: bugs },
                getBugDifficulty
            });
        }
    };

    // Filter bugs for this page
    const pageBugs = bugs;
    const foundPageBugs = foundBugs.filter(id => pageBugs.find(b => b.id === id));

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
                spec={practiceSpecs.ecommerce}
            />

            <AnimatePresence>
                {showAnimation && animationData && (
                    <BugDiscoveryAnimation
                        bugName={animationData.bugName}
                        points={animationData.points}
                        onComplete={() => { }}
                    />
                )}
            </AnimatePresence>

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
                        <h1 className="text-3xl font-black text-slate-900 tracking-tight mb-2">Səbət</h1>
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

            <div className="bg-white p-6 rounded-[2rem] shadow-xl shadow-orange-200/50 border border-slate-100 relative overflow-hidden mb-8">
                <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-orange-500 to-red-500"></div>

                <div className="flex gap-4 mb-6">
                    <div
                        className="w-24 h-24 bg-slate-100 rounded-xl flex items-center justify-center cursor-pointer"
                        onClick={() => {
                            handleBugClick('img_broken', 'Məhsul şəkli yüklənməyib');
                            handleBugClick('img_no_alt', 'Şəkildə alt atributu yoxdur (accessibility)');
                        }}
                    >
                        <span className="text-xs text-slate-400">Image Error</span>
                    </div>
                    <div className="flex-1">
                        <h3
                            className="font-bold text-slate-900 cursor-pointer"
                            onClick={() => handleBugClick('product_typo', 'Məhsul adında səhv: "iPhone" əvəzinə "iPone"')}
                        >
                            iPone 15 Pro Max
                        </h3>
                        <p className="text-slate-500 text-sm mb-2">Titanium Blue, 256GB</p>

                        {/* Missing size/color selection */}
                        <div className="flex gap-2 mb-2">
                            <span
                                className="text-xs text-slate-400 cursor-pointer hover:text-red-500"
                                onClick={() => handleBugClick('no_size', 'Ölçü seçimi yoxdur')}
                            >
                                Ölçü: ?
                            </span>
                            <span
                                className="text-xs text-slate-400 cursor-pointer hover:text-red-500"
                                onClick={() => handleBugClick('no_color', 'Rəng seçimi yoxdur')}
                            >
                                Rəng: ?
                            </span>
                        </div>

                        <div
                            className="flex items-center gap-2 cursor-pointer"
                            onClick={() => handleBugClick('price_alignment', 'Qiymət sağa deyil, sola yönəlib')}
                        >
                            <span
                                className="font-bold text-lg cursor-pointer"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    addBug('currency_symbol'); // Keep addBug here to avoid double toast if handleBugClick is used inside another handler? No, this is standalone.
                                    handleBugClick('currency_symbol', 'Valyuta simvolu yanlışdır ($ əvəzinə ₼)');
                                }}
                            >
                                ${basePrice}
                            </span>
                            <span
                                className="text-sm text-red-500 line-through cursor-pointer"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleBugClick('price_calc', 'Endirim hesablanarkən qiymət artır');
                                }}
                            >
                                ${basePrice - 500}
                            </span>
                        </div>
                    </div>
                </div>

                <div className="flex items-center justify-between bg-slate-50 p-4 rounded-xl mb-6">
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => {
                                handleDecrement();
                                handleBugClick('qty_btn_size', 'Miqdar düymələri fərqli ölçüdədir');
                            }}
                            className="w-10 h-8 bg-white rounded-full shadow-sm flex items-center justify-center text-slate-600 hover:bg-slate-100 transition-colors"
                        >
                            <Minus size={16} />
                        </button>
                        <input
                            type="number"
                            step="0.1"
                            value={count}
                            onChange={handleQuantityChange}
                            className={`font-bold w-16 text-center border-2 rounded-lg p-1 outline-none transition-colors ${errors.quantity ? 'border-red-300' : 'border-slate-200'
                                }`}
                        />
                        <button
                            onClick={handleIncrement}
                            className="w-8 h-8 bg-white rounded-full shadow-sm flex items-center justify-center text-slate-600 hover:bg-slate-100 transition-colors"
                        >
                            <Plus size={16} />
                        </button>
                    </div>
                    <div className="flex items-center gap-4">
                        <div
                            className="flex items-center gap-2 cursor-pointer opacity-50"
                            onClick={() => handleBugClick('stock_info', 'Stok məlumatı göstərilmir')}
                        >
                            <Package size={16} className="text-slate-400" />
                            <span className="text-xs text-slate-400">Stok: ?</span>
                        </div>
                        <button
                            className="text-slate-400 hover:text-red-500 transition-colors"
                            onClick={handleDelete}
                        >
                            <Trash2 size={20} />
                        </button>
                    </div>
                </div>

                {errors.quantity && (
                    <div className="flex items-center gap-2 mb-4 text-red-600 text-sm bg-red-50 p-3 rounded-xl">
                        <AlertCircle size={16} />
                        <span>{errors.quantity}</span>
                    </div>
                )}

                {/* Coupon Code */}
                <div className="mb-6">
                    <label className="block text-sm font-bold text-slate-700 mb-2 flex items-center gap-2">
                        <Tag size={16} />
                        Kupon Kodu
                    </label>
                    <div className="flex gap-2">
                        <input
                            type="text"
                            placeholder="Kupon kodunu daxil edin (FREE100)"
                            className="flex-1 p-3 border-2 border-slate-200 rounded-xl outline-none focus:border-orange-500 transition-colors"
                            value={couponCode}
                            onChange={(e) => setCouponCode(e.target.value)}
                        />
                        <button
                            onClick={handleCouponApply}
                            className="px-6 py-3 bg-orange-100 text-orange-600 rounded-xl font-bold hover:bg-orange-200 transition-colors"
                        >
                            Tətbiq et
                        </button>
                    </div>
                    {appliedCoupon && (
                        <div className="flex items-center gap-2 mt-2 text-green-600 text-sm">
                            <CheckCircle2 size={16} />
                            <span>Kupon tətbiq edildi: {appliedCoupon.discount}% endirim</span>
                        </div>
                    )}
                </div>

                <div className="border-t border-slate-100 pt-4 space-y-2">
                    <div className="flex justify-between text-slate-600">
                        <span>Məhsullar ({count})</span>
                        <span>${basePrice * count}</span>
                    </div>
                    <div
                        className="flex justify-between text-green-600 font-medium cursor-pointer"
                        onClick={() => handleBugClick('discount_color', 'Endirim mənfi olduğu halda yaşıl rəngdədir')}
                    >
                        <span>Endirim</span>
                        <span>{discount > 0 ? '-' : '+'}${Math.abs(discount)}</span>
                    </div>
                    <div
                        className="flex justify-between font-black text-xl text-slate-900 pt-2 cursor-pointer"
                        onClick={() => handleBugClick('total_font', 'Yekun məbləğ şrifti çox kiçikdir')}
                    >
                        <span className="text-xs">Cəmi</span>
                        <span className="text-xs">${total}</span>
                    </div>
                </div>

                <button
                    onClick={handleCheckout}
                    disabled={isProcessing}
                    className="w-full mt-6 py-4 bg-orange-500 text-white rounded-xl font-bold shadow-lg shadow-orange-200 hover:bg-orange-600 transition-colors cursor-pointer disabled:opacity-50 flex items-center justify-center gap-2"
                >
                    {isProcessing ? (
                        <>
                            <Loader2 className="animate-spin" size={20} />
                            <span>Emal edilir...</span>
                        </>
                    ) : (
                        'Sifarişi rəsmiləşdır'
                    )}
                </button>
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
