// Work.jsx
import React, { useRef, useState, useEffect } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useMotionValue,
  useInView,
  AnimatePresence,
} from "framer-motion";

import mindsettler from "../assets/mindsetterCover.jpg";
import cricket from "../assets/cricketCover.jpg";
import dashboard from "../assets/dashboardCover.jpg";
import uiux from "../assets/uiuxImg.avif";
import aiImg from "../assets/aiImg.jpg";
import fullstackImg from "../assets/fullstackImg.png";

const projectImages = {
  mindsettler: mindsettler,
  cricket: cricket,
  dashboard: dashboard,
  uiux: uiux,
  ai: aiImg,
  fullstack: fullstackImg,
};

const Work = () => {
  return (
    <section id="work" className="relative bg-[#FAFAFA]">
      <WorkHero />
      <FeaturedProjects />
      <ProjectGrid />
      <ProjectShowcase />
      <WorkFooter />
    </section>
  );
};

// ==================== WORK HERO ====================
const WorkHero = () => {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.9]);
  const textY1 = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const textY2 = useTransform(scrollYProgress, [0, 1], [0, -150]);

  const [hoveredLetter, setHoveredLetter] = useState(null);
  const letters = "WORK".split("");

  return (
    <div
      ref={sectionRef}
      className="relative h-screen bg-[#FAFAFA] overflow-hidden flex items-center justify-center"
    >
      <motion.div className="absolute inset-0" style={{ opacity }}>
        <svg className="absolute inset-0 w-full h-full opacity-[0.03]">
          <pattern
            id="work-grid"
            width="60"
            height="60"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M 60 0 L 0 0 0 60"
              fill="none"
              stroke="#000"
              strokeWidth="1"
            />
          </pattern>
          <rect width="100%" height="100%" fill="url(#work-grid)" />
        </svg>

        <motion.div
          className="absolute top-20 left-[15%] w-20 h-20 rounded-full bg-gradient-to-br from-orange-200 to-amber-200"
          animate={{ y: [0, -30, 0], rotate: [0, 180, 360] }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div
          className="absolute top-40 right-[20%] w-16 h-16 rounded-2xl border-2 border-orange-300"
          animate={{ y: [0, 20, 0], rotate: [0, -90, 0] }}
          transition={{ duration: 6, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-32 left-[25%] w-12 h-12 bg-gradient-to-br from-rose-200 to-pink-200 rounded-xl"
          animate={{ y: [0, 25, 0], scale: [1, 1.2, 1] }}
          transition={{ duration: 5, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-40 right-[15%] w-24 h-24 rounded-full border-2 border-dashed border-gray-300"
          animate={{ rotate: [0, 360] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        />

        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-orange-400 rounded-full"
            style={{ left: `${15 + i * 10}%`, top: `${20 + (i % 3) * 25}%` }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.3, 1, 0.3],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 3 + i * 0.5,
              repeat: Infinity,
              delay: i * 0.3,
            }}
          />
        ))}
      </motion.div>

      <motion.div className="relative z-10 text-center px-6" style={{ scale }}>
        <motion.div
          className="flex items-center justify-center gap-3 mb-8"
          style={{ y: textY1, opacity }}
        >
          <motion.div
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
            Selected Projects
          </motion.span>
          <motion.div
            className="h-px bg-gray-400"
            initial={{ width: 0 }}
            animate={{ width: 48 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          />
        </motion.div>

        <motion.div
          className="flex justify-center mb-6"
          style={{ y: textY2, opacity }}
        >
          {letters.map((letter, index) => (
            <motion.span
              key={index}
              className="text-[20vw] md:text-[15vw] font-black text-gray-900 leading-none cursor-default inline-block"
              initial={{ y: 100, opacity: 0, rotateX: -90 }}
              animate={{ y: 0, opacity: 1, rotateX: 0 }}
              transition={{ delay: index * 0.1, duration: 0.8, type: "spring" }}
              onMouseEnter={() => setHoveredLetter(index)}
              onMouseLeave={() => setHoveredLetter(null)}
              whileHover={{ y: -20, scale: 1.1, color: "#f97316" }}
            >
              {letter}
            </motion.span>
          ))}
        </motion.div>

        <motion.p
          className="text-gray-500 text-lg md:text-xl max-w-xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          style={{ y, opacity }}
        >
          A showcase of projects that define my journey as a developer
        </motion.p>

        <motion.div
          className="mt-8 inline-flex items-center gap-2 px-6 py-3 bg-white rounded-full shadow-lg border border-gray-100"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.8, type: "spring" }}
          whileHover={{ scale: 1.05 }}
        >
          <span className="font-bold text-gray-900">15+</span>
          <span className="text-gray-500">Projects Completed</span>
        </motion.div>
      </motion.div>
    </div>
  );
};

// ==================== FEATURED PROJECTS - FIXED HORIZONTAL SCROLL ====================
const FeaturedProjects = () => {
  const sectionRef = useRef(null);

  const featuredProjects = [
    {
      id: 1,
      title: "MindSettler",
      subtitle: "AI Mental Health Platform",
      description:
        "An AI-powered mental health application that provides personalized therapy sessions, mood tracking, and intelligent recommendations using machine learning algorithms.",
      image: projectImages.mindsettler,
      tags: ["React", "Node.js", "OpenAI", "MongoDB"],
      color: "#f97316",
      year: "2024",
      link: "https://mindsettler-taupe.vercel.app/",
      github: "https://github.com/cod-aryan/Mindsettler",
    },
    {
      id: 2,
      title: "Cricket Predictor",
      subtitle: "ML Sports Analytics",
      description:
        "Machine learning model that predicts cricket match outcomes using historical data, player statistics, and real-time conditions with 85%+ accuracy.",
      image: projectImages.cricket,
      tags: ["Python", "TensorFlow", "Flask", "React"],
      color: "#10b981",
      year: "2024",
      link: "#",
      github: "https://github.com/cod-aryan/AI-Match-Predictor",
    },
    {
      id: 3,
      title: "Analytics Dashboard",
      subtitle: "Real-time Data Visualization",
      description:
        "A comprehensive real-time analytics dashboard with interactive charts, live data feeds, custom widgets, and automated reporting capabilities.",
      image: projectImages.dashboard,
      tags: ["Next.js", "D3.js", "PostgreSQL", "WebSocket"],
      color: "#6366f1",
      year: "2024",
      link: "#",
      github: "#",
    },
  ];

  const totalProjects = featuredProjects.length;

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  // FIX: Adjust scroll mapping so each project gets equal scroll space
  const x = useTransform(
    scrollYProgress,
    [0, 1],
    ["0%", `-${(totalProjects - 1) * 100}%`],
  );

  const smoothX = useSpring(x, { stiffness: 100, damping: 30 });
  const progressWidth = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <div
      ref={sectionRef}
      className="relative bg-white"
      // FIX: More scroll height per project for comfortable scrolling
      style={{ height: `${totalProjects * 150}vh` }}
    >
      <div className="sticky top-0 h-screen overflow-hidden">
        {/* Section Label */}
        <motion.div
          className="absolute top-8 left-8 z-20 flex items-center gap-3"
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-6xl font-black text-gray-100">01</span>
          <div>
            <p className="text-sm font-medium text-orange-500 tracking-widest uppercase">
              Featured
            </p>
            <h3 className="text-xl font-bold text-gray-900">Top Projects</h3>
          </div>
        </motion.div>

        {/* Project Counter */}
        <ProjectCounter
          scrollYProgress={scrollYProgress}
          total={totalProjects}
        />

        {/* Progress Bar */}
        <div className="absolute bottom-8 left-8 right-8 z-20">
          <div className="flex items-center gap-4">
            <div className="flex-1 h-1 bg-gray-200 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-orange-500 to-pink-500 rounded-full"
                style={{ width: progressWidth }}
              />
            </div>
            <span className="text-sm font-medium text-gray-500">
              {totalProjects} projects
            </span>
          </div>

          {/* Navigation Dots */}
          <div className="flex justify-center gap-3 mt-4">
            {featuredProjects.map((_, i) => (
              <ProjectDot
                key={i}
                index={i}
                total={totalProjects}
                scrollYProgress={scrollYProgress}
              />
            ))}
          </div>
        </div>

        {/* Project Slides */}
        <motion.div className="flex h-full" style={{ x: smoothX }}>
          {featuredProjects.map((project, index) => (
            <FeaturedProjectSlide
              key={project.id}
              project={project}
              index={index}
              total={totalProjects}
              scrollYProgress={scrollYProgress}
            />
          ))}
        </motion.div>
      </div>
    </div>
  );
};

