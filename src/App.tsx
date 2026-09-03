import { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import { Navbar } from '@/components/Navbar';
import { Hero } from '@/components/Hero';
import { Experience } from '@/components/Experience';
import { Projects } from '@/components/Projects';
import { Skills } from '@/components/Skills';
import { Education } from '@/components/Education';
import { Contact } from '@/components/Contact';
import { Footer } from '@/components/Footer';
import { CommandPalette } from '@/components/CommandPalette';
import { SplashCursor } from '@/components/ui/SplashCursor';
import { Hero3DInteractive } from '@/components/ui/Hero3DInteractive';
import { SplashScreen } from '@/components/SplashScreen';

function App() {
  const [appLoaded, setAppLoaded] = useState(false);
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false);
  const [isDark, setIsDark] = useState<boolean>(() => {
    const saved = localStorage.getItem('portfolio-theme');
    return saved !== null ? saved === 'dark' : true;
  });

  // Sync theme class on <html> element
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light');
      localStorage.setItem('portfolio-theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      document.documentElement.classList.add('light');
      localStorage.setItem('portfolio-theme', 'light');
    }
  }, [isDark]);

  // Keyboard shortcut listener for Cmd+K / Ctrl+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setCommandPaletteOpen(prev => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Simulate loading screen
  useEffect(() => {
    const timer = setTimeout(() => {
      setAppLoaded(true);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={`min-h-screen font-sans selection:bg-cyan-500/30 relative overflow-x-hidden transition-colors duration-500 ${
      isDark ? 'bg-black text-zinc-100' : 'bg-[#f8fafc] text-slate-900 light'
    }`}>
      <AnimatePresence mode="wait">
        {!appLoaded && <SplashScreen key="splash" />}
      </AnimatePresence>

      {/* Interactive 3D Sphere Background */}
      <Hero3DInteractive />

      {/* React Bits: Optimized Hardware-Accelerated Fluid Splash Cursor */}
      <SplashCursor
        SIM_RESOLUTION={64}
        DYE_RESOLUTION={512}
        PRESSURE_ITERATIONS={10}
        DENSITY_DISSIPATION={3.5}
        VELOCITY_DISSIPATION={2}
      />

      {/* Global Navbar with BB-8 Theme Switcher */}
      <Navbar
        onOpenCommandPalette={() => setCommandPaletteOpen(true)}
        isDark={isDark}
        onToggleTheme={(val) => setIsDark(val)}
      />

      {/* Main Page Layout Container */}
      <main className="max-w-6xl mx-auto px-4 md:px-6 relative z-10 space-y-12">
        <Hero />
        <Experience />
        <Projects />
        <Skills />
        <Education />
        <Contact />
      </main>

      {/* Footer */}
      <Footer />

      {/* Global Command Palette Modal */}
      <CommandPalette
        isOpen={commandPaletteOpen}
        onClose={() => setCommandPaletteOpen(false)}
      />
    </div>
  );
}

export default App;
