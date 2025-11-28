import { motion } from 'framer-motion';
import { Trophy, Crown, Medal, User, ChevronRight, Shield, Sparkles } from 'lucide-react';
import { useLeaderboard } from '../hooks/useLeaderboard';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

const getAvatarColor = (name) => {
    if (!name) return 'bg-slate-500';
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

export default function HomeLeaderboard() {
    const { t } = useTranslation();
    const { leaders, loading, userProfile } = useLeaderboard();

    if (loading) return (
        <div className="bg-white dark:bg-slate-800 rounded-[2.5rem] p-6 shadow-xl border border-slate-100 dark:border-slate-700 mb-8 animate-pulse">
            <div className="h-8 bg-slate-200 dark:bg-slate-700 rounded-full w-1/2 mb-6 mx-auto"></div>
            <div className="h-32 bg-slate-200 dark:bg-slate-700 rounded-2xl mb-4"></div>
            <div className="space-y-2">
                <div className="h-12 bg-slate-200 dark:bg-slate-700 rounded-xl"></div>
                <div className="h-12 bg-slate-200 dark:bg-slate-700 rounded-xl"></div>
            </div>
        </div>
    );

    if (leaders.length === 0) return null;

    const currentUserRank = leaders.findIndex(u => u.uid === userProfile?.uid) + 1;
    const currentUser = leaders.find(u => u.uid === userProfile?.uid);
    const top3 = leaders.slice(0, 3);
    const rest = leaders.slice(3, 8); // Show next 5

    return (
        <div className="relative mb-8">
            {/* Section Header */}
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
                    {currentUserRank > 0 && (
                        <div className="text-right shrink-0">
                            <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider group-hover:text-indigo-500 transition-colors">Sənin yerin</div>
                            <div className="text-xl font-black text-indigo-600 dark:text-indigo-400 group-hover:scale-110 transition-transform origin-right">#{currentUserRank}</div>
                        </div>
                    )}
                </Link>
            </div>

            <Link to="/leaderboard" className="block">
                <div className="bg-white dark:bg-slate-800 rounded-[2.5rem] p-6 shadow-xl shadow-slate-200/50 dark:shadow-black/20 border border-slate-100 dark:border-slate-700 overflow-hidden relative hover:shadow-2xl hover:shadow-indigo-500/10 transition-shadow duration-300 group">
                    {/* Decorative Background */}
                    <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-indigo-50/50 to-transparent dark:from-indigo-900/10 pointer-events-none"></div>

                    {/* PODIUM */}
                    <div className="flex justify-center items-end gap-4 mb-8 relative z-10 mt-8">
                        {/* 2nd Place */}
                        {top3[1] && (
                            <motion.div 
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.1 }}
                                className="flex flex-col items-center w-1/3"
                            >
                                <div className="relative flex flex-col items-center">
                                    <div className={`w-14 h-14 rounded-2xl ${getAvatarColor(top3[1].name)} flex items-center justify-center text-white font-black text-lg shadow-lg border-4 border-white dark:border-slate-800 z-10 relative`}>
                                        {top3[1].name.charAt(0)}
                                    </div>
                                    <div className="absolute -bottom-2 bg-slate-200 text-slate-600 text-[10px] font-bold px-2 py-0.5 rounded-full shadow-sm border-2 border-white dark:border-slate-800 z-20">#2</div>
                                </div>
                                <div className="mt-3 text-center w-full">
                                    <div className="text-xs font-bold text-slate-700 dark:text-slate-300 truncate px-1">{top3[1].name.split(' ')[0]}</div>
                                    <div className="text-[10px] font-bold text-slate-400">{top3[1].xp} XP</div>
                                </div>
                            </motion.div>
                        )}

                        {/* 1st Place */}
                        {top3[0] && (
                            <motion.div 
                                initial={{ opacity: 0, scale: 0.5 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="flex flex-col items-center w-1/3 -translate-y-4"
                            >
                                <div className="relative flex flex-col items-center">
                                    {/* Crown fixed position above avatar */}
                                    <div className="absolute -top-7 left-1/2 -translate-x-1/2 z-20">
                                        <Crown className="text-yellow-400 drop-shadow-md animate-bounce" size={28} fill="currentColor" />
                                    </div>
                                    
                                    <div className={`w-20 h-20 rounded-3xl ${getAvatarColor(top3[0].name)} flex items-center justify-center text-white font-black text-3xl shadow-xl shadow-indigo-500/20 border-4 border-white dark:border-slate-800 z-10 relative`}>
                                        {top3[0].name.charAt(0)}
                                        {/* Inner shine */}
                                        <div className="absolute inset-0 bg-white/10 rounded-2xl pointer-events-none"></div>
                                    </div>
                                    
                                    <div className="absolute -bottom-3 bg-yellow-400 text-yellow-900 text-xs font-black px-3 py-1 rounded-full shadow-md border-2 border-white dark:border-slate-800 z-20 min-w-[2rem] text-center">#1</div>
                                </div>
                                
                                <div className="mt-5 text-center w-full">
                                    <div className="text-sm font-black text-slate-900 dark:text-white truncate px-1">{top3[0].name.split(' ')[0]}</div>
                                    <div className="text-xs font-bold text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-900/30 px-2 py-0.5 rounded-lg mt-1 inline-block">
                                        {top3[0].xp} XP
                                    </div>
                                </div>
                            </motion.div>
                        )}

                        {/* 3rd Place */}
                        {top3[2] && (
                            <motion.div 
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 }}
                                className="flex flex-col items-center w-1/3"
                            >
                                <div className="relative flex flex-col items-center">
                                    <div className={`w-14 h-14 rounded-2xl ${getAvatarColor(top3[2].name)} flex items-center justify-center text-white font-black text-lg shadow-lg border-4 border-white dark:border-slate-800 z-10 relative`}>
                                        {top3[2].name.charAt(0)}
                                    </div>
                                    <div className="absolute -bottom-2 bg-orange-200 text-orange-700 text-[10px] font-bold px-2 py-0.5 rounded-full shadow-sm border-2 border-white dark:border-slate-800 z-20">#3</div>
                                </div>
                                <div className="mt-3 text-center w-full">
                                    <div className="text-xs font-bold text-slate-700 dark:text-slate-300 truncate px-1">{top3[2].name.split(' ')[0]}</div>
                                    <div className="text-[10px] font-bold text-slate-400">{top3[2].xp} XP</div>
                                </div>
                            </motion.div>
                        )}
                    </div>

                    {/* List */}
                    <div className="space-y-3 relative z-10">
                        {rest.map((user, index) => (
                            <div key={user.id} className="flex items-center gap-3 p-3 bg-slate-50 dark:bg-slate-700/30 rounded-2xl border border-slate-100 dark:border-slate-700">
                                <div className="text-xs font-bold text-slate-400 w-4 text-center">#{index + 4}</div>
                                <div className={`w-8 h-8 min-w-[2rem] rounded-lg ${getAvatarColor(user.name)} flex items-center justify-center text-white text-xs font-bold shadow-sm`}>
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
                        ))}
                    </div>
                    
                    {/* Sticky User Rank (if not in visible list) */}
                    {currentUserRank > 8 && currentUser && (
                        <div className="mt-3 pt-3 border-t border-slate-100 dark:border-slate-700">
                             <div className="flex items-center gap-3 p-3 bg-indigo-600 text-white rounded-2xl shadow-lg shadow-indigo-500/30">
                                <div className="text-xs font-bold text-indigo-200 w-4 text-center">#{currentUserRank}</div>
                                <div className="w-8 h-8 min-w-[2rem] rounded-lg bg-white/20 flex items-center justify-center text-white text-xs font-bold">
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
            </Link>
        </div>
    );
}
