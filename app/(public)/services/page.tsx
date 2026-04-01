async function getSettings() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/settings`, { cache: 'no-store' });
    const data = await res.json();
    return data.data;
  } catch { return null; }
}

export default async function ServicesPage() {
  const settings = await getSettings();

  const defaultServices = [
    { icon: '⬜', title: 'Architectural Design', description: 'From concept to construction, we guide every phase of your project with precision and creativity. Our process balances aesthetic vision with functional requirements.', features: ['Site Analysis', 'Concept Design', 'Design Development', 'Construction Documents'] },
    { icon: '⬛', title: 'Interior Architecture', description: 'Spaces shaped from the inside out. We design interiors that reflect your identity and enhance how you live and work.', features: ['Space Planning', 'Material Selection', 'Custom Fixtures', 'Lighting Design'] },
    { icon: '◻', title: 'Urban Planning', description: 'We engage with the larger context of city and community, designing developments that contribute positively to the built environment.', features: ['Master Planning', 'Mixed-Use Development', 'Public Space Design', 'Zoning Consultation'] },
    { icon: '◼', title: 'Sustainable Design', description: 'Every project is an opportunity to build responsibly. We integrate sustainable practices at every stage.', features: ['LEED Certification', 'Passive Design', 'Energy Modeling', 'Green Infrastructure'] },
    { icon: '▭', title: 'Renovation & Adaptive Reuse', description: 'We breathe new life into existing structures, preserving character while meeting modern needs.', features: ['Historic Preservation', 'Structural Analysis', 'Phased Renovation', 'Code Compliance'] },
    { icon: '▣', title: 'Project Management', description: 'Seamless delivery from groundbreaking to ribbon-cutting. We manage all aspects of construction administration.', features: ['Schedule Management', 'Budget Control', 'Contractor Coordination', 'Quality Assurance'] },
  ];

  const services = settings?.services?.length > 0 ? settings.services : defaultServices;

  return (
    <div className="min-h-screen bg-stone-50">
      <div className="bg-stone-900 text-white pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          <p className="text-stone-400 text-sm tracking-[0.3em] uppercase mb-4">What We Offer</p>
          <h1 className="font-display text-6xl md:text-8xl font-light">{settings?.servicesTitle || 'Services'}</h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="space-y-0">
          {services.map((service: any, i: number) => (
            <div key={i} className="grid grid-cols-1 lg:grid-cols-2 border-t border-stone-200 py-16 gap-12 group">
              <div>
                <div className="flex items-start gap-6 mb-6">
                  <span className="text-3xl mt-1">{service.icon || '◻'}</span>
                  <div>
                    <p className="text-xs text-stone-400 tracking-widest uppercase mb-2">0{i + 1}</p>
                    <h3 className="font-display text-3xl font-light">{service.title}</h3>
                  </div>
                </div>
                <p className="text-stone-500 leading-relaxed ml-14">{service.description}</p>
              </div>
              {service.features && (
                <div className="ml-14 lg:ml-0">
                  <p className="text-xs text-stone-400 tracking-widest uppercase mb-4">Includes</p>
                  <ul className="space-y-2">
                    {service.features.map((f: string, j: number) => (
                      <li key={j} className="flex items-center gap-3 text-stone-600 text-sm">
                        <span className="w-1 h-1 bg-stone-400 rounded-full flex-shrink-0" />
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Process */}
      <div className="bg-stone-900 text-white py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <p className="text-stone-400 text-sm tracking-widest uppercase mb-12">Our Process</p>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {['Discovery', 'Design', 'Development', 'Delivery'].map((step, i) => (
              <div key={i} className="border-t border-stone-700 pt-6">
                <p className="text-stone-500 text-xs mb-4">0{i + 1}</p>
                <h4 className="font-display text-2xl font-light mb-3">{step}</h4>
                <p className="text-stone-400 text-sm leading-relaxed">
                  {['Understanding your vision, site, and requirements through deep listening.',
                    'Developing concepts that balance aesthetics, function, and budget.',
                    'Refining every detail through collaboration and technical rigor.',
                    'Managing construction to ensure your vision is realized perfectly.'][i]}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
      }
