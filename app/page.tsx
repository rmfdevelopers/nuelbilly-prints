'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { 
  Printer, 
  Box, 
  Sparkles, 
  Zap, 
  Mail, 
  Phone, 
  MapPin, 
  ArrowRight, 
  CheckCheck, 
  Loader2, 
  ImageOff, 
  Instagram,
  Calendar,
  Users,
  Menu,
  X
} from 'lucide-react';

// DESIGN DECISIONS:
// Layout Energy: dense
// Depth Treatment: textured
// Divider Style: D-STAT
// Typography Personality: mono-accent

const brand = {
  name: "Nuelbilly Prints",
  tagline: "Precision in Every Impression",
  description: "Lagos' premier destination for high-end commercial printing, luxury packaging, and brand identity materials, rooted in the heart of Shomolu.",
  industry: "Services",
  region: "Nigeria",
  currency: "₦"
};

const contact = {
  whatsapp: "",
  instagram: "nuelbilly_prints",
  email: "hello@nuelbillyprints.com",
  address: "33 Sanusi Street off bajulaye road shomolu Lagos"
};

const products = [
  { name: "Luxury Rigid Boxes", description: "Premium gift and product packaging with magnetic closures and matte finishes.", price: "₦4,500", url: "https://images.unsplash.com/photo-1625820104062-387167dd655b?q=80&w=1080" },
  { name: "Corporate Stationery Set", description: "Professional letterheads, envelopes, and business cards on high-grammage paper.", price: "₦12,500", url: "https://images.unsplash.com/photo-1742967416909-ffbceccbf4da?q=80&w=1080" },
  { name: "Custom Product Labels", description: "Vibrant, weather-resistant adhesive labels for branding and logistics.", price: "₦250", url: "https://images.unsplash.com/photo-1569725730478-a2f4a1809bb4?q=80&w=1080" },
  { name: "Branded Paper Bags", description: "Eco-friendly, reinforced shopping bags with custom logo foil stamping.", price: "₦950", url: "https://images.unsplash.com/photo-1648544365094-3e3e35108a68?q=80&w=1080" }
];

const features = [
  { title: "Precision Offset Printing", description: "Crisp, accurate color reproduction for high-volume commercial runs.", icon: Printer },
  { title: "Custom Structural Design", description: "Bespoke packaging die-cuts tailored specifically to your product dimensions.", icon: Box },
  { title: "Premium Finishes", description: "Spot UV, foil stamping, and lamination to make your brand stand out.", icon: Sparkles },
  { title: "Shomolu Speed", description: "Fast turnaround times without compromising the integrity of the print.", icon: Zap }
];

const processSteps = [
  { number: "01", title: "Consultation", description: "We discuss paper weight, texture, and finishing requirements." },
  { number: "02", title: "Pre-Press", description: "File optimization and digital proofing for color accuracy." },
  { number: "03", title: "Production", description: "High-speed printing and precision die-cutting." },
  { number: "04", title: "Finishing", description: "Quality checks, assembly, and secure packaging." }
];

const stats = [
  { number: "12+", label: "Years Experience", icon: Calendar },
  { number: "1M+", label: "Prints Delivered", icon: CheckCheck },
  { number: "500+", label: "Satisfied Brands", icon: Users }
];

const testimonials = [
  { name: "Tunde Adeleke", text: "The quality of the rigid boxes for our luxury watch brand exceeded our expectations. The red foil is perfect.", role: "Creative Director" },
  { name: "Sarah Alabi", text: "Nuelbilly Prints handled our large-scale corporate printing with incredible speed and zero errors.", role: "Marketing Manager" },
  { name: "Chinedu Okoro", text: "Best printing service in Shomolu. Their attention to detail on paper texture is unmatched.", role: "Entrepreneur" }
];

// --- HOOKS ---

const useScrollReveal = (threshold = 0.15) => {
  const ref = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) setIsVisible(true);
    }, { threshold });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold]);
  return { ref, isVisible };
};

const useTypewriter = (text: string, speed = 50) => {
  const [display, setDisplay] = useState('');
  useEffect(() => {
    let i = 0;
    const timer = setInterval(() => {
      if (i < text.length) { setDisplay(prev => prev + text.charAt(i)); i++; }
      else clearInterval(timer);
    }, speed);
    return () => clearInterval(timer);
  }, [text, speed]);
  return display;
};

