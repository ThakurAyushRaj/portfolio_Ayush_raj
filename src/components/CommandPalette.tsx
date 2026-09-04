import React, { useState, useEffect, useRef, useId } from 'react';
import { Search, ArrowRight, Github, Mail, FileText, Code2, User, Briefcase, Sparkles, X, ExternalLink } from 'lucide-react';

interface CommandItem {
  id: string;
  title: string;
  category: 'Navigation' | 'Projects' | 'Links & Actions';
  icon: React.ReactNode;
  action: () => void;
  keywords?: string;
}

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const paletteId = useId();

  const handleScrollTo = (id: string) => {
    onClose();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleOpenLink = (url: string) => {
    onClose();
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const items: CommandItem[] = [
    // Navigation
    { id: 'nav-hero', title: 'Go to Top / Hero', category: 'Navigation', icon: <User className="w-4 h-4 text-blue-400" />, action: () => handleScrollTo('hero'), keywords: 'home top intro bio' },
    { id: 'nav-experience', title: 'Go to Experience', category: 'Navigation', icon: <Briefcase className="w-4 h-4 text-emerald-400" />, action: () => handleScrollTo('experience'), keywords: 'work sde internship job timeline' },
    { id: 'nav-projects', title: 'Go to Featured Projects', category: 'Navigation', icon: <Code2 className="w-4 h-4 text-indigo-400" />, action: () => handleScrollTo('projects'), keywords: 'case studies work apps repository' },
    { id: 'nav-skills', title: 'Go to Tech Stack & Skills', category: 'Navigation', icon: <Sparkles className="w-4 h-4 text-amber-400" />, action: () => handleScrollTo('skills'), keywords: 'react node typescript mern stack tools' },
    { id: 'nav-education', title: 'Go to Education & Degrees', category: 'Navigation', icon: <FileText className="w-4 h-4 text-purple-400" />, action: () => handleScrollTo('education'), keywords: 'btech college iimt bseb cbse degree academic' },
    { id: 'nav-contact', title: 'Go to Contact', category: 'Navigation', icon: <Mail className="w-4 h-4 text-cyan-400" />, action: () => handleScrollTo('contact'), keywords: 'email message hire touch connect' },

    // Projects
    { id: 'proj-crm', title: 'CRM Real Estate (aNquest Media)', category: 'Projects', icon: <Code2 className="w-4 h-4 text-blue-400" />, action: () => handleScrollTo('projects'), keywords: 'anquest crm real estate lead react node mongo' },
    { id: 'proj-emr', title: 'EMR Healthcare (aNquest Media)', category: 'Projects', icon: <Code2 className="w-4 h-4 text-emerald-400" />, action: () => handleScrollTo('projects'), keywords: 'anquest emr healthcare patient react node' },
    { id: 'proj-vobiz', title: 'In-App & Bridge Calling (Vobiz API)', category: 'Projects', icon: <Code2 className="w-4 h-4 text-cyan-400" />, action: () => handleScrollTo('projects'), keywords: 'vobiz voice calling bridge masked telephony' },
    { id: 'proj-whatsapp', title: 'WhatsApp Lead Automation', category: 'Projects', icon: <Code2 className="w-4 h-4 text-purple-400" />, action: () => handleScrollTo('projects'), keywords: 'meta whatsapp business api automation leads' },
    { id: 'proj-erp', title: 'ERP Website System (Live App)', category: 'Projects', icon: <ExternalLink className="w-4 h-4 text-emerald-400" />, action: () => handleOpenLink('https://erp-website-gamma.vercel.app/'), keywords: 'mern typescript dashboard finance hr erp website live' },
    { id: 'proj-erp-gh', title: 'ERP Website System (GitHub Repo)', category: 'Projects', icon: <Github className="w-4 h-4 text-zinc-300" />, action: () => handleOpenLink('https://github.com/ThakurAyushRaj/ERP-Website'), keywords: 'erp website github repo code clone' },
    { id: 'proj-slack', title: 'Slack Attendance Bot (GitHub Repo)', category: 'Projects', icon: <Github className="w-4 h-4 text-emerald-400" />, action: () => handleOpenLink('https://github.com/ThakurAyushRaj/SLACK-ATTENDANCE'), keywords: 'node express slack api sheets attendance bot github clone' },
    { id: 'proj-attendance', title: 'Attendance Tracker App (GitHub Repo)', category: 'Projects', icon: <Github className="w-4 h-4 text-purple-400" />, action: () => handleOpenLink('https://github.com/ThakurAyushRaj/Google-Auth_FCM-Notification_Admin-Pannel_Attendence-Tracker_App-React-Native-'), keywords: 'react native firebase fcm notifications attendance tracker google auth admin panel github clone' },
    { id: 'proj-calendar', title: 'Google Calendar To-Do App (GitHub Repo)', category: 'Projects', icon: <Github className="w-4 h-4 text-rose-400" />, action: () => handleOpenLink('https://github.com/ThakurAyushRaj/Google-Calender-Intregeted-To-Do-App-React-Native-'), keywords: 'react native google calendar to do app task manager expo github clone' },
    { id: 'proj-blog', title: 'Animated Blog Website (Live App)', category: 'Projects', icon: <ExternalLink className="w-4 h-4 text-amber-400" />, action: () => handleOpenLink('https://blog-website-murex-sigma.vercel.app/'), keywords: 'react tailwind framer motion blog live website' },
    { id: 'proj-blog-gh', title: 'Animated Blog Website (GitHub Repo)', category: 'Projects', icon: <Github className="w-4 h-4 text-zinc-300" />, action: () => handleOpenLink('https://github.com/ThakurAyushRaj/Blog-Website'), keywords: 'react blog website github repo code clone' },

    // Links & Actions
    { id: 'link-github', title: 'GitHub Profile (ThakurAyushRaj)', category: 'Links & Actions', icon: <Github className="w-4 h-4 text-zinc-300" />, action: () => handleOpenLink('https://github.com/ThakurAyushRaj'), keywords: 'code repos thakurayushraj' },
    { id: 'link-linkedin', title: 'LinkedIn Profile (Ayush Raj)', category: 'Links & Actions', icon: <User className="w-4 h-4 text-blue-400" />, action: () => handleOpenLink('https://www.linkedin.com/in/ayush-raj-8348a9260'), keywords: 'linkedin network profile' },
    { id: 'link-email', title: 'Send Direct Email (rajayush226@gmail.com)', category: 'Links & Actions', icon: <Mail className="w-4 h-4 text-cyan-400" />, action: () => handleOpenLink('mailto:rajayush226@gmail.com'), keywords: 'mail message contact rajayush226' },
    { id: 'link-resume', title: 'Download Official Resume / CV', category: 'Links & Actions', icon: <FileText className="w-4 h-4 text-emerald-400" />, action: () => handleScrollTo('experience'), keywords: 'cv resume pdf download' },
  ];

  const filteredItems = items.filter(item => {
    const searchStr = `${item.title} ${item.category} ${item.keywords || ''}`.toLowerCase();
    return searchStr.includes(query.toLowerCase());
  });

  // Focus input when modal opens
  useEffect(() => {
    if (isOpen) {
      setQuery('');
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  // Keyboard trap and navigation
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex(prev => (prev < filteredItems.length - 1 ? prev + 1 : 0));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex(prev => (prev > 0 ? prev - 1 : filteredItems.length - 1));
      } else if (e.key === 'Enter') {
        e.preventDefault();
        if (filteredItems[selectedIndex]) {
          filteredItems[selectedIndex].action();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, filteredItems, selectedIndex, onClose]);

  // Keep scroll focused on selected item
  useEffect(() => {
    if (listRef.current) {
      const selectedEl = listRef.current.children[selectedIndex] as HTMLElement;
      if (selectedEl) {
        selectedEl.scrollIntoView({ block: 'nearest' });
      }
    }
  }, [selectedIndex]);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby={`${paletteId}-title`}
      className="fixed inset-0 z-50 flex items-start justify-center pt-16 md:pt-24 px-4 bg-zinc-950/80 backdrop-blur-sm transition-opacity"
      onClick={onClose}
    >
      <div
        className="w-full max-w-xl bg-zinc-900 border border-zinc-800 rounded-xl shadow-2xl overflow-hidden flex flex-col max-h-[80vh] relative animate-in fade-in zoom-in-95 duration-150"
        onClick={e => e.stopPropagation()}
      >
        {/* Header Search Input */}
        <div className="flex items-center px-4 border-b border-zinc-800 bg-zinc-900/90">
          <Search className="w-5 h-5 text-zinc-400 mr-3 flex-shrink-0" />
          <input
            ref={inputRef}
            id={`${paletteId}-title`}
            type="text"
            placeholder="Type a command or search section..."
            value={query}
            onChange={e => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            className="w-full py-4 bg-transparent text-zinc-100 placeholder-zinc-500 focus:outline-none text-base"
            aria-label="Command search"
          />
          <button
            onClick={onClose}
            className="p-1 rounded-md text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
            aria-label="Close command palette"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Results List */}
        <div ref={listRef} className="overflow-y-auto p-2 space-y-1 divide-y divide-zinc-800/40">
          {filteredItems.length === 0 ? (
            <div className="py-12 text-center text-zinc-500 text-sm">
              No matching commands or sections found for "{query}"
            </div>
          ) : (
            filteredItems.map((item, index) => {
              const isSelected = index === selectedIndex;
              return (
                <button
                  key={item.id}
                  onClick={() => item.action()}
                  onMouseEnter={() => setSelectedIndex(index)}
                  className={`w-full flex items-center justify-between px-3 py-3 rounded-lg text-left transition-colors text-sm min-h-[44px] ${
                    isSelected
                      ? 'bg-blue-600/20 text-white border border-blue-500/30'
                      : 'text-zinc-300 hover:bg-zinc-800/50 hover:text-white border border-transparent'
                  }`}
                  aria-selected={isSelected}
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-md bg-zinc-800/80 border border-zinc-700/50">
                      {item.icon}
                    </div>
                    <div>
                      <div className="font-medium text-zinc-100">{item.title}</div>
                      <div className="text-xs text-zinc-500 font-mono">{item.category}</div>
                    </div>
                  </div>
                  <div className="flex items-center text-xs text-zinc-500 gap-1 font-mono">
                    <span>Select</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </button>
              );
            })
          )}
        </div>

        {/* Footer shortcuts */}
        <div className="px-4 py-2.5 bg-zinc-950/80 border-t border-zinc-800 flex items-center justify-between text-xs text-zinc-400 font-mono">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 rounded bg-zinc-800 border border-zinc-700 text-zinc-300">↑</kbd>
              <kbd className="px-1.5 py-0.5 rounded bg-zinc-800 border border-zinc-700 text-zinc-300">↓</kbd>
              Navigate
            </span>
            <span className="flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 rounded bg-zinc-800 border border-zinc-700 text-zinc-300">↵</kbd>
              Execute
            </span>
          </div>
          <span className="flex items-center gap-1">
            <kbd className="px-1.5 py-0.5 rounded bg-zinc-800 border border-zinc-700 text-zinc-300">ESC</kbd>
            Close
          </span>
        </div>
      </div>
    </div>
  );
};
