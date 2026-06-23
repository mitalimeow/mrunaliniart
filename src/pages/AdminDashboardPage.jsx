import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080';

export default function AdminEnquiriesPage() {
  const [enquiries, setEnquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);

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
                className="relative rounded-2xl overflow-hidden"
                style={{
                  background: 'rgba(255,255,255,0.06)',
                  backdropFilter: 'blur(16px)',
                  WebkitBackdropFilter: 'blur(16px)',
                  border: '1px solid rgba(212, 175, 55, 0.15)',
                }}
              >
                <div className="p-6">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 mb-1">
                        <div className="w-8 h-8 rounded-full bg-amber-300/20 flex items-center justify-center text-amber-200 font-serif font-bold text-sm shrink-0">
                          {enq.sender_name?.charAt(0)?.toUpperCase() || '?'}
                        </div>
                        <div>
                          <p className="text-amber-100 font-medium text-sm">{enq.sender_name}</p>
                          <p className="text-amber-200/50 text-xs">{enq.sender_email}</p>
                        </div>
                      </div>
                      <p className="text-amber-100/75 text-sm leading-relaxed mt-3 pl-11">{enq.message}</p>
                      <p className="text-amber-300/30 text-xs mt-3 pl-11">
                        {new Date(enq.submitted_at).toLocaleString('en-IN', {
                          dateStyle: 'medium', timeStyle: 'short'
                        })}
                      </p>
                    </div>
                    <button
                      onClick={() => handleDelete(enq.id)}
                      disabled={deletingId === enq.id}
                      className="shrink-0 p-2 rounded-lg text-red-300/50 hover:text-red-300 hover:bg-red-900/20 transition-all duration-200 disabled:opacity-30"
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
    </div>
  );
}
