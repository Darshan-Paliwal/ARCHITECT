'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import toast from 'react-hot-toast';

export default function AdminProjects() {
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchProjects = async () => {
    try {
      const res = await fetch('/api/projects');
      const data = await res.json();
      setProjects(data.data || []);
    } catch { toast.error('Failed to load projects'); }
    finally { setLoading(false); }
  };

  const deleteProject = async (id: string) => {
    if (!confirm('Delete this project?')) return;
    try {
      await fetch(`/api/projects/${id}`, { method: 'DELETE' });
      toast.success('Project deleted');
      fetchProjects();
    } catch { toast.error('Delete failed'); }
  };

  useEffect(() => { fetchProjects(); }, []);

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-display text-3xl font-light">Projects</h1>
          <p className="text-stone-500 text-sm mt-1">{projects.length} total</p>
        </div>
        <Link href="/admin/projects/new" className="bg-stone-900 text-white px-6 py-3 text-sm tracking-widest uppercase hover:bg-stone-700 transition-colors">
          + New Project
        </Link>
      </div>

      {loading ? (
        <div className="text-center py-16 text-stone-400">Loading...</div>
      ) : (
        <div className="space-y-2">
          {projects.map(p => (
            <div key={p._id} className="bg-white flex items-center gap-4 p-4">
              <div className="w-20 h-16 bg-stone-200 flex-shrink-0 relative overflow-hidden">
                {p.images?.[0] && <Image src={p.images[0].url} alt={p.title} fill className="object-cover" />}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <p className="font-medium text-stone-900 truncate">{p.title}</p>
                  <span className={`text-xs px-2 py-0.5 ${p.status === 'published' ? 'bg-green-100 text-green-700' : 'bg-stone-100 text-stone-500'}`}>
                    {p.status}
                  </span>
                  {p.featured && <span className="text-xs px-2 py-0.5 bg-amber-100 text-amber-700">Featured</span>}
                </div>
                <p className="text-stone-400 text-sm">{p.category} · {p.location}</p>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                <Link href={`/admin/projects/${p._id}`} className="text-sm text-stone-500 hover:text-stone-900 px-3 py-1.5 border border-stone-200 hover:border-stone-900 transition-colors">
                  Edit
                </Link>
                <button onClick={() => deleteProject(p._id)} className="text-sm text-red-500 hover:text-red-700 px-3 py-1.5 border border-red-200 hover:border-red-500 transition-colors">
                  Delete
                </button>
              </div>
            </div>
          ))}
          {projects.length === 0 && (
            <div className="bg-white text-center py-16 text-stone-400">
              No projects yet. <Link href="/admin/projects/new" className="underline">Add one</Link>.
            </div>
          )}
        </div>
      )}
    </div>
  );
                                                          }
