import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';

async function getProject(slug: string) {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/projects/${slug}`, {
      cache: 'no-store',
    });
    if (!res.ok) return null;
    const data = await res.json();
    return data.data;
  } catch { return null; }
}

export default async function ProjectDetailPage({ params }: { params: { slug: string } }) {
  const project = await getProject(params.slug);
  if (!project) notFound();

  return (
    <div className="min-h-screen bg-stone-50">
      {/* Hero Image */}
      <div className="relative h-[70vh] bg-stone-900">
        {project.images?.[0] && (
          <Image
            src={project.images[0].url}
            alt={project.title}
            fill
            className="object-cover opacity-70"
            priority
          />
        )}
        <div className="absolute inset-0 flex items-end">
          <div className="max-w-7xl mx-auto w-full px-6 pb-16">
            <p className="text-stone-300 text-sm tracking-widest uppercase mb-3">{project.category}</p>
            <h1 className="font-display text-5xl md:text-7xl font-light text-white">{project.title}</h1>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
          {/* Info */}
          <div className="lg:col-span-1 space-y-8">
            <div>
              <p className="text-xs text-stone-400 tracking-widest uppercase mb-4">Project Details</p>
              {project.location && <InfoRow label="Location" value={project.location} />}
              {project.year && <InfoRow label="Year" value={project.year} />}
              {project.area && <InfoRow label="Area" value={project.area} />}
              {project.client && <InfoRow label="Client" value={project.client} />}
            </div>
            <Link href="/projects" className="inline-flex items-center gap-2 text-stone-500 hover:text-stone-900 transition-colors text-sm">
              ← Back to Projects
            </Link>
          </div>

          {/* Description */}
          <div className="lg:col-span-2">
            <p className="font-display text-2xl font-light text-stone-700 mb-8 leading-relaxed">{project.description}</p>
            {project.fullDescription && (
              <div className="prose prose-stone max-w-none">
                <p className="text-stone-600 leading-relaxed whitespace-pre-line">{project.fullDescription}</p>
              </div>
            )}
          </div>
        </div>

        {/* Image Gallery */}
        {project.images?.length > 1 && (
          <div className="mt-20">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {project.images.slice(1).map((img: any, i: number) => (
                <div key={i} className={`relative ${i === 0 ? 'md:col-span-2 aspect-video' : 'aspect-[4/3]'} overflow-hidden bg-stone-200`}>
                  <Image src={img.url} alt={`${project.title} ${i + 2}`} fill className="object-cover" />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between py-3 border-b border-stone-200">
      <span className="text-stone-400 text-sm">{label}</span>
      <span className="text-stone-800 text-sm font-medium">{value}</span>
    </div>
  );
}
