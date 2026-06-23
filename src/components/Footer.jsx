import { motion } from 'framer-motion';

const Footer = () => {
  return (
    <footer className="relative z-10 w-full py-10 border-t border-stone-200 text-center bg-white/40 backdrop-blur-sm flex flex-col items-center gap-2">
      <p className="font-sans text-sm text-[#1B2621]/50 tracking-wide">
        © 2026 Mrunalini Niwali
      </p>
      <p className="font-sans text-xs text-[#4A554A]/40 italic">
        Created with love, inspired by nature.
      </p>
    </footer>
  );
};

export default Footer;
