import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Github, Check, ArrowUpRight, AlertTriangle, ShieldCheck, Box, Cpu, Copy, Layers, Target, X, Terminal, BookOpen, ExternalLink, Activity, PhoneCall, MessageSquare, Database, Smartphone, Calendar, FileText } from 'lucide-react';

interface ProjectCaseStudy {
  id: string;
  indexNum: string;
  title: string;
  subtitle: string;
  company?: string;
  isProduction?: boolean;
  description: string;
  problem: string;
  solution: string;
  tags: string[];
  features: string[];
  metrics: { label: string; value: string }[];
  contribution: string;
  github: string;
  liveUrl?: string;
  category: 'Production / aNquest' | 'Full Stack' | 'Automation / Bot' | 'Mobile App' | 'Frontend';
}

interface ProjectCardProps {
  project: ProjectCaseStudy;
  onOpenModal: (project: ProjectCaseStudy) => void;
}

// -------------------------------------------------------------
// From Uiverse.io by PhyoTP - Enhanced Luxury 3D Blueprint Dossier Card
// -------------------------------------------------------------
const BookCard: React.FC<ProjectCardProps> = ({ project, onOpenModal }) => {
  const getThemeAccent = (category: string) => {
    switch (category) {
      case 'Production / aNquest':
        return {
          spine: 'border-l-blue-400',
          badge: 'bg-blue-500/15 text-blue-300 border-blue-500/30',
          accent: 'text-blue-400',
          button: 'bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-400 hover:to-indigo-400 text-white shadow-blue-500/25',
          glow: 'from-blue-500/20 via-indigo-500/10 to-transparent',
          border: 'border-blue-500/30',
          dot: 'bg-blue-400',
        };
      case 'Automation / Bot':
        return {
          spine: 'border-l-amber-400',
          badge: 'bg-amber-500/15 text-amber-300 border-amber-500/30',
          accent: 'text-amber-400',
          button: 'bg-gradient-to-r from-amber-500 to-amber-400 hover:from-amber-400 hover:to-amber-300 text-zinc-950 shadow-amber-500/25',
          glow: 'from-amber-500/20 via-orange-500/10 to-transparent',
          border: 'border-amber-500/30',
          dot: 'bg-amber-400',
        };
      case 'Mobile App':
        return {
          spine: 'border-l-purple-400',
          badge: 'bg-purple-500/15 text-purple-300 border-purple-500/30',
          accent: 'text-purple-400',
          button: 'bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-400 hover:to-pink-400 text-white shadow-purple-500/25',
          glow: 'from-purple-500/20 via-pink-500/10 to-transparent',
          border: 'border-purple-500/30',
          dot: 'bg-purple-400',
        };
      case 'Frontend':
        return {
          spine: 'border-l-emerald-400',
          badge: 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30',
          accent: 'text-emerald-400',
          button: 'bg-gradient-to-r from-emerald-500 to-teal-400 hover:from-emerald-400 hover:to-teal-300 text-zinc-950 shadow-emerald-500/25',
          glow: 'from-emerald-500/20 via-teal-500/10 to-transparent',
          border: 'border-emerald-500/30',
          dot: 'bg-emerald-400',
        };
      default: // Full Stack
        return {
          spine: 'border-l-cyan-400',
          badge: 'bg-cyan-500/15 text-cyan-300 border-cyan-500/30',
          accent: 'text-cyan-400',
          button: 'bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-zinc-950 shadow-cyan-500/25',
          glow: 'from-cyan-500/20 via-blue-500/10 to-transparent',
          border: 'border-cyan-500/30',
          dot: 'bg-cyan-400',
        };
    }
  };

  const theme = getThemeAccent(project.category);

  return (
    <div
      onClick={() => onOpenModal(project)}
      tabIndex={0}
      role="button"
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onOpenModal(project);
        }
      }}
      className="book group relative p-4 flex flex-col justify-between select-none outline-none focus:ring-2 focus:ring-cyan-400/50 border border-white/5 hover:border-cyan-500/30 transition-colors"
    >
      {/* ----------------- INSIDE OF BOOK (Revealed when cover rotates -85deg) ----------------- */}
      <div className="flex flex-col justify-between h-full space-y-2 z-10">
        {/* Top Header Inside */}
        <div className="flex items-center justify-between border-b border-white/10 pb-2">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono text-zinc-400 uppercase font-extrabold tracking-wider">
              DOSSIER #{project.indexNum}
            </span>
            <span className="inline-flex items-center gap-1.5 px-1.5 py-0.5 rounded bg-zinc-900/90 border border-zinc-800 text-[8px] font-mono text-emerald-400 font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>{project.isProduction ? 'LIVE PRODUCTION' : 'OPEN SOURCE'}</span>
            </span>
          </div>
          <span className={`px-2 py-0.5 rounded-md text-[8px] font-mono font-bold uppercase tracking-wider border shadow-sm ${theme.badge}`}>
            {project.category}
          </span>
        </div>

        {/* Synopsis & Tech Stack */}
        <div className="space-y-1.5 my-auto">
          <p className="text-[11px] text-zinc-300 line-clamp-2 leading-relaxed font-sans">
            {project.description}
          </p>
          <div className="flex flex-wrap gap-1.5 pt-0.5">
            {project.tags.slice(0, 4).map((tag) => (
              <span
                key={tag}
                className="px-2 py-0.5 text-[8px] font-mono font-medium rounded-md bg-zinc-900/90 hover:bg-zinc-800 border border-zinc-800 text-zinc-300 shadow-sm transition-colors"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Bottom Metrics & Action Button */}
        <div className="pt-2 border-t border-white/10 flex items-center justify-between gap-2">
          <div className="text-[9px] font-mono flex items-center gap-1.5">
            <span className="text-zinc-400 uppercase">{project.metrics[0]?.label}:</span>
            <span className={`font-bold ${theme.accent}`}>{project.metrics[0]?.value}</span>
          </div>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onOpenModal(project);
            }}
            className={`py-1.5 px-3 rounded-lg text-[10px] font-mono font-bold flex items-center gap-1.5 transition-all shadow-md active:scale-95 ${theme.button}`}
          >
            <span>Open Blueprint</span>
            <span>→</span>
          </button>
        </div>
      </div>

      {/* ----------------- FRONT COVER (Swings -85deg on hover) ----------------- */}
      <div
        className={`cover p-4 flex flex-col justify-between border-l-[6px] ${theme.spine} border-t border-r border-b border-white/10 relative overflow-hidden`}
      >
        {/* Subtle Spine Seam & Crease */}
        <div className="absolute left-2.5 top-0 bottom-0 w-[1px] bg-white/15 pointer-events-none" />
        <div className="absolute left-1 top-2.5 w-1 h-1 rounded-full bg-white/40 pointer-events-none" />
        <div className="absolute left-1 bottom-2.5 w-1 h-1 rounded-full bg-white/40 pointer-events-none" />

        {/* Ambient Top Glow */}
        <div
          className={`absolute -top-12 -right-12 w-28 h-28 bg-gradient-to-br ${theme.glow} blur-2xl rounded-full pointer-events-none`}
        />

        {/* Cover Top Meta */}
        <div className="space-y-0.5 z-10 pl-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <span className="text-[10px] font-mono font-black text-white/70 tracking-widest uppercase">
                № {project.indexNum}
              </span>
              <span className="text-[8px] font-mono text-zinc-500 uppercase tracking-widest">
                // {project.company ? project.company.toUpperCase() : 'DOSSIER'}
              </span>
            </div>
            <span
              className={`px-2 py-0.5 rounded-md text-[8px] font-mono font-bold uppercase tracking-wider border shadow-sm backdrop-blur-sm ${theme.badge}`}
            >
              {project.category}
            </span>
          </div>
        </div>

        {/* Cover Center Content */}
        <div className="space-y-1.5 z-10 pl-2 my-auto">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-zinc-900 to-black border border-white/15 flex items-center justify-center text-white/90 shadow-inner flex-shrink-0">
              <Terminal className={`w-4 h-4 ${theme.accent}`} />
            </div>
            <h3 className="text-sm sm:text-base font-display font-extrabold text-white tracking-tight leading-tight line-clamp-1">
              {project.title}
            </h3>
          </div>
          <p className="text-[10px] font-mono text-zinc-400 line-clamp-2 leading-relaxed pl-0.5">
            {project.subtitle}
          </p>
        </div>

        {/* Cover Bottom Footer */}
        <div className="pt-2 border-t border-white/10 z-10 pl-2 flex items-center justify-between">
          <span className="text-[9px] font-mono text-zinc-400 font-medium">
            {project.metrics[0]?.label}: <span className="text-zinc-200 font-bold">{project.metrics[0]?.value}</span>
          </span>
          <span className={`text-[9px] font-mono font-bold flex items-center gap-1.5 ${theme.accent}`}>
            <span>Hover to Open</span>
            <span>→</span>
          </span>
        </div>
      </div>
    </div>
  );
};

