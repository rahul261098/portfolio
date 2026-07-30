import React, { useState, useEffect } from 'react';
import { Bot, FileText, Menu, X, Sparkles, MessageSquare } from 'lucide-react';

interface NavbarProps {
  onOpenAiAssistant: () => void;
  onOpenResume: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenAiAssistant, onOpenResume }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 px-4 sm:px-6 py-4 transition-all duration-300 ${
        scrolled
          ? 'bg-[#0B132B]/90 backdrop-blur-md shadow-2xl border-b border-slate-800'
          : 'bg-transparent'
      }`}
    >
      <nav className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Brand */}
        <a
          href="#hero"
          className="font-mono text-sm sm:text-base font-bold tracking-wider text-white hover:text-sky-400 transition-colors flex items-center gap-2.5 group"
        >
          <span className="w-2.5 h-2.5 rounded-full bg-sky-400 inline-block shadow-[0_0_10px_#38BDF8] group-hover:scale-125 transition-transform"></span>
          <span>RAHUL MANDAL</span>
          <span className="text-xs px-2 py-0.5 rounded-full bg-sky-500/10 text-sky-400 border border-sky-500/20 font-sans hidden sm:inline-block">
            Data Scientist
          </span>
        </a>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-7 text-xs font-mono tracking-wider text-slate-300">
          <a href="#about" className="hover:text-sky-400 transition-colors relative py-1 hover:after:w-full after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-sky-400 after:transition-all">
            // About
          </a>
          <a href="#skills" className="hover:text-sky-400 transition-colors relative py-1 hover:after:w-full after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-sky-400 after:transition-all">
            // Skills
          </a>
          <a href="#projects" className="hover:text-sky-400 transition-colors relative py-1 hover:after:w-full after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-sky-400 after:transition-all">
            // Projects
          </a>
          <a href="#simulators" className="hover:text-sky-400 transition-colors relative py-1 hover:after:w-full after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-sky-400 after:transition-all">
            // Simulators
          </a>
          <a href="#education" className="hover:text-sky-400 transition-colors relative py-1 hover:after:w-full after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-sky-400 after:transition-all">
            // Education
          </a>
          <a href="#contact" className="hover:text-sky-400 transition-colors relative py-1 hover:after:w-full after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-sky-400 after:transition-all">
            // Contact
          </a>
        </div>

        {/* Action Buttons */}
        <div className="hidden lg:flex items-center gap-3">
          <button
            onClick={onOpenAiAssistant}
            className="flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-sky-500/10 border border-sky-500/30 text-sky-400 hover:bg-sky-500/20 text-xs font-mono font-medium transition-all shadow-[0_0_12px_rgba(56,189,248,0.15)] active:scale-95"
          >
            <Sparkles className="w-3.5 h-3.5 text-sky-400 animate-pulse" />
            <span>AI Assistant</span>
          </button>

          <button
            onClick={onOpenResume}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-slate-800 border border-slate-700 text-slate-200 hover:border-sky-400 hover:text-sky-400 text-xs font-mono transition-all active:scale-95"
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Resume</span>
          </button>
        </div>

        {/* Mobile Hamburger Button */}
        <div className="flex items-center gap-2 md:hidden">
          <button
            onClick={onOpenAiAssistant}
            className="p-2 rounded-lg bg-sky-500/10 text-sky-400 border border-sky-500/30 text-xs"
            title="Ask AI Assistant"
          >
            <Sparkles className="w-4 h-4" />
          </button>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg bg-slate-800 text-slate-300 hover:text-sky-400 border border-slate-700"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden mt-3 p-4 bg-[#1C2541] border border-slate-700 rounded-xl shadow-2xl flex flex-col gap-3 font-mono text-sm">
          <a
            href="#about"
            onClick={() => setMobileMenuOpen(false)}
            className="px-3 py-2 rounded-lg text-slate-300 hover:bg-sky-500/10 hover:text-sky-400 transition-colors"
          >
            // About
          </a>
          <a
            href="#skills"
            onClick={() => setMobileMenuOpen(false)}
            className="px-3 py-2 rounded-lg text-slate-300 hover:bg-sky-500/10 hover:text-sky-400 transition-colors"
          >
            // Skills
          </a>
          <a
            href="#projects"
            onClick={() => setMobileMenuOpen(false)}
            className="px-3 py-2 rounded-lg text-slate-300 hover:bg-sky-500/10 hover:text-sky-400 transition-colors"
          >
            // Projects
          </a>
          <a
            href="#simulators"
            onClick={() => setMobileMenuOpen(false)}
            className="px-3 py-2 rounded-lg text-slate-300 hover:bg-sky-500/10 hover:text-sky-400 transition-colors"
          >
            // ML & BI Simulators
          </a>
          <a
            href="#education"
            onClick={() => setMobileMenuOpen(false)}
            className="px-3 py-2 rounded-lg text-slate-300 hover:bg-sky-500/10 hover:text-sky-400 transition-colors"
          >
            // Education & Credentials
          </a>
          <a
            href="#contact"
            onClick={() => setMobileMenuOpen(false)}
            className="px-3 py-2 rounded-lg text-slate-300 hover:bg-sky-500/10 hover:text-sky-400 transition-colors"
          >
            // Contact
          </a>

          <div className="pt-2 border-t border-slate-700 flex flex-col gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenAiAssistant();
              }}
              className="w-full py-2.5 rounded-lg bg-sky-500/20 text-sky-300 border border-sky-500/30 flex items-center justify-center gap-2 font-mono text-xs font-bold"
            >
              <Sparkles className="w-4 h-4 text-sky-400" />
              <span>Ask Rahul's AI Assistant</span>
            </button>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenResume();
              }}
              className="w-full py-2.5 rounded-lg bg-slate-800 text-slate-200 border border-slate-700 flex items-center justify-center gap-2 font-mono text-xs"
            >
              <FileText className="w-4 h-4" />
              <span>View Resume</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
