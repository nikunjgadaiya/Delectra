import { useState, useEffect } from 'react';

export default function TypewriterHeading({ startTyping = true }: { startTyping?: boolean }) {
  const line1 = "We build brands that ";
  const line2 = "print money.";
  
  const [text1, setText1] = useState('');
  const [text2, setText2] = useState('');
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    let current1 = 0;
    let current2 = 0;
    let timeout: ReturnType<typeof setTimeout>;
    
    // Blinking cursor effect
    const cursorInterval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 530);

    if (startTyping) {
      const type = () => {
        if (current1 < line1.length) {
          setText1(line1.slice(0, current1 + 1));
          current1++;
          timeout = setTimeout(type, 45); // Typing speed
        } else if (current2 < line2.length) {
          setText2(line2.slice(0, current2 + 1));
          current2++;
          timeout = setTimeout(type, 65); // Typing speed
        }
      };

      // Start typing after GSAP finishes its fade in (e.g. 500-600ms)
      timeout = setTimeout(type, 600);
    }

    return () => {
      clearTimeout(timeout);
      clearInterval(cursorInterval);
    };
  }, [startTyping]);

  return (
    <h1 className="hero-anim-item text-5xl sm:text-6xl md:text-8xl font-heading font-bold leading-[1.0] tracking-tighter inline-block text-center relative min-h-[2em]">
      <span>{text1}{text1.length < line1.length && <span className={`inline-block w-[0.1em] h-[0.9em] ml-1 bg-[#2bd96b] align-middle ${showCursor ? 'opacity-100' : 'opacity-0'}`} />}</span>
      {text1.length === line1.length && (
        <>
          <br />
          <span className="accent-serif">{text2}</span>
          <span className={`inline-block w-[0.1em] h-[0.9em] ml-2 bg-[#2bd96b] align-middle ${showCursor ? 'opacity-100' : 'opacity-0'}`} />
        </>
      )}
    </h1>
  );
}
