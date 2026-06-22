import { motion } from 'framer-motion';

const Navbar = () => {
  const links = ['Home', 'Art', 'Commissions', 'Contact', 'About me'];

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-stone-200">
      <div className="max-w-6xl mx-auto px-6 h-20 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center">
          <span className="font-serif text-2xl font-bold text-[#1B2621]">MN</span>
        </div>

        {/* Links */}
        <div className="hidden md:flex gap-8">
          {links.map((link) => (
            <a
              key={link}
              href={`/${link.toLowerCase().replace(' ', '-')}`}
              className="text-sm uppercase tracking-wider text-[#1B2621] hover:text-[#D4AF37] transition-colors duration-300 font-sans"
            >
              {link}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
