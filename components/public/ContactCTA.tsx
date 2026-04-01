import Link from 'next/link';

export default function ContactCTA({ settings }: { settings: any }) {
  return (
    <section className="py-32 px-6 bg-stone-50">
      <div className="max-w-4xl mx-auto text-center">
        <p className="text-xs text-stone-400 tracking-widest uppercase mb-6">Ready to Build?</p>
        <h2 className="font-display text-5xl md:text-7xl font-light text-stone-900 mb-8">
          Let's Create<br />Something<br />Extraordinary
        </h2>
        <p className="text-stone-500 mb-12 max-w-lg mx-auto leading-relaxed">
          Every great project begins with a conversation. Tell us about your vision.
        </p>
        <div className="flex justify-center gap-4">
          <Link href="/contact" className="bg-stone-900 text-white px-10 py-4 text-sm tracking-widest uppercase hover:bg-stone-700 transition-colors">
            Start a Conversation
          </Link>
        </div>
        {settings?.contactEmail && (
          <p className="mt-8 text-stone-400 text-sm">Or email us at <a href={`mailto:${settings.contactEmail}`} className="underline">{settings.contactEmail}</a></p>
        )}
      </div>
    </section>
  );
}
