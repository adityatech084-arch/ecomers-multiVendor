import React from 'react';
import { motion } from 'framer-motion';

const PreLoader = () => {
  const brandName = "ECOMART";

  // Animation variants for the letters
  const childVariant = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 },
  };

  const containerVariant = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.3 },
    },
  };

  return (
    // Changed to a very light, clean background
    <div className="fixed z-50 top-0 flex min-h-screen w-full flex-col items-center justify-center overflow-hidden bg-[#f9fafb] font-display">
      
      {/* Soft Purple Ambient Glows - adjusted for Light Mode */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-purple-200/40 rounded-full blur-[100px]" />
        <div className="absolute top-[10%] right-[10%] w-[300px] h-[300px] bg-blue-100/30 rounded-full blur-[80px]" />
      </div>

      <div className="relative z-10 flex flex-col items-center px-6">
        
        {/* Scaled Down Logo & Loader */}
        <div className="relative flex items-center justify-center w-32 h-32 md:w-40 md:h-40 mb-6">
          
          {/* Smaller "E" Logo */}
          <div className="absolute inset-0 flex items-center justify-center">
            <svg 
              viewBox="0 0 100 100" 
              className="w-12 h-12 md:w-16 md:h-16"
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <motion.path 
                d="M80 25H35C29 25 25 29 25 35V65C25 71 29 75 35 75H80M25 50H65" 
                stroke="#7e22ce" // Deeper Purple for contrast on light bg
                strokeWidth="5" 
                strokeLinecap="round" 
                strokeLinejoin="round"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 1.5, ease: "easeInOut" }}
              />
            </svg>
          </div>

          {/* Infinite Spinning Ring */}
          <motion.svg 
            className="w-full h-full" 
            viewBox="0 0 100 100"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          >
            <circle 
              cx="50" cy="50" r="42" 
              fill="transparent" 
              stroke="#000" 
              strokeOpacity="0.05" // Very faint track
              strokeWidth="1.5" 
            />
            <motion.circle 
              cx="50" cy="50" r="42" 
              fill="transparent" 
              stroke="#a855f7" // Vibrant Purple
              strokeWidth="2" 
              strokeLinecap="round"
              strokeDasharray="50 150" 
            />
          </motion.svg>
        </div>

        {/* Staggered Text Animation */}
        <motion.div 
          className="flex flex-col items-center space-y-3"
          variants={containerVariant}
          initial="hidden"
          animate="visible"
        >
          <div className="flex">
            {brandName.split("").map((char, index) => (
              <motion.span
                key={index}
                variants={childVariant}
                // Text color changed to a deep charcoal/slate
                className="text-slate-900 text-lg md:text-xl font-semibold font-Poppins tracking-[0.5em] md:tracking-[0.8em]"
                style={{ marginLeft: index === 0 ? "0.8em" : "0" }}
              >
                {char}
              </motion.span>
            ))}
          </div>

          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 1 }}
            // Subtle secondary text
            className="text-slate-400 text-[10px] uppercase tracking-[0.3em] font-medium"
          >
            Setting up your shop
          </motion.p>
        </motion.div>
      </div>
    </div>
  );
};

export default PreLoader;