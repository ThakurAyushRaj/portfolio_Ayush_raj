import React, { useState, useEffect } from 'react';
import { Command, Menu, X, FileText, Code2, Briefcase, Sparkles, Mail, Download, Search, GraduationCap } from 'lucide-react';
import { ClawToggle } from '@/components/ui/ClawToggle';

interface NavbarProps {
  onOpenCommandPalette: () => void;
  isDark?: boolean;
  onToggleTheme?: (isDark: boolean) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenCommandPalette,
  isDark = true,
  onToggleTheme,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<'hero' | 'experience' | 'projects' | 'skills' | 'education' | 'contact'>('hero');
  const isClickScrollingRef = React.useRef(false);
  const scrollTimeoutRef = React.useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // 1. Lightweight requestAnimationFrame scroll listener ONLY for header backdrop
    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrolled = window.scrollY > 20;
          setIsScrolled((prev) => (prev !== scrolled ? scrolled : prev));
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });

    // 2. High-performance IntersectionObserver for Section Scroll-Spy (zero layout reflows)
    const sections: Array<'hero' | 'experience' | 'projects' | 'skills' | 'education' | 'contact'> = [
      'hero',
      'experience',
      'projects',
      'skills',
      'education',
      'contact',
    ];

    const observer = new IntersectionObserver(
      (entries) => {
        if (isClickScrollingRef.current) return;

        // Find visible sections
        const visibleEntries = entries.filter((e) => e.isIntersecting);
        if (visibleEntries.length > 0) {
          visibleEntries.sort((a, b) => b.intersectionRatio - a.intersectionRatio);
          const currentId = visibleEntries[0].target.id as 'experience' | 'projects' | 'skills' | 'education' | 'contact';
          if (sections.includes(currentId)) {
            setActiveSection(currentId);
          }
        }
      },
      {
        root: null,
        rootMargin: '-20% 0px -40% 0px',
        threshold: [0.15, 0.4],
      }
    );

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => {
      window.removeEventListener('scroll', onScroll);
      observer.disconnect();
      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
    };
  }, []);

  const navLinks = [
    { id: 'rd-1', section: 'experience' as const, name: 'Experience', href: '#experience', icon: <Briefcase className="w-4 h-4" /> },
    { id: 'rd-2', section: 'projects' as const, name: 'Projects', href: '#projects', icon: <Code2 className="w-4 h-4" /> },
    { id: 'rd-3', section: 'skills' as const, name: 'Skills', href: '#skills', icon: <Sparkles className="w-4 h-4" /> },
    { id: 'rd-4', section: 'education' as const, name: 'Education', href: '#education', icon: <GraduationCap className="w-4 h-4" /> },
    { id: 'rd-5', section: 'contact' as const, name: 'Contact', href: '#contact', icon: <Mail className="w-4 h-4" /> },
  ];

  const handleNavClick = (section: 'hero' | 'experience' | 'projects' | 'skills' | 'education' | 'contact') => {
    setActiveSection(section);
    setMobileMenuOpen(false);

    // Lock scroll spy listener while smooth scrolling completes
    isClickScrollingRef.current = true;
    if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
    scrollTimeoutRef.current = setTimeout(() => {
      isClickScrollingRef.current = false;
    }, 850);

    const element = document.getElementById(section);
    if (element) {
      const navOffset = 75;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-zinc-950/85 backdrop-blur-md border-b border-zinc-800/80 shadow-lg py-2.5'
          : 'bg-transparent py-4 border-b border-transparent'
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 md:px-6 flex items-center justify-between">
        {/* Brand Logo */}
        <a
          href="#hero"
          onClick={(e) => {
            e.preventDefault();
            const element = document.getElementById('hero');
            if (element) element.scrollIntoView({ behavior: 'smooth' });
          }}
          className="flex items-center gap-3 group text-zinc-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 rounded-lg p-1"
          aria-label="Ayush Raj Portfolio Home"
        >
          <img 
            src="/image_77dcd00e-removebg-preview.png" 
            alt="AR Logo" 
            className="w-[3.2rem] h-[3.2rem] object-contain group-hover:scale-105 transition-transform drop-shadow-[0_4px_10px_rgba(0,0,0,0.4)]"
          />
          <span className="font-display font-extrabold text-[1.4rem] tracking-tight text-white group-hover:opacity-90 transition-opacity">
            Ayush<span className="text-[#00e5ff]">.</span>Raj
          </span>
        </a>

        {/* Desktop Sliding Nav - From Uiverse.io by ilkhoeri */}
        <div className="hidden md:flex items-center">
          <div className="wrap">
            {/* Radio 1: About */}
            <input
              type="radio"
              name="header-nav"
              id="rd-1"
              className="rd-1"
              checked={activeSection === 'hero'}
              onChange={() => handleNavClick('hero')}
            />
            <label htmlFor="rd-1" className="label" onClick={() => handleNavClick('hero')}>
              <span>About</span>
            </label>

            {/* Radio 2: Experience */}
            <input
              type="radio"
              name="header-nav"
              id="rd-2"
              className="rd-2"
              checked={activeSection === 'experience'}
              onChange={() => handleNavClick('experience')}
            />
            <label htmlFor="rd-2" className="label" onClick={() => handleNavClick('experience')}>
              <span>Experience</span>
            </label>

            {/* Radio 3: Projects */}
            <input
              type="radio"
              name="header-nav"
              id="rd-3"
              className="rd-3"
              checked={activeSection === 'projects'}
              onChange={() => handleNavClick('projects')}
            />
            <label htmlFor="rd-3" className="label" onClick={() => handleNavClick('projects')}>
              <span>Projects</span>
            </label>

            {/* Radio 4: Skills */}
            <input
              type="radio"
              name="header-nav"
              id="rd-4"
              className="rd-4"
              checked={activeSection === 'skills'}
              onChange={() => handleNavClick('skills')}
            />
            <label htmlFor="rd-4" className="label" onClick={() => handleNavClick('skills')}>
              <span>Skills</span>
            </label>

            {/* Radio 5: Contact */}
            <input
              type="radio"
              name="header-nav"
              id="rd-5"
              className="rd-5"
              checked={activeSection === 'contact'}
              onChange={() => handleNavClick('contact')}
            />
            <label htmlFor="rd-5" className="label" onClick={() => handleNavClick('contact')}>
              <span>Contact</span>
            </label>

            {/* Sliding Top/Bottom Bars and Slidebar Indicator */}
            <div className="bar" />
            <div className="slidebar" />
          </div>
        </div>

        {/* Right CTA Actions */}
        <div className="flex items-center gap-3">
          {/* Celestial Theme Switch (Uiverse by mamyapro123) */}
          <div className="flex items-center">
            <ClawToggle
              isDark={isDark}
              onToggle={onToggleTheme || (() => {})}
              size="14px"
            />
          </div>

          {/* Uiverse Expandable Purple Spring Search Bar (boryanakrasteva) */}
          <div className="boryana-input-wrapper hidden sm:flex">
            <button
              className="boryana-icon"
              onClick={onOpenCommandPalette}
              aria-label="Open search palette"
              title="Click or press ⌘K to Search"
            >
              <Search className="w-4 h-4 text-white" />
            </button>
            <input
              placeholder="Search... ⌘K"
              className="boryana-input"
              name="search"
              type="text"
              readOnly
              onClick={onOpenCommandPalette}
              onFocus={onOpenCommandPalette}
            />
          </div>

          {/* Uiverse Emerald Rotating Download/Resume Button (Gaurang7717) */}
          <a
            href="https://github.com/ThakurAyushRaj"
            target="_blank"
            rel="noreferrer"
            className="Btn hidden sm:inline-flex"
            aria-label="Download Official Resume"
            title="Download Official Resume"
          >
            <div className="BG bg-download" />
            <div className="svgContainer">
              <Download className="w-4 h-4 text-white" />
            </div>
          </a>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-white min-h-[44px] min-w-[44px] flex items-center justify-center"
            aria-label={mobileMenuOpen ? 'Close Navigation Menu' : 'Open Navigation Menu'}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-zinc-950/95 border-b border-zinc-800 px-4 py-6 space-y-4 backdrop-blur-xl animate-in slide-in-from-top-5 duration-200">
          <nav className="flex flex-col space-y-2">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(link.section);
                }}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl border text-base font-medium min-h-[44px] transition-colors ${
                  activeSection === link.section
                    ? 'bg-zinc-900 text-cyan-400 border-cyan-500/30 font-semibold'
                    : 'text-zinc-300 hover:text-white hover:bg-zinc-900 border-transparent'
                }`}
              >
                <div className="p-1.5 rounded-md bg-zinc-900 text-cyan-400">
                  {link.icon}
                </div>
                {link.name}
              </a>
            ))}
          </nav>
          <div className="pt-4 border-t border-zinc-900 flex flex-col gap-3">
            <div className="flex items-center justify-between px-3 py-2 rounded-lg bg-zinc-900/60 border border-zinc-800">
              <span className="text-xs font-mono text-zinc-400">Cyber Theme Switch</span>
              <ClawToggle
                isDark={isDark}
                onToggle={onToggleTheme || (() => {})}
                size="4.6px"
              />
            </div>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenCommandPalette();
              }}
              className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-300 text-sm font-medium min-h-[44px]"
            >
              <Command className="w-4 h-4 text-cyan-400" />
              Open Command Menu (⌘K)
            </button>
            <a
              href="https://github.com/ThakurAyushRaj"
              target="_blank"
              rel="noreferrer"
              className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-zinc-950 text-sm font-bold min-h-[44px]"
            >
              <FileText className="w-4 h-4" />
              Download Resume
            </a>
          </div>
        </div>
      )}
    </header>
  );
};

