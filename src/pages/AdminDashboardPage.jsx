import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { FaTrash, FaChevronDown, FaChevronUp, FaSignOutAlt } from 'react-icons/fa';

const BG = {
  backgroundImage: "url('/common_bg.jpg')",
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  backgroundAttachment: 'fixed',
};

const PAGE_SIZE = 6;

function formatDate(iso) {
  return new Date(iso).toLocaleDateString('en-IN', {
    day: 'numeric', month: 'short', year: 'numeric',
    hour: '2-digit', minute: '2-digit',
  });
}

/* ── Delete Confirmation Modal ──────────────────────────────── */
function DeleteModal({ onCancel, onConfirm }) {
  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center px-4"
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
    >
      <div className="absolute inset-0 bg-[#1B2621]/60 backdrop-blur-sm" onClick={onCancel} />
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="relative z-10 bg-white rounded-2xl shadow-2xl p-8 max-w-sm w-full flex flex-col gap-6 text-center"
      >
        <div className="w-12 h-12 rounded-full bg-red-50 flex items-center justify-center mx-auto">
          <FaTrash className="text-red-400 text-lg" />
        </div>
        <div>
          <h3 className="font-serif text-xl text-[#1B2621] font-bold">Delete Enquiry?</h3>
          <p className="font-sans text-sm text-stone-500 mt-2">This action cannot be undone.</p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={onCancel}
            className="flex-1 py-3 border border-stone-200 rounded-xl font-sans text-sm text-stone-600 hover:bg-stone-50 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 py-3 bg-red-500 text-white rounded-xl font-sans text-sm hover:bg-red-600 transition-colors"
          >
            Delete
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ── Enquiry Card ───────────────────────────────────────────── */
function EnquiryCard({ enquiry, onDelete }) {
  const [expanded, setExpanded] = useState(false);
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <AnimatePresence>{showModal && (
        <DeleteModal onCancel={() => setShowModal(false)} onConfirm={() => { setShowModal(false); onDelete(enquiry.id); }} />
      )}</AnimatePresence>

      <motion.div
        layout
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95 }}
        whileHover={{ y: -3, boxShadow: '0 16px 40px rgba(27,38,33,0.12)' }}
        transition={{ duration: 0.3 }}
        className="bg-white/60 backdrop-blur-lg border border-white/80 rounded-2xl shadow-md overflow-hidden"
      >
        <div className="p-6 flex flex-col gap-4">
          {/* Header row */}
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="font-serif text-lg font-bold text-[#1B2621]">{enquiry.sender_name}</p>
              <a href={`mailto:${enquiry.sender_email}`} className="font-sans text-xs text-[#4A554A] hover:text-[#D4AF37] transition-colors">
                {enquiry.sender_email}
              </a>
            </div>
            <span className="flex-shrink-0 font-sans text-[10px] text-stone-400 mt-1">{formatDate(enquiry.submitted_at)}</span>
          </div>

          {/* Message preview / full */}
          <AnimatePresence mode="wait">
            {!expanded ? (
              <motion.p
                key="preview"
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                className="font-sans text-sm text-[#4A554A] leading-relaxed line-clamp-3"
              >
                {enquiry.message.length > 120 ? enquiry.message.slice(0, 120) + '…' : enquiry.message}
              </motion.p>
            ) : (
              <motion.p
                key="full"
                initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}
                className="font-sans text-sm text-[#4A554A] leading-relaxed whitespace-pre-wrap"
              >
                {enquiry.message}
              </motion.p>
            )}
          </AnimatePresence>

          {/* Actions */}
          <div className="flex items-center gap-3 pt-1 border-t border-stone-100">
            <button
              onClick={() => setExpanded(e => !e)}
              className="flex items-center gap-1.5 font-sans text-xs uppercase tracking-widest text-[#1B2621] hover:text-[#D4AF37] transition-colors"
            >
              {expanded ? <FaChevronUp className="text-[10px]" /> : <FaChevronDown className="text-[10px]" />}
              {expanded ? 'Collapse' : 'Expand'}
            </button>
            <div className="flex-1" />
            <button
              onClick={() => setShowModal(true)}
              className="flex items-center gap-1.5 font-sans text-xs uppercase tracking-widest text-red-400 hover:text-red-600 transition-colors"
            >
              <FaTrash className="text-[10px]" />
              Delete
            </button>
          </div>
        </div>
      </motion.div>
    </>
  );
}

