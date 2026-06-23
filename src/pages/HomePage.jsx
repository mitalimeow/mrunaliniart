import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { FaInstagram, FaEnvelope } from 'react-icons/fa';

/* ─────────────────────────────────────────────
   Shared animation variants
───────────────────────────────────────────── */
const fadeUp = (delay = 0) => ({
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 1, ease: 'easeOut', delay },
  },
});

const slideFromLeft = {
  hidden: { opacity: 0, x: -70 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.9, ease: 'easeOut' } },
};

const slideFromRight = {
  hidden: { opacity: 0, x: 70 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.9, ease: 'easeOut' } },
};

const stagger = {
  visible: { transition: { staggerChildren: 0.15 } },
};

const vp = { once: true, amount: 0.2 };

/* ─────────────────────────────────────────────
   Floating blob shapes (decorative background)
───────────────────────────────────────────── */
function FloatingBlobs() {
  const blobs = [
    { size: 380, x: '8%', y: '12%', delay: 0, color: 'rgba(212,175,55,0.07)' },
    { size: 260, x: '78%', y: '5%', delay: 1.5, color: 'rgba(74,85,74,0.06)' },
    { size: 320, x: '60%', y: '40%', delay: 0.8, color: 'rgba(212,175,55,0.05)' },
    { size: 200, x: '20%', y: '65%', delay: 2, color: 'rgba(180,160,130,0.07)' },
    { size: 280, x: '85%', y: '72%', delay: 1.2, color: 'rgba(74,85,74,0.05)' },
  ];

  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden z-0">
      {blobs.map((b, i) => (
        <motion.div
          key={i}
          style={{
            width: b.size,
            height: b.size,
            left: b.x,
            top: b.y,
            background: b.color,
            borderRadius: '60% 40% 70% 30% / 50% 60% 40% 50%',
          }}
          className="absolute"
          animate={{
            borderRadius: [
              '60% 40% 70% 30% / 50% 60% 40% 50%',
              '40% 60% 30% 70% / 60% 40% 50% 50%',
              '60% 40% 70% 30% / 50% 60% 40% 50%',
            ],
            y: [-12, 12, -12],
            x: [-8, 8, -8],
          }}
          transition={{
            duration: 10 + i * 2,
            delay: b.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  );
}

/* ─────────────────────────────────────────────
   HERO SECTION
───────────────────────────────────────────── */
function HeroSection() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '20%']);

  return (
    <section
      ref={ref}
      className="relative min-h-screen flex items-center overflow-hidden"
    >
      {/* Parallax Background */}
      <motion.div
        className="absolute inset-0 z-0"
        style={{ y: bgY }}
      >
        <div
          className="w-full h-full"
          style={{
            backgroundImage: "url('/common_bg.jpg')",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundAttachment: 'fixed',
            opacity: 0.4,
          }}
        />
      </motion.div>

      {/* Dark overlay for text legibility */}
      <div className="absolute inset-0 z-0 bg-white/60" />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-8 md:px-16 pt-28">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={stagger}
          className="flex flex-col gap-6 max-w-3xl"
        >
          {/* Label */}
          <motion.p
            variants={fadeUp(0)}
            className="text-xs font-sans uppercase tracking-[0.35em] text-stone-500"
          >
            Artist Portfolio
          </motion.p>

          {/* Artist Name */}
          <motion.h1
            variants={fadeUp(0.1)}
            className="font-serif text-6xl md:text-8xl font-bold text-[#1B2621] leading-none tracking-tight"
          >
            Mrunalini<br />
            <span className="text-[#4A554A]">Niwal</span>
          </motion.h1>

          {/* Decorative line */}
          <motion.div
            initial={{ scaleX: 0, originX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.9, delay: 0.5, ease: 'easeOut' }}
            className="w-24 h-0.5 bg-[#D4AF37]"
          />

          {/* Tagline */}
          <motion.p
            variants={fadeUp(0.35)}
            className="font-sans text-lg md:text-xl text-[#4A554A] leading-relaxed max-w-xl font-light tracking-wide"
          >
            Where nature, emotion, and imagination bloom through every brushstroke.
          </motion.p>

          {/* CTA */}
          <motion.div variants={fadeUp(0.5)} className="flex gap-4 mt-2">
            <a
              href="#art"
              className="group inline-flex items-center gap-2 px-8 py-4 bg-[#1B2621] text-white text-sm uppercase tracking-widest font-sans rounded-sm hover:bg-[#2e3e36] transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              Explore My Art
              <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
            </a>
            <Link
              to="/about-me"
              className="inline-flex items-center gap-2 px-8 py-4 border border-[#1B2621]/40 text-[#1B2621] text-sm uppercase tracking-widest font-sans rounded-sm hover:border-[#1B2621] hover:bg-stone-50 transition-all duration-300"
            >
              About Me
            </Link>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
      >
        <motion.div
          className="w-px h-14 bg-stone-400 origin-top"
          animate={{ scaleY: [0, 1, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        />
      </motion.div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   Single Artwork Row (zig-zag)
───────────────────────────────────────────── */
function ArtworkRow({ image, heading, content, imageLeft, index }) {
  return (
    <div
      id={index === 0 ? 'art' : undefined}
      className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-center py-12"
    >
      {/* Image */}
      <motion.div
        variants={imageLeft ? slideFromLeft : slideFromRight}
        initial="hidden"
        whileInView="visible"
        viewport={vp}
        className={`flex justify-center ${imageLeft ? 'md:order-1' : 'md:order-2'}`}
      >
        <motion.div
          whileHover={{ scale: 1.03 }}
          transition={{ duration: 0.4 }}
          className="relative"
        >
          {/* Accent border */}
          <div
            className={`absolute -top-4 ${imageLeft ? '-left-4' : '-right-4'} w-full h-full rounded-3xl border border-[#D4AF37]/40 z-0`}
          />
          <img
            src={image}
            alt={heading}
            loading="lazy"
            className="relative z-10 w-full max-w-md h-[420px] object-cover rounded-3xl shadow-2xl"
          />
        </motion.div>
      </motion.div>

      {/* Text */}
      <motion.div
        variants={imageLeft ? slideFromRight : slideFromLeft}
        initial="hidden"
        whileInView="visible"
        viewport={vp}
        className={`flex flex-col gap-5 ${imageLeft ? 'md:order-2' : 'md:order-1'}`}
      >
        <p className="text-xs font-sans uppercase tracking-[0.3em] text-stone-400">
          Featured Work
        </p>
        <h3 className="font-serif text-4xl md:text-5xl font-bold text-[#1B2621] leading-tight">
          {heading}
        </h3>
        <div className="w-10 h-0.5 bg-[#D4AF37]" />
        <p className="font-sans text-base md:text-lg leading-relaxed text-[#4A554A] font-light">
          {content}
        </p>
      </motion.div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   FEATURED ARTWORK SECTION
───────────────────────────────────────────── */
const artworks = [
  {
    image: '/display1.jpeg',
    heading: 'Nature in Bloom',
    content:
      'The delicate beauty of flowers and foliage has always inspired my creative journey. Through watercolor and gouache, I seek to capture the softness of petals, the movement of leaves, and the quiet elegance found in nature\'s smallest details. Every painting is a celebration of growth, color, and life.',
    imageLeft: true,
  },
  {
    image: '/display2.jpeg',
    heading: 'Stories of the Wild',
    content:
      'Animals bring a unique sense of wonder and personality into the world around us. Using acrylics and expressive brushwork, I strive to capture their spirit, curiosity, and grace. My goal is not only to paint them, but to bring their stories and emotions vividly to life.',
    imageLeft: false,
  },
  {
    image: '/display3.jpeg',
    heading: 'Where Art Meets Imagination',
    content:
      'My work often blends observation with imagination, transforming everyday scenes into vibrant visual narratives. By combining watercolor, gouache, and acrylic techniques, I create pieces that invite viewers to pause, explore, and reconnect with the beauty of nature and the emotions it inspires.',
    imageLeft: true,
  },
];

function FeaturedArtSection() {
  return (
    <section
      className="w-full py-24 relative"
      style={{
        backgroundImage: "url('/common_bg.jpg')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
      }}
    >
      {/* Light wash overlay */}
      <div className="absolute inset-0 bg-white/80" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12">
        {/* Section heading */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={vp}
          variants={stagger}
          className="text-center mb-20 flex flex-col items-center gap-4"
        >
          <motion.p variants={fadeUp(0)} className="text-xs font-sans uppercase tracking-[0.35em] text-stone-400">
            Gallery
          </motion.p>
          <motion.h2 variants={fadeUp(0.1)} className="font-serif text-5xl md:text-6xl font-bold text-[#1B2621]">
            Art Inspired by Life
          </motion.h2>
          <motion.div variants={fadeUp(0.2)} className="w-16 h-0.5 bg-[#D4AF37]" />
          <motion.p variants={fadeUp(0.3)} className="font-sans text-lg text-[#4A554A] font-light max-w-xl leading-relaxed">
            Every painting is a reflection of the beauty I find in nature, animals, and the stories they quietly tell.
          </motion.p>
        </motion.div>

        {/* Artwork rows */}
        <div className="flex flex-col gap-8">
          {artworks.map((art, i) => (
            <ArtworkRow key={i} {...art} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   FIND ME / CONTACT SECTION
───────────────────────────────────────────── */
function FindMeSection() {
  return (
    <section
      className="w-full py-28 relative flex items-center justify-center"
      style={{
        backgroundImage: "url('/common_bg.jpg')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
      }}
    >
      <div className="absolute inset-0 bg-[#1B2621]/60" />

      <div className="relative z-10 w-full max-w-2xl mx-auto px-6 text-center">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={vp}
          variants={stagger}
          className="flex flex-col items-center gap-8"
        >
          {/* Glassmorphism panel */}
          <motion.div
            variants={fadeUp(0)}
            className="w-full backdrop-blur-md bg-white/20 border border-white/30 rounded-3xl px-10 py-14 shadow-2xl flex flex-col items-center gap-8"
          >
            <p className="text-xs font-sans uppercase tracking-[0.35em] text-white/70">
              Stay Connected
            </p>
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-white leading-tight">
              Find Me
            </h2>
            <div className="w-12 h-0.5 bg-[#D4AF37]" />
            <p className="font-sans text-base text-white/80 leading-relaxed max-w-md font-light">
              I love connecting with fellow artists, collectors, nature enthusiasts, and anyone who shares a passion for creativity. Feel free to reach out, follow my journey, or simply say hello.
            </p>

            {/* Contact links */}
            <div className="flex flex-col sm:flex-row gap-6 mt-2">
              <motion.a
                href="https://instagram.com/mrunalini_art"
                target="_blank"
                rel="noreferrer"
                whileHover={{ scale: 1.05 }}
                className="flex items-center gap-3 px-7 py-3.5 bg-white/15 hover:bg-white/25 border border-white/30 rounded-full text-white font-sans text-sm tracking-wide transition-all duration-300"
              >
                <FaInstagram className="text-lg" />
                @mrunalini_art
              </motion.a>
              <motion.a
                href="mailto:mniwal@gmail.com"
                whileHover={{ scale: 1.05 }}
                className="flex items-center gap-3 px-7 py-3.5 bg-white/15 hover:bg-white/25 border border-white/30 rounded-full text-white font-sans text-sm tracking-wide transition-all duration-300"
              >
                <FaEnvelope className="text-lg" />
                mniwal@gmail.com
              </motion.a>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}



/* ─────────────────────────────────────────────
   PAGE EXPORT
───────────────────────────────────────────── */
export default function HomePage() {
  return (
    <div className="relative min-h-screen w-full overflow-x-hidden">
      <FloatingBlobs />
      <HeroSection />
      <FeaturedArtSection />
      <FindMeSection />
    </div>
  );
}
