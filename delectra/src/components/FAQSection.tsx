import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  HelpCircle,
  ChevronDown,
  Layers,
  Clock,
  CreditCard,
  RefreshCw,
  ShieldCheck,
  Rocket,
  MessageSquare,
  ArrowUpRight,
} from 'lucide-react';
import MagneticButton from './MagneticButton';
import './FAQSection.css';

interface FAQItem {
  id: string;
  category: string;
  icon: React.ElementType;
  question: string;
  answer: string;
}

const faqData: FAQItem[] = [
  {
    id: 'services-scope',
    category: 'Services & Scope',
    icon: Layers,
    question: 'What services does Delectra offer, and can I hire you for individual services?',
    answer:
      'We offer end-to-end creative and digital solutions — including Custom Web Development, UI/UX Design, Branding, Video & Image Editing, and Social Media Management. You can either hire us for a single dedicated service or partner with us for a complete full-stack package tailored to your brand.',
  },
  {
    id: 'timelines-delivery',
    category: 'Timelines & Delivery',
    icon: Clock,
    question: 'How long does a typical project take from start to finish?',
    answer:
      'Timelines depend on project complexity and scope. Design and branding projects typically take 1–2 weeks, while full-scale custom websites take between 2–4 weeks. We establish clear milestone schedules and keep you updated throughout execution.',
  },
  {
    id: 'pricing-payment',
    category: 'Pricing & Payment',
    icon: CreditCard,
    question: 'How does your pricing structure and payment process work?',
    answer:
      'We quote based on the specific scope, complexity, and deliverables of each project. Typically, we work with a 50% upfront deposit to begin and the remaining 50% upon final delivery and complete client satisfaction.',
  },
  {
    id: 'revisions-collaboration',
    category: 'Revisions & Collaboration',
    icon: RefreshCw,
    question: 'What does the revision process look like if changes are needed?',
    answer:
      'We work closely with you at every stage. We include dedicated revision rounds during design and development phases to ensure the final product meets your exact vision, aesthetic standards, and business goals.',
  },
  {
    id: 'support-maintenance',
    category: 'Support & Maintenance',
    icon: ShieldCheck,
    question: 'Do you offer post-launch support and maintenance for websites?',
    answer:
      'Yes! We offer ongoing support, performance monitoring, technical updates, and maintenance retainers to keep your website fast, secure, and always operating at peak efficiency.',
  },
  {
    id: 'getting-started',
    category: 'Getting Started',
    icon: Rocket,
    question: 'How do we get started on a project?',
    answer:
      'Fill out our contact form above or drop us a quick message directly on WhatsApp. We’ll schedule a brief discovery chat to understand your goals, recommend the best approach, and send over an actionable proposal.',
  },
];

interface FAQSectionProps {
  onScrollToForm?: () => void;
}

/* =========================================================================
   TEXT REVEAL HELPER (Staggered Word Blur Animation)
   Matches the signature word-by-word reveal from DrriftaireProject.
========================================================================== */
function RevealWords({
  text,
  startIndex = 0,
  className = '',
}: {
  text: string;
  startIndex?: number;
  className?: string;
}) {
  const words = text.split(' ').filter(Boolean);

  return (
    <span className={`reveal-words ${className}`} aria-hidden="true">
      {words.map((word, i) => (
        <span
          key={i}
          className="reveal-word"
          style={{
            transitionDelay: `${Math.min((startIndex + i) * 55, 1200)}ms`,
          }}
        >
          {word}
        </span>
      ))}
    </span>
  );
}

