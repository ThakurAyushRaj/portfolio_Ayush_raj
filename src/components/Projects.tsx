import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Github, Check, ArrowUpRight, AlertTriangle, ShieldCheck, Box, Cpu, Copy, Layers, Target, X, ExternalLink, Sparkles, Terminal } from 'lucide-react';

interface ProjectCaseStudy {
  id: string;
  indexNum: string;
  title: string;
  subtitle: string;
  description: string;
  problem: string;
  solution: string;
  tags: string[];
  features: string[];
  metrics: { label: string; value: string }[];
  contribution: string;
  github: string;
  category: 'Full Stack' | 'Automation / Bot' | 'Mobile App' | 'Frontend';
}

interface ProjectCardProps {
  project: ProjectCaseStudy;
  onOpenModal: (project: ProjectCaseStudy) => void;
}

// -------------------------------------------------------------
// From Uiverse.io by Cobp - 3D Interactive Project Folder Card (Snappy, GPU Accelerated & Light/Dark Theme Ready)
// -------------------------------------------------------------
const CobpFolderCard: React.FC<ProjectCardProps> = ({ project, onOpenModal }) => {
  return (
    <div
      onClick={() => onOpenModal(project)}
      className="relative group flex flex-col items-center justify-center w-full p-4 py-8 bg-zinc-950/40 rounded-2xl border border-white/5 hover:border-amber-500/40 transition-all duration-150 cursor-pointer min-h-[300px] cobp-folder-wrapper"
    >
      <div className="file relative w-60 h-40 cursor-pointer origin-bottom [perspective:1500px] z-20">
        {/* Back Folder Flap (work-5) */}
        <div className="work-5 bg-amber-600 w-full h-full origin-top rounded-2xl rounded-tl-none group-hover:shadow-[0_20px_40px_rgba(0,0,0,.35)] transition-[box-shadow] duration-150 ease-out relative after:absolute after:content-[''] after:bottom-[99%] after:left-0 after:w-20 after:h-4 after:bg-amber-600 after:rounded-t-2xl before:absolute before:content-[''] before:-top-[15px] before:left-[75.5px] before:w-4 before:h-4 before:bg-amber-600 before:[clip-path:polygon(0_35%,0%_100%,50%_100%);] flex items-start pt-1.5 pl-3">
          <span className="text-[9px] font-mono font-black text-amber-950 uppercase tracking-wider absolute -top-4 left-2 z-10">
            #{project.indexNum}
          </span>
        </div>

        {/* Interior Document Sheet 3 (work-4 - Deepest) */}
        <div className="work-4 absolute inset-1 bg-zinc-800 border border-zinc-700/60 rounded-2xl p-2.5 flex flex-col justify-between transition-transform duration-150 ease-out will-change-transform origin-bottom select-none group-hover:[transform:rotateX(-20deg)] shadow-md cobp-sheet-3">
          <div className="flex justify-between items-center text-[9px] font-mono text-zinc-400 cobp-muted-text">
            <span>METRICS</span>
            <span className="text-cyan-400 font-bold cobp-cyan-text">{project.metrics[0]?.value}</span>
          </div>
          <div className="text-[10px] font-mono text-zinc-300 cobp-body-text line-clamp-1">
            {project.tags.slice(0, 3).join(' • ')}
          </div>
        </div>

        {/* Interior Document Sheet 2 (work-3 - Middle) */}
        <div className="work-3 absolute inset-1 bg-zinc-900 border border-zinc-700/80 rounded-2xl p-2.5 flex flex-col justify-between transition-transform duration-150 ease-out will-change-transform origin-bottom group-hover:[transform:rotateX(-30deg)] shadow-lg cobp-sheet-2">
          <div className="flex justify-between items-center text-[10px] font-mono text-amber-300 font-bold cobp-amber-text">
            <span>{project.category}</span>
            <span className="text-zinc-400 cobp-muted-text">2025</span>
          </div>
          <p className="text-[10px] text-zinc-300 cobp-body-text line-clamp-2 leading-tight">
            {project.subtitle}
          </p>
        </div>

        {/* Interior Document Sheet 1 (work-2 - Front Document) */}
        <div className="work-2 absolute inset-1 bg-gradient-to-br from-zinc-900 via-zinc-950 to-black border border-amber-500/40 rounded-2xl p-3 flex flex-col justify-between transition-transform duration-150 ease-out will-change-transform origin-bottom group-hover:[transform:rotateX(-38deg)] shadow-xl cobp-sheet-1">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono text-amber-400 font-bold uppercase tracking-wider cobp-amber-text">
                {project.category}
              </span>
              <span className="text-xs font-mono font-bold text-white cobp-heading-text">#{project.indexNum}</span>
            </div>
            <h4 className="text-sm font-bold font-display text-white mt-1 line-clamp-1 cobp-heading-text">
              {project.title}
            </h4>
          </div>
          <div className="text-[10px] font-mono text-cyan-300 flex items-center gap-1 font-bold cobp-cyan-text">
            <span>View Architecture</span>
            <span>→</span>
          </div>
        </div>

        {/* Front Folder Flap (work-1) */}
        <div className="work-1 absolute bottom-0 bg-gradient-to-t from-amber-500 to-amber-400 w-full h-[156px] rounded-2xl rounded-tr-none after:absolute after:content-[''] after:bottom-[99%] after:right-0 after:w-[146px] after:h-[16px] after:bg-amber-400 after:rounded-t-2xl before:absolute before:content-[''] before:-top-[10px] before:right-[142px] before:size-3 before:bg-amber-400 before:[clip-path:polygon(100%_14%,50%_100%,100%_100%);] transition-[transform,box-shadow] duration-150 ease-out will-change-transform origin-bottom flex flex-col justify-end p-3 group-hover:shadow-[inset_0_20px_40px_#fbbf24,_inset_0_-20px_40px_#d97706] group-hover:[transform:rotateX(-46deg)_translateY(1px)] shadow-lg">
          <div className="space-y-0.5">
            <span className="text-[9px] font-mono uppercase font-black tracking-widest text-amber-950/70">
              CASE STUDY #{project.indexNum}
            </span>
            <h3 className="text-sm font-black font-display text-amber-950 line-clamp-1 leading-tight">
              {project.title}
            </h3>
          </div>
        </div>
      </div>

      <p className="text-xs font-mono text-zinc-400 group-hover:text-amber-400 transition-colors pt-4 flex items-center gap-1.5 opacity-70 group-hover:opacity-100 cobp-hover-label">
        <span>Hover to open folder</span>
        <span className="group-hover:translate-x-1 transition-transform">→</span>
      </p>
    </div>
  );
};

