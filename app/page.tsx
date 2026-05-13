'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { 
  Printer, 
  Leaf, 
  Zap, 
  Instagram, 
  Briefcase, 
  Clock, 
  Menu, 
  X, 
  Mail, 
  Phone, 
  MapPin, 
  ArrowRight, 
  CheckCheck, 
  Loader2, 
  ImageOff 
} from 'lucide-react';

// DESIGN DECISIONS:
// Layout Energy: editorial
// Depth Treatment: layered
// Divider Style: D-STAT
// Typography Personality: refined

// --- Hooks ---

const useScrollReveal = (threshold = 0.15) => {
  const ref = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold]);
  return { ref, isVisible };
};

// --- Components ---

function SafeImage({ src, alt, fill, width, height, className, priority, fallbackClassName }: {
  src: string; alt: string; fill?: boolean; width?: number; height?: number;
  className?: string; priority?: boolean; fallbackClassName?: string;
}) {
  const [error, setError] = useState(false);
  if (error) {
    return (
      <div className={`flex items-center justify-center bg-gradient-to-br from-[var(--primary)]/60 to-[var(--accent)]/10 ${fallbackClassName ?? className ?? ''}`}>
        <ImageOff size={28} className="text-white/20" />
      </div>
    );
  }
  return (
    <Image src={src} alt={alt} fill={fill}
      width={!fill ? (width ?? 800) : undefined}
      height={!fill ? (height ?? 600) : undefined}
      className={className} priority={priority}
      onError={() => setError(true)} />
  );
}

const BRIEF = {
  brand: {
    name: "NUELBILLY PRINTS",
    tagline: "Precision Printing. Premium Packaging.",
    description: "Lagos' premier destination for high-end branding, custom packaging solutions, and artisanal garment printing.",
    industry: "services",
    region: "nigeria",
    currency: "₦"
  },
  colors: {
    primary: "#9B2226",
    secondary: "#000000",
    accent: "#D4A373"
  },
  contact: {
    instagram: "nuelbilly_prints",
    address: "33 Sanusi Street off bajulaye road shomolu Lagos"
  },
  products: [
    {
      name: "Custom Pizza Boxes",
      description: "Heavy-duty corrugated boxes with vibrant, food-safe branding.",
      price: "₦15,000",
      image: "https://images.unsplash.com/photo-1723824929380-1f48467ce65a?q=80&w=1080"
    },
    {
      name: "Branded Luxury T-Shirts",
      description: "Premium cotton garments with high-fidelity screen or vinyl prints.",
      price: "₦8,500",
      image: "https://images.unsplash.com/photo-1685883785913-7783b947e450?q=80&w=1080"
    },
    {
      name: "Boutique Paper Bags",
      description: "Reinforced luxury paper bags with foil stamping and rope handles.",
      price: "₦5,000",
      image: "https://images.unsplash.com/photo-1760804876161-ba0337e998fe?q=80&w=1080"
    },
    {
      name: "Corrugated Shipping Boxes",
      description: "Durable branded mailers for e-commerce and logistics.",
      price: "₦45,000",
      image: "https://images.unsplash.com/photo-1759157403849-f06d8221e258?q=80&w=1080"
    }
  ],
  features: [
    { title: "Industrial Precision", description: "State-of-the-art offset and digital presses for crisp results.", icon: Printer },
    { title: "Eco-Friendly Stock", description: "Sustainable paper and ink options without compromise.", icon: Leaf },
    { title: "Swift Delivery", description: "Efficient production cycles to meet your business deadlines.", icon: Zap }
  ],
  testimonials: [
    { name: "Tunde Adebayo", text: "The pizza boxes we ordered changed our brand perception entirely. Excellent quality.", role: "CEO, Slice City" },
    { name: "Chioma Nwosu", text: "Best t-shirt quality in Shomolu. Fast, reliable, and colors are perfect.", role: "Creative Director" },
    { name: "Olumide Bakare", text: "Their paper bags are incredibly sturdy and the print finish is premium.", role: "Retail Manager" }
  ],
  stats: [
    { number: "14.5k+", label: "Instagram Followers" },
    { number: "500+", label: "Brands Served" },
    { number: "24hr", label: "Design Support" }
  ],
  heroImage: "https://images.unsplash.com/photo-1614127961339-06b8706e442b?q=80&w=1080",
  gallery: [
    "https://images.unsplash.com/photo-1759563874672-e7dfb1ca3f73?q=80&w=1080",
    "https://images.unsplash.com/photo-1760804876166-aae5861ec7c1?q=80&w=1080",
    "https://images.unsplash.com/photo-1760602672748-6a570286ce73?q=80&w=1080",
    "https://images.unsplash.com/photo-1759563874667-73fd773d33d0?q=80&w=1080",
    "https://images.unsplash.com/photo-1777988683342-a3af9ddf0cb2?q=80&w=1080",
    "https://images.unsplash.com/photo-1775161518893-32dd6503d0cd?q=80&w=1080"
  ]
};

