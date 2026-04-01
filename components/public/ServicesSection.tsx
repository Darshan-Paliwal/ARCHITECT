const defaultServices = [
  { icon: '⬜', title: 'Architectural Design', description: 'Comprehensive design from concept to completion.' },
  { icon: '⬛', title: 'Interior Architecture', description: 'Spaces shaped from the inside out.' },
  { icon: '◻', title: 'Urban Planning', description: 'Designing developments that shape communities.' },
  { icon: '◼', title: 'Sustainable Design', description: 'Building responsibly for the future.' },
];

export default function ServicesSection({ settings }: { settings: any }) {
  const services = settings?.services?.length > 0 ? settings.services : defaultServices;

  return (
    <section className="py-24 px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="mb-16">
          <p className="text-xs text-stone-400 tracking-widest uppercase mb-3">Expertise</p>
          <h2 className="font-display text-5xl font-light">{settings?.servicesTitle || 'What We Do'}</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-0 border-t border-l border-stone-200">
          {services.slice(0, 4).map((s: any, i: number) => (
            <div key={i} className="p-8 border-b border-r border-stone-200 hover:bg-stone-50 transition-colors">
              <span className="text-2xl block mb-4">{s.icon || '◻'}</span>
              <h3 className="font-display text-xl font-light mb-3">{s.title}</h3>
              <p className="text-stone-500 text-sm leading-relaxed">{s.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
