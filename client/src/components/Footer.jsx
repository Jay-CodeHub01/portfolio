// Footer.jsx
import React, { useRef, useState, useEffect } from 'react';
import { 
  motion, 
  useScroll, 
  useTransform, 
  useInView,
} from 'framer-motion';

const Footer = () => {
  const footerRef = useRef(null);
  const isInView = useInView(footerRef, { once: true, amount: 0.1 });
  const { scrollYProgress } = useScroll({
    target: footerRef,
    offset: ["start end", "end end"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, 0]);

  return (
    <footer ref={footerRef} className="relative bg-gray-950 text-white overflow-hidden">
      {/* Top Marquee Strip */}
      <TopMarquee />
      
      {/* Main Grid */}
      <motion.div style={{ y }}>
        <FooterGrid isInView={isInView} />
      </motion.div>

      {/* Bottom Bar */}
      <BottomBar isInView={isInView} />
    </footer>
  );
};

// ==================== TOP MARQUEE ====================
const TopMarquee = () => {
  const items = ['Available for freelance', '✦', 'Based in Gujarat, India', '✦', 'Open to collaborate', '✦', 'Let\'s build together', '✦'];
  
  return (
    <div className="bg-orange-500 py-3 overflow-hidden">
      <motion.div
        className="flex whitespace-nowrap"
        animate={{ x: [0, -1000] }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      >
        {[...Array(5)].map((_, setIndex) => (
          <div key={setIndex} className="flex items-center">
            {items.map((item, index) => (
              <span
                key={`${setIndex}-${index}`}
                className="mx-4 text-sm font-semibold text-white uppercase tracking-wider"
              >
                {item}
              </span>
            ))}
          </div>
        ))}
      </motion.div>
    </div>
  );
};


// ==================== COPY EMAIL BUTTON ====================
const CopyEmailButton = () => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText('pateljay18v@gmail.com');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.button
      onClick={handleCopy}
      className="flex items-center gap-3 px-8 py-5 border border-gray-700 rounded-full font-semibold text-gray-300 hover:border-orange-500 hover:text-white transition-colors text-lg"
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
    >
      {copied ? (
        <motion.span
          className="flex items-center gap-2 text-orange-500"
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
          </svg>
          Copied!
        </motion.span>
      ) : (
        <>
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
          </svg>
          Copy Email
        </>
      )}
    </motion.button>
  );
};

