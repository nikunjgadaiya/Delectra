import React, { useEffect, useRef, useState } from 'react';
import { LayoutGrid, MessageSquare, Terminal, Zap } from 'lucide-react';
import './DrriftaireProject.css';

interface DrriftaireProjectProps {
  onBack: () => void;
  onOpenContact?: () => void;
  onNavigate?: (sectionId: string) => void;
}

/* =========================================================================
   TEXT REVEAL HELPERS (Accessibility + Word/Letter Stagger)
========================================================================== */

/**
 * Splits text into individual words for the staggered reveal.
 * Preserves screen reader accessibility with aria-label on parent and aria-hidden on spans.
 */
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

/**
 * Splits text into individual letters for the h1 staggered reveal.
 * 70ms per letter stagger capped at 1200ms.
 */
function RevealLetters({
  text,
  startIndex = 0,
}: {
  text: string;
  startIndex?: number;
}) {
  const letters = text.split('');

  return (
    <span className="reveal-letters" aria-hidden="true">
      {letters.map((char, i) => (
        <span
          key={i}
          className="reveal-letter"
          style={{
            transitionDelay: `${Math.min((startIndex + i) * 70, 1200)}ms`,
          }}
        >
          {char === ' ' ? '\u00A0' : char}
        </span>
      ))}
    </span>
  );
}

/* =========================================================================
   BROWSER-STYLE IMAGE FRAME COMPONENT
   Empty placeholder with dashed border, 34px outlined lavender icon, and hint.
   Supports dropping an <img> inside to seamlessly replace the dashed state.
========================================================================== */

interface BrowserFrameProps {
  title: string;
  hint: string;
  aspectRatio?: '16/10' | '4/3';
  children?: React.ReactNode;
}

function BrowserFrame({
  title,
  hint,
  aspectRatio = '16/10',
  children,
}: BrowserFrameProps) {
  return (
    <div className="browser-frame">
      {/* Top bar: 3 circles in --line color + 13px muted title */}
      <div className="frame-top-bar">
        <div className="frame-circles" aria-hidden="true">
          <span className="frame-circle" />
          <span className="frame-circle" />
          <span className="frame-circle" />
        </div>
        <span className="frame-title">{title}</span>
      </div>

      {/* Placeholder area: 14px margin, 1.5px dashed border, 8px radius */}
      <div
        className={`frame-placeholder ${
          aspectRatio === '4/3' ? 'aspect-4-3' : 'aspect-16-10'
        }`}
      >
        {children ? (
          children
        ) : (
          <div className="placeholder-inner">
            {/* 34px outlined image icon in --lav */}
            <svg
              className="placeholder-icon"
              width="34"
              height="34"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
              <circle cx="9" cy="9" r="2" />
              <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
            </svg>
            <span className="placeholder-text">Add screenshot</span>
            <span className="placeholder-hint">{hint}</span>
          </div>
        )}
      </div>
    </div>
  );
}

/* =========================================================================
   FEATURE LIST COMPONENT
   Vertical list with 22px gap, 24px left padding, 1px --line border, 7px purple dot.
========================================================================== */

interface FeatureItemData {
  title: string;
  description: string;
}

function FeatureList({ items }: { items: FeatureItemData[] }) {
  return (
    <ul className="feature-list">
      {items.map((item, index) => {
        const titleWordCount = item.title.split(' ').filter(Boolean).length;
        return (
          <li key={index} className="feature-item reveal-target">
            <span className="feature-dot" aria-hidden="true" />
            <h3 className="feature-title" aria-label={item.title}>
              <RevealWords text={item.title} startIndex={0} />
            </h3>
            <p className="feature-desc" aria-label={item.description}>
              <RevealWords
                text={item.description}
                startIndex={titleWordCount}
              />
            </p>
          </li>
        );
      })}
    </ul>
  );
}

/* =========================================================================
   MAIN COMPONENT: DrriftaireProject
========================================================================== */

