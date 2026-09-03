import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, MapPin, CheckCircle2, Award, BookOpen, Sparkles } from 'lucide-react';

interface EducationItem {
  degree: string;
  institution: string;
  period: string;
  location: string;
  details?: string;
  highlight?: boolean;
  score?: string;
}

export const Education: React.FC = () => {
  const educationList: EducationItem[] = [
    {
      degree: 'Bachelor of Technology (B.Tech), Computer Science',
      institution: 'IIMT College of Engineering',
      period: '2021 – 2025',
      location: 'Greater Noida, Uttar Pradesh, India',
      details: 'Core engineering coursework in Data Structures & Algorithms, Database Management Systems, Operating Systems, Computer Networks, Object-Oriented Programming, and Full Stack Web Architecture.',
      highlight: true
    },
    {
      degree: 'Class XII (Senior Secondary — Science)',
      institution: 'Bihar School Examination Board (BSEB)',
      period: '2021',
      location: 'Patna, Bihar, India',
      details: 'Specialization in Mathematics, Physics, Chemistry, and Computer Applications with foundational problem-solving principles.',
      highlight: false
    },
    {
      degree: 'Class X (Secondary Education)',
      institution: 'Central Board of Secondary Education (CBSE)',
      period: '2019',
      location: 'New Delhi, India',
      details: 'Comprehensive foundational curriculum in Science, Mathematics, and Computer Science fundamentals.',
      highlight: false
    }
  ];

  return (
    <section id="education" className="py-20 border-t border-zinc-900/80 relative">
      {/* Background ambient glow */}
      <div className="absolute top-1/2 left-1/4 w-[450px] h-[250px] bg-indigo-600/10 blur-[130px] rounded-full pointer-events-none -z-10" />

      <div className="space-y-12">
        {/* Section Header */}
        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-xs font-mono text-indigo-400 backdrop-blur-md">
            <GraduationCap className="w-4 h-4 text-indigo-400" />
            <span>Academic Background & Qualifications</span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-display font-extrabold text-white tracking-tight">
            Educational <span className="text-gradient-purple">Milestones</span>
          </h2>
          <p className="text-zinc-300 max-w-2xl text-base leading-relaxed">
            Formal engineering education and academic foundations that anchor my full-stack and systems software expertise.
          </p>
        </div>

        {/* 3 Education Cards in 1 Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {educationList.map((edu, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className={`p-6 sm:p-7 rounded-2xl bg-zinc-900/50 backdrop-blur-md border transition-all space-y-4 hover:border-indigo-500/40 hover:shadow-2xl hover:shadow-indigo-500/10 flex flex-col justify-between group ${
                edu.highlight ? 'border-indigo-500/35 bg-indigo-950/15 ring-1 ring-indigo-500/20' : 'border-zinc-800/80'
              }`}
            >
              <div className="space-y-3.5">
                {/* Header row with Icon and Period Badge */}
                <div className="flex items-center justify-between">
                  <div className="Btn cursor-default flex-shrink-0" style={{ transform: 'scale(0.85)', transformOrigin: 'left center' }}>
                    <div className="BG bg-indigo" />
                    <div className="svgContainer">
                      <GraduationCap className="w-5 h-5 text-zinc-800 dark:text-white" />
                    </div>
                  </div>
                  <span className="text-xs font-mono text-zinc-300 bg-zinc-950/90 px-3 py-1 rounded-lg border border-zinc-800 font-semibold shadow-inner">
                    {edu.period}
                  </span>
                </div>

                {/* Degree and Institution */}
                <div className="space-y-1">
                  <h3 className="text-base sm:text-lg font-bold text-white font-display leading-snug">
                    {edu.degree}
                  </h3>
                  <p className="text-sm text-indigo-300 font-medium font-sans">
                    {edu.institution}
                  </p>
                  <p className="text-xs text-zinc-400 flex items-center gap-1.5 pt-0.5 font-mono">
                    <MapPin className="w-3.5 h-3.5 text-zinc-500 flex-shrink-0" />
                    <span>{edu.location}</span>
                  </p>
                </div>

                {/* Details / Coursework */}
                {edu.details && (
                  <p className="text-xs text-zinc-300 leading-relaxed pt-1 font-sans">
                    {edu.details}
                  </p>
                )}
              </div>

              {/* Bottom Verification Footer */}
              <div className="pt-3 border-t border-zinc-800/70 flex items-center justify-between">
                <span className="text-[11px] font-mono text-emerald-400 flex items-center gap-1.5 font-semibold">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Completed & Verified</span>
                </span>
                <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest font-bold">
                  {idx === 0 ? 'DEGREE' : 'SECONDARY'}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
