// About.jsx
import React, { useRef, useState, useEffect } from 'react';
import { 
  motion, 
  useScroll, 
  useTransform, 
  useSpring, 
  useMotionValue, 
  useInView,
  AnimatePresence,
} from 'framer-motion';

import MyPhoto from '../assets/MyPhoto.jpeg';

const About = () => {
  return (
    <section id="about" className="relative bg-[#FAFAFA]">
      {/* Section 1: Magnetic Text Reveal */}
      <MagneticTextReveal />
      
      {/* Section 2: Split Screen Bio */}
      <SplitScreenBio />
      
      {/* Section 3: Classic Skills Section - NEW */}
      <ClassicSkillsSection />
      
      {/* Section 4: Creative Marquee */}
      <CreativeMarquee />
    </section>
  );
};

// ==================== MAGNETIC TEXT REVEAL ====================
const MagneticTextReveal = () => {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"]
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
  });

  const y1 = useTransform(smoothProgress, [0, 1], [0, -150]);
  const y2 = useTransform(smoothProgress, [0, 1], [0, -100]);
  const y3 = useTransform(smoothProgress, [0, 1], [0, -200]);
  const rotate1 = useTransform(smoothProgress, [0, 1], [0, -15]);
  const rotate2 = useTransform(smoothProgress, [0, 1], [0, 15]);
  const scale = useTransform(smoothProgress, [0, 0.5], [1, 0.9]);
  const opacity = useTransform(smoothProgress, [0.3, 0.6], [1, 0]);

  return (
    <div 
      ref={sectionRef}
      className="relative min-h-[200vh] bg-[#FAFAFA]"
    >
      <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
        {/* Animated Background Grid */}
        <motion.div 
          className="absolute inset-0"
          style={{ opacity }}
        >
          <svg className="w-full h-full opacity-[0.03]">
            <pattern id="grid-pattern" width="60" height="60" patternUnits="userSpaceOnUse">
              <path d="M 60 0 L 0 0 0 60" fill="none" stroke="#000" strokeWidth="1"/>
            </pattern>
            <rect width="100%" height="100%" fill="url(#grid-pattern)" />
          </svg>
        </motion.div>

        {/* Decorative Shapes */}
        <motion.div
          className="absolute top-20 left-20 w-32 h-32 rounded-full border-2 border-orange-300"
          style={{ y: y1, rotate: rotate1 }}
          animate={{ scale: [1, 1.2, 1], borderWidth: ['2px', '4px', '2px'] }}
          transition={{ duration: 4, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-32 right-32 w-24 h-24 rounded-2xl bg-gradient-to-br from-amber-200 to-orange-200"
          style={{ y: y2, rotate: rotate2 }}
          animate={{ rotate: [0, 90, 180, 270, 360] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="absolute top-40 right-40 w-16 h-16 rounded-full bg-gradient-to-br from-rose-200 to-pink-200"
          style={{ y: y3 }}
          animate={{ scale: [1, 1.3, 1], opacity: [0.7, 1, 0.7] }}
          transition={{ duration: 3, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-40 left-40 w-20 h-20 rotate-45 border-2 border-teal-300"
          style={{ y: y2, rotate: rotate1 }}
          animate={{ borderRadius: ['0%', '50%', '0%'] }}
          transition={{ duration: 5, repeat: Infinity }}
        />
        
        <motion.div
          className="absolute top-1/4 left-1/4 w-4 h-4 bg-orange-400 rounded-full"
          animate={{ y: [0, -30, 0], x: [0, 20, 0], scale: [1, 1.5, 1] }}
          transition={{ duration: 4, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-6 h-6 bg-amber-300 rounded-full"
          animate={{ y: [0, 40, 0], x: [0, -30, 0] }}
          transition={{ duration: 5, repeat: Infinity }}
        />

        {/* Scattered Letters Background */}
        <div className="absolute inset-0 overflow-hidden opacity-[0.03]">
          {['A', 'B', 'O', 'U', 'T', 'M', 'E'].map((letter, i) => (
            <motion.span
              key={i}
              className="absolute text-[20vw] font-black text-gray-900"
              style={{ left: `${10 + i * 12}%`, top: `${20 + (i % 3) * 25}%` }}
              animate={{ y: [0, -30, 0], rotate: [0, 5, -5, 0], scale: [1, 1.02, 1] }}
              transition={{ duration: 5 + i, repeat: Infinity, ease: "easeInOut" }}
            >
              {letter}
            </motion.span>
          ))}
        </div>

        {/* Main Content */}
        <motion.div 
          className="relative z-10 text-center px-6"
          style={{ scale, opacity }}
        >
          <motion.div
            className="flex items-center justify-center gap-3 mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <motion.span 
              className="h-px bg-gray-400"
              initial={{ width: 0 }}
              animate={{ width: 48 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            />
            <motion.span 
              className="text-sm font-medium tracking-[0.3em] text-gray-500 uppercase"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              Get to know
            </motion.span>
            <motion.span 
              className="h-px bg-gray-400"
              initial={{ width: 0 }}
              animate={{ width: 48 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            />
          </motion.div>

          <div className="overflow-hidden mb-8">
            <MagneticText text="About" className="text-[15vw] md:text-[12vw] font-black text-gray-900 leading-none" delay={0} />
          </div>
          <div className="overflow-hidden">
            <MagneticText text="Me" className="text-[15vw] md:text-[12vw] font-black text-transparent leading-none" style={{ WebkitTextStroke: '2px #1a1a1a' }} delay={0.1} />
          </div>

          <motion.div
            className="absolute -right-10 md:right-10 top-1/2 -translate-y-1/2"
            initial={{ opacity: 0, scale: 0, rotate: -20 }}
            animate={{ opacity: 1, scale: 1, rotate: 12 }}
            transition={{ delay: 0.5, type: "spring" }}
          >
            <motion.div 
              className="bg-white px-6 py-3 rounded-2xl shadow-xl border border-gray-100 relative"
              whileHover={{ scale: 1.1, rotate: 0 }}
            >
              <motion.div
                className="absolute inset-0 rounded-2xl border-2 border-orange-300"
                animate={{ scale: [1, 1.2, 1], opacity: [1, 0, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <p className="text-xs font-medium text-gray-600 mt-1">Developer</p>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

// ==================== MAGNETIC TEXT ====================
const MagneticText = ({ text, className, style, delay = 0 }) => {
  const letters = text.split("");
  const [hoveredIndex, setHoveredIndex] = useState(null);

  return (
    <motion.div 
      className={`flex justify-center ${className}`}
      style={style}
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      transition={{ delay, duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      {letters.map((letter, index) => (
        <motion.span
          key={index}
          className="inline-block cursor-default"
          onMouseEnter={() => setHoveredIndex(index)}
          onMouseLeave={() => setHoveredIndex(null)}
          animate={{
            y: hoveredIndex === index ? -20 : 0,
            scale: hoveredIndex === index ? 1.2 : 1,
            color: hoveredIndex === index ? '#f97316' : undefined,
            rotate: hoveredIndex === index ? [0, -5, 5, 0] : 0,
          }}
          transition={{ type: "spring", stiffness: 400, damping: 20 }}
        >
          {letter}
        </motion.span>
      ))}
    </motion.div>
  );
};

// ==================== SPLIT SCREEN BIO ====================
const SplitScreenBio = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.3 });
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const imageY = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const textY = useTransform(scrollYProgress, [0, 1], [50, -50]);
  const imageRotate = useTransform(scrollYProgress, [0, 1], [5, -5]);
  const parallaxBg = useTransform(scrollYProgress, [0, 1], [0, -50]);

  return (
    <div 
      ref={sectionRef}
      className="relative min-h-screen bg-white py-32 overflow-hidden"
    >
      <motion.div 
        className="absolute inset-0 opacity-[0.02]"
        style={{ y: parallaxBg }}
      >
        <svg className="w-full h-full">
          <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#000" strokeWidth="1"/>
          </pattern>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </motion.div>

      <motion.div
        className="absolute top-20 right-20 w-64 h-64 rounded-full bg-gradient-to-br from-orange-50 to-amber-50"
        style={{ y: useTransform(scrollYProgress, [0, 1], [0, -80]) }}
      />
      <motion.div
        className="absolute bottom-20 left-20 w-48 h-48 rounded-full bg-gradient-to-br from-rose-50 to-pink-50"
        style={{ y: useTransform(scrollYProgress, [0, 1], [0, 60]) }}
      />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          
          <motion.div 
            className="relative"
            style={{ y: imageY, rotate: imageRotate }}
          >
            <CreativePhotoFrame isInView={isInView} scrollYProgress={scrollYProgress} />
          </motion.div>

          <motion.div 
            className="relative"
            style={{ y: textY }}
          >
            <motion.div
              className="flex items-center gap-4 mb-8"
              initial={{ opacity: 0, x: -30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6 }}
            >
              <motion.span 
                className="text-6xl font-black text-gray-100"
                animate={isInView ? { scale: [0.8, 1.1, 1] } : {}}
                transition={{ delay: 0.2, duration: 0.5 }}
              >
                01
              </motion.span>
              <div>
                <motion.p 
                  className="text-sm font-medium text-orange-500 tracking-widest uppercase"
                  initial={{ opacity: 0, y: 10 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.3 }}
                >
                  Introduction
                </motion.p>
                <motion.h2 
                  className="text-3xl font-bold text-gray-900"
                  initial={{ opacity: 0, y: 10 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.4 }}
                >
                  Who I Am
                </motion.h2>
              </div>
            </motion.div>

            <div className="space-y-6">
              <TextRevealParagraph delay={0.2} isInView={isInView}>
                <span className="text-gray-600 text-lg leading-relaxed">
                  Hey there! I'm <span className="text-gray-900 font-semibold">Jay Patel</span>, 
                  a passionate <span className="text-orange-500 font-semibold">Full-Stack Developer</span> based 
                  in the vibrant state of Gujarat, India.
                </span>
              </TextRevealParagraph>

              <TextRevealParagraph delay={0.3} isInView={isInView}>
                <span className="text-gray-600 text-lg leading-relaxed">
                  I specialize in building <span className="text-gray-900 font-semibold">modern web applications</span> that 
                  are not just functional, but also <span className="text-gray-900 font-semibold">delightful to use</span>. 
                  From AI-powered solutions to real-time dashboards, I love tackling complex challenges.
                </span>
              </TextRevealParagraph>

              <TextRevealParagraph delay={0.4} isInView={isInView}>
                <span className="text-gray-500 text-lg leading-relaxed">
                  When I'm not coding, you'll find me exploring new technologies, 
                  contributing to open source, or sharing knowledge with the developer community.
                </span>
              </TextRevealParagraph>
            </div>

            <motion.div
              className="mt-10 flex flex-wrap gap-3"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.6, duration: 0.5 }}
            >
              {['🎯 Problem Solver', '🚀 Fast Learner', '🤝 Team Player', '💡 Creative Thinker'].map((fact, index) => (
                <motion.span
                  key={fact}
                  className="px-4 py-2 bg-gray-50 rounded-full text-sm font-medium text-gray-700 border border-gray-100"
                  whileHover={{ scale: 1.05, backgroundColor: '#fff7ed', borderColor: '#fed7aa', y: -3 }}
                  initial={{ opacity: 0, scale: 0.8, y: 20 }}
                  animate={isInView ? { opacity: 1, scale: 1, y: 0 } : {}}
                  transition={{ delay: 0.7 + index * 0.1, type: "spring" }}
                >
                  {fact}
                </motion.span>
              ))}
            </motion.div>

            <motion.div
              className="mt-10"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.9, duration: 0.5 }}
            >
              <MagneticButton />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

// ==================== CREATIVE PHOTO FRAME ====================
const CreativePhotoFrame = ({ isInView, scrollYProgress }) => {
  const [isHovered, setIsHovered] = useState(false);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useTransform(mouseY, [-0.5, 0.5], [10, -10]);
  const rotateY = useTransform(mouseX, [-0.5, 0.5], [-10, 10]);
  const bgRotate = useTransform(scrollYProgress, [0, 1], [-5, 5]);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
    setIsHovered(false);
  };

  return (
    <div 
      className="relative"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{ perspective: 1000 }}
    >
      <motion.div
        className="absolute -top-8 -left-8 w-full h-full rounded-3xl bg-gradient-to-br from-orange-100 to-amber-100"
        style={{ rotate: bgRotate }}
        initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
        animate={isInView ? { opacity: 1, scale: 1, rotate: 0 } : {}}
        transition={{ duration: 0.6 }}
      />
      <motion.div
        className="absolute -bottom-8 -right-8 w-full h-full rounded-3xl border-2 border-dashed border-gray-200"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={isInView ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 0.6, delay: 0.1 }}
      />

      <motion.div
        className="relative w-full aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl"
        style={{
          rotateX: isHovered ? rotateX : 0,
          rotateY: isHovered ? rotateY : 0,
          transformStyle: 'preserve-3d',
        }}
        initial={{ opacity: 0, y: 50 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <img src={MyPhoto} alt="Jay Patel" className="w-full h-full object-cover" />
        
        <motion.div
          className="absolute inset-0 bg-gradient-to-t from-gray-900/30 via-transparent to-transparent"
          animate={{ opacity: isHovered ? 0 : 1 }}
        />
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-white/30 via-transparent to-transparent"
          animate={{ opacity: isHovered ? 1 : 0 }}
        />
      </motion.div>

      <motion.div
        className="absolute -top-4 -right-4 bg-white px-4 py-3 rounded-2xl shadow-lg"
        initial={{ opacity: 0, scale: 0, rotate: -20 }}
        animate={isInView ? { opacity: 1, scale: 1, rotate: 0 } : {}}
        transition={{ delay: 0.6, type: "spring" }}
        whileHover={{ scale: 1.1, y: -5 }}
      >
        <span className="text-2xl">🇮🇳</span>
        <p className="text-xs font-medium text-gray-600">Gujarat</p>
      </motion.div>


      <motion.div
        className="absolute top-1/2 -right-16 -translate-y-1/2 hidden lg:block"
        initial={{ opacity: 0, x: -30 }}
        animate={isInView ? { opacity: 1, x: 0 } : {}}
        transition={{ delay: 0.8 }}
        whileHover={{ x: 5 }}
      >
        <div className="flex items-center gap-3 bg-gray-900 text-white px-5 py-3 rounded-full">
          <motion.div 
            className="w-2 h-2 bg-green-400 rounded-full"
            animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
          <span className="text-sm font-medium">Available for work</span>
        </div>
      </motion.div>
    </div>
  );
};

// ==================== TEXT REVEAL PARAGRAPH ====================
const TextRevealParagraph = ({ children, delay, isInView }) => {
  return (
    <motion.div
      className="overflow-hidden"
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay, duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      {children}
    </motion.div>
  );
};

// ==================== MAGNETIC BUTTON ====================
const MagneticButton = () => {
  const buttonRef = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    const rect = buttonRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    setPosition({ x: (e.clientX - centerX) * 0.2, y: (e.clientY - centerY) * 0.2 });
  };

  const handleMouseLeave = () => setPosition({ x: 0, y: 0 });

  return (
    <motion.a
      ref={buttonRef}
      href="#contact"
      className="group inline-flex items-center gap-3 px-8 py-4 bg-gray-900 text-white rounded-full font-medium relative overflow-hidden"
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 150, damping: 15 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileTap={{ scale: 0.95 }}
    >
      <motion.span
        className="absolute inset-0 bg-orange-500"
        initial={{ x: '-100%' }}
        whileHover={{ x: 0 }}
        transition={{ duration: 0.3 }}
      />
      <span className="relative z-10">Let's Connect</span>
      <motion.svg 
        className="relative z-10 w-5 h-5"
        fill="none" 
        stroke="currentColor" 
        viewBox="0 0 24 24"
        whileHover={{ x: 5 }}
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
      </motion.svg>
    </motion.a>
  );
};

// ==================== CLASSIC SKILLS SECTION - NEW ====================
const ClassicSkillsSection = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const [activeCategory, setActiveCategory] = useState('all');
  const [hoveredSkill, setHoveredSkill] = useState(null);

  const allSkills = [
    { name: 'React', icon: '⚛️', category: 'frontend', color: '#61DAFB' },
    { name: 'Next.js', icon: '▲', category: 'frontend', color: '#000000' },
    { name: 'TypeScript', icon: '📘', category: 'frontend', color: '#3178C6' },
    { name: 'TailwindCSS', icon: '🎨', category: 'frontend', color: '#06B6D4' },
    { name: 'Framer Motion', icon: '🎬', category: 'frontend', color: '#FF0055' },
    { name: 'Node.js', icon: '🟢', category: 'backend', color: '#339933' },
    { name: 'Python', icon: '🐍', category: 'backend', color: '#3776AB' },
    { name: 'Express', icon: '🚂', category: 'backend', color: '#000000' },
    { name: 'GraphQL', icon: '◈', category: 'backend', color: '#E10098' },
    { name: 'MongoDB', icon: '🍃', category: 'database', color: '#47A248' },
    { name: 'PostgreSQL', icon: '🐘', category: 'database', color: '#4169E1' },
    { name: 'Redis', icon: '🔴', category: 'database', color: '#DC382D' },
    { name: 'Firebase', icon: '🔥', category: 'database', color: '#FFCA28' },
    { name: 'Git', icon: '📦', category: 'tools', color: '#F05032' },
    { name: 'Docker', icon: '🐳', category: 'tools', color: '#2496ED' },
    { name: 'AWS', icon: '☁️', category: 'tools', color: '#FF9900' },
    { name: 'Figma', icon: '🎯', category: 'tools', color: '#F24E1E' },
    { name: 'Linux', icon: '🐧', category: 'tools', color: '#FCC624' },
  ];

  const categories = [
    { id: 'all', label: 'All Skills', icon: '✨' },
    { id: 'frontend', label: 'Frontend', icon: '🎨' },
    { id: 'backend', label: 'Backend', icon: '⚙️' },
    { id: 'database', label: 'Database', icon: '🗄️' },
    { id: 'tools', label: 'Tools', icon: '🛠️' },
  ];

  const filteredSkills = activeCategory === 'all' 
    ? allSkills 
    : allSkills.filter(skill => skill.category === activeCategory);

  const headerY = useTransform(scrollYProgress, [0, 0.3], [80, 0]);
  const headerOpacity = useTransform(scrollYProgress, [0, 0.2], [0, 1]);

  return (
    <div 
      ref={sectionRef}
      className="relative py-32 bg-[#FAFAFA] overflow-hidden"
    >
      {/* Decorative Background */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute top-20 left-10 w-96 h-96 rounded-full bg-gradient-to-br from-orange-50 to-transparent opacity-60"
          style={{ y: useTransform(scrollYProgress, [0, 1], [0, -100]) }}
        />
        <motion.div
          className="absolute bottom-20 right-10 w-80 h-80 rounded-full bg-gradient-to-br from-amber-50 to-transparent opacity-60"
          style={{ y: useTransform(scrollYProgress, [0, 1], [0, 80]) }}
        />
        
        {/* Floating Elements */}
        <motion.div
          className="absolute top-40 right-20 w-3 h-3 bg-orange-300 rounded-full"
          animate={{ y: [0, -20, 0], scale: [1, 1.2, 1] }}
          transition={{ duration: 4, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-40 left-20 w-4 h-4 bg-amber-300 rounded-full"
          animate={{ y: [0, 20, 0], scale: [1, 1.3, 1] }}
          transition={{ duration: 5, repeat: Infinity }}
        />
        <motion.div
          className="absolute top-60 left-1/4 w-2 h-2 bg-rose-300 rounded-full"
          animate={{ y: [0, -15, 0], x: [0, 10, 0] }}
          transition={{ duration: 3, repeat: Infinity }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          style={{ y: headerY, opacity: headerOpacity }}
        >
          <motion.div 
            className="flex items-center justify-center gap-4 mb-6"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <motion.span 
              className="text-7xl font-black text-gray-100"
              initial={{ scale: 0, rotate: -10 }}
              animate={isInView ? { scale: 1, rotate: 0 } : {}}
              transition={{ type: "spring", delay: 0.2 }}
            >
              02
            </motion.span>
            <div className="text-left">
              <motion.p 
                className="text-sm font-medium text-orange-500 tracking-widest uppercase"
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.3 }}
              >
                My Expertise
              </motion.p>
              <motion.h2 
                className="text-4xl md:text-5xl font-bold text-gray-900"
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.4 }}
              >
                Skills & Technologies
              </motion.h2>
            </div>
          </motion.div>
          
          <motion.p 
            className="text-gray-500 text-lg max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.5 }}
          >
            A curated collection of technologies I've mastered to build exceptional digital experiences
          </motion.p>
        </motion.div>

        {/* Category Tabs */}
        <motion.div
          className="flex flex-wrap justify-center gap-3 mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6 }}
        >
          {categories.map((category, index) => (
            <motion.button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`group relative px-6 py-3 rounded-full font-medium text-sm transition-all duration-300 ${
                activeCategory === category.id
                  ? 'bg-gray-900 text-white shadow-lg'
                  : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
              }`}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.7 + index * 0.1 }}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="mr-2">{category.icon}</span>
              {category.label}
              
              {activeCategory === category.id && (
                <motion.div
                  className="absolute inset-0 rounded-full bg-orange-500"
                  layoutId="activeTab"
                  initial={false}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  style={{ zIndex: -1 }}
                />
              )}
            </motion.button>
          ))}
        </motion.div>

        {/* Skills Grid */}
        <motion.div 
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4"
          layout
        >
          <AnimatePresence mode="popLayout">
            {filteredSkills.map((skill, index) => (
              <motion.div
                key={skill.name}
                layout
                initial={{ opacity: 0, scale: 0.8, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.8, y: -20 }}
                transition={{ 
                  duration: 0.4, 
                  delay: index * 0.05,
                  layout: { duration: 0.3 }
                }}
                onMouseEnter={() => setHoveredSkill(skill.name)}
                onMouseLeave={() => setHoveredSkill(null)}
                className="relative"
              >
                <motion.div
                  className="relative bg-white rounded-2xl p-6 text-center cursor-pointer border border-gray-100 overflow-hidden group"
                  whileHover={{ 
                    y: -8, 
                    boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
                    borderColor: skill.color,
                  }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Background Glow */}
                  <motion.div
                    className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-300"
                    style={{ backgroundColor: skill.color }}
                  />
                  
                  {/* Icon */}
                  <motion.div
                    className="text-4xl mb-3 relative z-10"
                    animate={{ 
                      scale: hoveredSkill === skill.name ? 1.2 : 1,
                      rotate: hoveredSkill === skill.name ? [0, -10, 10, 0] : 0,
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    {skill.icon}
                  </motion.div>
                  
                  {/* Name */}
                  <motion.p 
                    className="font-semibold text-gray-800 text-sm relative z-10"
                    animate={{
                      color: hoveredSkill === skill.name ? skill.color : '#1f2937',
                    }}
                  >
                    {skill.name}
                  </motion.p>
                  
                  {/* Category Badge */}
                  <motion.div
                    className="mt-2 inline-block px-2 py-1 rounded-full text-xs font-medium capitalize relative z-10"
                    style={{ 
                      backgroundColor: `${skill.color}15`,
                      color: skill.color,
                    }}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ 
                      opacity: hoveredSkill === skill.name ? 1 : 0,
                      y: hoveredSkill === skill.name ? 0 : 10,
                    }}
                  >
                    {skill.category}
                  </motion.div>

                  {/* Decorative Corner */}
                  <motion.div
                    className="absolute -bottom-1 -right-1 w-8 h-8 rounded-tl-2xl opacity-0 group-hover:opacity-100 transition-opacity"
                    style={{ backgroundColor: `${skill.color}20` }}
                  />
                </motion.div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
};

// ==================== CREATIVE MARQUEE ====================
const CreativeMarquee = () => {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const x1 = useTransform(scrollYProgress, [0, 1], [0, -500]);
  const x2 = useTransform(scrollYProgress, [0, 1], [-500, 0]);
  const rotate = useTransform(scrollYProgress, [0, 1], [-3, 3]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.95, 1, 0.95]);

  const words1 = ['CREATIVE', '•', 'DEVELOPER', '•', 'INNOVATOR', '•', 'PROBLEM SOLVER', '•'];
  const words2 = ['REACT', '•', 'NODE.JS', '•', 'TYPESCRIPT', '•', 'NEXT.JS', '•', 'MONGODB', '•'];
  const words3 = ['FULL-STACK', '•', 'UI/UX', '•', 'RESPONSIVE', '•', 'MODERN', '•', 'FAST', '•'];

  return (
    <div 
      ref={sectionRef}
      className="relative py-32 overflow-hidden bg-white"
    >
      <div className="absolute inset-0">
        <motion.div className="absolute inset-0 opacity-[0.02]" style={{ rotate }}>
          {[...Array(10)].map((_, i) => (
            <div
              key={i}
              className="absolute w-full h-px bg-gray-900"
              style={{ top: `${i * 10}%`, transform: `rotate(${i * 2}deg)` }}
            />
          ))}
        </motion.div>
      </div>

      <motion.div style={{ scale }} className="relative">
        <motion.div className="flex whitespace-nowrap mb-8" style={{ x: x1 }}>
          {[...Array(4)].map((_, setIndex) => (
            <div key={setIndex} className="flex items-center">
              {words1.map((word, index) => (
                <span
                  key={`${setIndex}-${index}`}
                  className={`mx-6 text-6xl md:text-8xl font-black ${
                    word === '•' ? 'text-orange-500' : 'text-gray-900'
                  }`}
                >
                  {word}
                </span>
              ))}
            </div>
          ))}
        </motion.div>

        <motion.div className="flex whitespace-nowrap mb-8" style={{ x: x2 }}>
          {[...Array(4)].map((_, setIndex) => (
            <div key={setIndex} className="flex items-center">
              {words2.map((word, index) => (
                <span
                  key={`${setIndex}-${index}`}
                  className={`mx-6 text-5xl md:text-7xl font-black ${
                    word === '•' ? 'text-orange-400' : 'text-transparent'
                  }`}
                  style={{ WebkitTextStroke: word !== '•' ? '2px #e5e5e5' : 'none' }}
                >
                  {word}
                </span>
              ))}
            </div>
          ))}
        </motion.div>

        <motion.div className="flex whitespace-nowrap" style={{ x: x1 }}>
          {[...Array(4)].map((_, setIndex) => (
            <div key={setIndex} className="flex items-center">
              {words3.map((word, index) => (
                <motion.span
                  key={`${setIndex}-${index}`}
                  className={`mx-6 text-4xl md:text-6xl font-black ${
                    word === '•' ? 'text-orange-300' : index % 2 === 0 ? 'text-gray-300' : 'text-gray-200'
                  }`}
                  whileHover={{ color: word !== '•' ? '#f97316' : undefined, scale: 1.1 }}
                >
                  {word}
                </motion.span>
              ))}
            </div>
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
};



export default About;