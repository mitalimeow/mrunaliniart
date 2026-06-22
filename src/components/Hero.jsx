import { motion } from 'framer-motion';

const Hero = () => {
  return (
    <section id="home" className="w-full pt-32 pb-16 relative">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          className="relative w-full h-[60vh] md:h-[70vh] rounded-sm overflow-hidden shadow-lg flex flex-col justify-center items-center text-center p-8"
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        >
          {/* Background Image for Hero Box */}
          <div className="absolute inset-0 z-0">
            {/* The user mentioned 'acting as the canvas background' for the welcoming image box */}
            <img
              src="/display3.jpeg"
              alt="Welcome Art"
              className="w-full h-full object-cover opacity-90"
            />
            {/* Soft overlay to make text readable */}
            <div className="absolute inset-0 bg-white/40 backdrop-blur-[2px]"></div>
          </div>

          {/* Foreground Text */}
          <motion.div
            className="relative z-10 bg-white/80 p-8 md:p-12 rounded-sm shadow-xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.3, ease: "easeOut" }}
          >
            <h1 className="font-serif text-5xl md:text-6xl font-bold text-[#1B2621]">
              Mrunalini Niwal
            </h1>
            <p className="font-sans text-xl font-light italic text-[#4A554A] mt-4 max-w-2xl">
              Capturing the radiant life of nature through vibrant color.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
