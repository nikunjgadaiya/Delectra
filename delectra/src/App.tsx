import React from 'react';
import { motion } from 'framer-motion';
import { 
  Terminal, 
  LayoutGrid, 
  Film, 
  Palette, 
  TrendingUp,
  MessageSquare,
  Zap,
  Globe,
  Star
} from 'lucide-react';
import { cn } from './lib/utils';
import Footer from './components/Footer';
import SocialsComingSoon from './components/SocialsComingSoon';
import PrivacyPolicy from './components/PrivacyPolicy';
import TermsOfService from './components/TermsOfService';
import CookiesPolicy from './components/CookiesPolicy';
import InvertCursor from './components/InvertCursor';
import SplashScreen from './components/SplashScreen';
import ContactForm from './components/ContactForm';



// Components
const GlassCard = ({ children, className, hover = true }: { children: React.ReactNode, className?: string, hover?: boolean }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6 }}
    className={cn(
      "glass-card p-8",
      hover && "glass-card-hover",
      className
    )}
  >
    {children}
  </motion.div>
);

const NavItem = ({ href, icon: Icon, label, active = false, onClick }: { href: string, icon: any, label: string, active?: boolean, onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void }) => (
  <a 
    href={href}
    onClick={onClick}
    className={cn(
      "flex flex-col items-center justify-center min-w-[85px] py-2 px-3 rounded-full transition-all duration-300 group relative",
      active ? "text-secondary" : "text-gray-400 hover:text-white"
    )}
  >
    {active && (
      <motion.div 
        layoutId="nav-glow"
        className="absolute inset-0 bg-secondary/10 rounded-full blur-md -z-10"
        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
      />
    )}
    <Icon className={cn("w-5 h-5 mb-1 group-hover:scale-110 transition-transform", active && "text-secondary")} />
    <span className="font-heading text-[9px] uppercase tracking-wider font-bold whitespace-nowrap">{label}</span>
  </a>
);

const CTATypingHeading = () => {
  const ctaText = "Let's build something great.";
  const [ctaDisplayText, setCtaDisplayText] = React.useState("");
  const [ctaStarted, setCtaStarted] = React.useState(false);
  const ctaRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !ctaStarted) {
          setCtaStarted(true);
        }
      },
      { threshold: 0.5 }
    );
    if (ctaRef.current) observer.observe(ctaRef.current);
    return () => observer.disconnect();
  }, [ctaStarted]);

  React.useEffect(() => {
    if (!ctaStarted) return;
    setCtaDisplayText("");
    let i = 0;
    const timer = setInterval(() => {
      setCtaDisplayText(ctaText.slice(0, i));
      i++;
      if (i > ctaText.length) clearInterval(timer);
    }, 50);
    return () => clearInterval(timer);
  }, [ctaStarted]);

  return (
    <div ref={ctaRef}>
      <h2 className="text-6xl md:text-8xl font-heading font-bold mb-12 tracking-tighter leading-tight inline-block text-wave">
        {ctaDisplayText}
        <motion.span
          animate={{ opacity: [0, 1, 0] }}
          transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
          className="inline-block w-[4px] h-[0.8em] bg-secondary ml-1 align-middle"
        />
      </h2>
    </div>
  );
};

