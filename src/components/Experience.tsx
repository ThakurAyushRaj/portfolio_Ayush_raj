import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase, Calendar, CheckCircle2, Building2, Code, Cpu, Server } from 'lucide-react';
import { ResumeCard } from '@/components/ui/ResumeCard';

interface ExperienceItem {
  role: string;
  type: 'SDE Role' | 'Internship' | 'Engineering Focus';
  company: string;
  period: string;
  description: string;
  achievements: string[];
  skills: string[];
}

export const Experience: React.FC = () => {
  const experiences: ExperienceItem[] = [
    {
      role: 'Software Development Engineer (SDE)',
      type: 'SDE Role',
      company: 'Full Stack & Enterprise Systems',
      period: 'Present',
      description: 'Engineered high-performance enterprise web platforms including production CRM (Customer Relationship Management) and EMR (Electronic Medical Record) systems. Responsible for full-stack architecture, RESTful API design, database schema design, and seamless user interface integration.',
      achievements: [
        'Architected core CRM & EMR modules handling customer records, clinical workflow automation, and role-based access control.',
        'Developed scalable REST APIs using Node.js, Express, and MongoDB with TypeScript for robust type safety.',
        'Engineered automated Slack workflow bots integrated with Google Sheets API for attendance and hours calculation.',
        'Optimized frontend React components for reduced render cycles and seamless state synchronization.'
      ],
      skills: ['React', 'Node.js', 'TypeScript', 'MongoDB', 'Express.js', 'CRM / EMR Architecture', 'REST APIs']
    },
    {
      role: 'Software Development Intern',
      type: 'Internship',
      company: 'Mobile & Web Solutions',
      period: 'Internship Period',
      description: 'Collaborated on building cross-platform mobile applications and responsive frontend platforms. Focused on push notifications, authentication flows, and state management.',
      achievements: [
        'Built full-featured React Native attendance application featuring Google OAuth 2.0 authentication and FCM Push Notifications.',
        'Engineered mobile admin dashboard for real-time employee attendance verification and alert management.',
        'Designed modular UI component libraries using Tailwind CSS and Framer Motion for web projects.',
        'Participated in code reviews, API endpoint testing, and sprint planning.'
      ],
      skills: ['React Native', 'Firebase', 'FCM Push Alerts', 'TypeScript', 'Tailwind CSS', 'Framer Motion']
    }
  ];

  return (
    <section id="experience" className="py-20 border-t border-zinc-900">
      <div className="space-y-12">
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
              Proven track record of building production full-stack software, enterprise CRM/EMR platforms, and mobile applications.
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

        {/* Highlight Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-5 rounded-xl bg-zinc-900/40 border border-zinc-800/80 space-y-3 transition-all duration-200 ease-out hover:-translate-y-1 hover:border-blue-500/40 hover:shadow-lg hover:shadow-blue-500/10 will-change-transform">
            <div className="p-2.5 w-max rounded-lg bg-blue-500/10 text-blue-400 border border-blue-500/20">
              <Server className="w-5 h-5" />
            </div>
            <h3 className="text-base font-semibold text-white">CRM & EMR Systems</h3>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Specialized in enterprise data pipelines, patient/client management workflows, and secure medical/customer record systems.
            </p>
          </div>

          <div className="p-5 rounded-xl bg-zinc-900/40 border border-zinc-800/80 space-y-3 transition-all duration-200 ease-out hover:-translate-y-1 hover:border-emerald-500/40 hover:shadow-lg hover:shadow-emerald-500/10 will-change-transform">
            <div className="p-2.5 w-max rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <Cpu className="w-5 h-5" />
            </div>
            <h3 className="text-base font-semibold text-white">Full-Stack MERN</h3>
            <p className="text-xs text-zinc-400 leading-relaxed">
              End-to-end full stack execution leveraging React, TypeScript, Node.js, Express, and MongoDB for high performance.
            </p>
          </div>

          <div className="p-5 rounded-xl bg-zinc-900/40 border border-zinc-800/80 space-y-3 transition-all duration-200 ease-out hover:-translate-y-1 hover:purple-500/40 hover:shadow-lg hover:shadow-purple-500/10 will-change-transform">
            <div className="p-2.5 w-max rounded-lg bg-purple-500/10 text-purple-400 border border-purple-500/20">
              <Code className="w-5 h-5" />
            </div>
            <h3 className="text-base font-semibold text-white">Mobile Engineering</h3>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Cross-platform React Native development featuring real-time Firebase services, OAuth auth flows, and FCM alerts.
            </p>
          </div>
        </div>

        {/* Editorial Timeline */}
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
                    <div className="flex items-center gap-2 text-zinc-400 text-sm mt-1">
                      <Building2 className="w-4 h-4 text-zinc-500" />
                      <span>{exp.company}</span>
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
    </section>
  );
};
