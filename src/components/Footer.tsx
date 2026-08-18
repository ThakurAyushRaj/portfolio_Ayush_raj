import React from 'react';
import { Github, Mail, ArrowUp, FileText } from 'lucide-react';
import { SocialLinksGroup } from '@/components/ui/SocialButton';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-zinc-900 bg-zinc-950/90 pt-16 pb-12 relative overflow-hidden">
      {/* Top Gradient Divider Line */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-blue-500/40 to-transparent" />

      {/* Visual background ambient glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[180px] bg-blue-600/10 blur-[120px] pointer-events-none -z-10" />

      <div className="max-w-6xl mx-auto px-4 md:px-6 space-y-12">
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          {/* Brand & Mission */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-blue-400 font-mono font-bold text-sm shadow-md">
                AR
              </div>
              <span className="font-display font-bold text-xl text-white tracking-tight">
                Ayush<span className="text-blue-500">.</span>Raj
              </span>
            </div>
            <p className="text-zinc-300 text-sm max-w-sm leading-relaxed">
              Software Development Engineer & Full Stack Developer building production MERN platforms, React Native mobile solutions, and enterprise CRM/EMR tools.
            </p>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-zinc-900/90 border border-zinc-800 text-xs font-mono text-zinc-300 shadow-sm backdrop-blur-md">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Based in India • Global Remote Available</span>
            </div>
          </div>

          {/* Quick Navigation Links */}
          <div className="md:col-span-3 space-y-3">
            <div className="text-xs font-mono font-semibold text-zinc-400 uppercase tracking-wider">Navigation</div>
            <ul className="space-y-2 text-sm text-zinc-300 font-medium">
              <li><a href="#hero" className="hover:text-blue-400 transition-colors">Home / Bio</a></li>
              <li><a href="#experience" className="hover:text-blue-400 transition-colors">Career Timeline</a></li>
              <li><a href="#projects" className="hover:text-blue-400 transition-colors">Case Studies</a></li>
              <li><a href="#skills" className="hover:text-blue-400 transition-colors">Technical Stack</a></li>
              <li><a href="#contact" className="hover:text-blue-400 transition-colors">Contact</a></li>
            </ul>
          </div>

          {/* Social & Connect */}
          <div className="md:col-span-4 space-y-4">
            <div className="text-xs font-mono font-semibold text-zinc-400 uppercase tracking-wider">Connect & Social Links</div>
            
            {/* Uiverse Rotating Gradient Social Buttons */}
            <div className="pt-1 pb-2">
              <SocialLinksGroup />
            </div>

            <div className="flex flex-col gap-2.5">
              <a
                href="https://github.com/ThakurAyushRaj"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-3 p-3 rounded-xl bg-zinc-900/60 hover:bg-zinc-900 border border-zinc-800/80 text-xs font-mono text-zinc-300 hover:text-white transition-all w-max min-h-[42px]"
              >
                <Github className="w-4 h-4 text-purple-400" />
                <span>github.com/ThakurAyushRaj</span>
              </a>

              <a
                href="mailto:rajayush0852@gmail.com"
                className="inline-flex items-center gap-3 p-3 rounded-xl bg-zinc-900/60 hover:bg-zinc-900 border border-zinc-800/80 text-xs font-mono text-zinc-300 hover:text-white transition-all w-max min-h-[42px]"
              >
                <Mail className="w-4 h-4 text-cyan-400" />
                <span>rajayush0852@gmail.com</span>
              </a>

              <a
                href="https://github.com/ThakurAyushRaj"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-3 p-3 rounded-xl bg-zinc-900/60 hover:bg-zinc-900 border border-zinc-800/80 text-xs font-mono text-zinc-300 hover:text-white transition-all w-max min-h-[42px]"
              >
                <FileText className="w-4 h-4 text-emerald-400" />
                <span>Download Official Resume</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-zinc-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-zinc-400">
          <p>© {new Date().getFullYear()} Ayush Raj. Engineered with React, TypeScript & Tailwind CSS.</p>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-700/80 text-zinc-300 hover:text-white transition-all shadow-md min-h-[38px]"
            aria-label="Scroll back to top"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5 text-blue-400" />
          </button>
        </div>
      </div>
    </footer>
  );
};
