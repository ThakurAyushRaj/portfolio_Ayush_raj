import React, { Suspense, lazy } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle2, Copy } from 'lucide-react';
import { SocialLinksGroup } from '@/components/ui/SocialButton';

const SplineScene = lazy(() => import('@/components/ui/splite').then(m => ({ default: m.SplineScene })));

export const Hero: React.FC = () => {
  const [copied, setCopied] = React.useState(false);

  const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(`const developer = {\n  name: 'Ayush Raj',\n  role: 'Software Development Engineer',\n  stack: ['React', 'Node.js', 'TypeScript', 'MERN', 'React Native'],\n  focus: 'CRM & EMR Enterprise Systems'\n};`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="hero" className="relative pt-28 md:pt-36 pb-20 min-h-[92vh] flex flex-col justify-center">
      {/* Background Decorative Radial Gradients */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-blue-600/15 blur-[140px] rounded-full pointer-events-none -z-10" />
      <div className="absolute bottom-1/3 right-1/4 w-[450px] h-[450px] bg-cyan-500/10 blur-[130px] rounded-full pointer-events-none -z-10" />

      <div className="max-w-6xl mx-auto px-4 md:px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left Column: Bio & Core Pitch */}
        <div className="lg:col-span-7 space-y-8">
          {/* Status Badge */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-xs font-mono text-blue-400 backdrop-blur-md shadow-sm"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span className="font-semibold">Open for SDE & Full Stack Opportunities</span>
          </motion.div>

          {/* Main Headline */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-3"
          >
            <h1 className="text-4xl sm:text-6xl font-display font-extrabold tracking-tight text-white leading-[1.1]">
              Hi, I'm <span className="text-gradient-blue">Ayush Raj</span>
            </h1>
            <p className="text-xl sm:text-2xl font-mono text-zinc-300 font-medium tracking-tight">
              Software Development Engineer • Full Stack MERN Developer
            </p>
          </motion.div>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-zinc-300 text-base sm:text-lg leading-relaxed max-w-xl"
          >
            Engineer building high-concurrency CRM, EMR, and business platforms. Passionate about performant full-stack architectures, clean reusable design systems, and delightful micro-interactions.
          </motion.p>

          {/* Core Skills Chips */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-wrap gap-2 pt-1"
          >
            {['React.js', 'Node.js', 'TypeScript', 'MERN Stack', 'React Native', 'CRM / EMR Systems'].map((skill, index) => {
              const borderColors = [
                'border-cyan-500/30 text-cyan-300 bg-cyan-950/30',
                'border-emerald-500/30 text-emerald-300 bg-emerald-950/30',
                'border-purple-500/30 text-purple-300 bg-purple-950/30',
                'border-blue-500/30 text-blue-300 bg-blue-950/30',
                'border-pink-500/30 text-pink-300 bg-pink-950/30',
                'border-amber-500/30 text-amber-300 bg-amber-950/30',
              ];
              return (
                <span
                  key={skill}
                  className={`px-3 py-1 rounded-lg text-xs font-mono border ${borderColors[index % borderColors.length]} backdrop-blur-sm transition-all hover:scale-105 shadow-sm`}
                >
                  {skill}
                </span>
              );
            })}
          </motion.div>

          {/* CTA Buttons & Rotating Gradient Social Stack */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex flex-wrap items-center gap-5 pt-2"
          >
            <a
              href="#projects"
              onClick={(e) => handleScrollTo(e, 'projects')}
              className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-sm transition-all shadow-lg shadow-blue-600/25 hover:shadow-blue-500/40 hover:-translate-y-0.5 group min-h-[46px]"
            >
              <span>Explore Case Studies</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>

            {/* Uiverse Rotating Gradient Social Buttons (Email, GitHub, LinkedIn) */}
            <div className="flex items-center">
              <SocialLinksGroup />
            </div>
          </motion.div>

          {/* Key Metrics Cards */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-6 border-t border-zinc-800/60"
          >
            <div className="p-4 rounded-xl glass-panel space-y-1">
              <div className="text-2xl font-bold font-display text-white">Full Stack</div>
              <div className="text-xs text-zinc-400 font-mono">MERN & TypeScript</div>
            </div>
            <div className="p-4 rounded-xl glass-panel space-y-1">
              <div className="text-2xl font-bold font-display text-blue-400">CRM / EMR</div>
              <div className="text-xs text-zinc-400 font-mono">Production Systems</div>
            </div>
            <div className="p-4 rounded-xl glass-panel space-y-1 col-span-2 sm:col-span-1">
              <div className="text-2xl font-bold font-display text-emerald-400">Mobile</div>
              <div className="text-xs text-zinc-400 font-mono">React Native & FCM</div>
            </div>
          </motion.div>
        </div>

        {/* Right Column: Sleek Interactive Code Terminal Card + 3D Scene */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="lg:col-span-5 relative"
        >
          <div className="relative rounded-2xl overflow-hidden glass-panel border border-zinc-700/60 shadow-2xl space-y-0">
            {/* Terminal Header */}
            <div className="flex items-center justify-between px-4 py-3 bg-zinc-950/90 border-b border-zinc-800 text-xs font-mono text-zinc-400">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-red-500/80 inline-block"></span>
                <span className="w-3 h-3 rounded-full bg-yellow-500/80 inline-block"></span>
                <span className="w-3 h-3 rounded-full bg-green-500/80 inline-block"></span>
                <span className="ml-2 text-zinc-300 font-semibold">ayush_raj.ts</span>
              </div>
              <button
                onClick={handleCopyCode}
                className="flex items-center gap-1 text-[11px] text-zinc-400 hover:text-white px-2 py-1 rounded bg-zinc-900 border border-zinc-800 transition-colors"
                aria-label="Copy developer snippet"
              >
                {copied ? <CheckCircle2 className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                <span>{copied ? 'Copied' : 'Copy'}</span>
              </button>
            </div>

            {/* Code Snippet Box */}
            <div className="p-4 bg-zinc-950/90 font-mono text-xs text-zinc-300 border-b border-zinc-800/80 leading-relaxed overflow-x-auto">
              <div><span className="text-purple-400">const</span> <span className="text-blue-300">developer</span> = &#123;</div>
              <div className="pl-4">name: <span className="text-emerald-300">'Ayush Raj'</span>,</div>
              <div className="pl-4">role: <span className="text-emerald-300">'SDE / Full Stack Developer'</span>,</div>
              <div className="pl-4">domains: [<span className="text-cyan-300">'CRM'</span>, <span className="text-cyan-300">'EMR'</span>, <span className="text-cyan-300">'MERN'</span>, <span className="text-cyan-300">'React Native'</span>],</div>
              <div className="pl-4">status: <span className="text-amber-300">'Ready for Impact'</span></div>
              <div>&#125;;</div>
            </div>

            {/* 3D Spline Canvas Container with Fallback */}
            <div className="h-[340px] sm:h-[380px] w-full relative bg-zinc-950/80 overflow-hidden flex items-center justify-center">
              <Suspense
                fallback={
                  <div className="p-6 font-mono text-xs text-zinc-400 space-y-3 w-full text-center">
                    <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-2" />
                    <div>Loading 3D Visual Scene...</div>
                  </div>
                }
              >
                <div className="w-full h-full">
                  <SplineScene
                    scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
                    className="w-full h-full"
                  />
                </div>
              </Suspense>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
