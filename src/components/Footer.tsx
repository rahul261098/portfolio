import React from 'react';
import { ArrowUp, Github, Linkedin, Mail } from 'lucide-react';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="py-8 px-4 sm:px-6 bg-[#0B132B] border-t border-slate-800 font-mono text-xs text-slate-400">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <span className="text-sky-400">&lt;</span>
          <span className="text-slate-200 font-bold">Rahul Mandal</span>
          <span className="text-sky-400">/&gt;</span>
          <span className="text-slate-500">| Data Scientist, Pune</span>
        </div>

        <p className="text-slate-500 text-center sm:text-left">
          © {new Date().getFullYear()} Rahul Mandal. Crafted with React, Tailwind & Python.
        </p>

        <div className="flex items-center gap-4">
          <a
            href="https://github.com/rahul261098"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-sky-400 transition-colors"
          >
            <Github className="w-4 h-4" />
          </a>
          <a
            href="https://www.linkedin.com/in/rahul-mandal-066231249/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-sky-400 transition-colors"
          >
            <Linkedin className="w-4 h-4" />
          </a>
          <a
            href="mailto:rahulmandalin1998@gmail.com"
            className="hover:text-sky-400 transition-colors"
          >
            <Mail className="w-4 h-4" />
          </a>

          <button
            onClick={scrollToTop}
            className="p-2 rounded-lg bg-[#1C2541] border border-slate-700 hover:border-sky-400 text-slate-300 hover:text-sky-400 transition-all ml-2"
            title="Scroll to Top"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>
      </div>
    </footer>
  );
};
