import React from 'react';

const InvertCursor: React.FC = () => {
  const cursorRef = React.useRef<HTMLDivElement>(null);
  const mousePos = React.useRef({ x: 0, y: 0 });
  const currentPos = React.useRef({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = React.useState(false);

  React.useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;

    let animationFrameId: number;

    const onMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
      if (!isVisible) setIsVisible(true);
    };

    const onMouseLeave = () => setIsVisible(false);
    const onMouseEnter = () => setIsVisible(true);

    const updatePosition = () => {
      // Smooth lerp: current + (target - current) * factor
      // Factor of 0.15 provides a premium, smooth follow effect
      currentPos.current.x += (mousePos.current.x - currentPos.current.x) * 0.15;
      currentPos.current.y += (mousePos.current.y - currentPos.current.y) * 0.15;

      if (cursor) {
        cursor.style.transform = `translate3d(${currentPos.current.x}px, ${currentPos.current.y}px, 0)`;
        cursor.style.opacity = isVisible ? '1' : '0';
      }
      animationFrameId = requestAnimationFrame(updatePosition);
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseleave', onMouseLeave);
    window.addEventListener('mouseenter', onMouseEnter);
    animationFrameId = requestAnimationFrame(updatePosition);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
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
        width: 40,
        height: 40,
        marginLeft: -20,
        marginTop: -20,
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