// --- Sections ---

const Navigation = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-black/90 backdrop-blur-xl border-b border-white/10 py-4' : 'bg-transparent py-6'}`}>
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <a href="#hero" className="group flex items-center gap-3">
          <div className="w-10 h-10 bg-[var(--primary)] border border-white/20 flex items-center justify-center font-heading text-xl font-black">N</div>
          <span className="font-heading text-xl font-bold tracking-widest group-hover:text-[var(--accent)] transition-colors">NUELBILLY</span>
        </a>
        
        <div className="hidden md:flex items-center gap-10">
          {['Products', 'About', 'Contact'].map((link) => (
            <a key={link} href={`#${link.toLowerCase()}`} className="text-sm font-medium tracking-widest uppercase text-white/70 hover:text-white transition-colors">
              {link}
            </a>
          ))}
          <a href="#contact" className="bg-[var(--accent)] text-black px-6 py-2.5 rounded-full font-bold text-sm hover:brightness-110 transition-all">
            Get a Quote
          </a>
        </div>

        <button onClick={() => setMobileOpen(true)} className="md:hidden text-white">
          <Menu size={24} />
        </button>
      </div>

      {/* Mobile Sidebar */}
      <div className={`fixed inset-0 z-[60] transition-transform duration-500 ${mobileOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setMobileOpen(false)} />
        <div className="absolute right-0 top-0 h-full w-[80%] max-w-sm bg-[var(--primary)] p-10 flex flex-col">
          <button onClick={() => setMobileOpen(false)} className="self-end mb-12 text-white">
            <X size={32} />
          </button>
          <div className="flex flex-col gap-8">
            {['Products', 'About', 'Contact'].map((link) => (
              <a key={link} href={`#${link.toLowerCase()}`} onClick={() => setMobileOpen(false)} className="font-heading text-4xl font-bold">
                {link}
              </a>
            ))}
          </div>
          <div className="mt-auto pt-10 border-t border-white/10">
            <p className="text-white/60 text-sm mb-4">Shomolu, Lagos</p>
            <p className="font-bold">Precision. Premium. Prints.</p>
          </div>
        </div>
      </div>
    </nav>
  );
};

const Hero = () => {
  const { ref, isVisible } = useScrollReveal();
  
  return (
    <section id="hero" ref={ref} className="min-h-screen relative flex items-center justify-center bg-gradient-to-br from-[var(--primary)] via-[var(--secondary)] to-[var(--secondary)] px-6 overflow-hidden pt-20">
      <div className="absolute top-1/4 left-1/4 w-[32rem] h-[32rem] bg-[var(--accent)]/10 rounded-full blur-[120px] pointer-events-none animate-pulse" />
      
      <div className={`relative z-10 text-center max-w-5xl transition-all duration-1000 ${isVisible ? 'opacity-100 skew-y-0 translate-y-0' : 'opacity-0 skew-y-2 translate-y-8'}`}>
        <h1 className="font-heading text-6xl md:text-[8rem] font-black text-white leading-[0.85] tracking-tighter uppercase italic">
          The Art of <span className="text-[var(--accent)]">First Impressions</span>
        </h1>
        <p className="text-white/60 mt-8 text-xl md:text-2xl max-w-2xl mx-auto leading-relaxed font-light">
          From Shomolu to the world, we craft the packaging that defines your brand&apos;s identity.
        </p>
        <div className="flex flex-col sm:flex-row gap-6 justify-center mt-12">
          <a href="#contact" className="bg-[var(--accent)] text-black px-10 py-5 font-bold text-lg hover:brightness-110 hover:scale-105 transition-all duration-300 rounded-full shadow-2xl">
            Start Your Project
          </a>
          <a href="#products" className="border border-white/20 text-white px-10 py-5 font-medium text-lg hover:bg-white/10 transition-all duration-300 rounded-full backdrop-blur-md">
            View Collections
          </a>
        </div>
      </div>

      {/* Decorative Image Overlays */}
      <div className={`absolute bottom-[-10%] right-[-5%] w-[40vw] aspect-square opacity-30 rounded-full overflow-hidden transition-all duration-1000 delay-500 ${isVisible ? 'scale-100 rotate-0' : 'scale-50 rotate-12'}`}>
        <SafeImage src={BRIEF.heroImage} alt="Luxury Box" fill className="object-cover" />
      </div>
    </section>
  );
};

