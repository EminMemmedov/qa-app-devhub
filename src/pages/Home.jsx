
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import PageTransition from '../components/PageTransition';
import { Sparkles, Trophy, Quote, BookOpen, Bug, ArrowRight, Star, Zap, Medal, Target } from 'lucide-react';
import { useGameProgress } from '../hooks/useGameProgress';
import { useAchievements } from '../hooks/useAchievements';
import { achievements } from '../data/achievements';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

export default function Home() {
  const { xp, foundBugs } = useGameProgress();
  const { unlockedAchievements } = useAchievements();

  // Level calculation: 1 level per 500 XP
  const level = Math.floor(xp / 500) + 1;
  const progress = (xp % 500) / 500 * 100;
  const nextLevelXp = 500 - (xp % 500);
  const unlockedCount = unlockedAchievements.length;

  return (
    <PageTransition className="p-6 pb-24 min-h-screen bg-slate-50/50">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-8 pt-6"
      >
        {/* Header Section */}
        <motion.header variants={itemVariants} className="relative z-10 flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-black text-slate-900 tracking-tighter mb-2">
              Salam, <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">QA!</span>
              <motion.span
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ repeat: Infinity, duration: 2, repeatDelay: 3 }}
                className="inline-block ml-2 origin-bottom-right"
              >
                👋
              </motion.span>
            </h1>
            <p className="text-slate-500 text-lg font-medium">
              Bu gün yeni biliklər öyrənməyə hazırsan?
            </p>
          </div>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="hidden sm:flex items-center justify-center w-12 h-12 bg-white rounded-2xl shadow-lg shadow-blue-100 text-yellow-400"
          >
            <Star fill="currentColor" size={24} />
          </motion.div>
        </motion.header>

        {/* Main Stats Card - Redesigned for Clarity */}
        <motion.div
          variants={itemVariants}
          whileHover={{ scale: 1.02 }}
          className="relative overflow-hidden bg-slate-900 rounded-[2.5rem] p-8 text-white shadow-2xl shadow-slate-400/20"
        >
          {/* Decorative Background Elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl -mr-16 -mt-16"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-500/20 rounded-full blur-3xl -ml-16 -mb-16"></div>

          <div className="relative z-10">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-blue-500/20 rounded-2xl backdrop-blur-md border border-blue-500/30">
                  <Trophy size={24} className="text-blue-400" />
                </div>
                <div>
                  <div className="text-sm text-slate-400 font-medium uppercase tracking-wider">Cari Səviyyə</div>
                  <div className="text-3xl font-black text-white">Level {level}</div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm text-slate-400 font-medium uppercase tracking-wider">Ümumi XP</div>
                <div className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                  {xp}
                </div>
              </div>
            </div>

            <div className="bg-slate-800/50 rounded-2xl p-4 border border-slate-700/50 backdrop-blur-sm">
              <div className="flex justify-between text-sm mb-2">
                <span className="text-slate-300 font-medium">Növbəti səviyyəyə doğru</span>
                <span className="text-blue-400 font-bold">{Math.round(progress)}%</span>
              </div>

              <div className="w-full bg-slate-700 rounded-full h-3 overflow-hidden mb-2">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}% ` }}
                  transition={{ duration: 1.5, ease: "easeOut", delay: 0.5 }}
                  className="bg-gradient-to-r from-blue-500 to-purple-500 h-full rounded-full shadow-[0_0_10px_rgba(59,130,246,0.5)]"
                ></motion.div>
              </div>

              <div className="flex items-center gap-2 text-xs text-slate-400">
                <Target size={12} />
                <span>Daha <strong>{nextLevelXp} XP</strong> lazımdır</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Exam Card - Prominent Feature */}
        <Link to="/practice/exam">
          <motion.div
            variants={itemVariants}
            whileHover={{ scale: 1.02, y: -4 }}
            whileTap={{ scale: 0.98 }}
            className="relative overflow-hidden bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 rounded-[2.5rem] p-8 text-white shadow-2xl shadow-purple-400/30 cursor-pointer group mt-8"
          >
            {/* Decorative Elements */}
            <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full blur-3xl -mr-10 -mt-10 group-hover:scale-150 transition-transform duration-500"></div>
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -ml-8 -mb-8 group-hover:scale-150 transition-transform duration-500"></div>

            <div className="relative z-10">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-white/20 rounded-2xl backdrop-blur-md">
                    <Trophy size={32} className="text-yellow-300" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-black">QA İmtahanı</h2>
                    <p className="text-blue-100 text-sm">Biliklərini yoxla!</p>
                  </div>
                </div>
                <ArrowRight size={28} className="text-white/60 group-hover:translate-x-2 transition-transform" />
              </div>

              <div className="grid grid-cols-3 gap-3 mt-6">
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 text-center">
                  <div className="text-2xl font-black">30</div>
                  <div className="text-xs text-blue-100">Sual</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 text-center">
                  <div className="text-2xl font-black">10</div>
                  <div className="text-xs text-blue-100">Dəqiqə</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 text-center">
                  <div className="text-2xl font-black">70%</div>
                  <div className="text-xs text-blue-100">Keçid</div>
                </div>
              </div>
            </div>
          </motion.div>
        </Link>

        {/* Quick Actions Grid */}
        <div className="grid grid-cols-2 gap-4">
          <Link to="/theory" className="block" rel="prefetch">
            <motion.div
              variants={itemVariants}
              whileHover={{ y: -5, shadow: "0 20px 25px -5px rgb(0 0 0 / 0.1)" }}
              whileTap={{ scale: 0.98 }}
              className="bg-white p-6 rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 h-full flex flex-col justify-between group"
            >
              <div className="w-12 h-12 bg-purple-100 rounded-2xl flex items-center justify-center text-purple-600 mb-4 group-hover:scale-110 transition-transform duration-300">
                <BookOpen size={24} />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 text-lg mb-1">Nəzəriyyə</h3>
                <p className="text-slate-500 text-sm leading-snug">QA əsaslarını öyrən</p>
              </div>
            </motion.div>
          </Link>

          <Link to="/practice" className="block" rel="prefetch">
            <motion.div
              variants={itemVariants}
              whileHover={{ y: -5, shadow: "0 20px 25px -5px rgb(0 0 0 / 0.1)" }}
              whileTap={{ scale: 0.98 }}
              className="bg-white p-6 rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 h-full flex flex-col justify-between group"
            >
              <div className="w-12 h-12 bg-orange-100 rounded-2xl flex items-center justify-center text-orange-600 mb-4 group-hover:scale-110 transition-transform duration-300">
                <Bug size={24} />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 text-lg mb-1">Praktika</h3>
                <p className="text-slate-500 text-sm leading-snug">Baqları tap və qeyd et</p>
              </div>
            </motion.div>
          </Link>
        </div>

        {/* Daily Challenge / Quote Section */}
        <motion.div
          variants={itemVariants}
          className="bg-gradient-to-r from-indigo-600 to-blue-600 rounded-3xl p-8 text-white shadow-xl shadow-blue-400/20 relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -mr-10 -mt-10"></div>

          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-white/20 rounded-xl backdrop-blur-md">
                <Sparkles size={20} className="text-yellow-300" />
              </div>
              <h3 className="font-bold text-lg">Günün Sitatı</h3>
            </div>

            <figure>
              <blockquote className="text-lg font-medium leading-relaxed text-blue-50 italic mb-4">
                "Testləşdirmə səhvlərin olmadığını deyil, onların varlığını sübut edir."
              </blockquote>
              <figcaption className="flex items-center gap-2 text-sm text-blue-200 font-medium">
                <div className="w-6 h-0.5 bg-blue-300/50 rounded-full"></div>
                Edsger W. Dijkstra
              </figcaption>
            </figure>
          </div>
        </motion.div>

        {/* Recent Activity / Stats Row */}
        <motion.div variants={itemVariants} className="grid grid-cols-2 gap-4">
          <div className="bg-white p-5 rounded-3xl border border-slate-100 shadow-sm flex items-center gap-4">
            <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center text-green-600">
              <Bug size={20} />
            </div>
            <div>
              <div className="text-2xl font-black text-slate-900">{foundBugs.length}</div>
              <div className="text-xs text-slate-500 font-bold uppercase">Tapılan Baq</div>
            </div>
          </div>
          <div className="bg-white p-5 rounded-3xl border border-slate-100 shadow-sm flex items-center gap-4">
            <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center text-yellow-600">
              <Medal size={20} />
            </div>
            <div>
              <div className="text-2xl font-black text-slate-900">{unlockedCount}</div>
              <div className="text-xs text-slate-500 font-bold uppercase">Nailiyyətlər</div>
            </div>
          </div>
        </motion.div>

      </motion.div>
    </PageTransition>
  );
}

