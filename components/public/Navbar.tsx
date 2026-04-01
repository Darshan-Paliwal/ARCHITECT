'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === '/';

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handler);
    return () => window.removeEventListener('scroll', handler);
  }, []);

  const links = [
    { href: '/', label: 'Home' },
    { href: '/projects', label: 'Projects' },
    { href: '/about', label: 'About' },
    { href: '/services', label: 'Services' },
    { href: '/gallery', label: 'Gallery' },
    { href: '/contact', label: 'Contact' },
  ];

  const navBg = scrolled || !isHome ? 'bg-stone-50/95 backdrop-blur-sm border-b border-stone-200' : 'bg-transparent';
  const textColor = scrolled || !isHome ? 'text-stone-900' : 'text-white';

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${navBg}`}>
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <Link href="/" className={`font-display text-xl font-light ${textColor} transition-colors`}>
          Forma Architects
        </Link>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-8">
          {links.slice(1).map(link => (
            <Link key={link.href} href={link.href} className={`text-sm tracking-widest uppercase transition-colors hover:opacity-60 ${textColor} ${pathname === link.href ? 'opacity-60' : ''}`}>
              {link.label}
            </Link>
          ))}
        </div>

        {/* Mobile toggle */}
        <button onClick={() => setMenuOpen(!menuOpen)} className={`md:hidden flex flex-col gap-1.5 ${textColor}`}>
          <span className={`w-6 h-px bg-current transition-transform ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
          <span className={`w-6 h-px bg-current transition-opacity ${menuOpen ? 'opacity-0' : ''}`} />
          <span className={`w-6 h-px bg-current transition-transform ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
        </button>
      </div>

      {/* Mobile menu */}
      <div className={`md:hidden bg-stone-900 text-white overflow-hidden transition-all duration-500 ${menuOpen ? 'max-h-96' : 'max-h-0'}`}>
        <div className="px-6 py-6 space-y-4">
          {links.map(link => (
            <Link key={link.href} href={link.href} onClick={() => setMenuOpen(false)} className="block text-sm tracking-widest uppercase py-2 border-b border-stone-800">
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
    }
