import Link from 'next/link';

async function getStats() {
  const base = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
  try {
    const [projects, testimonials, contacts, media] = await Promise.all([
      fetch(`${base}/api/projects`, { cache: 'no-store' }).then(r => r.json()),
      fetch(`${base}/api/testimonials`, { cache: 'no-store' }).then(r => r.json()),
      fetch(`${base}/api/contact`, { cache: 'no-store' }).then(r => r.json()),
      fetch(`${base}/api/media`, { cache: 'no-store' }).then(r => r.json()),
    ]);
    return {
      projects: projects.data?.length || 0,
      testimonials: testimonials.data?.length || 0,
      contacts: contacts.data?.length || 0,
      media: media.data?.length || 0,
    };
  } catch { return { projects: 0, testimonials: 0, contacts: 0, media: 0 }; }
}

export default async function AdminDashboard() {
  const stats = await getStats();

  const cards = [
    { label: 'Projects', value: stats.projects, href: '/admin/projects', color: 'bg-stone-900 text-white' },
    { label: 'Testimonials', value: stats.testimonials, href: '/admin/testimonials', color: 'bg-stone-700 text-white' },
    { label: 'Inquiries', value: stats.contacts, href: '/admin/contact-info', color: 'bg-stone-500 text-white' },
    { label: 'Media Files', value: stats.media, href: '/admin/media', color: 'bg-stone-300 text-stone-900' },
  ];

  const quickLinks = [
    { label: 'Add New Project', href: '/admin/projects/new', icon: '＋' },
    { label: 'Upload Media', href: '/admin/media', icon: '↑' },
    { label: 'Edit Homepage', href: '/admin/settings', icon: '✎' },
    { label: 'View Site', href: '/', icon: '↗', target: '_blank' },
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="font-display text-3xl font-light text-stone-900">Dashboard</h1>
        <p className="text-stone-500 text-sm mt-1">Welcome back. Here's an overview of your site.</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {cards.map(card => (
          <Link key={card.label} href={card.href} className={`${card.color} p-6 hover:opacity-90 transition-opacity`}>
            <p className="text-3xl font-display font-light mb-1">{card.value}</p>
            <p className="text-xs tracking-widest uppercase opacity-70">{card.label}</p>
          </Link>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="bg-white p-6 mb-8">
        <h2 className="text-sm tracking-widest uppercase text-stone-500 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {quickLinks.map(link => (
            <Link
              key={link.label}
              href={link.href}
              target={link.target}
              className="flex items-center gap-3 p-4 border border-stone-200 hover:border-stone-900 hover:bg-stone-50 transition-all text-sm"
            >
              <span className="text-lg">{link.icon}</span>
              <span className="text-stone-700">{link.label}</span>
            </Link>
          ))}
        </div>
      </div>

      {/* Info */}
      <div className="bg-stone-900 text-white p-6">
        <h2 className="font-display text-lg font-light mb-3">System Status</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-green-400 rounded-full" />
            <span className="text-stone-400">Database: Connected</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-green-400 rounded-full" />
            <span className="text-stone-400">Cloudinary: Active</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-green-400 rounded-full" />
            <span className="text-stone-400">API: Operational</span>
          </div>
        </div>
      </div>
    </div>
  );
                    }
