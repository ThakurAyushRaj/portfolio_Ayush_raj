import React, { useState, useRef } from 'react';
import { motion, useSpring, useTransform } from 'framer-motion';
import { CheckCircle2, Copy, Zap, Terminal, Activity, Code2, Layers, Cpu, Server, Globe } from 'lucide-react';

export const Hero3DGlassParallax: React.FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [copied, setCopied] = useState(false);
  const [glarePos, setGlarePos] = useState({ x: 50, y: 50, opacity: 0 });

  // Spring physics for smooth 3D tilt tracking
  const mouseX = useSpring(0, { stiffness: 150, damping: 15 });
  const mouseY = useSpring(0, { stiffness: 150, damping: 15 });

  const rotateX = useTransform(mouseY, [-0.5, 0.5], [15, -15]);
  const rotateY = useTransform(mouseX, [-0.5, 0.5], [-15, 15]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    const x = (e.clientX - rect.left) / width - 0.5;
    const y = (e.clientY - rect.top) / height - 0.5;

    mouseX.set(x);
    mouseY.set(y);

    setGlarePos({
      x: ((e.clientX - rect.left) / width) * 100,
      y: ((e.clientY - rect.top) / height) * 100,
      opacity: 0.2,
    });
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
    setGlarePos((prev) => ({ ...prev, opacity: 0 }));
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(
      `const developer = {\n  name: 'Ayush Raj',\n  role: 'Software Development Engineer',\n  stack: ['React', 'Node.js', 'TypeScript', 'MERN', 'React Native'],\n  focus: 'CRM & EMR Enterprise Systems'\n};`
    );
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-full py-4 flex items-center justify-center [perspective:1200px] select-none"
    >
      <motion.div
        style={{
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
        }}
        className="relative w-full max-w-lg rounded-3xl bg-gradient-to-br from-zinc-900/90 via-zinc-950/95 to-black/90 border border-zinc-700/60 p-6 sm:p-8 shadow-[0_20px_60px_rgba(0,0,0,0.8),0_0_40px_rgba(59,130,246,0.12)] backdrop-blur-xl transition-shadow duration-300"
      >
        {/* Dynamic Specular Light Glare Layer */}
        <div
          className="absolute inset-0 rounded-3xl pointer-events-none transition-opacity duration-300 z-50"
          style={{
            background: `radial-gradient(circle at ${glarePos.x}% ${glarePos.y}%, rgba(255, 255, 255, ${glarePos.opacity}), transparent 60%)`,
          }}
        />

        {/* --------------------------------------------------------------- */}
        {/* LAYER 1: 3D Floating Top Badge (translateZ: 90px) */}
        {/* --------------------------------------------------------------- */}
        <div
          className="absolute -top-6 -right-2 z-40 hidden sm:flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-zinc-900/95 border border-cyan-500/40 text-xs font-mono text-cyan-300 shadow-[0_10px_30px_rgba(0,240,255,0.2)] backdrop-blur-md"
          style={{ transform: 'translateZ(90px)' }}
        >
          <Zap className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
          <span className="font-bold">10k+ Enterprise Users</span>
        </div>

        {/* --------------------------------------------------------------- */}
        {/* LAYER 2: Floating Tech Badges (translateZ: 110px) */}
        {/* --------------------------------------------------------------- */}
        <div
          className="absolute -bottom-5 -left-4 z-40 hidden sm:flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-zinc-900/95 border border-emerald-500/40 text-xs font-mono text-emerald-300 shadow-[0_10px_30px_rgba(16,185,129,0.2)] backdrop-blur-md"
          style={{ transform: 'translateZ(110px)' }}
        >
          <Activity className="w-3.5 h-3.5 text-emerald-400 animate-spin" style={{ animationDuration: '6s' }} />
          <span className="font-bold">14ms Latency • 99.9% Uptime</span>
        </div>

        {/* --------------------------------------------------------------- */}
        {/* LAYER 3: Interactive Code Studio Window (translateZ: 40px) */}
        {/* --------------------------------------------------------------- */}
        <div
          className="relative rounded-2xl overflow-hidden bg-zinc-950/95 border border-zinc-800 shadow-2xl space-y-0"
          style={{ transform: 'translateZ(40px)' }}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 bg-zinc-950 border-b border-zinc-800 text-xs font-mono text-zinc-400">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-red-500/80 inline-block" />
              <span className="w-3 h-3 rounded-full bg-yellow-500/80 inline-block" />
              <span className="w-3 h-3 rounded-full bg-green-500/80 inline-block" />
              <span className="ml-2 text-zinc-300 font-semibold flex items-center gap-1.5">
                <Code2 className="w-3.5 h-3.5 text-cyan-400" />
                <span>ayush_raj.ts</span>
              </span>
            </div>

            <button
              onClick={handleCopyCode}
              className="flex items-center gap-1 text-[11px] text-zinc-400 hover:text-white px-2.5 py-1 rounded bg-zinc-900 border border-zinc-800 transition-colors"
            >
              {copied ? <CheckCircle2 className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
              <span>{copied ? 'Copied' : 'Copy'}</span>
            </button>
          </div>

          {/* Code Content */}
          <div className="p-5 font-mono text-xs text-zinc-300 leading-relaxed space-y-3">
            <div>
              <span className="text-purple-400">const</span> <span className="text-blue-300">developer</span> = &#123;
            </div>
            <div className="pl-4">
              name: <span className="text-emerald-300">'Ayush Raj'</span>,
            </div>
            <div className="pl-4">
              role: <span className="text-emerald-300">'SDE / Full Stack Engineer'</span>,
            </div>
            <div className="pl-4">
              domains: [<span className="text-cyan-300">'CRM'</span>, <span className="text-cyan-300">'EMR'</span>, <span className="text-cyan-300">'MERN'</span>, <span className="text-cyan-300">'React Native'</span>],
            </div>
            <div className="pl-4">
              status: <span className="text-amber-300">'Ready for Impact'</span>
            </div>
            <div>&#125;;</div>

            {/* Architecture Node Row */}
            <div className="pt-3 border-t border-zinc-800/80 grid grid-cols-2 gap-2">
              <div className="p-2 rounded-lg bg-zinc-900/90 border border-cyan-500/20 text-[10px] space-y-0.5">
                <div className="text-zinc-400 flex items-center gap-1">
                  <Globe className="w-3 h-3 text-cyan-400" />
                  <span>Frontend</span>
                </div>
                <div className="font-semibold text-cyan-300">React • TS • Vite</div>
              </div>
              <div className="p-2 rounded-lg bg-zinc-900/90 border border-emerald-500/20 text-[10px] space-y-0.5">
                <div className="text-zinc-400 flex items-center gap-1">
                  <Server className="w-3 h-3 text-emerald-400" />
                  <span>Backend</span>
                </div>
                <div className="font-semibold text-emerald-300">Node.js • Express</div>
              </div>
            </div>
          </div>
        </div>

        {/* --------------------------------------------------------------- */}
        {/* LAYER 4: Floating Stack Skill Pills (translateZ: 70px) */}
        {/* --------------------------------------------------------------- */}
        <div
          className="mt-5 flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-zinc-800/60"
          style={{ transform: 'translateZ(70px)' }}
        >
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-cyan-950/40 border border-cyan-500/30 text-cyan-300 text-xs font-mono font-semibold shadow-md">
            <Cpu className="w-3.5 h-3.5 text-cyan-400" />
            <span>MERN Stack</span>
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-950/40 border border-emerald-500/30 text-emerald-300 text-xs font-mono font-semibold shadow-md">
            <Layers className="w-3.5 h-3.5 text-emerald-400" />
            <span>CRM / EMR</span>
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-purple-950/40 border border-purple-500/30 text-purple-300 text-xs font-mono font-semibold shadow-md">
            <Terminal className="w-3.5 h-3.5 text-purple-400" />
            <span>React Native</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
