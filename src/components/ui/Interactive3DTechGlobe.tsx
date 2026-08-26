import React, { useEffect, useRef } from 'react';

interface TechPoint {
  x: number;
  y: number;
  z: number;
  label?: string;
  color: string;
  size: number;
}

export const Interactive3DTechGlobe: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || 400);
    let height = (canvas.height = canvas.parentElement?.clientHeight || 380);

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };

    window.addEventListener('resize', handleResize);

    // Generate 3D Holographic Sphere Vertices & Floating Stack Badges
    const radius = Math.min(width, height) * 0.32;
    const nodeCount = 80;
    const points: TechPoint[] = [];

    const techLabels = ['React.js', 'Node.js', 'TypeScript', 'MongoDB', 'Redis', 'MERN Stack', 'React Native', 'FCM Alerts', 'CRM Engine', 'EMR System'];
    const colors = ['#00f0ff', '#3b82f6', '#10b981', '#a855f7', '#ec4899', '#f59e0b'];

    for (let i = 0; i < nodeCount; i++) {
      const phi = Math.acos(-1 + (2 * i) / nodeCount);
      const theta = Math.sqrt(nodeCount * Math.PI) * phi;
      const x = radius * Math.cos(theta) * Math.sin(phi);
      const y = radius * Math.sin(theta) * Math.sin(phi);
      const z = radius * Math.cos(phi);

      points.push({
        x,
        y,
        z,
        label: i < techLabels.length ? techLabels[i] : undefined,
        color: colors[i % colors.length],
        size: i < techLabels.length ? 3.5 : Math.random() * 2 + 1,
      });
    }

    // 3D Rotation State
    let angleX = 0.003;
    let angleY = 0.005;
    let targetAngleX = 0.003;
    let targetAngleY = 0.005;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      targetAngleX = (e.clientY - cy) * 0.00008;
      targetAngleY = (e.clientX - cx) * 0.00008;
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Main 3D Render Loop
    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Smooth inertia rotation interpolation
      angleX += (targetAngleX - angleX) * 0.05;
      angleY += (targetAngleY - angleY) * 0.05;

      const cosX = Math.cos(angleX);
      const sinX = Math.sin(angleX);
      const cosY = Math.cos(angleY);
      const sinY = Math.sin(angleY);

      const fov = 450;
      const cx = width / 2;
      const cy = height / 2;

      // Transform & Sort points by depth (Z-buffer sort)
      const projected = points.map((p) => {
        // Rotate Y
        let x1 = p.x * cosY - p.z * sinY;
        let z1 = p.z * cosY + p.x * sinY;

        // Rotate X
        let y1 = p.y * cosX - z1 * sinX;
        let z2 = z1 * cosX + p.y * sinX;

        // Save rotated coordinates back
        p.x = x1;
        p.y = y1;
        p.z = z2;

        // Perspective Projection
        const scale = fov / (fov + z2);
        const px = cx + x1 * scale;
        const py = cy + y1 * scale;
        const alpha = Math.max(0.1, (z2 + radius) / (2 * radius));

        return { p, px, py, scale, alpha, z: z2 };
      });

      // Sort by Z for proper 3D depth rendering
      projected.sort((a, b) => a.z - b.z);

      // Draw 3D Connecting Wireframe Lines
      ctx.lineWidth = 0.6;
      for (let i = 0; i < projected.length; i++) {
        for (let j = i + 1; j < projected.length; j++) {
          const p1 = projected[i];
          const p2 = projected[j];
          const dx = p1.px - p2.px;
          const dy = p1.py - p2.py;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 70) {
            const lineAlpha = (1 - dist / 70) * p1.alpha * 0.35;
            ctx.strokeStyle = `rgba(0, 240, 255, ${lineAlpha})`;
            ctx.beginPath();
            ctx.moveTo(p1.px, p1.py);
            ctx.lineTo(p2.px, p2.py);
            ctx.stroke();
          }
        }
      }

      // Draw 3D Glowing Nodes & Tech Badges
      projected.forEach(({ p, px, py, scale, alpha }) => {
        // Node Glow
        ctx.fillStyle = p.color;
        ctx.globalAlpha = alpha;
        ctx.beginPath();
        ctx.arc(px, py, p.size * scale, 0, Math.PI * 2);
        ctx.fill();

        // Text Badge Label if present
        if (p.label) {
          ctx.font = `600 ${Math.max(9, Math.round(11 * scale))}px 'JetBrains Mono', monospace`;
          ctx.fillStyle = p.color;
          ctx.fillText(p.label, px + 8 * scale, py + 4 * scale);
        }
      });

      ctx.globalAlpha = 1;
      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <div className="relative w-full h-[360px] sm:h-[400px] flex items-center justify-center overflow-hidden rounded-2xl bg-zinc-950/80 border border-zinc-800/80 shadow-2xl">
      {/* Background Ambient Radial Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(59,130,246,0.15)_0%,_transparent_70%)] pointer-events-none" />

      {/* 3D Canvas */}
      <canvas ref={canvasRef} className="w-full h-full block cursor-grab active:cursor-grabbing z-10" />

      {/* Floating 3D Interactive Controls Badge */}
      <div className="absolute top-4 left-4 z-20 px-3 py-1.5 rounded-lg bg-zinc-900/90 border border-cyan-500/30 text-[11px] font-mono text-cyan-300 backdrop-blur-md shadow-lg flex items-center gap-2 pointer-events-none">
        <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
        <span className="font-bold">3D HOLOGRAM MATRIX • 120 FPS</span>
      </div>

      <div className="absolute bottom-4 right-4 z-20 px-3 py-1 rounded-lg bg-zinc-900/90 border border-purple-500/30 text-[11px] font-mono text-purple-300 backdrop-blur-md shadow-lg flex items-center gap-1.5 pointer-events-none">
        <span>🖱️ ROTATE 3D HOLOGRAM SPHERE</span>
      </div>
    </div>
  );
};