// --- COMPONENTS ---

function SafeImage({ src, alt, fill, width, height, className, priority }: any) {
  const [error, setError] = useState(false);
  if (error) {
    return (
      <div className={`flex items-center justify-center bg-secondary/80 border border-white/5 ${className}`}>
        <ImageOff size={24} className="text-white/20" />
      </div>
    );
  }
  return (
    <Image 
      src={src} 
      alt={alt} 
      fill={fill} 
      width={!fill ? width : undefined} 
      height={!fill ? height : undefined} 
      className={className} 
      priority={priority}
      onError={() => setError(true)}
    />
  );
}

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
      <div className="flex flex-col items-center justify-center p-12 text-center animate-scaleIn bg-secondary rounded-[2.5rem] border border-white/10 shadow-2xl relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-50" />
        <div className="w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center mb-6 border border-primary/40 relative z-10 shadow-[0_0_30px_rgba(211,47,47,0.2)]">
          <CheckCheck size={32} className="text-primary" />
        </div>
        <h3 className="font-heading text-3xl font-black text-white mb-3 relative z-10">Inquiry Received</h3>
        <p className="text-white/60 max-w-sm text-lg relative z-10">We will review your print specifications and get back to you within 24 hours.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-[#0d0d0d] p-8 sm:p-12 rounded-[2.5rem] border border-white/10 shadow-2xl relative overflow-hidden">
      <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 blur-[80px] rounded-full pointer-events-none" />
      <div className="relative z-10">
        <h3 className="font-heading text-2xl font-bold text-white mb-8">Print Quote Request</h3>
        <div className="space-y-4">
          {(['name', 'email', 'phone'] as const).map(field => (
            <input
              key={field}
              type={field === 'email' ? 'email' : 'text'}
              placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
              value={form[field]}
              onChange={e => setForm(prev => ({ ...prev, [field]: e.target.value }))}
              required={field !== 'phone'}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white placeholder-white/40 text-sm outline-none transition-all focus:border-primary focus:ring-1 focus:ring-primary"
            />
          ))}
          <textarea rows={4} placeholder="Tell us about your project (quantity, paper type, finish)"
            value={form.message}
            onChange={e => setForm(prev => ({ ...prev, message: e.target.value }))}
            required
            className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white placeholder-white/40 text-sm outline-none resize-none transition-all focus:border-primary focus:ring-1 focus:ring-primary"
          />
        </div>
        <button type="submit" disabled={loading}
          className="w-full mt-8 bg-primary text-white py-4 rounded-xl font-bold text-base hover:brightness-110 hover:shadow-[0_0_20px_rgba(211,47,47,0.3)] transition-all flex justify-center items-center gap-3 group">
          {loading ? <Loader2 className="animate-spin" size={20} /> : <>Send Specs <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" /></>}
        </button>
      </div>
    </form>
  );
};

// --- MAIN PAGE ---