export default function DrriftaireProject({
  onBack,
  onOpenContact,
  onNavigate,
}: DrriftaireProjectProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [motionReady, setMotionReady] = useState(false);

  // Keyboard navigation: Escape key closes project page
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onBack();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onBack]);

  // Motion setup: only enable hidden initial state when JS is running and reduced-motion is off
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    if (prefersReducedMotion) {
      // Without motion, leave elements in default visible state
      return;
    }

    setMotionReady(true);

    const container = containerRef.current;
    if (!container) return;

    // Observe all .reveal-target elements when 20% enters viewport
    const targets = container.querySelectorAll('.reveal-target');

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
        root: container,
        threshold: 0.2,
      }
    );

    // Initial check: immediately reveal elements already visible above the fold
    targets.forEach((target) => {
      const rect = target.getBoundingClientRect();
      if (rect.top < window.innerHeight * 0.85 && rect.bottom > 0) {
        target.classList.add('is-revealed');
      } else {
        observer.observe(target);
      }
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  // Ensure native mouse-wheel scrolling is never intercepted or cancelled by outer Lenis
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    container.scrollTop = 0;

    const handleWheel = (e: WheelEvent) => {
      // Stop propagation so global/window listeners (like stopped Lenis) cannot intercept or prevent wheel events
      e.stopPropagation();
    };

    container.addEventListener('wheel', handleWheel, { passive: true });
    return () => {
      container.removeEventListener('wheel', handleWheel);
    };
  }, []);

  const handleNavClick = (sectionId: string) => {
    if (onNavigate) {
      onNavigate(sectionId);
    } else {
      onBack();
    }
  };

  return (
    <div
      ref={containerRef}
      data-lenis-prevent
      className={`drriftaire-page ${motionReady ? 'motion-ready' : ''}`}
    >
      <div className="drriftaire-container">
        {/* 1. "Back to all work" text link at top left */}
        <div className="back-link-wrapper">
          <button
            type="button"
            onClick={onBack}
            className="back-link"
            aria-label="Back to all work"
          >
            Back to all work
          </button>
        </div>

        {/* 2. Hero, centred */}
        <header className="hero-section">
          {/* h1: Outfit 700, clamp(60px, 14vw, 200px), line-height .95, letter-spacing -0.05em */}
          <h1 className="hero-h1 reveal-target" aria-label="Drriftaire">
            <RevealLetters text="Drriftaire" startIndex={0} />
          </h1>

          {/* Hero subline: Playfair italic, clamp(30px, 5.4vw, 68px), colour --lav */}
          <p
            className="hero-subline reveal-target"
            aria-label="farm spraying, booked online."
          >
            <RevealWords text="farm spraying, booked online." startIndex={0} />
          </p>

          {/* Lede: muted, max 34em, centred */}
          <p
            className="hero-lede reveal-target"
            aria-label="A website, booking page and admin panel for an agri drone company that sprays fertilizer on farms across India."
          >
            <RevealWords
              text="A website, booking page and admin panel for an agri drone company that sprays fertilizer on farms across India."
              startIndex={0}
            />
          </p>

          {/* 4-column details row with 1px --line top border, 72px above, 28px padding-top */}
          <dl className="hero-details">
            <div className="detail-item">
              <dt className="detail-label">Client</dt>
              <dd className="detail-value">Drriftaire</dd>
            </div>
            <div className="detail-item">
              <dt className="detail-label">Industry</dt>
              <dd className="detail-value">Agri drone spraying</dd>
            </div>
            <div className="detail-item">
              <dt className="detail-label">Services</dt>
              <dd className="detail-value">
                Website, booking system, admin panel, email notifications
              </dd>
            </div>
            <div className="detail-item">
              <dt className="detail-label">Where</dt>
              <dd className="detail-value">Farms across India</dd>
            </div>
          </dl>
        </header>

        {/* 3. Four Showcase Rows */}

        {/* =========================================================================
            ROW 1: Frame on Left (1.3fr), Text on Right (1fr)
            Frame title "Home page", hint "Home page, 16:10"
        ========================================================================== */}
        <section className="showcase-row">
          <div className="frame-side">
            <figure style={{ margin: 0 }}>
              {/* PLACEHOLDER 1: Home page (16:10)
                  To drop your screenshot, insert: <img src="/your-image.png" alt="Home page" /> inside */}
              <BrowserFrame
                title="Home page"
                hint="Home page, 16:10"
                aspectRatio="16/10"
              />
            </figure>
          </div>

          <div className="text-side">
            <h2
              className="section-h2 reveal-target"
              aria-label="A proper online presence for the business."
            >
              <RevealWords text="A proper online presence" startIndex={0} />{' '}
              <em className="h2-em">
                <RevealWords text="for the business." startIndex={4} />
              </em>
            </h2>

            <FeatureList
              items={[
                {
                  title: 'Tells the story',
                  description:
                    'Explains what Drriftaire does and why drone spraying works for farmers.',
                },
                {
                  title: 'Services up front',
                  description:
                    'Shows what they offer and where they operate across India.',
                },
                {
                  title: 'One clear next step',
                  description:
                    'Every page leads a visitor towards booking a spray.',
                },
              ]}
            />
          </div>
        </section>

        {/* =========================================================================
            ROW 2 (reversed): Text on Left (1fr), Frame on Right (1.3fr)
            Below 900px: frame first
            Frame title "Booking page", hint "Booking page, 16:10"
        ========================================================================== */}
        <section className="showcase-row reversed">
          <div className="text-side">
            <h2
              className="section-h2 reveal-target"
              aria-label="Farmers book a spray in minutes."
            >
              <RevealWords text="Farmers book a spray" startIndex={0} />{' '}
              <em className="h2-em">
                <RevealWords text="in minutes." startIndex={4} />
              </em>
            </h2>

            <FeatureList
              items={[
                {
                  title: 'Open to anyone',
                  description:
                    'No account needed. A farmer fills in the form and sends the booking.',
                },
                {
                  title: 'Confirmation by email',
                  description:
                    'The farmer gets an email as soon as the booking is made.',
                },
                {
                  title: 'Straight to the team',
                  description:
                    'Each booking lands in the admin panel the moment it is submitted.',
                },
              ]}
            />
          </div>

          <div className="frame-side">
            <figure style={{ margin: 0 }}>
              {/* PLACEHOLDER 2: Booking page (16:10)
                  To drop your screenshot, insert: <img src="/your-image.png" alt="Booking page" /> inside */}
              <BrowserFrame
                title="Booking page"
                hint="Booking page, 16:10"
                aspectRatio="16/10"
              />
            </figure>
          </div>
        </section>

        {/* =========================================================================
            ROW 3: Frame on Left (1.3fr), Text on Right (1fr)
            Image side: One large frame + 2-column grid of two smaller 4:3 frames
        ========================================================================== */}
        <section className="showcase-row">
          <div className="frame-side">
            <figure style={{ margin: 0 }}>
              {/* PLACEHOLDER 3 (Large): Admin panel, all bookings (16:10)
                  To drop your screenshot, insert: <img src="/your-image.png" alt="Admin panel, all bookings" /> inside */}
              <BrowserFrame
                title="Admin panel, all bookings"
                hint="Bookings table, 16:10"
                aspectRatio="16/10"
              />

              {/* 2-column grid of two smaller frames (4:3 placeholders) */}
              <div className="sub-frames-grid">
                {/* PLACEHOLDER 4: Filters (4:3)
                    To drop your screenshot, insert: <img src="/your-image.png" alt="Filters" /> inside */}
                <BrowserFrame
                  title="Filters"
                  hint="Filters, 4:3"
                  aspectRatio="4/3"
                />

                {/* PLACEHOLDER 5: Remarks and sales (4:3)
                    To drop your screenshot, insert: <img src="/your-image.png" alt="Remarks and sales" /> inside */}
                <BrowserFrame
                  title="Remarks and sales"
                  hint="Remarks and sales, 4:3"
                  aspectRatio="4/3"
                />
              </div>
            </figure>
          </div>

          <div className="text-side">
            <h2
              className="section-h2 reveal-target"
              aria-label="An admin panel to run every booking."
            >
              <RevealWords text="An admin panel" startIndex={0} />{' '}
              <em className="h2-em">
                <RevealWords text="to run every booking." startIndex={3} />
              </em>
            </h2>

            <FeatureList
              items={[
                {
                  title: 'Accept or reject',
                  description:
                    'The team decides on each booking, and the farmer is told either way.',
                },
                {
                  title: 'Filter to find anything',
                  description:
                    'By date, pending, completed or sale status.',
                },
                {
                  title: 'Remarks on every job',
                  description:
                    'Notes stay attached to the booking so the work can be tracked.',
                },
                {
                  title: 'Sale amounts',
                  description:
                    'Enter what each job sold for and keep revenue in one place.',
                },
                {
                  title: 'Download your data',
                  description:
                    'Export all bookings as an XLSX or CSV file.',
                },
              ]}
            />
          </div>
        </section>

        {/* =========================================================================
            ROW 4 (reversed): Text on Left (1fr), Frame on Right (1.3fr)
            Below 900px: frame first
            Frame title "Email", hint "Confirmation email, 16:10"
        ========================================================================== */}
        <section className="showcase-row reversed">
          <div className="text-side">
            <h2
              className="section-h2 reveal-target"
              aria-label="An email at every step, sent automatically."
            >
              <RevealWords text="An email at every step," startIndex={0} />{' '}
              <em className="h2-em">
                <RevealWords text="sent automatically." startIndex={5} />
              </em>
            </h2>

            <FeatureList
              items={[
                {
                  title: 'Booking received',
                  description:
                    'Sent to the farmer right after they book.',
                },
                {
                  title: 'Booking accepted',
                  description:
                    'Lets the farmer know the team will do the work.',
                },
                {
                  title: 'Booking rejected',
                  description:
                    'Tells the farmer clearly, so nobody is left waiting.',
                },
                {
                  title: 'Work completed',
                  description:
                    'Closes the loop once the spraying is done.',
                },
              ]}
            />
          </div>

          <div className="frame-side">
            <figure style={{ margin: 0 }}>
              {/* PLACEHOLDER 6: Email (16:10)
                  To drop your screenshot, insert: <img src="/your-image.png" alt="Email" /> inside */}
              <BrowserFrame
                title="Email"
                hint="Confirmation email, 16:10"
                aspectRatio="16/10"
              />
            </figure>
          </div>
        </section>

        {/* 4. Closing Call to Action, centred, with a --line top border */}
        <section className="cta-section">
          <h2
            className="cta-h2 reveal-target"
            aria-label="Need a booking system like this?"
          >
            <RevealWords text="Need a booking system" startIndex={0} />{' '}
            <em className="h2-em">
              <RevealWords text="like this?" startIndex={4} />
            </em>
          </h2>

          <div className="cta-btn-wrapper">
            <button
              type="button"
              onClick={() => {
                if (onOpenContact) {
                  onOpenContact();
                } else {
                  handleNavClick('connect');
                }
              }}
              className="connect-pill-btn"
            >
              <span>Let's Connect</span>
              <div className="bolt-circle" aria-hidden="true">
                <Zap className="bolt-icon" />
              </div>
            </button>
          </div>
        </section>

        {/* 5. Small footer: "Delectra" on left, "Replace the dashed cards with your screenshots" on right */}
        <footer className="drriftaire-footer">
          <div className="footer-inner">
            <span className="footer-brand">Delectra</span>
            <span className="footer-note">
              Replace the dashed cards with your screenshots
            </span>
          </div>
        </footer>
      </div>

      {/* =========================================================================
          FLOATING BOTTOM PILL NAV
          Matches live site look, fixed 18px from bottom + safe-area inset.
          Portfolio is active (green).
          Below 560px: drops the green button and tightens padding.
      ========================================================================== */}
      <nav className="floating-pill-nav" aria-label="Bottom Navigation">
        <div className="nav-links-group">
          {/* Home */}
          <button
            type="button"
            onClick={() => handleNavClick('home')}
            className="nav-pill-item"
          >
            <Zap className="nav-item-icon" aria-hidden="true" />
            <span className="nav-item-label">Home</span>
          </button>

          {/* Portfolio (Active item: Green) */}
          <button
            type="button"
            onClick={() => {
              containerRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="nav-pill-item active"
            aria-current="page"
          >
            <LayoutGrid className="nav-item-icon" aria-hidden="true" />
            <span className="nav-item-label">Portfolio</span>
          </button>

          {/* Services */}
          <button
            type="button"
            onClick={() => handleNavClick('services')}
            className="nav-pill-item"
          >
            <Terminal className="nav-item-icon" aria-hidden="true" />
            <span className="nav-item-label">Services</span>
          </button>

          {/* Testimonials */}
          <button
            type="button"
            onClick={() => handleNavClick('results')}
            className="nav-pill-item"
          >
            <MessageSquare className="nav-item-icon" aria-hidden="true" />
            <span className="nav-item-label">Testimonials</span>
          </button>
        </div>

        {/* Divider */}
        <div className="nav-divider" aria-hidden="true" />

        {/* Let's Connect Pill Button in Nav */}
        <button
          type="button"
          onClick={() => {
            if (onOpenContact) {
              onOpenContact();
            } else {
              handleNavClick('connect');
            }
          }}
          className="nav-connect-btn"
        >
          <span>Let's Connect</span>
          <div className="nav-bolt-circle" aria-hidden="true">
            <Zap className="nav-bolt-icon" />
          </div>
        </button>

        {/* WhatsApp Button */}
        <a
          href="https://wa.me/917980228396?text=Hey%20Nikunj%2C%20I%20wanna%20have%20a%20quick%20chat%20about%20your%20services%20got%20a%20minute%3F"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat on WhatsApp"
          className="nav-whatsapp-link"
        >
          <svg
            className="nav-whatsapp-icon"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.72.94 3.659 1.437 5.63 1.438h.004c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
          </svg>
        </a>
      </nav>
    </div>
  );
}
