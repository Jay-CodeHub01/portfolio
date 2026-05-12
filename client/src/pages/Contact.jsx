// Contact.jsx
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
import Footer from "../components/Footer";

const Contact = () => {
  return (
    <section id="contact" className="relative bg-[#FAFAFA]">
      <ContactHero />
      <ContactMain />
      <ConnectBanner />
      <Footer />
    </section>
  );
};

// ==================== CONTACT HERO ====================
const ContactHero = () => {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.9]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, -150]);

  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({
      x: ((e.clientX - rect.left) / rect.width - 0.5) * 40,
      y: ((e.clientY - rect.top) / rect.height - 0.5) * 40,
    });
  };

  const heroText = "GET IN TOUCH".split("");

  return (
    <div
      ref={sectionRef}
      className="relative h-screen bg-[#FAFAFA] overflow-hidden flex items-center justify-center"
      onMouseMove={handleMouseMove}
    >
      {/* Animated Grid */}
      <motion.div className="absolute inset-0" style={{ opacity }}>
        <svg className="w-full h-full opacity-[0.03]">
          <pattern
            id="contact-grid"
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
          <rect width="100%" height="100%" fill="url(#contact-grid)" />
        </svg>
      </motion.div>

      {/* Mouse-Following Decorative Elements */}
      <motion.div
        className="absolute top-20 left-[15%] w-24 h-24 rounded-full bg-gradient-to-br from-orange-200 to-amber-200"
        animate={{
          x: mousePos.x * 0.5,
          y: mousePos.y * 0.5 + Math.sin(Date.now() / 1000) * 10,
        }}
        transition={{ type: "spring", stiffness: 50, damping: 20 }}
      />
      <motion.div
        className="absolute top-40 right-[20%] w-16 h-16 rounded-2xl border-2 border-orange-300"
        animate={{
          x: mousePos.x * -0.3,
          y: mousePos.y * -0.3,
          rotate: mousePos.x,
        }}
        transition={{ type: "spring", stiffness: 50, damping: 20 }}
      />
      <motion.div
        className="absolute bottom-32 left-[25%] w-14 h-14 bg-gradient-to-br from-rose-200 to-pink-200 rounded-xl"
        animate={{
          x: mousePos.x * 0.7,
          y: mousePos.y * 0.7,
        }}
        transition={{ type: "spring", stiffness: 50, damping: 20 }}
      />
      <motion.div
        className="absolute bottom-40 right-[15%] w-20 h-20 rounded-full border-2 border-dashed border-gray-300"
        animate={{
          rotate: [0, 360],
          x: mousePos.x * -0.4,
          y: mousePos.y * -0.4,
        }}
        transition={{
          rotate: { duration: 20, repeat: Infinity, ease: "linear" },
          x: { type: "spring", stiffness: 50 },
          y: { type: "spring", stiffness: 50 },
        }}
      />

      {/* Floating Dots */}
      {[...Array(10)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 bg-orange-400 rounded-full"
          style={{
            left: `${10 + i * 9}%`,
            top: `${15 + (i % 4) * 20}%`,
          }}
          animate={{
            y: [0, -20, 0],
            opacity: [0.3, 1, 0.3],
            scale: [1, 1.5, 1],
            x: mousePos.x * (0.1 + i * 0.05),
          }}
          transition={{
            y: { duration: 3 + i * 0.4, repeat: Infinity },
            opacity: { duration: 3 + i * 0.4, repeat: Infinity },
            scale: { duration: 3 + i * 0.4, repeat: Infinity },
            x: { type: "spring", stiffness: 50 },
          }}
        />
      ))}

      {/* Background Large Text */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none select-none"
        style={{ y }}
      >
        <span className="text-[20vw] font-black text-gray-100/50 whitespace-nowrap">
          CONTACT
        </span>
      </motion.div>

      {/* Main Content */}
      <motion.div className="relative z-10 text-center px-6" style={{ scale }}>
        {/* Eyebrow */}
        <motion.div
          className="flex items-center justify-center gap-3 mb-8"
          style={{ y: textY, opacity }}
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
            Say Hello
          </motion.span>
          <motion.div
            className="h-px bg-gray-400"
            initial={{ width: 0 }}
            animate={{ width: 48 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          />
        </motion.div>

        {/* Main Title */}
        <motion.div
          className="flex flex-wrap justify-center mb-6 gap-x-2"
          style={{ y: textY, opacity }}
        >
          {heroText.map((letter, index) => (
            <motion.span
              key={index}
              className={`text-[12vw] md:text-[8vw] font-black leading-none cursor-default inline-block ${
                letter === " " ? "w-[3vw]" : "text-gray-900"
              }`}
              initial={{ y: 100, opacity: 0, rotateX: -90 }}
              animate={{ y: 0, opacity: 1, rotateX: 0 }}
              transition={{
                delay: index * 0.04,
                duration: 0.6,
                type: "spring",
              }}
              whileHover={{
                y: -15,
                scale: 1.15,
                color: "#f97316",
                transition: { type: "spring", stiffness: 400 },
              }}
            >
              {letter === " " ? "\u00A0" : letter}
            </motion.span>
          ))}
        </motion.div>

        {/* Subtitle */}
        <motion.p
          className="text-gray-500 text-lg md:text-xl max-w-2xl mx-auto mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          style={{ opacity }}
        >
          Have a project in mind or just want to chat? I'd love to hear from
          you. Let's create something extraordinary together.
        </motion.p>

        {/* Quick Contact Badges */}
        <motion.div
          className="flex flex-wrap items-center justify-center gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
        >
          {[
            {
              icon: "✉️",
              text: "pateljay18v@gmail.com",
              href: "mailto:pateljay18v@gmail.com",
            },
            { icon: "📍", text: "Gujarat, India", href: "#" },
          ].map((item, index) => (
            <motion.a
              key={item.text}
              href={item.href}
              className="flex items-center gap-2 px-5 py-3 bg-white rounded-full shadow-md border border-gray-100 text-gray-700 font-medium text-sm"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.1 + index * 0.1, type: "spring" }}
              whileHover={{
                scale: 1.05,
                y: -3,
                boxShadow: "0 15px 30px rgba(249,115,22,0.15)",
                borderColor: "#f97316",
              }}
            >
              <span className="text-lg">{item.icon}</span>
              <span>{item.text}</span>
            </motion.a>
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
};

// ==================== CONTACT MAIN ====================
const ContactMain = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const leftY = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const rightY = useTransform(scrollYProgress, [0, 1], [50, -50]);

  return (
    <div ref={sectionRef} className="relative py-32 bg-white overflow-hidden">
      {/* Background Decorations */}
      <motion.div
        className="absolute top-20 right-0 w-96 h-96 rounded-full bg-gradient-to-br from-orange-50 to-amber-50 opacity-60"
        style={{ y: useTransform(scrollYProgress, [0, 1], [0, -80]) }}
      />
      <motion.div
        className="absolute bottom-0 left-0 w-80 h-80 rounded-full bg-gradient-to-br from-rose-50 to-pink-50 opacity-60"
        style={{ y: useTransform(scrollYProgress, [0, 1], [0, 60]) }}
      />

      {/* Grid Pattern */}
      <div className="absolute inset-0 opacity-[0.02]">
        <svg className="w-full h-full">
          <pattern
            id="contact-main-grid"
            width="40"
            height="40"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M 40 0 L 0 0 0 40"
              fill="none"
              stroke="#000"
              strokeWidth="1"
            />
          </pattern>
          <rect width="100%" height="100%" fill="url(#contact-main-grid)" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          {/* Left Side - Contact Info */}
          <motion.div style={{ y: leftY }}>
            {/* Section Header */}
            <motion.div
              className="flex items-center gap-4 mb-10"
              initial={{ opacity: 0, x: -30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6 }}
            >
              <motion.span
                className="text-7xl font-black text-gray-100"
                initial={{ scale: 0 }}
                animate={isInView ? { scale: 1 } : {}}
                transition={{ type: "spring", delay: 0.2 }}
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
                  Contact Info
                </motion.p>
                <motion.h2
                  className="text-3xl md:text-4xl font-bold text-gray-900"
                  initial={{ opacity: 0, y: 10 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.4 }}
                >
                  Let's Connect
                </motion.h2>
              </div>
            </motion.div>

            {/* Description */}
            <motion.p
              className="text-gray-500 text-lg leading-relaxed mb-12"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.5 }}
            >
              I'm always open to discussing new projects, creative ideas, or
              opportunities to be part of your vision. Feel free to reach out
              through any of the following channels.
            </motion.p>

            {/* Contact Cards */}
            <div className="space-y-5 mb-12">
              {[
                {
                  icon: "✉️",
                  title: "Email",
                  value: "pateljay18v@gmail.com",
                  subtitle: "Drop me an email anytime",
                  href: "mailto:pateljay18v@gmail.com",
                  color: "#f97316",
                },

                {
                  icon: "📍",
                  title: "Location",
                  value: "Gujarat, India",
                  subtitle: "Available for remote work worldwide",
                  href: "#",
                  color: "#6366f1",
                },
                {
                  icon: "💼",
                  title: "LinkedIn",
                  value: "linkedin.com/in/jaypatel",
                  subtitle: "Connect professionally",
                  href: "https://www.linkedin.com/in/jay-patel-969315356/",
                  color: "#0077B5",
                },
              ].map((contact, index) => (
                <ContactInfoCard
                  key={contact.title}
                  contact={contact}
                  index={index}
                  isInView={isInView}
                />
              ))}
            </div>

            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 1.2 }}
            >
              <p className="text-sm font-medium text-gray-500 mb-4 tracking-widest uppercase">
                Follow Me
              </p>
              <div className="flex gap-3">
                {[
                  {
                    name: "GitHub",
                    href: "https://github.com/Jay-CodeHub01",
                    icon: (
                      <svg
                        className="w-5 h-5"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                      </svg>
                    ),
                  },
                  {
                    name: "LinkedIn",
                    href: "https://www.linkedin.com/in/jay-patel-969315356/",
                    icon: (
                      <svg
                        className="w-5 h-5"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                      </svg>
                    ),
                  },
                  {
                    name: "Instagram",
                    href: "https://www.instagram.com/jay_ptl_18_/",
                    icon: (
                      <svg
                        className="w-5 h-5"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                      </svg>
                    ),
                  },
                ].map((social, index) => (
                  <motion.a
                    key={social.name}
                    href={social.href}
                    className="group relative w-12 h-12 bg-gray-50 rounded-xl border border-gray-100 flex items-center justify-center"
                    initial={{ opacity: 0, scale: 0 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ delay: 1.3 + index * 0.1, type: "spring" }}
                    whileHover={{
                      y: -5,
                      borderColor: "#f97316",
                      backgroundColor: "#fff7ed",
                      boxShadow: "0 10px 20px rgba(249,115,22,0.15)",
                    }}
                  >
                    <motion.span
                      className="text-xl"
                      whileHover={{ scale: 1.2, rotate: [0, -10, 10, 0] }}
                    >
                      {social.icon}
                    </motion.span>

                    <div className="absolute -top-10 left-1/2 -translate-x-1/2 px-3 py-1.5 bg-gray-900 text-white text-xs font-medium rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                      {social.name}
                      <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-gray-900 rotate-45" />
                    </div>
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* Right Side - Contact Form */}
          <motion.div style={{ y: rightY }}>
            <ContactForm isInView={isInView} />
          </motion.div>
        </div>
      </div>
    </div>
  );
};

