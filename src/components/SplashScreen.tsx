import React from 'react';
import { motion } from 'framer-motion';

export const SplashScreen: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
      className="fixed inset-0 z-[9999] bg-black flex items-center justify-center overflow-hidden"
    >
      <div className="splash-main w-64 h-64 scale-75 sm:scale-100">
        <div className="loaders absolute inset-0">
          <div className="loader"></div>
          <div className="loader"></div>
          <div className="loader"></div>
          <div className="loader"></div>
          <div className="loader"></div>
          <div className="loader"></div>
          <div className="loader"></div>
          <div className="loader"></div>
          <div className="loader"></div>
        </div>
        <div className="loadersB absolute inset-0">
          <div className="loaderA"><div className="ball0"></div></div>
          <div className="loaderA"><div className="ball1"></div></div>
          <div className="loaderA"><div className="ball2"></div></div>
          <div className="loaderA"><div className="ball3"></div></div>
          <div className="loaderA"><div className="ball4"></div></div>
          <div className="loaderA"><div className="ball5"></div></div>
          <div className="loaderA"><div className="ball6"></div></div>
          <div className="loaderA"><div className="ball7"></div></div>
          <div className="loaderA"><div className="ball8"></div></div>
        </div>
      </div>
    </motion.div>
  );
};
