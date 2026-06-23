import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaInstagram, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';

const BG = {
  backgroundImage: "url('/common_bg.jpg')",
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  backgroundAttachment: 'fixed',
};

const fadeUp = (delay = 0) => ({
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.85, ease: 'easeOut', delay } },
});

/* ── Toast ─────────────────────────────────────────────────── */
function Toast({ type, message, onClose }) {
  return (
    <AnimatePresence>
      {message && (
        <motion.div
          key="toast"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.4 }}
          className={`fixed top-24 left-1/2 -translate-x-1/2 z-50 px-8 py-4 rounded-2xl shadow-xl font-sans text-sm backdrop-blur-md border ${
            type === 'success'
              ? 'bg-[#1B2621]/90 text-white border-[#D4AF37]/30'
              : 'bg-red-900/80 text-white border-red-300/30'
          }`}
        >
          <span>{message}</span>
          <button onClick={onClose} className="ml-6 opacity-60 hover:opacity-100 text-xs">✕</button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ── Contact Info Row ───────────────────────────────────────── */
function InfoRow({ icon: Icon, label, href, children }) {
  const content = (
    <div className="flex items-center gap-4 group">
      <div className="w-10 h-10 rounded-full bg-[#1B2621]/8 flex items-center justify-center flex-shrink-0">
        <Icon className="text-[#1B2621] text-base" />
      </div>
      <div>
        <p className="text-[10px] font-sans uppercase tracking-widest text-stone-400">{label}</p>
        <p className="font-sans text-sm text-[#1B2621] group-hover:text-[#D4AF37] transition-colors duration-200">
          {children}
        </p>
      </div>
    </div>
  );

  return href ? <a href={href} target="_blank" rel="noreferrer">{content}</a> : content;
}

/* ── Form Input ─────────────────────────────────────────────── */
function Field({ label, children }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-[10px] font-sans uppercase tracking-widest text-stone-500">{label}</label>
      {children}
    </div>
  );
}

const inputCls =
  'w-full px-4 py-3 bg-white/70 backdrop-blur-sm border border-stone-200 rounded-xl font-sans text-sm text-[#1B2621] placeholder-stone-400 focus:outline-none focus:border-[#1B2621]/40 focus:ring-2 focus:ring-[#1B2621]/10 transition-all duration-200';

/* ── Main Page ──────────────────────────────────────────────── */
export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState({ type: '', message: '' });
  const [errors, setErrors] = useState({});

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = 'Name is required';
    if (!form.email.trim()) e.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Enter a valid email';
    if (!form.message.trim()) e.message = 'Message is required';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    try {
      const res = await fetch('http://localhost:8080/api/enquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          sender_name: form.name,
          sender_email: form.email,
          message: form.message,
        }),
      });
      if (!res.ok) throw new Error('Failed');
      setForm({ name: '', email: '', message: '' });
      setToast({ type: 'success', message: 'Thank you for reaching out. Your message has been received.' });
      setTimeout(() => setToast({ type: '', message: '' }), 5000);
    } catch {
      setToast({ type: 'error', message: 'Something went wrong. Please try again.' });
      setTimeout(() => setToast({ type: '', message: '' }), 5000);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen w-full overflow-x-hidden" style={BG}>
      <div className="fixed inset-0 bg-white/75 z-0 pointer-events-none" />

      <Toast type={toast.type} message={toast.message} onClose={() => setToast({ type: '', message: '' })} />

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 pt-36 pb-24">
        <div className="grid grid-cols-1 md:grid-cols-[45%_55%] gap-12 md:gap-20 items-start">

          {/* ── LEFT ──────────────────────────────── */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{ visible: { transition: { staggerChildren: 0.12 } } }}
            className="flex flex-col gap-8"
          >
            <motion.div variants={fadeUp(0)} className="flex flex-col gap-4">
              <p className="text-xs font-sans uppercase tracking-[0.35em] text-stone-400">Get in Touch</p>
              <h1 className="font-serif text-6xl md:text-7xl font-bold text-[#1B2621] leading-none">
                Contact<br /><span className="text-[#4A554A]">Me</span>
              </h1>
              <div className="w-16 h-0.5 bg-[#D4AF37]" />
            </motion.div>

            <motion.p variants={fadeUp(0.1)} className="font-sans text-base text-[#4A554A] leading-relaxed max-w-md font-light">
              Whether you're interested in a commission, collaboration, or simply wish to share your thoughts, I'd love to hear from you.
            </motion.p>

            <motion.div variants={fadeUp(0.2)} className="flex flex-col gap-4">
              <InfoRow icon={FaEnvelope} label="Email" href="mailto:mniwal@gmail.com">mniwal@gmail.com</InfoRow>
              <InfoRow icon={FaInstagram} label="Instagram" href="https://instagram.com/mrunalini_art">@mrunalini_art</InfoRow>
              <InfoRow icon={FaMapMarkerAlt} label="Location">Based in India</InfoRow>
            </motion.div>

            {/* Artist portrait */}
            <motion.div variants={fadeUp(0.3)} className="relative mt-4">
              <div className="absolute -top-3 -left-3 w-full h-full rounded-2xl border border-stone-200 z-0" />
              <img
                src="/contact.png"
                alt="Artist portrait"
                loading="lazy"
                className="relative z-10 w-full max-w-sm h-72 object-cover rounded-2xl shadow-xl"
              />
            </motion.div>
          </motion.div>

          {/* ── RIGHT ─────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, ease: 'easeOut', delay: 0.2 }}
          >
            <div className="bg-white/60 backdrop-blur-xl border border-white/80 rounded-3xl shadow-2xl p-8 md:p-12 flex flex-col gap-8">
              <div className="flex flex-col gap-2">
                <p className="text-xs font-sans uppercase tracking-[0.3em] text-stone-400">Enquiry Form</p>
                <h2 className="font-serif text-3xl font-bold text-[#1B2621]">Send an Enquiry</h2>
                <p className="font-sans text-sm text-[#4A554A] leading-relaxed font-light">
                  I'd be delighted to hear from you. Please fill out the form below and I'll get back to you as soon as possible.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="flex flex-col gap-5" noValidate>
                <Field label="Your Name">
                  <input
                    type="text"
                    className={inputCls}
                    placeholder="Your Name"
                    value={form.name}
                    onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                  />
                  {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name}</p>}
                </Field>

                <Field label="Email Address">
                  <input
                    type="email"
                    className={inputCls}
                    placeholder="your@email.com"
                    value={form.email}
                    onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                  />
                  {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}
                </Field>

                <Field label="Your Enquiry">
                  <textarea
                    className={`${inputCls} resize-none`}
                    placeholder="Tell me about your enquiry..."
                    style={{ minHeight: 180 }}
                    value={form.message}
                    onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                  />
                  {errors.message && <p className="text-xs text-red-500 mt-1">{errors.message}</p>}
                </Field>

                <motion.button
                  type="submit"
                  disabled={loading}
                  whileHover={{ scale: loading ? 1 : 1.01 }}
                  whileTap={{ scale: loading ? 1 : 0.98 }}
                  className="w-full py-4 bg-[#1B2621] text-white font-sans text-sm uppercase tracking-widest rounded-xl hover:bg-[#2e3e36] disabled:opacity-60 disabled:cursor-not-allowed transition-all duration-300 flex items-center justify-center gap-3 shadow-lg hover:shadow-xl"
                >
                  {loading && <AiOutlineLoading3Quarters className="animate-spin text-base" />}
                  {loading ? 'Sending...' : 'Send Message'}
                </motion.button>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
