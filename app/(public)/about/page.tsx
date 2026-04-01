import Image from 'next/image';

async function getSettings() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/settings`, { cache: 'no-store' });
    const data = await res.json();
    return data.data;
  } catch { return null; }
}

export default async function AboutPage() {
  const settings = await getSettings();

  const values = [
    { title: 'Precision', desc: 'Every detail is considered, every line is intentional.' },
    { title: 'Sustainability', desc: 'We design for the future, minimizing impact on our planet.' },
    { title: 'Collaboration', desc: 'Your vision drives our creativity and process.' },
    { title: 'Innovation', desc: 'We push boundaries while honoring timeless principles.' },
  ];

  return (
    <div className="min-h-screen bg-stone-50">
      <div className="bg-stone-900 text-white pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          <p className="text-stone-400 text-sm tracking-[0.3em] uppercase mb-4">Who We Are</p>
          <h1 className="font-display text-6xl md:text-8xl font-light">{settings?.aboutTitle || 'Our Philosophy'}</h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
          <div>
            <p className="font-display text-2xl font-light leading-relaxed text-stone-700 mb-8">
              {settings?.aboutContent || 'We believe architecture is the art of shaping human experience.'}
            </p>
            <div className="w-16 h-px bg-stone-300 mb-8" />
            <p className="text-stone-500 leading-relaxed">
              Founded on the principles of thoughtful design and client partnership, we have spent over two decades crafting spaces that speak to the human experience. Our multidisciplinary team brings together architecture, interior design, and urban planning expertise.
            </p>
          </div>

          <div className="relative">
            {settings?.aboutImage?.url ? (
              <div className="relative aspect-[3/4] overflow-hidden">
                <Image src={settings.aboutImage.url} alt="About" fill className="object-cover" />
              </div>
            ) : (
              <div className="aspect-[3/4] bg-gradient-to-br from-stone-200 to-stone-300 flex items-center justify-center">
                <div className="text-center text-stone-400">
                  <div className="text-6xl mb-4">🏛</div>
                  <p>{settings?.firmName || 'Forma Architects'}</p>
                </div>
              </div>
            )}
            <div className="absolute -bottom-6 -left-6 bg-stone-900 text-white p-8 w-48">
              <p className="font-display text-4xl font-light">25+</p>
              <p className="text-stone-400 text-sm mt-1">Years of Excellence</p>
            </div>
          </div>
        </div>

        {/* Values */}
        <div className="mt-32">
          <p className="text-xs text-stone-400 tracking-widest uppercase mb-12">Our Values</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((v, i) => (
              <div key={i} className="border-t-2 border-stone-900 pt-6">
                <p className="text-xs text-stone-400 tracking-widest mb-2">0{i + 1}</p>
                <h3 className="font-display text-xl mb-3">{v.title}</h3>
                <p className="text-stone-500 text-sm leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Team */}
        <div className="mt-32">
          <p className="text-xs text-stone-400 tracking-widest uppercase mb-12">Leadership</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { name: 'Elena Vasquez', role: 'Principal Architect', initials: 'EV' },
              { name: 'Marcus Chen', role: 'Design Director', initials: 'MC' },
              { name: 'Aria Okonkwo', role: 'Project Partner', initials: 'AO' },
            ].map((member, i) => (
              <div key={i}>
                <div className="aspect-[3/4] bg-stone-200 mb-4 flex items-center justify-center">
                  <span className="font-display text-4xl text-stone-400">{member.initials}</span>
                </div>
                <h4 className="font-display text-lg">{member.name}</h4>
                <p className="text-stone-400 text-sm">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
      }
