import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Github, Check, ArrowUpRight, AlertTriangle, ShieldCheck, Cpu, Copy, Layers, X, BookOpen, ExternalLink, Smartphone, LayoutGrid, Building2, Bot, Code2 } from 'lucide-react';
import { GlassIcons, GlassIconsItem } from '@/components/ui/glass-icons';

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
  cloneUrl?: string;
  liveUrl?: string;
  category: 'Production / aNquest' | 'Full Stack' | 'Automation / Bot' | 'Mobile App' | 'Frontend';
  colorFrom: string;
  colorTo: string;
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
.card {
  width: 100%;
  max-width: 370px;
  height: 270px;
  position: relative;
  display: flex;
  justify-content: center;
  padding: 20px;
  border-radius: 15px;
  transition: all 0.5s ease;
  margin: 0 auto;
}

.card::before {
  content: attr(data-category);
  position: absolute;
  width: auto;
  min-width: 60px;
  padding: 0 10px;
  height: 40px;
  background-color: #0f172a;
  top: -10px;
  left: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-size: 10px;
  font-weight: bold;
  text-transform: uppercase;
  transition: all 0.5s ease;
  box-sizing: border-box;
}

.card::after {
  content: '';
  position: absolute;
  top: -10px;
  left: 10px;
  width: 0;
  height: 0;
  border-left: 10px solid transparent;
  border-right: 10px solid transparent;
  border-top: 10px solid #020617;
  transform: translateY(40px);
  z-index: -1;
  transition: all 0.5s ease;
}

.svg-icon {
  width: 5em;
  height: 5em;
  fill: rgba(255, 255, 255, 0.15);
}

.projectSvgContainer {
  height: 100px;
  width: 100px;
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
}

.projectSvgContainer svg {
  position: absolute;
  overflow: visible;
}

.dartboard {
  width: 2em;
  height: 2em;
  padding: 6px;
  border: 3px solid rgba(255, 255, 255, 0.15);
  border-radius: 50%;
  transition: all 0.5s ease;
  transform: scale(2) rotate(34deg);
}

.eyehole {
  transform: scale(1.2) rotate(-270deg);
  transition: all 0.5s ease;
}

.batman {
  transition: all .4s ease-in;
  transform: rotate(55deg) translate(240px, -45px) scale(1.2);
}

.svg-fill-primary {
  fill: rgba(255, 255, 255, 0.2);
}

.card-info {
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  text-align: center;
  gap: 10px;
  align-items: center;
  height: 100%;
}

.card span.card-title {
  font-size: 20px;
  font-weight: 800;
  text-transform: uppercase;
  color: #f8fafc;
  line-height: 1.1;
  text-shadow: 0 1px 3px rgba(0,0,0,0.8);
}

