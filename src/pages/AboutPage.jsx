import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

/* ─── Reusable animation variants ─── */
const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.85, ease: 'easeOut', delay },
  }),
};

const fadeIn = {
  hidden: { opacity: 0 },
  visible: (delay = 0) => ({
    opacity: 1,
    transition: { duration: 1, ease: 'easeOut', delay },
  }),
};

const slideLeft = {
  hidden: { opacity: 0, x: 60 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.9, ease: 'easeOut' },
  },
};

const slideRight = {
  hidden: { opacity: 0, x: -60 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.9, ease: 'easeOut' },
  },
};

/* ─── Divider ─── */
const SectionDivider = () => (
  <div className="flex items-center gap-6 my-2">
    <div className="flex-1 h-px bg-stone-200" />
    <div className="w-1.5 h-1.5 rounded-full bg-stone-300" />
    <div className="flex-1 h-px bg-stone-200" />
  </div>
);

/* ─── Section: My Story ─── */
function MyStory() {
  return (
    <section className="w-full py-24 bg-white">
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">

        {/* Text — Left */}
        <motion.div
          variants={slideRight}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="flex flex-col gap-6"
        >
          <p className="text-xs font-sans uppercase tracking-widest text-stone-400">Chapter 01</p>
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-[#1B2621] leading-tight">
            My Story
          </h2>
          <SectionDivider />
          <div className="flex flex-col gap-4 font-sans text-base leading-relaxed text-[#4A554A]">
            <p>
              Art has been a part of my life for as long as I can remember. What began as simple
              sketches and creative experiments slowly grew into a lifelong passion and a meaningful
              way to express my thoughts, emotions, and experiences.
            </p>
            <p>
              Over the years, art has become more than a creative pursuit—it has become a language
              through which I connect with others and share pieces of my journey. Every painting
              reflects moments of joy, reflection, growth, and gratitude that have shaped who I am.
            </p>
            <p>
              Beyond being an artist, I am also a loving wife and mother. My family is the heart of
              my world and a constant source of inspiration. The beauty found in everyday moments,
              the lessons of motherhood, and the love shared with those closest to me all find their
              way into my work.
            </p>
            <p>
              Creating art allows me to celebrate life's simple wonders and transform meaningful
              experiences into something that can be shared with others.
            </p>
          </div>
        </motion.div>

        {/* Image — Right */}
        <motion.div
          variants={slideLeft}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="flex justify-center md:justify-end"
        >
          <div className="relative">
            {/* Decorative frame offset */}
            <div className="absolute -top-4 -right-4 w-full h-full rounded-2xl border border-stone-200 z-0" />
            <motion.img
              src="/artist1.jpg"
              alt="Artist portrait"
              className="relative z-10 w-80 md:w-96 h-[480px] object-cover rounded-2xl shadow-xl"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.4 }}
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ─── Section: My Inspiration ─── */
function MyInspiration() {
  return (
    <section className="w-full py-24 bg-stone-50">
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">

        {/* Image — Left */}
        <motion.div
          variants={slideRight}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="flex justify-center md:justify-start order-2 md:order-1"
        >
          <div className="relative">
            <div className="absolute -top-4 -left-4 w-full h-full rounded-2xl border border-stone-200 z-0" />
            <motion.img
              src="/artist2.jpg"
              alt="Nature inspiration"
              className="relative z-10 w-80 md:w-96 h-[480px] object-cover rounded-2xl shadow-xl"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.4 }}
            />
          </div>
        </motion.div>

        {/* Text — Right */}
        <motion.div
          variants={slideLeft}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="flex flex-col gap-6 order-1 md:order-2"
        >
          <p className="text-xs font-sans uppercase tracking-widest text-stone-400">Chapter 02</p>
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-[#1B2621] leading-tight">
            My Inspiration
          </h2>
          <SectionDivider />
          <div className="flex flex-col gap-4 font-sans text-base leading-relaxed text-[#4A554A]">
            <p>
              Inspiration surrounds us in ways both grand and subtle. I find endless creativity in
              the beauty of nature—the colors of blooming flowers, the quiet strength of ancient
              trees, the movement of water, and the changing light of each season.
            </p>
            <p>
              Animals hold a special place in my heart as well. Their innocence, resilience, and
              connection to the natural world often influence the themes and emotions within my
              artwork.
            </p>
            <p>
              I am equally inspired by everyday moments: a peaceful morning, a meaningful
              conversation, a cherished memory, or the warmth of spending time with loved ones.
              These experiences remind me that beauty often exists in the simplest details.
            </p>
            <p>
              Through my work, I seek to capture these moments of wonder and transform them into
              visual stories that invite reflection, appreciation, and connection.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ─── Section: My Goals ─── */
function MyGoals() {
  return (
    <section className="w-full py-24 bg-white">
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">

        {/* Text — Left */}
        <motion.div
          variants={slideRight}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="flex flex-col gap-6"
        >
          <p className="text-xs font-sans uppercase tracking-widest text-stone-400">Chapter 03</p>
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-[#1B2621] leading-tight">
            My Goals
          </h2>
          <SectionDivider />
          <div className="flex flex-col gap-4 font-sans text-base leading-relaxed text-[#4A554A]">
            <p>
              My goal as an artist is not only to create beautiful work but also to create
              meaningful connections. I hope my art encourages people to pause, reflect, and
              discover moments of joy, hope, and inspiration in their own lives.
            </p>
            <p>
              I aspire to share messages of kindness, compassion, and love through every piece I
              create. By celebrating the beauty of nature and the importance of protecting the world
              around us, I hope to inspire greater appreciation for animals, the environment, and
              the simple wonders that enrich our lives.
            </p>
            <p>
              Above all, I want my work to leave a positive impact—to spark emotion, create
              conversation, and remind people of the beauty that exists within both nature and
              humanity.
            </p>
            <p>
              As I continue my artistic journey, I remain committed to learning, growing, and using
              creativity as a force for connection, understanding, and positive change.
            </p>
          </div>
        </motion.div>

        {/* Image — Right */}
        <motion.div
          variants={slideLeft}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="flex justify-center md:justify-end"
        >
          <div className="relative">
            <div className="absolute -top-4 -right-4 w-full h-full rounded-2xl border border-stone-200 z-0" />
            <motion.img
              src="/artist3.jpg"
              alt="Artist creating artwork"
              className="relative z-10 w-80 md:w-96 h-[480px] object-cover rounded-2xl shadow-xl"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.4 }}
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ─── CTA Section ─── */
function CTASection() {
  return (
    <section className="w-full py-28 bg-stone-50">
      <div className="max-w-3xl mx-auto px-6 text-center flex flex-col items-center gap-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.4 }}
          className="flex flex-col items-center gap-6"
        >
          <motion.div custom={0} variants={fadeUp} className="w-12 h-px bg-stone-400" />
          <motion.h2
            custom={0.1}
            variants={fadeUp}
            className="font-serif text-3xl md:text-4xl font-bold text-[#1B2621] leading-tight"
          >
            Let's Create Something Meaningful Together
          </motion.h2>
          <motion.p custom={0.25} variants={fadeUp} className="font-sans text-base text-[#4A554A] leading-relaxed max-w-xl">
            Thank you for taking the time to learn about my journey. I invite you to explore my
            collection of artwork and discover the stories, emotions, and inspirations behind each piece.
          </motion.p>
          <motion.div custom={0.4} variants={fadeUp} className="flex flex-col sm:flex-row gap-4 mt-2">
            <Link
              to="/art"
              className="px-8 py-3.5 bg-[#1B2621] text-white text-sm uppercase tracking-widest font-sans rounded-sm hover:bg-[#2e3e36] transition-colors duration-300"
            >
              View My Art
            </Link>
            <Link
              to="/commissions"
              className="px-8 py-3.5 border border-[#1B2621] text-[#1B2621] text-sm uppercase tracking-widest font-sans rounded-sm hover:bg-stone-100 transition-colors duration-300"
            >
              Commission a Piece
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

/* ─── Main Page ─── */
export default function AboutPage() {
  return (
    <div className="min-h-screen w-full">

      {/* Hero */}
      <section className="w-full pt-40 pb-20 bg-white text-center">
        <div className="max-w-3xl mx-auto px-6 flex flex-col items-center gap-6">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            className="text-xs font-sans uppercase tracking-[0.3em] text-stone-400"
          >
            Mrunalini Niwal
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, ease: 'easeOut', delay: 0.1 }}
            className="font-serif text-6xl md:text-8xl font-bold text-[#1B2621] leading-none tracking-tight"
          >
            About Me
          </motion.h1>

          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.7, delay: 0.3, ease: 'easeOut' }}
            className="w-20 h-px bg-stone-400 origin-left"
          />

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, ease: 'easeOut', delay: 0.4 }}
            className="font-sans text-lg md:text-xl text-[#4A554A] leading-relaxed max-w-2xl font-light"
          >
            Through every brushstroke and every color choice, I strive to capture the beauty,
            emotion, and wonder that surround us. My work is deeply rooted in love—for family, for
            nature, and for the stories that connect us all.
          </motion.p>
        </div>
      </section>

      {/* Content sections */}
      <MyStory />
      <MyInspiration />
      <MyGoals />
      <CTASection />
    </div>
  );
}