// ==================== PROJECT COUNTER ====================
const ProjectCounter = ({ scrollYProgress, total }) => {
  const [current, setCurrent] = useState(1);

  useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (v) => {
      const index = Math.min(Math.floor(v * total) + 1, total);
      setCurrent(index);
    });
    return () => unsubscribe();
  }, [scrollYProgress, total]);

  return (
    <motion.div
      className="absolute top-8 right-8 z-20"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.5 }}
    >
      <div className="flex items-baseline gap-1">
        <motion.span
          key={current}
          className="text-5xl font-black text-gray-900"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: "spring" }}
        >
          0{current}
        </motion.span>
        <span className="text-xl text-gray-300 font-medium">/0{total}</span>
      </div>
    </motion.div>
  );
};

// ==================== PROJECT DOT ====================
const ProjectDot = ({ index, total, scrollYProgress }) => {
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (v) => {
      const activeIndex = Math.min(Math.floor(v * total), total - 1);
      setIsActive(activeIndex === index);
    });
    return () => unsubscribe();
  }, [scrollYProgress, total, index]);

  return (
    <motion.div
      className={`h-2 rounded-full transition-all duration-300 ${
        isActive ? "bg-orange-500 w-8" : "bg-gray-300 w-2"
      }`}
    />
  );
};

