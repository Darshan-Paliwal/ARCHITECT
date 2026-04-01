'use client';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import ProjectForm from '@/components/admin/ProjectForm';

export default function EditProjectPage() {
  const { id } = useParams();
  const [project, setProject] = useState(null);

  useEffect(() => {
    fetch(`/api/projects/id/${id}`)
      .then(r => r.json())
      .then(d => setProject(d.data));
  }, [id]);

  return (
    <div>
      <h1 className="font-display text-3xl font-light mb-8">Edit Project</h1>
      {project ? <ProjectForm project={project} /> : <p className="text-stone-400">Loading...</p>}
    </div>
  );
}
