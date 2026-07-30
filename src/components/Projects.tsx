import React, { useState } from 'react';
import { PROJECTS_DATA } from '../data/portfolioData';
import { Project } from '../types';
import { Github, ExternalLink, Cpu, BarChart3, ChevronRight, CheckCircle2 } from 'lucide-react';

interface ProjectsProps {
  onSelectSimulator: (simType: 'ctc' | 'bike' | 'ipl' | 'wefit' | 'churn') => void;
}

export const Projects: React.FC<ProjectsProps> = ({ onSelectSimulator }) => {
  const [activeTab, setActiveTab] = useState<string>('all');

  const filteredProjects = PROJECTS_DATA.filter((proj) => {
    if (activeTab === 'all') return true;
    return proj.category === activeTab;
  });

  return (
    <section id="projects" className="py-20 px-4 sm:px-6 relative z-10 bg-[#0B132B]">
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <p className="font-mono text-xs tracking-widest text-sky-400 uppercase mb-2">// 03 — Featured Projects</p>
            <div className="w-12 h-1 bg-gradient-to-r from-sky-400 to-cyan-400 rounded-full mb-3"></div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-100 font-sans tracking-tight">
              Data Science & Analytics Case Studies
            </h2>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap gap-2 font-mono text-xs bg-[#1C2541] p-1.5 rounded-xl border border-slate-700/80">
            <button
              onClick={() => setActiveTab('all')}
              className={`px-3.5 py-1.5 rounded-lg transition-all ${
                activeTab === 'all'
                  ? 'bg-sky-500 text-slate-900 font-bold shadow-md'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              All Projects
            </button>
            <button
              onClick={() => setActiveTab('ml')}
              className={`px-3.5 py-1.5 rounded-lg transition-all ${
                activeTab === 'ml'
                  ? 'bg-sky-500 text-slate-900 font-bold shadow-md'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Machine Learning
            </button>
            <button
              onClick={() => setActiveTab('bi')}
              className={`px-3.5 py-1.5 rounded-lg transition-all ${
                activeTab === 'bi'
                  ? 'bg-sky-500 text-slate-900 font-bold shadow-md'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Tableau & BI
            </button>
            <button
              onClick={() => setActiveTab('sql')}
              className={`px-3.5 py-1.5 rounded-lg transition-all ${
                activeTab === 'sql'
                  ? 'bg-sky-500 text-slate-900 font-bold shadow-md'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              SQL & Strategy
            </button>
          </div>
        </div>

        {/* Projects Cards Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {filteredProjects.map((proj) => (
            <div
              key={proj.id}
              className="card-hover rounded-2xl p-7 flex flex-col justify-between space-y-6 relative group overflow-hidden"
            >
              {/* Top Accent Stripe */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-sky-400 via-cyan-400 to-indigo-500"></div>

              <div className="space-y-4">
                {/* Header Info */}
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-xl bg-sky-500/10 border border-sky-500/20 flex items-center justify-center text-sky-400 text-lg group-hover:scale-110 transition-transform">
                      <i className={`fa-solid ${proj.icon}`}></i>
                    </div>
                    <div>
                      <span className="font-mono text-[11px] text-sky-400 uppercase tracking-wider">{proj.categoryLabel}</span>
                      <h3 className="text-slate-100 font-bold text-xl font-sans mt-0.5">{proj.title}</h3>
                    </div>
                  </div>
                </div>

                {/* Description */}
                <p className="text-slate-300 text-sm leading-relaxed font-sans">
                  {proj.description}
                </p>

                {/* Key Achievements Bullet points */}
                <div className="space-y-2 pt-2">
                  {proj.bullets.map((bullet, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-300">
                      <ChevronRight className="w-4 h-4 text-sky-400 flex-shrink-0 mt-0.5" />
                      <span>{bullet}</span>
                    </div>
                  ))}
                </div>

                {/* Tag Pills */}
                <div className="flex flex-wrap gap-2 pt-2">
                  {proj.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2.5 py-1 rounded-full bg-sky-500/10 border border-sky-500/20 text-sky-300 font-mono text-[11px]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Bottom Actions */}
              <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between gap-3">
                <a
                  href={proj.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-xs font-mono text-slate-400 hover:text-sky-400 transition-colors"
                >
                  <Github className="w-4 h-4" />
                  <span>GitHub Repository</span>
                </a>

                {proj.hasSimulator && proj.simulatorType && (
                  <button
                    onClick={() => onSelectSimulator(proj.simulatorType!)}
                    className="btn-glow px-4 py-2 rounded-xl text-xs font-bold inline-flex items-center gap-2"
                  >
                    <Cpu className="w-3.5 h-3.5" />
                    <span>Launch Interactive Simulator</span>
                  </button>
                )}
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
