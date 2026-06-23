import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const links = ['Home', 'Art', 'Commissions', 'Contact', 'About me'];

  // Close menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  // Prevent scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isOpen]);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  return (
    <>
      <nav className="fixed top-0 left-0 w-full z-[60] bg-white/80 backdrop-blur-md border-b border-stone-200">
        <div className="max-w-6xl mx-auto px-6 h-20 flex items-center justify-between">
          
          {/* Mobile Hamburger */}
          <div className="md:hidden flex items-center">
            <button onClick={toggleMenu} className="p-2 -ml-2 text-[#1B2621] hover:text-[#D4AF37] transition-colors focus:outline-none">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>

          {/* Logo (Centered on mobile, left on desktop) */}
          <div className="flex-1 md:flex-none flex justify-center md:justify-start">
            <Link to="/home" className="font-serif text-2xl font-bold text-[#1B2621]">MN</Link>
          </div>

          {/* Invisible spacer for mobile flex centering */}
          <div className="w-7 h-7 md:hidden" />

          {/* Desktop Links */}
          <div className="hidden md:flex gap-8">
            {links.map((link) => (
              <Link
                key={link}
                to={`/${link.toLowerCase().replace(' ', '-')}`}
                className="text-sm uppercase tracking-wider text-[#1B2621] hover:text-[#D4AF37] transition-colors duration-300 font-sans"
              >
                {link}
              </Link>
            ))}
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[50] md:hidden"
              onClick={closeMenu}
            />

            {/* Slide-in Menu */}
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 left-0 w-3/4 max-w-sm h-full bg-white shadow-2xl z-[55] md:hidden flex flex-col pt-24 px-8"
            >
              <div className="flex flex-col gap-6">
                {links.map((link, i) => (
                  <motion.div
                    key={link}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + i * 0.05 }}
                  >
                    <Link
                      to={`/${link.toLowerCase().replace(' ', '-')}`}
                      className="text-2xl font-serif text-[#1B2621] hover:text-[#D4AF37] transition-colors duration-300 block"
                    >
                      {link}
                    </Link>
                  </motion.div>
                ))}
              </div>

              {/* Mobile Footer */}
              <motion.div 
                className="mt-auto mb-10 pt-10 border-t border-stone-200"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                <p className="font-sans text-xs text-stone-500 uppercase tracking-widest mb-4">Follow me</p>
                <div className="flex gap-4">
                  <a href="https://instagram.com/mrunalini_art" target="_blank" rel="noreferrer" className="text-[#1B2621] hover:text-[#D4AF37] transition-colors">Instagram</a>
                  <a href="mailto:mniwal@gmail.com" className="text-[#1B2621] hover:text-[#D4AF37] transition-colors">Email</a>
                </div>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