function App() {
  const fullText = "We build brands that print money.";
  const [displayText, setDisplayText] = React.useState("");
  const [isDone, setIsDone] = React.useState(false);
  const [showSocials, setShowSocials] = React.useState(false);
  const [showPrivacy, setShowPrivacy] = React.useState(false);
  const [showTerms, setShowTerms] = React.useState(false);
  const [showCookies, setShowCookies] = React.useState(false);
  const [activeSection, setActiveSection] = React.useState("home");
  const [showSplash, setShowSplash] = React.useState(true);

  const animationRef = React.useRef<{ cleanup: () => void } | null>(null);

  // Scroll spy to update active section
  React.useEffect(() => {
    const handleScroll = () => {
      const sections = ["home", "why-us", "portfolio", "services", "results"];
      const current = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 200 && rect.bottom >= 200;
        }
        return false;
      });
      if (current && current !== activeSection) {
        setActiveSection(current);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [activeSection]);

  // Force scroll to top on refresh/mount
  React.useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  const startAnimation = React.useCallback(() => {
    // Clean up any previous animation
    if (animationRef.current) animationRef.current.cleanup();

    setDisplayText("");
    setIsDone(false);

    let cancelled = false;
    let typeTimer: ReturnType<typeof setInterval>;

    let i = 0;
    typeTimer = setInterval(() => {
      if (cancelled) { clearInterval(typeTimer); return; }
      i++;
      setDisplayText(fullText.slice(0, i));
      if (i >= fullText.length) {
        clearInterval(typeTimer);
        setIsDone(true);
      }
    }, 50);

    const cleanup = () => {
      cancelled = true;
      if (typeTimer) clearInterval(typeTimer);
    };
    animationRef.current = { cleanup };
    return cleanup;
  }, [fullText]);

  // Start typing only after splash is done (or immediately if no splash)
  React.useEffect(() => {
    if (!showSplash) {
      const cleanup = startAnimation();
      return cleanup;
    }
  }, [startAnimation, showSplash]);

  // Re-trigger typing when scrolling back to home section from lower sections
  const prevSectionRef = React.useRef<string>("home");
  React.useEffect(() => {
    if (activeSection === "home" && prevSectionRef.current !== "home" && !showSplash) {
      startAnimation();
    }
    prevSectionRef.current = activeSection;
  }, [activeSection, startAnimation, showSplash]);

  const handleSplashComplete = React.useCallback(() => {
    setShowSplash(false);
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(id);
    }
  };

  return (
    <div className="relative min-h-screen bg-black overflow-x-hidden selection:bg-secondary/30 selection:text-white">
      {showSplash && <SplashScreen onComplete={handleSplashComplete} />}
      <InvertCursor />
      {showSocials && (
        <SocialsComingSoon 
          onBack={() => {
            setShowSocials(false);
            window.scrollTo({ top: 0, behavior: 'instant' });
            startAnimation();
          }} 
        />
      )}

      {showPrivacy && (
        <PrivacyPolicy
          onBack={() => {
            setShowPrivacy(false);
            window.scrollTo({ top: 0, behavior: 'instant' });
            startAnimation();
          }}
        />
      )}

      {showTerms && (
        <TermsOfService
          onBack={() => {
            setShowTerms(false);
            window.scrollTo({ top: 0, behavior: 'instant' });
            startAnimation();
          }}
        />
      )}

      {showCookies && (
        <CookiesPolicy
          onBack={() => {
            setShowCookies(false);
            window.scrollTo({ top: 0, behavior: 'instant' });
            startAnimation();
          }}
        />
      )}

      {/* Background Orbs */}
      <div className="fixed top-[-10%] left-[-10%] w-[500px] h-[500px] bg-violet-900/10 blur-[120px] rounded-full pointer-events-none z-0" />
      <div className="fixed bottom-[10%] right-[-5%] w-[400px] h-[400px] bg-indigo-900/5 blur-[100px] rounded-full pointer-events-none z-0" />

      {/* Hero Section */}
      <header id="home" className="relative min-h-[90vh] flex flex-col items-center justify-center px-gutter pt-12 z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center max-w-5xl mx-auto relative w-full"
        >
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-8"
          >
            <img src="/logo.png" alt="Delectra" className="h-20 md:h-32 mx-auto transition-transform duration-500 hover:scale-105" />
          </motion.div>

          <div className="relative inline-block mb-6">
            {/* Floating PNG Badge anchored to Top-Right of Main Text */}
            <div className="absolute -right-12 sm:-right-24 md:-right-36 lg:-right-44 -top-8 sm:-top-12 md:-top-16 z-20 cursor-pointer pointer-events-auto float-animation">
              <img 
                src="/hero-badge.png" 
                alt="Badge" 
                style={{ transform: 'rotate(15deg)' }}
                className="w-20 sm:w-28 md:w-36 lg:w-44 h-auto object-contain drop-shadow-[0_10px_25px_rgba(168,85,247,0.35)] transition-all duration-300 ease-out hover:scale-110 hover:drop-shadow-[0_15px_35px_rgba(168,85,247,0.65)]"
              />
            </div>

            <h1 className="text-5xl md:text-8xl font-heading font-bold leading-[1.0] tracking-tighter inline-block">
              {displayText.split(" ").slice(0, 4).map((word, i) => (
                <React.Fragment key={i}>
                  <span>{word}</span>
                  {i < 3 && " "}
                  {i === 3 && <br />}
                </React.Fragment>
              ))}
              <span className="text-gradient">
                {displayText.split(" ").slice(4).map((word, i) => (
                  <React.Fragment key={i}>
                    {i > 0 && " "}
                    <span>{word}</span>
                  </React.Fragment>
                ))}
              </span>
              <motion.span
                animate={{ opacity: [0, 1, 0] }}
                transition={{
                  duration: 0.8,
                  repeat: Infinity,
                  ease: "linear"
                }}
                className="inline-block w-[4px] h-[0.8em] bg-secondary ml-1 align-middle"
              />
            </h1>
          </div>

          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            animate={isDone ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
            transition={{ duration: 0.8 }}
            className="text-lg md:text-xl text-on-surface-variant max-w-2xl mx-auto mb-8 leading-snug"
          >
            Strategic design, content, branding, and digital execution focused on one thing — growth.
          </motion.p>


        </motion.div>


      </header>

      {/* Why Us Section */}
      <section id="why-us" className="py-16 px-gutter relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-heading mb-4 tracking-tighter">Why Us</h2>
            <div className="w-16 h-1 bg-secondary mx-auto rounded-full" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <GlassCard className="p-6 border-t-white/20">
              <Globe className="w-10 h-10 text-secondary mb-6" />
              <h3 className="text-2xl font-heading mb-4">Creative + Strategy</h3>
              <p className="text-on-surface-variant leading-relaxed text-sm">
                Bold ideas grounded in market-moving data and strategic insights.
              </p>
            </GlassCard>
            <GlassCard className="border-t-white/20">
              <Zap className="w-10 h-10 text-secondary mb-6" />
              <h3 className="text-2xl font-heading mb-4">Fast Execution</h3>
              <p className="text-on-surface-variant leading-relaxed text-sm">
                Rapid delivery without sacrificing the premium polish your brand deserves.
              </p>
            </GlassCard>
            <GlassCard className="border-t-white/20">
              <LayoutGrid className="w-10 h-10 text-secondary mb-6" />
              <h3 className="text-2xl font-heading mb-4">All-in-one</h3>
              <p className="text-on-surface-variant leading-relaxed text-sm">
                Seamless integration across design, content, and growth operations.
              </p>
            </GlassCard>
            <GlassCard className="border-t-white/20">
              <Palette className="w-10 h-10 text-secondary mb-6" />
              <h3 className="text-2xl font-heading mb-4">Modern Design</h3>
              <p className="text-on-surface-variant leading-relaxed text-sm">
                Avant-garde aesthetics tailored for the modern, high-end digital landscape.
              </p>
            </GlassCard>
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section id="portfolio" className="py-16 px-gutter bg-[#050505] z-10">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
            <div className="max-w-xl">
              <h2 className="text-4xl md:text-5xl font-heading mb-4 tracking-tighter">Portfolio</h2>
              <p className="text-on-surface-variant text-base">Visionary works for brands that demand excellence.</p>
            </div>
            <div className="flex gap-6 border-b border-white/10 pb-1">
              <span className="font-heading text-xs uppercase tracking-widest text-secondary cursor-pointer border-b-2 border-secondary pb-1">All</span>
              <span className="font-heading text-xs uppercase tracking-widest text-on-surface-variant hover:text-white cursor-pointer transition-colors pb-1">Branding</span>
              <span className="font-heading text-xs uppercase tracking-widest text-on-surface-variant hover:text-white cursor-pointer transition-colors pb-1">Web</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
            <motion.div 
              whileHover={{ y: -10 }}
              className="md:col-span-8 group cursor-pointer relative overflow-hidden rounded-[2rem] h-[500px]"
            >
              <img 
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBSPTevSWPZoJ7HrkTS0_k7BHQGPPmdZ2JZcMOvQVEXyghjynP2GlQ-1ql_igzPFtYRNPLrvRkBa5e5ALwUKwWMhXNP4wBFQ147rW3bJSdiXbtfF08k8y7247PGKQhpX-hBVZVhTKi7Vd1MKS9sLg0NZbtD1E0dWkM43EPHARWnHrsWwbVjEpEx9VYUvaHgjE5LV2FcXRSMoiX60JilvSV2VNpZas671dlMfflXlK3jyyPLvR2Tc5QYqvDgj6zyBo9Nc1o58VANOkRt" 
                alt="Lumina Cosmetics"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-80" />
              <div className="absolute bottom-0 left-0 p-12">
                <span className="text-[10px] font-heading font-bold uppercase tracking-widest text-secondary mb-3 block">Branding & Web</span>
                <h4 className="text-3xl md:text-4xl font-heading font-bold">Lumina Cosmetics</h4>
              </div>
            </motion.div>

            <motion.div 
              whileHover={{ y: -10 }}
              className="md:col-span-4 group cursor-pointer relative overflow-hidden rounded-[2rem] h-[500px]"
            >
              <img 
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBgZuMbFzEW43jPfGPeWXja0qrDd_bCunDLDNtXHYj35pdFqmVgW3XhdLrl0xNeI8F3pS1KuKph59rLCAPzzg8PUdLCjSaMJAxM6d0CP3tDT2774UnWiBGPAlkWMIbQwrA5_aYMl08Kz95uubve27iwBmytrjKPw-jK_iKxHPv2D8-P9oMCoAO2hc-tslqvtTK0QRhnddwB_42_3jSNkJgguDCaNLeSOaI-123hMXpCACHP-PXvW7EUHqYf57bBtPzewj3MsL8JJKZl" 
                alt="Vortex NFT"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-80" />
              <div className="absolute bottom-0 left-0 p-10">
                <span className="text-[10px] font-heading font-bold uppercase tracking-widest text-secondary mb-3 block">Social Media</span>
                <h4 className="text-2xl md:text-3xl font-heading font-bold">Vortex NFT</h4>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services Detail Section */}
      <section id="services" className="py-16 px-gutter z-10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-heading mb-4 tracking-tighter">Our Services</h2>
            <p className="text-on-surface-variant text-base">Elite solutions for your brand's evolution.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: Terminal, title: "Web Development", items: ["Custom Website Development", "Responsive Design", "Performance Optimization"] },
              { icon: LayoutGrid, title: "UI/UX Design", items: ["User Interface Design", "User Experience Optimization", "Wireframing & Prototyping"] },
              { icon: Palette, title: "Branding", items: ["Logo Design", "Brand Identity", "Visual Guidelines"] },
              { icon: Film, title: "Video Editing", items: ["Short-form Content Editing", "Reels & Ads Editing", "Motion Graphics"] },
              { icon: Palette, title: "Image Editing", items: ["Social Media Creatives", "Ad Creatives", "Retouching"] },
              { icon: TrendingUp, title: "Social Media", items: ["Content Planning", "Posting & Scheduling", "Engagement Handling"] }
            ].map((service, i) => (
              <GlassCard key={i} className="border-l-4 border-l-secondary flex flex-col h-full">
                <div className="flex items-center gap-4 mb-8">
                  <service.icon className="w-8 h-8 text-secondary" />
                  <h3 className="text-2xl font-heading">{service.title}</h3>
                </div>
                <ul className="space-y-4 mb-4 flex-grow">
                  {service.items.map((item, j) => (
                    <li key={j} className="flex items-center gap-3 text-on-surface-variant">
                      <div className="w-1.5 h-1.5 bg-secondary rounded-full" />
                      {item}
                    </li>
                  ))}
                </ul>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="results" className="py-stack-lg px-gutter bg-[#080808] z-10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-heading mb-6 tracking-tighter">What Our Clients Say</h2>
            <p className="text-on-surface-variant text-lg">Real feedback from the people we've worked with.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {[
              { quote: "They understood our vision from day one and turned it into a website that truly represents Drriftaire. Clean, fast, and exactly what we needed to stand out.", author: "Sunit Giria", role: "Co-founder, Drriftaire" },
              { quote: "Professional, responsive, and incredibly detail-oriented. The final product exceeded what we had in mind — our website now speaks for itself.", author: "Saket Goenka", role: "Co-founder, Drriftaire" }
            ].map((t, i) => (
              <GlassCard key={i} className="flex flex-col justify-between border-t-2 border-t-secondary/30">
                <div className="mb-8">
                  <div className="flex gap-2 mb-6">
                    {[...Array(5)].map((_, j) => (
                      <motion.div
                        key={j}
                        initial={{ opacity: 0, scale: 0, rotate: -90 }}
                        whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                        viewport={{ once: true }}
                        transition={{ 
                          delay: 0.15 * j,
                          duration: 0.4,
                          ease: "backOut"
                        }}
                      >
                        <motion.div
                          animate={{ 
                            filter: [
                              "drop-shadow(0 0 0px rgba(221,183,255,0))",
                              "drop-shadow(0 0 6px rgba(221,183,255,0.8))",
                              "drop-shadow(0 0 0px rgba(221,183,255,0))"
                            ]
                          }}
                          transition={{ 
                            duration: 2,
                            repeat: Infinity,
                            delay: 0.3 * j,
                            ease: "easeInOut"
                          }}
                        >
                          <Star className="w-4 h-4 text-secondary fill-secondary" />
                        </motion.div>
                      </motion.div>
                    ))}
                  </div>
                  <p className="text-lg md:text-xl text-on-surface leading-relaxed tracking-tight">"{t.quote}"</p>
                </div>
                <div className="flex items-center gap-4 pt-6 border-t border-white/5">
                  <div className="w-10 h-10 rounded-full bg-secondary/10 border border-secondary/20 flex items-center justify-center">
                    <span className="font-heading text-sm font-bold text-secondary">{t.author.charAt(0)}</span>
                  </div>
                  <div>
                    <h5 className="text-base font-heading font-bold text-white">{t.author}</h5>
                    <p className="text-[10px] font-heading font-bold uppercase tracking-widest text-secondary/70 mt-0.5">{t.role}</p>
                  </div>
                </div>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="connect" className="py-32 px-gutter relative overflow-hidden z-10">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-violet-900/5 blur-[150px] rounded-full pointer-events-none" />
        <div className="max-w-4xl mx-auto text-center">
          <CTATypingHeading />
          
          <motion.a 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            href="https://wa.me/917980228396?text=Hey%20Nikunj%2C%20I%20wanna%20have%20a%20quick%20chat%20about%20your%20services%20got%20a%20minute%3F"
            className="inline-flex items-center gap-4 bg-[#25D366] text-black px-12 py-6 rounded-full font-heading font-bold uppercase tracking-widest text-sm hover:shadow-[0_0_40px_rgba(37,211,102,0.4)] transition-all duration-300 mb-16"
          >
            <MessageSquare className="w-6 h-6 fill-black" />
            Start on WhatsApp
          </motion.a>

          <ContactForm />
        </div>
      </section>

      {/* Footer */}
      <Footer onSocialClick={() => setShowSocials(true)} onPrivacyClick={() => setShowPrivacy(true)} onTermsClick={() => setShowTerms(true)} onCookiesClick={() => setShowCookies(true)} />

      {/* Floating Navigation */}
      <nav className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 flex items-center p-1.5 bg-black/60 backdrop-blur-2xl rounded-full border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
        <div className="flex items-center gap-1">
          <NavItem href="#home" icon={Zap} label="Home" active={activeSection === "home"} onClick={(e) => scrollToSection(e, "home")} />
          <NavItem href="#portfolio" icon={LayoutGrid} label="Portfolio" active={activeSection === "portfolio"} onClick={(e) => scrollToSection(e, "portfolio")} />
          <NavItem href="#services" icon={Terminal} label="Services" active={activeSection === "services"} onClick={(e) => scrollToSection(e, "services")} />
          <NavItem href="#results" icon={MessageSquare} label="Testimonials" active={activeSection === "results"} onClick={(e) => scrollToSection(e, "results")} />
        </div>
        
        <div className="flex items-center gap-4 border-l border-white/10 ml-2 pl-4 pr-4">
          <motion.a 
            href="#connect"
            onClick={(e: any) => scrollToSection(e, "connect")}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="flex items-center gap-2 bg-secondary text-black px-5 py-2.5 rounded-full text-[13px] font-bold transition-shadow hover:shadow-[0_0_20px_rgba(221,183,255,0.4)]"
          >
            Let's Connect
            <div className="w-5 h-5 rounded-full bg-black/20 flex items-center justify-center">
              <Zap className="w-3 h-3 fill-current" />
            </div>
          </motion.a>
          
          <a href="https://wa.me/917980228396?text=Hey%20Nikunj%2C%20I%20wanna%20have%20a%20quick%20chat%20about%20your%20services%20got%20a%20minute%3F" target="_blank" rel="noopener noreferrer" className="text-secondary hover:scale-110 transition-transform flex items-center justify-center">
            <svg 
              className="w-7 h-7 fill-current" 
              viewBox="0 0 24 24" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.72.94 3.659 1.437 5.63 1.438h.004c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
          </a>
        </div>
      </nav>
    </div>
  );
}

export default App;
