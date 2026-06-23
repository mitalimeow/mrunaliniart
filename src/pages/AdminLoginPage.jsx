import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';

const BG = {
  backgroundImage: "url('/common_bg.jpg')",
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  backgroundAttachment: 'fixed',
};

const inputCls =
  'w-full px-4 py-3 bg-white/70 backdrop-blur-sm border border-stone-200 rounded-xl font-sans text-sm text-[#1B2621] placeholder-stone-400 focus:outline-none focus:border-[#1B2621]/40 focus:ring-2 focus:ring-[#1B2621]/10 transition-all duration-200';

export default function AdminLoginPage() {
  const navigate = useNavigate();
  const [p1, setP1] = useState('');
  const [p2, setP2] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [checking, setChecking] = useState(true);

  // Auto-redirect if already authenticated
  useEffect(() => {
    const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080';
    fetch(`${API_URL}/api/admin/status`, { credentials: 'include' })
      .then(res => {
        if (res.ok) navigate('/mniwal-admin/enquiries', { replace: true });
      })
      .catch(() => {})
      .finally(() => setChecking(false));
  }, [navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    if (!p1 || !p2) { setError('Both passwords are required.'); return; }
    setLoading(true);
    
    const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080';
    try {
      const res = await fetch(`${API_URL}/api/admin/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ password_one: p1, password_two: p2 }),
      });
      if (!res.ok) throw new Error('Invalid credentials');
      navigate('/mniwal-admin/enquiries', { replace: true });
    } catch {
      setError('Access denied. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  if (checking) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={BG}>
        <div className="fixed inset-0 bg-white/75" />
        <AiOutlineLoading3Quarters className="relative z-10 text-3xl text-[#1B2621] animate-spin" />
      </div>
    );
  }

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden" style={BG}>
      <div className="fixed inset-0 bg-[#1B2621]/50 z-0" />

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.85, ease: 'easeOut' }}
        className="relative z-10 w-full max-w-md mx-4"
      >
        <div className="bg-white/15 backdrop-blur-2xl border border-white/25 rounded-3xl shadow-2xl p-10 flex flex-col gap-8">
          {/* Header */}
          <div className="text-center flex flex-col gap-3">
            <p className="font-serif text-5xl font-bold text-white">MN</p>
            <div className="w-10 h-0.5 bg-[#D4AF37] mx-auto" />
            <h1 className="font-serif text-2xl font-bold text-white">Admin Access</h1>
            <p className="font-sans text-xs text-white/60 uppercase tracking-widest">Authorized access only</p>
          </div>

          {/* Form */}
          <form onSubmit={handleLogin} className="flex flex-col gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-sans uppercase tracking-widest text-white/50">Password 1</label>
              <input
                type="password"
                className={inputCls}
                placeholder="••••••••"
                value={p1}
                onChange={e => setP1(e.target.value)}
                autoComplete="off"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-sans uppercase tracking-widest text-white/50">Password 2</label>
              <input
                type="password"
                className={inputCls}
                placeholder="••••••••"
                value={p2}
                onChange={e => setP2(e.target.value)}
                autoComplete="off"
              />
            </div>

            {error && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-xs text-red-300 text-center"
              >
                {error}
              </motion.p>
            )}

            <motion.button
              type="submit"
              disabled={loading}
              whileHover={{ scale: loading ? 1 : 1.01 }}
              whileTap={{ scale: 0.98 }}
              className="w-full mt-2 py-4 bg-white/90 text-[#1B2621] font-sans text-sm uppercase tracking-widest rounded-xl hover:bg-white disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 flex items-center justify-center gap-2 font-medium shadow-lg"
            >
              {loading && <AiOutlineLoading3Quarters className="animate-spin" />}
              {loading ? 'Authenticating...' : 'Enter Admin Mode'}
            </motion.button>
          </form>
        </div>
      </motion.div>
    </div>
  );
}