// ==================== CONTACT INFO CARD ====================
const ContactInfoCard = ({ contact, index, isInView }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.a
      href={contact.href}
      className="group flex items-center gap-5 p-5 bg-white rounded-2xl border border-gray-100 shadow-sm cursor-pointer"
      initial={{ opacity: 0, x: -30 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ delay: 0.6 + index * 0.1 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{
        x: 10,
        borderColor: contact.color,
        boxShadow: `0 15px 30px ${contact.color}15`,
      }}
    >
      {/* Icon */}
      <motion.div
        className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl flex-shrink-0"
        style={{ backgroundColor: `${contact.color}15` }}
        animate={{
          scale: isHovered ? 1.1 : 1,
          rotate: isHovered ? [0, -5, 5, 0] : 0,
        }}
        transition={{ duration: 0.3 }}
      >
        {contact.icon}
      </motion.div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <p className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-1">
          {contact.title}
        </p>
        <p className="text-gray-900 font-semibold truncate">{contact.value}</p>
        <p className="text-gray-500 text-sm">{contact.subtitle}</p>
      </div>

      {/* Arrow */}
      <motion.div
        className="flex-shrink-0"
        animate={{ x: isHovered ? 5 : 0, opacity: isHovered ? 1 : 0.3 }}
      >
        <svg
          className="w-5 h-5 text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5l7 7-7 7"
          />
        </svg>
      </motion.div>
    </motion.a>
  );
};

