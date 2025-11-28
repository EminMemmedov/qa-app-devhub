import { motion } from 'framer-motion';
import { Trophy, Crown, ChevronRight, User, Sparkles } from 'lucide-react';
import { useLeaderboard } from '../hooks/useLeaderboard';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

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

const PodiumStep = ({ rank, user, delay }) => {
    const isFirst = rank === 1;
    const isSecond = rank === 2;
    const isThird = rank === 3;

    // Adjusted heights for better proportions
    const heightClass = isFirst ? 'h-32' : isSecond ? 'h-20' : 'h-16';
    
    const gradientClass = isFirst 
        ? 'bg-gradient-to-b from-yellow-300 to-yellow-500 shadow-yellow-500/20' 
        : isSecond 
            ? 'bg-gradient-to-b from-slate-300 to-slate-400 dark:from-slate-600 dark:to-slate-700 shadow-slate-500/20' 
            : 'bg-gradient-to-b from-orange-300 to-orange-400 dark:from-orange-700 dark:to-orange-800 shadow-orange-500/20';
    
    const numberColor = isFirst ? 'text-yellow-700/20' : isSecond ? 'text-slate-600/20 dark:text-slate-900/30' : 'text-orange-800/20 dark:text-orange-900/30';

    return (
        <motion.div 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay, type: "spring", stiffness: 200, damping: 20 }}
            className={`flex flex-col items-center justify-end w-1/3 relative ${isFirst ? 'z-20' : 'z-10'}`}
        >
            {/* Avatar Container - Strictly ABOVE the block */}
            <div className={`flex flex-col items-center mb-1 w-full relative z-20 transition-transform ${isFirst ? 'scale-105' : 'scale-95'}`}>
                {isFirst && (
                    <Crown className="text-yellow-400 drop-shadow-sm animate-bounce mb-0.5" size={20} fill="currentColor" />
                )}
                
                <div className={`
                    relative flex items-center justify-center rounded-2xl text-white font-black shadow-md
                    ${user ? getAvatarColor(user.name) : 'bg-slate-100 dark:bg-slate-800 border-2 border-dashed border-slate-300 dark:border-slate-600'}
                    ${isFirst ? 'w-14 h-14 text-xl border-4 border-white dark:border-slate-900' : 'w-11 h-11 text-base border-2 border-white dark:border-slate-900'}
                `}>
                    {user ? (
                        user.name.charAt(0)
                    ) : (
                        <User className="text-slate-300 dark:text-slate-600" size={isFirst ? 22 : 18} />
                    )}
                </div>

                {/* XP Badge - Properly spaced */}
                {user && (
                    <div className="bg-white/95 dark:bg-slate-800/95 backdrop-blur-sm px-2 py-0.5 rounded-full shadow-sm border border-slate-100 dark:border-slate-600 mt-1 z-30 relative">
                        <span className="text-[9px] font-bold text-slate-900 dark:text-white whitespace-nowrap block leading-none">
                            {user.xp} XP
                        </span>
                    </div>
                )}

                {/* Name - Clear separation */}
                <div className={`mt-1 font-bold text-slate-700 dark:text-slate-200 text-center truncate w-full px-1 ${isFirst ? 'text-xs' : 'text-[10px]'}`}>
                    {user ? user.name.split(' ')[0] : ''}
                </div>
            </div>

            {/* The Block */}
            <div className={`w-full ${heightClass} ${gradientClass} rounded-t-xl relative flex justify-center items-start pt-2 shadow-xl`}>
                {/* Shine overlay */}
                <div className="absolute inset-0 bg-white/10 rounded-t-xl pointer-events-none"></div>
                <span className={`font-black text-3xl ${numberColor}`}>{rank}</span>
            </div>
        </motion.div>
    );
};