// ==================== FEATURED PROJECT SLIDE ====================
const FeaturedProjectSlide = ({ project, index, total, scrollYProgress }) => {
  const [isHovered, setIsHovered] = useState(false);
  const slideRef = useRef(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useTransform(mouseY, [-0.5, 0.5], [5, -5]);
  const rotateY = useTransform(mouseX, [-0.5, 0.5], [-5, 5]);

  // Calculate if this slide is in view
  const slideStart = index / total;
  const slideEnd = (index + 1) / total;

  const slideOpacity = useTransform(
    scrollYProgress,
    [slideStart, slideStart + 0.05, slideEnd - 0.05, slideEnd],
    [0, 1, 1, index === total - 1 ? 1 : 0],
  );

  const slideScale = useTransform(
    scrollYProgress,
    [slideStart, slideStart + 0.05, slideEnd - 0.05, slideEnd],
    [0.9, 1, 1, index === total - 1 ? 1 : 0.9],
  );

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
    <motion.div
      ref={slideRef}
      className="min-w-[100vw] h-full flex items-center px-8 md:px-20"
      style={{ opacity: slideOpacity, scale: slideScale }}
    >
      <div
        className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center"
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
      >
        {/* Image Side */}
        <div className="relative" style={{ perspective: 1000 }}>
          <motion.div
            className="absolute -top-6 -left-6 w-full h-full rounded-3xl"
            style={{ backgroundColor: `${project.color}15` }}
          />

          <motion.div
            className="relative rounded-3xl overflow-hidden shadow-2xl"
            style={{
              rotateX: isHovered ? rotateX : 0,
              rotateY: isHovered ? rotateY : 0,
              transformStyle: "preserve-3d",
            }}
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
          >
            <img
              src={project.image}
              alt={project.title}
              className="w-full aspect-[16/10] object-cover"
            />

            <motion.div
              className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"
              animate={{ opacity: isHovered ? 0.5 : 0.3 }}
            />

            <motion.div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.2) 45%, transparent 50%)",
              }}
              animate={{ x: isHovered ? ["0%", "200%"] : "0%" }}
              transition={{ duration: 0.8 }}
            />

            <motion.div className="absolute top-4 left-4 px-4 py-2 bg-white/90 backdrop-blur-sm rounded-full">
              <span className="text-sm font-bold text-gray-900">
                {project.year}
              </span>
            </motion.div>

            <motion.div
              className="absolute bottom-4 right-4"
              initial={{ opacity: 0, scale: 0 }}
              animate={{
                opacity: isHovered ? 1 : 0,
                scale: isHovered ? 1 : 0.8,
              }}
            >
              <div className="w-14 h-14 rounded-full bg-white flex items-center justify-center shadow-lg cursor-pointer">
                <svg
                  className="w-5 h-5 text-gray-900"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                  />
                </svg>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Content Side */}
        <div>
          <span className="text-8xl font-black text-gray-100">
            0{index + 1}
          </span>

          <p
            className="text-sm font-medium tracking-widest uppercase mb-2"
            style={{ color: project.color }}
          >
            {project.subtitle}
          </p>

          <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-4">
            {project.title}
          </h2>

          <p className="text-gray-500 text-lg leading-relaxed mb-8">
            {project.description}
          </p>

          <div className="flex flex-wrap gap-3 mb-10">
            {project.tags.map((tag) => (
              <motion.span
                key={tag}
                className="px-4 py-2 rounded-full text-sm font-medium border"
                style={{
                  borderColor: `${project.color}40`,
                  color: project.color,
                  backgroundColor: `${project.color}10`,
                }}
                whileHover={{ scale: 1.05, y: -2 }}
              >
                {tag}
              </motion.span>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <motion.a
              href={project.link}
              className="group inline-flex items-center gap-2 px-6 py-3 bg-gray-900 text-white rounded-full font-medium relative overflow-hidden"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.span
                className="absolute inset-0"
                style={{ backgroundColor: project.color }}
                initial={{ x: "-100%" }}
                whileHover={{ x: 0 }}
                transition={{ duration: 0.3 }}
              />
              <span className="relative z-10">View Project</span>
              <motion.svg
                className="relative z-10 w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </motion.svg>
            </motion.a>

            <motion.a
              href={project.github}
              className="inline-flex items-center gap-2 px-6 py-3 border-2 border-gray-200 text-gray-700 rounded-full font-medium hover:border-gray-900 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              GitHub ↗
            </motion.a>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

// ==================== PROJECT GRID ====================
const ProjectGrid = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const [activeFilter, setActiveFilter] = useState("all");
  const [hoveredProject, setHoveredProject] = useState(null);

  const projects = [
    {
      id: 1,
      title: "Analytics Dashboard",
      category: "frontend",
      image: projectImages.dashboard,
      tags: ["React", "D3.js", "WebSocket"],
      color: "#ec4899",
      description: "Interactive data visualization dashboard",
    },
    {
      id: 2,
      title: "ML Cricket Predictor",
      category: "ai",
      image: projectImages.cricket,
      tags: ["Python", "TensorFlow", "Flask"],
      color: "#f59e0b",
      description: "Machine learning model for sports predictions",
    },
    {
      id: 3,
      title: "MindSettler App",
      category: "fullstack",
      image: projectImages.mindsettler,
      tags: ["React", "Node.js", "OpenAI"],
      color: "#14b8a6",
      description: "AI mental health companion application",
    },
  ];

  const filters = [
    { id: "all", label: "All Projects", icon: "✨" },
    { id: "fullstack", label: "Full Stack", icon: "🔥" },
    { id: "frontend", label: "Frontend", icon: "🎨" },
    { id: "ai", label: "AI / ML", icon: "🤖" },
  ];

  const filteredProjects =
    activeFilter === "all"
      ? projects
      : projects.filter((p) => p.category === activeFilter);
  const headerY = useTransform(scrollYProgress, [0, 0.3], [80, 0]);
  const headerOpacity = useTransform(scrollYProgress, [0, 0.2], [0, 1]);

  return (
    <div
      ref={sectionRef}
      className="relative py-32 bg-[#FAFAFA] overflow-hidden"
    >
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute top-20 right-10 w-96 h-96 rounded-full bg-gradient-to-br from-orange-50 to-transparent opacity-60"
          style={{ y: useTransform(scrollYProgress, [0, 1], [0, -100]) }}
        />
        <motion.div
          className="absolute bottom-20 left-10 w-80 h-80 rounded-full bg-gradient-to-br from-amber-50 to-transparent opacity-60"
          style={{ y: useTransform(scrollYProgress, [0, 1], [0, 80]) }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div
          className="text-center mb-16"
          style={{ y: headerY, opacity: headerOpacity }}
        >
          <motion.div className="flex items-center justify-center gap-4 mb-6">
            <motion.span
              className="text-7xl font-black text-gray-100"
              initial={{ scale: 0 }}
              animate={isInView ? { scale: 1 } : {}}
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
                Portfolio
              </motion.p>
              <motion.h2
                className="text-4xl md:text-5xl font-bold text-gray-900"
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.4 }}
              >
                More Projects
              </motion.h2>
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          className="flex flex-wrap justify-center gap-3 mb-14"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5 }}
        >
          {filters.map((filter, index) => (
            <motion.button
              key={filter.id}
              onClick={() => setActiveFilter(filter.id)}
              className={`relative px-6 py-3 rounded-full font-medium text-sm transition-all duration-300 ${activeFilter === filter.id ? "text-white shadow-lg" : "bg-white text-gray-600 hover:bg-gray-50 border border-gray-200"}`}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.6 + index * 0.1 }}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              {activeFilter === filter.id && (
                <motion.div
                  className="absolute inset-0 rounded-full bg-gray-900"
                  layoutId="activeFilter"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
              <span className="relative z-10 flex items-center gap-2">
                <span>{filter.icon}</span>
                {filter.label}
              </span>
            </motion.button>
          ))}
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          layout
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, index) => (
              <ProjectGridCard
                key={project.id}
                project={project}
                index={index}
                isInView={isInView}
                hoveredProject={hoveredProject}
                setHoveredProject={setHoveredProject}
              />
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
};

