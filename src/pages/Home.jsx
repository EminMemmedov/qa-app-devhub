
import { motion } from 'framer-motion';
import PageTransition from '../components/PageTransition';
import { Sparkles, Trophy, Quote } from 'lucide-react';
import { useGameProgress } from '../hooks/useGameProgress';

export default function Home() {
  const { xp, foundBugs } = useGameProgress();
  // Level calculation: 1 level per 500 XP
  const level = Math.floor(xp / 500) + 1;
  const progress = (xp % 500) / 500 * 100;

  return (
    <PageTransition className="p-6 space-y-8 pt-12 pb-24">
      <header className="relative z-10">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
        >
          <h1 className="text-4xl font-black text-slate-900 tracking-tighter">
            Salam, <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">QA!</span>
            <motion.span
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ repeat: Infinity, duration: 2, repeatDelay: 3 }}
              className="inline-block ml-2 origin-bottom-right"
            >
              👋
            </motion.span>
          </h1>
          <p className="text-slate-500 mt-2 text-lg font-medium">
            Bu gün baq tapmağa hazırsan?
          </p>
        </motion.div>
      </header>

      <section className="grid grid-cols-1 gap-6">
        {/* Progress Card with Glassmorphism */}
        <motion.div
          whileHover={{ scale: 1.02, rotate: -1 }}
          whileTap={{ scale: 0.98 }}
          className="relative overflow-hidden bg-gradient-to-br from-blue-600 to-indigo-700 rounded-3xl p-8 text-white shadow-2xl shadow-blue-300/50"
        >
          <div className="absolute top-0 right-0 -mr-8 -mt-8 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
          <div className="absolute bottom-0 left-0 -ml-8 -mb-8 w-32 h-32 bg-blue-400/20 rounded-full blur-2xl"></div>

          <div className="relative z-10">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h3 className="text-2xl font-bold mb-1">Level {level}</h3>
                <p className="text-blue-100 font-medium">{xp} XP</p>
              </div>
              <div className="p-3 bg-white/20 backdrop-blur-md rounded-2xl">
                <Trophy size={24} className="text-yellow-300" />
              </div>
            </div>

            <div className="flex items-end gap-2 mb-2">
              <span className="text-4xl font-black">{Math.round(progress)}%</span>
              <span className="text-blue-200 mb-1">növbəti səviyyəyə</span>
            </div>

            <div className="w-full bg-black/20 rounded-full h-3 backdrop-blur-sm overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 1.5, ease: "easeOut" }}
                className="bg-white h-full rounded-full shadow-[0_0_10px_rgba(255,255,255,0.5)]"
              ></motion.div>
            </div>

            <div className="mt-4 text-sm text-blue-200 font-medium">
              Cəmi {foundBugs.length} baq tapılıb
            </div>
          </div>
        </motion.div>

        {/* Quote Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white border border-slate-100 rounded-3xl p-8 shadow-xl shadow-slate-200/50 relative"
        >
          <Quote className="absolute top-6 right-6 text-slate-100" size={48} />
          <h3 className="text-lg font-bold text-slate-800 mb-3 flex items-center gap-2">
            <Sparkles size={18} className="text-amber-500" />
            Günün sitatı
          </h3>
          <p className="text-slate-600 italic text-lg leading-relaxed relative z-10">
            "Testləşdirmə səhvlərin olmadığını deyil, onların varlığını sübut edir."
          </p>
          <p className="text-right text-sm text-slate-400 mt-4 font-medium">— Edsger W. Dijkstra</p>
        </motion.div>
      </section>
    </PageTransition>
  );
}

