import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, Medal, User, Search, Crown, Shield, Zap, Loader2, ChevronRight, Sparkles } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useLeaderboard } from '../hooks/useLeaderboard';

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

export default function Leaderboard() {
  const { t } = useTranslation();
  const { leaders, loading, userProfile, saveProfile } = useLeaderboard();
  
  // Registration State
  const [showRegistration, setShowRegistration] = useState(false);
  const [nameInput, setNameInput] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
      // Show registration if user has no profile and not loading
      if (!loading && !userProfile) {
          setShowRegistration(true);
      }
  }, [loading, userProfile]);

  const handleRegister = async (e) => {
      e.preventDefault();
      if (!nameInput.trim()) return;

      setIsSubmitting(true);
      const success = await saveProfile(nameInput.trim());
      setIsSubmitting(false);
      
      if (success) {
          setShowRegistration(false);
      }
  };

  if (loading) {
      return (
          <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-900">
              <Loader2 className="animate-spin text-indigo-600" size={32} />
          </div>
      );
  }

  const top3 = leaders.slice(0, 3);
  const rest = leaders.slice(3);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 pb-24 transition-colors">
      {/* Registration Modal */}
      <AnimatePresence>
          {showRegistration && (
              <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-sm"
              >
                  <motion.div
                      initial={{ scale: 0.9, y: 20 }}
                      animate={{ scale: 1, y: 0 }}
                      className="bg-white dark:bg-slate-800 w-full max-w-sm p-6 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-700"
                  >
                      <div className="text-center mb-6">
                          <div className="w-16 h-16 bg-indigo-100 dark:bg-indigo-900/30 rounded-full flex items-center justify-center mx-auto mb-4 text-indigo-600 dark:text-indigo-400">
                              <User size={32} />
                          </div>
                          <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-2">Tanış olaq!</h2>
                          <p className="text-slate-500 dark:text-slate-400 text-sm">Liderlər cədvəlində iştirak etmək üçün adınızı və soyadınızı daxil edin.</p>
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
                                      Davam et <ChevronRight size={20} />
                                  </>
                              )}
                          </button>
                      </form>
                  </motion.div>
              </motion.div>
          )}
      </AnimatePresence>

      <div className="bg-indigo-600 pt-16 pb-16 px-6 rounded-b-[2.5rem] shadow-xl relative overflow-hidden">
        {/* Background decorative circles */}
        <div className="absolute top-0 left-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -ml-20 -mt-20"></div>
        <div className="absolute bottom-0 right-0 w-48 h-48 bg-purple-500/20 rounded-full blur-2xl -mr-10 -mb-10"></div>

        <div className="relative z-10">
          <h1 className="text-3xl font-black text-white text-center mb-2 flex items-center justify-center gap-2">
            <Trophy className="text-yellow-300" size={32} />
            Liderlər Cədvəli
          </h1>
          <p className="text-indigo-100 text-center text-sm font-medium opacity-90">
            Ən güclü QA mütəxəssisləri
          </p>
        </div>
      </div>

      <div className="px-4 -mt-8">
        {leaders.length === 0 ? (
             <div className="bg-white dark:bg-slate-800 rounded-2xl p-8 text-center shadow-lg border border-slate-100 dark:border-slate-700">
                <Trophy size={48} className="mx-auto text-slate-300 dark:text-slate-600 mb-4" />
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Hələ ki, boşdur</h3>
                <p className="text-slate-500 dark:text-slate-400 text-sm">İlk lider sən ola bilərsən!</p>
             </div>
        ) : (
        <>
        {/* Top 3 Podium */}
        <div className="flex justify-center items-end gap-4 mb-8 relative z-10 mt-6">
            {/* 2nd Place */}
            {top3[1] && (
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="flex flex-col items-center w-1/3"
                >
                    <div className="relative flex flex-col items-center">
                        <div className={`w-14 h-14 rounded-2xl ${getAvatarColor(top3[1].name)} flex items-center justify-center text-white font-black text-lg shadow-lg rotate-3 border-4 border-white dark:border-slate-800 z-10 relative`}>
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
                    className="flex flex-col items-center w-1/3 -translate-y-6 z-10"
                >
                    <div className="relative flex flex-col items-center">
                        {/* Crown */}
                        <div className="absolute -top-8 left-1/2 -translate-x-1/2 z-20">
                            <Crown className="text-yellow-400 drop-shadow-md animate-bounce" size={28} fill="currentColor" />
                        </div>
                        
                        <div className={`w-20 h-20 rounded-3xl ${getAvatarColor(top3[0].name)} flex items-center justify-center text-white font-black text-3xl shadow-xl shadow-indigo-500/20 border-4 border-white dark:border-slate-800 z-10 relative`}>
                            {top3[0].name.charAt(0)}
                            <div className="absolute inset-0 bg-white/10 rounded-2xl pointer-events-none"></div>
                        </div>
                        
                        <div className="absolute -bottom-3 bg-yellow-400 text-yellow-900 text-xs font-black px-3 py-1 rounded-full shadow-md border-2 border-white dark:border-slate-800 z-20 min-w-[2rem] text-center whitespace-nowrap">#1</div>
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
                        <div className={`w-14 h-14 rounded-2xl ${getAvatarColor(top3[2].name)} flex items-center justify-center text-white font-black text-lg shadow-lg -rotate-3 border-4 border-white dark:border-slate-800 z-10 relative`}>
                            {top3[2].name.charAt(0)}
                        </div>
                        <div className="absolute -bottom-2 bg-orange-200 text-orange-700 text-[10px] font-bold px-2 py-0.5 rounded-full shadow-sm border-2 border-white dark:border-slate-800 z-20">#3</div>
                    </div>
                    <div className="mt-3 text-center w-full">
                        <div className="text-xs font-bold text-slate-700 dark:text-slate-300 truncate px-1">{top3[2].name.split(' ')[0]}</div>
                        <div className="text-xs font-bold text-indigo-500 dark:text-indigo-400">{top3[2].xp} XP</div>
                    </div>
                </motion.div>
            )}
        </div>

        {/* List */}
        <div className="space-y-3 pb-8">
          {rest.map((user, index) => (
            <motion.div
              key={user.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`rounded-2xl p-4 flex items-center gap-4 shadow-sm border ${user.uid === userProfile?.uid ? 'bg-indigo-50 dark:bg-indigo-900/20 border-indigo-200 dark:border-indigo-800 ring-1 ring-indigo-500/30' : 'bg-white dark:bg-slate-800 border-slate-100 dark:border-slate-700'}`}
            >
              <div className="font-bold text-slate-400 w-6 text-center">{index + 4}</div>
              <div className={`w-10 h-10 min-w-[2.5rem] rounded-xl ${getAvatarColor(user.name)} flex items-center justify-center text-white font-bold shadow-sm`}>
                {user.name.charAt(0)}
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-bold text-slate-900 dark:text-white flex items-center gap-2 truncate">
                    {user.name} {user.uid === userProfile?.uid && <span className="text-[10px] bg-indigo-100 text-indigo-600 px-1.5 rounded font-bold">(Sən)</span>}
                    {user.badges && user.badges.includes('istqb_certified') && (
                       <Sparkles size={14} className="text-yellow-500 shrink-0" />
                    )}
                </div>
                <div className="text-xs text-slate-500 font-medium">Level {user.level}</div>
              </div>
              <div className="text-indigo-600 dark:text-indigo-400 font-bold whitespace-nowrap">
                {user.xp} XP
              </div>
            </motion.div>
          ))}
        </div>
        </>
        )}
      </div>
    </div>
  );
}