.card-info p {
  color: #cbd5e1;
  font-weight: 500;
  font-size: 13px;
  margin: 0;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.card-info .challengeButton {
  text-decoration: none;
  background-color: rgba(255,255,255,0.1);
  color: white;
  padding: 6px 18px;
  border-radius: 10px;
  box-sizing: border-box;
  transition: all 0.5s ease;
  border: 1px solid rgba(255,255,255,0.2);
  cursor: pointer;
  font-weight: bold;
  font-size: 12px;
  text-transform: uppercase;
}

.card:hover {
  box-shadow: 10px 10px 15px 0px rgba(0,0,0,0.5);
}

.card:hover .batman {
  transform: rotate(-50deg) translate(12px, 2px);
}

.card:hover .eyehole {
  transform: scale(1);
}

.card:hover .dartboard {
  transform: scale(1) rotate(0deg) translate(0, 0);
}

.challengeButton:hover {
  background-color: rgba(255,255,255,0.25);
}

.card:hover::before {
  background-color: #020617;
  top: -15px;
}
.card:hover::after {
  transform: translateY(45px);
}
`;

const ProjectCard: React.FC<ProjectCardProps> = ({ project, onOpenModal }) => {
  return (
    <>
      <style>{receiptStyles}</style>
      <div 
        className="card" 
        data-category={project.category} 
        style={{ background: `linear-gradient(120deg, ${project.colorFrom} 0%, ${project.colorTo} 100%)` }}
      >
        <div className="projectSvgContainer">
          <svg className="svg-icon dartboard" viewBox="0 0 20 20">
            <path d="M14.613,10c0,0.23-0.188,0.419-0.419,0.419H10.42v3.774c0,0.23-0.189,0.42-0.42,0.42s-0.419-0.189-0.419-0.42v-3.774H5.806c-0.23,0-0.419-0.189-0.419-0.419s0.189-0.419,0.419-0.419h3.775V5.806c0-0.23,0.189-0.419,0.419-0.419s0.42,0.189,0.42,0.419v3.775h3.774C14.425,9.581,14.613,9.77,14.613,10 M17.969,10c0,4.401-3.567,7.969-7.969,7.969c-4.402,0-7.969-3.567-7.969-7.969c0-4.402,3.567-7.969,7.969-7.969C14.401,2.031,17.969,5.598,17.969,10 M17.13,10c0-3.932-3.198-7.13-7.13-7.13S2.87,6.068,2.87,10c0,3.933,3.198,7.13,7.13,7.13S17.13,13.933,17.13,10"></path>
          </svg>
          <svg className="svg-icon eyehole" viewBox="0 0 20 20">
            <path d="M17.659,9.597h-1.224c-0.199-3.235-2.797-5.833-6.032-6.033V2.341c0-0.222-0.182-0.403-0.403-0.403S9.597,2.119,9.597,2.341v1.223c-3.235,0.2-5.833,2.798-6.033,6.033H2.341c-0.222,0-0.403,0.182-0.403,0.403s0.182,0.403,0.403,0.403h1.223c0.2,3.235,2.798,5.833,6.033,6.032v1.224c0,0.222,0.182,0.403,0.403,0.403s0.403-0.182,0.403-0.403v-1.224c3.235-0.199,5.833-2.797,6.032-6.032h1.224c0.222,0,0.403-0.182,0.403-0.403S17.881,9.597,17.659,9.597 M14.435,10.403h1.193c-0.198,2.791-2.434,5.026-5.225,5.225v-1.193c0-0.222-0.182-0.403-0.403-0.403s-0.403,0.182-0.403,0.403v1.193c-2.792-0.198-5.027-2.434-5.224-5.225h1.193c0.222,0,0.403-0.182,0.403-0.403S5.787,9.597,5.565,9.597H4.373C4.57,6.805,6.805,4.57,9.597,4.373v1.193c0,0.222,0.182,0.403,0.403,0.403s0.403-0.182,0.403-0.403V4.373c2.791,0.197,5.026,2.433,5.225,5.224h-1.193c-0.222,0-0.403,0.182-0.403,0.403S14.213,10.403,14.435,10.403"></path>
          </svg>
          <svg className="svg-icon batman">
            <path className="svg-fill-primary" d="M86.578,41.004s-8.219,.295-8.607,7.685c0,0-9.824-4.379-11.571,7.874,0,0-8.653-5.402-14.586,9.744l-1.861-3.908-1.861,3.908c-5.933-15.146-14.586-9.744-14.586-9.744-1.752-12.253-11.571-7.874-11.571-7.874-.366-6.927-7.609-7.621-8.514-7.68,11.643,.442,15.904-7.314,15.904-7.314,3.015,13.499,14.097,14.603,14.097,14.603l2.43-9.335,1.461,4.379h5.28l1.457-4.379,2.43,9.335s11.087-1.103,14.102-14.603c0,0,4.282,7.798,15.996,7.31Z"></path>
          </svg>
        </div>
        <div className="card-info">
          <span className="card-title">{project.title}</span>
          <p>{project.subtitle}</p>
          <div className="flex items-center gap-2 mt-1">
            <button onClick={() => onOpenModal(project)} className="challengeButton">More Info</button>
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noreferrer"
                className="p-2 rounded-xl bg-white/10 hover:bg-emerald-500/30 text-white hover:text-emerald-300 border border-white/20 hover:border-emerald-500/40 transition-colors inline-flex items-center justify-center"
                title="Live Demo"
                onClick={(e) => e.stopPropagation()}
              >
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}
            <a
              href={project.github}
              target="_blank"
              rel="noreferrer"
              className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white border border-white/20 transition-colors inline-flex items-center justify-center"
              title="GitHub Repository"
              onClick={(e) => e.stopPropagation()}
            >
              <Github className="w-3.5 h-3.5" />
            </a>
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
    const targetClone = project.cloneUrl || (project.github.endsWith('.git') ? project.github : `${project.github}.git`);
    navigator.clipboard.writeText(`git clone ${targetClone}`);
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
            className="fixed inset-0 bg-white/80 dark:bg-black/85 backdrop-blur-md"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="relative w-full max-w-3xl bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-700/80 rounded-2xl shadow-2xl overflow-hidden z-10 my-8"
          >
          {/* Modal Header */}
          <div className="p-6 sm:p-8 bg-zinc-50 dark:bg-zinc-900/60 border-b border-zinc-200 dark:border-zinc-800 flex items-start justify-between gap-4">
            <div className="space-y-2">
              <h3 className="text-2xl sm:text-3xl font-display font-extrabold text-zinc-900 dark:text-white">
                {project.title}
              </h3>
              <p className="text-sm font-mono text-zinc-600 dark:text-zinc-400">
                {project.subtitle}
              </p>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-zinc-100 dark:bg-zinc-800/80 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors border border-zinc-200 dark:border-zinc-700/60"
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
                <div key={i} className="p-3 rounded-xl bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 text-center space-y-1">
                  <div className="text-xs font-mono text-zinc-500 dark:text-zinc-400 uppercase">{metric.label}</div>
                  <div className="text-base sm:text-lg font-bold font-mono text-cyan-600 dark:text-cyan-400">{metric.value}</div>
                </div>
              ))}
            </div>

            {/* Architecture Overview */}
            <div className="space-y-2">
              <div className="text-xs font-mono font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider flex items-center gap-1.5">
                <Layers className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
                <span>System Architecture Overview</span>
              </div>
              <p className="text-zinc-700 dark:text-zinc-300 text-sm leading-relaxed">
                {project.description}
              </p>
            </div>

            {/* Problem & Engineering Solution */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-rose-50 dark:bg-rose-950/15 border border-rose-200 dark:border-rose-500/25 space-y-2">
                <div className="flex items-center gap-2 text-xs font-mono font-bold text-rose-600 dark:text-rose-400 uppercase">
                  <AlertTriangle className="w-4 h-4" />
                  <span>Engineering Challenge</span>
                </div>
                <p className="text-xs text-zinc-700 dark:text-zinc-300 leading-relaxed">
                  {project.problem}
                </p>
              </div>

              <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/15 border border-emerald-200 dark:border-emerald-500/25 space-y-2">
                <div className="flex items-center gap-2 text-xs font-mono font-bold text-emerald-600 dark:text-emerald-400 uppercase">
                  <ShieldCheck className="w-4 h-4" />
                  <span>Architectural Solution</span>
                </div>
                <p className="text-xs text-zinc-700 dark:text-zinc-300 leading-relaxed">
                  {project.solution}
                </p>
              </div>
            </div>

            {/* Key Technical Features */}
            <div className="space-y-3">
              <div className="text-xs font-mono font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider flex items-center gap-1.5">
                <Cpu className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
                <span>Key Technical Capabilities</span>
              </div>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {project.features.map((feat, i) => (
                  <li key={i} className="flex items-start gap-2.5 p-2 rounded-lg bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-200 dark:border-zinc-800 text-xs text-zinc-700 dark:text-zinc-300">
                    <Check className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400 flex-shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Engineering Contribution */}
            <div className="p-4 rounded-xl bg-zinc-50 dark:bg-zinc-900/80 border border-zinc-200 dark:border-zinc-700/80 text-xs text-zinc-700 dark:text-zinc-300 space-y-1">
              <span className="font-mono text-cyan-600 dark:text-cyan-400 font-semibold uppercase tracking-wider block">Engineering Role & Contribution:</span>
              <p className="leading-relaxed">{project.contribution}</p>
            </div>

            {/* Technology Tags */}
            <div className="space-y-2 pt-2 border-t border-zinc-200 dark:border-zinc-800/80">
              <div className="text-xs font-mono font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
                Technology Stack
              </div>
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 text-xs font-mono rounded-lg bg-zinc-100 dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-700"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Modal Footer Actions */}
          <div className="p-6 bg-zinc-50 dark:bg-zinc-900 border-t border-zinc-200 dark:border-zinc-800 flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex items-center gap-3 w-full sm:w-auto">
              <a
                href={project.github}
                target="_blank"
                rel="noreferrer"
                className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-cyan-600 dark:bg-cyan-500 hover:bg-cyan-700 dark:hover:bg-cyan-400 text-xs font-bold font-mono text-white dark:text-zinc-950 transition-colors shadow-lg shadow-cyan-500/25"
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
                  className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-950/30 hover:bg-emerald-900/40 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30 text-xs font-bold font-mono transition-colors"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span>Live Demo</span>
                </a>
              )}
            </div>

            <button
              type="button"
              onClick={handleCopyClone}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 border border-zinc-200 dark:border-zinc-700/80 text-xs font-mono text-zinc-600 dark:text-zinc-300 transition-colors"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-emerald-500" />
                  <span className="text-emerald-500">Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
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
      category: 'Production / aNquest',
      colorFrom: '#1e3a8a',
      colorTo: '#172554'
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
      category: 'Production / aNquest',
      colorFrom: '#134e4a',
      colorTo: '#042f2e'
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
      category: 'Production / aNquest',
      colorFrom: '#4c1d95',
      colorTo: '#2e1065'
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
      category: 'Production / aNquest',
      colorFrom: '#064e3b',
      colorTo: '#022c22'
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
      cloneUrl: 'https://github.com/ThakurAyushRaj/ERP-Website.git',
      liveUrl: 'https://erp-website-gamma.vercel.app/',
      category: 'Full Stack',
      colorFrom: '#78350f',
      colorTo: '#451a03'
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
      cloneUrl: 'https://github.com/ThakurAyushRaj/SLACK-ATTENDANCE.git',
      category: 'Automation / Bot',
      colorFrom: '#0f766e',
      colorTo: '#042f2e'
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
      category: 'Mobile App',
      colorFrom: '#27272a',
      colorTo: '#18181b'
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
      category: 'Mobile App',
      colorFrom: '#881337',
      colorTo: '#4c0519'
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
      category: 'Frontend',
      colorFrom: '#0f172a',
      colorTo: '#020617'
    }
  ];

  const filteredProjects = activeFilter === 'All' ? caseStudies : caseStudies.filter(p => p.category === activeFilter);

  const glassItems: GlassIconsItem[] = [
    {
      icon: <LayoutGrid className="w-6 h-6 text-white" />,
      color: 'slate',
      label: 'All',
      onClick: () => setActiveFilter('All')
    },
    {
      icon: <Building2 className="w-6 h-6 text-white" />,
      color: 'blue',
      label: 'aNquest',
      onClick: () => setActiveFilter('Production / aNquest')
    },
    {
      icon: <Layers className="w-6 h-6 text-white" />,
      color: 'purple',
      label: 'Full Stack',
      onClick: () => setActiveFilter('Full Stack')
    },
    {
      icon: <Bot className="w-6 h-6 text-white" />,
      color: 'green',
      label: 'Automation',
      onClick: () => setActiveFilter('Automation / Bot')
    },
    {
      icon: <Smartphone className="w-6 h-6 text-white" />,
      color: 'indigo',
      label: 'Mobile',
      onClick: () => setActiveFilter('Mobile App')
    },
    {
      icon: <Code2 className="w-6 h-6 text-white" />,
      color: 'orange',
      label: 'Frontend',
      onClick: () => setActiveFilter('Frontend')
    }
  ];

  return (
    <section id="projects" className="py-24 border-t border-zinc-200 dark:border-zinc-900/80 relative">
      {/* Background ambient radial light */}
      <div className="absolute top-1/2 right-0 w-[500px] h-[350px] bg-blue-600/10 blur-[140px] rounded-full pointer-events-none -z-10" />
      <div className="absolute bottom-10 left-10 w-[400px] h-[300px] bg-cyan-600/10 blur-[130px] rounded-full pointer-events-none -z-10" />

      <div className="space-y-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-xs font-mono text-cyan-600 dark:text-cyan-400 backdrop-blur-md">
              <BookOpen className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
              <span>3D Architecture Dossiers</span>
            </div>
            <h2 className="text-4xl sm:text-5xl font-display font-extrabold text-zinc-900 dark:text-white tracking-tight">
              Production & Case <span className="text-gradient-multi">Studies</span>
            </h2>
            <p className="text-zinc-600 dark:text-zinc-300 max-w-2xl text-base leading-relaxed">
              Explore the professional software platforms built at <strong className="text-zinc-900 dark:text-zinc-200 font-semibold">aNquest Media</strong> and independent engineering blueprints across full-stack, mobile, and telecommunication systems.
            </p>
          </div>

          <a
            href="https://github.com/ThakurAyushRaj"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2.5 px-5 py-3 rounded-xl bg-white dark:bg-zinc-900 hover:bg-zinc-50 dark:hover:bg-zinc-800 border border-zinc-200 dark:border-zinc-700/80 text-xs font-mono text-zinc-700 dark:text-zinc-200 hover:text-zinc-900 dark:hover:text-white transition-all shadow-md hover:-translate-y-0.5 w-max min-h-[44px]"
          >
            <Github className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
            <span>View All GitHub Repos</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* GlassIcons Interactive Filter Bar replaces old text pills */}
        <div className="w-full">
          <GlassIcons items={glassItems} className="my-2" />
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

