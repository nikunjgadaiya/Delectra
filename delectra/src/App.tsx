import React, { useEffect, useRef, useState } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  Terminal,
  LayoutGrid,
  Film,
  Palette,
  TrendingUp,
  MessageSquare,
  Zap,
  Globe,
  Star,
  ArrowUpRight,
  ArrowUp,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Footer from './components/Footer';
import SocialsComingSoon from './components/SocialsComingSoon';
import PrivacyPolicy from './components/PrivacyPolicy';
import TermsOfService from './components/TermsOfService';
import CookiesPolicy from './components/CookiesPolicy';
import InvertCursor from './components/InvertCursor';
import SplashScreen from './components/SplashScreen';
import ContactForm from './components/ContactForm';
import FAQSection from './components/FAQSection';
import AdminPanel from './components/AdminPanel';
import ThreeCurrencyRain from './components/ThreeCurrencyRain';
import ServiceMarquee from './components/ServiceMarquee';
import MagneticButton from './components/MagneticButton';
import TypewriterHeading from './components/TypewriterHeading';
import DrriftaireProject from './components/DrriftaireProject';

gsap.registerPlugin(ScrollTrigger);

// Project Data
const portfolioProjects = [
  {
    id: 'Drriftaire',
    title: 'Drriftaire',
    category: 'Website Development',
    tag: 'Website Development',
    description: 'A modern agricultural company that utilizes advanced drones to efficiently spray water and fertilizer on crops.',
    image: '/drriftaire-drone-farm.jpg',
  },
];

// Services Data
const servicesList = [
  {
    number: '01',
    icon: Terminal,
    title: 'Web Development',
    items: ['Custom Website Development', 'Responsive Design', 'Performance Optimization'],
  },
  {
    number: '02',
    icon: LayoutGrid,
    title: 'UI/UX Design',
    items: ['User Interface Design', 'User Experience Optimization', 'Wireframing & Prototyping'],
  },
  {
    number: '03',
    icon: Palette,
    title: 'Branding',
    items: ['Logo Design', 'Brand Identity', 'Visual Guidelines'],
  },
  {
    number: '04',
    icon: Film,
    title: 'Video Editing',
    items: ['Short-form Content Editing', 'Reels & Ads Editing', 'Motion Graphics'],
  },
  {
    number: '05',
    icon: Palette,
    title: 'Image Editing',
    items: ['Social Media Creatives', 'Ad Creatives', 'Retouching'],
  },
  {
    number: '06',
    icon: TrendingUp,
    title: 'Social Media',
    items: ['Content Planning', 'Posting & Scheduling', 'Engagement Handling'],
  },
];

