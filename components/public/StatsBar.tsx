export default function StatsBar() {
  const stats = [
    { number: '250+', label: 'Projects Completed' },
    { number: '25', label: 'Years Experience' },
    { number: '18', label: 'Design Awards' },
    { number: '40+', label: 'Team Members' },
  ];

  return (
    <div className="bg-stone-900 text-white py-12 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 divide-x divide-stone-700">
        {stats.map((s, i) => (
          <div key={i} className="text-center px-4">
            <p className="font-display text-4xl font-light mb-1">{s.number}</p>
            <p className="text-stone-400 text-xs tracking-widest uppercase">{s.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
