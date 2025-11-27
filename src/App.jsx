
import { lazy, Suspense } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Layout from './components/Layout';
import { AnimatePresence } from 'framer-motion';
import { DevToolsProvider } from './context/DevToolsContext';

// Lazy load pages for better performance
const Home = lazy(() => import('./pages/Home'));
const Theory = lazy(() => import('./pages/Theory'));
const PracticeHub = lazy(() => import('./pages/practice/PracticeHub'));
const Registration = lazy(() => import('./pages/practice/Registration'));
const Payment = lazy(() => import('./pages/practice/Payment'));
const Banking = lazy(() => import('./pages/practice/Banking'));
const Ecommerce = lazy(() => import('./pages/practice/Ecommerce'));
const Exam = lazy(() => import('./pages/practice/Exam'));
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
const Glossary = lazy(() => import('./pages/Glossary'));
const ISTQB = lazy(() => import('./pages/ISTQB'));

// Loading fallback component
const PageLoader = () => (
  <div className="flex items-center justify-center min-h-screen bg-slate-50 dark:bg-slate-900">
    <div className="space-y-4">
      <div className="w-24 h-6 bg-gray-300 dark:bg-gray-700 rounded animate-pulse" />
      <div className="w-48 h-4 bg-gray-300 dark:bg-gray-700 rounded animate-pulse" />
      <div className="w-32 h-4 bg-gray-300 dark:bg-gray-700 rounded animate-pulse" />
    </div>
  </div>
);

function App() {
  const location = useLocation();

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
            </Route>
          </Routes>
        </Suspense>
      </AnimatePresence>
    </DevToolsProvider>
  );
}

export default App;