// -------------------------------------------------------------
// Detailed Project Modal Dialog
// -------------------------------------------------------------
const ProjectDetailModal: React.FC<{
  project: ProjectCaseStudy | null;
  onClose: () => void;
}> = ({ project, onClose }) => {
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
    navigator.clipboard.writeText(`git clone ${project.github}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/85 backdrop-blur-md"
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          className="relative w-full max-w-3xl bg-zinc-950 border border-zinc-700/80 rounded-2xl shadow-2xl overflow-hidden z-10 my-8"
        >
          {/* Modal Header */}
          <div className="p-6 sm:p-8 bg-zinc-900/60 border-b border-zinc-800 flex items-start justify-between gap-4">
            <div className="space-y-2">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="px-2.5 py-0.5 rounded text-[11px] font-mono font-semibold bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 uppercase tracking-wider">
                  № {project.indexNum} // {project.category}
                </span>
                {project.company && (
                  <span className="px-2.5 py-0.5 rounded text-[11px] font-mono font-semibold bg-blue-500/10 text-blue-400 border border-blue-500/20">
                    {project.company}
                  </span>
                )}
                <span className="px-2.5 py-0.5 rounded text-[11px] font-mono font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  {project.isProduction ? 'Production System' : 'Open Source'}
                </span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-display font-extrabold text-white">
                {project.title}
              </h3>
              <p className="text-sm font-mono text-zinc-400">
                {project.subtitle}
              </p>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-zinc-800/80 hover:bg-zinc-700 text-zinc-400 hover:text-white transition-colors border border-zinc-700/60"
              aria-label="Close dialog"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Modal Content */}
          <div className="p-6 sm:p-8 space-y-6 max-h-[60vh] overflow-y-auto">
            {/* Key Metrics Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {project.metrics.map((metric, i) => (
                <div key={i} className="p-3 rounded-xl bg-zinc-900/50 border border-zinc-800 text-center space-y-1">
                  <div className="text-xs font-mono text-zinc-400 uppercase">{metric.label}</div>
                  <div className="text-base sm:text-lg font-bold font-mono text-cyan-400">{metric.value}</div>
                </div>
              ))}
            </div>

            {/* Architecture Overview */}
            <div className="space-y-2">
              <div className="text-xs font-mono font-semibold text-zinc-400 uppercase tracking-wider flex items-center gap-1.5">
                <Layers className="w-4 h-4 text-cyan-400" />
                <span>System Architecture Overview</span>
              </div>
              <p className="text-zinc-300 text-sm leading-relaxed">
                {project.description}
              </p>
            </div>

            {/* Problem & Engineering Solution */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-rose-950/15 border border-rose-500/25 space-y-2">
                <div className="flex items-center gap-2 text-xs font-mono font-bold text-rose-400 uppercase">
                  <AlertTriangle className="w-4 h-4" />
                  <span>Engineering Challenge</span>
                </div>
                <p className="text-xs text-zinc-300 leading-relaxed">
                  {project.problem}
                </p>
              </div>

              <div className="p-4 rounded-xl bg-emerald-950/15 border border-emerald-500/25 space-y-2">
                <div className="flex items-center gap-2 text-xs font-mono font-bold text-emerald-400 uppercase">
                  <ShieldCheck className="w-4 h-4" />
                  <span>Architectural Solution</span>
                </div>
                <p className="text-xs text-zinc-300 leading-relaxed">
                  {project.solution}
                </p>
              </div>
            </div>

            {/* Key Technical Features */}
            <div className="space-y-3">
              <div className="text-xs font-mono font-semibold text-zinc-400 uppercase tracking-wider flex items-center gap-1.5">
                <Cpu className="w-4 h-4 text-cyan-400" />
                <span>Key Technical Capabilities</span>
              </div>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {project.features.map((feat, i) => (
                  <li key={i} className="flex items-start gap-2.5 p-2 rounded-lg bg-zinc-900/60 border border-zinc-800 text-xs text-zinc-300">
                    <Check className="w-3.5 h-3.5 text-cyan-400 flex-shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Engineering Contribution */}
            <div className="p-4 rounded-xl bg-zinc-900/80 border border-zinc-700/80 text-xs text-zinc-300 space-y-1">
              <span className="font-mono text-cyan-400 font-semibold uppercase tracking-wider block">Engineering Role & Contribution:</span>
              <p className="leading-relaxed">{project.contribution}</p>
            </div>

            {/* Technology Tags */}
            <div className="space-y-2 pt-2 border-t border-zinc-800/80">
              <div className="text-xs font-mono font-semibold text-zinc-400 uppercase tracking-wider">
                Technology Stack
              </div>
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 text-xs font-mono rounded-lg bg-zinc-900 text-zinc-300 border border-zinc-700"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Modal Footer Actions */}
          <div className="p-6 bg-zinc-900 border-t border-zinc-800 flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex items-center gap-3 w-full sm:w-auto">
              <a
                href={project.github}
                target="_blank"
                rel="noreferrer"
                className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-zinc-950 font-bold text-xs font-mono transition-all shadow-lg shadow-cyan-500/25 min-h-[44px]"
              >
                <Github className="w-4 h-4" />
                <span>View on GitHub</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>

              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-emerald-500/15 hover:bg-emerald-500/25 text-emerald-400 border border-emerald-500/30 text-xs font-mono font-bold transition-all min-h-[44px]"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span>Live Demo</span>
                </a>
              )}
            </div>

            <button
              type="button"
              onClick={handleCopyClone}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 text-xs font-mono text-zinc-300 transition-all min-h-[44px]"
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
      id: 'crm-real-estate',
      indexNum: '01',
      title: 'CRM (Real Estate)',
      subtitle: 'Lead Management & Deal Pipeline Architecture',
      company: 'aNquest Media',
      isProduction: true,
      description: 'Production CRM platform developed for real estate brokerages and property enterprises. Features comprehensive lead pipelines, automated status transitions, multi-agent assignment workflows, and dual MySQL/MongoDB storage.',
      problem: 'Handling hundreds of incoming property leads across diverse ad campaigns with manual tracking caused missed client interactions, duplicate contacts, and delayed agent follow-ups.',
      solution: 'Engineered high-throughput RESTful APIs with Express.js and structured MongoDB/MySQL schemas for rapid lead querying, status filtering, stage automation, and multi-agent assignment.',
      tags: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'MySQL', 'RESTful APIs'],
      metrics: [
        { label: 'Workflows', value: 'Lead Matrix' },
        { label: 'Latency', value: '<40ms' },
        { label: 'DB Schemas', value: 'Mongo + MySQL' },
        { label: 'Status', value: 'Production' }
      ],
      features: [
        'Dynamic lead capture, status tagging, and automated agent assignment',
        'Multi-stage deal pipeline visualization with filtering and search',
        'Relational MySQL & MongoDB dual schema architecture for flexible property records',
        'Secure authentication, role-based permissions, and audit logging'
      ],
      contribution: 'Built responsive interfaces in React.js and backend RESTful APIs powering lead-management workflows with MongoDB/MySQL schema design at aNquest Media.',
      github: 'https://github.com/ThakurAyushRaj',
      category: 'Production / aNquest'
    },
    {
      id: 'emr-healthcare',
      indexNum: '02',
      title: 'EMR (Healthcare)',
      subtitle: 'Clinical Patient Record & Medical Management System',
      company: 'aNquest Media',
      isProduction: true,
      description: 'Production Electronic Medical Record (EMR) platform developed for clinical healthcare clients to manage patient profiles, medical histories, diagnosis notes, and appointment schedules with utmost security.',
      problem: 'Healthcare providers required strict data integrity, fast retrieval of longitudinal patient treatment histories, and HIPAA-ready access controls without interface latency.',
      solution: 'Architected robust RESTful API endpoints and indexed MongoDB/MySQL patient record databases with role-based medical permissions and instantaneous search.',
      tags: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'MySQL', 'Healthcare EMR'],
      metrics: [
        { label: 'Records', value: 'Clinical Data' },
        { label: 'Query Speed', value: 'Sub-35ms' },
        { label: 'Security', value: 'Role-Based' },
        { label: 'Uptime', value: '99.99%' }
      ],
      features: [
        'Secure patient profile management, vital signs recording, and history tracking',
        'Clinical diagnosis documentation and prescription record workflows',
        'Optimized schema indexing for instant patient search across thousands of entries',
        'Doctor, nurse, and admin granular privilege separation'
      ],
      contribution: 'Built interfaces and backend RESTful APIs powering patient-record workflows for healthcare clients with MongoDB/MySQL schema design at aNquest Media.',
      github: 'https://github.com/ThakurAyushRaj',
      category: 'Production / aNquest'
    },
    {
      id: 'in-app-calling-bridge',
      indexNum: '03',
      title: 'In-App & Bridge Calling',
      subtitle: 'Number-Masked Telephony & Direct Voice System',
      company: 'aNquest Media',
      isProduction: true,
      description: 'Enterprise telecommunication subsystem providing in-app direct outbound dialing and number-masked dual-leg bridge calling powered by the Vobiz Voice API.',
      problem: 'Agents needed to contact prospective leads instantly while preventing exposure of personal phone numbers to preserve customer privacy and corporate data security.',
      solution: 'Built two voice engines: direct in-app WebRTC dialing and masked bridge calling where Vobiz calls the agent back and bridges to the lead so neither party sees the real phone number.',
      tags: ['Vobiz Voice API', 'Node.js', 'Express.js', 'Webhooks', 'Telephony', 'REST APIs'],
      metrics: [
        { label: 'Voice API', value: 'Vobiz Telephony' },
        { label: 'Privacy', value: '100% Masked' },
        { label: 'Call Delay', value: '<800ms' },
        { label: 'Bridge Mode', value: 'Dual-Leg' }
      ],
      features: [
        'In-app direct click-to-call straight to lead phone numbers via Vobiz API',
        'Number-masked bridge calling with automated agent callback and call bridging',
        'Zero phone number exposure for complete agent and client privacy protection',
        'Real-time call status webhook listeners and automatic Call Detail Record (CDR) logging'
      ],
      contribution: 'Architected and built in-app direct calling and number-masked bridge calling integrations on Vobiz Voice API at aNquest Media.',
      github: 'https://github.com/ThakurAyushRaj',
      category: 'Production / aNquest'
    },
    {
      id: 'whatsapp-automation',
      indexNum: '04',
      title: 'WhatsApp Automation',
      subtitle: 'Meta WhatsApp Business API Lead Engagement Engine',
      company: 'aNquest Media',
      isProduction: true,
      description: 'Automated messaging and customer engagement pipeline built on Meta’s WhatsApp Business API through a dedicated Facebook Developer App.',
      problem: 'Manually notifying leads, sending property brochures, and following up on inquiries led to slow lead qualification and high prospect drop-off rates.',
      solution: 'Created an automated webhook-driven pipeline that triggers verified WhatsApp template messages, status updates, and interactive follow-ups automatically upon lead capture.',
      tags: ['Meta WhatsApp API', 'Facebook Dev App', 'Node.js', 'Express', 'Webhooks'],
      metrics: [
        { label: 'Delivery', value: 'Meta WhatsApp' },
        { label: 'Open Rate', value: '98%' },
        { label: 'Automation', value: 'Real-Time' },
        { label: 'Engine', value: 'Webhook Sync' }
      ],
      features: [
        'Automated lead follow-ups and broadcast notifications on WhatsApp',
        'Integration with Meta WhatsApp Business API via Facebook Developer App',
        'Interactive quick-reply message templates and media brochure delivery',
        'Two-way webhook event listeners for delivery receipts, read states, and replies'
      ],
      contribution: 'Engineered lead follow-up automation on Meta WhatsApp Business API via Facebook Developer App at aNquest Media.',
      github: 'https://github.com/ThakurAyushRaj',
      category: 'Production / aNquest'
    },
    {
      id: 'erp-website',
      indexNum: '05',
      title: 'ERP Website System',
      subtitle: 'Unified Finance, HR, Inventory & Sales Dashboard',
      isProduction: false,
      description: 'A unified Enterprise Resource Planning (ERP) platform integrating Finance, Human Resources, Inventory Control, and Sales into one streamlined web software to replace manual spreadsheet workflows.',
      problem: 'Companies struggled with fragmented data across multiple disconnected spreadsheets, leading to inventory discrepancies, duplicated entries, and delayed accounting reconciliations.',
      solution: 'Built a unified React and TypeScript web platform with centralized state management, automated double-entry accounting, and multi-warehouse tracking.',
      tags: ['React', 'TypeScript', 'Node.js', 'Tailwind CSS', 'ERP Architecture'],
      metrics: [
        { label: 'Modules', value: 'Finance • HR • Sales' },
        { label: 'Latency', value: '38ms' },
        { label: 'Type Safety', value: 'TypeScript' },
        { label: 'Uptime', value: '99.98%' }
      ],
      features: [
        'Unified ERP platform replacing manual spreadsheet-based workflows',
        'Multi-department modules: Finance, HR, Inventory Control, and Sales Management',
        'Automated invoice calculation and financial summary reconciliations',
        'Responsive, modern dashboard interface built with Tailwind CSS'
      ],
      contribution: 'Sole author of the unified ERP platform architecture, frontend modules, and data interfaces.',
      github: 'https://github.com/ThakurAyushRaj/ERP-Website',
      liveUrl: 'https://github.com/ThakurAyushRaj/ERP-Website',
      category: 'Full Stack'
    },
    {
      id: 'slack-bot',
      indexNum: '06',
      title: 'Slack Attendance Bot',
      subtitle: 'Entry/Exit Tracking & Google Sheets API Automation',
      isProduction: false,
      description: 'An intelligent Slack bot that automates entry/exit tracking, working-hours calculation, and break management with daily summaries synced live to Google Sheets.',
      problem: 'Manual employee clock-ins and spreadsheet updates caused administrative overhead, missing entries, and inaccurate payroll calculation.',
      solution: 'Engineered a Node.js/Express bot integrated with Slack Webhooks and Google Sheets API via OAuth 2.0 to automate time tracking directly from team channels.',
      tags: ['Node.js', 'Express', 'Google Sheets API', 'Slack API', 'Webhooks'],
      metrics: [
        { label: 'Response', value: '<200ms' },
        { label: 'Sync Rate', value: '100% Live' },
        { label: 'Time Saved', value: '5 hrs/wk' },
        { label: 'Status', value: 'Automated' }
      ],
      features: [
        'Automated entry/exit tracking and break time logging via Slack slash commands',
        'Live synchronization of employee timestamps to Google Sheets spreadsheets',
        'Automated daily and weekly hours calculation digests for managers',
        'Edge case handling for timezones and missed checkout reminders'
      ],
      contribution: 'Built Slack bot logic, Google Sheets OAuth 2.0 sync engine, and hours calculation pipelines.',
      github: 'https://github.com/ThakurAyushRaj/SLACK-ATTENDANCE',
      category: 'Automation / Bot'
    },
    {
      id: 'attendance-tracker-app',
      indexNum: '07',
      title: 'Attendance Tracker App',
      subtitle: 'Cross-Platform React Native Mobile App with FCM',
      isProduction: false,
      description: 'Cross-platform mobile attendance application featuring Google OAuth sign-in, Firebase Cloud Messaging (FCM) alerts, admin dashboard, and attendance reporting.',
      problem: 'Remote and field employees needed an easy, secure mobile app to log daily check-ins with reliable push notification reminders.',
      solution: 'Developed a React Native mobile application powered by Firebase Auth, Cloud Firestore, and FCM push notifications with admin reporting.',
      tags: ['React Native', 'TypeScript', 'Firebase Auth', 'FCM Push', 'Firestore'],
      metrics: [
        { label: 'Platforms', value: 'iOS + Android' },
        { label: 'Push Delay', value: '<1.2s' },
        { label: 'Auth', value: 'Google OAuth' },
        { label: 'Crash Rate', value: '0.00%' }
      ],
      features: [
        'Google OAuth 2.0 single sign-on authentication flow',
        'Firebase Cloud Messaging (FCM) automated push notification alerts',
        'Admin dashboard for employee attendance verification and logs',
        'Comprehensive attendance reporting and leave request management'
      ],
      contribution: 'Developed the React Native mobile client, integrated Firebase auth/data stores, and configured FCM push delivery.',
      github: 'https://github.com/ThakurAyushRaj/Google-Auth_FCM-Notification_Admin-Pannel_Attendence-Tracker_App-React-Native-',
      category: 'Mobile App'
    },
    {
      id: 'calendar-todo-app',
      indexNum: '08',
      title: 'Google Calendar To-Do App',
      subtitle: 'Mobile Task Manager with Calendar Synchronization',
      isProduction: false,
      description: 'High-productivity mobile task manager built in React Native featuring bi-directional Google Calendar sync, automated reminder triggers, and real-time updates for productivity tracking.',
      problem: 'Managing tasks across separate to-do lists and calendar apps led to missed deadlines and disjointed daily scheduling.',
      solution: 'Created a React Native productivity app that synchronizes tasks and reminders directly with Google Calendar events in real-time.',
      tags: ['React Native', 'TypeScript', 'Google Calendar API', 'Expo', 'Mobile UI'],
      metrics: [
        { label: 'Sync', value: 'Google Calendar' },
        { label: 'Updates', value: 'Real-Time' },
        { label: 'Platform', value: 'React Native' },
        { label: 'Speed', value: '60 FPS' }
      ],
      features: [
        'Task manager with bi-directional Google Calendar synchronization',
        'Automated task reminders, priority flags, and recurring schedules',
        'Real-time status updates and productivity progress tracking',
        'Clean, accessible mobile interface optimized for single-handed use'
      ],
      contribution: 'Built the mobile user interface, Google Calendar API synchronization, and notification handlers.',
      github: 'https://github.com/ThakurAyushRaj/Google_Calendar_To-Do_App-React_Native',
      category: 'Mobile App'
    },
    {
      id: 'blog-website',
      indexNum: '09',
      title: 'Animated Blog Website',
      subtitle: 'Modern Immersive Reading Platform with Framer Motion',
      isProduction: false,
      description: 'Animated blog website built with React, TypeScript, and Tailwind CSS featuring fluid Framer Motion transitions designed for a smooth, immersive reading experience.',
      problem: 'Traditional technical blogs often feel static and visually uninspiring, with jarring page reloads and lack of micro-animations.',
      solution: 'Engineered an interactive blog platform with fluid page transition animations, markdown parsing, and high-contrast typography.',
      tags: ['React', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'UI/UX'],
      metrics: [
        { label: 'Transitions', value: 'Framer Motion' },
        { label: 'Performance', value: '100 Lighthouse' },
        { label: 'Styling', value: 'Tailwind CSS' },
        { label: 'UX', value: 'Immersive' }
      ],
      features: [
        'Smooth Framer Motion route transitions and micro-interactions',
        'Responsive typography and clean code syntax highlighting',
        'Optimized asset loading and dark/light ambient aesthetics',
        'Structured category filtering and quick search indexing'
      ],
      contribution: 'Designed and built the full frontend blog experience with React, TypeScript, and Tailwind CSS.',
      github: 'https://github.com/ThakurAyushRaj/Blog-Website',
      liveUrl: 'https://github.com/ThakurAyushRaj/Blog-Website',
      category: 'Frontend'
    }
  ];

  const categories = ['All', 'Production / aNquest', 'Full Stack', 'Automation / Bot', 'Mobile App', 'Frontend'];

  const filteredProjects = activeFilter === 'All' ? caseStudies : caseStudies.filter(p => p.category === activeFilter);

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
              <BookOpen className="w-4 h-4 text-cyan-400" />
              <span>3D Architecture Dossiers</span>
            </div>
            <h2 className="text-4xl sm:text-5xl font-display font-extrabold text-white tracking-tight">
              Production & Case <span className="text-gradient-multi">Studies</span>
            </h2>
            <p className="text-zinc-300 max-w-2xl text-base leading-relaxed">
              Explore the professional software platforms built at <strong className="text-zinc-200 font-semibold">aNquest Media</strong> and independent engineering blueprints across full-stack, mobile, and telecommunication systems.
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

        {/* Uiverse 3D Interactive Landscape Book Cards Grid - 3 Per Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center pt-4">
          <AnimatePresence mode="sync">
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.35, delay: index * 0.05, ease: [0.25, 1, 0.5, 1] }}
                className="w-full flex justify-center"
              >
                <BookCard
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

