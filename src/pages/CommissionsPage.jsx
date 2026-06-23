import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080';

const BG = {
  backgroundImage: "url('/common_bg.jpg')",
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  backgroundAttachment: 'fixed',
};

/* ── Floating Blobs ───────────────────────────────────────── */
function FloatingBlobs() {
  const blobs = [
    { size: 380, x: '3%', y: '8%', delay: 0, color: 'rgba(212,175,55,0.05)' },
    { size: 260, x: '78%', y: '12%', delay: 1.4, color: 'rgba(74,85,74,0.04)' },
    { size: 320, x: '60%', y: '52%', delay: 0.7, color: 'rgba(212,175,55,0.04)' },
    { size: 200, x: '18%', y: '72%', delay: 2.0, color: 'rgba(180,160,130,0.05)' },
    { size: 280, x: '85%', y: '78%', delay: 1.1, color: 'rgba(74,85,74,0.03)' },
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
            y: [-12, 12, -12], x: [-7, 7, -7],
          }}
          transition={{ duration: 13 + i * 2, delay: b.delay, repeat: Infinity, ease: 'easeInOut' }}
        />
      ))}
    </div>
  );
}

/* ── Commission Card ──────────────────────────────────────── */
function CommissionCard({ commission, index }) {
  const imageUrl = `${API_URL}/api/commissions/${commission.id}/image`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.7, delay: index * 0.1, ease: 'easeOut' }}
      whileHover={{ y: -6, transition: { duration: 0.3 } }}
      className="group relative flex flex-col rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-500"
      style={{
        background: 'rgba(255, 255, 255, 0.65)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        border: '1px solid rgba(255,255,255,0.9)',
      }}
    >
      {/* Artwork Image */}
      <div className="relative overflow-hidden aspect-[4/3] bg-stone-100">
        <motion.img
          src={imageUrl}
          alt={`Commission by ${commission.customer_name}`}
          className="w-full h-full object-cover"
          loading="lazy"
          transition={{ duration: 0.5 }}
          whileHover={{ scale: 1.05 }}
          onError={(e) => {
            e.target.style.display = 'none';
            e.target.nextSibling.style.display = 'flex';
          }}
        />
        <div className="hidden w-full h-full items-center justify-center bg-stone-100 text-stone-400 text-sm">
          Image unavailable
        </div>

        {/* Price badge */}
        <div
          className="absolute top-4 right-4 px-3 py-1.5 rounded-full text-sm font-sans font-semibold text-[#1B2621]"
          style={{
            background: 'rgba(255,255,255,0.85)',
            backdropFilter: 'blur(12px)',
            border: '1px solid rgba(212,175,55,0.4)',
          }}
        >
          ₹{Number(commission.price).toLocaleString('en-IN')}
        </div>
      </div>

      {/* Card Body */}
      <div className="flex flex-col flex-1 p-6 gap-4">
        {/* Review */}
        <div className="flex-1">
          <div
            className="rounded-2xl p-4"
            style={{ background: 'rgba(27,38,33,0.04)', border: '1px solid rgba(27,38,33,0.07)' }}
          >
            {/* Quote mark */}
            <span className="font-serif text-4xl leading-none text-[#D4AF37]/60 select-none">"</span>
            <p className="font-sans text-sm text-[#1B2621]/80 leading-relaxed -mt-2 italic">
              {commission.review}
            </p>
          </div>
        </div>

        {/* Attribution */}
        <div className="flex items-center justify-between">
          <div>
            <p className="font-serif text-base text-[#1B2621] font-medium">
              — {commission.customer_name}
            </p>
            <p className="font-sans text-xs text-stone-400 mt-0.5 tracking-wide">
              {new Date(commission.created_at).toLocaleDateString('en-IN', {
                day: 'numeric', month: 'long', year: 'numeric',
              })}
            </p>
          </div>
          <div className="w-8 h-8 rounded-full bg-[#D4AF37]/10 flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-[#D4AF37]" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
            </svg>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

