import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft } from '@phosphor-icons/react';
import { useOrder, calcExtraHands } from '../context/OrderContext';
import '../styles/listam.css';
import './TrackingScreen.css';

const STAGES = ['At market', 'Packing items', 'On the way', 'Nearby', 'Delivered'];

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
        <span className={`lane-stage-badge ${stage === STAGES.length - 1 ? 'lane-stage-badge--done' : ''}`}>
          {STAGES[stage]}
        </span>
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
          <span key={s} className={`lane-dot ${i <= stage ? 'lane-dot--active' : ''}`} />
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
    <div className="listam-root">
      <div className="listam-shell">
        <header className="listam-header">
          <button className="listam-back-btn" onClick={() => navigate('/listam/success')}>
            <ArrowLeft size={22} />
          </button>
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
          <button className="btn-ghost" onClick={() => navigate('/listam')}>
            Back to Home
          </button>
        </div>
      </div>
    </div>
  );
}
