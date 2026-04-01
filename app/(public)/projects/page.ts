import Image from 'next/image';
import Link from 'next/link';

async function getProjects() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/projects?status=published`, {
      cache: 'no-store',
    });
    const data = await res.json();
    return data.data || [];
  } catch { return []; }
}

export default async function ProjectsPage() {
  const projects = await getProjects();
  const categories = ['All', ...Array.from(new Set(projects.map((p: any) => p.category)))];

  return (
    <div className="min-h-screen bg-stone-50">
      {/* Header */}
      <div className="bg-stone-900 text-white pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          <p className="text-stone-400 text-sm tracking-[0.3em] uppercase mb-4">Our Work</p>
          <h1 className="font-display text-6xl md:text-8xl font-light">Projects</h1>
        </div>
      </div>

      {/* Projects Grid */}
      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project: any, i: number) => (
            <Link key={project._id} href={`/projects/${project.slug}`} className="group block">
              <div className="relative aspect-[4/3] overflow-hidden bg-stone-200 mb-4">
                {project.images?.[0] ? (
                  <Image
                    src={project.images[0].url}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                ) : (
                  <div className="absolute inset-0 bg-gradient-to-br from-stone-300 to-stone-400 flex items-center justify-center">
                    <span className="text-stone-500 text-sm">No image</span>
                  </div>
                )}
                <div className="absolute inset-0 bg-stone-900/0 group-hover:bg-stone-900/20 transition-colors duration-500" />
              </div>
              <div>
                <p className="text-xs text-stone-400 tracking-widest uppercase mb-1">{project.category}</p>
                <h3 className="font-display text-xl font-light text-stone-900 group-hover:text-stone-600 transition-colors">{project.title}</h3>
                <p className="text-stone-500 text-sm mt-1">{project.location} {project.year && `· ${project.year}`}</p>
              </div>
            </Link>
          ))}
        </div>

        {projects.length === 0 && (
          <div className="text-center py-24">
            <p className="text-stone-400">No projects found.</p>
          </div>
        )}
      </div>
    </div>
  );
        }
