import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const SplashScreen = ({ onComplete }: { onComplete: () => void }) => {
  const [fading, setFading] = React.useState(false);

  React.useEffect(() => {
    // Show logo for 0.8s, then start fade-out
    const fadeTimer = setTimeout(() => {
      setFading(true);
    }, 800);

    // After fade-out animation (0.4s), remove splash
    const removeTimer = setTimeout(() => {
      onComplete();
    }, 1200);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(removeTimer);
    };
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: fading ? 0 : 1 }}
      transition={{ duration: 0.4, ease: 'easeInOut' }}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 999999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#000000',
      }}
    >
      <motion.img
        src="/splash-logo.png"
        alt="Delectra"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
        style={{
          maxWidth: '280px',
          width: '60vw',
          height: 'auto',
        }}
      />
    </motion.div>
  );
};

export default SplashScreen;
