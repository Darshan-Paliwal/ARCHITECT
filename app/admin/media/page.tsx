'use client';
import { useEffect, useState, useRef } from 'react';
import Image from 'next/image';
import toast from 'react-hot-toast';

export default function AdminMedia() {
  const [media, setMedia] = useState<any[]>([]);
  const [uploading, setUploading] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const fetchMedia = async () => {
    const res = await fetch('/api/media');
    const d = await res.json();
    setMedia(d.data || []);
  };

  const upload = async (files: FileList) => {
    setUploading(true);
    const form = new FormData();
    Array.from(files).forEach(f => form.append('files', f));
    try {
      const res = await fetch('/api/media', { method: 'POST', body: form });
      const d = await res.json();
      if (d.success) { toast.success('Uploaded!'); fetchMedia(); }
      else toast.error(d.error);
    } catch { toast.error('Upload failed'); }
    finally { setUploading(false); }
  };

  const remove = async (id: string, publicId: string) => {
    if (!confirm('Delete this file?')) return;
    await fetch(`/api/media/${id}`, { method: 'DELETE', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ public_id: publicId }) });
    toast.success('Deleted');
    fetchMedia();
  };

  useEffect(() => { fetchMedia(); }, []);

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="font-display text-3xl font-light">Media Manager</h1>
        <button
          onClick={() => fileRef.current?.click()}
          disabled={uploading}
          className="bg-stone-900 text-white px-6 py-3 text-sm tracking-widest uppercase disabled:opacity-60"
        >
          {uploading ? 'Uploading...' : '↑ Upload'}
        </button>
        <input
          ref={fileRef}
          type="file"
          multiple
          accept="image/*,video/*"
          className="hidden"
          onChange={e => e.target.files && upload(e.target.files)}
        />
      </div>

      {/* Drop zone */}
      <div
        className="border-2 border-dashed border-stone-300 rounded-none p-12 text-center mb-8 hover:border-stone-500 transition-colors cursor-pointer"
        onClick={() => fileRef.current?.click()}
        onDragOver={e => e.preventDefault()}
        onDrop={e => { e.preventDefault(); e.dataTransfer.files && upload(e.dataTransfer.files); }}
      >
        <p className="text-stone-400 text-sm">Drop files here or click to upload</p>
        <p className="text-stone-300 text-xs mt-1">Images and videos supported</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
        {media.map(item => (
          <div key={item._id} className="group relative aspect-square bg-stone-200 overflow-hidden">
            {item.resource_type === 'image' ? (
              <Image src={item.url} alt={item.name} fill className="object-cover" />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center bg-stone-700">
                <span className="text-white text-2xl">▶</span>
              </div>
            )}
            <div className="absolute inset-0 bg-stone-900/0 group-hover:bg-stone-900/60 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
              <button onClick={() => remove(item._id, item.public_id)} className="bg-red-500 text-white text-xs px-3 py-1">Delete</button>
            </div>
            <div className="absolute bottom-0 left-0 right-0 bg-stone-900/80 p-1 opacity-0 group-hover:opacity-100 transition-opacity">
              <p className="text-white text-xs truncate">{item.name}</p>
            </div>
          </div>
        ))}
      </div>

      {media.length === 0 && !uploading && (
        <div className="text-center py-8 text-stone-400">No media uploaded yet.</div>
      )}
    </div>
  );
        }
