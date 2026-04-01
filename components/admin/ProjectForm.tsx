'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import toast from 'react-hot-toast';

export default function ProjectForm({ project }: { project?: any }) {
  const router = useRouter();
  const isEdit = !!project;
  const [form, setForm] = useState({
    title: project?.title || '',
    description: project?.description || '',
    fullDescription: project?.fullDescription || '',
    category: project?.category || '',
    location: project?.location || '',
    year: project?.year || '',
    area: project?.area || '',
    client: project?.client || '',
    featured: project?.featured || false,
    status: project?.status || 'published',
  });
  const [images, setImages] = useState<File[]>([]);
  const [existingImages, setExistingImages] = useState<any[]>(project?.images || []);
  const [saving, setSaving] = useState(false);

  const set = (k: string, v: any) => setForm(p => ({ ...p, [k]: v }));

  const removeExistingImage = (index: number) => {
    setExistingImages(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    const fd = new FormData();
    Object.entries(form).forEach(([k, v]) => fd.append(k, String(v)));
    fd.append('existingImages', JSON.stringify(existingImages));
    images.forEach(f => fd.append('images', f));

    try {
      const url = isEdit ? `/api/projects/id/${project._id}` : '/api/projects';
      const method = isEdit ? 'PUT' : 'POST';
      const res = await fetch(url, { method, body: fd });
      const d = await res.json();
      if (d.success) {
        toast.success(isEdit ? 'Project updated!' : 'Project created!');
        router.push('/admin/projects');
      } else toast.error(d.error || 'Something went wrong');
    } catch { toast.error('Network error'); }
    finally { setSaving(false); }
  };

  const inputClass = 'w-full border border-stone-200 bg-white px-4 py-3 text-sm focus:outline-none focus:border-stone-900 transition-colors';
  const labelClass = 'block text-xs text-stone-500 tracking-widest uppercase mb-2';

  return (
    <form onSubmit={handleSubmit} className="max-w-3xl space-y-6">
      <div className="bg-white p-6">
        <h2 className="text-xs tracking-widest uppercase text-stone-500 mb-6 pb-3 border-b border-stone-100">Basic Info</h2>
        <div className="space-y-4">
          <div>
            <label className={labelClass}>Title *</label>
            <input required value={form.title} onChange={e => set('title', e.target.value)} className={inputClass} placeholder="Project Title" />
          </div>
          <div>
            <label className={labelClass}>Short Description *</label>
            <textarea required value={form.description} onChange={e => set('description', e.target.value)} rows={2} className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>Full Description</label>
            <textarea value={form.fullDescription} onChange={e => set('fullDescription', e.target.value)} rows={5} className={inputClass} />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>Category *</label>
              <select required value={form.category} onChange={e => set('category', e.target.value)} className={inputClass}>
                <option value="">Select...</option>
                {['Residential', 'Commercial', 'Mixed-Use', 'Cultural', 'Hospitality', 'Urban', 'Interior', 'Renovation'].map(c => <option key={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label className={labelClass}>Status</label>
              <select value={form.status} onChange={e => set('status', e.target.value)} className={inputClass}>
                <option value="published">Published</option>
                <option value="draft">Draft</option>
              </select>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div><label className={labelClass}>Location</label><input value={form.location} onChange={e => set('location', e.target.value)} className={inputClass} /></div>
            <div><label className={labelClass}>Year</label><input value={form.year} onChange={e => set('year', e.target.value)} className={inputClass} placeholder="2024" /></div>
            <div><label className={labelClass}>Area (sqft/sqm)</label><input value={form.area} onChange={e => set('area', e.target.value)} className={inputClass} placeholder="5,000 sqft" /></div>
            <div><label className={labelClass}>Client</label><input value={form.client} onChange={e => set('client', e.target.value)} className={inputClass} /></div>
          </div>
          <div className="flex items-center gap-3">
            <input type="checkbox" id="featured" checked={form.featured} onChange={e => set('featured', e.target.checked)} className="w-4 h-4" />
            <label htmlFor="featured" className="text-sm text-stone-700">Feature on homepage</label>
          </div>
        </div>
      </div>

      {/* Images */}
      <div className="bg-white p-6">
        <h2 className="text-xs tracking-widest uppercase text-stone-500 mb-6 pb-3 border-b border-stone-100">Images</h2>

        {existingImages.length > 0 && (
          <div className="mb-4">
            <p className="text-xs text-stone-400 mb-2">Current Images</p>
            <div className="grid grid-cols-4 gap-2">
              {existingImages.map((img, i) => (
                <div key={i} className="relative aspect-square group">
                  <Image src={img.url} alt="" fill className="object-cover" />
                  <button type="button" onClick={() => removeExistingImage(i)} className="absolute top-1 right-1 bg-red-500 text-white text-xs w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">×</button>
                </div>
              ))}
            </div>
          </div>
        )}

        <label className={labelClass}>Upload New Images</label>
        <input
          type="file"
          multiple
          accept="image/*"
          onChange={e => setImages(Array.from(e.target.files || []))}
          className="w-full text-sm text-stone-500 file:mr-4 file:py-2 file:px-4 file:border file:border-stone-300 file:text-sm file:text-stone-700 hover:file:border-stone-900"
        />
        {images.length > 0 && <p className="text-xs text-stone-400 mt-2">{images.length} file(s) selected</p>}
      </div>

      <div className="flex gap-4">
        <button type="submit" disabled={saving} className="bg-stone-900 text-white px-8 py-3 text-sm tracking-widest uppercase disabled:opacity-60">
          {saving ? 'Saving...' : isEdit ? 'Update Project' : 'Create Project'}
        </button>
        <button type="button" onClick={() => router.push('/admin/projects')} className="border border-stone-200 px-8 py-3 text-sm text-stone-500 hover:border-stone-900 transition-colors">
          Cancel
        </button>
      </div>
    </form>
  );
    }
