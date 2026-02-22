import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft } from '@phosphor-icons/react';
import { useOrder, calcExtraHands } from '../context/OrderContext';
import PageWrapper from '../components/PageWrapper';
import '../styles/listam.css';
import './TrackingScreen.css';

const STAGES = ['At market', 'Packing items', 'On the way', 'Nearby', 'Delivered'];
const TAP_BTN = { type: 'spring', stiffness: 400, damping: 20 };

function ShopperLane({ index, hands }) {
  const [stage, setStage] = useState(0);

  useEffect(() => {
    if (stage >= STAGES.length - 1) return;
    const delay = 1800 + index * 900 + Math.random() * 600;
    const timer = setTimeout(() => setStage(s => s + 1), delay);
    return () => clearTimeout(timer);
  }, [stage, index]);

  const progress = (stage / (STAGES.length - 1)) * 100;

  return (
    <div className="shopper-lane">
      <div className="lane-header">
        <span className="lane-shopper-label">
          Shopper {index + 1} {hands === 1 ? '' : `(Hand ${index + 1})`}
        </span>
        <motion.span
          className={`lane-stage-badge ${stage === STAGES.length - 1 ? 'lane-stage-badge--done' : ''}`}
          key={stage}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: 'spring', stiffness: 300, damping: 22 }}
        >
          {STAGES[stage]}
        </motion.span>
      </div>
      <div className="lane-track">
        <motion.div
          className="lane-fill"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ type: 'spring', stiffness: 80, damping: 20 }}
        />
      </div>
      <div className="lane-stages">
        {STAGES.map((s, i) => (
          <motion.span
            key={s}
            className={`lane-dot ${i <= stage ? 'lane-dot--active' : ''}`}
            animate={i <= stage ? { scale: [1, 1.4, 1] } : { scale: 1 }}
            transition={{ duration: 0.35 }}
          />
        ))}
      </div>
    </div>
  );
}

export default function TrackingScreen() {
  const { state } = useOrder();
  const navigate = useNavigate();
  const { hands, baseTime } = state;
  const { eta } = calcExtraHands(hands, baseTime);

  return (
    <PageWrapper>
    <div className="listam-root">
      <div className="listam-shell">
        <header className="listam-header">
          <motion.button
            className="listam-back-btn"
            onClick={() => navigate('/listam/success')}
            whileHover={{ scale: 1.12 }}
            whileTap={{ scale: 0.88 }}
            transition={TAP_BTN}
          >
            <ArrowLeft size={22} />
          </motion.button>
          <h1>Live Tracking</h1>
        </header>

        <div className="listam-content tracking-content">
          <div className="tracking-eta-banner">
            <span className="tracking-eta-label">Estimated arrival</span>
            <span className="tracking-eta-value">~{eta} min</span>
          </div>

          <div className="lanes-container">
            {Array.from({ length: hands }).map((_, i) => (
              <ShopperLane key={i} index={i} hands={hands} />
            ))}
          </div>

          <div className="tracking-legend">
            {STAGES.map((s, i) => (
              <div key={s} className="legend-item">
                <span className="legend-num">{i + 1}</span>
                <span className="legend-label">{s}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="listam-action-bar">
          <motion.button
            className="btn-ghost"
            onClick={() => navigate('/listam')}
            whileTap={{ scale: 0.97 }}
            transition={TAP_BTN}
          >
            Back to Home
          </motion.button>
        </div>
      </div>
    </div>
    </PageWrapper>
  );
}
