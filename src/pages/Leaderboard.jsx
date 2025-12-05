import { useState, useEffect, useMemo } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, User, Loader2, ChevronRight, Sparkles, Crown, Edit2, X, Share2, Linkedin, MessageCircle, Send, Copy, Check } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useLeaderboard } from '../hooks/useLeaderboard';

const getAvatarColor = (name) => {
    if (!name) return 'bg-slate-200';
    const colors = [
        'bg-red-500', 'bg-orange-500', 'bg-amber-500',
        'bg-green-500', 'bg-emerald-500', 'bg-teal-500',
        'bg-cyan-500', 'bg-blue-500', 'bg-indigo-500',
        'bg-violet-500', 'bg-purple-500', 'bg-fuchsia-500',
        'bg-pink-500', 'bg-rose-500'
    ];
    const index = name.length % colors.length;
    return colors[index];
};

const Portal = ({ children }) => {
    if (typeof document === 'undefined') return null;
    return createPortal(children, document.body);
};

const PodiumStep = ({ rank, user, delay }) => {
    const isFirst = rank === 1;
    const isSecond = rank === 2;
    const isThird = rank === 3;

    const heightClass = isFirst ? 'h-40' : isSecond ? 'h-28' : 'h-24';
    const gradientClass = isFirst
        ? 'bg-gradient-to-b from-yellow-300 to-yellow-500 shadow-yellow-500/30 border-t border-yellow-200'
        : isSecond
            ? 'bg-gradient-to-b from-slate-300 to-slate-400 dark:from-slate-600 dark:to-slate-700 shadow-slate-500/30 border-t border-slate-200'
            : 'bg-gradient-to-b from-orange-300 to-orange-400 dark:from-orange-700 dark:to-orange-800 shadow-orange-500/30 border-t border-orange-200';

    const numberColor = isFirst ? 'text-yellow-700/20' : isSecond ? 'text-slate-600/20 dark:text-slate-900/30' : 'text-orange-800/20 dark:text-orange-900/30';

    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay, type: "spring", stiffness: 200, damping: 20 }}
            className={`flex flex-col items-center justify-end w-1/3 relative ${isFirst ? 'z-20' : 'z-10'} hover:z-30 transition-all`}
        >
            {/* Avatar Container - Strictly ABOVE the block */}
            <div className={`flex flex-col items-center mb-2 w-full relative z-20 transition-transform ${isFirst ? 'scale-105' : 'scale-95'}`}>
                {isFirst && (
                    <Crown className="text-yellow-300 drop-shadow-md animate-bounce mb-1" size={28} fill="currentColor" />
                )}

                <div className={`
                    relative flex items-center justify-center rounded-2xl text-white font-black shadow-xl overflow-hidden
                    ${user ? getAvatarColor(user.name) : 'bg-slate-100 dark:bg-slate-800 border-2 border-dashed border-slate-300 dark:border-slate-600'}
                    ${isFirst ? 'w-20 h-20 text-2xl border-4 border-white dark:border-slate-900' : 'w-14 h-14 text-lg border-2 border-white dark:border-slate-900'}
                `}>
                    {user ? (
                        <span className="pb-1">{user.name.charAt(0)}</span>
                    ) : (
                        <User className="text-slate-300 dark:text-slate-600" size={isFirst ? 32 : 24} />
                    )}
                </div>

                {/* XP Badge - Under Avatar */}
                {user && (
                    <div className="bg-white/95 dark:bg-slate-800/95 backdrop-blur-sm px-3 py-1 rounded-full shadow-md border border-slate-100 dark:border-slate-600 mt-1 z-30 relative">
                        <span className="text-[10px] font-black text-slate-900 dark:text-white whitespace-nowrap block leading-none">
                            {user.xp} XP
                        </span>
                    </div>
                )}

                {/* Name - Clear separation */}
                <div className={`mt-2 font-bold text-slate-700 dark:text-slate-200 text-center w-full px-1 ${isFirst ? 'text-sm' : 'text-xs'} drop-shadow-sm flex items-center justify-center gap-1`}>
                    <span className="truncate max-w-[80%]">
                        {user ? user.name.split(' ')[0] : ''}
                    </span>
                    {user?.badges?.includes('istqb_certified') && (
                        <div className="relative group/name shrink-0">
                            <Sparkles size={14} className="text-yellow-500" />
                            {/* Tooltip */}
                            <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 px-2 py-1 bg-slate-900/90 text-white text-[10px] rounded-lg opacity-0 group-hover/name:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-50">
                                ISTQB Sertifikatlı
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* The Block */}
            <div className={`w-full ${heightClass} ${gradientClass} rounded-t-2xl relative flex justify-center items-start pt-4 shadow-xl`}>
                {/* Shine overlay */}
                <div className="absolute inset-0 bg-white/10 rounded-t-2xl pointer-events-none"></div>
                <span className={`font-black text-4xl ${numberColor}`}>{rank}</span>
            </div>
        </motion.div>
    );
};

