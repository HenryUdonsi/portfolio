import { motion } from 'framer-motion';

const variants = {
  initial: { opacity: 0, y: 14 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring', stiffness: 320, damping: 28, mass: 0.75 },
  },
  exit: {
    opacity: 0,
    y: -8,
    transition: { duration: 0.14, ease: 'easeIn' },
  },
};

export default function PageWrapper({ children }) {
  return (
    <motion.div
      variants={variants}
      initial="initial"
      animate="animate"
      exit="exit"
      style={{ width: '100%' }}
    >
      {children}
    </motion.div>
  );
}
