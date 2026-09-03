import React, { useState, useEffect } from 'react';
import { Terminal, Code2 } from 'lucide-react';
import { motion } from 'framer-motion';

const codeSnippet = `const developer = {
  name: "Ayush Raj",
  role: "Software Development Engineer",
  company: "aNquest Media",
  skills: [
    "React.js", "Node.js", "TypeScript",
    "React Native", "Flutter", "MongoDB"
  ],
  passion: "Building Scalable Systems"
};

developer.initialize();`;

export const HeroCodeTyping: React.FC = () => {
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    let currentIndex = 0;
    const typeInterval = setInterval(() => {
      if (currentIndex <= codeSnippet.length) {
        setDisplayedText(codeSnippet.slice(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(typeInterval);
        setIsTyping(false);
      }
    }, 45); // typing speed

    return () => clearInterval(typeInterval);
  }, []);

  const highlightSyntax = (text: string) => {
    let html = text
      .replace(/const/g, '<span class="text-purple-400">const</span>')
      .replace(/developer(?!:)/g, '<span class="text-blue-400">developer</span>')
      .replace(/name:|role:|company:|skills:|passion:/g, (match) => `<span class="text-cyan-300">${match}</span>`)
      .replace(/"(.*?)"/g, '<span class="text-emerald-300">"$1"</span>')
      .replace(/initialize/g, '<span class="text-amber-300">initialize</span>');
    return { __html: html };
  };

  return (
    <div className="relative w-full h-[460px] sm:h-[520px] flex items-center justify-center p-4 lg:p-0 z-10">
      {/* Background Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(0,240,255,0.08)_0%,_transparent_65%)] pointer-events-none" />

      {/* Code Editor Window */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7, delay: 0.3 }}
        className="w-full max-w-lg bg-[#0d1117]/95 backdrop-blur-xl border border-zinc-800 rounded-xl overflow-hidden shadow-2xl shadow-cyan-900/20 relative font-mono text-[13px] sm:text-[15px] lg:mr-8"
      >
        {/* Header */}
        <div className="px-4 py-3 border-b border-zinc-800 bg-[#161b22]/95 flex items-center justify-between">
          <div className="flex gap-2">
            <div className="w-3 h-3 rounded-full bg-rose-500/80" />
            <div className="w-3 h-3 rounded-full bg-amber-500/80" />
            <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
          </div>
          <div className="text-xs text-zinc-400 flex items-center gap-1.5 absolute left-1/2 -translate-x-1/2">
            <Terminal className="w-3.5 h-3.5" />
            <span>developer.ts</span>
          </div>
          <div className="flex">
             <Code2 className="w-4 h-4 text-zinc-600" />
          </div>
        </div>

        {/* Code Content */}
        <div className="p-5 sm:p-6 text-zinc-300 min-h-[340px] text-left">
          <pre className="whitespace-pre-wrap break-words leading-relaxed font-mono">
             <code dangerouslySetInnerHTML={highlightSyntax(displayedText)} />
             {isTyping && <span className="inline-block w-2 h-4 sm:h-5 bg-cyan-400 animate-pulse ml-1 align-middle" />}
          </pre>
        </div>
      </motion.div>
    </div>
  );
};
