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
              className={`relative overflow-hidden rounded-2xl bg-zinc-900/50 backdrop-blur-md border h-64 sm:h-[280px] transition-all group shadow-lg ${
                edu.highlight ? 'border-indigo-500/35 bg-indigo-950/15' : 'border-zinc-800/80'
              }`}
            >
              {/* Main Card Content */}
              <div className="p-6 h-full flex flex-col justify-start space-y-4">
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

                <div className="space-y-1">
                  <h3 className="text-base sm:text-lg font-bold text-white font-display leading-snug">
                    {edu.degree}
                  </h3>
                  <p className="text-sm text-indigo-300 font-medium font-sans">
                    {edu.institution}
                  </p>
                  <p className="text-xs text-zinc-400 flex items-center gap-1.5 pt-1 font-mono">
                    <MapPin className="w-3.5 h-3.5 text-zinc-500 flex-shrink-0" />
                    <span>{edu.location}</span>
                  </p>
                </div>
              </div>

              {/* Uiverse Slide-up Details Overlay */}
              <div className="absolute bottom-0 left-0 w-full bg-black/80 backdrop-blur-md shadow-[0_3px_10px_rgba(0,0,0,0.2)] text-white overflow-hidden h-[3.2em] group-hover:h-[12em] sm:group-hover:h-[10em] transition-[height] duration-500 ease-in-out p-[0.8em] px-5 flex flex-col justify-start border-t border-white/10">
                <div className="flex items-center justify-between font-bold text-sm text-emerald-400">
                  <span className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4" />
                    Completed & Verified
                  </span>
                  <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest font-bold">
                    {idx === 0 ? 'DEGREE' : 'SECONDARY'}
                  </span>
                </div>
                
                {edu.details && (
                  <p className="text-[0.8em] text-zinc-300 leading-relaxed mt-[1.2em] font-sans opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                    {edu.details}
                  </p>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