export default function Leaderboard() {
    const { t } = useTranslation();
    const { leaders, loading, userProfile, saveProfile, updateName } = useLeaderboard();

    // Registration/Editing State
    const [showRegistration, setShowRegistration] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [nameInput, setNameInput] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [shareToast, setShareToast] = useState(null);
    const [showShareModal, setShowShareModal] = useState(false);
    const [copied, setCopied] = useState(false);

    useEffect(() => {
        if (!loading && !userProfile) {
            setShowRegistration(true);
        }
    }, [loading, userProfile]);

    // Pre-fill data when editing
    useEffect(() => {
        if (isEditing && userProfile) {
            setNameInput(userProfile.name || '');
            setShowRegistration(true);
        }
    }, [isEditing, userProfile]);

    const handleRegister = async (e) => {
        e.preventDefault();
        if (!nameInput.trim()) return;

        setIsSubmitting(true);

        let success;
        if (isEditing && userProfile) {
            success = await updateName(nameInput.trim());
        } else {
            success = await saveProfile(nameInput.trim());
        }

        setIsSubmitting(false);

        if (success) {
            setShowRegistration(false);
            setIsEditing(false);
        }
    };

    const handleShare = () => {
        if (!userProfile) {
            setShareToast({ type: 'error', message: 'Əvvəlcə qeydiyyatdan keçin!' });
            setTimeout(() => setShareToast(null), 2000);
            return;
        }
        setShowShareModal(true);
    };

    const getShareText = () => {
        const rank = leaders.findIndex(u => u.uid === userProfile.uid) + 1;
        const xp = userProfile.xp || 0;
        return `🏆 Mən QA App-də ${rank > 0 ? `${rank}-ci yerdəyəm və ` : ''}${xp} XP toplamışam! Sən də öz bacarıqlarını yoxla! 🚀`;
    };

    const shareToLinkedIn = () => {
        const text = getShareText();
        const url = 'https://qa-app.vercel.app';
        const linkedInUrl = `https://www.linkedin.com/feed/?shareActive=true&text=${encodeURIComponent(text + ' ' + url)}`;
        window.open(linkedInUrl, '_blank', 'width=600,height=600');
        setShowShareModal(false);
        setShareToast({ type: 'success', message: 'LinkedIn açıldı!' });
        setTimeout(() => setShareToast(null), 2000);
    };

    const shareToWhatsApp = () => {
        const text = getShareText();
        const url = 'https://qa-app.vercel.app';
        const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(text + ' ' + url)}`;
        window.open(whatsappUrl, '_blank');
        setShowShareModal(false);
        setShareToast({ type: 'success', message: 'WhatsApp açıldı!' });
        setTimeout(() => setShareToast(null), 2000);
    };

    const shareToTelegram = () => {
        const text = getShareText();
        const url = 'https://qa-app.vercel.app';
        const telegramUrl = `https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`;
        window.open(telegramUrl, '_blank');
        setShowShareModal(false);
        setShareToast({ type: 'success', message: 'Telegram açıldı!' });
        setTimeout(() => setShareToast(null), 2000);
    };

    const copyLink = async () => {
        const text = getShareText();
        const url = 'https://qa-app.vercel.app';
        const fullText = `${text} ${url}`;

        try {
            await navigator.clipboard.writeText(fullText);
            setCopied(true);
            setTimeout(() => {
                setCopied(false);
                setShowShareModal(false);
            }, 1500);
        } catch (err) {
            console.error('Copy error:', err);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-900">
                <Loader2 className="animate-spin text-indigo-600" size={32} />
            </div>
        );
    }

    const top3 = [
        leaders[0] || null,
        leaders[1] || null,
        leaders[2] || null
    ];
    const rest = leaders.slice(3);
    const currentUserRank = leaders.findIndex(u => u.uid === userProfile?.uid) + 1;
    const currentUser = leaders.find(u => u.uid === userProfile?.uid);

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-900 pb-32 transition-colors">
            {/* Share Toast */}
            <AnimatePresence>
                {shareToast && (
                    <Portal>
                        <motion.div
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className="fixed top-4 left-1/2 -translate-x-1/2 z-[110] bg-green-600 text-white px-6 py-3 rounded-xl shadow-lg font-bold"
                        >
                            {shareToast.message}
                        </motion.div>
                    </Portal>
                )}
            </AnimatePresence>

            {/* Share Modal */}
            <AnimatePresence>
                {showShareModal && (
                    <Portal>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-sm"
                            onClick={() => setShowShareModal(false)}
                        >
                            <motion.div
                                initial={{ scale: 0.9, y: 20 }}
                                animate={{ scale: 1, y: 0 }}
                                exit={{ scale: 0.9, y: 20 }}
                                onClick={(e) => e.stopPropagation()}
                                className="bg-white dark:bg-slate-800 w-full max-w-sm p-6 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-700"
                            >
                                <div className="text-center mb-6">
                                    <div className="w-16 h-16 bg-indigo-100 dark:bg-indigo-900/30 rounded-full flex items-center justify-center mx-auto mb-4 text-indigo-600 dark:text-indigo-400">
                                        <Share2 size={32} />
                                    </div>
                                    <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-2">
                                        Nəticəni Paylaş
                                    </h2>
                                    <p className="text-slate-500 dark:text-slate-400 text-sm">
                                        Dostlarınla paylaş və onları da sınağa çağır!
                                    </p>
                                </div>

                                <div className="space-y-3">
                                    <button
                                        onClick={shareToLinkedIn}
                                        className="w-full p-4 bg-[#0077B5] hover:bg-[#006399] text-white rounded-xl font-bold transition-all flex items-center justify-center gap-3 shadow-lg"
                                    >
                                        <Linkedin size={24} />
                                        LinkedIn
                                    </button>

                                    <button
                                        onClick={shareToWhatsApp}
                                        className="w-full p-4 bg-[#25D366] hover:bg-[#20BD5A] text-white rounded-xl font-bold transition-all flex items-center justify-center gap-3 shadow-lg"
                                    >
                                        <MessageCircle size={24} />
                                        WhatsApp
                                    </button>

                                    <button
                                        onClick={shareToTelegram}
                                        className="w-full p-4 bg-[#0088cc] hover:bg-[#0077b3] text-white rounded-xl font-bold transition-all flex items-center justify-center gap-3 shadow-lg"
                                    >
                                        <Send size={24} />
                                        Telegram
                                    </button>

                                    <button
                                        onClick={copyLink}
                                        className="w-full p-4 bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-600 text-slate-900 dark:text-white rounded-xl font-bold transition-all flex items-center justify-center gap-3"
                                    >
                                        {copied ? <Check size={24} className="text-green-600" /> : <Copy size={24} />}
                                        {copied ? 'Kopyalandı!' : 'Linki Kopyala'}
                                    </button>
                                </div>

                                <button
                                    onClick={() => setShowShareModal(false)}
                                    className="w-full mt-4 py-3 text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 font-medium transition-colors"
                                >
                                    Ləğv et
                                </button>
                            </motion.div>
                        </motion.div>
                    </Portal>
                )}
            </AnimatePresence>

            {/* Registration Modal */}
            <AnimatePresence>
                {showRegistration && (
                    <Portal>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-sm"
                        >
                            <motion.div
                                initial={{ scale: 0.9, y: 20 }}
                                animate={{ scale: 1, y: 0 }}
                                className="bg-white dark:bg-slate-800 w-full max-w-sm p-6 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-700"
                            >
                                {/* Close button for editing mode */}
                                {isEditing && (
                                    <button
                                        onClick={() => {
                                            setShowRegistration(false);
                                            setIsEditing(false);
                                        }}
                                        className="absolute top-4 right-4 p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-400"
                                    >
                                        <X size={20} />
                                    </button>
                                )}

                                <div className="text-center mb-6">
                                    <div className="w-16 h-16 bg-indigo-100 dark:bg-indigo-900/30 rounded-full flex items-center justify-center mx-auto mb-4 text-indigo-600 dark:text-indigo-400">
                                        <User size={32} />
                                    </div>
                                    <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-2">
                                        {isEditing ? 'Profil Düzəlişi' : 'Tanış olaq!'}
                                    </h2>
                                    <p className="text-slate-500 dark:text-slate-400 text-sm">
                                        {isEditing ? 'Məlumatlarınızı yeniləyin.' : 'Liderlər cədvəlində iştirak etmək üçün adınızı daxil edin.'}
                                    </p>
                                </div>

                                <form onSubmit={handleRegister}>
                                    <input
                                        type="text"
                                        value={nameInput}
                                        onChange={(e) => setNameInput(e.target.value)}
                                        placeholder="Ad və Soyad"
                                        className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-900 border-2 border-slate-100 dark:border-slate-700 focus:border-indigo-500 focus:ring-0 outline-none transition-all text-slate-900 dark:text-white font-medium mb-4 placeholder:text-slate-400"
                                        autoFocus
                                    />

                                    <button
                                        type="submit"
                                        disabled={!nameInput.trim() || isSubmitting}
                                        className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold shadow-lg shadow-indigo-500/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                                    >
                                        {isSubmitting ? <Loader2 className="animate-spin" size={20} /> : (
                                            <>
                                                {isEditing ? 'Yadda Saxla' : 'Davam et'}
                                                <ChevronRight size={20} />
                                            </>
                                        )}
                                    </button>
                                </form>
                            </motion.div>
                        </motion.div>
                    </Portal>
                )}
            </AnimatePresence>

            <div className="bg-indigo-600 pt-16 pb-32 px-6 rounded-b-[3rem] shadow-xl relative overflow-hidden mb-[-60px]">
                <div className="absolute top-0 left-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -ml-20 -mt-20"></div>
                <div className="absolute bottom-0 right-0 w-48 h-48 bg-purple-500/20 rounded-full blur-2xl -mr-10 -mb-10"></div>

                <div className="relative z-10">
                    <h1 className="text-3xl font-black text-white text-center mb-2 flex items-center justify-center gap-2">
                        <Trophy className="text-yellow-300" size={32} />
                        Liderlər Cədvəli
                    </h1>
                    <p className="text-indigo-100 text-center text-sm font-medium opacity-90 mb-4">
                        Ən güclü QA mütəxəssisləri
                    </p>
                    <div className="flex justify-center">
                        <button
                            onClick={handleShare}
                            className="p-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors text-white"
                            title="Paylaş"
                        >
                            <Share2 size={20} />
                        </button>
                    </div>
                </div>
            </div>

            <div className="px-4 relative z-20">
                {/* PODIUM CONTAINER */}
                <div className="flex items-end justify-center gap-2 mb-4 px-2 max-w-md mx-auto">
                    <PodiumStep rank={2} user={top3[1]} delay={0.1} />
                    <PodiumStep rank={1} user={top3[0]} delay={0} />
                    <PodiumStep rank={3} user={top3[2]} delay={0.2} />
                </div>

                {/* List */}
                <div className="space-y-3 pb-8 bg-white dark:bg-slate-800 rounded-t-[2.5rem] pt-8 -mx-4 px-6 min-h-[200px] shadow-xl border-t border-slate-100 dark:border-slate-700 relative z-10">
                    {rest.length > 0 ? rest.map((user, index) => (
                        <motion.div
                            key={user.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.05 }}
                            className={`rounded-2xl p-4 flex items-center gap-4 shadow-sm border transition-all ${user.uid === userProfile?.uid
                                ? 'bg-indigo-50 dark:bg-indigo-900/20 border-indigo-200 dark:border-indigo-800 ring-1 ring-indigo-500/30'
                                : 'bg-slate-50 dark:bg-slate-900 border-slate-100 dark:border-slate-700'
                                }`}
                        >
                            <div className="font-bold text-slate-400 w-6 text-center">{index + 4}</div>

                            <div className={`w-10 h-10 min-w-[2.5rem] rounded-xl ${getAvatarColor(user.name)} flex items-center justify-center text-white font-bold shadow-sm`}>
                                {user.name.charAt(0)}
                            </div>

                            <div className="flex-1 min-w-0">
                                <div className="font-bold text-slate-900 dark:text-white flex items-center gap-2">
                                    <span className="truncate">
                                        {user.name} {user.uid === userProfile?.uid && <span className="text-[10px] bg-indigo-100 text-indigo-600 px-1.5 rounded font-bold">(Sən)</span>}
                                    </span>
                                    {user.badges && user.badges.includes('istqb_certified') && (
                                        <div className="relative group/list-item shrink-0">
                                            <Sparkles size={16} className="text-yellow-500" />
                                            <div className="absolute left-0 top-full mt-1 px-2 py-1 bg-slate-900/90 text-white text-[10px] rounded-lg opacity-0 group-hover/list-item:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-50">
                                                ISTQB Sertifikatlı
                                            </div>
                                        </div>
                                    )}
                                </div>
                                <div className="text-xs text-slate-500 font-medium">Level {user.level}</div>
                            </div>
                            <div className="text-indigo-600 dark:text-indigo-400 font-bold whitespace-nowrap">
                                {user.xp} XP
                            </div>
                        </motion.div>
                    )) : (
                        <div className="text-center py-8 text-slate-400 text-sm font-medium">
                            Digər iştirakçılar hələ qoşulmayıb.
                        </div>
                    )}
                </div>
            </div>

            {/* STICKY CURRENT USER BAR (NO EDIT BUTTON) */}
            <Portal>
                <AnimatePresence>
                    {currentUserRank > 3 && currentUser && (
                        <motion.div
                            initial={{ y: 100 }}
                            animate={{ y: 0 }}
                            exit={{ y: 100 }}
                            className="fixed bottom-24 left-4 right-4 z-[60]"
                        >
                            <div className="bg-indigo-900/90 backdrop-blur-md text-white rounded-2xl p-4 shadow-2xl shadow-indigo-900/50 flex items-center gap-4 border border-indigo-500/30 max-w-md mx-auto">
                                <div className="font-black text-indigo-300 w-8 text-center text-lg">#{currentUserRank}</div>
                                <div className={`w-10 h-10 min-w-[2.5rem] rounded-xl ${getAvatarColor(currentUser.name)} flex items-center justify-center text-white font-bold shadow-sm border-2 border-white/20`}>
                                    {currentUser.name.charAt(0)}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="font-bold text-white flex items-center gap-2">
                                        <span className="truncate">
                                            {currentUser.name} <span className="text-[10px] bg-white/20 px-1.5 rounded font-bold">(Sən)</span>
                                        </span>
                                        {currentUser.badges && currentUser.badges.includes('istqb_certified') && (
                                            <div className="relative group/sticky-item shrink-0">
                                                <Sparkles size={16} className="text-yellow-500" />
                                                {/* Tooltip */}
                                                <div className="absolute left-0 top-full mt-1 px-2 py-1 bg-slate-900/90 text-white text-[10px] rounded-lg opacity-0 group-hover/sticky-item:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-50">
                                                    ISTQB Sertifikatlı
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                    <div className="text-xs text-indigo-200 font-medium">Sənin nəticən</div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <button
                                        onClick={handleShare}
                                        className="p-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors"
                                        title="Paylaş"
                                    >
                                        <Share2 size={20} />
                                    </button>
                                    <div className="text-white font-black whitespace-nowrap bg-white/10 px-3 py-1 rounded-lg">
                                        {currentUser.xp} XP
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </Portal>
        </div>
    );
}
