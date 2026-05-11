// Hero.jsx
import React, { useEffect, useState, useCallback } from 'react';
import { motion, useMotionValue, useSpring, useTransform, animate, AnimatePresence } from 'framer-motion';
import HeroBGimg from '../assets/HeroBGimg.jpg';
import HeroCloud from '../assets/HeroCloud.avif';
import MenuOverlay from './MenuOverlay';
import MenuButton from './MenuButton';

// ============ TEXT ANIMATION COMPONENTS ============

const AnimatedCharacter = ({ char, index, totalDelay = 0, variant = 'default' }) => {
  const variants = {
    default: {
      hidden: { 
        opacity: 0, 
        y: 100,
        rotateX: -90,
        filter: 'blur(10px)',
      },
      visible: { 
        opacity: 1, 
        y: 0,
        rotateX: 0,
        filter: 'blur(0px)',
      }
    },
    fade: {
      hidden: { 
        opacity: 0,
        x: -20,
      },
      visible: { 
        opacity: 1,
        x: 0,
      }
    },
  };

  return (
    <motion.span
      className="inline-block"
      style={{ 
        display: 'inline-block',
        whiteSpace: char === ' ' ? 'pre' : 'normal',
        transformStyle: 'preserve-3d',
      }}
      variants={variants[variant]}
      initial="hidden"
      animate="visible"
      transition={{
        duration: 0.6,
        delay: totalDelay + index * 0.05,
        ease: [0.215, 0.61, 0.355, 1],
      }}
    >
      {char === ' ' ? '\u00A0' : char}
    </motion.span>
  );
};

const SplitText = ({ text, className, delay = 0, variant = 'default' }) => {
  return (
    <span className={className} style={{ perspective: '1000px' }}>
      {text.split('').map((char, index) => (
        <AnimatedCharacter 
          key={index} 
          char={char} 
          index={index} 
          totalDelay={delay}
          variant={variant}
        />
      ))}
    </span>
  );
};

const AnimatedUnderline = ({ isVisible, delay = 0 }) => (
  <motion.div
    className="h-[2px] bg-gradient-to-r from-transparent via-gray-900 to-transparent mx-auto mt-4"
    initial={{ width: 0, opacity: 0 }}
    animate={{ 
      width: isVisible ? 150 : 0, 
      opacity: isVisible ? 1 : 0 
    }}
    transition={{ duration: 0.8, delay, ease: "easeOut" }}
  />
);

const FloatingParticle = ({ delay, x, y, size = 4 }) => (
  <motion.div
    className="absolute rounded-full bg-gray-300/40"
    style={{ left: x, top: y, width: size, height: size }}
    animate={{
      y: [0, -30, 0],
      opacity: [0.2, 0.6, 0.2],
      scale: [1, 1.3, 1],
    }}
    transition={{
      duration: 4,
      delay,
      repeat: Infinity,
      ease: "easeInOut",
    }}
  />
);

// ============ MAIN HERO COMPONENT ============

