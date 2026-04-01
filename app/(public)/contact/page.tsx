'use client';
import { useState } from 'react';
import toast from 'react-hot-toast';

export default function ContactPage() {
  const [form, setForm] = useState({
    name: '', email: '', phone: '', subject: '', message: '', projectType: '', budget: '',
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (data.success) {
        toast.success('Message sent! We\'ll be in touch soon.');
        setForm({ name: '', email: '', phone: '', subject: '', message: '', projectType: '', budget: '' });
      } else {
        toast.error(data.error || 'Something went wrong.');
      }
    } catch {
      toast.error('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const inputClass = 'w-full bg-transparent border-b border-stone-300 py-3 text-stone-900 placeholder-stone-400 focus:outline-none focus:border-stone-900 transition-colors';

  return (
    <div className="min-h-screen bg-stone-50">
      <div className="bg-stone-900 text-white pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          <p className="text-stone-400 text-sm tracking-[0.3em] uppercase mb-4">Get In Touch</p>
          <h1 className="font-display text-6xl md:text-8xl font-light">Contact</h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
          {/* Info */}
          <div>
            <h2 className="font-display text-3xl font-light mb-8">Let's Build Something Exceptional</h2>
            <p className="text-stone-500 mb-12 leading-relaxed">Whether you have a project in mind or simply want to explore possibilities, we'd love to hear from you.</p>
            <div className="space-y-6">
              <div>
                <p className="text-xs text-stone-400 tracking-widest uppercase mb-2">Email</p>
                <p className="text-stone-700">hello@formaarchitects.com</p>
              </div>
              <div>
                <p className="text-xs text-stone-400 tracking-widest uppercase mb-2">Phone</p>
                <p className="text-stone-700">+1 (555) 000-0000</p>
              </div>
              <div>
                <p className="text-xs text-stone-400 tracking-widest uppercase mb-2">Studio</p>
                <p className="text-stone-700">123 Architecture Lane<br />New York, NY 10001</p>
              </div>
              <div>
                <p className="text-xs text-stone-400 tracking-widest uppercase mb-2">Hours</p>
                <p className="text-stone-700">Monday – Friday, 9am – 6pm</p>
              </div>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <input required className={inputClass} placeholder="Your Name *" value={form.name} onChange={e => setForm({...form, name: e.target.value})} />
              </div>
              <div>
                <input required type="email" className={inputClass} placeholder="Email Address *" value={form.email} onChange={e => setForm({...form, email: e.target.value})} />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <input className={inputClass} placeholder="Phone Number" value={form.phone} onChange={e => setForm({...form, phone: e.target.value})} />
              </div>
              <div>
                <select className={inputClass} value={form.projectType} onChange={e => setForm({...form, projectType: e.target.value})}>
                  <option value="">Project Type</option>
                  <option>Residential</option>
                  <option>Commercial</option>
                  <option>Mixed-Use</option>
                  <option>Renovation</option>
                  <option>Interior Design</option>
                  <option>Other</option>
                </select>
              </div>
            </div>
            <div>
              <select className={inputClass} value={form.budget} onChange={e => setForm({...form, budget: e.target.value})}>
                <option value="">Estimated Budget</option>
                <option>Under $500K</option>
                <option>$500K – $1M</option>
                <option>$1M – $5M</option>
                <option>$5M – $20M</option>
                <option>$20M+</option>
              </select>
            </div>
            <div>
              <input className={inputClass} placeholder="Subject" value={form.subject} onChange={e => setForm({...form, subject: e.target.value})} />
            </div>
            <div>
              <textarea required rows={5} className={inputClass} placeholder="Tell us about your project *" value={form.message} onChange={e => setForm({...form, message: e.target.value})} />
            </div>
            <button type="submit" disabled={loading} className="w-full bg-stone-900 text-white py-4 font-body tracking-widest text-sm uppercase hover:bg-stone-700 transition-colors disabled:opacity-60">
              {loading ? 'Sending...' : 'Send Message'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
  }
