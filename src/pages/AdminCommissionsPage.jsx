import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080';

export default function AdminCommissionsPage() {
  const [commissions, setCommissions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_URL}/api/admin/commissions`, { credentials: 'include' })
      .then(res => { if (!res.ok) throw new Error(); return res.json(); })
      .then(data => setCommissions(data || []))
      .catch(() => console.error('Failed to load commissions.'))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="p-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <h1 className="font-serif text-3xl text-amber-100 mb-1">Commissions</h1>
        <p className="text-amber-200/50 text-sm">View commission tiers from your portfolio</p>
      </motion.div>

      {loading ? (
        <div className="flex items-center justify-center py-24">
          <div className="w-8 h-8 border-2 border-amber-300/60 border-t-transparent rounded-full animate-spin" />
        </div>
      ) : commissions.length === 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex flex-col items-center justify-center py-24 text-center"
        >
          <div className="w-16 h-16 rounded-full bg-amber-300/10 flex items-center justify-center mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-amber-300/50" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456Z" />
            </svg>
          </div>
          <p className="text-amber-100/60 font-serif text-lg">No commission tiers found</p>
          <p className="text-amber-200/30 text-sm mt-1">Add commission tiers to your database to see them here</p>
        </motion.div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {commissions.map((tier, i) => (
            <motion.div
              key={tier.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.07, duration: 0.4 }}
              className="rounded-2xl p-6"
              style={{
                background: 'rgba(255,255,255,0.06)',
                backdropFilter: 'blur(16px)',
                WebkitBackdropFilter: 'blur(16px)',
                border: '1px solid rgba(212, 175, 55, 0.15)',
              }}
            >
              <div className="flex items-start justify-between mb-3">
                <h3 className="font-serif text-lg text-amber-100">{tier.tier_name}</h3>
                <span className={`text-xs px-2 py-1 rounded-full ${
                  tier.is_available
                    ? 'bg-emerald-900/40 text-emerald-300 border border-emerald-500/20'
                    : 'bg-red-900/40 text-red-300 border border-red-500/20'
                }`}>
                  {tier.is_available ? 'Available' : 'Closed'}
                </span>
              </div>
              <p className="text-2xl font-serif text-amber-300 mb-3">₹{tier.price?.toLocaleString('en-IN')}</p>
              <p className="text-amber-100/60 text-sm leading-relaxed">{tier.description}</p>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
