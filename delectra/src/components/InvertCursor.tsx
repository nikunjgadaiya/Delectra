import React from 'react';

const InvertCursor: React.FC = () => {
  const cursorRef = React.useRef<HTMLDivElement>(null);
  const mousePos = React.useRef({ x: 0, y: 0 });
  const currentPos = React.useRef({ x: 0, y: 0 });
  const currentScale = React.useRef(1);
  const isHoveringRef = React.useRef(false);
  const [isVisible, setIsVisible] = React.useState(false);

  React.useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;

    let animationFrameId: number;

    const onMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
      if (!isVisible) setIsVisible(true);
    };

    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target && typeof target.closest === 'function') {
        isHoveringRef.current = !!target.closest('a, button, input, textarea, select, [role="button"], .cursor-pointer');
      }
    };

    const onMouseLeave = () => setIsVisible(false);
    const onMouseEnter = () => setIsVisible(true);

    const updatePosition = () => {
      // Fast tracking speed
      currentPos.current.x += (mousePos.current.x - currentPos.current.x) * 0.6;
      currentPos.current.y += (mousePos.current.y - currentPos.current.y) * 0.6;

      // Smooth scale interpolation for hover effect
      const targetScale = isHoveringRef.current ? 1.3 : 1;
      currentScale.current += (targetScale - currentScale.current) * 0.15;

      if (cursor) {
        cursor.style.transform = `translate3d(${currentPos.current.x}px, ${currentPos.current.y}px, 0) scale(${currentScale.current})`;
        cursor.style.opacity = isVisible ? '1' : '0';
      }
      animationFrameId = requestAnimationFrame(updatePosition);
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseover', onMouseOver);
    window.addEventListener('mouseleave', onMouseLeave);
    window.addEventListener('mouseenter', onMouseEnter);
    animationFrameId = requestAnimationFrame(updatePosition);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseover', onMouseOver);
      window.removeEventListener('mouseleave', onMouseLeave);
      window.removeEventListener('mouseenter', onMouseEnter);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isVisible]);

  return (
    <div
      ref={cursorRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: 24,
        height: 24,
        marginLeft: -12,
        marginTop: -12,
        borderRadius: '50%',
        backgroundColor: 'white',
        mixBlendMode: 'difference',
        pointerEvents: 'none',
        zIndex: 99999,
        willChange: 'transform, opacity',
        transition: 'opacity 0.3s ease',
        backfaceVisibility: 'hidden',
        transformStyle: 'preserve-3d',
      }}
    />
  );
};

export default InvertCursor;
