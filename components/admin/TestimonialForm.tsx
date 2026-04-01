'use client';
import { useState } from 'react';
import toast from 'react-hot-toast';

export default function TestimonialForm({ testimonial, onSave, onCancel }: any) {
  const isEdit = !!testimonial;
  const [form, setForm] = useState({
    name: testimonial?.name || '',
    role: testimonial?.role || '',
    company: testimonial?.company || '',
    content: testimonial?.content || '',
    rating: testimonial?.rating || 5,
    featured: testimonial?.featured ?? true,
  });
  const [saving, setSaving] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const url = isEdit ? `/api/testimonials/${testimonial._id}` : '/api/testimonials';
      const method = isEdit ? 'PUT' : 'POST';
      const res = await fetch(url, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) });
      const d = await res.json();
      if (d.success) { toast.success(isEdit ? 'Updated!' : 'Created!'); onSave(); }
      else toast.error(d.error);
    } catch { toast.error('Error'); }
    finally { setSaving(false); }
  };

  const inputClass = 'w-full border border-stone-200 px-4 py-3 text-sm focus:outline-none focus:border-stone-900 transition-colors';

  return (
    <div className="bg-white p-6">
      <h3 className="text-xs tracking-widest uppercase text-stone-500 mb-6">{isEdit ? 'Edit' : 'New'} Testimonial</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs text-stone-500 uppercase tracking-widest mb-2">Name *</label>
            <input required value={form.name} onChange={e => setForm(p => ({...p, name: e.target.value}))} className={inputClass} />
          </div>
          <div>
            <label className="block text-xs text-stone-500 uppercase tracking-widest mb-2">Rating</label>
            <select value={form.rating} onChange={e => setForm(p => ({...p, rating: +e.target.value}))} className={inputClass}>
              {[5,4,3,2,1].map(r => <option key={r} value={r}>{r} Stars</option>)}
            </select>
          </div>
          <div>
            <label className="block text-xs text-stone-500 uppercase tracking-widest mb-2">Role</label>
            <input value={form.role} onChange={e => setForm(p => ({...p, role: e.target.value}))} className={inputClass} />
          </div>
          <div>
            <label className="block text-xs text-stone-500 uppercase tracking-widest mb-2">Company</label>
            <input value={form.company} onChange={e => setForm(p => ({...p, company: e.target.value}))} className={inputClass} />
          </div>
        </div>
        <div>
          <label className="block text-xs text-stone-500 uppercase tracking-widest mb-2">Testimonial *</label>
          <textarea required value={form.content} onChange={e => setForm(p => ({...p, content: e.target.value}))} rows={4} className={inputClass} />
        </div>
        <div className="flex items-center gap-3">
          <input type="checkbox" id="feat" checked={form.featured} onChange={e => setForm(p => ({...p, featured: e.target.checked}))} className="w-4 h-4" />
          <label htmlFor="feat" className="text-sm text-stone-700">Show on homepage</label>
        </div>
        <div className="flex gap-3">
          <button type="submit" disabled={saving} className="bg-stone-900 text-white px-6 py-2 text-sm uppercase tracking-widest disabled:opacity-60">
            {saving ? 'Saving...' : isEdit ? 'Update' : 'Create'}
          </button>
          <button type="button" onClick={onCancel} className="border border-stone-200 px-6 py-2 text-sm text-stone-500">Cancel</button>
        </div>
      </form>
    </div>
  );
    }
