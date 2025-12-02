import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import PageTransition from '../components/PageTransition';
import { Sparkles, Trophy, BookOpen, Bug, ArrowRight, Target, MessageSquare, Linkedin, Instagram, Phone, ExternalLink, Newspaper, FileText, Bot, GraduationCap, User, ChevronRight, Loader2, Edit2, X, PieChart, Medal } from 'lucide-react';
import { useGameProgress } from '../hooks/useGameProgress';
import { useAchievements } from '../hooks/useAchievements';
import { useStreak } from '../hooks/useStreak';
import LearningProgress from '../components/LearningProgress';
import HomeLeaderboard from '../components/HomeLeaderboard';
import ThemeToggle from '../components/ThemeToggle';
import { useLeaderboard } from '../hooks/useLeaderboard';
import { useState, useEffect } from 'react';

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

  // Leaderboard & Registration Logic
  // Pass false to skip fetching the full leaderboard list here, saving bandwidth/CPU
  // The HomeLeaderboard component will fetch it separately.
  const { loading: leaderboardLoading, userProfile, saveProfile, updateName } = useLeaderboard(false);
  const [showRegistration, setShowRegistration] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [nameInput, setNameInput] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!leaderboardLoading && !userProfile) {
      setShowRegistration(true);
    }
  }, [leaderboardLoading, userProfile]);

  // Handle opening edit mode
  const handleEditClick = () => {
    if (userProfile) {
      setNameInput(userProfile.name || '');
      setIsEditing(true);
      setShowRegistration(true);
    }
  };

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

      // Dispatch custom event to notify other components (like HomeLeaderboard)
      // This avoids full page reload and maintains SPA benefits
      window.dispatchEvent(new CustomEvent('profile-updated', {
        detail: { name: nameInput.trim() }
      }));
    }
  };

  // Level calculation: 1 level per 500 XP
  const level = Math.floor(xp / 500) + 1;
  const progress = (xp % 500) / 500 * 100;
  const nextLevelXp = 500 - (xp % 500);
  const unlockedCount = unlockedAchievements.length;
  const isISTQBCertified = unlockedAchievements.includes('istqb_certified');

  // LinkedIn Articles
  const articles = [
    {
      id: 1,
      title: "Allure Report vs Extent Report",
      desc: "Hansı daha yaxşıdır? CI/CD, dizayn və funksionallıq müqayisəsi.",
      link: "https://www.linkedin.com/school/devhub-academy",
      icon: PieChart,
      gradient: "from-blue-500 to-cyan-500"
    },
    {
      id: 2,
      title: "Test Sənədləşməsi",
      desc: "QA prosesinin görünməyən qəhrəmanı: Test Plan, Test Case və RTM.",
      link: "https://www.linkedin.com/school/devhub-academy",
      icon: FileText,
      gradient: "from-purple-500 to-pink-500"
    },
    {
      id: 3,
      title: "Automation yoxsa Manual?",
      desc: "Hansı yol daha düzgündür? Karyera üçün hansını seçməli?",
      link: "https://www.linkedin.com/school/devhub-academy",
      icon: Bot,
      gradient: "from-orange-500 to-red-500"
    }
  ];

  return (
    <PageTransition className="p-6 pb-32 min-h-screen bg-slate-50/50 dark:bg-slate-900 transition-colors duration-300">
      {/* Registration/Edit Modal */}
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
              className="bg-white dark:bg-slate-800 w-full max-w-sm p-6 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-700 relative"
            >
              {/* Close button for editing mode */}
              {isEditing && (
                <button
                  onClick={() => {
                    setShowRegistration(false);
                    setIsEditing(false);
                  }}
                  className="absolute top-4 right-4 p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-400 transition-colors"
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
                <p className="text-slate-500 dark:text-slate-400 text-sm mb-2">
                  {isEditing ? 'Məlumatlarınızı yeniləyin.' : 'Liderlər cədvəlində iştirak etmək üçün adınızı daxil edin.'}
                </p>
                {!isEditing && (
                  <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-xl border border-blue-100 dark:border-blue-800">
                    <p className="text-xs text-blue-600 dark:text-blue-300 font-medium">
                      ℹ️ Əgər əvvəllər daxil olmusunuzsa, sadəcə eyni adınızı yazın – sistem sizi tanıyacaq və proqresinizi bərpa edəcək.
                    </p>
                  </div>
                )}
              </div>

              <form onSubmit={handleRegister} autoComplete="off">
                <input
                  type="search"
                  id="user_display_name_field"
                  name="user_display_name_field"
                  autoComplete="off"
                  data-lpignore="true"
                  data-form-type="other"
                  spellCheck="false"
                  value={nameInput}
                  onChange={(e) => setNameInput(e.target.value)}
                  placeholder="Ad və Soyad"
                  className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-900 border-2 border-slate-100 dark:border-slate-700 focus:border-indigo-500 focus:ring-0 outline-none transition-all text-slate-900 dark:text-white font-medium mb-4 placeholder:text-slate-400"
                />
                <button
                  type="submit"
                  disabled={!nameInput.trim() || isSubmitting}
                  className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold shadow-lg shadow-indigo-500/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isSubmitting ? <Loader2 className="animate-spin" size={20} /> : (
                    <>
                      {isEditing ? 'Yadda Saxla' : 'Davam et'} <ChevronRight size={20} />
                    </>
                  )}
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="pt-6"
      >
        {/* Header Section */}
        <motion.header variants={itemVariants} className="relative z-10 flex justify-between items-start mb-8">
          <div className="flex-1">
            <div className="flex items-center gap-4 mb-6">
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: "spring", stiffness: 260, damping: 20 }}
                className="relative group"
              >
                {/* Animated Glow Effect */}
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-yellow-400 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200 animate-pulse"></div>

                {/* Logo Container */}
                <div className="relative p-2 rounded-2xl shadow-xl shadow-slate-200/50 dark:shadow-black/30">
                  <img src="/devhub-logo.jpg" alt="DevHub Academy" className="h-16 w-auto object-contain" />
                </div>
              </motion.div>
              <div className="flex flex-col justify-center">
                <div className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-0.5">Welcome to</div>
                <div className="font-black text-lg text-slate-900 dark:text-white leading-none">DevHub Academy</div>
              </div>
            </div>

            <h1 className="text-4xl font-black text-slate-900 dark:text-white tracking-tighter mb-2 flex items-center flex-wrap gap-2">
              {userProfile ? (
                <div className="flex items-center gap-2">
                  <span>Salam, <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400">{userProfile.name.split(' ')[0]}</span>!</span>
                  <button
                    onClick={handleEditClick}
                    className="p-1.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 transition-all"
                    aria-label="Adı dəyiş"
                  >
                    <Edit2 size={16} />
                  </button>
                </div>
              ) : (
                <>
                  {t('home.greeting').split(',')[0]}, <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400">{t('home.greeting').split(' ')[1]}</span>
                </>
              )}
              <motion.span
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ repeat: Infinity, duration: 2, repeatDelay: 5 }} // Slower repeat delay to save battery
                className="inline-block origin-bottom-right"
              >
                👋
              </motion.span>
              {isISTQBCertified && (
                <div className="group relative inline-block ml-3 align-middle z-50">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    whileTap={{ scale: 0.95 }}
                    className="p-2 bg-gradient-to-br from-amber-300 to-yellow-500 dark:from-amber-400 dark:to-yellow-600 rounded-xl shadow-lg shadow-amber-500/30 cursor-help relative overflow-hidden"
                  >
                    {/* Shine effect */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/30 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                    <GraduationCap size={22} className="text-white dark:text-amber-50 drop-shadow-sm" />
                  </motion.div>

                  {/* Tooltip */}
                  <div className="absolute top-full mt-3 w-48 p-3 bg-slate-900/95 text-white text-center rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 pointer-events-none shadow-xl border border-slate-700/50 z-50 whitespace-normal tracking-normal right-0 sm:left-1/2 sm:-translate-x-1/2 sm:right-auto">
                    <p className="font-bold text-amber-400 mb-1 text-sm">ISTQB Sertifikatlı</p>
                    <p className="text-slate-200 text-xs leading-relaxed">Bu tələbə sınaq imtahanını uğurla keçmişdir.</p>

                    {/* Arrow */}
                    <div className="absolute bottom-full border-8 border-transparent border-b-slate-900/95 right-4 sm:left-1/2 sm:-translate-x-1/2 sm:right-auto"></div>
                  </div>
                </div>
              )}
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
          {/* ... existing stats card content ... */}
          {/* Decorative Background Elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/20 rounded-full blur-2xl -mr-16 -mt-16"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-500/20 rounded-full blur-2xl -ml-16 -mb-16"></div>

          <div className="relative z-10">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-blue-500/20 rounded-2xl border border-blue-500/30">
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

            <div className="bg-slate-800/50 rounded-2xl p-4 border border-slate-700/50">
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

        {/* Leaderboard Widget */}
        <motion.div variants={itemVariants}>
          <HomeLeaderboard />
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
            <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full blur-2xl -mr-10 -mt-10 group-hover:scale-150 transition-transform duration-500"></div>
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/10 rounded-full blur-xl -ml-8 -mb-8 group-hover:scale-150 transition-transform duration-500"></div>

            <div className="relative z-10">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-white/20 rounded-2xl">
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
                <div className="bg-white/10 rounded-xl p-3 text-center">
                  <div className="text-2xl font-black">30</div>
                  <div className="text-xs text-blue-100">{t('home.examCard.questions')}</div>
                </div>
                <div className="bg-white/10 rounded-xl p-3 text-center">
                  <div className="text-2xl font-black">15</div>
                  <div className="text-xs text-blue-100">{t('home.examCard.minutes')}</div>
                </div>
                <div className="bg-white/10 rounded-xl p-3 text-center">
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
            <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full blur-2xl -mr-10 -mt-10 group-hover:scale-150 transition-transform duration-500"></div>
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/10 rounded-full blur-xl -ml-8 -mb-8 group-hover:scale-150 transition-transform duration-500"></div>

            <div className="relative z-10">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-white/20 rounded-2xl">
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
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-xl -mr-10 -mt-10 group-hover:scale-150 transition-transform duration-500"></div>
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full blur-lg -ml-8 -mb-8 group-hover:scale-150 transition-transform duration-500"></div>

                <div className="relative z-10 flex flex-col h-full justify-between min-h-[160px]">
                  <div className="flex justify-between items-start mb-2">
                    <div className="p-3 bg-white/20 rounded-2xl">
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
              href="https://www.linkedin.com/school/devhub-academy"
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
          <div className="bg-white dark:bg-slate-800 p-5 rounded-3xl border border-slate-100 dark:border-slate-700 shadow-sm flex flex-col justify-between h-full transition-colors">
            <div className="flex items-center gap-4 mb-2">
              <div className="w-10 h-10 shrink-0 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center text-green-600 dark:text-green-400">
                <Bug size={20} />
              </div>
              <div className="text-2xl font-black text-slate-900 dark:text-white">{foundBugs.length}</div>
            </div>
            <div className="text-xs text-slate-500 dark:text-slate-400 font-bold uppercase">{t('home.stats.foundBugs')}</div>
          </div>

          <Link to="/achievements" className="block h-full">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white dark:bg-slate-800 p-5 rounded-3xl border border-slate-100 dark:border-slate-700 shadow-sm flex flex-col justify-between h-full cursor-pointer hover:border-yellow-300 dark:hover:border-yellow-700 hover:shadow-lg transition-all"
            >
              <div className="flex items-center gap-4 mb-2">
                <div className="w-10 h-10 shrink-0 bg-yellow-100 dark:bg-yellow-900/30 rounded-full flex items-center justify-center text-yellow-600 dark:text-yellow-400">
                  <Medal size={20} />
                </div>
                <div className="text-2xl font-black text-slate-900 dark:text-white">{unlockedCount}</div>
              </div>
              <div className="text-xs text-slate-500 dark:text-slate-400 font-bold uppercase">{t('home.stats.achievements')}</div>
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
              href="https://www.linkedin.com/school/devhub-academy"
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
              href="https://www.instagram.com/devhub.edu.az/"
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
              href="https://wa.me/994513688927"
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center gap-2 group"
            >
              <div className="w-14 h-14 bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 shadow-sm rounded-2xl flex items-center justify-center text-green-600 dark:text-green-400 group-hover:bg-green-50 dark:group-hover:bg-green-900/30 group-hover:scale-110 transition-all duration-300">
                <Phone size={24} />
              </div>
              <span className="text-xs font-medium text-slate-500 dark:text-slate-400 group-hover:text-green-600 dark:group-hover:text-green-400">WhatsApp</span>
            </a>

            <a
              href="https://devhub.edu.az/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center gap-2 group"
            >
              <div className="w-14 h-14 bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 shadow-sm rounded-2xl flex items-center justify-center text-indigo-600 dark:text-indigo-400 group-hover:bg-indigo-50 dark:group-hover:bg-indigo-900/30 group-hover:scale-110 transition-all duration-300">
                <ExternalLink size={24} />
              </div>
              <span className="text-xs font-medium text-slate-500 dark:text-slate-400 group-hover:text-indigo-600 dark:group-hover:text-indigo-400">Website</span>
            </a>
          </div>

          <div className="mt-8 text-center">
            <p className="text-slate-400 dark:text-slate-500 text-xs font-medium">© 2025 DevHub Academy. Made with ❤️ by Emin</p>
          </div>
        </motion.div>

      </motion.div>
    </PageTransition>
  );
}
