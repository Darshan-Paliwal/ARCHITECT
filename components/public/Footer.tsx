import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-stone-950 text-white py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="md:col-span-2">
            <p className="font-display text-2xl font-light mb-4">Forma Architects</p>
            <p className="text-stone-400 text-sm leading-relaxed max-w-xs">
              Designing spaces that transcend the ordinary and endure the test of time.
            </p>
          </div>
          <div>
            <p className="text-xs text-stone-500 tracking-widest uppercase mb-4">Navigation</p>
            <ul className="space-y-2">
              {[['/', 'Home'], ['/projects', 'Projects'], ['/about', 'About'], ['/services', 'Services'], ['/gallery', 'Gallery'], ['/contact', 'Contact']].map(([href, label]) => (
                <li key={href}>
                  <Link href={href} className="text-stone-400 text-sm hover:text-white transition-colors">{label}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-xs text-stone-500 tracking-widest uppercase mb-4">Contact</p>
            <ul className="space-y-2 text-stone-400 text-sm">
              <li>hello@formaarchitects.com</li>
              <li>+1 (555) 000-0000</li>
              <li className="mt-4 leading-relaxed">123 Architecture Lane<br />New York, NY 10001</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-stone-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-stone-500 text-xs">© {new Date().getFullYear()} Forma Architects. All rights reserved.</p>
          <p className="text-stone-600 text-xs">Designed with intention.</p>
        </div>
      </div>
    </footer>
  );
}