const Features = () => {
  const { ref, isVisible } = useScrollReveal();
  
  return (
    <section id="features" ref={ref} className="py-28 px-6 bg-[var(--secondary)]">
      <div className="max-w-5xl mx-auto divide-y divide-white/10 border-y border-white/10">
        {BRIEF.features.map((f, i) => (
          <div key={i} className={`py-16 flex flex-col md:flex-row items-start gap-10 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`} style={{ transitionDelay: `${i * 150}ms` }}>
            <span className="font-heading text-[var(--accent)] text-5xl font-light italic shrink-0 w-24">
              0{i + 1}
            </span>
            <div className="flex-1">
              <h3 className="font-heading text-4xl font-bold text-white mb-4 tracking-tight">{f.title}</h3>
              <p className="text-white/50 text-xl leading-relaxed max-w-xl">{f.description}</p>
            </div>
            <div className="w-16 h-16 rounded-full border border-white/10 flex items-center justify-center shrink-0 text-[var(--accent)]">
              <f.icon size={28} strokeWidth={1.5} />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

const StatDivider = () => {
  return (
    <div className="bg-[var(--accent)] py-16">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-black/10 text-center">
        {BRIEF.stats.map((s, i) => (
          <div key={i} className="py-8 md:py-0 px-8">
            <p className="text-5xl md:text-6xl font-heading font-black text-black tracking-tighter italic">{s.number}</p>
            <p className="text-black/60 text-sm mt-3 font-bold uppercase tracking-widest">{s.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

const Products = () => {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section id="products" ref={ref} className="py-28 px-6 bg-[var(--secondary)]">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-end justify-between mb-20 gap-8">
          <div>
            <p className="text-[var(--accent)] font-bold tracking-[0.3em] uppercase text-xs mb-4">The Collection</p>
            <h2 className="font-heading text-6xl md:text-8xl font-black text-white leading-none">Branding Solutions</h2>
          </div>
          <p className="text-white/40 max-w-xs text-lg italic">Explore our signature packaging and apparel lineup, crafted for brands that value precision.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          {/* Main Featured Product */}
          <div className={`md:col-span-7 group relative rounded-[2rem] overflow-hidden transition-all duration-1000 ${isVisible ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}`}>
            <div className="relative h-[600px]">
              <SafeImage src={BRIEF.products[0].image} alt={BRIEF.products[0].name} fill className="object-cover group-hover:scale-105 transition-transform duration-1000" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent" />
              <div className="absolute bottom-0 p-10">
                <h3 className="font-heading text-4xl font-black text-white mb-2">{BRIEF.products[0].name}</h3>
                <p className="text-white/60 mb-6 max-w-sm">{BRIEF.products[0].description}</p>
                <div className="flex items-center gap-6">
                  <span className="text-[var(--accent)] font-black text-3xl">{BRIEF.products[0].price}</span>
                  <a href="#contact" className="bg-white text-black px-6 py-3 rounded-xl font-bold text-sm hover:bg-[var(--accent)] transition-colors">Reserve Custom Run</a>
                </div>
              </div>
            </div>
          </div>

          {/* Secondary Grid */}
          <div className="md:col-span-5 flex flex-col gap-8">
            {BRIEF.products.slice(1, 3).map((p, i) => (
              <div key={i} className={`group relative rounded-[2rem] overflow-hidden flex-1 transition-all duration-1000 delay-300 ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-12 opacity-0'}`}>
                <div className="relative h-full min-h-[280px]">
                  <SafeImage src={p.image} alt={p.name} fill className="object-cover group-hover:scale-105 transition-transform duration-1000" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                  <div className="absolute bottom-0 p-8 w-full flex justify-between items-end">
                    <div>
                      <h3 className="font-heading text-2xl font-bold text-white">{p.name}</h3>
                      <p className="text-white/50 text-sm mt-1">{p.price}</p>
                    </div>
                    <a href="#contact" className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-white hover:text-black transition-all">
                      <ArrowRight size={20} />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const About = () => {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section id="about" ref={ref} className="py-28 px-6 bg-[var(--primary)]/5 relative overflow-hidden">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
        <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-20'}`}>
          <div className="relative aspect-[4/5] rounded-[3rem] overflow-hidden shadow-2xl">
            <SafeImage src={BRIEF.gallery[3]} alt="Luxury Box Detail" fill className="object-cover grayscale hover:grayscale-0 transition-all duration-1000" />
            <div className="absolute inset-0 border-[20px] border-black/10 m-6 rounded-[2rem]" />
          </div>
        </div>
        <div className={`transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-20'}`}>
          <h2 className="font-heading text-6xl md:text-7xl font-black text-white leading-none mb-10">Lagos&apos; Printing Powerhouse</h2>
          <p className="text-white/60 text-xl leading-relaxed mb-8">
            Based in the heart of Shomolu, Nuelbilly Prints combines decades of technical expertise with a modern eye for design. We specialize in transforming raw materials into brand experiences.
          </p>
          <div className="space-y-6 mb-12">
            {['Offset & Digital Precision', 'Sustainable Sourcing', 'Lagos-Wide Delivery'].map((item, i) => (
              <div key={i} className="flex items-center gap-4 text-white/80">
                <div className="w-6 h-6 rounded-full border border-[var(--accent)] flex items-center justify-center">
                  <div className="w-2 h-2 bg-[var(--accent)] rounded-full" />
                </div>
                <span className="font-bold tracking-wide uppercase text-sm">{item}</span>
              </div>
            ))}
          </div>
          <p className="text-[var(--accent)] font-heading italic text-2xl">&ldquo;Sharp delivery, nationwide.&rdquo;</p>
        </div>
      </div>
    </section>
  );
};

const Gallery = () => {
  const { ref, isVisible } = useScrollReveal();
  return (
    <section ref={ref} className="py-28 px-6 bg-[var(--secondary)]">
      <div className="max-w-7xl mx-auto">
        <h2 className="font-heading text-5xl font-black text-white mb-20 text-center uppercase tracking-widest italic">Our Craft in Motion</h2>
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
          {BRIEF.gallery.map((src, i) => (
            <div key={i} className={`break-inside-avoid group relative rounded-3xl overflow-hidden shadow-xl transition-all duration-1000 ease-out ${isVisible ? 'max-w-full opacity-100' : 'max-w-0 opacity-0'}`} style={{ transitionDelay: `${i * 100}ms` }}>
              <SafeImage src={src} alt={`Gallery Item ${i + 1}`} className="w-full h-auto object-cover group-hover:scale-110 transition-transform duration-700" />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <span className="border border-white/40 px-6 py-2 text-xs uppercase tracking-widest text-white backdrop-blur-md">View Detail</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Testimonials = () => {
  const { ref, isVisible } = useScrollReveal();
  return (
    <section ref={ref} className="py-28 px-6 bg-[var(--accent)]/5">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="font-heading text-6xl font-black text-white mb-20">Client Stories</h2>
        <div className="space-y-12">
          {BRIEF.testimonials.map((t, i) => (
            <div key={i} style={{ transitionDelay: `${i * 100}ms` }}
              className={`relative py-12 px-10 rounded-[3rem] border border-white/10 bg-gradient-to-b from-white/5 to-transparent transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0 blur-0' : 'opacity-0 translate-y-6 blur-sm'}`}>
              <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-12 h-12 rounded-full bg-[var(--primary)] flex items-center justify-center border border-white/20">
                <span className="text-white text-2xl font-black leading-none italic">&ldquo;</span>
              </div>
              <p className="text-white/80 text-2xl md:text-3xl font-heading leading-relaxed italic mb-8">&ldquo;{t.text}&rdquo;</p>
              <div className="flex items-center justify-center gap-4">
                <div className="w-12 h-12 rounded-full bg-[var(--accent)]/20 flex items-center justify-center text-[var(--accent)] font-black text-lg border border-[var(--accent)]/30">
                  {t.name.charAt(0)}
                </div>
                <div className="text-left">
                  <p className="font-bold text-white uppercase tracking-widest text-sm">{t.name}</p>
                  <p className="text-white/40 text-xs font-medium">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const ContactForm = () => {
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => { setLoading(false); setSent(true); }, 1500);
  };

  if (sent) {
    return (
      <div className="flex flex-col items-center justify-center p-12 text-center animate-scaleIn bg-black rounded-[2.5rem] border border-white/10 shadow-2xl relative overflow-hidden h-[500px]">
        <div className="absolute inset-0 bg-gradient-to-br from-[var(--primary)]/20 to-transparent opacity-50" />
        <div className="w-24 h-24 rounded-full bg-[var(--accent)]/20 flex items-center justify-center mb-8 border border-[var(--accent)]/40 relative z-10">
          <CheckCheck size={40} className="text-[var(--accent)]" />
        </div>
        <h3 className="font-heading text-4xl font-black text-white mb-4 relative z-10 uppercase tracking-tighter">Request Received</h3>
        <p className="text-white/60 max-w-sm text-lg relative z-10 leading-relaxed">Our production desk will review your requirements and reach out within 24 hours.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5 bg-black p-8 md:p-12 rounded-[2.5rem] border border-white/10 shadow-2xl relative overflow-hidden">
      <div className="absolute top-0 right-0 w-64 h-64 bg-[var(--primary)]/10 blur-[80px] rounded-full pointer-events-none" />
      <div className="relative z-10">
        <h3 className="font-heading text-3xl font-bold text-white mb-10 tracking-tight uppercase italic">Send an Inquiry</h3>
        <div className="space-y-4">
          {(['name', 'email', 'phone'] as const).map(field => (
            <div key={field} className="relative group">
              <input
                type={field === 'email' ? 'email' : 'text'}
                placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                value={form[field]}
                onChange={e => setForm(prev => ({ ...prev, [field]: e.target.value }))}
                required={field !== 'phone'}
                className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white placeholder-white/20 text-sm outline-none transition-all duration-300 focus:bg-white/10 focus:border-[var(--accent)] focus:ring-1 focus:ring-[var(--accent)]"
              />
            </div>
          ))}
          <div className="relative group">
            <textarea rows={4} placeholder="Briefly describe your project needs (quantity, materials, sizing)..."
              value={form.message}
              onChange={e => setForm(prev => ({ ...prev, message: e.target.value }))}
              required
              className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white placeholder-white/20 text-sm outline-none resize-none transition-all duration-300 focus:bg-white/10 focus:border-[var(--accent)] focus:ring-1 focus:ring-[var(--accent)]"
            />
          </div>
        </div>
        <button type="submit" disabled={loading}
          className="w-full mt-10 bg-[var(--accent)] text-black py-5 rounded-2xl font-black text-lg hover:brightness-110 hover:shadow-[0_0_30px_rgba(212,163,115,0.2)] transition-all duration-300 disabled:opacity-60 flex justify-center items-center gap-3 group uppercase tracking-widest">
          {loading ? (
            <span className="flex items-center gap-2">
              <Loader2 className="animate-spin" size={20} /> Processing...
            </span>
          ) : (
            <>
              Send Request <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </>
          )}
        </button>
      </div>
    </form>
  );
};

const Contact = () => {
  const { ref, isVisible } = useScrollReveal();
  
  return (
    <section id="contact" ref={ref} className="py-28 px-6 bg-[var(--secondary)]">
      <div className="max-w-7xl mx-auto grid md:grid-cols-[1fr_1.4fr] gap-20 items-start">
        <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
          <p className="text-[var(--accent)] font-bold tracking-[0.4em] uppercase text-xs mb-6">Contact Us</p>
          <h2 className="font-heading text-6xl md:text-7xl font-black text-white mb-8 leading-none">Start Your <span className="text-[var(--primary)]">Project</span></h2>
          <p className="text-white/45 text-xl leading-relaxed max-w-sm mb-12">
            Ready to elevate your brand packaging? Visit our Shomolu studio or reach out digitally for a custom quote.
          </p>
          
          <div className="space-y-8">
            <div className="flex items-start gap-4 text-white/60 hover:text-white transition-colors group">
              <MapPin size={24} className="text-[var(--accent)] shrink-0 mt-1" />
              <p className="text-lg leading-relaxed">{BRIEF.contact.address}</p>
            </div>
            <a href={`https://instagram.com/${BRIEF.contact.instagram}`} target="_blank" rel="noreferrer" className="flex items-center gap-4 text-white/60 hover:text-[var(--accent)] transition-colors group">
              <Instagram size={24} className="group-hover:scale-110 transition-transform" />
              <span className="text-lg font-bold">@nuelbilly_prints</span>
            </a>
          </div>

          <div className="mt-20 p-8 rounded-3xl border border-white/5 bg-white/3">
            <h4 className="font-heading text-xl font-bold mb-4 text-white uppercase italic">Studio Hours</h4>
            <div className="space-y-2 text-white/50 text-sm">
              <div className="flex justify-between"><span>Mon — Fri</span><span>08:00 — 18:00</span></div>
              <div className="flex justify-between"><span>Sat</span><span>10:00 — 16:00</span></div>
              <div className="flex justify-between"><span>Sun</span><span>Closed</span></div>
            </div>
          </div>
        </div>
        <div className={`transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
          <ContactForm />
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="bg-black border-t border-white/10 pt-24 pb-12 px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-20">
          <div className="md:col-span-2">
            <a href="#hero" className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 bg-[var(--primary)] flex items-center justify-center font-heading text-2xl font-black">N</div>
              <span className="font-heading text-3xl font-bold tracking-widest text-white uppercase italic">Nuelbilly Prints</span>
            </a>
            <p className="text-white/40 max-w-sm text-lg leading-relaxed mb-8">
              Lagos&apos; premier destination for high-end branding, custom packaging solutions, and artisanal garment printing. Crafted with precision since inception.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center hover:bg-white/10 transition-all text-white/60 hover:text-white">
                <Instagram size={20} />
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="font-bold uppercase tracking-widest text-sm text-white mb-8">Navigation</h4>
            <ul className="space-y-4">
              {['Hero', 'Products', 'About', 'Contact'].map(link => (
                <li key={link}>
                  <a href={`#${link.toLowerCase()}`} className="text-white/50 hover:text-[var(--accent)] transition-colors text-sm font-medium">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-bold uppercase tracking-widest text-sm text-white mb-8">Company</h4>
            <ul className="space-y-4 text-white/50 text-sm">
              <li>Shomolu, Lagos, NG</li>
              <li>Privacy Policy</li>
              <li>Terms of Service</li>
              <li>Brand Guidelines</li>
            </ul>
          </div>
        </div>
        
        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-white/30 text-xs font-mono uppercase tracking-widest">
            © {new Date().getFullYear()} NUELBILLY PRINTS. ALL RIGHTS RESERVED.
          </p>
          <p className="text-white/30 text-[10px] font-mono uppercase tracking-widest">
            Designed for Precision. Made in Nigeria.
          </p>
        </div>
      </div>
      
      {/* Massive Background Text Decoration */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 pointer-events-none opacity-[0.02]">
        <h1 className="font-heading text-[30vw] font-black text-white whitespace-nowrap leading-none uppercase italic">NUELBILLY</h1>
      </div>
    </footer>
  );
};

export default function Page() {
  return (
    <main className="relative">
      <Navigation />
      <Hero />
      <Features />
      <StatDivider />
      <Products />
      <About />
      <Gallery />
      <Testimonials />
      <Contact />
      <Footer />
    </main>
  );
}