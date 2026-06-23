import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080';

function EnquiryModal({ enquiry, onClose, onDelete, isDeleting }) {
  if (!enquiry) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 10 }}
        className="relative w-full max-w-lg max-h-[85vh] rounded-2xl p-8 shadow-2xl flex flex-col"
        style={{ background: 'rgba(27,38,33,0.95)', border: '1px solid rgba(212,175,55,0.2)' }}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 text-amber-100/50 hover:text-amber-100 transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <h3 className="font-serif text-2xl text-amber-100 mb-6">Enquiry Details</h3>

        <div className="flex-1 overflow-y-auto space-y-6 pr-2 custom-scrollbar">
          <div>
            <p className="text-xs uppercase tracking-widest text-amber-300/40 mb-1">Name</p>
            <p className="text-amber-100 font-medium break-words">{enquiry.sender_name}</p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-widest text-amber-300/40 mb-1">Email</p>
            <a href={`mailto:${enquiry.sender_email}`} className="text-amber-200/80 hover:text-amber-200 hover:underline break-words">
              {enquiry.sender_email}
            </a>
          </div>
          <div>
            <p className="text-xs uppercase tracking-widest text-amber-300/40 mb-1">Date</p>
            <p className="text-amber-200/60 text-sm">
              {new Date(enquiry.submitted_at).toLocaleString('en-IN', {
                dateStyle: 'long', timeStyle: 'short'
              })}
            </p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-widest text-amber-300/40 mb-2">Message</p>
            <div className="bg-black/20 p-4 rounded-xl border border-white/5">
              <p className="text-amber-100/80 text-sm leading-relaxed whitespace-pre-wrap break-words">
                {enquiry.message}
              </p>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-amber-300/10 flex justify-end gap-4">
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl text-sm font-medium text-amber-100/60 hover:text-amber-100 hover:bg-white/5 transition-colors"
          >
            Close
          </button>
          <button
            onClick={() => onDelete(enquiry.id)}
            disabled={isDeleting}
            className="px-5 py-2.5 rounded-xl text-sm font-medium bg-red-900/40 text-red-300 hover:bg-red-900/60 border border-red-500/20 transition-colors flex items-center gap-2 disabled:opacity-50"
          >
            {isDeleting ? (
              <div className="w-4 h-4 border-2 border-red-300/50 border-t-transparent rounded-full animate-spin" />
            ) : null}
            {isDeleting ? 'Deleting...' : 'Delete Enquiry'}
          </button>
        </div>
      </motion.div>
    </div>
  );
}

export default function AdminEnquiriesPage() {
  const [enquiries, setEnquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);
  const [selectedEnquiry, setSelectedEnquiry] = useState(null);

  const fetchEnquiries = () => {
    setLoading(true);
    fetch(`${API_URL}/api/admin/enquiries`, { credentials: 'include' })
      .then(async res => {
        if (!res.ok) throw new Error('ServerError');
        return res.json();
      })
      .then(data => setEnquiries(data || []))
      .catch(() => console.error('Failed to load enquiries.'))
      .finally(() => setLoading(false));
  };

  useEffect(() => { fetchEnquiries(); }, []);

  const handleDelete = async (id) => {
    setDeletingId(id);
    try {
      await fetch(`${API_URL}/api/admin/enquiries/${id}`, {
        method: 'DELETE',
        credentials: 'include',
      });
      setEnquiries(prev => prev.filter(e => e.id !== id));
      if (selectedEnquiry?.id === id) {
        setSelectedEnquiry(null);
      }
    } catch {
      console.error('Failed to delete enquiry.');
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="p-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <h1 className="font-serif text-3xl text-amber-100 mb-1">Enquiries</h1>
        <p className="text-amber-200/50 text-sm">Messages received from visitors</p>
      </motion.div>

      {/* Content */}
      {loading ? (
        <div className="flex items-center justify-center py-24">
          <div className="w-8 h-8 border-2 border-amber-300/60 border-t-transparent rounded-full animate-spin" />
        </div>
      ) : enquiries.length === 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex flex-col items-center justify-center py-24 text-center"
        >
          <div className="w-16 h-16 rounded-full bg-amber-300/10 flex items-center justify-center mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-amber-300/50" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
            </svg>
          </div>
          <p className="text-amber-100/60 font-serif text-lg">No enquiries yet</p>
          <p className="text-amber-200/30 text-sm mt-1">Messages will appear here when visitors reach out</p>
        </motion.div>
      ) : (
        <div className="space-y-4">
          <AnimatePresence>
            {enquiries.map((enq, i) => (
              <motion.div
                key={enq.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: -40, scale: 0.95 }}
                transition={{ delay: i * 0.05, duration: 0.35 }}
                className="relative rounded-2xl overflow-hidden cursor-pointer group max-w-full"
                style={{
                  background: 'rgba(255,255,255,0.06)',
                  backdropFilter: 'blur(16px)',
                  WebkitBackdropFilter: 'blur(16px)',
                  border: '1px solid rgba(212, 175, 55, 0.15)',
                }}
                onClick={() => setSelectedEnquiry(enq)}
              >
                <div className="p-6 transition-colors group-hover:bg-white/5">
                  <div className="flex items-start justify-between gap-4 max-w-full">
                    <div className="flex-1 min-w-0 overflow-hidden">
                      <div className="flex items-center gap-3 mb-1 max-w-full">
                        <div className="w-8 h-8 rounded-full bg-amber-300/20 flex items-center justify-center text-amber-200 font-serif font-bold text-sm shrink-0">
                          {enq.sender_name?.charAt(0)?.toUpperCase() || '?'}
                        </div>
                        <div className="min-w-0 overflow-hidden">
                          <p className="text-amber-100 font-medium text-sm truncate">{enq.sender_name}</p>
                          <p className="text-amber-200/50 text-xs truncate">{enq.sender_email}</p>
                        </div>
                      </div>
                      
                      <p className="text-amber-100/75 text-sm mt-3 pl-11 break-words line-clamp-2">
                        {enq.message.length > 120 ? `${enq.message.substring(0, 120)}...` : enq.message}
                      </p>
                      
                      <p className="text-amber-300/30 text-xs mt-3 pl-11">
                        {new Date(enq.submitted_at).toLocaleString('en-IN', {
                          dateStyle: 'medium', timeStyle: 'short'
                        })}
                      </p>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDelete(enq.id);
                      }}
                      disabled={deletingId === enq.id}
                      className="shrink-0 p-2 rounded-lg text-red-300/50 hover:text-red-300 hover:bg-red-900/20 transition-all duration-200 disabled:opacity-30 z-10"
                      title="Delete enquiry"
                    >
                      {deletingId === enq.id ? (
                        <div className="w-4 h-4 border border-red-300/50 border-t-transparent rounded-full animate-spin" />
                      ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                        </svg>
                      )}
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}

      {/* Details Modal */}
      <AnimatePresence>
        {selectedEnquiry && (
          <EnquiryModal
            enquiry={selectedEnquiry}
            onClose={() => setSelectedEnquiry(null)}
            onDelete={handleDelete}
            isDeleting={deletingId === selectedEnquiry.id}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
