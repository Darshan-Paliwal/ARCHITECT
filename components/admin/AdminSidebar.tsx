'use client';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

export default function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const logout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    toast.success('Logged out');
    router.push('/admin/login');
  };

  const links = [
    { href: '/admin/dashboard', label: 'Dashboard', icon: '⊞' },
    { href: '/admin/projects', label: 'Projects', icon: '◈' },
    { href: '/admin/testimonials', label: 'Testimonials', icon: '❝' },
    { href: '/admin/media', label: 'Media', icon: '⊕' },
    { href: '/admin/settings', label: 'Settings', icon: '⚙' },
    { href: '/admin/contact-info', label: 'Inquiries', icon: '✉' },
  ];

  return (
    <aside className="w-64 fixed inset-y-0 left-0 bg-stone-950 text-white flex flex-col z-40">
      <div className="p-6 border-b border-stone-800">
        <p className="font-display text-lg font-light">Forma Admin</p>
        <p className="text-stone-500 text-xs mt-0.5">Content Management</p>
      </div>

      <nav className="flex-1 py-4">
        {links.map(link => (
          <Link
            key={link.href}
            href={link.href}
            className={`flex items-center gap-3 px-6 py-3 text-sm transition-colors ${
              pathname.startsWith(link.href)
                ? 'bg-stone-800 text-white border-r-2 border-white'
                : 'text-stone-400 hover:text-white hover:bg-stone-900'
            }`}
          >
            <span className="text-base">{link.icon}</span>
            {link.label}
          </Link>
        ))}
      </nav>

      <div className="p-6 border-t border-stone-800 space-y-2">
        <Link href="/" target="_blank" className="block text-xs text-stone-500 hover:text-stone-300 transition-colors">
          ↗ View Public Site
        </Link>
        <button onClick={logout} className="block text-xs text-stone-500 hover:text-red-400 transition-colors w-full text-left">
          ← Log Out
        </button>
      </div>
    </aside>
  );
      }
