import { useRef, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart, ClockCounterClockwise } from '@phosphor-icons/react';
import { useOrder } from '../context/OrderContext';
import marketItems from '../data/market_items.json';
import '../styles/listam.css';
import './HomeScreen.css';

function useKeywordBrain(text) {
  const lower = text.toLowerCase();
  const matched = [];

  for (const item of marketItems) {
    const found = item.keywords.some(kw => lower.includes(kw.toLowerCase()));
    if (found) {
      // Try to extract a quantity from text near the keyword
      const qtyMatch = lower.match(/(\d+)\s*(tubers?|kg|pieces?|cups?|litres?|fingers?|bunches?|)?/);
      const qty = qtyMatch ? parseInt(qtyMatch[1], 10) : item.defaultQty;
      matched.push({ ...item, qty: qty > 0 ? qty : item.defaultQty });
    }
  }
  return matched;
}

const stallItemVariants = {
  initial: { y: -80, opacity: 0, scale: 0.7 },
  animate: {
    y: 0, opacity: 1, scale: 1,
    transition: { type: 'spring', stiffness: 200, damping: 0.7 * 20 },
  },
  exit: { scale: 0.5, opacity: 0, transition: { duration: 0.15 } },
};

export default function HomeScreen() {
  const { state, dispatch } = useOrder();
  const navigate = useNavigate();
  const textareaRef = useRef(null);

  const detectedItems = useKeywordBrain(state.inputText);

  useEffect(() => {
    dispatch({ type: 'SET_DETECTED_ITEMS', payload: detectedItems });
  }, [state.inputText]); // eslint-disable-line

  const handleInput = useCallback((e) => {
    dispatch({ type: 'SET_INPUT', payload: e.target.value });
    // Auto-resize
    const ta = textareaRef.current;
    if (ta) {
      ta.style.height = 'auto';
      ta.style.height = ta.scrollHeight + 'px';
    }
  }, [dispatch]);

  const canProceed = detectedItems.length > 0;

  return (
    <div className="listam-root">
      <div className="listam-shell">
        {/* Header */}
        <header className="listam-header">
          <div className="home-logo">🛒</div>
          <h1>Listam</h1>
          <button className="listam-back-btn" onClick={() => navigate('/listam/history')} title="Order History">
            <ClockCounterClockwise size={22} />
          </button>
        </header>

        {/* Content */}
        <div className="listam-content home-content">
          <p className="home-greeting">
            Hi Amaka 👋 What do you need today?
          </p>

          {/* Chat Input */}
          <div className="chat-input-wrapper">
            <textarea
              ref={textareaRef}
              className="market-chat-input"
              placeholder="Type your market list… e.g. 4 tubers of yam, tomatoes, beef and onions"
              value={state.inputText}
              onChange={handleInput}
              rows={3}
            />
          </div>

          {/* Dynamic Stall */}
          {detectedItems.length > 0 && (
            <div className="stall-section">
              <p className="stall-label">Your Market Stall</p>
              <div className="stall-grid">
                <AnimatePresence>
                  {detectedItems.map(item => (
                    <motion.div
                      key={item.id}
                      className="stall-item-card"
                      variants={stallItemVariants}
                      initial="initial"
                      animate="animate"
                      exit="exit"
                      layout
                    >
                      <span className="stall-item-emoji">{item.emoji}</span>
                      <span className="stall-item-name">{item.name}</span>
                      <span className="stall-item-qty">{item.qty} {item.unit}</span>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </div>
          )}

          {detectedItems.length === 0 && state.inputText.length > 0 && (
            <motion.p
              className="stall-hint"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              Keep typing... I'll pick up what you need 🧺
            </motion.p>
          )}
        </div>

        {/* Action bar */}
        <div className="listam-action-bar">
          <button
            className="btn-primary"
            disabled={!canProceed}
            onClick={() => navigate('/listam/confirm')}
          >
            <ShoppingCart size={18} weight="bold" style={{ marginRight: 8, verticalAlign: 'middle' }} />
            Review My List ({detectedItems.length} {detectedItems.length === 1 ? 'item' : 'items'})
          </button>
        </div>
      </div>
    </div>
  );
}
