'use client';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

export default function AdminSettings() {
  const [settings, setSettings] = useState<any>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [heroFile, setHeroFile] = useState<File | null>(null);
  const [aboutFile, setAboutFile] = useState<File | null>(null);

  useEffect(() => {
    fetch('/api/settings').then(r => r.json()).then(d => {
      setSettings(d.data || {});
      setLoading(false);
    });
  }, []);

  const handleSave = async () => {
    setSaving(true);
    const form = new FormData();

    Object.entries(settings).forEach(([k, v]) => {
      if (typeof v === 'object' && v !== null) {
        form.append(k, JSON.stringify(v));
      } else if (v !== undefined && v !== null) {
        form.append(k, String(v));
      }
    });

    if (logoFile) form.append('logo', logoFile);
    if (heroFile) form.append('heroImage', heroFile);
    if (aboutFile) form.append('aboutImage', aboutFile);

    try {
      const res = await fetch('/api/settings', { method: 'PUT', body: form });
      const d = await res.json();
      if (d.success) { toast.success('Settings saved!'); setSettings(d.data); }
      else toast.error(d.error);
    } catch { toast.error('Save failed'); }
    finally { setSaving(false); }
  };

  const set = (key: string, value: any) => setSettings((prev: any) => ({ ...prev, [key]: value }));

  if (loading) return <div className="text-stone-400">Loading...</div>;

  const inputClass = 'w-full border border-stone-200 bg-white px-4 py-3 text-sm focus:outline-none focus:border-stone-900 transition-colors';
  const labelClass = 'block text-xs text-stone-500 tracking-widest uppercase mb-2';

  return (
    <div className="max-w-3xl">
      <div className="flex items-center justify-between mb-8">
        <h1 className="font-display text-3xl font-light">Site Settings</h1>
        <button onClick={handleSave} disabled={saving} className="bg-stone-900 text-white px-6 py-3 text-sm tracking-widest uppercase disabled:opacity-60">
          {saving ? 'Saving...' : 'Save Changes'}
        </button>
      </div>

      <div className="space-y-8">
        {/* Brand */}
        <Section title="Brand Identity">
          <div className="grid grid-cols-2 gap-4">
            <Field label="Firm Name" value={settings.firmName} onChange={v => set('firmName', v)} inputClass={inputClass} labelClass={labelClass} />
            <Field label="Tagline" value={settings.tagline} onChange={v => set('tagline', v)} inputClass={inputClass} labelClass={labelClass} />
          </div>
          <div>
            <label className={labelClass}>Logo</label>
            {settings.logo?.url && <img src={settings.logo.url} alt="Logo" className="h-12 mb-2 object-contain" />}
            <input type="file" accept="image/*" onChange={e => setLogoFile(e.target.files?.[0] || null)} className="text-sm text-stone-500" />
          </div>
        </Section>

        {/* Colors */}
        <Section title="Theme Colors">
          <div className="grid grid-cols-3 gap-4">
            {[['primaryColor', 'Primary'], ['secondaryColor', 'Secondary'], ['accentColor', 'Accent']].map(([key, label]) => (
              <div key={key}>
                <label className={labelClass}>{label}</label>
                <div className="flex gap-2">
                  <input type="color" value={settings[key] || '#000000'} onChange={e => set(key, e.target.value)} className="w-12 h-10 cursor-pointer border border-stone-200" />
                  <input value={settings[key] || ''} onChange={e => set(key, e.target.value)} className={inputClass} placeholder="#000000" />
                </div>
              </div>
            ))}
          </div>
        </Section>

        {/* Hero */}
        <Section title="Hero Section">
          <Field label="Hero Title (use \\n for line breaks)" value={settings.heroTitle} onChange={v => set('heroTitle', v)} inputClass={inputClass} labelClass={labelClass} textarea />
          <Field label="Hero Subtitle" value={settings.heroSubtitle} onChange={v => set('heroSubtitle', v)} inputClass={inputClass} labelClass={labelClass} />
          <div>
            <label className={labelClass}>Hero Background Image</label>
            {settings.heroImage?.url && <img src={settings.heroImage.url} alt="Hero" className="h-24 object-cover mb-2 w-full" />}
            <input type="file" accept="image/*" onChange={e => setHeroFile(e.target.files?.[0] || null)} className="text-sm text-stone-500" />
          </div>
        </Section>

        {/* About */}
        <Section title="About Section">
          <Field label="About Title" value={settings.aboutTitle} onChange={v => set('aboutTitle', v)} inputClass={inputClass} labelClass={labelClass} />
          <Field label="About Content" value={settings.aboutContent} onChange={v => set('aboutContent', v)} inputClass={inputClass} labelClass={labelClass} textarea />
          <div>
            <label className={labelClass}>About Image</label>
            {settings.aboutImage?.url && <img src={settings.aboutImage.url} alt="About" className="h-24 object-cover mb-2" />}
            <input type="file" accept="image/*" onChange={e => setAboutFile(e.target.files?.[0] || null)} className="text-sm text-stone-500" />
          </div>
        </Section>

        {/* Contact */}
        <Section title="Contact Info">
          <div className="grid grid-cols-2 gap-4">
            <Field label="Email" value={settings.contactEmail} onChange={v => set('contactEmail', v)} inputClass={inputClass} labelClass={labelClass} />
            <Field label="Phone" value={settings.contactPhone} onChange={v => set('contactPhone', v)} inputClass={inputClass} labelClass={labelClass} />
          </div>
          <Field label="Address" value={settings.contactAddress} onChange={v => set('contactAddress', v)} inputClass={inputClass} labelClass={labelClass} />
        </Section>

        {/* Social */}
        <Section title="Social Links">
          {['instagram', 'linkedin', 'twitter', 'facebook'].map(social => (
            <Field key={social} label={social.charAt(0).toUpperCase() + social.slice(1)} value={settings.socialLinks?.[social] || ''} onChange={v => set('socialLinks', { ...settings.socialLinks, [social]: v })} inputClass={inputClass} labelClass={labelClass} />
          ))}
        </Section>

        {/* SEO */}
        <Section title="SEO / Meta">
          <Field label="Meta Title" value={settings.metaTitle} onChange={v => set('metaTitle', v)} inputClass={inputClass} labelClass={labelClass} />
          <Field label="Meta Description" value={settings.metaDescription} onChange={v => set('metaDescription', v)} inputClass={inputClass} labelClass={labelClass} textarea />
        </Section>
      </div>

      <div className="mt-8">
        <button onClick={handleSave} disabled={saving} className="bg-stone-900 text-white px-8 py-4 text-sm tracking-widest uppercase disabled:opacity-60">
          {saving ? 'Saving...' : 'Save All Changes'}
        </button>
      </div>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="bg-white p-6">
      <h2 className="text-xs tracking-widest uppercase text-stone-500 mb-6 pb-3 border-b border-stone-100">{title}</h2>
      <div className="space-y-4">{children}</div>
    </div>
  );
}

function Field({ label, value, onChange, inputClass, labelClass, textarea }: any) {
  return (
    <div>
      <label className={labelClass}>{label}</label>
      {textarea ? (
        <textarea value={value || ''} onChange={e => onChange(e.target.value)} rows={3} className={inputClass} />
      ) : (
        <input value={value || ''} onChange={e => onChange(e.target.value)} className={inputClass} />
      )}
    </div>
  );
}
