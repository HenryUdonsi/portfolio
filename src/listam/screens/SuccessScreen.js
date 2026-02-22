import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useOrder } from '../context/OrderContext';
import PageWrapper from '../components/PageWrapper';
import '../styles/listam.css';
import './SuccessScreen.css';

const BLOOM_ITEMS = ['🍠', '🍅', '🥩', '🧅', '🌶️', '🍚', '🍌', '🐟', '🥬', '🥚', '🍗', '🫙'];
const TAP_BTN = { type: 'spring', stiffness: 400, damping: 20 };

export default function SuccessScreen() {
  const { dispatch } = useOrder();
  const navigate = useNavigate();

  const handleDone = () => {
    dispatch({ type: 'RESET' });
    navigate('/listam');
  };

  return (
    <PageWrapper>
    <div className="listam-root">
      <div className="listam-shell success-shell">
        {/* Bloom animation — scattered market items */}
        <div className="bloom-container">
          {BLOOM_ITEMS.map((emoji, i) => (
            <motion.span
              key={i}
              className="bloom-item"
              initial={{ opacity: 0, scale: 0, x: 0, y: 0 }}
              animate={{
                opacity: [0, 1, 1, 0],
                scale: [0, 1.4, 1, 0.6],
                x: Math.cos((i / BLOOM_ITEMS.length) * 2 * Math.PI) * (80 + Math.random() * 60),
                y: Math.sin((i / BLOOM_ITEMS.length) * 2 * Math.PI) * (80 + Math.random() * 60),
              }}
              transition={{
                delay: i * 0.08,
                duration: 1.4,
                type: 'spring',
                stiffness: 180,
                damping: 18,
              }}
              style={{ left: '50%', top: '38%' }}
            >
              {emoji}
            </motion.span>
          ))}
        </div>

        <div className="success-content">
          <motion.div
            className="success-checkmark"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.3, type: 'spring', stiffness: 260, damping: 14 }}
          >
            ✅
          </motion.div>

          <motion.h1
            className="success-title"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55, type: 'spring', stiffness: 280, damping: 22 }}
          >
            We've got it, Amaka.
          </motion.h1>

          <motion.p
            className="success-subtitle"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.75, type: 'spring', stiffness: 260, damping: 22 }}
          >
            Go and enjoy your Saturday. Your order is on its way. 🛒
          </motion.p>

          <motion.div
            className="success-eta-card"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.95, type: 'spring', stiffness: 260, damping: 22 }}
          >
            <span className="success-eta-label">Estimated arrival</span>
            <span className="success-eta-value">~45 minutes</span>
          </motion.div>

          <motion.div
            className="success-actions"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.15, type: 'spring', stiffness: 260, damping: 22 }}
          >
            <motion.button
              className="btn-primary success-track-btn"
              onClick={() => navigate('/listam/tracking')}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              transition={TAP_BTN}
            >
              Track My Order
            </motion.button>
            <motion.button
              className="btn-ghost"
              onClick={handleDone}
              whileTap={{ scale: 0.97 }}
              transition={TAP_BTN}
            >
              Back to Home
            </motion.button>
          </motion.div>
        </div>
      </div>
    </div>
    </PageWrapper>
  );
}
