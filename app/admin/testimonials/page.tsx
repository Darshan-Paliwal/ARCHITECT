'use client';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import TestimonialForm from '@/components/admin/TestimonialForm';

export default function AdminTestimonials() {
  const [testimonials, setTestimonials] = useState<any[]>([]);
  const [editItem, setEditItem] = useState<any>(null);
  const [showForm, setShowForm] = useState(false);

  const fetch_ = async () => {
    const res = await fetch('/api/testimonials');
    const d = await res.json();
    setTestimonials(d.data || []);
  };

  const remove = async (id: string) => {
    if (!confirm('Delete this testimonial?')) return;
    await fetch(`/api/testimonials/${id}`, { method: 'DELETE' });
    toast.success('Deleted');
    fetch_();
  };

  useEffect(() => { fetch_(); }, []);

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="font-display text-3xl font-light">Testimonials</h1>
        <button onClick={() => { setEditItem(null); setShowForm(true); }} className="bg-stone-900 text-white px-6 py-3 text-sm tracking-widest uppercase">
          + Add
        </button>
      </div>

      {showForm && (
        <div className="mb-8">
          <TestimonialForm testimonial={editItem} onSave={() => { setShowForm(false); fetch_(); }} onCancel={() => setShowForm(false)} />
        </div>
      )}

      <div className="space-y-2">
        {testimonials.map(t => (
          <div key={t._id} className="bg-white p-4 flex items-start gap-4">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <p className="font-medium">{t.name}</p>
                <span className="text-stone-400 text-sm">— {t.company}</span>
              </div>
              <p className="text-stone-500 text-sm line-clamp-2">{t.content}</p>
              <div className="flex mt-1">{'★'.repeat(t.rating)}</div>
            </div>
            <div className="flex gap-2 flex-shrink-0">
              <button onClick={() => { setEditItem(t); setShowForm(true); }} className="text-sm text-stone-500 px-3 py-1.5 border border-stone-200 hover:border-stone-900 transition-colors">Edit</button>
              <button onClick={() => remove(t._id)} className="text-sm text-red-500 px-3 py-1.5 border border-red-200 hover:border-red-400 transition-colors">Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
                  }
