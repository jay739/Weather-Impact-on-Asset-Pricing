import { motion } from 'framer-motion';
import './TitleBar.css';

const TitleBar = () => {
  return (
    <div className="titlebar">
      <div className="title">Weather Finance Analysis</div>
      <div className="window-controls">
        <motion.button
          whileHover={{ backgroundColor: '#2C2E33' }}
          onClick={() => window.electron.minimize()}
          className="control minimize"
        >
          ─
        </motion.button>
        <motion.button
          whileHover={{ backgroundColor: '#2C2E33' }}
          onClick={() => window.electron.maximize()}
          className="control maximize"
        >
          □
        </motion.button>
        <motion.button
          whileHover={{ backgroundColor: '#E53E3E' }}
          onClick={() => window.electron.close()}
          className="control close"
        >
          ×
        </motion.button>
      </div>
    </div>
  );
};

export default TitleBar;