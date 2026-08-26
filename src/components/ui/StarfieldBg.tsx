import React, { useEffect, useRef } from 'react';

export const StarfieldBg: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    // Create lightweight star particles
    const starCount = 140;
    const stars = Array.from({ length: starCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 1.5 + 0.5,
      alpha: Math.random(),
      speed: Math.random() * 0.25 + 0.05,
      delta: (Math.random() * 0.02 + 0.005) * (Math.random() < 0.5 ? 1 : -1),
    }));

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < starCount; i++) {
        const star = stars[i];

        // Gentle floating movement upwards
        star.y -= star.speed;
        if (star.y < 0) {
          star.y = height;
          star.x = Math.random() * width;
        }

        // Twinkle opacity oscillation
        star.alpha += star.delta;
        if (star.alpha > 1 || star.alpha < 0.2) {
          star.delta = -star.delta;
        }

        ctx.fillStyle = `rgba(255, 255, 255, ${Math.max(0.1, Math.min(1, star.alpha))})`;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none bg-[radial-gradient(ellipse_at_bottom,_#1f132b_0%,_#06070a_100%)]">
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full block will-change-transform" />
    </div>
  );
};
