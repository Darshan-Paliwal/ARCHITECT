import Image from 'next/image';

async function getMedia() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/media?type=image&limit=50`, { cache: 'no-store' });
    const data = await res.json();
    return data.data || [];
  } catch { return []; }
}

async function getProjects() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/projects?status=published`, { cache: 'no-store' });
    const data = await res.json();
    return data.data || [];
  } catch { return []; }
}

export default async function GalleryPage() {
  const [media, projects] = await Promise.all([getMedia(), getProjects()]);

  // Combine project images + media
  const allImages: Array<{ url: string; caption?: string }> = [
    ...projects.flatMap((p: any) => p.images?.map((img: any) => ({ url: img.url, caption: p.title })) || []),
    ...media.filter((m: any) => m.resource_type === 'image').map((m: any) => ({ url: m.url, caption: m.name })),
  ];

  return (
    <div className="min-h-screen bg-stone-950">
      <div className="pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          <p className="text-stone-500 text-sm tracking-[0.3em] uppercase mb-4">Visual Archive</p>
          <h1 className="font-display text-6xl md:text-8xl font-light text-white">Gallery</h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 pb-20">
        {allImages.length > 0 ? (
          <div className="columns-1 md:columns-2 lg:columns-3 gap-4 space-y-4">
            {allImages.map((img, i) => (
              <div key={i} className="relative overflow-hidden group break-inside-avoid">
                <Image
                  src={img.url}
                  alt={img.caption || `Gallery image ${i + 1}`}
                  width={600}
                  height={400}
                  className="w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                {img.caption && (
                  <div className="absolute inset-0 bg-stone-950/0 group-hover:bg-stone-950/60 transition-colors duration-500 flex items-end">
                    <p className="text-white text-sm p-4 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">{img.caption}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-24">
            <p className="text-stone-500">No gallery images yet.</p>
          </div>
        )}
      </div>
    </div>
  );
}