// ==================== PROJECT GRID CARD ====================
const ProjectGridCard = ({
  project,
  index,
  isInView,
  hoveredProject,
  setHoveredProject,
}) => {
  const cardRef = useRef(null);
  const isCardHovered = hoveredProject === project.id;
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useTransform(mouseY, [-0.5, 0.5], [8, -8]);
  const rotateY = useTransform(mouseX, [-0.5, 0.5], [-8, 8]);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -50, scale: 0.9 }}
      transition={{
        duration: 0.5,
        delay: index * 0.1,
        layout: { duration: 0.3 },
      }}
    >
      <motion.div
        ref={cardRef}
        className="group relative bg-white rounded-3xl overflow-hidden shadow-lg border border-gray-100 cursor-pointer"
        style={{
          perspective: 1000,
          rotateX: isCardHovered ? rotateX : 0,
          rotateY: isCardHovered ? rotateY : 0,
          transformStyle: "preserve-3d",
        }}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setHoveredProject(project.id)}
        onMouseLeave={() => {
          mouseX.set(0);
          mouseY.set(0);
          setHoveredProject(null);
        }}
        whileHover={{
          y: -10,
          boxShadow: `0 30px 60px ${project.color}20`,
          borderColor: project.color,
        }}
        transition={{ duration: 0.3 }}
      >
        <div className="relative overflow-hidden">
          <motion.img
            src={project.image}
            alt={project.title}
            className="w-full aspect-[16/10] object-cover"
            animate={{ scale: isCardHovered ? 1.05 : 1 }}
            transition={{ duration: 0.5 }}
          />
          <motion.div
            className="absolute inset-0"
            style={{ backgroundColor: project.color }}
            initial={{ opacity: 0 }}
            animate={{ opacity: isCardHovered ? 0.15 : 0 }}
          />
          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: isCardHovered ? 1 : 0 }}
          >
            <motion.div
              className="w-14 h-14 rounded-full bg-white flex items-center justify-center shadow-xl"
              initial={{ scale: 0 }}
              animate={{ scale: isCardHovered ? 1 : 0 }}
              transition={{ type: "spring" }}
            >
              <svg
                className="w-5 h-5 text-gray-900"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                />
              </svg>
            </motion.div>
          </motion.div>
          <div className="absolute top-4 left-4 px-3 py-1.5 rounded-full bg-white/90 backdrop-blur-sm">
            <span
              className="text-xs font-semibold capitalize"
              style={{ color: project.color }}
            >
              {project.category === "ai"
                ? "AI / ML"
                : project.category === "fullstack"
                  ? "Full Stack"
                  : "Frontend"}
            </span>
          </div>
        </div>

        <div className="p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-orange-500 transition-colors">
            {project.title}
          </h3>
          <p className="text-gray-500 text-sm mb-4 line-clamp-2">
            {project.description}
          </p>
          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 rounded-full text-xs font-medium bg-gray-50 text-gray-600 border border-gray-100"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        <motion.div
          className="absolute bottom-0 left-0 right-0 h-1 origin-left"
          style={{ backgroundColor: project.color }}
          initial={{ scaleX: 0 }}
          animate={{ scaleX: isCardHovered ? 1 : 0 }}
        />
      </motion.div>
    </motion.div>
  );
};