export default function HomeLeaderboard() {
    const { t } = useTranslation();
    const { leaders, loading, userProfile } = useLeaderboard();

    if (loading) return (
        <div className="bg-white dark:bg-slate-800 rounded-[2.5rem] p-6 shadow-xl border border-slate-100 dark:border-slate-700 mb-8 animate-pulse h-64"></div>
    );

    if (leaders.length === 0) return null;

    const currentUserRank = leaders.findIndex(u => u.uid === userProfile?.uid) + 1;
    const currentUser = leaders.find(u => u.uid === userProfile?.uid);
    
    // Always have 3 spots for the podium, fill with null if fewer users
    const top3 = [
        leaders[0] || null, // 1st
        leaders[1] || null, // 2nd
        leaders[2] || null  // 3rd
    ];
    
    const rest = leaders.slice(3, 8);

    return (
        <div className="relative mb-8">
            {/* Header */}
            <div className="flex items-center justify-between mb-4 px-2">
                <Link to="/leaderboard" className="flex items-center gap-3 group w-full">
                    <div className="p-2 bg-yellow-100 dark:bg-yellow-900/30 rounded-xl group-hover:scale-110 transition-transform shrink-0">
                        <Trophy className="text-yellow-600 dark:text-yellow-400" size={24} />
                    </div>
                    <div className="flex-1">
                        <h3 className="font-black text-lg text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors flex items-center gap-1">
                            Liderlər <ChevronRight size={18} className="opacity-50 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                        </h3>
                        <p className="text-xs text-slate-500 dark:text-slate-400 font-medium leading-none mt-0.5">Top QA Mütəxəssisləri</p>
                    </div>
                </Link>
            </div>

            <Link to="/leaderboard" className="block">
                <div className="bg-white dark:bg-slate-800 rounded-[2.5rem] pt-8 px-4 pb-0 shadow-xl shadow-slate-200/50 dark:shadow-black/20 border border-slate-100 dark:border-slate-700 overflow-hidden relative group">
                    
                    {/* PODIUM CONTAINER */}
                    <div className="flex items-end justify-center gap-1 mb-0 px-2">
                        {/* 2nd Place */}
                        <PodiumStep rank={2} user={top3[1]} delay={0.1} />
                        
                        {/* 1st Place */}
                        <PodiumStep rank={1} user={top3[0]} delay={0} />
                        
                        {/* 3rd Place */}
                        <PodiumStep rank={3} user={top3[2]} delay={0.2} />
                    </div>

                    {/* The "Ground" connecting the podium */}
                    <div className="h-4 bg-gradient-to-b from-slate-50 to-white dark:from-slate-800 dark:to-slate-900 relative z-20 -mt-1"></div>

                    {/* Rest of the list */}
                    <div className="bg-slate-50 dark:bg-slate-900/50 px-5 py-4 space-y-3 relative z-10">
                        {rest.length > 0 ? rest.map((user, index) => (
                            <div key={user.id} className="flex items-center gap-3 p-3 bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-sm">
                                <div className="text-xs font-bold text-slate-400 w-4 text-center">#{index + 4}</div>
                                <div className={`w-8 h-8 rounded-lg ${getAvatarColor(user.name)} flex items-center justify-center text-white text-xs font-bold shadow-sm`}>
                                    {user.name.charAt(0)}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="text-sm font-bold text-slate-700 dark:text-slate-200 truncate flex items-center gap-1">
                                        {user.name}
                                        {user.badges?.includes('istqb_certified') && <Sparkles size={10} className="text-yellow-500" />}
                                    </div>
                                </div>
                                <div className="text-xs font-bold text-indigo-500 dark:text-indigo-400 whitespace-nowrap">{user.xp} XP</div>
                            </div>
                        )) : (
                            <div className="text-center py-2 text-slate-400 text-xs font-medium">
                                Digər iştirakçılar hələ qoşulmayıb
                            </div>
                        )}
                        
                        {/* Current User Sticky (if not in view) */}
                        {currentUserRank > 8 && currentUser && (
                            <div className="mt-3 pt-3 border-t border-slate-200 dark:border-slate-700">
                                 <div className="flex items-center gap-3 p-3 bg-indigo-600 text-white rounded-2xl shadow-lg shadow-indigo-500/30">
                                    <div className="text-xs font-bold text-indigo-200 w-4 text-center">#{currentUserRank}</div>
                                    <div className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center text-white text-xs font-bold">
                                        {currentUser.name.charAt(0)}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="text-sm font-bold truncate">Sən</div>
                                    </div>
                                    <div className="text-xs font-bold text-indigo-100 whitespace-nowrap">{currentUser.xp} XP</div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </Link>
        </div>
    );
}