export default function FAQSection({ onScrollToForm }: FAQSectionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const sectionRef = useRef<HTMLElement>(null);
  const [motionReady, setMotionReady] = useState(false);

  // Motion setup: only enable hidden initial state when JS is active and reduced-motion is off
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    if (prefersReducedMotion) {
      // Without motion, leave elements in default visible state
      return;
    }

    setMotionReady(true);

    const section = sectionRef.current;
    if (!section) return;

    // Observe all .reveal-target elements when entering the viewport
    const targets = section.querySelectorAll('.reveal-target');

    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-revealed');
            obs.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.05,
        rootMargin: '0px 0px -20px 0px',
      }
    );

    // Observe all targets and immediately reveal those already in the viewport
    targets.forEach((target) => {
      const rect = target.getBoundingClientRect();
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        target.classList.add('is-revealed');
      } else {
        observer.observe(target);
      }
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  const toggleAccordion = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  const handleBackToForm = (e: React.MouseEvent) => {
    e.preventDefault();
    if (onScrollToForm) {
      onScrollToForm();
    } else {
      const el = document.getElementById('connect');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <section
      id="faq"
      ref={sectionRef}
      className={`faq-section py-28 md:py-36 px-gutter relative z-10 border-t border-white/10 bg-[#07060b]/80 ${
        motionReady ? 'motion-ready' : ''
      }`}
    >
      {/* Subtle background ambient lighting */}
      <div
        aria-hidden="true"
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-[#2bd96b]/[0.03] blur-[120px] rounded-full pointer-events-none"
      />

      <div className="max-w-4xl mx-auto relative">
        {/* Section Header */}
        <div className="text-center mb-16 md:mb-20">
          <div className="faq-badge-reveal reveal-target inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-white/10 bg-white/[0.03] text-xs font-heading font-medium tracking-widest uppercase text-[#2bd96b] mb-5 backdrop-blur-sm">
            <HelpCircle className="w-3.5 h-3.5 text-[#2bd96b]" />
            <span>Got Questions?</span>
          </div>

          <h2
            className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-[#ece8f5] tracking-tight mb-5 reveal-target"
            aria-label="Frequently Asked Questions"
          >
            <RevealWords text="Frequently Asked" startIndex={0} />{' '}
            <span className="accent-serif text-[#c9b2ff]">
              <RevealWords text="Questions" startIndex={2} />
            </span>
          </h2>

          <p
            className="text-[#8d869c] text-sm md:text-base max-w-xl mx-auto leading-relaxed reveal-target"
            aria-label="Everything you need to know about our services, timelines, pricing, and how we collaborate."
          >
            <RevealWords
              text="Everything you need to know about our services, timelines, pricing, and how we collaborate."
              startIndex={0}
            />
          </p>
        </div>

        {/* FAQ Accordion List */}
        <div className="space-y-4">
          {faqData.map((item, index) => {
            const isOpen = openIndex === index;
            const CategoryIcon = item.icon;

            return (
              <div
                key={item.id}
                style={{
                  transitionDelay: `${Math.min(index * 75, 550)}ms`,
                }}
                className={`faq-item-card reveal-target rounded-2xl md:rounded-3xl border ${
                  isOpen
                    ? 'border-[#2bd96b]/35 bg-[#0e0d14]/90 shadow-[0_12px_36px_rgba(0,0,0,0.45)]'
                    : 'border-white/10 bg-[#0e0d14]/50 hover:border-white/20 hover:bg-[#0e0d14]/75'
                } backdrop-blur-md overflow-hidden`}
              >
                <button
                  type="button"
                  onClick={() => toggleAccordion(index)}
                  className="w-full text-left py-6 px-6 md:px-8 flex items-center justify-between gap-4 cursor-pointer focus:outline-none focus-visible:ring-1 focus-visible:ring-[#2bd96b]"
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${item.id}`}
                >
                  <div className="flex flex-col gap-1.5 pr-2">
                    {/* Category pill */}
                    <div className="flex items-center gap-2">
                      <span className="flex items-center gap-1.5 text-[11px] font-heading font-semibold uppercase tracking-wider text-[#2bd96b]/90">
                        <CategoryIcon className="w-3.5 h-3.5 text-[#2bd96b]" />
                        {item.category}
                      </span>
                    </div>

                    {/* Question text */}
                    <h3
                      className={`text-base md:text-lg lg:text-xl font-heading font-bold transition-colors duration-200 ${
                        isOpen ? 'text-[#ece8f5]' : 'text-[#ece8f5]/90 hover:text-white'
                      }`}
                    >
                      {item.question}
                    </h3>
                  </div>

                  {/* Indicator Icon */}
                  <div
                    className={`w-9 h-9 shrink-0 rounded-full flex items-center justify-center border transition-all duration-300 ${
                      isOpen
                        ? 'border-[#2bd96b]/50 bg-[#2bd96b]/15 text-[#2bd96b] rotate-180'
                        : 'border-white/10 bg-white/[0.03] text-[#8d869c]'
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {/* Animated Answer Body */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={`faq-answer-${item.id}`}
                      initial={{ height: 0, opacity: 0, filter: 'blur(8px)' }}
                      animate={{ height: 'auto', opacity: 1, filter: 'blur(0px)' }}
                      exit={{ height: 0, opacity: 0, filter: 'blur(8px)' }}
                      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 md:px-8 pb-6 pt-1 text-[#8d869c] text-sm md:text-base leading-relaxed border-t border-white/5">
                        <p>{item.answer}</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        {/* Bottom Contact Help Card */}
        <div
          style={{ transitionDelay: '150ms' }}
          className="faq-bottom-card reveal-target mt-14 p-6 md:p-8 rounded-2xl md:rounded-3xl border border-white/10 bg-white/[0.02] backdrop-blur-md flex flex-col sm:flex-row items-center justify-between gap-6"
        >
          <div className="text-center sm:text-left">
            <h4 className="text-lg md:text-xl font-heading font-bold text-[#ece8f5] mb-1">
              Still have a question?
            </h4>
            <p className="text-xs md:text-sm text-[#8d869c]">
              We’re here to help. Reach out directly on WhatsApp or submit the form above.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={handleBackToForm}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-full border border-white/10 hover:border-white/30 bg-white/5 hover:bg-white/10 text-xs font-heading font-semibold uppercase tracking-wider text-[#ece8f5] transition-all cursor-pointer"
            >
              <span>Back to Form</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-[#2bd96b]" />
            </button>

            <MagneticButton
              href="https://wa.me/917980228396?text=Hey%20Nikunj%2C%20I%20have%20a%20question%20that%20isn%27t%20in%20the%20FAQ%2C%20got%20a%20minute%3F"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 bg-[#2bd96b] hover:bg-[#25c460] text-[#07060b] px-6 py-3 rounded-full font-heading font-bold uppercase tracking-wider text-xs transition-all shadow-[0_4px_20px_rgba(43,217,107,0.3)]"
            >
              <MessageSquare className="w-3.5 h-3.5 fill-current" />
              <span>Chat With Us</span>
            </MagneticButton>
          </div>
        </div>
      </div>
    </section>
  );
}
