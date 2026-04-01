import HeroSection from '@/components/public/HeroSection';
import FeaturedProjects from '@/components/public/FeaturedProjects';
import StatsBar from '@/components/public/StatsBar';
import ServicesSection from '@/components/public/ServicesSection';
import TestimonialsSection from '@/components/public/TestimonialsSection';
import ContactCTA from '@/components/public/ContactCTA';

async function getSettings() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/settings`, {
      cache: 'no-store',
    });
    const data = await res.json();
    return data.data;
  } catch { return null; }
}

async function getFeaturedProjects() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/projects?featured=true&limit=6`, {
      cache: 'no-store',
    });
    const data = await res.json();
    return data.data || [];
  } catch { return []; }
}

async function getTestimonials() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/testimonials?featured=true`, {
      cache: 'no-store',
    });
    const data = await res.json();
    return data.data || [];
  } catch { return []; }
}

export default async function HomePage() {
  const [settings, projects, testimonials] = await Promise.all([
    getSettings(),
    getFeaturedProjects(),
    getTestimonials(),
  ]);

  return (
    <>
      <HeroSection settings={settings} />
      <StatsBar />
      <FeaturedProjects projects={projects} />
      <ServicesSection settings={settings} />
      <TestimonialsSection testimonials={testimonials} />
      <ContactCTA settings={settings} />
    </>
  );
}