export default function Page() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);
  const typedTagline = useTypewriter("Transforming Concepts into Physical Masterpieces", 40);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const heroReveal = useScrollReveal();
  const featureReveal = useScrollReveal();
  const processReveal = useScrollReveal();
  const productReveal = useScrollReveal();
  const aboutReveal = useScrollReveal();
  const testimonialReveal = useScrollReveal();
  const contactReveal = useScrollReveal();

  return (
    <main className="relative">
      {/* Texture Background */}
      <div className="fixed inset-0 pointer-events-none z-0 texture-overlay" />

      {/* Header */}
      <header className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-secondary/95 backdrop-blur-xl border-b border-white/10 py-4' : 'bg-transparent py-6'}`}>
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <a href="#" className="font-heading font-black text-2xl tracking-tighter flex items-center gap-2">
            <span className="text-primary">NUELBILLY</span>
            <span className="text-accent hidden sm:inline">PRINTS</span>
          </a>

          <nav className="hidden md:flex items-center gap-10">
            {['Services', 'Workflow', 'Catalog', 'Contact'].map(link => (
              <a key={link} href={`#${link.toLowerCase()}`} className="text-white/60 hover:text-primary font-mono text-xs uppercase tracking-widest transition-colors">
                {link}
              </a>
            ))}
            <a href="#contact" className="bg-primary text-white px-6 py-2.5 rounded-full text-sm font-bold hover:scale-105 transition-all">
              Request a Quote
            </a>
          </nav>

          <button className="md:hidden text-white" onClick={() => setMobileMenu(true)}>
            <Menu size={24} />
          </button>
        </div>
      </header>

      {/* Mobile Menu */}
      <div className={`fixed inset-0 z-[100] bg-secondary transition-all duration-500 ${mobileMenu ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="p-8">
          <div className="flex justify-between items-center mb-12">
            <span className="font-heading font-black text-xl">MENU</span>
            <button onClick={() => setMobileMenu(false)} className="w-12 h-12 flex items-center justify-center border border-white/10 rounded-full">
              <X size={24} />
            </button>
          </div>
          <div className="flex flex-col gap-8">
            {['Services', 'Workflow', 'Catalog', 'Contact'].map(link => (
              <a key={link} href={`#${link.toLowerCase()}`} onClick={() => setMobileMenu(false)} className="text-4xl font-heading font-bold text-white hover:text-primary">
                {link}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Hero (Pattern: HR-D) */}
      <section id="hero" ref={heroReveal.ref} className="min-h-screen flex flex-col justify-center bg-secondary px-6 overflow-hidden relative pt-20">
        <div className="absolute inset-0 opacity-10 grayscale mix-blend-overlay pointer-events-none">
          <SafeImage src="https://images.unsplash.com/photo-1727191501039-15f85b78d3b3?q=80&w=1080" alt="Machinery" fill className="object-cover" priority />
        </div>
        
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:40px_40px]" />

        <div className="relative z-10 max-w-6xl mx-auto w-full">
          <h1 className="font-heading text-[12vw] md:text-[8vw] font-black text-white leading-none tracking-tighter uppercase italic">
            {typedTagline}<span className="text-primary animate-pulse">_</span>
          </h1>
          <div className={`mt-10 flex flex-col md:flex-row items-start md:items-end justify-between gap-8 border-t border-white/10 pt-8 transition-all duration-1000 delay-300 ${heroReveal.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <p className="text-white/40 text-lg max-w-sm leading-relaxed">
              From luxury packaging to corporate stationery, we define the visual standard of Shomolu&apos;s print industry.
            </p>
            <a href="#contact" className="bg-primary text-white px-12 py-5 font-black text-lg
              shadow-[8px_8px_0px_rgba(196,164,132,0.2)]
              hover:translate-x-[4px] hover:translate-y-[4px] hover:shadow-[2px_2px_0px_rgba(196,164,132,0.2)]
              transition-all duration-200 shrink-0">
              {brand.region === 'Nigeria' ? 'SHARP QUOTE →' : 'GET STARTED'}
            </a>
          </div>
        </div>
      </section>

      {/* D-STAT Divider */}
      <div className="bg-accent py-12">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-secondary/20 text-center">
          {stats.map((s, i) => (
            <div key={i} className="px-8 py-6 md:py-4 flex flex-col items-center">
              <p className="text-5xl font-black text-secondary tracking-tight">{s.number}</p>
              <p className="text-secondary/60 text-xs mt-2 font-mono uppercase tracking-[0.2em]">{s.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Features (Pattern: F-ICON-GRID) */}
      <section id="services" ref={featureReveal.ref} className="py-28 px-6 bg-secondary relative overflow-hidden">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-6">
            <div>
              <p className="text-primary font-mono text-xs tracking-[0.4em] uppercase mb-4">The Standard</p>
              <h2 className="font-heading text-5xl md:text-6xl font-black text-white">Why Nuelbilly?</h2>
            </div>
            <p className="text-white/40 text-lg max-w-xs md:text-right">Engineering quality into every sheet of paper and board.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((f, i) => (
              <div key={i} className={`p-10 rounded-2xl border border-white/5 bg-white/[0.02]
                hover:bg-white/[0.05] hover:border-primary/30
                transition-all duration-500 group cursor-default h-full flex flex-col
                ${featureReveal.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
                style={{ transitionDelay: `${i * 100}ms` }}>
                <div className="mb-8 p-4 rounded-xl bg-primary/10 w-fit text-primary group-hover:scale-110 group-hover:bg-primary group-hover:text-white transition-all duration-500">
                  <f.icon size={28} />
                </div>
                <h3 className="font-heading font-bold text-white text-2xl leading-tight mb-4">{f.title}</h3>
                <p className="text-white/40 text-sm leading-relaxed mt-auto">{f.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process (Bonus Section) */}
      <section id="workflow" ref={processReveal.ref} className="py-28 px-6 bg-[#151515]">
        <div className="max-w-5xl mx-auto">
          <h2 className="font-heading text-5xl font-black text-white mb-20">Our Workflow</h2>
          <div className="relative">
            <div className="absolute left-6 top-0 bottom-0 w-px bg-gradient-to-b from-primary/40 via-accent/20 to-transparent hidden md:block" />
            <div className="space-y-12">
              {processSteps.map((step, i) => (
                <div key={i} className={`flex gap-8 items-start group transition-all duration-700 ${processReveal.isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}
                  style={{ transitionDelay: `${i * 150}ms` }}>
                  <div className="w-12 h-12 rounded-full bg-primary/10 border border-primary/30
                    flex items-center justify-center shrink-0 relative z-10
                    group-hover:bg-primary transition-all duration-300">
                    <span className="font-mono font-black text-primary group-hover:text-white transition-colors text-sm">
                      {step.number}
                    </span>
                  </div>
                  <div className="pt-2">
                    <h3 className="font-heading text-2xl font-bold text-white">{step.title}</h3>
                    <p className="text-white/40 mt-2 leading-relaxed max-w-xl">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Catalog (Pattern: P-EDITORIAL) */}
      <section id="catalog" ref={productReveal.ref} className="py-28 px-6 bg-secondary">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="font-heading text-5xl md:text-7xl font-black text-white mb-6">Our Catalog</h2>
            <p className="text-white/40 text-lg max-w-xl mx-auto">Explore our range of premium print and packaging solutions crafted for the finest brands.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {products.map((p, i) => (
              <div key={i} className={`group relative h-[450px] rounded-[2.5rem] overflow-hidden transition-all duration-1000 ${productReveal.isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}
                style={{ transitionDelay: `${i * 150}ms` }}>
                <SafeImage src={p.url} alt={p.name} fill className="object-cover group-hover:scale-110 transition-all duration-1000 opacity-60 group-hover:opacity-100" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-10 relative z-10 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                  <span className="text-accent font-mono text-xs tracking-widest mb-3 block opacity-0 group-hover:opacity-100 transition-opacity">PREMIUM SELECTION</span>
                  <h3 className="text-4xl font-heading font-black text-white mb-3">{p.name}</h3>
                  <p className="text-white/60 text-sm max-w-xs mb-6 line-clamp-2">{p.description}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-primary font-black text-3xl">{p.price}</span>
                    <a href="#contact" className="bg-white/10 backdrop-blur-md text-white px-8 py-3
                      rounded-full font-bold text-sm border border-white/10 hover:bg-white hover:text-secondary transition-all">
                      Order Now
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About */}
      <section ref={aboutReveal.ref} className="py-28 px-6 bg-[#111111] border-y border-white/5">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-20 items-center">
          <div className={`transition-all duration-1000 ${aboutReveal.isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'}`}>
            <h2 className="font-heading text-5xl font-black text-white leading-tight mb-8">The Heart of <span className="text-primary">Lagos Printing</span></h2>
            <p className="text-white/40 text-xl leading-relaxed mb-10">
              Nuelbilly Prints stands at the intersection of traditional craftsmanship and modern technology. Located in Shomolu, the print capital of Nigeria, we serve brands that value precision and durability above all else.
            </p>
            <div className="space-y-6">
              <div className="flex items-center gap-4 text-accent font-mono text-xs tracking-[0.3em] uppercase">
                <div className="w-12 h-px bg-accent/30" />
                <span>Sharp delivery, nationwide.</span>
              </div>
            </div>
          </div>
          <div className={`relative aspect-square rounded-[3rem] overflow-hidden transition-all duration-1000 delay-300 ${aboutReveal.isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'}`}>
            <SafeImage src="https://images.unsplash.com/photo-1742967416998-041be0e67a04?q=80&w=1080" alt="Process" fill className="object-cover" />
            <div className="absolute inset-0 bg-primary/20 mix-blend-overlay" />
          </div>
        </div>
      </section>

      {/* Testimonials (Pattern: T-MASONRY) */}
      <section ref={testimonialReveal.ref} className="py-28 px-6 bg-secondary">
        <div className="max-w-7xl mx-auto">
          <h2 className="font-heading text-5xl font-black text-white text-center mb-20">Client Feedback</h2>
          <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
            {testimonials.map((t, i) => (
              <div key={i} className={`break-inside-avoid bg-white/[0.03] p-10 rounded-[2.5rem] border border-white/5 relative overflow-hidden group
                hover:border-primary/30 transition-all duration-500 ${testimonialReveal.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
                style={{ transitionDelay: `${i * 100}ms` }}>
                <div className="flex gap-1 mb-6">
                  {[1,2,3,4,5].map(n => <div key={n} className="w-1.5 h-1.5 rounded-full bg-primary" />)}
                </div>
                <p className="text-white/70 text-lg leading-relaxed italic mb-8 relative z-10">&ldquo;{t.text}&rdquo;</p>
                <div className="flex items-center justify-between border-t border-white/5 pt-6 mt-6">
                  <div>
                    <p className="font-heading font-bold text-white">{t.name}</p>
                    <p className="text-accent text-[10px] font-mono uppercase tracking-widest mt-1">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact (Pattern: C2) */}
      <section id="contact" ref={contactReveal.ref} className="py-32 px-6 bg-secondary relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-primary/5 -skew-x-12 translate-x-20" />
        <div className="max-w-7xl mx-auto relative z-10 grid md:grid-cols-2 gap-20 items-center">
          <div className={`transition-all duration-1000 ${contactReveal.isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'}`}>
            <h2 className="font-heading text-7xl md:text-8xl font-black text-white mb-10 leading-[0.9]">Start Your <span className="text-primary">Project</span></h2>
            <div className="space-y-8">
              <div className="flex items-start gap-6 group">
                <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center text-accent border border-white/10 group-hover:bg-primary group-hover:text-white transition-all">
                  <MapPin size={24} />
                </div>
                <div>
                  <p className="text-white font-bold text-lg">Workshop Address</p>
                  <p className="text-white/40 leading-relaxed mt-1">{contact.address}</p>
                </div>
              </div>
              <div className="flex items-start gap-6 group">
                <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center text-accent border border-white/10 group-hover:bg-primary group-hover:text-white transition-all">
                  <Instagram size={24} />
                </div>
                <div>
                  <p className="text-white font-bold text-lg">Instagram</p>
                  <p className="text-white/40 leading-relaxed mt-1">@nuelbilly_prints</p>
                </div>
              </div>
            </div>
          </div>
          <div className={`transition-all duration-1000 delay-300 ${contactReveal.isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'}`}>
            <ContactForm />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-20 px-6 bg-black border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-16 mb-20">
            <div className="col-span-2">
              <p className="font-heading font-black text-3xl mb-6">NUELBILLY <span className="text-primary">PRINTS</span></p>
              <p className="text-white/40 text-lg max-w-sm leading-relaxed mb-8">
                Lagos&apos; premier destination for luxury packaging and precision printing. Built on craft, delivered with speed.
              </p>
              <div className="flex gap-4">
                <a href={`https://instagram.com/${contact.instagram}`} className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-white/40 hover:text-primary hover:border-primary transition-all">
                  <Instagram size={20} />
                </a>
                <a href={`mailto:${contact.email}`} className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-white/40 hover:text-primary hover:border-primary transition-all">
                  <Mail size={20} />
                </a>
              </div>
            </div>
            <div>
              <p className="font-heading font-bold text-white mb-8">Navigation</p>
              <ul className="space-y-4">
                {['Services', 'Workflow', 'Catalog', 'Contact'].map(l => (
                  <li key={l}><a href={`#${l.toLowerCase()}`} className="text-white/40 hover:text-white transition-colors">{l}</a></li>
                ))}
              </ul>
            </div>
            <div>
              <p className="font-heading font-bold text-white mb-8">Service Areas</p>
              <ul className="space-y-4 text-white/40">
                <li>Shomolu, Lagos</li>
                <li>Ikeja, Lagos</li>
                <li>Lekki Phase 1</li>
                <li>Victoria Island</li>
              </ul>
            </div>
          </div>
          <div className="flex flex-col md:flex-row justify-between items-center pt-12 border-t border-white/5 gap-6">
            <p className="text-white/20 text-sm font-mono tracking-widest">
              &copy; {new Date().getFullYear()} NUELBILLY PRINTS. ALL RIGHTS RESERVED.
            </p>
            <div className="flex items-center gap-2 text-white/20 text-xs font-mono">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <span>LIVE PRODUCTION IN SHOMOLU</span>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}