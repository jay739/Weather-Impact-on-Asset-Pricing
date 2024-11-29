import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Sidebar from './frontend/components/Sidebar';
import TitleBar from './frontend/components/TitleBar';
import Dashboard from './frontend/components/Dashboard';
import Analysis from './frontend/components/Analysis';
import WeatherImpact from './frontend/components/WeatherImpact';
import Predictions from './frontend/components/Predictions';
import './App.css';

function App() {
  const [activePage, setActivePage] = useState('dashboard');

  const pageVariants = {
    initial: { opacity: 0, y: 20 },
    enter: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 }
  };

  return (
    <div className="App">
      <TitleBar />
      <div className="main-container">
        <Sidebar activePage={activePage} onPageChange={setActivePage} />
        <main className="content">
          <AnimatePresence mode="wait">
            <motion.div
              key={activePage}
              variants={pageVariants}
              initial="initial"
              animate="enter"
              exit="exit"
              transition={{ duration: 0.3 }}
            >
              {activePage === 'dashboard' && <Dashboard />}
              {activePage === 'analysis' && <Analysis />}
              {activePage === 'weather' && <WeatherImpact />}
              {activePage === 'predictions' && <Predictions />}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}

export default App;