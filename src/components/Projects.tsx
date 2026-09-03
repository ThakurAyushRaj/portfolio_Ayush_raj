import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';
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
  isOpen: boolean;
  onToggle: () => void;
}

// -------------------------------------------------------------
// From Uiverse.io by dexter-st
// -------------------------------------------------------------
const receiptStyles = `
.wrapper {
  --printer-color: #2a2c30;
  --printer-color-2: #1e2022;
  --receipt-color: #16181a;

  font-size: 14px;
  position: relative;
  user-select: none;
  display: flex;
  justify-content: center;
  width: 100%;
  z-index: 1;
}

.wrapper:has(.print-button:focus),
.wrapper:hover {
  z-index: 10;
}

.printer {
  width: 320px;
  height: 80px;
  border-radius: 0 0 8px 8px;
  position: relative;
  margin-top: 40px;

  background-color: var(--printer-color);
  background-image: url(data:image/png;base64,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);
  border: 2px solid var(--printer-color-2);
  box-shadow:
    0 16px 32px 0px #0002,
    0 -30px 16px 0px #0001;
}

.printer::before {
  content: "";
  position: absolute;
  top: -30px;
  left: 0;
  width: 100%;
  height: 70px;
  border-radius: 12px 12px 0 0;
  border-bottom: 2px solid #0003;
  box-shadow:
    0 12px 16px -12px #fff5 inset,
    0 -6px 16px -6px #0003 inset,
    0 6px 8px -6px #0004;
  box-sizing: border-box;
  background-color: inherit;
  background-image: inherit;
  filter: brightness(1.12);
  z-index: 2;
}

.printer::after {
  content: "";
  position: absolute;
  top: 20px;
  left: 30px;
  width: 260px;
  height: 40px;
  border-radius: 0 0 4px 4px;
  border-bottom: 1px solid #0003;
  background-color: inherit;
  background-image: linear-gradient(
    to top,
    var(--printer-color),
    60%,
    var(--printer-color-2)
  );
  box-shadow: 0 4px 4px -2px #0004;
  z-index: 1;
}

.printer-display {
  z-index: 2;
  display: flex;
  padding: 6px 8px;
  position: absolute;
  top: -10px;
  left: 30px;
  width: 160px;
  height: 32px;
  background-color: #000;
  background-image: linear-gradient(transparent 0, #fff2 90%, transparent 100%);
  background-size: 100% 8px;
  background-repeat: no-repeat;
  border: 3px solid var(--printer-color-2);
  border-radius: 6px;
  box-sizing: border-box;
  box-shadow:
    -1px -1px 2px 0 #fff9 inset,
    1px 1px 5px 1px #000 inset,
    0 0 1px 2px #0002;
  font-family: "Courier New", Courier, monospace;
  font-size: 0.8em;
  color: #5aff5a;
  filter: drop-shadow(1px 1px 1px #0002);
}

.print-button {
  z-index: 2;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2em;
  position: absolute;
  top: -30px;
  right: 0;
  margin: 16px;
  border: 1px solid #0001;
  border-radius: 6px;
  width: 48px;
  height: 36px;
  background-color: var(--printer-color);
  box-shadow:
    1px 1px 2px 0 #fff8 inset,
    -1px -1px 2px 0 #0002 inset,
    0 2px 6px 0px #0002;
  transition: box-shadow 0.1s ease-in-out, transform 0.1s ease-in-out;
}

.print-button:hover {
  box-shadow:
    2px 2px 2px 0 #fff9 inset,
    -2px -2px 2px 0 #0002 inset,
    0 2px 10px 0px #0002;
  transform: scale(1.05);
}
.print-button:active,
.print-button:focus {
  box-shadow:
    2px 2px 2px 0 #0002 inset,
    -2px -2px 2px 0 #fff9 inset,
    0 0px 4px 0px #fff9;
  transform: scale(0.95);
  outline: none;
}

.receipt-wrapper {
  position: absolute;
  top: 0;
  left: 50%;
  margin-left: -100px;
  filter: drop-shadow(0 0 12px #0001);
  transform: translateY(-100%);
  clip-path: inset(100% -100px -100px -100px);
  transition: clip-path 0.5s;
}

.receipt {
  z-index: 2;
  position: relative;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  gap: 1em;
  padding: 16px;
  width: 200px;
  min-height: 160px;
  font-size: 0.75em;
  font-family: "Courier New", "Roboto Mono", monospace;
  font-weight: 400;
  color: #9ca3af;
  background-color: var(--receipt-color);
  box-shadow:
    0 12px 12px 0 #0002,
    0 24px 24px 0 #0003,
    0 36px 36px 0 #0004;
}

.receipt:hover {
  background-color: #1c1e22;
}

.receipt::before,
.receipt::after {
  --angle: 45deg;
  content: "";
  display: block;
  position: absolute;
  left: 0px;
  width: 100%;
  height: 8px;
  background: linear-gradient(
      calc(var(--angle) * -1),
      var(--receipt-color) 4px,
      transparent 0
    ),
    linear-gradient(var(--angle), var(--receipt-color) 4px, transparent 0);
  background-position: 4px 0;
  background-repeat: repeat-x;
  background-size: 8px 8px;
}
.receipt::before {
  top: -8px;
  background-position: 4px 0;
}
.receipt::after {
  bottom: -8px;
  background-position: 0 100%;
  --angle: 225deg;
}

.receipt-header,
.receipt-subheader,
.receipt-message {
  display: flex;
  justify-content: space-between;
  padding: 0.2em 0;
}

.receipt-header {
  font-size: 1.1em;
  font-weight: 600;
}
.receipt-subheader {
  border-bottom: 1px dashed #ccc;
}
.receipt-message {
  justify-content: center;
  text-align: center;
  padding: 0 1em;
}

.receipt-subtotal td {
  border-top: 1px dashed #ccc;
}
.receipt-total td {
  border-top: 1px dashed #ccc;
  font-weight: 600;
}

.receipt-table {
  font: inherit;
  color: inherit;
  text-align: left;
  line-height: 1.5em;
}
.receipt-table th:last-child,
.receipt-table td:last-child {
  text-align: right;
}

.letter-wrapper {
  position: inherit;
  display: flex;
}
.letter {
  display: inline-block;
  opacity: 0;
}

/* Animations */
.wrapper.is-open .receipt-wrapper {
  animation:
    print 1.2s 1 forwards ease-in,
    display 0.4s 1 forwards cubic-bezier(0, 0.63, 0.96, 1.1);
  animation-delay: 0s, 1.35s;
}

.wrapper.is-open .printer-message {
  opacity: 0;
}

.wrapper.is-open .letter:nth-child(1) { animation-delay: 0.05s; }
.wrapper.is-open .letter:nth-child(2) { animation-delay: 0.1s; }
.wrapper.is-open .letter:nth-child(3) { animation-delay: 0.15s; }
.wrapper.is-open .letter:nth-child(4) { animation-delay: 0.2s; }
.wrapper.is-open .letter:nth-child(5) { animation-delay: 0.25s; }
.wrapper.is-open .letter:nth-child(6) { animation-delay: 0.3s; }
.wrapper.is-open .letter:nth-child(7) { animation-delay: 0.35s; }
.wrapper.is-open .letter:nth-child(8) { animation-delay: 0.4s; }
.wrapper.is-open .letter:nth-child(9) { animation-delay: 0.45s; }
.wrapper.is-open .letter:nth-child(10) { animation-delay: 0.5s; }

.wrapper.is-open .letter {
  animation: show-text 0.6s 1 forwards linear;
}

@keyframes print {
  100% {
    transform: translateY(10%);
    clip-path: inset(-20% -100px -100px -100px);
  }
}

@keyframes display {
  30% {
    transform: translateY(22%) rotate3d(1, 0, 1, -5deg);
  }
  70% {
    z-index: 5;
  }
  100% {
    z-index: 5;
    transform: translateY(-40%) scale(1.2);
  }
}

@keyframes show-text {
  10%,
  100% {
    opacity: 1;
  }
}
`;

