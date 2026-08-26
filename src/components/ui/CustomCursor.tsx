import React, { useEffect, useState, useRef } from 'react';

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  color: string;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
}

export const CustomCursor: React.FC = () => {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [trailingPos, setTrailingPos] = useState({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isInput, setIsInput] = useState(false);
  const [particles, setParticles] = useState<Particle[]>([]);

  const posRef = useRef({ x: -100, y: -100 });
  const trailingRef = useRef({ x: -100, y: -100 });
  const particleIdRef = useRef(0);
  const isTouchDevice = useRef(false);

  useEffect(() => {
    // Check if user is on a touch-only device
    if (window.matchMedia('(pointer: coarse)').matches) {
      isTouchDevice.current = true;
      return;
    }

    const handleMouseMove = (e: MouseEvent) => {
      posRef.current = { x: e.clientX, y: e.clientY };
      setPosition({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);

      // Spawn subtle ambient glowing particles on movement (throttled)
      if (Math.random() > 0.4) {
        const colors = ['#00f0ff', '#8b5cf6', '#38bdf8', '#c084fc', '#f59e0b'];
        const newParticle: Particle = {
          id: particleIdRef.current++,
          x: e.clientX + (Math.random() * 8 - 4),
          y: e.clientY + (Math.random() * 8 - 4),
          size: Math.random() * 3 + 1.5,
          color: colors[Math.floor(Math.random() * colors.length)],
          vx: (Math.random() - 0.5) * 1.2,
          vy: (Math.random() - 0.5) * 1.2 - 0.5,
          life: 1,
          maxLife: 24
        };
        setParticles(prev => [...prev.slice(-20), newParticle]);
      }

      // Check hover targets
      const target = e.target as HTMLElement | null;
      if (target) {
        const isClickable = Boolean(
          target.closest('button') ||
          target.closest('a') ||
          target.closest('.cursor-pointer') ||
          target.closest('label') ||
          target.closest('[role="button"]') ||
          target.tagName === 'BUTTON' ||
          target.tagName === 'A'
        );
        const isInputField = Boolean(
          target.closest('input') ||
          target.closest('textarea') ||
          target.tagName === 'INPUT' ||
          target.tagName === 'TEXTAREA'
        );

        setIsHovered(isClickable);
        setIsInput(isInputField);
      }
    };

    const handleMouseDown = () => setIsClicked(true);
    const handleMouseUp = () => setIsClicked(false);
    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    document.documentElement.addEventListener('mouseleave', handleMouseLeave);
    document.documentElement.addEventListener('mouseenter', handleMouseEnter);

    // Smooth physics loop for trailing ring and particles
    let animationFrameId: number;
    const animate = () => {
      // Lerp trailing ring towards mouse position (smooth lag)
      trailingRef.current.x += (posRef.current.x - trailingRef.current.x) * 0.22;
      trailingRef.current.y += (posRef.current.y - trailingRef.current.y) * 0.22;
      setTrailingPos({ x: trailingRef.current.x, y: trailingRef.current.y });

      // Update particle physics
      setParticles(prev =>
        prev
          .map(p => ({
            ...p,
            x: p.x + p.vx,
            y: p.y + p.vy,
            life: p.life + 1
          }))
          .filter(p => p.life < p.maxLife)
      );

      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.documentElement.removeEventListener('mouseleave', handleMouseLeave);
      document.documentElement.removeEventListener('mouseenter', handleMouseEnter);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isVisible]);

  if (isTouchDevice.current || !isVisible) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999] overflow-hidden transition-opacity duration-300">
      {/* Particle Sparkles Trail */}
      {particles.map(p => {
        const progress = p.life / p.maxLife;
        const opacity = 1 - progress;
        const scale = 1 - progress * 0.6;
        return (
          <div
            key={p.id}
            className="absolute rounded-full pointer-events-none"
            style={{
              left: `${p.x}px`,
              top: `${p.y}px`,
              width: `${p.size}px`,
              height: `${p.size}px`,
              backgroundColor: p.color,
              opacity: opacity * 0.8,
              transform: `translate(-50%, -50%) scale(${scale})`,
              boxShadow: `0 0 6px ${p.color}`,
              willChange: 'transform, opacity'
            }}
          />
        );
      })}

      {/* Smooth Trailing Glow Aura Ring */}
      <div
        className={`absolute rounded-full pointer-events-none transition-all duration-150 ease-out will-change-transform ${
          isInput
            ? 'w-1.5 h-7 rounded-sm bg-cyan-400/80 shadow-[0_0_12px_rgba(0,240,255,0.8)]'
            : isHovered
            ? 'w-12 h-12 -ml-6 -mt-6 border-2 border-cyan-400 bg-cyan-400/15 shadow-[0_0_20px_rgba(0,240,255,0.4),inset_0_0_10px_rgba(0,240,255,0.2)] scale-110'
            : isClicked
            ? 'w-7 h-7 -ml-3.5 -mt-3.5 border-2 border-purple-400 bg-purple-400/30 scale-90 shadow-[0_0_15px_rgba(168,85,247,0.6)]'
            : 'w-9 h-9 -ml-4.5 -mt-4.5 border border-cyan-400/60 bg-cyan-400/5 shadow-[0_0_10px_rgba(0,240,255,0.2)]'
        }`}
        style={{
          transform: `translate3d(${trailingPos.x}px, ${trailingPos.y}px, 0)`,
        }}
      />

      {/* Primary Center Dot Cursor (Zero Latency) */}
      {!isInput && (
        <div
          className={`absolute rounded-full pointer-events-none will-change-transform transition-transform duration-75 ${
            isHovered
              ? 'w-2 h-2 -ml-1 -mt-1 bg-white shadow-[0_0_8px_#ffffff]'
              : isClicked
              ? 'w-3 h-3 -ml-1.5 -mt-1.5 bg-cyan-300 shadow-[0_0_10px_#00f0ff]'
              : 'w-2 h-2 -ml-1 -mt-1 bg-cyan-400 shadow-[0_0_6px_#00f0ff]'
          }`}
          style={{
            transform: `translate3d(${position.x}px, ${position.y}px, 0)`,
          }}
        />
      )}
    </div>
  );
};
