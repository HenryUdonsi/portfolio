import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Copy, Check, User } from '@phosphor-icons/react';
import { useOrder, calcExtraHands, calcItemsTotal } from '../context/OrderContext';
import { mockBankAccount } from '../data/mockData';
import '../styles/listam.css';
import './CheckoutScreen.css';

const HAND_OPTIONS = [
  { count: 1, label: '1 Hand', sublabel: 'Standard' },
  { count: 2, label: '2 Hands', sublabel: 'Faster' },
  { count: 3, label: '3 Hands', sublabel: 'Express' },
];

export default function CheckoutScreen() {
  const { state, dispatch } = useOrder();
  const navigate = useNavigate();
  const [copied, setCopied] = useState(false);

  const { hands, baseTime, detectedItems } = state;
  const { eta, fee } = calcExtraHands(hands, baseTime);
  const itemsTotal = calcItemsTotal(detectedItems);
  const grandTotal = itemsTotal + fee;

  const handleCopy = () => {
    navigator.clipboard.writeText(mockBankAccount.accountNumber);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="listam-root">
      <div className="listam-shell">
        <header className="listam-header">
          <button className="listam-back-btn" onClick={() => navigate('/listam/confirm')}>
            <ArrowLeft size={22} />
          </button>
          <h1>Checkout</h1>
        </header>

        <div className="listam-content checkout-content">
          {/* Extra Hands */}
          <section className="checkout-section">
            <h2 className="checkout-section-title">Extra Hands</h2>
            <p className="checkout-section-sub">More hands = faster delivery.</p>
            <div className="hands-options">
              {HAND_OPTIONS.map(opt => {
                const { eta: optEta, fee: optFee } = calcExtraHands(opt.count, baseTime);
                const active = hands === opt.count;
                return (
                  <motion.button
                    key={opt.count}
                    className={`hands-card ${active ? 'hands-card--active' : ''}`}
                    onClick={() => dispatch({ type: 'SET_HANDS', payload: opt.count })}
                    whileTap={{ scale: 0.97 }}
                  >
                    <div className="hands-icons">
                      {Array.from({ length: opt.count }).map((_, i) => (
                        <User key={i} size={18} weight={active ? 'bold' : 'regular'} />
                      ))}
                    </div>
                    <span className="hands-label">{opt.label}</span>
                    <span className="hands-eta">~{optEta} min</span>
                    <span className="hands-fee">
                      {optFee === 0 ? 'Free' : `+₦${optFee.toLocaleString()}`}
                    </span>
                  </motion.button>
                );
              })}
            </div>
            <div className="eta-summary">
              Estimated arrival: <strong>~{eta} minutes</strong>
            </div>
          </section>

          {/* Bank Transfer */}
          <section className="checkout-section">
            <h2 className="checkout-section-title">Pay via Transfer</h2>
            <div className="bank-card">
              <div className="bank-card-row">
                <span className="bank-label">Bank</span>
                <span className="bank-value">{mockBankAccount.bankName}</span>
              </div>
              <div className="bank-card-row">
                <span className="bank-label">Account Name</span>
                <span className="bank-value">{mockBankAccount.accountName}</span>
              </div>
              <div className="bank-card-row bank-card-account">
                <span className="bank-label">Account Number</span>
                <div className="bank-acct-copy">
                  <span className="bank-acct-num">{mockBankAccount.accountNumber}</span>
                  <button className="copy-btn" onClick={handleCopy}>
                    {copied
                      ? <Check size={16} weight="bold" color="var(--color-success)" />
                      : <Copy size={16} weight="bold" />
                    }
                    <span>{copied ? 'Copied!' : 'Tap to Copy'}</span>
                  </button>
                </div>
              </div>
              <div className="bank-total-row">
                <span>Send exactly</span>
                <span className="bank-total-amount">₦{grandTotal.toLocaleString()}</span>
              </div>
            </div>
          </section>
        </div>

        <div className="listam-action-bar">
          <button className="btn-primary" onClick={() => navigate('/listam/verify')}>
            I've Sent the Money
          </button>
        </div>
      </div>
    </div>
  );
}