// ==================== FOOTER GRID ====================
const FooterGrid = ({ isInView }) => {
  const [currentTime, setCurrentTime] = useState('');

  useEffect(() => {
    const updateTime = () => {
      setCurrentTime(
        new Date().toLocaleTimeString('en-IN', {
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          timeZone: 'Asia/Kolkata',
        })
      );
    };
    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '#about' },
    { name: 'Work', href: '#work' },
    { name: 'Contact', href: '/contact' },
  ];

  const socialLinks = [
    { name: 'GitHub', href: 'https://github.com/Jay-CodeHub01' },
    { name: 'LinkedIn', href: 'https://www.linkedin.com/in/jay-patel-969315356/' },
    { name: 'Instagram', href: 'https://www.instagram.com/jay_ptl_18_/' }
  ];

  return (
    <div className="border-t border-gray-800/50">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 md:gap-8">
          
          {/* Col 1 - Navigation */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1 }}
          >
            <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-[0.2em] mb-6">
              Navigation
            </h4>
            <ul className="space-y-4">
              {navLinks.map((link, index) => (
                <motion.li
                  key={link.name}
                  initial={{ opacity: 0, x: -10 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.2 + index * 0.05 }}
                >
                  <motion.a
                    href={link.href}
                    className="group relative inline-flex items-center text-gray-400 hover:text-white transition-colors text-sm"
                    whileHover={{ x: 6 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <span className="absolute -left-4 opacity-0 group-hover:opacity-100 transition-opacity text-orange-500">
                      ›
                    </span>
                    {link.name}
                  </motion.a>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Col 2 - Socials */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2 }}
          >
            <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-[0.2em] mb-6">
              Socials
            </h4>
            <ul className="space-y-4">
              {socialLinks.map((link, index) => (
                <motion.li
                  key={link.name}
                  initial={{ opacity: 0, x: -10 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.3 + index * 0.05 }}
                >
                  <motion.a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors text-sm"
                    whileHover={{ x: 6 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <span className="absolute -left-4 opacity-0 group-hover:opacity-100 transition-opacity text-orange-500">
                      ›
                    </span>
                    {link.name}
                    <svg className="w-3 h-3 opacity-0 group-hover:opacity-50 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </motion.a>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Col 3 - Contact */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3 }}
          >
            <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-[0.2em] mb-6">
              Contact
            </h4>
            <div className="space-y-4">
              <motion.a
                href="mailto:pateljay18v@gmail.com"
                className="block text-sm text-gray-400 hover:text-white transition-colors"
                whileHover={{ x: 6 }}
              >
                pateljay18v@gmail.com
              </motion.a>
              <p className="text-sm text-gray-400">
                Gujarat, India
              </p>
            </div>
          </motion.div>

          {/* Col 4 - Local Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.4 }}
          >
            <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-[0.2em] mb-6">
              Local Time
            </h4>
            
            {/* Clock */}
            <div className="mb-6">
              <motion.p 
                className="text-3xl font-mono font-bold text-white mb-1"
                key={currentTime}
                initial={{ opacity: 0.5 }}
                animate={{ opacity: 1 }}
              >
                {currentTime}
              </motion.p>
              <p className="text-sm text-gray-500">IST (UTC +5:30)</p>
            </div>

            {/* Status */}
            <div className="flex items-center gap-2.5 px-4 py-3 bg-gray-900 rounded-xl border border-gray-800">
              <motion.div
                className="w-2 h-2 bg-green-500 rounded-full flex-shrink-0"
                animate={{ 
                  boxShadow: [
                    '0 0 0 0 rgba(34,197,94,0.4)',
                    '0 0 0 6px rgba(34,197,94,0)',
                  ]
                }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
              <span className="text-sm text-gray-300">
                Available for work
              </span>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

// ==================== BOTTOM BAR ====================
const BottomBar = ({ isInView }) => {
  return (
    <div className="border-t border-gray-800/50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="py-8 flex flex-col md:flex-row items-center justify-between gap-6">
          
          {/* Left - Logo + Copyright */}
          <motion.div
            className="flex items-center gap-4"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.5 }}
          >
            {/* Logo Mark */}
            <motion.a
              href="#home"
              className="w-10 h-10 bg-white rounded-xl flex items-center justify-center"
              whileHover={{ scale: 1.1, rotate: -5 }}
            >
              <span className="text-gray-900 font-black text-sm">JP</span>
            </motion.a>

            <div className="flex items-center gap-2 text-sm text-gray-500">
              <span>© {new Date().getFullYear()} Jay Patel</span>
              <span className="text-gray-700">·</span>
              <span className="flex items-center gap-1">
                Crafted with
                <motion.span
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  ❤️
                </motion.span>
              </span>
            </div>
          </motion.div>

        

          {/* Right - Back to Top */}
          <motion.button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="group flex items-center gap-3"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.7 }}
          >
            <span className="text-sm text-gray-500 group-hover:text-white transition-colors">
              Back to top
            </span>
            <motion.div
              className="w-10 h-10 rounded-xl bg-gray-900 border border-gray-800 group-hover:border-orange-500 flex items-center justify-center transition-colors"
              whileHover={{ y: -3 }}
            >
              <motion.svg
                className="w-4 h-4 text-gray-500 group-hover:text-orange-500 transition-colors"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                animate={{ y: [0, -3, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 10l7-7m0 0l7 7m-7-7v18" />
              </motion.svg>
            </motion.div>
          </motion.button>
        </div>
      </div>
    </div>
  );
};

export default Footer;