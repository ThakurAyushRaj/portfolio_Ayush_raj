import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Code2 } from 'lucide-react';
import { SocialLinksGroup } from '@/components/ui/SocialButton';
import { Hero3DInteractiveMesh } from '@/components/ui/Hero3DInteractiveMesh';

const ROLES = [
  'Software Development Engineer @ aNquest Media',
  'Full Stack MERN & MEAN Developer',
  'CRM & EMR System Architect',
  'React Native & Flutter Mobile Engineer',
  'Voice & WhatsApp API Integration Specialist',
];

export const Hero: React.FC = () => {
  const [roleIndex, setRoleIndex] = useState(0);

  // Dynamic Role Rotator Timer
  useEffect(() => {
    const timer = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % ROLES.length);
    }, 3200);
    return () => clearInterval(timer);
  }, []);

  const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      const navOffset = 75;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navOffset;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    }
  };

  return (
    <section id="hero" className="relative pt-28 md:pt-36 pb-20 min-h-[92vh] flex flex-col justify-center overflow-visible">
      {/* Soft Ambient Background Glow Spheres */}
      <div className="absolute top-10 left-10 w-96 h-96 bg-cyan-500/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-purple-500/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 md:px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
        {/* Left Column: Bio, Pitch & Interactive Role Rotator */}
        <div className="lg:col-span-7 space-y-8">
          {/* Status Badge */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/25 text-xs font-mono text-blue-400 backdrop-blur-md shadow-sm"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
            </span>
            <span className="font-semibold tracking-wide">Software Development Engineer @ aNquest Media</span>
          </motion.div>

          {/* Main Headline with Animated Dynamic Role Rotator */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-3"
          >
            <h1 className="text-4xl sm:text-6xl font-display font-extrabold tracking-tight text-white leading-[1.1]">
              Hi, I'm <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-400">Ayush Raj</span>
            </h1>

            {/* Dynamic Animated Role Rotator */}
            <div className="h-10 sm:h-12 overflow-hidden flex items-center">
              <AnimatePresence mode="wait">
                <motion.div
                  key={roleIndex}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4, ease: 'easeOut' }}
                  className="text-lg sm:text-2xl font-mono text-cyan-300 font-bold tracking-tight flex items-center gap-2"
                >
                  <Code2 className="w-5 h-5 text-blue-400 shrink-0" />
                  <span>{ROLES[roleIndex]}</span>
                  <span className="w-2 h-6 bg-cyan-400 animate-pulse ml-1 inline-block" />
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>

          {/* Description from CV */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-zinc-300 text-base sm:text-lg leading-relaxed max-w-xl font-sans"
          >
            Full-stack developer experienced in building and shipping production features across the MERN and MEAN stacks, React Native, and Flutter. Currently at <span className="text-white font-semibold">aNquest Media</span>, developing CRM and EMR products that power lead and patient workflows for real estate and healthcare clients.
          </motion.p>

          {/* Core Tech Stack Chips from CV */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-wrap gap-2 pt-1"
          >
            {[
              { name: 'React.js', cls: 'border-cyan-500/30 text-cyan-300 bg-cyan-950/40' },
              { name: 'Node.js & Express', cls: 'border-emerald-500/30 text-emerald-300 bg-emerald-950/40' },
              { name: 'TypeScript', cls: 'border-purple-500/30 text-purple-300 bg-purple-950/40' },
              { name: 'MongoDB & MySQL', cls: 'border-amber-500/30 text-amber-300 bg-amber-950/40' },
              { name: 'React Native & Flutter', cls: 'border-pink-500/30 text-pink-300 bg-pink-950/40' },
              { name: 'Voice & WhatsApp APIs', cls: 'border-blue-500/30 text-blue-300 bg-blue-950/40' },
              { name: 'AWS & Cloud', cls: 'border-teal-500/30 text-teal-300 bg-teal-950/40' },
            ].map((skill) => (
              <span
                key={skill.name}
                className={`px-3 py-1 rounded-lg text-xs font-mono border ${skill.cls} backdrop-blur-sm transition-all hover:scale-105 shadow-sm font-semibold`}
              >
                {skill.name}
              </span>
            ))}
          </motion.div>

          {/* CTA Buttons & Rotating Gradient Social Stack */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex flex-wrap items-center gap-4 pt-2"
          >
            <a
              href="#projects"
              onClick={(e) => handleScrollTo(e, 'projects')}
              className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-semibold text-sm transition-all shadow-lg shadow-blue-600/25 hover:shadow-blue-500/40 hover:-translate-y-0.5 group min-h-[46px]"
            >
              <span>Explore Case Studies</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>

            {/* Social Buttons */}
            <div className="flex items-center">
              <SocialLinksGroup />
            </div>
          </motion.div>

          {/* Key Metrics Cards Grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-6 border-t border-zinc-800/80"
          >
            <div className="p-4 rounded-xl glass-panel space-y-1 hover:border-cyan-500/30 transition-colors">
              <div className="text-xl sm:text-2xl font-bold font-display text-white">SDE @ aNquest</div>
              <div className="text-xs text-zinc-400 font-mono">CRM & EMR Products</div>
            </div>
            <div className="p-4 rounded-xl glass-panel space-y-1 hover:border-blue-500/30 transition-colors">
              <div className="text-xl sm:text-2xl font-bold font-display text-blue-400">MERN & MEAN</div>
              <div className="text-xs text-zinc-400 font-mono">Full Stack Engineering</div>
            </div>
            <div className="p-4 rounded-xl glass-panel space-y-1 col-span-2 sm:col-span-1 hover:border-emerald-500/30 transition-colors">
              <div className="text-xl sm:text-2xl font-bold font-display text-emerald-400">Mobile & APIs</div>
              <div className="text-xs text-zinc-400 font-mono">React Native, Flutter, APIs</div>
            </div>
          </motion.div>
        </div>

        {/* Right Column: 3D Interactive Torus Mesh & Hologram Object */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="lg:col-span-5 relative"
        >
          <Hero3DInteractiveMesh />
        </motion.div>
      </div>
    </section>
  );
};
