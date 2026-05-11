// MenuOverlay.jsx
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ResumePDF from "../assets/Jay_Resume.pdf";
import contact from "../pages/Contact.jsx";
import { Link } from "react-router-dom";

const MenuOverlay = ({ isOpen, onClose }) => {
  const [currentTime, setCurrentTime] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const [hoveredIndex, setHoveredIndex] = useState(null);

  // Update time every second
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const hours = String(now.getHours()).padStart(2, "0");
      const minutes = String(now.getMinutes()).padStart(2, "0");
      const seconds = String(now.getSeconds()).padStart(2, "0");
      setCurrentTime(`${hours}:${minutes}:${seconds}`);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const menuItems = [
    { name: "HOME", href: "#home" },
    { name: "WORK", href: "#work" },
    { name: "ABOUT ME", href: "#about" },
    { name: "CONTACT", href: "/contact" },
  ];

  const socialLinks = [
    {
      name: "Instagram",
      href: "https://www.instagram.com/jay_ptl_18_/",
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
        </svg>
      ),
    },
    {
      name: "LinkedIn",
      href: "https://www.linkedin.com/in/jay-patel-969315356/",
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
        </svg>
      ),
    },
    {
      name: "GitHub",
      href: "https://github.com/Jay-CodeHub01",
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
        </svg>
      ),
    },
  ];

  const handleNavClick = (index, href) => {
    setActiveIndex(index);
    onClose();
    setTimeout(() => {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }, 500);
  };

  // Container animation
  const containerVariants = {
    hidden: {
      y: "100%",
    },
    visible: {
      y: 0,
      transition: {
        duration: 0.7,
        ease: [0.33, 1, 0.68, 1],
        when: "beforeChildren",
        staggerChildren: 0.08,
      },
    },
    exit: {
      y: "100%",
      transition: {
        duration: 0.5,
        ease: [0.33, 1, 0.68, 1],
      },
    },
  };

  // Menu item animation
  const itemVariants = {
    hidden: {
      opacity: 0,
      y: 60,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.33, 1, 0.68, 1],
      },
    },
    exit: {
      opacity: 0,
      y: 30,
      transition: {
        duration: 0.3,
      },
    },
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 bg-[#2a2a2a] overflow-hidden"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          {/* Subtle Gradient Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#2a2a2a] via-[#333333] to-[#2a2a2a]" />

          {/* Noise Texture */}
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
            }}
          />

          {/* Top Bar */}
          <motion.div
            className="absolute top-0 left-0 right-0 z-50 flex justify-between items-center px-6 md:px-12 py-6 md:py-8"
            variants={itemVariants}
          >
            {/* Local Time */}
            <div className="flex items-center gap-2 text-white/50 text-sm font-mono tracking-wider">
              <span className="text-white/30">LOCAL/</span>
              <span className="text-white/70">{currentTime}</span>
            </div>

            {/* Apple Glass Resume Button */}
            <motion.a
              href={ResumePDF}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {/* Outer Glow on Hover */}
              <div className="absolute -inset-1 rounded-full bg-white/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              {/* Glass Button */}
              <div className="relative flex items-center gap-2 px-6 py-3 rounded-full bg-white/[0.08] backdrop-blur-xl border border-white/[0.15] shadow-[0_8px_32px_rgba(0,0,0,0.3),inset_0_1px_0_rgba(255,255,255,0.1)] overflow-hidden transition-all duration-300 group-hover:bg-white/[0.12] group-hover:border-white/[0.25]">
                {/* Inner Highlight */}
                <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/30 to-transparent" />

                {/* Shine Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out" />

                {/* Text */}
                <span className="relative text-white/90 font-medium text-sm tracking-wide">
                  Resume
                </span>

                {/* Arrow Icon */}
                <motion.svg
                  className="relative w-4 h-4 text-white/70 group-hover:text-white transition-colors"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  initial={{ x: 0, y: 0 }}
                  whileHover={{ x: 2, y: -2 }}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M7 17L17 7M17 7H7M17 7V17"
                  />
                </motion.svg>
              </div>
            </motion.a>
          </motion.div>

          {/* Main Menu Items with Reflection */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <nav className="flex flex-col items-center -space-y-2 md:-space-y-4">
              {menuItems.map((item, index) => (
                <motion.div
                  key={item.name}
                  className="relative"
                  variants={itemVariants}
                  custom={index}
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                >
                  {/* Menu Item Container */}
                  <motion.a
                    href={item.href}
                    onClick={(e) => {
                      menuItems.map((item, index) =>
                        item.href.startsWith("/") ? (
                          <Link
                            key={item.name}
                            to={item.href}
                            className="relative block group cursor-pointer"
                          >
                            <motion.span
                              whileHover={{ x: 15 }}
                              transition={{ duration: 0.3, ease: "easeOut" }}
                              className="block"
                            >
                              {item.name}
                            </motion.span>
                          </Link>
                        ) : (
                          <motion.a
                            key={item.name}
                            href={item.href}
                            onClick={(e) => {
                              e.preventDefault();
                              handleNavClick(index, item.href);
                            }}
                            className="relative block group cursor-pointer"
                            whileHover={{ x: 15 }}
                            transition={{ duration: 0.3, ease: "easeOut" }}
                          >
                            {item.name}
                          </motion.a>
                        ),
                      );
                    }}
                    className="relative block group cursor-pointer"
                    whileHover={{ x: 15 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                  >
                    {/* Index Number */}
                    <motion.span
                      className="absolute -left-10 md:-left-14 top-3 md:top-4 text-[10px] md:text-xs font-mono text-white/40"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{
                        opacity:
                          hoveredIndex === index || activeIndex === index
                            ? 1
                            : 0,
                        x:
                          hoveredIndex === index || activeIndex === index
                            ? 0
                            : -10,
                      }}
                      transition={{ duration: 0.2 }}
                    >
                      ({String(index + 1).padStart(2, "0")})
                    </motion.span>

                    {/* Main Text */}
                    <span
                      className={`block text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem] font-black tracking-tighter leading-[0.85] transition-all duration-300`}
                      style={{
                        fontFamily: "'Inter', 'Bebas Neue', sans-serif",
                        fontWeight: 900,
                        color:
                          activeIndex === index
                            ? "#ffffff"
                            : hoveredIndex === index
                              ? "rgba(255,255,255,0.9)"
                              : "rgba(255,255,255,0.25)",
                      }}
                    >
                      {item.name}
                    </span>

                    {/* Reflection/Mirror Effect */}
                    <motion.span
                      className="block text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem] font-black tracking-tighter leading-[0.85] select-none pointer-events-none"
                      style={{
                        fontFamily: "'Inter', 'Bebas Neue', sans-serif",
                        fontWeight: 900,
                        color: "transparent",
                        WebkitBackgroundClip: "text",
                        backgroundClip: "text",
                        backgroundImage:
                          hoveredIndex === index
                            ? "linear-gradient(to bottom, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0) 80%)"
                            : "linear-gradient(to bottom, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0) 60%)",
                        transform: "scaleY(-1)",
                        marginTop: "-0.15em",
                        maskImage:
                          "linear-gradient(to bottom, rgba(0,0,0,0.5) 0%, transparent 70%)",
                        WebkitMaskImage:
                          "linear-gradient(to bottom, rgba(0,0,0,0.5) 0%, transparent 70%)",
                      }}
                      initial={{ opacity: 0 }}
                      animate={{
                        opacity: hoveredIndex === index ? 1 : 0.5,
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      {item.name}
                    </motion.span>

                    {/* Underline on Hover */}
                    <motion.div
                      className="absolute left-0 h-[2px] bg-white/80"
                      style={{ bottom: "45%" }}
                      initial={{ width: 0 }}
                      animate={{
                        width: hoveredIndex === index ? "100%" : 0,
                      }}
                      transition={{ duration: 0.4, ease: [0.33, 1, 0.68, 1] }}
                    />
                  </motion.a>
                </motion.div>
              ))}
            </nav>
          </div>

          {/* Bottom Bar */}
          <motion.div
            className="absolute bottom-0 left-0 right-0 flex flex-col sm:flex-row justify-between items-center px-6 md:px-12 py-6 md:py-8 gap-4"
            variants={itemVariants}
          >
            {/* Social Links - Apple Glass Style */}
            <div className="flex items-center gap-3">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 + index * 0.1 }}
                >
                  {/* Glow */}
                  <div className="absolute inset-0 rounded-full bg-white/20 blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  {/* Glass Button */}
                  <div className="relative w-12 h-12 rounded-full bg-white/[0.06] backdrop-blur-xl border border-white/[0.1] flex items-center justify-center text-white/50 group-hover:text-white group-hover:bg-white/[0.1] group-hover:border-white/[0.2] transition-all duration-300 shadow-[0_4px_16px_rgba(0,0,0,0.2)]">
                    {/* Inner Highlight */}
                    <div className="absolute inset-x-2 top-1 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent rounded-full" />
                    {social.icon}
                  </div>
                </motion.a>
              ))}
            </div>

            {/* Close Button - Apple Glass Style */}
            <motion.button
              onClick={onClose}
              className="group relative"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {/* Outer Glow */}
              <div className="absolute -inset-1 rounded-full bg-white/10 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              {/* Glass Button */}
              <div className="relative flex items-center gap-3 px-6 py-3 rounded-full bg-white/[0.08] backdrop-blur-xl border border-white/[0.15] shadow-[0_8px_32px_rgba(0,0,0,0.3),inset_0_1px_0_rgba(255,255,255,0.1)] overflow-hidden transition-all duration-300 group-hover:bg-white/[0.12] group-hover:border-white/[0.25]">
                {/* Inner Highlight */}
                <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/30 to-transparent" />

                {/* Text */}
                <span className="relative text-white/80 font-medium text-sm tracking-wide group-hover:text-white transition-colors">
                  Close
                </span>

                {/* X Icon */}
                <motion.div
                  className="relative w-5 h-5 flex items-center justify-center"
                  whileHover={{ rotate: 90 }}
                  transition={{ duration: 0.3 }}
                >
                  <svg
                    className="w-4 h-4 text-white/60 group-hover:text-white transition-colors"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </motion.div>
              </div>
            </motion.button>

            {/* Copyright */}
            <p className="text-white/30 text-xs tracking-wider">
              ©2025 ALL RIGHTS RESERVED
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default MenuOverlay;
