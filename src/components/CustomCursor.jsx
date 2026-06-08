import React, { useEffect, useRef } from 'react';

export default function CustomCursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);

  useEffect(() => {
    // Hide default cursor and custom cursor on touch devices
    if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
      document.body.style.cursor = 'auto';
      return;
    }

    document.body.style.cursor = 'none';

    const mouse = { x: 0, y: 0 };
    const ring = { x: 0, y: 0 };

    const onMouseMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;

      if (dotRef.current) {
        dotRef.current.style.left = `${mouse.x}px`;
        dotRef.current.style.top = `${mouse.y}px`;
      }
    };

    window.addEventListener('mousemove', onMouseMove);

    // Apply Lerp to make the outer ring drag behind the inner dot smoothly
    let animationId;
    const lerp = (start, end, amt) => (1 - amt) * start + amt * end;

    const tick = () => {
      ring.x = lerp(ring.x, mouse.x, 0.15);
      ring.y = lerp(ring.y, mouse.y, 0.15);

      if (ringRef.current) {
        ringRef.current.style.left = `${ring.x}px`;
        ringRef.current.style.top = `${ring.y}px`;
      }

      animationId = requestAnimationFrame(tick);
    };
    tick();

    // Hover listeners to resize cursor
    const handleMouseOver = (e) => {
      const target = e.target;
      if (
        target.tagName === 'A' || 
        target.tagName === 'BUTTON' || 
        target.closest('a') || 
        target.closest('button') || 
        target.classList.contains('clickable') ||
        target.closest('.clickable')
      ) {
        document.body.classList.add('cursor-hover');
      } else {
        document.body.classList.remove('cursor-hover');
      }
    };

    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
      cancelAnimationFrame(animationId);
      document.body.style.cursor = 'auto';
      document.body.classList.remove('cursor-hover');
    };
  }, []);

  // Return custom cursor dots (hidden on mobile via tailwind md:block/hidden)
  return (
    <>
      <div 
        ref={dotRef} 
        className="custom-cursor-dot pointer-events-none fixed top-0 left-0 hidden md:block" 
      />
      <div 
        ref={ringRef} 
        className="custom-cursor-ring pointer-events-none fixed top-0 left-0 hidden md:block" 
      />
    </>
  );
}
