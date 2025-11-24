
import { Routes, Route, useLocation } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Theory from './pages/Theory';
import PracticeHub from './pages/practice/PracticeHub';
import Registration from './pages/practice/Registration';
import Payment from './pages/practice/Payment';
import Banking from './pages/practice/Banking';
import Ecommerce from './pages/practice/Ecommerce';
import Achievements from './pages/Achievements';
import { AnimatePresence } from 'framer-motion';

function App() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="theory" element={<Theory />} />
          <Route path="practice" element={<PracticeHub />} />
          <Route path="achievements" element={<Achievements />} />
          <Route path="practice/registration" element={<Registration />} />
          <Route path="practice/payment" element={<Payment />} />
          <Route path="practice/banking" element={<Banking />} />
          <Route path="practice/ecommerce" element={<Ecommerce />} />
        </Route>
      </Routes>
    </AnimatePresence>
  );
}

export default App;

