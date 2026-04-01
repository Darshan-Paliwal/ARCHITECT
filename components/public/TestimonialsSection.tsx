'use client';
import { useState } from 'react';

export default function TestimonialsSection({ testimonials }: { testimonials: any[] }) {
  const [active, setActive] = useState(0);
  if (!testimonials?.length) return null;

  return (
    <section className="py-24 px-6 bg-stone-900 text-white overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <p className="text-xs text-stone-500 tracking-widest uppercase mb-16">Client Voices</p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <div className="text-stone-400 text-6xl font-display mb-6">"</div>
            <blockquote className="font-display text-2xl font-light leading-relaxed text-stone-200 mb-8">
              {testimonials[active]?.content}
            </blockquote>
            <div>
              <p className="font-medium text-white">{testimonials[active]?.name}</p>
              <p className="text-stone-400 text-sm">
                {testimonials[active]?.role}{testimonials[active]?.company && `, ${testimonials[active].company}`}
              </p>
            </div>

            {/* Stars */}
            <div className="flex gap-1 mt-4">
              {Array.from({ length: testimonials[active]?.rating || 5 }).map((_, i) => (
                <span key={i} className="text-stone-400">★</span>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div className="space-y-4">
            {testimonials.map((t, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                className={`w-full text-left p-4 border transition-colors ${i === active ? 'border-stone-500 bg-stone-800' : 'border-stone-800 hover:border-stone-600'}`}
              >
                <p className="font-medium text-sm">{t.name}</p>
                <p className="text-stone-500 text-xs">{t.company}</p>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
          }
