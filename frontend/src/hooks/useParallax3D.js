// useParallax3D.js
import { useEffect, useRef } from 'react';

export const useParallax3D = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleMouseMove = (e) => {
      const rect = container.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5; // -0.5 to 0.5
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      const rotateY = x * 20; // max ±10deg
      const rotateX = y * -15; // max ±7.5deg
      container.style.transform = `perspective(1200px) rotateY(${rotateY}deg) rotateX(${rotateX}deg)`;
    };

    const handleMouseLeave = () => {
      container.style.transform = 'perspective(1200px) rotateY(0deg) rotateX(0deg)';
    };

    container.addEventListener('mousemove', handleMouseMove);
    container.addEventListener('mouseleave', handleMouseLeave);
    return () => {
      container.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return containerRef;
};