// -------------------------------------------------------------
// Detailed Popup Modal Component
// -------------------------------------------------------------
interface ProjectModalProps {
  project: ProjectCaseStudy | null;
  onClose: () => void;
}

const ProjectDetailModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  const [activeTab, setActiveTab] = useState<'blueprint' | 'engineering'>('blueprint');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (project) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [project, onClose]);

  if (!project) return null;

  const handleCopyClone = () => {
    navigator.clipboard.writeText(`git clone ${project.github}.git`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/80 backdrop-blur-md"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.92, y: 20 }}
          transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
          className="relative w-full max-w-3xl max-h-[90vh] bg-[#0c0d16] border border-cyan-500/30 rounded-3xl shadow-[0_0_60px_rgba(0,242,234,0.18)] overflow-hidden flex flex-col z-10"
        >
          {/* Modal Header */}
          <div className="p-6 sm:p-8 bg-zinc-950/90 border-b border-zinc-800/90 flex items-start justify-between gap-4">
            <div className="space-y-2">
              <div className="flex items-center gap-3 flex-wrap">
                <span className="px-3.5 py-1 rounded-xl bg-cyan-500/15 border border-cyan-500/30 text-cyan-300 text-xs font-mono font-bold">
                  {project.category}
                </span>
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-lg bg-zinc-900 border border-zinc-800 text-[11px] font-mono text-emerald-400">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span>Production Live System</span>
                </span>
                <span className="text-sm font-mono text-cyan-400 font-bold">
                  Case Study #{project.indexNum}
                </span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-display font-extrabold text-white tracking-tight">
                {project.title}
              </h2>
              <p className="text-xs sm:text-sm font-mono text-cyan-300/90 font-medium">
                {project.subtitle}
              </p>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 text-zinc-400 hover:text-white transition-colors"
              title="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Modal Scrollable Body */}
          <div className="p-6 sm:p-8 space-y-6 overflow-y-auto custom-scrollbar">
            {/* Overview Description */}
            <div className="space-y-2">
              <div className="text-xs font-mono font-semibold text-zinc-400 uppercase tracking-wider flex items-center gap-2">
                <Terminal className="w-3.5 h-3.5 text-cyan-400" />
                <span>System Architecture Overview</span>
              </div>
              <p className="text-zinc-200 text-sm leading-relaxed">
                {project.description}
              </p>
            </div>

            {/* 4-Column Operational Metrics Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              {project.metrics.map((metric, mIdx) => (
                <div
                  key={mIdx}
                  className="p-3 rounded-xl bg-zinc-950/80 border border-cyan-500/20 flex flex-col justify-center items-center text-center shadow-inner hover:border-cyan-400/50 transition-colors"
                >
                  <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider">{metric.label}</span>
                  <span className="text-sm font-mono font-bold text-white mt-1">{metric.value}</span>
                </div>
              ))}
            </div>

            {/* Interactive Tab Switcher */}
            <div className="p-1 rounded-xl bg-zinc-950/90 border border-zinc-800 flex items-center gap-1 text-xs font-mono">
              <button
                type="button"
                onClick={() => setActiveTab('blueprint')}
                className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg transition-all ${
                  activeTab === 'blueprint'
                    ? 'bg-cyan-500 text-zinc-950 font-bold shadow-md shadow-cyan-500/30'
                    : 'text-zinc-400 hover:text-zinc-200'
                }`}
              >
                <Layers className="w-3.5 h-3.5" />
                <span>Architecture Blueprint & Features</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('engineering')}
                className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg transition-all ${
                  activeTab === 'engineering'
                    ? 'bg-cyan-500 text-zinc-950 font-bold shadow-md shadow-cyan-500/30'
                    : 'text-zinc-400 hover:text-zinc-200'
                }`}
              >
                <Target className="w-3.5 h-3.5" />
                <span>Challenge & Architecture Solution</span>
              </button>
            </div>

            {/* Tab Contents */}
            {activeTab === 'blueprint' ? (
              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="text-xs font-mono font-semibold text-zinc-400 uppercase tracking-wider flex items-center gap-1.5">
                    <Cpu className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Core Engineering Capabilities</span>
                  </div>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-zinc-200">
                    {project.features.map((feat, fIdx) => (
                      <li key={fIdx} className="flex items-start gap-2.5 p-2.5 rounded-xl bg-zinc-950/60 border border-zinc-800/80">
                        <Check className="w-4 h-4 text-cyan-400 flex-shrink-0 mt-0.5" />
                        <span className="leading-snug">{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="p-3.5 rounded-xl bg-zinc-950/90 border border-cyan-500/20 text-xs text-zinc-300">
                  <span className="font-mono text-cyan-400 font-semibold">Engineering Role: </span>
                  {project.contribution}
                </div>
              </div>
            ) : (
              <div className="space-y-3">
                <div className="p-4 rounded-2xl bg-zinc-950/90 border border-red-500/30 space-y-2 shadow-sm">
                  <div className="flex items-center gap-2 text-xs font-mono font-bold text-red-400 uppercase">
                    <AlertTriangle className="w-4 h-4" />
                    <span>The Engineering Challenge</span>
                  </div>
                  <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
                    {project.problem}
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-zinc-950/90 border border-emerald-500/30 space-y-2 shadow-sm">
                  <div className="flex items-center gap-2 text-xs font-mono font-bold text-emerald-400 uppercase">
                    <ShieldCheck className="w-4 h-4" />
                    <span>The Architecture Solution</span>
                  </div>
                  <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
                    {project.solution}
                  </p>
                </div>
              </div>
            )}

            {/* Tech Stack Tags */}
            <div className="space-y-2 pt-2 border-t border-zinc-800/80">
              <div className="text-xs font-mono font-semibold text-zinc-400 uppercase tracking-wider">
                Technology Stack
              </div>
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 text-xs font-mono rounded-lg bg-zinc-950 text-zinc-300 border border-cyan-500/20 shadow-sm"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Modal Footer Actions */}
          <div className="p-6 bg-zinc-950/90 border-t border-zinc-800/90 flex flex-col sm:flex-row items-center justify-between gap-3">
            <a
              href={project.github}
              target="_blank"
              rel="noreferrer"
              className="w-full sm:w-auto flex-1 inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-zinc-950 font-bold text-xs font-mono transition-all shadow-lg shadow-cyan-500/25 min-h-[44px]"
            >
              <Github className="w-4 h-4" />
              <span>Explore GitHub Repository</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>

            <button
              type="button"
              onClick={handleCopyClone}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 text-xs font-mono text-zinc-200 transition-all min-h-[44px]"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span className="text-emerald-400">git clone Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 text-zinc-400" />
                  <span>Copy git clone</span>
                </>
              )}
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export const Projects: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<string>('All');
  const [selectedProject, setSelectedProject] = useState<ProjectCaseStudy | null>(null);

  const caseStudies: ProjectCaseStudy[] = [
    {
      id: 'erp-website',
      indexNum: '01',
      title: 'ERP Website System',
      subtitle: 'Enterprise Resource Planning & Real-Time Data Pipeline',
      description: 'A comprehensive Enterprise Resource Planning platform unifying Finance, HR, Inventory Control, and Sales Operations into a centralized, real-time dashboard.',
      problem: 'Enterprise teams struggled with fragmented data across disconnected spreadsheets and legacy software, causing inventory errors and delayed financial reporting.',
      solution: 'Architected a unified MERN stack application with type-safe TypeScript interfaces, role-based access control, and centralized MongoDB schema design.',
      tags: ['TypeScript', 'React', 'Node.js', 'Express', 'MongoDB', 'Tailwind CSS'],
      metrics: [
        { label: 'Latency', value: '38ms' },
        { label: 'Security', value: 'RBAC JWT' },
        { label: 'Endpoints', value: '42 REST' },
        { label: 'Uptime', value: '99.98%' }
      ],
      features: [
        'Real-time inventory and multi-warehouse synchronization engine',
        'Automated invoice generation and double-entry accounting reconciliation',
        'Granular role-based access control (Admin, Manager, Staff)',
        'Interactive analytics dashboard with automated export pipelines'
      ],
      contribution: 'Designed database schemas, developed 40+ REST API endpoints, and created responsive frontend dashboards.',
      github: 'https://github.com/ThakurAyushRaj',
      category: 'Full Stack'
    },
    {
      id: 'slack-bot',
      indexNum: '02',
      title: 'Slack Bot Automation',
      subtitle: 'Automated Attendance & Google Sheets Sync Bot',
      description: 'An automated Slack bot integrated with Google Sheets API and workspace webhooks for team attendance logging, hours tracking, and automated reporting.',
      problem: 'Manual employee check-ins and hours calculation in large teams caused administrative delays and billing inaccuracies.',
      solution: 'Built an event-driven Slack webhook bot using Node.js and Express that automatically syncs check-in timestamps to Google Sheets in real-time.',
      tags: ['Node.js', 'Slack API', 'Google Sheets API', 'Express', 'TypeScript', 'Webhooks'],
      metrics: [
        { label: 'Response', value: '<250ms' },
        { label: 'Sync Rate', value: '100% Live' },
        { label: 'Automation', value: '5 hrs/wk' },
        { label: 'Uptime', value: '99.9%' }
      ],
      features: [
        'Interactive Slack slash commands (/checkin, /checkout, /summary)',
        'Bi-directional synchronization with Google Sheets API via OAuth 2.0',
        'Automated weekly hours calculation and administrative summary digests',
        'Edge case handling for time zones, duplicate entries, and disconnects'
      ],
      contribution: 'Sole author of the bot logic, OAuth integration, Google Sheets sync engine, and deployment pipeline.',
      github: 'https://github.com/ThakurAyushRaj',
      category: 'Automation / Bot'
    },
    {
      id: 'crm-emr-platform',
      indexNum: '03',
      title: 'CRM & EMR Enterprise Systems',
      subtitle: 'Production Clinical Workflow & Customer Management Systems',
      description: 'Production-grade Customer Relationship Management and Electronic Medical Record platforms built for enterprise clinics and high-volume business operations.',
      problem: 'Handling sensitive patient records, appointment scheduling, and customer support tickets required strict data isolation and sub-second query response times.',
      solution: 'Engineered a modular multi-tenant architecture with encrypted fields, audit logging, and responsive React interfaces optimized for healthcare staff.',
      tags: ['React', 'TypeScript', 'Node.js', 'MongoDB', 'Tailwind CSS', 'HIPAA Ready'],
      metrics: [
        { label: 'Records', value: '10K+' },
        { label: 'Audit Log', value: '100% Tracked' },
        { label: 'Query Time', value: '<45ms' },
        { label: 'Compliance', value: 'Encrypted' }
      ],
      features: [
        'Secure patient record management with role-restricted medical history views',
        'Automated appointment booking, reminder queues, and calendar sync',
        'Customer support ticket routing, status tracking, and SLA escalation alerts',
        'Optimized frontend tables with virtualized scrolling for 10,000+ data rows'
      ],
      contribution: 'Engineered core CRM modules, database indexing strategies, and clinic management user interfaces.',
      github: 'https://github.com/ThakurAyushRaj',
      category: 'Full Stack'
    },
    {
      id: 'react-native-attendance',
      indexNum: '04',
      title: 'React Native Attendance App',
      subtitle: 'Cross-Platform Mobile Attendance with Push Notifications',
      description: 'A cross-platform iOS and Android mobile app providing real-time location-based attendance check-ins, push notification reminders, and manager dashboards.',
      problem: 'Field workers and remote staff needed a fast, reliable mobile app to log attendance without requiring desktop computer access.',
      solution: 'Created a React Native mobile application utilizing Firebase Authentication, Cloud Firestore, and Firebase Cloud Messaging (FCM) for instant push alerts.',
      tags: ['React Native', 'Firebase', 'FCM Push', 'TypeScript', 'Tailwind CSS', 'Expo'],
      metrics: [
        { label: 'Platforms', value: 'iOS + Android' },
        { label: 'Push Delay', value: '<1.2s' },
        { label: 'Crash Rate', value: '0.00%' },
        { label: 'Auth', value: 'OAuth 2.0' }
      ],
      features: [
        'One-tap biometric and OAuth check-in / check-out workflows',
        'Firebase Cloud Messaging (FCM) automated morning and evening reminders',
        'Manager dashboard for team attendance approvals and leave tracking',
        'Offline persistence queue ensuring zero data loss during network dropouts'
      ],
      contribution: 'Developed the React Native mobile client, integrated FCM push notifications, and built Firestore backend listeners.',
      github: 'https://github.com/ThakurAyushRaj',
      category: 'Mobile App'
    }
  ];

  const categories = ['All', 'Full Stack', 'Automation / Bot', 'Mobile App'];

  const filteredProjects = activeFilter === 'All'
    ? caseStudies
    : caseStudies.filter(p => p.category === activeFilter);

  return (
    <section id="projects" className="py-24 border-t border-zinc-900/80 relative">
      {/* Background ambient radial light */}
      <div className="absolute top-1/2 right-0 w-[500px] h-[350px] bg-blue-600/10 blur-[140px] rounded-full pointer-events-none -z-10" />
      <div className="absolute bottom-10 left-10 w-[400px] h-[300px] bg-cyan-600/10 blur-[130px] rounded-full pointer-events-none -z-10" />

      <div className="space-y-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-xs font-mono text-cyan-400 backdrop-blur-md">
              <Box className="w-4 h-4 text-cyan-400" />
              <span>Interactive Architecture Showcase</span>
            </div>
            <h2 className="text-4xl sm:text-5xl font-display font-extrabold text-white tracking-tight">
              Production <span className="text-gradient-multi">Case Studies</span>
            </h2>
            <p className="text-zinc-300 max-w-2xl text-base leading-relaxed">
              Explore the system blueprints, operational metrics, engineering challenges, and source code repositories for enterprise-ready applications.
            </p>
          </div>

          <a
            href="https://github.com/ThakurAyushRaj"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2.5 px-5 py-3 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-700/80 text-xs font-mono text-zinc-200 hover:text-white transition-all shadow-md hover:-translate-y-0.5 w-max min-h-[44px]"
          >
            <Github className="w-4 h-4 text-cyan-400" />
            <span>View All GitHub Repos</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap gap-2.5 pt-2">
          {categories.map((cat) => {
            const isSelected = activeFilter === cat;
            return (
              <button
                key={cat}
                onClick={() => setActiveFilter(cat)}
                className={`relative px-5 py-2.5 rounded-xl text-xs font-mono transition-all min-h-[40px] ${
                  isSelected
                    ? 'bg-cyan-500 text-zinc-950 font-bold shadow-lg shadow-cyan-500/25 border border-cyan-400'
                    : 'bg-zinc-900/80 hover:bg-zinc-800 text-zinc-400 hover:text-zinc-200 border border-zinc-800/80'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Uiverse Cobp 3D Interactive Project Folder Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-4">
          <AnimatePresence mode="sync">
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.35, delay: index * 0.05, ease: [0.25, 1, 0.5, 1] }}
                className="h-full"
              >
                <CobpFolderCard
                  project={project}
                  onOpenModal={(p) => setSelectedProject(p)}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      {/* Detailed Blueprint & Engineering Popup Modal */}
      <ProjectDetailModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
};