export default function App() {
  const [showSplash, setShowSplash] = useState(true);
  const [showSocials, setShowSocials] = useState(false);
  const [showPrivacy, setShowPrivacy] = useState(false);
  const [showTerms, setShowTerms] = useState(false);
  const [showCookies, setShowCookies] = useState(false);
  const [showDrriftaireProject, setShowDrriftaireProject] = useState(
    window.location.pathname === '/project/drriftaire' || window.location.hash === '#drriftaire'
  );
  const [projectOriginRect, setProjectOriginRect] = useState<{
    top: number;
    left: number;
    width: number;
    height: number;
  } | null>(null);
  const [activeSection, setActiveSection] = useState('home');
  const [activeServiceRow, setActiveServiceRow] = useState<number>(0);
  const [isAdminView, setIsAdminView] = useState(window.location.pathname === '/admin');
  const [showBackToTop, setShowBackToTop] = useState(false);

  // Shared refs for 3D velocity and scroll syncing
  const scrollVelocityRef = useRef<number>(0);
  const scrollProgressRef = useRef<number>(0);
  const lenisRef = useRef<Lenis | null>(null);

  // Section Refs for GSAP
  const progressBarRef = useRef<HTMLDivElement>(null);
  const heroSectionRef = useRef<HTMLElement>(null);
  const heroLinesRef = useRef<HTMLDivElement>(null);
  const whyUsRef = useRef<HTMLElement>(null);
  const servicesRef = useRef<HTMLElement>(null);
  const portfolioRef = useRef<HTMLElement>(null);
  const testimonialsRef = useRef<HTMLElement>(null);
  const contactRef = useRef<HTMLElement>(null);
  const contactHeadlineRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const handleLocationChange = () => {
      setIsAdminView(window.location.pathname === '/admin');
      setShowDrriftaireProject(
        window.location.pathname === '/project/drriftaire' || window.location.hash === '#drriftaire'
      );
    };
    window.addEventListener('popstate', handleLocationChange);
    return () => window.removeEventListener('popstate', handleLocationChange);
  }, []);

  // Handle full-screen modals: lock body/html scroll to eliminate duplicate scrollbar and pause Lenis
  const isModalOpen = showSocials || showPrivacy || showTerms || showCookies || showDrriftaireProject;
  useEffect(() => {
    if (isModalOpen) {
      const originalHtmlOverflow = document.documentElement.style.overflow;
      const originalBodyOverflow = document.body.style.overflow;
      document.documentElement.style.overflow = 'hidden';
      document.body.style.overflow = 'hidden';
      lenisRef.current?.stop();

      return () => {
        document.documentElement.style.overflow = originalHtmlOverflow;
        document.body.style.overflow = originalBodyOverflow;
        lenisRef.current?.start();
      };
    } else {
      document.documentElement.style.overflow = '';
      document.body.style.overflow = '';
      lenisRef.current?.start();
    }
  }, [isModalOpen]);

  // Initialize Lenis Smooth Scroll synced with GSAP
  useEffect(() => {
    if (isAdminView) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const lenis = new Lenis({
      duration: prefersReducedMotion ? 0.01 : 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: !prefersReducedMotion,
    });
    lenisRef.current = lenis;

    lenis.on('scroll', (e: any) => {
      ScrollTrigger.update();
      scrollVelocityRef.current = e.velocity || 0;
      if (typeof e.progress === 'number') {
        scrollProgressRef.current = e.progress;
      }
    });

    const tickerCb = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(tickerCb);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(tickerCb);
      lenis.destroy();
    };
  }, [isAdminView]);

  // Master GSAP ScrollTrigger Animations
  useEffect(() => {
    if (showSplash || isAdminView) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // 1. Top Scroll Progress Bar
      if (progressBarRef.current) {
        gsap.to(progressBarRef.current, {
          scaleX: 1,
          ease: 'none',
          scrollTrigger: {
            start: 'top top',
            end: 'bottom bottom',
            scrub: true,
          },
        });
      }

      // 2. Hero Lines Slide Up on load & Stay Solid on scroll
      if (heroLinesRef.current) {
        const textElements = heroLinesRef.current.querySelectorAll('.hero-anim-item');
        gsap.fromTo(
          textElements,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            stagger: 0.12,
            ease: 'power3.out',
            delay: 0.1,
            clearProps: 'opacity,transform',
          }
        );
      }

      // 3. Why Us Columns rise at different speeds, scrubbed
      if (whyUsRef.current) {
        const columns = whyUsRef.current.querySelectorAll('.why-col');
        const shifts = [40, -25, 55, -15];
        columns.forEach((col, idx) => {
          gsap.fromTo(
            col,
            { y: shifts[idx] || 20 },
            {
              y: -(shifts[idx] || 20),
              ease: 'none',
              scrollTrigger: {
                trigger: whyUsRef.current,
                start: 'top bottom',
                end: 'bottom top',
                scrub: true,
              },
            }
          );
        });
      }

      // 4. Services Row Animation: middle of viewport active, titles slide in, bullets stagger
      if (servicesRef.current) {
        const rows = servicesRef.current.querySelectorAll('.service-row');
        rows.forEach((row, i) => {
          const title = row.querySelector('.service-title');
          const bullets = row.querySelectorAll('.service-bullet');

          if (title) {
            gsap.fromTo(
              title,
              { x: -35, opacity: 0.2 },
              {
                x: 0,
                opacity: 1,
                scrollTrigger: {
                  trigger: row,
                  start: 'top 85%',
                  end: 'top 50%',
                  scrub: true,
                },
              }
            );
          }

          if (bullets && bullets.length > 0) {
            gsap.fromTo(
              bullets,
              { x: 30, opacity: 0 },
              {
                x: 0,
                opacity: 1,
                stagger: 0.08,
                scrollTrigger: {
                  trigger: row,
                  start: 'top 80%',
                  end: 'top 45%',
                  scrub: true,
                },
              }
            );
          }

          ScrollTrigger.create({
            trigger: row,
            start: 'top 65%',
            end: 'bottom 35%',
            onEnter: () => setActiveServiceRow(i),
            onEnterBack: () => setActiveServiceRow(i),
          });
        });
      }


      // 6. Testimonial Cards Tilt In & Quote words light up
      if (testimonialsRef.current) {
        const cards = testimonialsRef.current.querySelectorAll('.testimonial-card');
        gsap.fromTo(
          cards,
          { rotateY: 10, rotateX: 6, y: 60, opacity: 0.5 },
          {
            rotateY: 0,
            rotateX: 0,
            y: 0,
            opacity: 1,
            stagger: 0.2,
            duration: 1.2,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: testimonialsRef.current,
              start: 'top 80%',
            },
          }
        );

        // Quote words light up as you scroll
        const quotes = testimonialsRef.current.querySelectorAll('.quote-text');
        quotes.forEach((q) => {
          gsap.fromTo(
            q,
            { '--reveal-pct': '0%' },
            {
              '--reveal-pct': '100%',
              ease: 'none',
              scrollTrigger: {
                trigger: q,
                start: 'top 75%',
                end: 'bottom 45%',
                scrub: 1,
              },
            }
          );
        });
      }

      // 7. Contact Headline scales in
      if (contactHeadlineRef.current) {
        gsap.fromTo(
          contactHeadlineRef.current,
          { scale: 0.88, opacity: 0 },
          {
            scale: 1,
            opacity: 1,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: contactRef.current,
              start: 'top 80%',
            },
          }
        );
      }
    });

    return () => ctx.revert();
  }, [showSplash, isAdminView]);

  // Section scrollspy for nav indicator and back to top visibility
  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 400);

      const sections = ['home', 'why-us', 'portfolio', 'services', 'results', 'connect', 'faq'];
      const scrollY = window.scrollY + 300;
      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollY >= top && scrollY < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (e?: React.MouseEvent, id: string = 'home') => {
    if (e) e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      if (lenisRef.current) {
        lenisRef.current.scrollTo(element, { offset: -60, duration: 1.2 });
      } else {
        element.scrollIntoView({ behavior: 'smooth' });
      }
      setActiveSection(id);
    }
  };

  const scrollToTop = () => {
    if (lenisRef.current) {
      lenisRef.current.scrollTo(0, { duration: 1.4 });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    setActiveSection('home');
  };

  const handleSplashComplete = () => {
    setShowSplash(false);
    window.scrollTo({ top: 0, behavior: 'instant' });
  };


  if (isAdminView) {
    return <AdminPanel />;
  }

  return (
    <div className="relative min-h-screen bg-[#07060b] text-[#ece8f5] overflow-x-hidden">
      {/* Top Scroll Progress Bar */}
      <div
        ref={progressBarRef}
        aria-hidden="true"
        className="fixed top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#c9b2ff] via-[#2bd96b] to-[#2bd96b] z-50 origin-left scale-x-0 pointer-events-none"
      />

      {/* 3D Raining Currency Canvas */}
      <ThreeCurrencyRain
        scrollVelocityRef={scrollVelocityRef}
        scrollProgressRef={scrollProgressRef}
      />

      {/* Visual Textures: Ambient Glows */}
      <div aria-hidden="true" className="glow-lavender" />
      <div aria-hidden="true" className="glow-green" />

      {/* Splash Screen */}
      {showSplash && <SplashScreen onComplete={handleSplashComplete} />}

      {/* Custom Invert Cursor */}
      <InvertCursor />

      {/* Modals */}
      {showSocials && (
        <SocialsComingSoon
          onBack={() => setShowSocials(false)}
        />
      )}

      {showPrivacy && (
        <PrivacyPolicy
          onBack={() => setShowPrivacy(false)}
        />
      )}

      {showTerms && (
        <TermsOfService
          onBack={() => setShowTerms(false)}
        />
      )}

      {showCookies && (
        <CookiesPolicy
          onBack={() => setShowCookies(false)}
        />
      )}

      {showDrriftaireProject && (
        <DrriftaireProject
          originRect={projectOriginRect}
          onBack={() => {
            setShowDrriftaireProject(false);
            if (window.location.pathname === '/project/drriftaire' || window.location.hash === '#drriftaire') {
              window.history.pushState(null, '', '/');
            }
          }}
          onOpenContact={() => {
            setShowDrriftaireProject(false);
            if (window.location.pathname === '/project/drriftaire' || window.location.hash === '#drriftaire') {
              window.history.pushState(null, '', '/');
            }
            setTimeout(() => {
              scrollToSection(undefined, 'contact');
            }, 50);
          }}
          onNavigate={(id) => {
            setShowDrriftaireProject(false);
            if (window.location.pathname === '/project/drriftaire' || window.location.hash === '#drriftaire') {
              window.history.pushState(null, '', '/');
            }
            setTimeout(() => {
              scrollToSection(undefined, id);
            }, 50);
          }}
        />
      )}

      {/* =========================================================================
          HERO SECTION
      ========================================================================== */}
      <header
        id="home"
        ref={heroSectionRef}
        className="relative min-h-[92vh] flex flex-col items-center justify-center px-gutter pt-16 pb-12 z-10"
      >
        <div ref={heroLinesRef} className="text-center max-w-5xl mx-auto relative w-full">
          {/* Logo */}
          <div className="mb-8 hero-anim-item">
            <img
              src="/logo.png"
              alt="Delectra"
              className="h-16 md:h-24 mx-auto transition-transform duration-500 hover:scale-105 mix-blend-screen"
            />
          </div>

          {/* Main Headline Container */}
          <div className="relative inline-block mb-6">
            {/* Floating PNG Badge - Independent Floating Element */}
            <div className="absolute -right-10 sm:-right-20 md:-right-32 lg:-right-40 -top-8 sm:-top-12 md:-top-16 z-20 cursor-pointer pointer-events-auto float-animation">
              <img
                src="/hero-badge.png"
                alt="Badge"
                style={{ transform: 'rotate(15deg)' }}
                className="w-20 sm:w-28 md:w-36 lg:w-44 h-auto object-contain drop-shadow-[0_10px_25px_rgba(201,178,255,0.35)] transition-all duration-300 ease-out hover:scale-110 hover:drop-shadow-[0_15px_35px_rgba(201,178,255,0.65)]"
              />
            </div>

            <TypewriterHeading startTyping={!showSplash} />
          </div>

          {/* Subheading */}
          <p className="hero-anim-item text-base sm:text-lg md:text-xl text-[#8d869c] max-w-2xl mx-auto mb-8 leading-relaxed">
            Design, content, branding, and digital execution focused on one thing — growth.
          </p>
        </div>
      </header>

      {/* =========================================================================
          WHY US SECTION (4 columns separated by hairlines, not cards)
      ========================================================================== */}
      <section id="why-us" ref={whyUsRef} className="py-24 px-gutter relative z-10 border-t border-white/10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-heading font-bold mb-4 tracking-tight">
              Why Us
            </h2>
            <div aria-hidden="true" className="w-12 h-1 bg-[#2bd96b] mx-auto rounded-full" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-white/10 border-y border-white/10">
            {/* Col 1 */}
            <div className="why-col p-8 md:p-10 flex flex-col justify-between">
              <div>
                <Globe aria-hidden="true" className="w-8 h-8 text-[#2bd96b] mb-6" />
                <h3 className="text-xl md:text-2xl font-heading font-bold mb-3 text-[#ece8f5]">
                  Creative + Strategy
                </h3>
                <p className="text-[#8d869c] leading-relaxed text-sm">
                  We research new trends on a daily basis to make your brand stand out.
                </p>
              </div>
            </div>

            {/* Col 2 */}
            <div className="why-col p-8 md:p-10 flex flex-col justify-between">
              <div>
                <Zap aria-hidden="true" className="w-8 h-8 text-[#2bd96b] mb-6" />
                <h3 className="text-xl md:text-2xl font-heading font-bold mb-3 text-[#ece8f5]">
                  Fast Execution
                </h3>
                <p className="text-[#8d869c] leading-relaxed text-sm">
                  Rapid delivery with fast response and turn-around time, cause we want our clients to be updated.
                </p>
              </div>
            </div>

            {/* Col 3 */}
            <div className="why-col p-8 md:p-10 flex flex-col justify-between">
              <div>
                <LayoutGrid aria-hidden="true" className="w-8 h-8 text-[#2bd96b] mb-6" />
                <h3 className="text-xl md:text-2xl font-heading font-bold mb-3 text-[#ece8f5]">
                  All-in-one
                </h3>
                <p className="text-[#8d869c] leading-relaxed text-sm">
                  Seamless integration across design, content, and growth operations.
                </p>
              </div>
            </div>

            {/* Col 4 */}
            <div className="why-col p-8 md:p-10 flex flex-col justify-between">
              <div>
                <Palette aria-hidden="true" className="w-8 h-8 text-[#2bd96b] mb-6" />
                <h3 className="text-xl md:text-2xl font-heading font-bold mb-3 text-[#ece8f5]">
                  Modern Design
                </h3>
                <p className="text-[#8d869c] leading-relaxed text-sm">
                  Delivering whats trending in market today.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SERVICE-NAME MARQUEE (aria-hidden, velocity synced)
      ========================================================================== */}
      <ServiceMarquee scrollVelocityRef={scrollVelocityRef} />

      {/* =========================================================================
          PORTFOLIO SECTION (tabs, then pinned horizontal scroll with large frames)
      ========================================================================== */}
      <section
        id="portfolio"
        ref={portfolioRef}
        className="py-24 px-gutter relative z-10 bg-[#07060b]/90 overflow-hidden"
      >
        <div className="max-w-7xl mx-auto">
          {/* Header & Tabs */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-heading font-bold mb-4 tracking-tight">
              Portfolio
            </h2>
            <div aria-hidden="true" className="w-12 h-1 bg-[#2bd96b] mx-auto rounded-full mb-6" />
            <p className="text-[#8d869c] text-base max-w-xl mx-auto">
              Visionary works for brands that demand excellence.
            </p>
          </div>
          {/* Featured Project (Single Item) */}
          <div className="w-full relative group overflow-hidden rounded-[2rem] border border-white/10 bg-[#0e0d14]/70 aspect-[16/9] md:aspect-[21/9]">
            <img
              src={portfolioProjects[0].image}
              alt={portfolioProjects[0].title}
              className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
            />
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-gradient-to-t from-[#07060b] via-[#07060b]/40 to-transparent opacity-90"
            />
            <div className="absolute bottom-0 left-0 w-full p-8 md:p-16 flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div>
                <span className="text-xs md:text-sm font-heading font-bold uppercase tracking-widest text-[#2bd96b] mb-3 block">
                  {portfolioProjects[0].category}
                </span>
                <h4 className="text-3xl md:text-5xl font-heading font-bold text-[#ece8f5] mb-4">
                  {portfolioProjects[0].title}
                </h4>
                {portfolioProjects[0].description && (
                  <p className="text-[#8d869c] text-sm md:text-base max-w-lg leading-relaxed">
                    {portfolioProjects[0].description}
                  </p>
                )}
              </div>
              <button
                type="button"
                onClick={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect();
                  setProjectOriginRect({
                    top: Math.round(rect.top),
                    left: Math.round(rect.left),
                    width: Math.round(rect.width),
                    height: Math.round(rect.height),
                  });
                  setShowDrriftaireProject(true);
                  window.history.pushState(null, '', '/project/drriftaire');
                }}
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-[#2bd96b]/50 transition-all rounded-full text-sm font-semibold uppercase tracking-wider backdrop-blur-md self-start md:self-auto cursor-pointer group hover:scale-102 active:scale-98"
              >
                <span>View Project</span>
                <ArrowUpRight className="w-4 h-4 text-[#2bd96b] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          OUR SERVICES (6 numbered rows: title left, bullets right)
      ========================================================================== */}
      <section id="services" ref={servicesRef} className="py-28 px-gutter relative z-10 border-t border-white/10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-heading font-bold mb-3 tracking-tight">
              Our Services
            </h2>
            <p className="text-[#8d869c] text-base">Elite solutions for your brand's evolution.</p>
          </div>

          <div className="divide-y divide-white/10 border-y border-white/10">
            {servicesList.map((service, index) => {
              const isActive = activeServiceRow === index;
              return (
                <div
                  key={index}
                  className={`service-row py-10 md:py-14 px-4 md:px-8 transition-all duration-500 grid grid-cols-1 md:grid-cols-12 gap-6 items-center ${isActive ? 'opacity-100 bg-white/[0.015]' : 'opacity-35 hover:opacity-75'
                    }`}
                >
                  {/* Left Column: Number & Title */}
                  <div className="service-title md:col-span-5 flex items-center gap-6">
                    <span
                      aria-hidden="true"
                      className="font-serif italic text-2xl md:text-3xl text-[#c9b2ff]/60 select-none shrink-0"
                    >
                      {service.number}
                    </span>
                    <div className="flex items-center gap-4">
                      <service.icon
                        aria-hidden="true"
                        className="w-6 h-6 md:w-7 md:h-7 text-[#2bd96b] shrink-0"
                      />
                      <h3 className="text-2xl md:text-3xl font-heading font-bold text-[#ece8f5]">
                        {service.title}
                      </h3>
                    </div>
                  </div>

                  {/* Right Column: Bullets */}
                  <div className="md:col-span-7 flex flex-wrap md:justify-end gap-3 md:gap-4">
                    {service.items.map((item, j) => (
                      <div
                        key={j}
                        className="service-bullet px-4 py-2 rounded-full border border-white/10 bg-white/[0.02] text-xs md:text-sm text-[#8d869c] flex items-center gap-2"
                      >
                        <div
                          aria-hidden="true"
                          className="w-1.5 h-1.5 rounded-full bg-[#2bd96b]"
                        />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* =========================================================================
          WHAT OUR CLIENTS SAY (two quotes side by side, words light up as you scroll)
      ========================================================================== */}
      <section
        id="results"
        ref={testimonialsRef}
        className="py-32 px-gutter relative z-10 border-t border-white/10 bg-[#07060b]/80"
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-6xl font-heading font-bold mb-4 tracking-tight">
              What Our Clients Say
            </h2>
            <p className="text-[#8d869c] text-lg">Real feedback from the people we've worked with.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Testimonial 1 */}
            <div className="testimonial-card glass-card p-8 md:p-12 flex flex-col justify-between border-t border-t-[#2bd96b]/40 relative overflow-hidden bg-[#0e0d14]/70">
              <div className="mb-8">
                {/* 5 Stars */}
                <div aria-hidden="true" className="flex gap-1.5 mb-6 text-[#2bd96b]">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current text-[#2bd96b]" />
                  ))}
                </div>

                <p className="quote-text text-lg md:text-xl text-[#ece8f5] leading-relaxed tracking-tight" style={{ '--reveal-pct': '0%' } as React.CSSProperties}>
                  "{"They understood our vision from day one and turned it into a website that truly represents Drriftaire. Clean, fast, and exactly what we needed to stand out."}"
                </p>
              </div>

              <div className="flex items-center gap-4 pt-6 border-t border-white/10">
                <div className="w-10 h-10 rounded-full bg-[#2bd96b]/10 border border-[#2bd96b]/30 flex items-center justify-center">
                  <span className="font-heading text-sm font-bold text-[#2bd96b]">S</span>
                </div>
                <div>
                  <h5 className="text-base font-heading font-bold text-white">Sunit Giria</h5>
                  <p className="text-[10px] font-heading font-semibold uppercase tracking-widest text-[#8d869c] mt-0.5">
                    Co-founder, Drriftaire
                  </p>
                </div>
              </div>
            </div>

            {/* Testimonial 2 */}
            <div className="testimonial-card glass-card p-8 md:p-12 flex flex-col justify-between border-t border-t-[#2bd96b]/40 relative overflow-hidden bg-[#0e0d14]/70">
              <div className="mb-8">
                {/* 5 Stars */}
                <div aria-hidden="true" className="flex gap-1.5 mb-6 text-[#2bd96b]">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current text-[#2bd96b]" />
                  ))}
                </div>

                <p className="quote-text text-lg md:text-xl text-[#ece8f5] leading-relaxed tracking-tight" style={{ '--reveal-pct': '0%' } as React.CSSProperties}>
                  "{"Professional, responsive, and incredibly detail-oriented. The final product exceeded what we had in mind — our website now speaks for itself."}"
                </p>
              </div>

              <div className="flex items-center gap-4 pt-6 border-t border-white/10">
                <div className="w-10 h-10 rounded-full bg-[#2bd96b]/10 border border-[#2bd96b]/30 flex items-center justify-center">
                  <span className="font-heading text-sm font-bold text-[#2bd96b]">S</span>
                </div>
                <div>
                  <h5 className="text-base font-heading font-bold text-white">Saket Goenka</h5>
                  <p className="text-[10px] font-heading font-semibold uppercase tracking-widest text-[#8d869c] mt-0.5">
                    Co-founder, Drriftaire
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          CONTACT SECTION (headline & magnetic WhatsApp on left, form on right)
      ========================================================================== */}
      <section
        id="connect"
        ref={contactRef}
        className="py-32 px-gutter relative overflow-hidden z-10 border-t border-white/10"
      >
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          {/* Left Column: Big Headline & WhatsApp Button */}
          <div className="lg:col-span-5 flex flex-col items-start pt-6">
            <h2
              ref={contactHeadlineRef}
              className="text-5xl sm:text-6xl md:text-7xl font-heading font-bold tracking-tighter leading-[1.05] mb-12 text-[#ece8f5]"
            >
              Let's build something great.
            </h2>

            <MagneticButton
              href="https://wa.me/917980228396?text=Hey%20Nikunj%2C%20I%20wanna%20have%20a%20quick%20chat%20about%20your%20services%20got%20a%20minute%3F"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-4 bg-[#2bd96b] hover:bg-[#25c460] text-[#07060b] px-10 py-5 rounded-full font-heading font-bold uppercase tracking-widest text-xs transition-all duration-300 shadow-[0_10px_35px_rgba(43,217,107,0.35)] cursor-pointer"
            >
              <MessageSquare aria-hidden="true" className="w-5 h-5 fill-current" />
              <span>Start on WhatsApp</span>
            </MagneticButton>
          </div>

          {/* Right Column: Form Panel */}
          <div className="lg:col-span-7 w-full">
            <ContactForm />
          </div>
        </div>
      </section>

      {/* =========================================================================
          FAQ SECTION (Frequently Asked Questions)
      ========================================================================== */}
      <FAQSection onScrollToForm={() => scrollToSection(undefined, 'connect')} />

      {/* =========================================================================
          4-COLUMN FOOTER (with giant outlined wordmark)
      ========================================================================== */}
      <Footer
        onSocialClick={() => setShowSocials(true)}
        onPrivacyClick={() => setShowPrivacy(true)}
        onTermsClick={() => setShowTerms(true)}
        onCookiesClick={() => setShowCookies(true)}
        onNavigate={(id) => scrollToSection(undefined, id)}
      />

      {/* =========================================================================
          FLOATING GLASS PILL NAVIGATION (rendered at DOM end matching order)
      ========================================================================== */}
      <nav className="fixed bottom-4 sm:bottom-8 left-1/2 -translate-x-1/2 z-40 flex items-center p-1 sm:p-1.5 glass-pill rounded-full max-w-[96vw] overflow-x-auto no-scrollbar">
        <div className="flex items-center gap-0.5 sm:gap-1">
          <a
            href="#home"
            onClick={(e) => scrollToSection(e, 'home')}
            className={`flex flex-col items-center justify-center min-w-[52px] sm:min-w-[75px] py-1 sm:py-1.5 px-2 sm:px-3 rounded-full transition-all duration-300 ${activeSection === 'home' ? 'text-[#2bd96b]' : 'text-[#8d869c] hover:text-white'
              }`}
          >
            <Zap aria-hidden="true" className="w-3.5 h-3.5 sm:w-4 sm:h-4 mb-0.5" />
            <span className="font-heading text-[8px] sm:text-[9px] uppercase tracking-wider font-semibold">
              Home
            </span>
          </a>

          <a
            href="#portfolio"
            onClick={(e) => scrollToSection(e, 'portfolio')}
            className={`flex flex-col items-center justify-center min-w-[52px] sm:min-w-[75px] py-1 sm:py-1.5 px-2 sm:px-3 rounded-full transition-all duration-300 ${activeSection === 'portfolio' ? 'text-[#2bd96b]' : 'text-[#8d869c] hover:text-white'
              }`}
          >
            <LayoutGrid aria-hidden="true" className="w-3.5 h-3.5 sm:w-4 sm:h-4 mb-0.5" />
            <span className="font-heading text-[8px] sm:text-[9px] uppercase tracking-wider font-semibold">
              Portfolio
            </span>
          </a>

          <a
            href="#services"
            onClick={(e) => scrollToSection(e, 'services')}
            className={`flex flex-col items-center justify-center min-w-[52px] sm:min-w-[75px] py-1 sm:py-1.5 px-2 sm:px-3 rounded-full transition-all duration-300 ${activeSection === 'services' ? 'text-[#2bd96b]' : 'text-[#8d869c] hover:text-white'
              }`}
          >
            <Terminal aria-hidden="true" className="w-3.5 h-3.5 sm:w-4 sm:h-4 mb-0.5" />
            <span className="font-heading text-[8px] sm:text-[9px] uppercase tracking-wider font-semibold">
              Services
            </span>
          </a>

          <a
            href="#results"
            onClick={(e) => scrollToSection(e, 'results')}
            className={`flex flex-col items-center justify-center min-w-[52px] sm:min-w-[75px] py-1 sm:py-1.5 px-2 sm:px-3 rounded-full transition-all duration-300 ${activeSection === 'results' ? 'text-[#2bd96b]' : 'text-[#8d869c] hover:text-white'
              }`}
          >
            <MessageSquare aria-hidden="true" className="w-3.5 h-3.5 sm:w-4 sm:h-4 mb-0.5" />
            <span className="font-heading text-[8px] sm:text-[9px] uppercase tracking-wider font-semibold">
              Testimonials
            </span>
          </a>
        </div>

        <div className="flex items-center gap-1.5 sm:gap-3 border-l border-white/10 ml-1 sm:ml-2 pl-2 sm:pl-3 pr-1 sm:pr-2">
          <a
            href="#connect"
            onClick={(e) => scrollToSection(e, 'connect')}
            className="flex items-center gap-1 sm:gap-2 bg-[#2bd96b] text-[#07060b] px-2.5 sm:px-4 py-1.5 sm:py-2 rounded-full text-[11px] sm:text-xs font-bold transition-all hover:bg-[#25c460] whitespace-nowrap"
          >
            <span>Let's Connect</span>
            <div
              aria-hidden="true"
              className="w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full bg-[#07060b]/20 flex items-center justify-center"
            >
              <Zap className="w-2 h-2 sm:w-2.5 sm:h-2.5 fill-current" />
            </div>
          </a>

          <a
            href="https://wa.me/917980228396?text=Hey%20Nikunj%2C%20I%20wanna%20have%20a%20quick%20chat%20about%20your%20services%20got%20a%20minute%3F"
            target="_blank"
            rel="noopener noreferrer"
            aria-hidden="true"
            className="text-[#2bd96b] hover:scale-110 transition-transform flex items-center justify-center p-1"
          >
            <svg
              className="w-5 h-5 sm:w-6 sm:h-6 fill-current"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.72.94 3.659 1.437 5.63 1.438h.004c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
          </a>
        </div>
      </nav>

      {/* =========================================================================
          FLOATING BACK TO TOP BUTTON (bottom right)
      ========================================================================== */}
      <AnimatePresence>
        {showBackToTop && (
          <motion.button
            type="button"
            initial={{ opacity: 0, scale: 0.7, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.7, y: 15 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            onClick={scrollToTop}
            aria-label="Back to top"
            className="fixed bottom-4 sm:bottom-8 right-4 sm:right-8 z-40 w-11 h-11 sm:w-12 sm:h-12 rounded-full border border-white/10 bg-[#0e0d14]/85 hover:bg-[#2bd96b] hover:border-[#2bd96b] text-[#ece8f5] hover:text-[#07060b] backdrop-blur-xl flex items-center justify-center transition-all duration-300 shadow-[0_10px_30px_rgba(0,0,0,0.6)] hover:shadow-[0_0_25px_rgba(43,217,107,0.4)] group cursor-pointer"
          >
            <ArrowUp className="w-5 h-5 transition-transform duration-300 group-hover:-translate-y-0.5" />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
