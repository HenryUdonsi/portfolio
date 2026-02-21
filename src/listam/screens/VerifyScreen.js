import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, UploadSimple, CheckCircle, XCircle } from '@phosphor-icons/react';
import { useOrder } from '../context/OrderContext';
import '../styles/listam.css';
import './VerifyScreen.css';

export default function VerifyScreen() {
  const { state, dispatch } = useOrder();
  const navigate = useNavigate();
  const [showSheet, setShowSheet] = useState(false);
  const [wasHidden, setWasHidden] = useState(false);
  const [previewUrl, setPreviewUrl] = useState(null);

  // Page Visibility API — simulate "app background → foreground"
  useEffect(() => {
    const handleVisibility = () => {
      if (document.visibilityState === 'hidden') {
        setWasHidden(true);
      } else if (document.visibilityState === 'visible' && wasHidden) {
        setShowSheet(true);
        setWasHidden(false);
      }
    };
    document.addEventListener('visibilitychange', handleVisibility);
    return () => document.removeEventListener('visibilitychange', handleVisibility);
  }, [wasHidden]);

  const handleUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      dispatch({ type: 'SET_SCREENSHOT', payload: file });
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleConfirm = (confirmed) => {
    dispatch({ type: 'SET_TRANSFER_CONFIRMED', payload: confirmed });
    setShowSheet(false);
    if (confirmed) navigate('/listam/success');
  };

  return (
    <div className="listam-root">
      <div className="listam-shell">
        <header className="listam-header">
          <button className="listam-back-btn" onClick={() => navigate('/listam/checkout')}>
            <ArrowLeft size={22} />
          </button>
          <h1>Verify Payment</h1>
        </header>

        <div className="listam-content verify-content">
          <div className="verify-icon">⏳</div>
          <h2 className="verify-title">Waiting for your transfer</h2>
          <p className="verify-body">
            Head to your banking app and send the exact amount. Come back here once you're done.
          </p>

          <div className="verify-hint-box">
            <p>💡 Switch to your banking app, make the transfer, then come back — we'll ask if it went through.</p>
          </div>

          {/* Manual trigger for demo */}
          <button className="verify-manual-btn" onClick={() => setShowSheet(true)}>
            I'm back — check my payment
          </button>

          {/* Screenshot upload */}
          <div className="screenshot-section">
            <p className="screenshot-label">Upload transfer receipt (optional)</p>
            <label className="screenshot-upload-btn">
              <UploadSimple size={18} />
              <span>{state.screenshotFile ? 'Change screenshot' : 'Upload screenshot'}</span>
              <input type="file" accept="image/*" onChange={handleUpload} hidden />
            </label>
            {previewUrl && (
              <img src={previewUrl} alt="Receipt preview" className="screenshot-preview" />
            )}
          </div>
        </div>

        {/* Welcome Back Bottom Sheet */}
        <AnimatePresence>
          {showSheet && (
            <>
              <motion.div
                className="sheet-overlay"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setShowSheet(false)}
              />
              <motion.div
                className="bottom-sheet"
                initial={{ y: '100%' }}
                animate={{ y: 0, transition: { type: 'spring', stiffness: 200, damping: 25 } }}
                exit={{ y: '100%', transition: { duration: 0.2 } }}
              >
                <div className="sheet-handle" />
                <h3 className="sheet-title">Welcome back, Amaka 👋</h3>
                <p className="sheet-body">Did the transfer go through?</p>
                <div className="sheet-actions">
                  <button className="sheet-btn sheet-btn--yes" onClick={() => handleConfirm(true)}>
                    <CheckCircle size={20} weight="bold" /> Yes, it went through
                  </button>
                  <button className="sheet-btn sheet-btn--no" onClick={() => handleConfirm(false)}>
                    <XCircle size={20} weight="bold" /> No, not yet
                  </button>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