// ==================== NEW PROJECT SHOWCASE - STACKED CARDS ====================
const ProjectShowcase = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  const highlights = [
    {
      id: 1,
      title: "Full-Stack Expertise",
      stat: "15+",
      label: "Projects Built",
      description:
        "From concept to deployment, I handle every layer of the stack with precision and care.",

      gradient: "from-orange-400 to-rose-400",
      image: projectImages.fullstack,
    },
    {
      id: 2,
      title: "AI & Machine Learning",
      stat: "5+",
      label: "AI Projects",
      description:
        "Integrating cutting-edge AI capabilities to build intelligent, data-driven applications.",

      gradient: "from-emerald-400 to-teal-400",
      image: projectImages.ai,
    },
    {
      id: 3,
      title: "User-First Design",
      stat: "100%",
      label: "Responsive",
      description:
        "Every pixel is crafted with the user in mind, ensuring seamless experiences across all devices.",

      gradient: "from-amber-400 to-orange-400",
      image: projectImages.uiux,
    },
  ];

  return (
    <div
      ref={sectionRef}
      className="relative bg-white"
      style={{ height: `${highlights.length * 100 + 50}vh` }}
    >
      <div className="sticky top-0 h-screen overflow-hidden flex items-center">
        <div className="max-w-7xl mx-auto px-6 w-full">
          {/* Section Header */}
          <motion.div
            className="mb-12"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
          >
            <div className="flex items-center gap-4">
              <motion.span
                className="text-7xl font-black text-gray-100"
                initial={{ scale: 0 }}
                animate={isInView ? { scale: 1 } : {}}
                transition={{ type: "spring" }}
              >
                03
              </motion.span>
              <div>
                <p className="text-sm font-medium text-orange-500 tracking-widest uppercase">
                  Why Me
                </p>
                <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
                  What I Bring
                </h2>
              </div>
            </div>
          </motion.div>

          {/* Stacked Cards */}
          <div className="relative h-[60vh]">
            {highlights.map((item, index) => (
              <StackedCard
                key={item.id}
                item={item}
                index={index}
                total={highlights.length}
                scrollYProgress={scrollYProgress}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// ==================== STACKED CARD ====================
const StackedCard = ({ item, index, total, scrollYProgress }) => {
  const [isHovered, setIsHovered] = useState(false);

  // Each card gets a segment of the scroll
  const cardStart = index / total;
  const cardEnd = (index + 1) / total;
  const cardMid = (cardStart + cardEnd) / 2;

  // Card animations based on scroll
  const y = useTransform(
    scrollYProgress,
    [cardStart, cardMid, cardEnd],
    [index === 0 ? 0 : 100, 0, -100],
  );

  const opacity = useTransform(
    scrollYProgress,
    [cardStart, cardStart + 0.05, cardEnd - 0.05, cardEnd],
    [index === 0 ? 1 : 0, 1, 1, index === total - 1 ? 1 : 0],
  );

  const scale = useTransform(
    scrollYProgress,
    [cardStart, cardMid, cardEnd],
    [index === 0 ? 1 : 0.95, 1, 0.95],
  );

  const rotateX = useTransform(
    scrollYProgress,
    [cardStart, cardMid, cardEnd],
    [index === 0 ? 0 : 5, 0, -5],
  );

  return (
    <motion.div
      className="absolute inset-0"
      style={{ y, opacity, scale, rotateX, perspective: 1200 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.div
        className="h-full bg-white rounded-3xl border border-gray-200 overflow-hidden shadow-xl"
        whileHover={{ boxShadow: "0 40px 80px rgba(0,0,0,0.1)" }}
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 h-full">
          {/* Content Side */}
          <div className="p-10 md:p-14 flex flex-col justify-center">
            {/* Stat */}
            <div className="flex items-baseline gap-3 mb-4">
              <motion.span
                className={`text-6xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r ${item.gradient}`}
                animate={{ scale: isHovered ? 1.05 : 1 }}
              >
                {item.stat}
              </motion.span>
              <span className="text-gray-500 text-lg font-medium">
                {item.label}
              </span>
            </div>

            {/* Title */}
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
              {item.title}
            </h3>

            {/* Description */}
            <p className="text-gray-500 text-lg leading-relaxed mb-8">
              {item.description}
            </p>

            {/* Mini Decorative Line */}
            <motion.div
              className={`h-1 rounded-full bg-gradient-to-r ${item.gradient}`}
              initial={{ width: 0 }}
              animate={{ width: isHovered ? 120 : 60 }}
              transition={{ duration: 0.3 }}
            />
          </div>

          {/* Image Side */}
          <div className="relative overflow-hidden hidden lg:block">
            <motion.img
              src={item.image}
              alt={item.title}
              className="w-full h-full object-cover"
              animate={{ scale: isHovered ? 1.05 : 1 }}
              transition={{ duration: 0.5 }}
            />

            {/* Color Overlay */}
            <motion.div
              className={`absolute inset-0 bg-gradient-to-br ${item.gradient} mix-blend-multiply`}
              animate={{ opacity: isHovered ? 0.3 : 0.15 }}
              transition={{ duration: 0.3 }}
            />

            {/* Pattern Overlay */}
            <div
              className="absolute inset-0 opacity-10"
              style={{
                backgroundImage:
                  "radial-gradient(circle, white 1px, transparent 1px)",
                backgroundSize: "20px 20px",
              }}
            />
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

// ==================== NEW WORK FOOTER ====================
const WorkFooter = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.3 });
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -50]);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const containerRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    setMousePos({
      x: ((e.clientX - rect.left) / rect.width - 0.5) * 30,
      y: ((e.clientY - rect.top) / rect.height - 0.5) * 30,
    });
  };

  return (
    <div
      ref={sectionRef}
      className="relative py-40 overflow-hidden bg-[#FAFAFA]"
      onMouseMove={handleMouseMove}
    >
      <div ref={containerRef} className="relative max-w-7xl mx-auto px-6">
        {/* Background Text */}
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none select-none"
          style={{ y }}
        >
          <span className="text-[25vw] font-black text-gray-100 whitespace-nowrap leading-none">
            LET'S TALK
          </span>
        </motion.div>

        {/* Floating Decorative Elements */}
        <motion.div
          className="absolute top-10 left-10 w-20 h-20 rounded-full bg-gradient-to-br from-orange-200 to-amber-200"
          animate={{
            x: mousePos.x * 0.5,
            y: mousePos.y * 0.5,
            rotate: [0, 360],
          }}
          transition={{
            x: { type: "spring", stiffness: 50 },
            y: { type: "spring", stiffness: 50 },
            rotate: { duration: 20, repeat: Infinity, ease: "linear" },
          }}
        />
        <motion.div
          className="absolute bottom-20 right-20 w-16 h-16 rounded-2xl border-2 border-orange-300"
          animate={{
            x: mousePos.x * -0.3,
            y: mousePos.y * -0.3,
          }}
          transition={{ type: "spring", stiffness: 50 }}
        />
        <motion.div
          className="absolute top-1/3 right-[15%] w-12 h-12 rounded-full bg-gradient-to-br from-rose-200 to-pink-200"
          animate={{
            x: mousePos.x * 0.7,
            y: mousePos.y * 0.7,
          }}
          transition={{ type: "spring", stiffness: 50 }}
        />
        <motion.div
          className="absolute bottom-1/3 left-[20%] w-14 h-14 rounded-xl border-2 border-dashed border-amber-300"
          animate={{
            x: mousePos.x * -0.5,
            y: mousePos.y * -0.5,
            rotate: [0, -360],
          }}
          transition={{
            x: { type: "spring", stiffness: 50 },
            y: { type: "spring", stiffness: 50 },
            rotate: { duration: 15, repeat: Infinity, ease: "linear" },
          }}
        />

        {/* Small Dots */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-3 h-3 rounded-full bg-orange-400"
            style={{
              left: `${10 + i * 15}%`,
              top: `${20 + (i % 3) * 30}%`,
            }}
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.3, 0.8, 0.3],
              x: mousePos.x * (0.2 + i * 0.1),
              y: mousePos.y * (0.2 + i * 0.1),
            }}
            transition={{
              scale: { duration: 2 + i * 0.5, repeat: Infinity },
              opacity: { duration: 2 + i * 0.5, repeat: Infinity },
              x: { type: "spring", stiffness: 50 },
              y: { type: "spring", stiffness: 50 },
            }}
          />
        ))}

        {/* Main Content */}
        <div className="relative z-10 text-center">
          {/* Emoji */}
          <motion.div
            className="text-7xl mb-8"
            initial={{ opacity: 0, scale: 0 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ type: "spring", delay: 0.2 }}
          >
            
          </motion.div>

          {/* Title */}
          <motion.h2
            className="text-5xl md:text-7xl font-black text-gray-900 mb-6 leading-tight"
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            Have a project
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 via-rose-500 to-pink-500">
              in mind?
            </span>
          </motion.h2>

          {/* Description */}
          <motion.p
            className="text-gray-500 text-xl max-w-2xl mx-auto mb-12"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.4 }}
          >
            I'd love to hear about your next project. Let's turn your vision
            into reality with clean code and beautiful design.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row items-center justify-center gap-5"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.5 }}
          >
            {/* Primary CTA */}
            <motion.a
              href="/contact"
              className="group relative"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.div className="absolute inset-0 rounded-full bg-gradient-to-r from-orange-500 to-pink-500 blur-lg opacity-50 group-hover:opacity-80 transition-opacity" />
              <div className="relative px-10 py-5 bg-gradient-to-r from-orange-500 to-pink-500 text-white rounded-full font-bold text-lg flex items-center gap-3">
                <span>Let's Work Together</span>
                <motion.span
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1, repeat: Infinity }}
                >
                  →
                </motion.span>
              </div>
            </motion.a>

            {/* Secondary CTA */}
            <motion.a
              href="mailto:pateljay18v@gmail.com"
              className="group px-10 py-5 bg-white text-gray-900 rounded-full font-bold text-lg border-2 border-gray-200 flex items-center gap-3 hover:border-orange-500 hover:text-orange-500 transition-all shadow-sm"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.span
                animate={{ rotate: [0, 15, -15, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 2 }}
              >
                📧
              </motion.span>
              <span>Send Email</span>
            </motion.a>
          </motion.div>

          {/* Bottom Info Row */}
          <motion.div
            className="mt-20 flex flex-wrap items-center justify-center gap-8"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.7 }}
          >
            {/* Availability */}
            <motion.div
              className="flex items-center gap-3 px-6 py-3 bg-white rounded-full shadow-sm border border-gray-100"
              whileHover={{
                scale: 1.05,
                y: -3,
                boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
              }}
            >
              <motion.div
                className="w-3 h-3 bg-green-400 rounded-full"
                animate={{ scale: [1, 1.3, 1], opacity: [1, 0.5, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
              <span className="text-sm font-medium text-gray-700">
                Available for work
              </span>
            </motion.div>

            {/* Response Time */}
            <motion.div
              className="flex items-center gap-3 px-6 py-3 bg-white rounded-full shadow-sm border border-gray-100"
              whileHover={{
                scale: 1.05,
                y: -3,
                boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
              }}
            >
              <span className="text-lg">⚡</span>
              <span className="text-sm font-medium text-gray-700">
                Replies within 24hrs
              </span>
            </motion.div>

            {/* Location */}
            <motion.div
              className="flex items-center gap-3 px-6 py-3 bg-white rounded-full shadow-sm border border-gray-100"
              whileHover={{
                scale: 1.05,
                y: -3,
                boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
              }}
            >
              <span className="text-lg">🇮🇳</span>
              <span className="text-sm font-medium text-gray-700">
                Gujarat, India
              </span>
            </motion.div>
          </motion.div>

          
        </div>
      </div>
    </div>
  );
};

export default Work;
