'use client';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

export default function AdminContactInfo() {
  const [contacts, setContacts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetch_ = async () => {
    try {
      const res = await fetch('/api/contact');
      const d = await res.json();
      setContacts(d.data || []);
    } finally { setLoading(false); }
  };

  const updateStatus = async (id: string, status: string) => {
    await fetch(`/api/contact/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status }),
    });
    toast.success('Status updated');
    fetch_();
  };

  const remove = async (id: string) => {
    if (!confirm('Delete this inquiry?')) return;
    await fetch(`/api/contact/${id}`, { method: 'DELETE' });
    toast.success('Deleted');
    fetch_();
  };

  useEffect(() => { fetch_(); }, []);

  const statusColor: Record<string, string> = {
    new: 'bg-blue-100 text-blue-700',
    read: 'bg-stone-100 text-stone-600',
    replied: 'bg-green-100 text-green-700',
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="font-display text-3xl font-light">Contact Inquiries</h1>
        <p className="text-stone-500 text-sm mt-1">{contacts.filter(c => c.status === 'new').length} new messages</p>
      </div>

      {loading ? <div className="text-stone-400">Loading...</div> : (
        <div className="space-y-3">
          {contacts.map(c => (
            <div key={c._id} className={`bg-white p-5 ${c.status === 'new' ? 'border-l-4 border-blue-500' : ''}`}>
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-2">
                    <p className="font-medium text-stone-900">{c.name}</p>
                    <span className={`text-xs px-2 py-0.5 ${statusColor[c.status]}`}>{c.status}</span>
                    {c.projectType && <span className="text-xs text-stone-400 bg-stone-100 px-2 py-0.5">{c.projectType}</span>}
                  </div>
                  <div className="flex gap-4 text-sm text-stone-400 mb-2">
                    <a href={`mailto:${c.email}`} className="hover:text-stone-700">{c.email}</a>
                    {c.phone && <span>{c.phone}</span>}
                    {c.budget && <span>Budget: {c.budget}</span>}
                  </div>
                  <p className="text-stone-600 text-sm">{c.message}</p>
                  <p className="text-stone-400 text-xs mt-2">{new Date(c.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                </div>
                <div className="flex flex-col gap-2 flex-shrink-0">
                  <select value={c.status} onChange={e => updateStatus(c._id, e.target.value)} className="text-xs border border-stone-200 px-2 py-1 focus:outline-none">
                    <option value="new">New</option>
                    <option value="read">Read</option>
                    <option value="replied">Replied</option>
                  </select>
                  <a href={`mailto:${c.email}`} className="text-xs text-center text-stone-500 border border-stone-200 px-2 py-1 hover:border-stone-900 transition-colors">Reply</a>
                  <button onClick={() => remove(c._id)} className="text-xs text-red-500 border border-red-200 px-2 py-1 hover:border-red-400 transition-colors">Delete</button>
                </div>
              </div>
            </div>
          ))}
          {contacts.length === 0 && <div className="bg-white text-center py-12 text-stone-400">No inquiries yet.</div>}
        </div>
      )}
    </div>
  );
      }
