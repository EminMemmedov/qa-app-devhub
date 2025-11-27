import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import PageTransition from '../components/PageTransition';
import { Sparkles, Trophy, Quote, BookOpen, Bug, ArrowRight, Star, Zap, Medal, Target, MessageSquare, Linkedin, Instagram, Phone, ExternalLink, Newspaper, PieChart, FileText, Bot } from 'lucide-react';
import { useGameProgress } from '../hooks/useGameProgress';
import { useAchievements } from '../hooks/useAchievements';
import { achievements } from '../data/achievements';
import { useStreak } from '../hooks/useStreak';
import LearningProgress from '../components/LearningProgress';
import { Flame } from 'lucide-react';
import ThemeToggle from '../components/ThemeToggle';

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
  const { t } = useTranslation();
  const { xp, foundBugs } = useGameProgress();
  const { unlockedAchievements } = useAchievements();
  const { currentStreak, longestStreak } = useStreak();

  // Level calculation: 1 level per 500 XP
  const level = Math.floor(xp / 500) + 1;
  const progress = (xp % 500) / 500 * 100;
  const nextLevelXp = 500 - (xp % 500);
  const unlockedCount = unlockedAchievements.length;

  // LinkedIn Articles
  const articles = [
    {
        id: 1,
        title: "Allure Report vs Extent Report",
        desc: "Hansı daha yaxşıdır? CI/CD, dizayn və funksionallıq müqayisəsi.",
        link: "https://www.linkedin.com/posts/qa-academyaz_qaacademy-automationtesting-allurereport-activity-7396865939637538816-KYrh",
        icon: PieChart,
        gradient: "from-blue-500 to-cyan-500"
    },
    {
        id: 2,
        title: "Test Sənədləşməsi",
        desc: "QA prosesinin görünməyən qəhrəmanı: Test Plan, Test Case və RTM.",
        link: "https://www.linkedin.com/feed/update/urn:li:activity:7399097827135598593",
        icon: FileText,
        gradient: "from-purple-500 to-pink-500"
    },
    {
        id: 3,
        title: "Automation yoxsa Manual?",
        desc: "Hansı yol daha düzgündür? Karyera üçün hansını seçməli?",
        link: "https://www.linkedin.com/feed/update/urn:li:activity:7376610160896544768",
        icon: Bot,
        gradient: "from-orange-500 to-red-500"
    }
  ];

  return (
    <PageTransition className="p-6 pb-24 min-h-screen bg-slate-50/50 dark:bg-slate-900 transition-colors duration-300">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="pt-6"
      >
        {/* Header Section */}
        <motion.header variants={itemVariants} className="relative z-10 flex justify-between items-start mb-8">
          <div className="flex-1">
            <motion.div 
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: "spring", stiffness: 260, damping: 20 }}
              className="relative inline-block mb-6 group"
            >
                {/* Animated Glow Effect */}
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-1000 group-hover:duration-200 animate-pulse"></div>
                
                {/* Logo Container */}
                <div className="relative bg-white dark:bg-slate-800 p-4 rounded-2xl shadow-xl shadow-slate-200/50 dark:shadow-black/30 ring-1 ring-slate-100 dark:ring-slate-700">
                    <img src="/qa-academy.png" alt="QA Academy" className="h-20 object-contain" />
                </div>
            </motion.div>

            <h1 className="text-4xl font-black text-slate-900 dark:text-white tracking-tighter mb-2">
              {t('home.greeting').split(',')[0]}, <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400">{t('home.greeting').split(' ')[1]}</span>
              <motion.span
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ repeat: Infinity, duration: 2, repeatDelay: 3 }}
                className="inline-block ml-2 origin-bottom-right"
              >
                👋
              </motion.span>
            </h1>
            <p className="text-slate-500 dark:text-slate-400 text-lg font-medium">
              {t('home.subtitle')}
            </p>
          </div>
          <div className="hidden sm:block">
             <ThemeToggle />
          </div>
        </motion.header>

        {/* Main Stats Card - Redesigned for Clarity */}
        <motion.div
          variants={itemVariants}
          whileHover={{ scale: 1.02 }}
          className="relative overflow-hidden bg-slate-900 rounded-[2.5rem] p-8 text-white shadow-2xl shadow-slate-400/20 mb-8"
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
                  <div className="text-sm text-slate-400 font-medium uppercase tracking-wider">{t('home.currentLevel')}</div>
                  <div className="text-3xl font-black text-white">Level {level}</div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm text-slate-400 font-medium uppercase tracking-wider">{t('home.totalXP')}</div>
                <div className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                  {xp}
                </div>
              </div>
            </div>

            <div className="bg-slate-800/50 rounded-2xl p-4 border border-slate-700/50 backdrop-blur-sm">
              <div className="flex justify-between text-sm mb-2">
                <span className="text-slate-300 font-medium">{t('home.nextLevel')}</span>
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
                <span>{t('home.moreXPNeeded', { xp: nextLevelXp })}</span>
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
            className="relative overflow-hidden bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 rounded-[2.5rem] p-8 text-white shadow-2xl shadow-purple-400/30 cursor-pointer group mb-6"
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
                    <h2 className="text-2xl font-black">{t('home.examCard.title')}</h2>
                    <p className="text-blue-100 text-sm">{t('home.examCard.subtitle')}</p>
                  </div>
                </div>
                <ArrowRight size={28} className="text-white/60 group-hover:translate-x-2 transition-transform" />
              </div>

              <div className="grid grid-cols-3 gap-3 mt-6">
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 text-center">
                  <div className="text-2xl font-black">30</div>
                  <div className="text-xs text-blue-100">{t('home.examCard.questions')}</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 text-center">
                  <div className="text-2xl font-black">10</div>
                  <div className="text-xs text-blue-100">{t('home.examCard.minutes')}</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 text-center">
                  <div className="text-2xl font-black">70%</div>
                  <div className="text-xs text-blue-100">{t('home.examCard.passRate')}</div>
                </div>
              </div>
            </div>
          </motion.div>
        </Link>

        {/* Interview Simulator Card */}
        <Link to="/interview">
          <motion.div
            variants={itemVariants}
            whileHover={{ scale: 1.02, y: -4 }}
            whileTap={{ scale: 0.98 }}
            className="relative overflow-hidden bg-gradient-to-br from-purple-600 via-pink-600 to-rose-600 rounded-[2.5rem] p-8 text-white shadow-2xl shadow-pink-400/30 cursor-pointer group mb-8"
          >
            {/* Decorative Elements */}
            <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full blur-3xl -mr-10 -mt-10 group-hover:scale-150 transition-transform duration-500"></div>
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -ml-8 -mb-8 group-hover:scale-150 transition-transform duration-500"></div>

            <div className="relative z-10">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-white/20 rounded-2xl backdrop-blur-md">
                    <MessageSquare size={32} className="text-pink-200" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-black">{t('home.interviewCard.title')}</h2>
                    <p className="text-pink-100 text-sm">{t('home.interviewCard.subtitle')}</p>
                  </div>
                </div>
                <ArrowRight size={28} className="text-white/60 group-hover:translate-x-2 transition-transform" />
              </div>

              <div className="flex items-center gap-2 mt-4 text-pink-100 text-sm font-medium">
                <span className="bg-white/20 px-3 py-1 rounded-full">{t('home.interviewCard.technical')}</span>
                <span className="bg-white/20 px-3 py-1 rounded-full">{t('home.interviewCard.situational')}</span>
                <span className="bg-white/20 px-3 py-1 rounded-full">{t('home.interviewCard.hr')}</span>
              </div>
            </div>
          </motion.div>
        </Link>

        {/* Learning Progress Card */}
        <div className="mb-8">
          <LearningProgress />
        </div>

        {/* Quick Actions Grid */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <Link to="/theory" className="block" rel="prefetch">
            <motion.div
              variants={itemVariants}
              whileHover={{ y: -5, shadow: "0 20px 25px -5px rgb(0 0 0 / 0.1)" }}
              whileTap={{ scale: 0.98 }}
              className="bg-white dark:bg-slate-800 p-6 rounded-3xl shadow-xl shadow-slate-200/50 dark:shadow-black/20 border border-slate-100 dark:border-slate-700 h-full flex flex-col justify-between group transition-all"
            >
              <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-2xl flex items-center justify-center text-purple-600 dark:text-purple-400 mb-4 group-hover:scale-110 transition-transform duration-300">
                <BookOpen size={24} />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 dark:text-white text-lg mb-1">{t('home.quickActions.theory.title')}</h3>
                <p className="text-slate-500 dark:text-slate-400 text-sm leading-snug">{t('home.quickActions.theory.subtitle')}</p>
              </div>
            </motion.div>
          </Link>

          <Link to="/practice" className="block" rel="prefetch">
            <motion.div
              variants={itemVariants}
              whileHover={{ y: -5, shadow: "0 20px 25px -5px rgb(0 0 0 / 0.1)" }}
              whileTap={{ scale: 0.98 }}
              className="bg-white dark:bg-slate-800 p-6 rounded-3xl shadow-xl shadow-slate-200/50 dark:shadow-black/20 border border-slate-100 dark:border-slate-700 h-full flex flex-col justify-between group transition-all"
            >
              <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900/30 rounded-2xl flex items-center justify-center text-orange-600 dark:text-orange-400 mb-4 group-hover:scale-110 transition-transform duration-300">
                <Bug size={24} />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 dark:text-white text-lg mb-1">{t('home.quickActions.practice.title')}</h3>
                <p className="text-slate-500 dark:text-slate-400 text-sm leading-snug">{t('home.quickActions.practice.subtitle')}</p>
              </div>
            </motion.div>
          </Link>
        </div>

        {/* LinkedIn Articles Section */}
        <motion.div
          variants={itemVariants}
          className="mb-8"
        >
            <div className="flex items-center gap-3 mb-4 px-2">
              <div className="p-2 bg-blue-100 rounded-xl">
                <Newspaper size={20} className="text-blue-600" />
              </div>
              <div>
                <h3 className="font-bold text-lg text-slate-900 dark:text-white">{t('home.dailyQuote.title', 'Faydalı Məqalələr')}</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">{t('home.dailyQuote.subtitle', 'QA biliklərinizi artırın')}</p>
              </div>
            </div>

            <div className="flex gap-4 overflow-x-auto pb-4 -mx-6 px-6 no-scrollbar snap-x">
                {articles.map((article) => (
                    <a 
                        key={article.id}
                        href={article.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`snap-center shrink-0 w-[280px] relative overflow-hidden rounded-[2rem] p-6 bg-gradient-to-br ${article.gradient} text-white shadow-lg shadow-slate-200/50 group hover:-translate-y-1 transition-all duration-300`}
                    >
                        {/* Decorative Background */}
                        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -mr-10 -mt-10 group-hover:scale-150 transition-transform duration-500"></div>
                        <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full blur-xl -ml-8 -mb-8 group-hover:scale-150 transition-transform duration-500"></div>

                        <div className="relative z-10 flex flex-col h-full justify-between min-h-[160px]">
                            <div className="flex justify-between items-start mb-2">
                                <div className="p-3 bg-white/20 rounded-2xl backdrop-blur-md">
                                    <article.icon size={24} className="text-white" />
                                </div>
                                <Linkedin className="text-white/80 w-5 h-5" />
                            </div>
                            
                            <div>
                                <h4 className="font-bold text-lg leading-tight mb-2 line-clamp-2">
                                    {article.title}
                                </h4>
                                <p className="text-white/80 text-xs line-clamp-2 mb-3 font-medium">
                                    {article.desc}
                                </p>
                                <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-wider bg-white/20 w-fit px-2 py-1 rounded-lg">
                                    Oxumaq <ExternalLink size={10} />
                                </div>
                            </div>
                        </div>
                    </a>
                ))}
                
                {/* View More Card */}
                <a 
                    href="https://www.linkedin.com/company/qa-academyaz/posts/?feedView=all&viewAsMember=true"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="snap-center shrink-0 w-[100px] flex flex-col items-center justify-center bg-white rounded-[2rem] border-2 border-slate-100 text-slate-400 hover:border-blue-200 hover:text-blue-600 transition-all gap-2 shadow-sm hover:shadow-md"
                >
                    <div className="w-12 h-12 rounded-full bg-slate-50 group-hover:bg-blue-50 flex items-center justify-center transition-colors">
                        <ArrowRight size={24} />
                    </div>
                    <span className="text-xs font-bold">Hamsı</span>
                </a>
            </div>
        </motion.div>

        {/* Recent Activity / Stats Row */}
        <motion.div variants={itemVariants} className="grid grid-cols-2 gap-4 mb-8">
          <div className="bg-white dark:bg-slate-800 p-5 rounded-3xl border border-slate-100 dark:border-slate-700 shadow-sm flex items-center gap-4 transition-colors">
            <div className="w-10 h-10 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center text-green-600 dark:text-green-400">
              <Bug size={20} />
            </div>
            <div>
              <div className="text-2xl font-black text-slate-900 dark:text-white">{foundBugs.length}</div>
              <div className="text-xs text-slate-500 dark:text-slate-400 font-bold uppercase">{t('home.stats.foundBugs')}</div>
            </div>
          </div>
          <Link to="/achievements">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white dark:bg-slate-800 p-5 rounded-3xl border border-slate-100 dark:border-slate-700 shadow-sm flex items-center gap-4 cursor-pointer hover:border-yellow-300 dark:hover:border-yellow-700 hover:shadow-lg transition-all"
            >
              <div className="w-10 h-10 bg-yellow-100 dark:bg-yellow-900/30 rounded-full flex items-center justify-center text-yellow-600 dark:text-yellow-400">
                <Medal size={20} />
              </div>
              <div>
                <div className="text-2xl font-black text-slate-900 dark:text-white">{unlockedCount}</div>
                <div className="text-xs text-slate-500 dark:text-slate-400 font-bold uppercase">{t('home.stats.achievements')}</div>
              </div>
            </motion.div>
          </Link>
        </motion.div>

        {/* Footer / Contact Section */}
        <motion.div variants={itemVariants} className="mt-12 border-t border-slate-200 dark:border-slate-700 pt-8">
            <div className="text-center mb-6">
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">{t('contact.title')}</h3>
                <p className="text-slate-500 dark:text-slate-400 text-sm">{t('contact.subtitle')}</p>
            </div>
            
            <div className="flex justify-center gap-6 flex-wrap">
                <a 
                    href="https://www.linkedin.com/company/qa-academyaz" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex flex-col items-center gap-2 group"
                >
                    <div className="w-14 h-14 bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 shadow-sm rounded-2xl flex items-center justify-center text-blue-600 dark:text-blue-400 group-hover:bg-blue-50 dark:group-hover:bg-blue-900/30 group-hover:scale-110 transition-all duration-300">
                        <Linkedin size={24} />
                    </div>
                    <span className="text-xs font-medium text-slate-500 dark:text-slate-400 group-hover:text-blue-600 dark:group-hover:text-blue-400">LinkedIn</span>
                </a>

                <a 
                    href="https://www.instagram.com/qaacademy.az/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex flex-col items-center gap-2 group"
                >
                    <div className="w-14 h-14 bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 shadow-sm rounded-2xl flex items-center justify-center text-pink-600 dark:text-pink-400 group-hover:bg-pink-50 dark:group-hover:bg-pink-900/30 group-hover:scale-110 transition-all duration-300">
                        <Instagram size={24} />
                    </div>
                    <span className="text-xs font-medium text-slate-500 dark:text-slate-400 group-hover:text-pink-600 dark:group-hover:text-pink-400">Instagram</span>
                </a>

                <a 
                    href="https://wa.me/994505412141" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex flex-col items-center gap-2 group"
                >
                    <div className="w-14 h-14 bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 shadow-sm rounded-2xl flex items-center justify-center text-green-600 dark:text-green-400 group-hover:bg-green-50 dark:group-hover:bg-green-900/30 group-hover:scale-110 transition-all duration-300">
                        <Phone size={24} />
                    </div>
                    <span className="text-xs font-medium text-slate-500 dark:text-slate-400 group-hover:text-green-600 dark:group-hover:text-green-400">WhatsApp</span>
                </a>
            </div>
            
            <div className="mt-8 text-center">
                 <p className="text-slate-400 dark:text-slate-500 text-xs font-medium">© 2025 QA Academy. Made with ❤️ by Emin</p>
            </div>
        </motion.div>

      </motion.div>
    </PageTransition>
  );
}
