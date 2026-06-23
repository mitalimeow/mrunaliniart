import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080';

/* ── Toast ─────────────────────────────────────────────── */
function Toast({ message, type, onClose }) {
  useEffect(() => { const t = setTimeout(onClose, 4000); return () => clearTimeout(t); }, [onClose]);
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }}
      className={`fixed bottom-6 right-6 z-50 px-5 py-3 rounded-xl shadow-2xl text-sm font-medium flex items-center gap-2 ${
        type === 'error' ? 'bg-red-900/80 text-red-200 border border-red-500/30' : 'bg-emerald-900/80 text-emerald-200 border border-emerald-500/30'
      }`}
      style={{ backdropFilter: 'blur(12px)' }}
    >
      {type === 'error' ? '✕' : '✓'} {message}
    </motion.div>
  );
}

/* ── Modal ─────────────────────────────────────────────── */
function Modal({ title, message, onConfirm, onCancel, confirmText = 'Confirm', isDestructive = false }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onCancel} />
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 10 }} animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 10 }}
        className="relative w-full max-w-sm rounded-2xl p-6 shadow-2xl"
        style={{ background: 'rgba(27,38,33,0.95)', border: '1px solid rgba(212,175,55,0.2)' }}
      >
        <h3 className="font-serif text-xl text-amber-100 mb-2">{title}</h3>
        <p className="text-amber-200/60 text-sm mb-6">{message}</p>
        <div className="flex items-center justify-end gap-3">
          <button onClick={onCancel} className="px-4 py-2 rounded-lg text-sm font-medium text-amber-100/60 hover:text-amber-100 hover:bg-white/5 transition-colors">
            Cancel
          </button>
          <button onClick={onConfirm}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              isDestructive ? 'bg-red-900/80 text-red-200 hover:bg-red-800' : 'bg-amber-600/80 text-amber-100 hover:bg-amber-500/80'
            }`}
          >
            {confirmText}
          </button>
        </div>
      </motion.div>
    </div>
  );
}

/* ── Commission Card (admin) ───────────────────────────── */
function AdminCommissionCard({ commission, onDelete, isDeleting }) {
  const [expanded, setExpanded] = useState(false);
  const imageUrl = `${API_URL}/api/commissions/${commission.id}/image`;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.3 }}
      className="rounded-2xl overflow-hidden"
      style={{
        background: 'rgba(255,255,255,0.06)',
        backdropFilter: 'blur(16px)',
        border: '1px solid rgba(212,175,55,0.15)',
      }}
    >
      {/* Thumbnail */}
      <div className="relative aspect-[4/3] overflow-hidden bg-black/20">
        <img
          src={imageUrl}
          alt={commission.image_filename}
          className="w-full h-full object-cover"
          loading="lazy"
          onError={(e) => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'flex'; }}
        />
        <div className="hidden w-full h-full items-center justify-center text-amber-300/30 text-xs">Image unavailable</div>

        {/* Price badge */}
        <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full text-xs font-semibold bg-black/60 text-amber-200 backdrop-blur-sm">
          ₹{Number(commission.price).toLocaleString('en-IN')}
        </div>
      </div>

      {/* Info */}
      <div className="p-4">
        <div className="flex items-start justify-between mb-2">
          <div>
            <p className="font-serif text-amber-100 font-medium">{commission.customer_name}</p>
            <p className="text-amber-300/40 text-xs mt-0.5">
              {new Date(commission.created_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}
            </p>
          </div>
          <button
            onClick={() => setExpanded(e => !e)}
            className="text-amber-300/50 hover:text-amber-200 transition-colors p-1"
            title={expanded ? 'Collapse' : 'Expand'}
          >
            <motion.svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"
              animate={{ rotate: expanded ? 180 : 0 }} transition={{ duration: 0.2 }}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
            </motion.svg>
          </button>
        </div>

        <p className={`text-amber-100/60 text-sm leading-relaxed italic ${expanded ? '' : 'line-clamp-2'}`}>
          "{commission.review}"
        </p>

        <AnimatePresence>
          {expanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25 }}
              className="overflow-hidden"
            >
              <div className="mt-3 pt-3 border-t border-amber-300/10 space-y-1 text-xs text-amber-200/40">
                <p>File: {commission.image_filename}</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Delete */}
        <button
          onClick={onDelete}
          disabled={isDeleting}
          className="mt-4 w-full py-2 rounded-lg text-xs font-medium text-red-300/70 hover:text-red-300 hover:bg-red-900/20 border border-red-500/10 hover:border-red-500/25 transition-all duration-200 disabled:opacity-40"
        >
          {isDeleting ? 'Deleting...' : 'Delete'}
        </button>
      </div>
    </motion.div>
  );
}

/* ── Input shared styles ───────────────────────────────── */
const inputCls = 'w-full px-4 py-3 rounded-xl text-sm text-amber-100 placeholder-amber-300/30 focus:outline-none focus:ring-1 focus:ring-amber-300/30 transition-all';
const inputStyle = {
  background: 'rgba(255,255,255,0.06)',
  border: '1px solid rgba(212,175,55,0.2)',
};

/* ── Page ─────────────────────────────────────────────── */
export default function AdminCommissionsPage() {
  const [commissions, setCommissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [deletingId, setDeletingId] = useState(null);
  const [deleteModal, setDeleteModal] = useState(null);
  const [toast, setToast] = useState(null);

  const [form, setForm] = useState({ customer_name: '', review: '', price: '' });
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const fileRef = useRef(null);

  const showToast = (message, type = 'success') => setToast({ message, type });

  const fetchCommissions = () => {
    fetch(`${API_URL}/api/admin/commissions`, { credentials: 'include' })
      .then(res => res.json())
      .then(data => setCommissions(data || []))
      .catch(() => showToast('Failed to load commissions.', 'error'))
      .finally(() => setLoading(false));
  };

  useEffect(() => { fetchCommissions(); }, []);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!imageFile || !form.customer_name || !form.review || !form.price) {
      showToast('All fields including an image are required.', 'error');
      return;
    }
    setSubmitting(true);
    const fd = new FormData();
    fd.append('image', imageFile);
    fd.append('customer_name', form.customer_name);
    fd.append('review', form.review);
    fd.append('price', form.price);

    try {
      const res = await fetch(`${API_URL}/api/admin/commissions`, { method: 'POST', credentials: 'include', body: fd });
      if (!res.ok) {
        const err = await res.json().catch(() => ({ error: 'Upload failed.' }));
        showToast(err.error || 'Upload failed.', 'error');
        return;
      }
      const data = await res.json();
      setCommissions(prev => [{
        id: data.id,
        customer_name: form.customer_name,
        review: form.review,
        price: parseFloat(form.price),
        image_filename: imageFile.name,
        created_at: new Date().toISOString(),
      }, ...prev]);
      setForm({ customer_name: '', review: '', price: '' });
      setImageFile(null);
      setImagePreview(null);
      if (fileRef.current) fileRef.current.value = '';
      showToast('Commission added successfully.');
    } catch {
      showToast('Network error. Please try again.', 'error');
    } finally {
      setSubmitting(false);
    }
  };

  const confirmDelete = (id) => {
    setDeleteModal({
      onConfirm: async () => {
        setDeleteModal(null);
        setDeletingId(id);
        try {
          const res = await fetch(`${API_URL}/api/admin/commissions/${id}`, { method: 'DELETE', credentials: 'include' });
          if (!res.ok) throw new Error();
          setCommissions(prev => prev.filter(c => c.id !== id));
          showToast('Commission deleted successfully.');
        } catch {
          showToast('Failed to delete commission.', 'error');
        } finally {
          setDeletingId(null);
        }
      }
    });
  };

  return (
    <div className="p-8">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: -16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="mb-8">
        <h1 className="font-serif text-3xl text-amber-100 mb-1">Commission Management</h1>
        <p className="text-amber-200/50 text-sm">Manage sold artwork and collector testimonials.</p>
      </motion.div>

      {/* Add Commission Form */}
      <motion.div
        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1, duration: 0.5 }}
        className="rounded-2xl p-6 mb-8"
        style={{ background: 'rgba(255,255,255,0.06)', backdropFilter: 'blur(16px)', border: '1px solid rgba(212,175,55,0.15)' }}
      >
        <h2 className="font-serif text-xl text-amber-200 mb-1">Add Commission</h2>
        <p className="text-amber-100/50 text-sm mb-5">Record a new sold artwork and collector testimonial.</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Image Upload */}
          <div>
            <label className="text-xs uppercase tracking-widest text-amber-300/50 mb-2 block">Artwork Image</label>
            <div
              onClick={() => fileRef.current?.click()}
              className="border-2 border-dashed border-amber-300/20 hover:border-amber-300/40 rounded-xl p-6 text-center cursor-pointer transition-all duration-200 hover:bg-white/5"
            >
              <input ref={fileRef} type="file" accept=".png,.jpg,.jpeg" className="hidden" onChange={handleImageChange} />
              {imagePreview ? (
                <div className="flex flex-col items-center gap-2">
                  <img src={imagePreview} alt="Preview" className="h-32 object-contain rounded-lg" />
                  <p className="text-amber-200/50 text-xs">{imageFile?.name} · Click to change</p>
                </div>
              ) : (
                <div className="flex flex-col items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-amber-300/30" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5" />
                  </svg>
                  <p className="text-amber-100/50 text-sm">Click to upload PNG or JPEG</p>
                </div>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-xs uppercase tracking-widest text-amber-300/50 mb-2 block">Customer Name</label>
              <input
                type="text" placeholder="e.g. Priya Sharma" value={form.customer_name}
                onChange={e => setForm(f => ({ ...f, customer_name: e.target.value }))}
                className={inputCls} style={inputStyle}
              />
            </div>
            <div>
              <label className="text-xs uppercase tracking-widest text-amber-300/50 mb-2 block">Price (₹)</label>
              <input
                type="number" placeholder="e.g. 8500" value={form.price} min="1"
                onChange={e => setForm(f => ({ ...f, price: e.target.value }))}
                className={inputCls} style={inputStyle}
              />
            </div>
          </div>

          <div>
            <label className="text-xs uppercase tracking-widest text-amber-300/50 mb-2 block">Customer Review</label>
            <textarea
              placeholder="The painting exceeded every expectation..."
              value={form.review}
              onChange={e => setForm(f => ({ ...f, review: e.target.value }))}
              rows={3} className={`${inputCls} resize-none`} style={inputStyle}
            />
          </div>

          <button
            type="submit" disabled={submitting}
            className="w-full py-3 rounded-xl text-sm font-medium text-amber-100 transition-all duration-200 disabled:opacity-50"
            style={{ background: 'rgba(212,175,55,0.2)', border: '1px solid rgba(212,175,55,0.3)' }}
          >
            {submitting ? 'Adding...' : 'Add Commission'}
          </button>
        </form>
      </motion.div>

      {/* Commission Grid */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2, duration: 0.5 }}>
        <h2 className="font-serif text-xl text-amber-200 mb-4">
          All Commissions
          {commissions.length > 0 && <span className="ml-2 text-sm font-sans text-amber-300/40">({commissions.length})</span>}
        </h2>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[1,2,3].map(i => (
              <div key={i} className="rounded-2xl overflow-hidden animate-pulse bg-white/5 border border-white/10">
                <div className="aspect-[4/3] bg-white/10" />
                <div className="p-4 space-y-2">
                  <div className="h-4 bg-white/10 rounded w-1/2" />
                  <div className="h-3 bg-white/5 rounded w-3/4" />
                </div>
              </div>
            ))}
          </div>
        ) : commissions.length === 0 ? (
          <div className="rounded-2xl p-10 text-center" style={{ background: 'rgba(255,255,255,0.03)', border: '1px dashed rgba(212,175,55,0.2)' }}>
            <h3 className="text-amber-100 font-serif text-xl mb-2">No Commissions Yet</h3>
            <p className="text-amber-100/50 text-sm">Add your first commission record using the form above.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <AnimatePresence>
              {commissions.map(c => (
                <AdminCommissionCard
                  key={c.id}
                  commission={c}
                  isDeleting={deletingId === c.id}
                  onDelete={() => confirmDelete(c.id)}
                />
              ))}
            </AnimatePresence>
          </div>
        )}
      </motion.div>

      {/* Delete Modal */}
      <AnimatePresence>
        {deleteModal && (
          <Modal
            title="Delete this commission permanently?"
            message="This will remove the artwork and testimonial. This action cannot be undone."
            isDestructive
            confirmText="Delete"
            onConfirm={deleteModal.onConfirm}
            onCancel={() => setDeleteModal(null)}
          />
        )}
      </AnimatePresence>

      {/* Toast */}
      <AnimatePresence>
        {toast && <Toast key={toast.message} message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
      </AnimatePresence>
    </div>
  );
}