// ==================== CONTACT FORM ====================
const ContactForm = ({ isInView }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [focusedField, setFocusedField] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setIsSubmitting(true);

      const { name, email, subject, message } = formData;

      const response = await fetch(`https://portfolio-server-six-mu.vercel.app/api/contact`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          subject,
          message,
        }),
      });

      const data = await response.json();

      console.log(data);

      // SUCCESS ANIMATION
      setIsSubmitted(true);

      // RESET FORM
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      });

      // HIDE SUCCESS MESSAGE AFTER 3 SEC
      setTimeout(() => {
        setIsSubmitted(false);
      }, 3000);
    } catch (error) {
      console.log(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const formFields = [
    {
      name: "name",
      label: "Your Name",
      type: "text",
      placeholder: "John Doe",
      icon: "👤",
    },
    {
      name: "email",
      label: "Email Address",
      type: "email",
      placeholder: "john@example.com",
      icon: "✉️",
    },
    {
      name: "subject",
      label: "Subject",
      type: "text",
      placeholder: "Project Inquiry",
      icon: "📋",
    },
  ];

  return (
    <motion.div
      className="relative"
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: 0.4, duration: 0.6 }}
    >
      {/* Form Container */}
      <motion.div
        className="bg-white rounded-3xl p-8 md:p-10 shadow-xl border border-gray-100 relative overflow-hidden"
        whileHover={{ boxShadow: "0 30px 60px rgba(0,0,0,0.08)" }}
      >
        {/* Background Glow */}
        <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-gradient-to-br from-orange-50 to-transparent opacity-60 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-48 h-48 rounded-full bg-gradient-to-br from-amber-50 to-transparent opacity-60 pointer-events-none" />

        {/* Form Header */}
        <motion.div
          className="mb-8 relative z-10"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5 }}
        >
          <h3 className="text-2xl font-bold text-gray-900 mb-2">
            Send a Message
          </h3>
          <p className="text-gray-500">
            Fill out the form below and I'll get back to you soon.
          </p>
        </motion.div>

        {/* Success Message */}
        <AnimatePresence>
          {isSubmitted && (
            <motion.div
              className="absolute inset-0 bg-white rounded-3xl flex items-center justify-center z-50"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
            >
              <div className="text-center">
                <motion.div
                  className="text-7xl mb-4"
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ type: "spring", stiffness: 200 }}
                >
                  🎉
                </motion.div>
                <motion.h3
                  className="text-2xl font-bold text-gray-900 mb-2"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  Message Sent!
                </motion.h3>
                <motion.p
                  className="text-gray-500"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  Thanks for reaching out. I'll get back to you soon!
                </motion.p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5 relative z-10">
          {formFields.map((field, index) => (
            <motion.div
              key={field.name}
              className="relative"
              initial={{ opacity: 0, x: 30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.6 + index * 0.1 }}
            >
              <label className="text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                <span>{field.icon}</span>
                {field.label}
              </label>

              <motion.div
                className="relative mt-1"
                animate={{
                  scale: focusedField === field.name ? 1.02 : 1,
                }}
                transition={{ duration: 0.2 }}
              >
                <input
                  type={field.type}
                  name={field.name}
                  value={formData[field.name]}
                  onChange={handleChange}
                  onFocus={() => setFocusedField(field.name)}
                  onBlur={() => setFocusedField(null)}
                  placeholder={field.placeholder}
                  required
                  className="w-full px-5 py-4 bg-gray-50 border-2 border-gray-100 rounded-xl text-gray-900 placeholder-gray-400 outline-none transition-all duration-300 focus:border-orange-400 focus:bg-white focus:shadow-lg focus:shadow-orange-100"
                />

                {/* Focus Indicator */}
                <motion.div
                  className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-orange-500 to-pink-500 rounded-full"
                  initial={{ width: 0 }}
                  animate={{
                    width: focusedField === field.name ? "100%" : 0,
                  }}
                  transition={{ duration: 0.3 }}
                />
              </motion.div>
            </motion.div>
          ))}

          {/* Message Textarea */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.9 }}
          >
            <label className="text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
              <span>💬</span>
              Your Message
            </label>

            <motion.div
              className="relative mt-1"
              animate={{
                scale: focusedField === "message" ? 1.02 : 1,
              }}
              transition={{ duration: 0.2 }}
            >
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                onFocus={() => setFocusedField("message")}
                onBlur={() => setFocusedField(null)}
                placeholder="Tell me about your project..."
                required
                rows={5}
                className="w-full px-5 py-4 bg-gray-50 border-2 border-gray-100 rounded-xl text-gray-900 placeholder-gray-400 outline-none transition-all duration-300 focus:border-orange-400 focus:bg-white focus:shadow-lg focus:shadow-orange-100 resize-none"
              />

              <motion.div
                className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-orange-500 to-pink-500 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: focusedField === "message" ? "100%" : 0 }}
                transition={{ duration: 0.3 }}
              />
            </motion.div>

            {/* Character Count */}
            <motion.div
              className="text-right mt-2"
              animate={{ opacity: focusedField === "message" ? 1 : 0 }}
            >
              <span
                className={`text-xs font-medium ${formData.message.length > 500 ? "text-orange-500" : "text-gray-400"}`}
              >
                {formData.message.length}/500
              </span>
            </motion.div>
          </motion.div>

          {/* Submit Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 1 }}
          >
            <motion.button
              type="submit"
              disabled={isSubmitting}
              className="group relative w-full py-5 bg-gray-900 text-white rounded-xl font-bold text-lg overflow-hidden disabled:opacity-70"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {/* Hover Background */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-orange-500 to-pink-500"
                initial={{ x: "-100%" }}
                whileHover={{ x: 0 }}
                transition={{ duration: 0.3 }}
              />

              {/* Button Content */}
              <span className="relative z-10 flex items-center justify-center gap-3">
                {isSubmitting ? (
                  <>
                    <motion.div
                      className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                      animate={{ rotate: 360 }}
                      transition={{
                        duration: 1,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                    />
                    Sending...
                  </>
                ) : (
                  <>
                    Send Message
                    <motion.span
                      animate={{ x: [0, 5, 0] }}
                      transition={{ duration: 1, repeat: Infinity }}
                    >
                      →
                    </motion.span>
                  </>
                )}
              </span>
            </motion.button>
          </motion.div>
        </form>

        {/* Trust Badges */}
        <motion.div
          className="mt-6 flex items-center justify-center gap-4 text-sm text-gray-400"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 1.2 }}
        >
          <span className="flex items-center gap-1">
            <svg
              className="w-4 h-4 text-green-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
              />
            </svg>
            Secure
          </span>
          <span>•</span>
          <span>Quick Response</span>
          <span>•</span>
          <span>No Spam</span>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

// ==================== CONNECT BANNER ====================
const ConnectBanner = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.3 });
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const x1 = useTransform(scrollYProgress, [0, 1], [0, -300]);
  const x2 = useTransform(scrollYProgress, [0, 1], [-300, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.95, 1, 0.95]);

  const words1 = [
    "LET'S",
    "•",
    "WORK",
    "•",
    "TOGETHER",
    "•",
    "CREATE",
    "•",
    "BUILD",
    "•",
  ];
  const words2 = [
    "DESIGN",
    "•",
    "DEVELOP",
    "•",
    "DEPLOY",
    "•",
    "INNOVATE",
    "•",
    "GROW",
    "•",
  ];

  return (
    <div
      ref={sectionRef}
      className="relative py-28 bg-[#FAFAFA] overflow-hidden"
    >
      <motion.div style={{ scale }}>
        {/* Row 1 */}
        <motion.div className="flex whitespace-nowrap mb-6" style={{ x: x1 }}>
          {[...Array(4)].map((_, setIndex) => (
            <div key={setIndex} className="flex items-center">
              {words1.map((word, index) => (
                <motion.span
                  key={`${setIndex}-${index}`}
                  className={`mx-6 text-5xl md:text-7xl font-black ${
                    word === "•" ? "text-orange-500" : "text-gray-900"
                  }`}
                  whileHover={{
                    scale: 1.1,
                    color: word !== "•" ? "#f97316" : undefined,
                  }}
                >
                  {word}
                </motion.span>
              ))}
            </div>
          ))}
        </motion.div>

        {/* Row 2 - Outlined */}
        <motion.div className="flex whitespace-nowrap" style={{ x: x2 }}>
          {[...Array(4)].map((_, setIndex) => (
            <div key={setIndex} className="flex items-center">
              {words2.map((word, index) => (
                <motion.span
                  key={`${setIndex}-${index}`}
                  className={`mx-6 text-4xl md:text-6xl font-black ${
                    word === "•" ? "text-orange-400" : "text-transparent"
                  }`}
                  style={{
                    WebkitTextStroke: word !== "•" ? "2px #e5e5e5" : "none",
                  }}
                  whileHover={{
                    WebkitTextStroke: word !== "•" ? "2px #f97316" : "none",
                    scale: 1.1,
                  }}
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

export default Contact;
