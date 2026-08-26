import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase, Calendar, CheckCircle2, Building2, Code, Cpu, Server, MapPin } from 'lucide-react';
import { ResumeCard } from '@/components/ui/ResumeCard';

interface ExperienceItem {
  role: string;
  type: 'SDE Role' | 'Internship' | 'Engineering Focus';
  company: string;
  location: string;
  period: string;
  description: string;
  achievements: string[];
  skills: string[];
}

export const Experience: React.FC = () => {
  const experiences: ExperienceItem[] = [
    {
      role: 'Software Development Engineer',
      type: 'SDE Role',
      company: 'aNquest Media',
      location: 'Greater Noida, India',
      period: 'May 2026 – Present',
      description: 'Develop full-stack features for aNquest Media’s CRM and EMR products, building high-responsiveness user interfaces in React.js and robust scalable backend microservices with Node.js and Express.js.',
      achievements: [
        'Architected in-app direct calling connecting agents straight to lead phone numbers via Vobiz’s Voice API.',
        'Engineered number-masked bridge calling (agent calls in, Vobiz calls back, then bridges to lead securely) ensuring total privacy for both sides.',
        'Automated lead follow-ups and broadcast notifications on WhatsApp, built on Meta’s WhatsApp Business API via a Facebook Developer App.',
        'Designed and optimized MongoDB & MySQL schemas powering real-time lead pipelines and healthcare patient record workflows.',
        'Collaborate within an agile engineering team through code reviews, sprint planning, and daily stand-ups.'
      ],
      skills: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'MySQL', 'TypeScript', 'Vobiz Voice API', 'WhatsApp Business API', 'RESTful APIs', 'AWS']
    },
    {
      role: 'Software Development Engineer Intern',
      type: 'Internship',
      company: 'aNquest Media',
      location: 'Greater Noida, India',
      period: 'Feb 2026 – Apr 2026',
      description: 'Contributed to front-end and back-end development on the CRM/EMR platform during a 3-month intensive internship, working across the complete MERN stack.',
      achievements: [
        'Built reusable, accessible UI components in React.js and supported core feature development for patient and lead workflows.',
        'Developed backend API endpoints with Express.js and structured MongoDB collections for data persistence.',
        'Demonstrated strong technical delivery and converted to a full-time Software Development Engineer role at the end of the internship.'
      ],
      skills: ['React.js', 'JavaScript', 'Node.js', 'Express.js', 'MongoDB', 'Tailwind CSS', 'MERN Stack', 'REST APIs']
    }
  ];

  return (
    <section id="experience" className="py-20 border-t border-zinc-900">
      <div className="space-y-16">
        {/* Section Header with 3D Resume Card */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 pt-4 pb-2">
          <div className="space-y-4 max-w-xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-xs font-mono text-blue-400">
              <Briefcase className="w-3.5 h-3.5" />
              <span>Career & Engineering Timeline</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-white tracking-tight">
              Professional <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">Experience</span>
            </h2>
            <p className="text-zinc-400 text-base leading-relaxed">
              Software Development Engineer at <strong className="text-zinc-200 font-semibold">aNquest Media</strong> building production CRM & EMR systems, telecommunication APIs, and mobile applications.
            </p>
          </div>

          {/* 3D Perspective Resume Download Card from Uiverse by Javierrocadev */}
          <div className="flex justify-center lg:justify-end py-4 lg:py-0">
            <ResumeCard
              nameMonogram="AR"
              role="Software Development Engineer"
              resumeUrl="https://github.com/ThakurAyushRaj"
            />
          </div>
        </div>

        {/* Fanned-Out Interactive Glass Cards Deck (From Uiverse.io by codebykay101 - Luxury Edition) */}
        <div className="fanned-glass-container">
          {/* Card 1: CRM & EMR */}
          <div
            className="glass-card"
            style={{
              ['--r' as any]: -8,
              ['--y' as any]: 6,
              ['--z' as any]: 1,
              ['--glow-color' as any]: 'rgba(59, 130, 246, 0.4)',
              ['--border-color' as any]: 'rgba(59, 130, 246, 0.65)'
            }}
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="p-2.5 w-max rounded-xl bg-gradient-to-br from-blue-500/20 to-blue-600/10 text-blue-400 border border-blue-500/30 shadow-inner">
                  <Server className="w-5 h-5" />
                </div>
                <span className="text-[9px] font-mono font-bold tracking-widest text-blue-400 bg-blue-500/10 px-2 py-0.5 rounded-full border border-blue-500/20">
                  № 01 // ENTERPRISE
                </span>
              </div>
              <div>
                <h3 className="text-base font-bold font-display text-white tracking-tight">CRM & EMR Systems</h3>
                <p className="text-[11px] text-zinc-300 leading-relaxed mt-1">
                  Specialized in enterprise data pipelines, patient/client management workflows, and secure medical/customer record systems at aNquest Media.
                </p>
              </div>
              <div className="flex flex-wrap gap-1 pt-1">
                {['MongoDB', 'MySQL', 'REST APIs', 'Vobiz Voice'].map((tag) => (
                  <span key={tag} className="text-[9px] font-mono px-2 py-0.5 rounded bg-zinc-900/80 border border-white/10 text-zinc-300">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            <div className="glass-footer">
              <span className="text-blue-400">aNquest Media Systems</span>
              <span className="text-xs text-blue-400 transition-transform group-hover:translate-x-1">→</span>
            </div>
          </div>

          {/* Card 2: Full-Stack MERN */}
          <div
            className="glass-card"
            style={{
              ['--r' as any]: 0,
              ['--y' as any]: -4,
              ['--z' as any]: 2,
              ['--glow-color' as any]: 'rgba(16, 185, 129, 0.4)',
              ['--border-color' as any]: 'rgba(16, 185, 129, 0.65)'
            }}
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="p-2.5 w-max rounded-xl bg-gradient-to-br from-emerald-500/20 to-emerald-600/10 text-emerald-400 border border-emerald-500/30 shadow-inner">
                  <Cpu className="w-5 h-5" />
                </div>
                <span className="text-[9px] font-mono font-bold tracking-widest text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                  № 02 // FULL STACK
                </span>
              </div>
              <div>
                <h3 className="text-base font-bold font-display text-white tracking-tight">Full-Stack MERN & MEAN</h3>
                <p className="text-[11px] text-zinc-300 leading-relaxed mt-1">
                  End-to-end full stack execution leveraging React.js, TypeScript, Node.js, Express.js, MongoDB, and MySQL for high performance.
                </p>
              </div>
              <div className="flex flex-wrap gap-1 pt-1">
                {['React.js', 'Node.js', 'Express', 'TypeScript'].map((tag) => (
                  <span key={tag} className="text-[9px] font-mono px-2 py-0.5 rounded bg-zinc-900/80 border border-white/10 text-zinc-300">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            <div className="glass-footer">
              <span className="text-emerald-400">Full-Stack Architecture</span>
              <span className="text-xs text-emerald-400 transition-transform group-hover:translate-x-1">→</span>
            </div>
          </div>

          {/* Card 3: Mobile Engineering */}
          <div
            className="glass-card"
            style={{
              ['--r' as any]: 8,
              ['--y' as any]: 6,
              ['--z' as any]: 3,
              ['--glow-color' as any]: 'rgba(168, 85, 247, 0.4)',
              ['--border-color' as any]: 'rgba(168, 85, 247, 0.65)'
            }}
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="p-2.5 w-max rounded-xl bg-gradient-to-br from-purple-500/20 to-purple-600/10 text-purple-400 border border-purple-500/30 shadow-inner">
                  <Code className="w-5 h-5" />
                </div>
                <span className="text-[9px] font-mono font-bold tracking-widest text-purple-400 bg-purple-500/10 px-2 py-0.5 rounded-full border border-purple-500/20">
                  № 03 // MOBILE & APIS
                </span>
              </div>
              <div>
                <h3 className="text-base font-bold font-display text-white tracking-tight">Mobile & Communication</h3>
                <p className="text-[11px] text-zinc-300 leading-relaxed mt-1">
                  Cross-platform React Native and Flutter development featuring real-time Firebase services, FCM alerts, and WhatsApp Automation.
                </p>
              </div>
              <div className="flex flex-wrap gap-1 pt-1">
                {['React Native', 'Flutter', 'Firebase', 'WhatsApp API'].map((tag) => (
                  <span key={tag} className="text-[9px] font-mono px-2 py-0.5 rounded bg-zinc-900/80 border border-white/10 text-zinc-300">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            <div className="glass-footer">
              <span className="text-purple-400">Mobile & Automation</span>
              <span className="text-xs text-purple-400 transition-transform group-hover:translate-x-1">→</span>
            </div>
          </div>
        </div>

        {/* Editorial Timeline */}
        <div className="space-y-8">
          <div className="flex items-center gap-3">
            <Briefcase className="w-5 h-5 text-blue-400" />
            <h3 className="text-2xl font-bold font-display text-white">Work Experience</h3>
          </div>

          <div className="relative border-l-2 border-zinc-800/80 ml-3 md:ml-6 space-y-12 pl-6 md:pl-10">
            {experiences.map((exp, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.15 }}
                className="relative group"
              >
                {/* Timeline Marker Dot */}
                <div className="absolute -left-[31px] md:-left-[47px] top-1.5 w-5 h-5 rounded-full bg-zinc-950 border-2 border-blue-500 flex items-center justify-center shadow-md shadow-blue-500/20 group-hover:scale-110 transition-transform">
                  <div className="w-2 h-2 rounded-full bg-blue-400" />
                </div>

                {/* Experience Card */}
                <div className="p-6 md:p-8 rounded-2xl bg-zinc-900/50 border border-zinc-800/80 hover:border-zinc-700/80 transition-all space-y-6 shadow-xl">
                  {/* Header info */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-800/60 pb-5">
                    <div>
                      <div className="flex items-center gap-3">
                        <span className={`px-2.5 py-0.5 rounded text-[11px] font-mono font-semibold uppercase tracking-wider ${
                          exp.type === 'SDE Role' 
                            ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20'
                            : 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                        }`}>
                          {exp.type}
                        </span>
                      </div>
                      <h3 className="text-xl sm:text-2xl font-bold text-white mt-2 font-display">{exp.role}</h3>
                      <div className="flex flex-wrap items-center gap-3 text-zinc-400 text-sm mt-1">
                        <div className="flex items-center gap-1.5 font-semibold text-zinc-200">
                          <Building2 className="w-4 h-4 text-blue-400" />
                          <span>{exp.company}</span>
                        </div>
                        <span>•</span>
                        <div className="flex items-center gap-1.5 text-zinc-400 text-xs font-mono">
                          <MapPin className="w-3.5 h-3.5 text-zinc-500" />
                          <span>{exp.location}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 text-xs font-mono text-zinc-400 bg-zinc-950/80 px-3 py-1.5 rounded-lg border border-zinc-800 w-max">
                      <Calendar className="w-3.5 h-3.5 text-blue-400" />
                      <span>{exp.period}</span>
                    </div>
                  </div>

                  {/* Role Description */}
                  <p className="text-zinc-300 text-sm md:text-base leading-relaxed">
                    {exp.description}
                  </p>

                  {/* Key Achievements Bullet points */}
                  <div className="space-y-3">
                    <h4 className="text-xs font-mono font-semibold text-zinc-400 uppercase tracking-wider">Key Engineering Achievements</h4>
                    <ul className="grid grid-cols-1 gap-2.5">
                      {exp.achievements.map((item, itemIdx) => (
                        <li key={itemIdx} className="flex items-start gap-3 text-sm text-zinc-300">
                          <CheckCircle2 className="w-4 h-4 text-blue-400 flex-shrink-0 mt-0.5" />
                          <span className="leading-snug">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Skills Tags */}
                  <div className="pt-2 flex flex-wrap gap-2">
                    {exp.skills.map((skill) => (
                      <span
                        key={skill}
                        className="px-2.5 py-1 text-xs font-mono rounded-md bg-zinc-950 text-zinc-300 border border-zinc-800"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
