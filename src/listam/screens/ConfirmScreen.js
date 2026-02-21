import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Minus, Plus, Trash } from '@phosphor-icons/react';
import { useOrder, calcItemsTotal } from '../context/OrderContext';
import '../styles/listam.css';
import './ConfirmScreen.css';

export default function ConfirmScreen() {
  const { state, dispatch } = useOrder();
  const navigate = useNavigate();
  const { detectedItems } = state;
  const total = calcItemsTotal(detectedItems);

  const updateQty = (id, delta) => {
    const item = detectedItems.find(i => i.id === id);
    if (!item) return;
    const newQty = item.qty + delta;
    if (newQty <= 0) {
      dispatch({ type: 'REMOVE_ITEM', payload: id });
    } else {
      dispatch({ type: 'UPDATE_QTY', payload: { id, qty: newQty } });
    }
  };

  return (
    <div className="listam-root">
      <div className="listam-shell">
        <header className="listam-header">
          <button className="listam-back-btn" onClick={() => navigate('/listam')}>
            <ArrowLeft size={22} />
          </button>
          <h1>Review List</h1>
        </header>

        <div className="listam-content">
          <p className="confirm-subtitle">Check quantities and remove anything you don't need.</p>

          <div className="structured-list">
            {detectedItems.map((item, i) => (
              <motion.div
                key={item.id}
                className="list-card"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05, type: 'spring', stiffness: 200, damping: 20 }}
                layout
              >
                <span className="list-card-emoji">{item.emoji}</span>
                <div className="list-card-info">
                  <span className="list-card-name">{item.name}</span>
                  <span className="list-card-price">
                    ₦{(item.qty * item.pricePerUnit).toLocaleString()}
                  </span>
                </div>
                <div className="qty-stepper">
                  <button className="qty-btn" onClick={() => updateQty(item.id, -1)}>
                    {item.qty === 1
                      ? <Trash size={16} weight="bold" />
                      : <Minus size={16} weight="bold" />
                    }
                  </button>
                  <span className="qty-value">{item.qty}</span>
                  <button className="qty-btn" onClick={() => updateQty(item.id, 1)}>
                    <Plus size={16} weight="bold" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>

          {detectedItems.length === 0 && (
            <div className="confirm-empty">
              <p>Your list is empty.</p>
              <button className="btn-ghost" onClick={() => navigate('/listam')}>
                Go back and add items
              </button>
            </div>
          )}
        </div>

        {detectedItems.length > 0 && (
          <div className="listam-action-bar">
            <div className="confirm-total-row">
              <span className="confirm-total-label">Estimated Total</span>
              <span className="confirm-total-value">₦{total.toLocaleString()}</span>
            </div>
            <button className="btn-primary" onClick={() => navigate('/listam/checkout')}>
              Proceed to Checkout
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
