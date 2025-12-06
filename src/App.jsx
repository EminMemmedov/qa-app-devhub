
import { lazy, Suspense, useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Layout from './components/Layout';
import { AnimatePresence, motion } from 'framer-motion';
import { DevToolsProvider } from './context/DevToolsContext';
import { WifiOff } from 'lucide-react';

// Lazy load pages for better performance with prefetching
const Home = lazy(() => import(/* webpackPrefetch: true */ './pages/Home'));
const Theory = lazy(() => import(/* webpackPrefetch: true */ './pages/Theory'));
const PracticeHub = lazy(() => import(/* webpackPrefetch: true */ './pages/practice/PracticeHub'));
const Leaderboard = lazy(() => import(/* webpackPrefetch: true */ './pages/Leaderboard'));
const Registration = lazy(() => import('./pages/practice/Registration'));
const Payment = lazy(() => import('./pages/practice/Payment'));
const Banking = lazy(() => import('./pages/practice/Banking'));
const Ecommerce = lazy(() => import('./pages/practice/Ecommerce'));
const ExamResults = lazy(() => import('./pages/practice/ExamResults'));
const API = lazy(() => import('./pages/practice/API'));
const Achievements = lazy(() => import('./pages/Achievements'));
const Mobile = lazy(() => import('./pages/practice/Mobile'));
const Security = lazy(() => import('./pages/practice/Security'));
const Performance = lazy(() => import('./pages/practice/Performance'));
const Interview = lazy(() => import('./pages/Interview'));
const InterviewResults = lazy(() => import('./pages/InterviewResults'));
const Automation = lazy(() => import('./pages/practice/Automation'));
const Database = lazy(() => import('./pages/practice/Database'));
const Glossary = lazy(() => import(/* webpackPrefetch: true */ './pages/Glossary'));
const ISTQB = lazy(() => import(/* webpackPrefetch: true */ './pages/ISTQB'));
const Exam = lazy(() => import(/* webpackPrefetch: true */ './pages/practice/Exam'));
import ResumeBuilder from './pages/ResumeBuilder';
// Import skeleton components
import { SkeletonHome } from './components/Skeleton';

// Loading fallback component
const PageLoader = () => (
  <div className="min-h-screen bg-slate-50 dark:bg-slate-900 p-6 pt-24">
    <div className="max-w-4xl mx-auto">
      <SkeletonHome />
    </div>
  </div>
);

function App() {
  const location = useLocation();
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  return (
    <DevToolsProvider>
      <AnimatePresence mode="wait">
        <Suspense fallback={<PageLoader />}>
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="theory" element={<Theory />} />
              <Route path="theory/:moduleId" element={<Theory />} />
              <Route path="practice" element={<PracticeHub />} />
              <Route path="achievements" element={<Achievements />} />
              <Route path="practice/registration" element={<Registration />} />
              <Route path="practice/payment" element={<Payment />} />
              <Route path="practice/banking" element={<Banking />} />
              <Route path="practice/exam" element={<Exam />} />
              <Route path="practice/exam-results" element={<ExamResults />} />
              <Route path="practice/api" element={<API />} />
              <Route path="practice/mobile" element={<Mobile />} />
              <Route path="practice/security" element={<Security />} />
              <Route path="practice/performance" element={<Performance />} />
              <Route path="practice/ecommerce" element={<Ecommerce />} />
              <Route path="interview" element={<Interview />} />
              <Route path="practice/interview-results" element={<InterviewResults />} />
              <Route path="practice/automation" element={<Automation />} />
              <Route path="practice/database" element={<Database />} />
              <Route path="glossary" element={<Glossary />} />
              <Route path="istqb" element={<ISTQB />} />
              <Route path="leaderboard" element={<Leaderboard />} />
              <Route path="leaderboard" element={<Leaderboard />} />
              <Route path="resume-builder" element={<ResumeBuilder />} />
            </Route>
          </Routes>
        </Suspense>
      </AnimatePresence>

      {/* Offline Indicator */}
      <AnimatePresence>
        {!isOnline && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            className="fixed bottom-20 left-4 right-4 z-[9999] bg-slate-900/90 dark:bg-slate-800/90 backdrop-blur-md text-white px-4 py-3 rounded-xl shadow-lg border border-slate-700/50 flex items-center justify-center gap-3"
          >
            <WifiOff size={20} className="text-red-400" />
            <span className="text-sm font-medium">İnternet bağlantısı yoxdur</span>
          </motion.div>
        )}
      </AnimatePresence>
    </DevToolsProvider>
  );
}

export default App;

