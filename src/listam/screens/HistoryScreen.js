import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowCounterClockwise } from '@phosphor-icons/react';
import { useOrder } from '../context/OrderContext';
import { mockOrderHistory } from '../data/mockData';
import PageWrapper from '../components/PageWrapper';
import '../styles/listam.css';
import './HistoryScreen.css';

const TAP_BTN = { type: 'spring', stiffness: 400, damping: 20 };

export default function HistoryScreen() {
  const { dispatch } = useOrder();
  const navigate = useNavigate();

  const handleReorder = (order) => {
    dispatch({
      type: 'REORDER',
      payload: { inputText: order.inputText, items: order.items },
    });
    navigate('/listam');
  };

  const formatDate = (dateStr) => {
    return new Date(dateStr).toLocaleDateString('en-NG', {
      day: 'numeric', month: 'short', year: 'numeric',
    });
  };

  return (
    <PageWrapper>
    <div className="listam-root">
      <div className="listam-shell">
        <header className="listam-header">
          <motion.button
            className="listam-back-btn"
            onClick={() => navigate('/listam')}
            whileHover={{ scale: 1.12 }}
            whileTap={{ scale: 0.88 }}
            transition={TAP_BTN}
          >
            <ArrowLeft size={22} />
          </motion.button>
          <h1>Order History</h1>
        </header>

        <div className="listam-content">
          {mockOrderHistory.length === 0 ? (
            <p className="history-empty">No orders yet. Go shop! 🛒</p>
          ) : (
            <div className="history-list">
              {mockOrderHistory.map((order, i) => (
                <motion.div
                  key={order.id}
                  className="history-card"
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.07, type: 'spring', stiffness: 260, damping: 22 }}
                  whileHover={{ y: -2, boxShadow: '0 6px 20px rgba(26,26,26,0.13)' }}
                >
                  <div className="history-card-header">
                    <div>
                      <span className="history-date">{formatDate(order.date)}</span>
                      <span className="history-order-id">{order.id}</span>
                    </div>
                    <span className="history-status">
                      {order.status === 'delivered' ? '✅ Delivered' : '⏳ Pending'}
                    </span>
                  </div>

                  <div className="history-items-preview">
                    {order.items.slice(0, 4).map(item => (
                      <span key={item.id} className="history-item-emoji" title={item.name}>
                        {item.emoji}
                      </span>
                    ))}
                    {order.items.length > 4 && (
                      <span className="history-item-more">+{order.items.length - 4}</span>
                    )}
                  </div>

                  <div className="history-card-footer">
                    <div className="history-totals">
                      <span className="history-total">₦{order.totalFee.toLocaleString()}</span>
                      {order.errandFee > 0 && (
                        <span className="history-errand-fee">
                          incl. ₦{order.errandFee.toLocaleString()} errand fee
                        </span>
                      )}
                    </div>
                    <motion.button
                      className="reorder-btn"
                      onClick={() => handleReorder(order)}
                      whileHover={{ scale: 1.04 }}
                      whileTap={{ scale: 0.94 }}
                      transition={TAP_BTN}
                    >
                      <ArrowCounterClockwise size={15} weight="bold" />
                      Reorder
                    </motion.button>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
    </PageWrapper>
  );
}