/* ── Empty State ──────────────────────────────────────────── */
function EmptyState() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
      className="flex flex-col items-center justify-center py-28 text-center"
    >
      <div
        className="rounded-3xl p-12 flex flex-col items-center gap-4 max-w-md"
        style={{
          background: 'rgba(255,255,255,0.6)',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(255,255,255,0.9)',
        }}
      >
        <div className="w-16 h-16 rounded-full bg-[#D4AF37]/10 flex items-center justify-center mb-2">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-[#D4AF37]/60" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
          </svg>
        </div>
        <h3 className="font-serif text-2xl text-[#1B2621]">No Commissions Yet</h3>
        <p className="font-sans text-sm text-[#4A554A] leading-relaxed">
          Completed commissions will appear here as they become available.
        </p>
      </div>
    </motion.div>
  );
}

/* ── Skeleton Loading ─────────────────────────────────────── */
function SkeletonCard() {
  return (
    <div
      className="rounded-3xl overflow-hidden animate-pulse"
      style={{ background: 'rgba(255,255,255,0.5)', border: '1px solid rgba(255,255,255,0.8)' }}
    >
      <div className="aspect-[4/3] bg-stone-200/70" />
      <div className="p-6 space-y-3">
        <div className="h-20 bg-stone-200/60 rounded-xl" />
        <div className="h-4 bg-stone-200/60 rounded w-2/3" />
      </div>
    </div>
  );
}

/* ── Page Export ──────────────────────────────────────────── */
export default function CommissionsPage() {
  const [commissions, setCommissions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_URL}/api/commissions`)
      .then(res => { if (!res.ok) throw new Error(); return res.json(); })
      .then(data => setCommissions(data || []))
      .catch(() => setCommissions([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="relative min-h-screen w-full overflow-x-hidden" style={BG}>
      {/* Cream overlay */}
      <div className="fixed inset-0 bg-white/75 z-0 pointer-events-none" />

      <FloatingBlobs />

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 pt-36 pb-24">
        {/* ── Hero ─────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: 'easeOut' }}
          className="text-center mb-20 flex flex-col items-center gap-5"
        >
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-xs font-sans uppercase tracking-[0.4em] text-stone-400"
          >
            Mrunalini Niwal · Collector Stories
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.1 }}
            className="font-serif text-6xl md:text-8xl font-bold text-[#1B2621] leading-none tracking-tight"
          >
            Collected<br />
            <span className="text-[#4A554A]">With Love</span>
          </motion.h1>

          <motion.div
            initial={{ scaleX: 0 }} animate={{ scaleX: 1 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="w-20 h-0.5 bg-[#D4AF37] origin-center"
          />

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, delay: 0.45 }}
            className="font-sans text-lg md:text-xl text-[#4A554A] font-light leading-relaxed max-w-2xl"
          >
            Every commissioned piece carries a story, a connection, and a place in someone's home.
            Here are some of the artworks that have found their forever owners.
          </motion.p>
        </motion.div>

        {/* ── Grid ─────────────────────────────────────────── */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map(i => <SkeletonCard key={i} />)}
          </div>
        ) : commissions.length === 0 ? (
          <EmptyState />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
            {commissions.map((commission, i) => (
              <CommissionCard key={commission.id} commission={commission} index={i} />
            ))}
          </div>
        )}

        {/* ── Closing CTA ───────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.9 }}
          className="flex flex-col items-center gap-8 mt-28 text-center"
        >
          <div className="w-px h-14 bg-stone-300" />
          <p className="font-serif text-2xl md:text-3xl text-[#1B2621] leading-relaxed font-medium max-w-2xl italic">
            "Each painting is a gift—created with love, received with joy."
          </p>
          <div className="flex items-center gap-4">
            <div className="w-10 h-px bg-stone-300" />
            <div className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]" />
            <div className="w-10 h-px bg-stone-300" />
          </div>
          <p className="font-sans text-sm text-stone-500 tracking-wide">— Mrunalini Niwal</p>

          <div className="flex flex-col sm:flex-row gap-4 mt-4">
            <Link
              to="/contact"
              className="px-8 py-3.5 bg-[#1B2621] text-white text-sm uppercase tracking-widest font-sans rounded-sm hover:bg-[#2e3e36] transition-colors duration-300 shadow-md hover:shadow-lg"
            >
              Commission a Piece
            </Link>
            <Link
              to="/art"
              className="px-8 py-3.5 border border-[#1B2621]/40 text-[#1B2621] text-sm uppercase tracking-widest font-sans rounded-sm hover:border-[#1B2621] hover:bg-stone-50 transition-colors duration-300"
            >
              Explore the Gallery
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
