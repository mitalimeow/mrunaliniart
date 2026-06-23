import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080';
const MAX_SIZE = 100 * 1024; // 100 KB

function Toast({ message, type, onClose }) {
  useEffect(() => {
    const t = setTimeout(onClose, 4000);
    return () => clearTimeout(t);
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className={`fixed bottom-6 right-6 z-50 px-5 py-3 rounded-xl shadow-2xl text-sm font-medium flex items-center gap-2 ${
        type === 'error'
          ? 'bg-red-900/80 text-red-200 border border-red-500/30'
          : 'bg-emerald-900/80 text-emerald-200 border border-emerald-500/30'
      }`}
      style={{ backdropFilter: 'blur(12px)' }}
    >
      {type === 'error' ? '✕' : '✓'} {message}
    </motion.div>
  );
}

export default function AdminArtPage() {
  const [artworks, setArtworks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [deletingId, setDeletingId] = useState(null);
  const [toast, setToast] = useState(null);
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef(null);

  const showToast = (message, type = 'success') => setToast({ message, type });

  const fetchArtworks = () => {
    fetch(`${API_URL}/api/admin/art`, { credentials: 'include' })
      .then(res => res.json())
      .then(data => setArtworks(data || []))
      .catch(() => showToast('Failed to load artworks.', 'error'))
      .finally(() => setLoading(false));
  };

  useEffect(() => { fetchArtworks(); }, []);

  const handleFile = async (file) => {
    if (!file) return;

    // Frontend validation
    const allowedTypes = ['image/png', 'image/jpeg'];
    if (!allowedTypes.includes(file.type)) {
      showToast('Only PNG and JPEG images are accepted.', 'error');
      return;
    }
    if (file.size > MAX_SIZE) {
      showToast('Only upload images smaller than 100 KB.', 'error');
      return;
    }

    setUploading(true);
    const formData = new FormData();
    formData.append('image', file);

    try {
      const res = await fetch(`${API_URL}/api/admin/art`, {
        method: 'POST',
        credentials: 'include',
        body: formData,
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({ error: 'Upload failed.' }));
        showToast(err.error || 'Upload failed.', 'error');
        return;
      }
      const data = await res.json();
      setArtworks(prev => [
        { id: data.id, filename: data.filename, filepath: data.filepath, created_at: new Date().toISOString() },
        ...prev,
      ]);
      showToast('Artwork uploaded successfully.');
    } catch {
      showToast('Network error. Please try again.', 'error');
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const handleInputChange = (e) => handleFile(e.target.files[0]);

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    handleFile(e.dataTransfer.files[0]);
  };

  const handleDelete = async (id) => {
    setDeletingId(id);
    try {
      await fetch(`${API_URL}/api/admin/art/${id}`, {
        method: 'DELETE',
        credentials: 'include',
      });
      setArtworks(prev => prev.filter(a => a.id !== id));
      showToast('Artwork deleted successfully.');
    } catch {
      showToast('Failed to delete artwork.', 'error');
    } finally {
      setDeletingId(null);
    }
  };

  const backendBase = API_URL;

  return (
    <div className="p-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <h1 className="font-serif text-3xl text-amber-100 mb-1">Art Management</h1>
        <p className="text-amber-200/50 text-sm">Upload and manage your portfolio artworks</p>
      </motion.div>

      {/* Upload Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.5 }}
        className="rounded-2xl p-6 mb-8"
        style={{
          background: 'rgba(255,255,255,0.06)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          border: '1px solid rgba(212, 175, 55, 0.15)',
        }}
      >
        <h2 className="font-serif text-xl text-amber-200 mb-4">Upload New Artwork</h2>

        <div
          onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
          onDragLeave={() => setDragOver(false)}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className={`relative border-2 border-dashed rounded-xl p-10 text-center cursor-pointer transition-all duration-300 ${
            dragOver
              ? 'border-amber-300/70 bg-amber-300/10'
              : 'border-amber-300/20 hover:border-amber-300/40 hover:bg-white/5'
          }`}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept=".png,.jpg,.jpeg"
            onChange={handleInputChange}
            className="hidden"
            id="artwork-upload"
          />

          {uploading ? (
            <div className="flex flex-col items-center gap-3">
              <div className="w-10 h-10 border-2 border-amber-300/60 border-t-transparent rounded-full animate-spin" />
              <p className="text-amber-200/60 text-sm">Uploading…</p>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-amber-300/10 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-amber-300/70" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5" />
                </svg>
              </div>
              <div>
                <p className="text-amber-100/80 text-sm font-medium">Drop an image here or click to browse</p>
                <p className="text-amber-200/40 text-xs mt-1">PNG or JPEG · Maximum 100 KB</p>
              </div>
            </div>
          )}
        </div>
      </motion.div>

      {/* Gallery Grid */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        <h2 className="font-serif text-xl text-amber-200 mb-4">
          Uploaded Artworks
          {artworks.length > 0 && (
            <span className="ml-2 text-sm font-sans text-amber-300/40">({artworks.length})</span>
          )}
        </h2>

        {loading ? (
          <div className="flex items-center justify-center py-16">
            <div className="w-8 h-8 border-2 border-amber-300/60 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : artworks.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <p className="text-amber-100/40 font-serif text-lg">No artworks uploaded yet</p>
            <p className="text-amber-200/25 text-sm mt-1">Upload your first artwork above</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            <AnimatePresence>
              {artworks.map((art, i) => (
                <motion.div
                  key={art.id}
                  initial={{ opacity: 0, scale: 0.92 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.88 }}
                  transition={{ delay: i * 0.04, duration: 0.3 }}
                  className="group relative rounded-xl overflow-hidden"
                  style={{
                    background: 'rgba(255,255,255,0.05)',
                    border: '1px solid rgba(212, 175, 55, 0.12)',
                  }}
                >
                  {/* Thumbnail */}
                  <div className="aspect-square overflow-hidden bg-black/20">
                    <img
                      src={`${backendBase}${art.filepath}`}
                      alt={art.filename}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.nextSibling.style.display = 'flex';
                      }}
                    />
                    <div className="hidden w-full h-full items-center justify-center text-amber-300/30 text-xs">
                      Image unavailable
                    </div>
                  </div>

                  {/* Info */}
                  <div className="p-3">
                    <p className="text-amber-100/80 text-xs font-medium truncate" title={art.filename}>
                      {art.filename}
                    </p>
                    <p className="text-amber-300/35 text-xs mt-0.5">
                      {new Date(art.created_at).toLocaleDateString('en-IN', { dateStyle: 'medium' })}
                    </p>
                  </div>

                  {/* Delete overlay */}
                  <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    <button
                      onClick={() => handleDelete(art.id)}
                      disabled={deletingId === art.id}
                      className="w-8 h-8 rounded-lg bg-red-900/70 backdrop-blur-sm flex items-center justify-center text-red-300 hover:bg-red-800/80 transition-colors disabled:opacity-50"
                      title="Delete artwork"
                    >
                      {deletingId === art.id ? (
                        <div className="w-3 h-3 border border-red-300/50 border-t-transparent rounded-full animate-spin" />
                      ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                        </svg>
                      )}
                    </button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </motion.div>

      {/* Toast */}
      <AnimatePresence>
        {toast && (
          <Toast
            key={toast.message}
            message={toast.message}
            type={toast.type}
            onClose={() => setToast(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
