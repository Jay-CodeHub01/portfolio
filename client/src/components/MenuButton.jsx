// MenuButtonPremium.jsx
import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

const MenuButtonPremium = ({ isOpen, onClick, phase }) => {
  const buttonRef = useRef(null);
  
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const x = useSpring(mouseX, { stiffness: 150, damping: 15 });
  const y = useSpring(mouseY, { stiffness: 150, damping: 15 });

  const handleMouseMove = (e) => {
    if (!buttonRef.current) return;
    const rect = buttonRef.current.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left - rect.width / 2) * 0.1);
    mouseY.set((e.clientY - rect.top - rect.height / 2) * 0.1);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <motion.button
      ref={buttonRef}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative group"
      style={{ x, y }}
      initial={{ y: 40, opacity: 0 }}
      animate={phase >= 6 ? { y: 0, opacity: 1 } : {}}
      transition={{ duration: 0.6, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
      whileTap={{ scale: 0.97 }}
    >
      {/* Animated Border Gradient */}
      <div className="absolute -inset-[1px] rounded-full overflow-hidden">
        <motion.div
          className="absolute inset-0"
          style={{
            background: 'conic-gradient(from 0deg, transparent, rgba(255,255,255,0.5), transparent, rgba(255,255,255,0.3), transparent)',
          }}
          animate={{ rotate: 360 }}
          transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
        />
      </div>

      {/* Glow Effect */}
      <div className="absolute -inset-3 rounded-full bg-white/5 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      {/* Main Glass Container */}
      <div 
        className="relative flex items-center gap-4 px-6 py-3.5 rounded-full transition-all duration-500"
        style={{
          background: 'linear-gradient(180deg, rgba(60,60,60,0.9) 0%, rgba(40,40,40,0.95) 100%)',
          backdropFilter: 'blur(40px)',
          WebkitBackdropFilter: 'blur(40px)',
          boxShadow: `
            0 10px 40px rgba(0,0,0,0.5),
            0 2px 8px rgba(0,0,0,0.3),
            inset 0 1px 0 rgba(255,255,255,0.1),
            inset 0 -1px 0 rgba(0,0,0,0.2)
          `,
        }}
      >
        {/* Top Highlight */}
        <div 
          className="absolute top-0 left-6 right-6 h-[0.5px]"
          style={{
            background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)',
          }}
        />

        {/* Hover Overlay */}
        <div 
          className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{
            background: 'linear-gradient(180deg, rgba(80,80,80,0.3) 0%, transparent 100%)',
          }}
        />

        {/* Text */}
        <motion.span 
          className="relative text-white/90 text-sm font-medium tracking-wider uppercase group-hover:text-white transition-colors duration-300"
          initial={{ opacity: 0 }}
          animate={phase >= 6 ? { opacity: 1 } : {}}
          transition={{ delay: 0.5 }}
        >
          Menu
        </motion.span>

        {/* Divider */}
        <div className="w-[1px] h-4 bg-gradient-to-b from-transparent via-white/15 to-transparent" />

        {/* Grid Icon */}
        <div className="relative w-5 h-5 grid grid-cols-2 gap-[3px]">
          {[0, 1, 2, 3].map((i) => (
            <motion.div
              key={i}
              className="relative"
              initial={{ scale: 0 }}
              animate={phase >= 6 ? { scale: 1 } : {}}
              transition={{ delay: 0.6 + i * 0.08, type: "spring", stiffness: 400 }}
            >
              {/* Dot Glow on Hover */}
              <div 
                className="absolute inset-0 rounded-full bg-white/50 blur-[3px] scale-0 group-hover:scale-100 transition-transform duration-300"
                style={{ transitionDelay: `${i * 30}ms` }}
              />
              {/* Dot */}
              <div 
                className="relative w-full h-full rounded-full bg-white/70 group-hover:bg-white transition-all duration-300"
                style={{ transitionDelay: `${i * 30}ms` }}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </motion.button>
  );
};

export default MenuButtonPremium;