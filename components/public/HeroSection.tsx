'use client';
import { useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function HeroSection({ settings }: { settings: any }) {
  const heroTitle = settings?.heroTitle || 'Architecture\nBeyond\nBoundaries';
  const heroSubtitle = settings?.heroSubtitle || 'We create spaces that transcend the ordinary.';

  return (
    <section className="relative h-screen flex items-end bg-stone-950 overflow-hidden">
      {/* Background */}
      {settings?.heroImage?.url ? (
        <Image src={settings.heroImage.url} alt="Hero" fill className="object-cover opacity-50" priority />
      ) : (
        <div className="absolute inset-0 bg-gradient-to-br from-stone-900 via-stone-800 to-stone-950">
          <div className="absolute inset-0" style={{backgroundImage: 'radial-gradient(circle at 30% 50%, rgba(120,113,108,0.15) 0%, transparent 60%), radial-gradient(circle at 80% 20%, rgba(168,162,158,0.1) 0%, transparent 50%)'}} />
        </div>
      )}

      {/* Geometric accent */}
      <div className="absolute top-1/2 right-16 -translate-y-1/2 w-px h-48 bg-white/20 hidden lg:block" />
      <div className="absolute top-1/2 right-16 -translate-y-1/2 w-8 h-px bg-white/20 hidden lg:block translate-x-0" />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto w-full px-6 pb-20">
        <div className="max-w-4xl">
          <p className="text-stone-400 text-xs tracking-[0.4em] uppercase mb-8 animate-fade-in" style={{animationDelay: '0.2s'}}>
            Est. 2001 — Architecture & Design
          </p>
          <h1 className="font-display text-6xl md:text-8xl lg:text-9xl font-light text-white leading-none mb-8 whitespace-pre-line animate-fade-up" style={{animationDelay: '0.4s'}}>
            {heroTitle}
          </h1>
          <p className="text-stone-300 text-lg max-w-md leading-relaxed mb-12 animate-fade-up" style={{animationDelay: '0.7s'}}>
            {heroSubtitle}
          </p>
          <div className="flex flex-wrap gap-4 animate-fade-up" style={{animationDelay: '0.9s'}}>
            <Link href="/projects" className="bg-white text-stone-900 px-8 py-4 text-sm tracking-widest uppercase hover:bg-stone-100 transition-colors">
              View Work
            </Link>
            <Link href="/contact" className="border border-white/40 text-white px-8 py-4 text-sm tracking-widest uppercase hover:border-white transition-colors">
              Start a Project
            </Link>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 right-8 flex flex-col items-center gap-2 text-white/40">
        <span className="text-xs tracking-widest uppercase rotate-90 mb-4">Scroll</span>
        <div className="w-px h-12 bg-white/20 animate-pulse" />
      </div>
    </section>
  );
      }