const ProjectCard: React.FC<ProjectCardProps> = ({ project, onOpenModal, isOpen, onToggle }) => {
  const displayTitle = project.title.toUpperCase();

  return (
    <>
      <style>{receiptStyles}</style>
      <div className="w-full flex justify-center py-6 h-[160px]">
        <div className={`wrapper ${isOpen ? 'is-open' : ''}`}>
          <div className="printer">
            
            <div className="printer-display flex items-center" title={displayTitle}>
              <span className="printer-message truncate w-full cursor-help">
                {displayTitle}
              </span>
              <span className="letter-wrapper absolute top-1.5 left-2 pointer-events-none">
                {"PRINTING...".split('').map((char, i) => <span key={i} className="letter">{char}</span>)}
              </span>
            </div>
            <button className="print-button" onClick={(e) => { e.stopPropagation(); onToggle(); }}>🖨️</button>
            
            <div className="receipt-wrapper">
              <div className="receipt cursor-default">
                <div className="receipt-header">
                  <span className="truncate max-w-[120px]">{project.title}</span>
                  <span>#{project.indexNum}</span>
                </div>
                <div className="receipt-subheader">
                   <span className="truncate">{project.category}</span>
                </div>
                <table className="receipt-table text-[10px]">
                  <tbody>
                    <tr><td>Status</td><td>{project.isProduction ? 'Live' : 'OSS'}</td></tr>
                    {project.tags.slice(0, 3).map((tag, i) => (
                       <tr key={i}><td>Tag {i+1}</td><td>{tag.substring(0, 12)}</td></tr>
                    ))}
                  </tbody>
                </table>
                
                <div className="w-full border-t border-dashed border-zinc-700 my-1"></div>
                
                <div className="flex flex-col gap-1 w-full mt-1">
                  <button 
                    onClick={(e) => { e.stopPropagation(); onOpenModal(project); }}
                    className="w-full py-1 text-[10px] border border-zinc-700/80 hover:bg-zinc-800 uppercase font-bold tracking-wider rounded-sm transition-colors text-zinc-300"
                  >
                    More Info
                  </button>
                  
                  {(project.liveUrl || project.github) && (
                    <div className="flex gap-1 w-full">
                      {project.liveUrl && (
                        <a 
                          href={project.liveUrl}
                          target="_blank"
                          rel="noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="flex-1 py-1 text-center text-[9px] border border-zinc-700/80 hover:bg-zinc-800 uppercase font-bold tracking-wider rounded-sm transition-colors text-zinc-300"
                        >
                          Live
                        </a>
                      )}
                      {project.github && (
                        <a 
                          href={project.github}
                          target="_blank"
                          rel="noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="flex-1 py-1 text-center text-[9px] border border-zinc-700/80 hover:bg-zinc-800 uppercase font-bold tracking-wider rounded-sm transition-colors text-zinc-300"
                        >
                          Repo
                        </a>
                      )}
                    </div>
                  )}
                </div>
                
                <div className="receipt-message text-[10px] mt-1 font-bold opacity-60">
                   *** {project.company || "Independent"} ***
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
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

  const handleCopyClone = () => {
    if (!project) return;
    navigator.clipboard.writeText(`git clone ${project.github}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return createPortal(
    <AnimatePresence>
      {project && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
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
      )}
    </AnimatePresence>,
    document.body
  );
};

export const Projects: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<string>('All');
  const [selectedProject, setSelectedProject] = useState<ProjectCaseStudy | null>(null);
  const [openPrinterId, setOpenPrinterId] = useState<string | null>(null);

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
                className="w-full flex justify-center perspective-[1200px]"
              >
                <ProjectCard
                  project={project}
                  onOpenModal={(p) => setSelectedProject(p)}
                  isOpen={openPrinterId === project.id}
                  onToggle={() => setOpenPrinterId(openPrinterId === project.id ? null : project.id)}
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

