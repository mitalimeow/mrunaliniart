import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

/* ─────────────────────────────────────────────
   Image list — p1.png through p16.png
───────────────────────────────────────────── */
const allImages = Array.from({ length: 16 }, (_, i) => `/p${i + 1}.png`);

/* Distribute images across 5 rows */
const rows = [
  [allImages[0],  allImages[1],  allImages[2],  allImages[3]],
  [allImages[4],  allImages[5],  allImages[6],  allImages[7]],
  [allImages[8],  allImages[9],  allImages[10], allImages[11]],
  [allImages[12], allImages[13], allImages[14], allImages[15]],
  [allImages[0],  allImages[4],  allImages[8],  allImages[12]], // curated mix for row 5
];

/* ─────────────────────────────────────────────
   Floating blobs (same as homepage)
───────────────────────────────────────────── */
function FloatingBlobs() {
  const blobs = [
    { size: 340, x: '5%',  y: '10%', delay: 0,   color: 'rgba(212,175,55,0.06)' },
    { size: 240, x: '80%', y: '8%',  delay: 1.2, color: 'rgba(74,85,74,0.05)'  },
    { size: 300, x: '65%', y: '45%', delay: 0.6, color: 'rgba(212,175,55,0.04)' },
    { size: 180, x: '15%', y: '70%', delay: 1.8, color: 'rgba(180,160,130,0.06)' },
    { size: 260, x: '88%', y: '75%', delay: 1,   color: 'rgba(74,85,74,0.04)'  },
  ];
  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden z-0">
      {blobs.map((b, i) => (
        <motion.div
          key={i}
          style={{
            width: b.size, height: b.size,
            left: b.x, top: b.y,
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
            y: [-10, 10, -10],
            x: [-6, 6, -6],
          }}
          transition={{ duration: 12 + i * 2, delay: b.delay, repeat: Infinity, ease: 'easeInOut' }}
        />
      ))}
    </div>
  );
}

