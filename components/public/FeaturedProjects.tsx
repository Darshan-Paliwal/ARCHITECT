import Image from 'next/image';
import Link from 'next/link';

export default function FeaturedProjects({ projects }: { projects: any[] }) {
  return (
    <section className="py-24 px-6 bg-stone-50">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-end justify-between mb-16">
          <div>
            <p className="text-xs text-stone-400 tracking-widest uppercase mb-3">Selected Work</p>
            <h2 className="font-display text-5xl font-light text-stone-900">Featured Projects</h2>
          </div>
          <Link href="/projects" className="hidden md:flex items-center gap-2 text-sm tracking-widest uppercase text-stone-500 hover:text-stone-900 transition-colors">
            All Projects →
          </Link>
        </div>

        {projects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
            {projects.slice(0, 3).map((project, i) => (
              <Link
                key={project._id}
                href={`/projects/${project.slug}`}
                className={`group relative overflow-hidden ${i === 0 ? 'md:col-span-7 aspect-[4/3]' : 'md:col-span-5 aspect-[4/3]'}`}
              >
                <div className="absolute inset-0 bg-stone-200">
                  {project.images?.[0] && (
                    <Image src={project.images[0].url} alt={project.title} fill className="object-cover transition-transform duration-700 group-hover:scale-105" />
                  )}
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-stone-900/80 via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <p className="text-stone-300 text-xs tracking-widest uppercase mb-1">{project.category}</p>
                  <h3 className="font-display text-2xl font-light text-white">{project.title}</h3>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 text-stone-400">No featured projects yet.</div>
        )}

        <Link href="/projects" className="mt-8 md:hidden flex items-center justify-center gap-2 text-sm tracking-widest uppercase text-stone-500">
          All Projects →
        </Link>
      </div>
    </section>
  );
            }
