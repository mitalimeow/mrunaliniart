import { motion } from 'framer-motion';
import { FaInstagram, FaEnvelope } from 'react-icons/fa';

const Footer = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  return (
    <motion.footer 
      id="contact" 
      className="w-full border-t border-stone-200 py-16 text-center"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.5 }}
      variants={containerVariants}
    >
      <div className="max-w-4xl mx-auto px-6">
        <motion.h2 variants={itemVariants} className="font-serif text-2xl text-[#1B2621] mb-8">
          Find Me!
        </motion.h2>

        <div className="flex flex-col md:flex-row justify-center items-center gap-6 md:gap-12 text-base font-sans text-[#4A554A]">
          <motion.div variants={itemVariants} className="flex items-center gap-2">
            <FaInstagram className="text-xl text-[#1B2621]" />
            <a href="https://instagram.com/mrunalini_art" target="_blank" rel="noreferrer" className="hover:underline hover:text-[#D4AF37] transition-colors">
              @mrunalini_art
            </a>
          </motion.div>

          <motion.div variants={itemVariants} className="hidden md:block w-1 h-1 rounded-full bg-stone-300"></motion.div>

          <motion.div variants={itemVariants} className="flex items-center gap-2">
            <FaEnvelope className="text-xl text-[#1B2621]" />
            <a href="mailto:mniwal@gmail.com" className="hover:underline hover:text-[#D4AF37] transition-colors">
              mniwal@gmail.com
            </a>
          </motion.div>
        </div>
      </div>
    </motion.footer>
  );
};

export default Footer;