const Hero = () => {
  const [phase, setPhase] = useState(0);
  const [showName, setShowName] = useState(false);
  const [showSubtitle, setShowSubtitle] = useState(false);
  const [nameComplete, setNameComplete] = useState(false);
  const [subtitleComplete, setSubtitleComplete] = useState(false);
  const [showOverlayName, setShowOverlayName] = useState(false);
  
  // Menu state
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Mouse position for parallax
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothMouseX = useSpring(mouseX, { stiffness: 50, damping: 20 });
  const smoothMouseY = useSpring(mouseY, { stiffness: 50, damping: 20 });

  // Parallax transforms
  const mountainX = useTransform(smoothMouseX, [-1, 1], [-30, 30]);
  const mountainY = useTransform(smoothMouseY, [-1, 1], [-20, 20]);
  const cloudX = useTransform(smoothMouseX, [-1, 1], [-60, 60]);
  const cloudY = useTransform(smoothMouseY, [-1, 1], [-40, 40]);

  // Animation values
  const imageY = useMotionValue(400);
  const imageWidth = useMotionValue(500);
  const imageHeight = useMotionValue(250);
  const imageBorderRadius = useMotionValue(150);
  const imageOpacity = useMotionValue(0);

  // Text content
  const name = "PATEL JAY";
  const subtitle = "Web-Developer";
  const overlayName = "PATEL JAY";

  // Main animation sequence
  useEffect(() => {
    const runSequence = async () => {
      await new Promise(resolve => setTimeout(resolve, 300));
      
      setPhase(1);
      setShowName(true);
      
      await new Promise(resolve => setTimeout(resolve, name.length * 50 + 800));
      setNameComplete(true);
      
      await new Promise(resolve => setTimeout(resolve, 200));
      setShowSubtitle(true);
      
      await new Promise(resolve => setTimeout(resolve, subtitle.length * 50 + 800));
      setSubtitleComplete(true);
      
      await new Promise(resolve => setTimeout(resolve, 600));
      
      setPhase(2);
      imageOpacity.set(1);
      await animate(imageY, 0, { duration: 1.2, ease: [0.25, 0.1, 0.25, 1] });
      await new Promise(resolve => setTimeout(resolve, 400));
      
      setPhase(3);
      await new Promise(resolve => setTimeout(resolve, 600));
      
      setPhase(4);
      const expandDuration = 1.4;
      animate(imageWidth, window.innerWidth - 32, { duration: expandDuration, ease: [0.33, 1, 0.68, 1] });
      animate(imageHeight, window.innerHeight - 32, { duration: expandDuration, ease: [0.33, 1, 0.68, 1] });
      animate(imageBorderRadius, 24, { duration: expandDuration, ease: [0.33, 1, 0.68, 1] });
      await new Promise(resolve => setTimeout(resolve, expandDuration * 1000 + 200));
      
      setPhase(5);
      setShowOverlayName(true);
      await new Promise(resolve => setTimeout(resolve, overlayName.length * 60 + 800));
      
      setPhase(6);
    };

    runSequence();
  }, []);

  // Mouse move handler
  const handleMouseMove = useCallback((e) => {
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    mouseX.set((clientX / innerWidth - 0.5) * 2);
    mouseY.set((clientY / innerHeight - 0.5) * 2);
  }, [mouseX, mouseY]);

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [handleMouseMove]);

  // Particle positions
  const particles = [
    { x: '10%', y: '20%', delay: 0, size: 6 },
    { x: '20%', y: '60%', delay: 0.5, size: 4 },
    { x: '80%', y: '30%', delay: 1, size: 5 },
    { x: '90%', y: '70%', delay: 1.5, size: 4 },
    { x: '50%', y: '15%', delay: 2, size: 3 },
    { x: '70%', y: '80%', delay: 0.8, size: 5 },
  ];

  return (
    <>
      {/* Menu Overlay */}
      <MenuOverlay isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
      
      <div className="relative h-screen w-full overflow-hidden bg-white">
        {/* Animated Background Gradient */}
        <motion.div 
          className="absolute inset-0"
          animate={{
            background: [
              'radial-gradient(circle at 30% 30%, rgba(99, 102, 241, 0.08) 0%, transparent 50%)',
              'radial-gradient(circle at 70% 70%, rgba(99, 102, 241, 0.08) 0%, transparent 50%)',
              'radial-gradient(circle at 30% 30%, rgba(99, 102, 241, 0.08) 0%, transparent 50%)',
            ]
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
        />

        {/* Floating Particles */}
        <AnimatePresence>
          {phase >= 1 && phase < 4 && particles.map((particle, i) => (
            <FloatingParticle key={i} {...particle} />
          ))}
        </AnimatePresence>

        {/* Corner Decorations */}
        {/* ... (keep the same corner decorations code) ... */}

        {/* Horizontal Lines */}
        <motion.div 
          className="absolute left-0 top-1/2 h-[1px] bg-gradient-to-r from-gray-300 to-transparent"
          initial={{ width: 0 }}
          animate={{ 
            width: phase >= 2 && phase < 5 ? '28%' : 0,
            opacity: phase >= 2 && phase < 5 ? 1 : 0
          }}
          transition={{ duration: 1, ease: "easeOut" }}
        />
        <motion.div 
          className="absolute right-0 top-1/2 h-[1px] bg-gradient-to-l from-gray-300 to-transparent"
          initial={{ width: 0 }}
          animate={{ 
            width: phase >= 2 && phase < 5 ? '28%' : 0,
            opacity: phase >= 2 && phase < 5 ? 1 : 0
          }}
          transition={{ duration: 1, ease: "easeOut" }}
        />

        {/* Center Text (Phase 1-3) */}
        <motion.div 
          className="absolute inset-0 flex flex-col items-center justify-center z-20 pointer-events-none"
          animate={{ 
            opacity: phase >= 4 ? 0 : 1,
            scale: phase >= 4 ? 0.85 : 1,
            filter: phase >= 4 ? 'blur(20px)' : 'blur(0px)',
            y: phase >= 3 ? -50 : 0,
          }}
          transition={{ duration: 0.8, ease: [0.33, 1, 0.68, 1] }}
        >
          <motion.h1 
            className="text-5xl md:text-7xl lg:text-8xl font-black text-gray-900 mb-4 tracking-tight"
            style={{ perspective: '1000px' }}
          >
            {showName && (
              <SplitText 
                text={name} 
                variant="default"
                delay={0}
              />
            )}
          </motion.h1>

          <motion.div className="overflow-hidden">
            {showSubtitle && (
              <motion.p className="text-xl md:text-2xl lg:text-3xl text-gray-500 font-light tracking-widest uppercase">
                <SplitText 
                  text={subtitle} 
                  variant="fade"
                  delay={0}
                />
              </motion.p>
            )}
          </motion.div>

          <AnimatedUnderline isVisible={subtitleComplete && phase < 4} delay={0.2} />
        </motion.div>

        {/* Main Image Container */}
        <motion.div 
          className="absolute left-1/2 overflow-hidden"
          style={{
            width: imageWidth,
            height: imageHeight,
            borderRadius: imageBorderRadius,
            opacity: imageOpacity,
            x: '-50%',
            y: imageY,
            top: '50%',
            translateY: '-50%',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
          }}
        >
          {/* Mountain Background */}
          <motion.div 
            className="absolute inset-[-10%] w-[120%] h-[120%]"
            style={{ x: mountainX, y: mountainY }}
          >
            <img src={HeroBGimg} alt="Mountains" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/20" />
          </motion.div>

          {/* Cloud Layer */}
          <motion.div 
            className="absolute inset-[-20%] w-[140%] h-[140%] pointer-events-none"
            style={{ x: cloudX, y: cloudY }}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: phase >= 6 ? 1 : 0, scale: phase >= 6 ? 1 : 1.1 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
          >
            <img src={HeroCloud} alt="Clouds" className="w-full h-full object-cover object-bottom" />
          </motion.div>

          {/* Overlay Content */}
          <motion.div 
            className="absolute inset-0 flex flex-col justify-between p-6 md:p-10 lg:p-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: phase >= 5 ? 1 : 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Top Section */}
            <div className="flex justify-between items-start">
              <motion.h2 
                className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-black text-white"
                style={{ textShadow: '0 4px 30px rgba(0,0,0,0.4)', perspective: '1000px' }}
              >
                {showOverlayName && (
                  <SplitText text={overlayName} variant="default" delay={0} />
                )}
              </motion.h2>
              
              <motion.button 
                className="relative bg-gray-900 text-white px-6 py-3 md:px-8 md:py-4 rounded-full text-sm md:text-base font-medium shadow-2xl overflow-hidden group"
                initial={{ y: -50, opacity: 0, scale: 0.8 }}
                animate={phase >= 5 ? { y: 0, opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.8, delay: 0.6, type: "spring", stiffness: 100 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full"
                  whileHover={{ translateX: '200%' }}
                  transition={{ duration: 0.6 }}
                />
                
                </motion.button>
            </div>

            {/* Bottom Section */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-6">
              {/* Left Tagline */}
              <motion.div className="max-w-xs">
                {['Building digital', 'experiences that', 'just make sense.'].map((line, i) => (
                  <motion.p 
                    key={i}
                    className="text-lg md:text-xl lg:text-2xl font-bold text-white leading-tight"
                    style={{ textShadow: '0 2px 20px rgba(0,0,0,0.5)' }}
                    initial={{ opacity: 0, x: -50, filter: 'blur(10px)' }}
                    animate={phase >= 5 ? { opacity: 1, x: 0, filter: 'blur(0px)' } : {}}
                    transition={{ duration: 0.6, delay: 0.3 + i * 0.1, ease: [0.33, 1, 0.68, 1] }}
                  >
                    {line}
                  </motion.p>
                ))}
              </motion.div>

              {/* Menu Button */}
              <MenuButton
                isOpen={isMenuOpen}
                onClick={() => setIsMenuOpen(true)}
                phase={phase}
              />

              {/* Right Description */}
              <motion.div className="max-w-xs text-left sm:text-right">
                {['Web-Developer obsessed','with creating experiences', 'so smooth they feel illegal'].map((line, i) => (
                  <motion.p 
                    key={i}
                    className="text-sm md:text-base font-bold text-white/90"
                    style={{ textShadow: '0 2px 15px rgba(0,0,0,0.5)' }}
                    initial={{ opacity: 0, x: 50, filter: 'blur(10px)' }}
                    animate={phase >= 5 ? { opacity: 1, x: 0, filter: 'blur(0px)' } : {}}
                    transition={{ duration: 0.6, delay: 0.4 + i * 0.1, ease: [0.33, 1, 0.68, 1] }}
                  >
                    {line}
                  </motion.p>
                ))}
              </motion.div>
            </div>
          </motion.div>
        </motion.div>

      
      </div>
    </>
  );
};

export default Hero;