/* ─────────────────────────────────────────────
   Infinite Carousel Row
───────────────────────────────────────────── */
function InfiniteCarouselRow({ images, direction = 1, speed = 60, rowIndex }) {
  const [paused, setPaused] = useState(false);
  // Triplicate for seamless looping
  const looped = [...images, ...images, ...images];
  const cardW = 340; // px
  const gap    = 24;
  const totalW = images.length * (cardW + gap);

  return (
    <motion.div
      className="w-full overflow-hidden cursor-pointer select-none"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.7, delay: rowIndex * 0.12 }}
      onClick={() => setPaused(p => !p)}
      title={paused ? 'Click to resume' : 'Click to pause'}
    >
      {/* Pause badge */}
      {paused && (
        <div className="absolute right-6 z-20 mt-2">
          <span className="text-[10px] font-sans uppercase tracking-widest text-[#1B2621]/50 bg-white/60 px-3 py-1 rounded-full backdrop-blur-sm">
            Paused — click to resume
          </span>
        </div>
      )}

      <motion.div
        className="flex"
        style={{ gap: `${gap}px` }}
        animate={{ x: direction === 1 ? [-totalW, 0] : [0, -totalW] }}
        transition={{
          duration: speed,
          ease: 'linear',
          repeat: Infinity,
        }}
        // pause via CSS animation-play-state trick through inline style
        {...(paused ? { style: { animationPlayState: 'paused' } } : {})}
      >
        {looped.map((src, i) => (
          <motion.div
            key={i}
            className="flex-shrink-0 relative overflow-hidden rounded-2xl shadow-md bg-white/80"
            style={{ width: cardW }}
            whileHover={{ scale: 1.04, boxShadow: '0 20px 60px rgba(27,38,33,0.18)' }}
            transition={{ duration: 0.3 }}
          >
            <img
              src={src}
              alt={`Artwork ${(i % images.length) + 1}`}
              loading="lazy"
              className="w-full h-[260px] object-cover"
              draggable={false}
            />
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
}

/* ─────────────────────────────────────────────
   Hero Header
───────────────────────────────────────────── */
function ArtHero() {
  return (
    <section className="relative w-full pt-40 pb-16 text-center z-10">
      <div className="max-w-4xl mx-auto px-6 flex flex-col items-center gap-6">
        <motion.p
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-xs font-sans uppercase tracking-[0.35em] text-stone-500"
        >
          Mrunalini Niwali · Gallery
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.1 }}
          className="font-serif text-6xl md:text-8xl font-bold text-[#1B2621] leading-none tracking-tight"
        >
          A Canvas of<br />
          <span className="text-[#4A554A]">Stories</span>
        </motion.h1>

        <motion.div
          initial={{ scaleX: 0 }} animate={{ scaleX: 1 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="w-20 h-0.5 bg-[#D4AF37] origin-center"
        />

        <motion.p
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, delay: 0.45 }}
          className="font-sans text-lg md:text-xl text-[#4A554A] font-light leading-relaxed max-w-2xl"
        >
          Each piece is a reflection of nature's beauty, the spirit of animals, and the emotions that connect us all.
        </motion.p>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   Gallery Section
───────────────────────────────────────────── */
const rowSpeeds  = [55, 70, 50, 65, 58];
const rowDirections = [1, -1, 1, -1, 1];

function GallerySection() {
  return (
    <section className="relative z-10 w-full py-8 flex flex-col gap-6">
      <p className="text-center text-xs font-sans text-stone-400 tracking-widest uppercase mb-2">
        Click any row to pause · Click again to continue
      </p>
      {rows.map((rowImages, i) => (
        <InfiniteCarouselRow
          key={i}
          images={rowImages}
          direction={rowDirections[i]}
          speed={rowSpeeds[i]}
          rowIndex={i}
        />
      ))}
    </section>
  );
}

/* ─────────────────────────────────────────────
   Closing Quote
───────────────────────────────────────────── */
function ClosingSection() {
  return (
    <section className="relative z-10 w-full py-28 text-center">
      <div className="max-w-3xl mx-auto px-6 flex flex-col items-center gap-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.9 }}
          className="flex flex-col items-center gap-6"
        >
          <div className="w-px h-16 bg-stone-300" />
          <p className="font-serif text-2xl md:text-3xl text-[#1B2621] leading-relaxed font-medium max-w-2xl italic">
            "Art has the power to preserve a moment, tell a story, and inspire a feeling long after the brush has left the canvas."
          </p>
          <div className="flex items-center gap-4">
            <div className="w-12 h-px bg-stone-300" />
            <div className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]" />
            <div className="w-12 h-px bg-stone-300" />
          </div>
          <p className="font-sans text-sm text-stone-500 tracking-wide">— Mrunalini Niwali</p>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex flex-col sm:flex-row gap-4 mt-4"
        >
          <Link
            to="/commissions"
            className="px-8 py-3.5 bg-[#1B2621] text-white text-sm uppercase tracking-widest font-sans rounded-sm hover:bg-[#2e3e36] transition-colors duration-300 shadow-md hover:shadow-lg"
          >
            Commission a Piece
          </Link>
          <Link
            to="/about-me"
            className="px-8 py-3.5 border border-[#1B2621]/40 text-[#1B2621] text-sm uppercase tracking-widest font-sans rounded-sm hover:border-[#1B2621] hover:bg-stone-50 transition-colors duration-300"
          >
            About the Artist
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   Footer
───────────────────────────────────────────── */
function ArtFooter() {
  return (
    <footer className="relative z-10 w-full py-10 border-t border-stone-200 text-center bg-white/40 backdrop-blur-sm flex flex-col items-center gap-2">
      <p className="font-sans text-sm text-[#1B2621]/50 tracking-wide">
        © 2026 Mrunalini Niwali
      </p>
      <p className="font-sans text-xs text-[#4A554A]/40 italic">
        Inspired by nature. Created with heart.
      </p>
    </footer>
  );
}

/* ─────────────────────────────────────────────
   Page Export
───────────────────────────────────────────── */
export default function ArtPage() {
  return (
    <div
      className="relative min-h-screen w-full overflow-x-hidden"
      style={{
        backgroundImage: "url('/common_bg.jpg')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
      }}
    >
      {/* Cream overlay */}
      <div className="fixed inset-0 bg-white/78 z-0 pointer-events-none" />

      <FloatingBlobs />
      <ArtHero />
      <GallerySection />
      <ClosingSection />
      <ArtFooter />
    </div>
  );
}
