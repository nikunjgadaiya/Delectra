import React, { useEffect, useRef } from 'react';

interface ServiceMarqueeProps {
  scrollVelocityRef: React.MutableRefObject<number>;
}

const serviceNames = [
  'Web Development',
  'UI/UX Design',
  'Branding',
  'Video Editing',
  'Image Editing',
  'Social Media',
];

export default function ServiceMarquee({ scrollVelocityRef }: ServiceMarqueeProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const offsetRef = useRef<number>(0);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    let animId: number;
    let lastTime = performance.now();
    let velocityMultiplier = 1;

    const animate = (now: number) => {
      const dt = Math.min((now - lastTime) / 1000, 0.1);
      lastTime = now;

      const rawVel = Math.abs(scrollVelocityRef.current || 0);
      const targetMultiplier = 1 + Math.min(rawVel * 0.1, 4.5);
      velocityMultiplier += (targetMultiplier - velocityMultiplier) * 0.1;

      // Base speed in pixels per second
      const speed = 65 * velocityMultiplier;
      offsetRef.current -= speed * dt;

      if (trackRef.current) {
        // Reset when half width is passed
        const singleWidth = trackRef.current.scrollWidth / 2;
        if (Math.abs(offsetRef.current) >= singleWidth) {
          offsetRef.current += singleWidth;
        }
        trackRef.current.style.transform = `translate3d(${offsetRef.current}px, 0, 0)`;
      }

      animId = requestAnimationFrame(animate);
    };

    animId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animId);
  }, [scrollVelocityRef]);

  // Duplicate items for continuous loop
  const repeatedServices = [...serviceNames, ...serviceNames, ...serviceNames, ...serviceNames];

  return (
    <div
      aria-hidden="true"
      className="relative w-full overflow-hidden border-y border-white/10 bg-white/[0.015] py-4 select-none pointer-events-none"
    >
      <div
        ref={trackRef}
        className="flex whitespace-nowrap will-change-transform items-center"
      >
        {repeatedServices.map((name, i) => (
          <div key={i} className="flex items-center gap-6 px-6">
            <span className="font-heading text-xs md:text-sm font-semibold uppercase tracking-[0.25em] text-[#ece8f5]/80">
              {name}
            </span>
            <span className="text-[#c9b2ff] text-[10px] opacity-60">✦</span>
          </div>
        ))}
      </div>
    </div>
  );
}