/* ── Main Dashboard ─────────────────────────────────────────── */
export default function AdminDashboardPage() {
  const navigate = useNavigate();
  const [enquiries, setEnquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [visible, setVisible] = useState(PAGE_SIZE);
  const [loggingOut, setLoggingOut] = useState(false);

  useEffect(() => {
    const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080';
    
    // Guard — verify session before loading
    fetch(`${API_URL}/api/admin/status`, { credentials: 'include' })
      .then(res => { if (!res.ok) throw new Error(); })
      .catch(() => navigate('/mniwal-admin', { replace: true }));

    fetch(`${API_URL}/api/admin/enquiries`, { credentials: 'include' })
      .then(async res => { 
        if (!res.ok) {
           if (res.status === 401 || res.status === 403) throw new Error('AuthError');
           throw new Error('ServerError');
        }
        return res.json(); 
      })
      .then(data => setEnquiries(data || []))
      .catch((err) => {
        if (err.message === 'AuthError') navigate('/mniwal-admin', { replace: true });
        else console.error('Dashboard data failed to load.');
      })
      .finally(() => setLoading(false));
  }, [navigate]);

  const handleDelete = async (id) => {
    try {
      const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080';
      await fetch(`${API_URL}/api/admin/enquiries/${id}`, {
        method: 'DELETE',
        credentials: 'include',
      });
      setEnquiries(prev => prev.filter(e => e.id !== id));
    } catch {
      alert('Failed to delete. Please try again.');
    }
  };

  const handleLogout = async () => {
    setLoggingOut(true);
    try {
      const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080';
      await fetch(`${API_URL}/api/admin/logout`, { method: 'POST', credentials: 'include' });
    } catch {}
    navigate('/mniwal-admin', { replace: true });
  };

  return (
    <div className="relative min-h-screen w-full overflow-x-hidden" style={BG}>
      <div className="fixed inset-0 bg-white/80 z-0 pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 pt-12 pb-24">

        {/* ── Page Header ─────────────── */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex items-start justify-between mb-12 flex-wrap gap-4"
        >
          <div>
            <p className="text-xs font-sans uppercase tracking-[0.35em] text-stone-400 mb-2">Private Dashboard</p>
            <h1 className="font-serif text-5xl font-bold text-[#1B2621]">Enquiries</h1>
            <p className="font-sans text-sm text-[#4A554A] mt-1">Messages received from visitors.</p>
          </div>

          <motion.button
            onClick={handleLogout}
            disabled={loggingOut}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            className="flex items-center gap-2 px-5 py-2.5 border border-[#1B2621]/30 text-[#1B2621] text-xs uppercase tracking-widest font-sans rounded-xl hover:bg-[#1B2621] hover:text-white transition-all duration-300"
          >
            <FaSignOutAlt />
            {loggingOut ? 'Logging out…' : 'Logout'}
          </motion.button>
        </motion.div>

        {/* ── Content ─────────────────── */}
        {loading ? (
          <div className="flex justify-center items-center py-32">
            <AiOutlineLoading3Quarters className="text-4xl text-[#1B2621] animate-spin" />
          </div>
        ) : enquiries.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/60 backdrop-blur-lg border border-white/80 rounded-2xl shadow-md p-16 text-center flex flex-col items-center gap-4"
          >
            <p className="font-serif text-2xl text-[#1B2621]">No enquiries yet.</p>
            <p className="font-sans text-sm text-stone-400">Messages from visitors will appear here.</p>
          </motion.div>
        ) : (
          <>
            <motion.div
              layout
              className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
            >
              <AnimatePresence>
                {enquiries.slice(0, visible).map((eq, i) => (
                  <motion.div
                    key={eq.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                  >
                    <EnquiryCard enquiry={eq} onDelete={handleDelete} />
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>

            {/* Load more */}
            {visible < enquiries.length && (
              <div className="flex justify-center mt-10">
                <motion.button
                  onClick={() => setVisible(v => v + PAGE_SIZE)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                  className="px-8 py-3.5 border border-[#1B2621]/30 text-[#1B2621] text-xs uppercase tracking-widest font-sans rounded-xl hover:bg-[#1B2621] hover:text-white transition-all duration-300"
                >
                  Load More ({enquiries.length - visible} remaining)
                </motion.button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
