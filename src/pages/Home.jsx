import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import PageTransition from '../components/PageTransition';
import { Sparkles, Trophy, Quote, BookOpen, Bug, BrainCircuit, ArrowRight, Star, Zap } from 'lucide-react';
import { useGameProgress } from '../hooks/useGameProgress';

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
  // Level calculation: 1 level per 500 XP
  const level = Math.floor(xp / 500) + 1;
  const progress = (xp % 500) / 500 * 100;
  const nextLevelXp = 500 - (xp % 500);

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

        {/* Main Stats Card */}
        <motion.div
          variants={itemVariants}
          whileHover={{ scale: 1.02 }}
          className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-indigo-600 to-indigo-800 rounded-[2.5rem] p-8 text-white shadow-2xl shadow-blue-300/50"
        >
          {/* Decorative Background Elements */}
          <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-64 h-64 bg-blue-400/20 rounded-full blur-3xl"></div>

          <div className="relative z-10">
            <div className="flex justify-between items-start mb-8">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-xs font-bold uppercase tracking-wider">
                    Səviyyə {level}
                  </span>
                  <span className="px-3 py-1 bg-yellow-400/20 backdrop-blur-md rounded-full text-xs font-bold text-yellow-200 flex items-center gap-1">
                    <Zap size={12} fill="currentColor" />
                    Master
                  </span>
                </div>
                <h3 className="text-5xl font-black tracking-tight mb-1">{xp} <span className="text-2xl font-bold text-blue-200">XP</span></h3>
                <p className="text-blue-100 text-sm font-medium opacity-80">Növbəti səviyyəyə {nextLevelXp} XP qaldı</p>
              </div>
              <div className="p-4 bg-gradient-to-br from-yellow-300 to-yellow-500 rounded-2xl shadow-lg shadow-yellow-500/30 transform rotate-3">
                <Trophy size={32} className="text-white" />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-sm font-bold text-blue-100">
                <span>Progress</span>
                <span>{Math.round(progress)}%</span>
              </div>
              <div className="w-full bg-black/20 rounded-full h-4 backdrop-blur-sm overflow-hidden p-1">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 1.5, ease: "easeOut", delay: 0.5 }}
                  className="bg-gradient-to-r from-white to-blue-200 h-full rounded-full shadow-lg"
                ></motion.div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Quick Actions Grid */}
        <div className="grid grid-cols-2 gap-4">
          <Link to="/theory" className="block">
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

          <Link to="/practice" className="block">
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
          className="bg-gradient-to-r from-slate-900 to-slate-800 rounded-3xl p-8 text-white shadow-xl shadow-slate-400/20 relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-2xl -mr-10 -mt-10"></div>

          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-white/10 rounded-xl backdrop-blur-md">
                <Sparkles size={20} className="text-amber-400" />
              </div>
              <h3 className="font-bold text-lg">Günün Sitatı</h3>
            </div>

            <figure>
              <blockquote className="text-lg font-medium leading-relaxed text-slate-200 italic mb-4">
                "Testləşdirmə səhvlərin olmadığını deyil, onların varlığını sübut edir."
              </blockquote>
              <figcaption className="flex items-center gap-2 text-sm text-slate-400 font-medium">
                <div className="w-6 h-0.5 bg-slate-600 rounded-full"></div>
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
            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600">
              <BrainCircuit size={20} />
            </div>
            <div>
              <div className="text-2xl font-black text-slate-900">0</div>
              <div className="text-xs text-slate-500 font-bold uppercase">Quiz Xalı</div>
            </div>
          </div>
        </motion.div>

      </motion.div>
    </PageTransition>
  );
}
