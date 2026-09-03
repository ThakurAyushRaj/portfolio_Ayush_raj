import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Code2, Server, Database, Smartphone, Cloud, Wrench, Sparkles, CheckCircle2, Terminal, RotateCw, LayoutGrid } from 'lucide-react';
import { GlassIcons, GlassIconsItem } from '@/components/ui/glass-icons';

interface SkillCategory {
  title: string;
  category: 'Frontend' | 'Backend' | 'Database' | 'Mobile' | 'Cloud & DevOps' | 'Tools & Methods';
  icon: React.ReactNode;
  topBorderClass: string;
  badgeBg: string;
  bgClass: string;
  description: string;
  skills: { name: string; level: string; highlight?: boolean }[];
}

export const Skills: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [flippedCardTitle, setFlippedCardTitle] = useState<string | null>(null);

  const glassItems: GlassIconsItem[] = [
    {
      icon: <LayoutGrid className="w-6 h-6 text-white" />,
      color: 'slate',
      label: 'All',
      onClick: () => setSelectedCategory('All')
    },
    {
      icon: <Code2 className="w-6 h-6 text-white" />,
      color: 'blue',
      label: 'Frontend',
      onClick: () => setSelectedCategory('Frontend')
    },
    {
      icon: <Server className="w-6 h-6 text-white" />,
      color: 'green',
      label: 'Backend',
      onClick: () => setSelectedCategory('Backend')
    },
    {
      icon: <Database className="w-6 h-6 text-white" />,
      color: 'orange',
      label: 'Databases',
      onClick: () => setSelectedCategory('Database')
    },
    {
      icon: <Smartphone className="w-6 h-6 text-white" />,
      color: 'purple',
      label: 'Mobile Apps',
      onClick: () => setSelectedCategory('Mobile')
    },
    {
      icon: <Cloud className="w-6 h-6 text-white" />,
      color: 'indigo',
      label: 'Cloud',
      onClick: () => setSelectedCategory('Cloud & DevOps')
    },
    {
      icon: <Terminal className="w-6 h-6 text-white" />,
      color: 'red',
      label: 'Engineering',
      onClick: () => setSelectedCategory('Tools & Methods')
    }
  ];

  const categories: SkillCategory[] = [
    {
      title: 'Languages & Core',
      category: 'Frontend',
      icon: <Code2 className="w-5 h-5 text-zinc-800 dark:text-white" />,
      topBorderClass: 'border-t-2 border-t-blue-500',
      badgeBg: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
      bgClass: 'bg-blue',
      description: 'Core programming languages and web standards powering modern full-stack web and mobile systems.',
      skills: [
        { name: 'JavaScript (ES6+)', level: 'Advanced', highlight: true },
        { name: 'TypeScript', level: 'Advanced', highlight: true },
        { name: 'Dart', level: 'Proficient', highlight: true },
        { name: 'HTML5 & Semantic Web', level: 'Advanced' },
        { name: 'CSS3 & CSS Variables', level: 'Advanced' },
      ]
    },
    {
      title: 'Frontend & Mobile Engineering',
      category: 'Frontend',
      icon: <Smartphone className="w-5 h-5 text-zinc-800 dark:text-white" />,
      topBorderClass: 'border-t-2 border-t-purple-500',
      badgeBg: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
      bgClass: 'bg-purple',
      description: 'Building responsive, accessible web applications and cross-platform native mobile solutions.',
      skills: [
        { name: 'React.js', level: 'Advanced', highlight: true },
        { name: 'React Native', level: 'Advanced', highlight: true },
        { name: 'Flutter', level: 'Proficient', highlight: true },
        { name: 'Tailwind CSS', level: 'Advanced', highlight: true },
        { name: 'Framer Motion', level: 'Proficient' },
        { name: 'Expo SDK', level: 'Advanced' }
      ]
    },
    {
      title: 'Backend & Communication APIs',
      category: 'Backend',
      icon: <Server className="w-5 h-5 text-zinc-800 dark:text-white" />,
      topBorderClass: 'border-t-2 border-t-emerald-500',
      badgeBg: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
      bgClass: 'bg-emerald',
      description: 'Designing scalable RESTful APIs, telephony/voice bridges, and WhatsApp enterprise automation.',
      skills: [
        { name: 'Node.js', level: 'Advanced', highlight: true },
        { name: 'Express.js', level: 'Advanced', highlight: true },
        { name: 'RESTful API Architecture', level: 'Advanced', highlight: true },
        { name: 'Vobiz Voice API (Calling/Bridge)', level: 'Advanced', highlight: true },
        { name: 'Meta WhatsApp Business API', level: 'Advanced', highlight: true },
        { name: 'Slack Bot & Google Sheets API', level: 'Advanced' }
      ]
    },
    {
      title: 'Databases & Storage',
      category: 'Database',
      icon: <Database className="w-5 h-5 text-zinc-800 dark:text-white" />,
      topBorderClass: 'border-t-2 border-t-amber-500',
      badgeBg: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
      bgClass: 'bg-amber',
      description: 'Relational and NoSQL schema design, query optimization, indexing, and real-time syncing.',
      skills: [
        { name: 'MongoDB & Mongoose', level: 'Advanced', highlight: true },
        { name: 'MySQL Schema Design', level: 'Advanced', highlight: true },
        { name: 'PostgreSQL', level: 'Proficient' },
        { name: 'Firebase Firestore & Auth', level: 'Advanced', highlight: true },
        { name: 'Firebase Cloud Messaging (FCM)', level: 'Advanced', highlight: true }
      ]
    },
    {
      title: 'Cloud & DevOps',
      category: 'Cloud & DevOps',
      icon: <Cloud className="w-5 h-5 text-zinc-800 dark:text-white" />,
      topBorderClass: 'border-t-2 border-t-cyan-500',
      badgeBg: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20',
      bgClass: 'bg-cyan',
      description: 'Cloud infrastructure, server management, containerization, and deployment automation.',
      skills: [
        { name: 'AWS (EC2, S3)', level: 'Proficient', highlight: true },
        { name: 'Git & GitHub Workflows', level: 'Advanced', highlight: true },
        { name: 'Facebook Developer Apps', level: 'Advanced' },
        { name: 'Vercel / Cloudflare', level: 'Advanced' }
      ]
    },
    {
      title: 'Tools & Engineering Practices',
      category: 'Tools & Methods',
      icon: <Wrench className="w-5 h-5 text-zinc-800 dark:text-white" />,
      topBorderClass: 'border-t-2 border-t-rose-500',
      badgeBg: 'bg-rose-500/10 text-rose-400 border-rose-500/20',
      bgClass: 'bg-rose',
      description: 'Software development lifecycle, API testing suites, Linux environment, and agile sprints.',
      skills: [
        { name: 'Postman API Suite', level: 'Advanced', highlight: true },
        { name: 'VS Code & Chrome DevTools', level: 'Advanced' },
        { name: 'Linux Command Line', level: 'Proficient' },
        { name: 'Agile, Scrum & Code Reviews', level: 'Advanced', highlight: true }
      ]
    }
  ];




  const filteredCategories = selectedCategory === 'All'
    ? categories
    : categories.filter(c => c.category === selectedCategory);

  const toggleFlip = (title: string) => {
    setFlippedCardTitle(prev => (prev === title ? null : title));
  };

  return (
    <section id="skills" className="py-24 border-t border-zinc-200 dark:border-zinc-900/80 relative">
      {/* Background radial highlight */}
      <div className="absolute top-1/3 left-0 w-[400px] h-[250px] bg-emerald-600/10 blur-[120px] rounded-full pointer-events-none -z-10" />

      <div className="space-y-12">
        {/* Header */}
        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-xs font-mono text-amber-600 dark:text-amber-400 backdrop-blur-md">
            <Sparkles className="w-4 h-4 text-amber-600 dark:text-amber-400" />
            <span>Technical Stack Architecture</span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-display font-extrabold text-zinc-900 dark:text-white tracking-tight">
            Tech Stack & <span className="text-gradient-emerald">Capabilities</span>
          </h2>
          <p className="text-zinc-600 dark:text-zinc-300 max-w-2xl text-base leading-relaxed">
            Click any 3D glass icon below or select a category tab to dynamically filter technical skills. Hover or tap cards to flip them.
          </p>
        </div>

        {/* React Bits GlassIcons Interactive Hub replaces text filter pills */}
        <div className="w-full">
          <GlassIcons items={glassItems} className="my-2" />
        </div>

        {/* Uiverse.io Flip Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="sync">
            {filteredCategories.map((cat, idx) => {
              const isFlipped = flippedCardTitle === cat.title;

              return (
                <motion.div
                  key={cat.title}
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.35, delay: idx * 0.05, ease: [0.25, 1, 0.5, 1] }}
                >
                  <div
                    className={`flip-card ${isFlipped ? 'flipped' : ''}`}
                    onClick={() => toggleFlip(cat.title)}
                  >
                    <div className="flip-card-inner">
                      {/* FRONT OF THE CARD - ONLY HEADING & SUB-HEADING (DARK GLASS THEME) */}
                      <div className={`flip-card-front flex flex-col justify-between ${cat.topBorderClass}`}>
                        <div className="space-y-4">
                          <div className="flex items-center justify-between">
                            <div className="Btn cursor-default flex-shrink-0" style={{ transform: 'scale(0.85)', transformOrigin: 'left center' }}>
                              <div className={`BG ${cat.bgClass}`} />
                              <div className="svgContainer">
                                {cat.icon}
                              </div>
                            </div>
                            <span className={`text-[10px] font-mono font-semibold px-2.5 py-1 rounded-full border ${cat.badgeBg}`}>
                              {cat.category}
                            </span>
                          </div>

                          {/* HEADING */}
                          <h3 className="title text-left text-zinc-900 dark:text-white font-display pt-2 text-xl font-bold tracking-tight">
                            {cat.title}
                          </h3>

                          {/* SUB-HEADING / DESCRIPTION */}
                          <p className="text-xs text-zinc-600 dark:text-zinc-300 leading-relaxed pt-1">
                            {cat.description}
                          </p>
                        </div>

                        {/* CARD FRONT FOOTER HINT */}
                        <div className="pt-4 border-t border-zinc-200 dark:border-zinc-800/80 flex items-center justify-between text-xs font-mono text-zinc-500 dark:text-zinc-400">
                          <span className="flex items-center gap-1.5 text-blue-600 dark:text-blue-400 font-medium">
                            <RotateCw className="w-3.5 h-3.5 animate-spin-slow text-blue-600 dark:text-blue-400" />
                            Hover for Tech Stack
                          </span>
                          <span className="text-[10px] text-zinc-500 font-mono">3D Flip ➔</span>
                        </div>
                      </div>

                      {/* BACK OF THE CARD - DETAILED TECH STACK (DARK GLASS THEME) */}
                      <div className={`flip-card-back ${cat.topBorderClass}`}>
                        <div className="space-y-3 flex-1 flex flex-col justify-between overflow-hidden">
                          <div>
                            <div className="flex items-center justify-between mb-3 border-b border-zinc-200 dark:border-zinc-800/80 pb-2.5">
                              <div className="flex items-center gap-2.5">
                                <div className="Btn cursor-default flex-shrink-0" style={{ transform: 'scale(0.75)', transformOrigin: 'left center' }}>
                                  <div className={`BG ${cat.bgClass}`} />
                                  <div className="svgContainer">
                                    {cat.icon}
                                  </div>
                                </div>
                                <h3 className="text-sm font-bold text-zinc-900 dark:text-white font-display">
                                  {cat.title}
                                </h3>
                              </div>
                              <span className={`text-[9px] font-mono px-2 py-0.5 rounded border ${cat.badgeBg}`}>
                                {cat.skills.length} Tools
                              </span>
                            </div>

                            {/* DETAILED TECH STACK LIST - EXACT SAME STYLE FOR ALL ITEMS */}
                            <div className="space-y-1.5 overflow-y-auto max-h-[160px] pr-1 pb-1">
                              {cat.skills.map((skill, i) => (
                                <div 
                                  key={i}
                                  className={`flex items-center justify-between p-2 rounded-lg text-xs font-mono transition-colors ${
                                    skill.highlight 
                                      ? 'bg-zinc-100 dark:bg-zinc-800/80 text-zinc-900 dark:text-zinc-100 border border-zinc-200 dark:border-zinc-700/50' 
                                      : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-300'
                                  }`}
                                >
                                  <div className="flex items-center gap-2">
                                    <CheckCircle2 className="w-3.5 h-3.5 text-blue-500 dark:text-blue-400 shrink-0" />
                                    <span>{skill.name}</span>
                                  </div>
                                  <span className="text-[9px] text-zinc-600 dark:text-zinc-300 bg-white dark:bg-zinc-900 px-2.5 py-0.5 rounded-md border border-zinc-200 dark:border-zinc-700 font-sans font-medium">
                                    {skill.level}
                                  </span>
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* CARD BACK FOOTER */}
                          <div className="pt-2 border-t border-zinc-200 dark:border-zinc-800/80 flex items-center justify-between text-xs font-mono text-zinc-500 dark:text-zinc-400">
                            <span className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400 font-medium">
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                              Tech Stack Revealed
                            </span>
                            <span className="text-[10px] text-zinc-500 font-mono">Flip Back ↩</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

