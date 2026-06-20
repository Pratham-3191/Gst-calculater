import { useState, useEffect } from 'react';
import { Calculator, Menu, X } from 'lucide-react';

const navLinks = [
  { href: '#calculator', label: 'Calculator' },
  { href: '#history', label: 'History' },
  { href: '#faq', label: 'FAQ' },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-gray-950/80 backdrop-blur-2xl border-b border-white/[0.06] shadow-lg shadow-black/20'
          : 'bg-transparent'
      }`}
      id="navbar"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <a href="#" className="flex items-center gap-2.5 group" id="logo">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center shadow-lg shadow-indigo-500/20 group-hover:shadow-indigo-500/40 transition-shadow duration-300">
              <Calculator className="w-4.5 h-4.5 text-white" />
            </div>
            <span className="text-lg font-bold text-white">
              GST <span className="text-indigo-400">Calc</span>
            </span>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="px-4 py-2 text-sm text-gray-400 hover:text-white rounded-lg hover:bg-white/[0.04] transition-all duration-200"
              >
                {link.label}
              </a>
            ))}
            <div className="w-px h-6 bg-white/[0.08] mx-2" />
            <a
              href="https://digitalheroesco.com"
              target="_blank"
              rel="noopener noreferrer"
              className="ml-1 px-4 py-2 bg-gradient-to-r from-indigo-600 to-violet-600 rounded-lg text-sm font-semibold text-white hover:from-indigo-500 hover:to-violet-500 transition-all duration-300 hover:shadow-lg hover:shadow-indigo-500/20"
              id="digital-heroes-nav"
            >
              Built for Digital Heroes
            </a>
          </div>

          {/* Mobile Toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 text-gray-400 hover:text-white rounded-lg hover:bg-white/[0.04] transition-all"
            aria-label="Toggle menu"
            id="mobile-menu-toggle"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ${
            mobileOpen ? 'max-h-72 pb-4' : 'max-h-0'
          }`}
        >
          <div className="flex flex-col gap-1 pt-2">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="px-4 py-2.5 text-sm text-gray-400 hover:text-white hover:bg-white/[0.03] rounded-lg transition-all"
              >
                {link.label}
              </a>
            ))}
            <a
              href="https://digitalheroesco.com"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMobileOpen(false)}
              className="mt-1 px-4 py-2.5 bg-gradient-to-r from-indigo-600 to-violet-600 rounded-lg text-sm font-semibold text-white text-center"
            >
              Built for Digital Heroes
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
