import React, { useState } from 'react';
import { SKILLS_DATA } from '../data/portfolioData';
import { Skill } from '../types';
import { Code2, Terminal, Check, Copy, X, Cpu, Layers } from 'lucide-react';

export const Skills: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeSnippetSkill, setActiveSnippetSkill] = useState<Skill | null>(null);
  const [copied, setCopied] = useState(false);

  const filteredSkills = SKILLS_DATA.filter((skill) => {
    if (selectedCategory === 'all') return true;
    return skill.category === selectedCategory;
  });

  const handleCopyCode = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="skills" className="py-20 px-4 sm:px-6 relative z-10 bg-[#0F172A]/80 border-y border-slate-800">
      <div className="max-w-7xl mx-auto space-y-10">
        
        {/* Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <p className="font-mono text-xs tracking-widest text-sky-400 uppercase mb-2">// 02 — Skills & Arsenal</p>
            <div className="w-12 h-1 bg-gradient-to-r from-sky-400 to-cyan-400 rounded-full mb-3"></div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-100 font-sans tracking-tight">
              Technical Stack & Proficiency
            </h2>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap gap-2 font-mono text-xs bg-[#1C2541] p-1.5 rounded-xl border border-slate-700/80">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-3.5 py-1.5 rounded-lg transition-all ${
                selectedCategory === 'all'
                  ? 'bg-sky-500 text-slate-900 font-bold shadow-md'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              All Skills
            </button>
            <button
              onClick={() => setSelectedCategory('core')}
              className={`px-3.5 py-1.5 rounded-lg transition-all ${
                selectedCategory === 'core'
                  ? 'bg-sky-500 text-slate-900 font-bold shadow-md'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Core & SQL
            </button>
            <button
              onClick={() => setSelectedCategory('ml')}
              className={`px-3.5 py-1.5 rounded-lg transition-all ${
                selectedCategory === 'ml'
                  ? 'bg-sky-500 text-slate-900 font-bold shadow-md'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              ML & EDA
            </button>
            <button
              onClick={() => setSelectedCategory('bi')}
              className={`px-3.5 py-1.5 rounded-lg transition-all ${
                selectedCategory === 'bi'
                  ? 'bg-sky-500 text-slate-900 font-bold shadow-md'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              BI & Tableau
            </button>
          </div>
        </div>

        {/* Skill Cards Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSkills.map((skill) => (
            <div
              key={skill.name}
              className="card-hover rounded-2xl p-6 flex flex-col justify-between space-y-4 group"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-xl bg-sky-500/10 border border-sky-500/20 flex items-center justify-center text-sky-400 text-xl group-hover:scale-110 transition-transform">
                      <i className={skill.icon}></i>
                    </div>
                    <div>
                      <h3 className="text-slate-100 font-bold text-lg font-sans">{skill.name}</h3>
                      <span className="text-[11px] font-mono text-slate-400 capitalize">{skill.category}</span>
                    </div>
                  </div>

                  <span className="font-mono text-xs font-bold text-sky-400 bg-sky-500/10 border border-sky-500/20 px-2.5 py-1 rounded-full">
                    {skill.level}%
                  </span>
                </div>

                <p className="text-slate-300 text-sm leading-relaxed font-sans">
                  {skill.description}
                </p>

                {/* Progress Bar */}
                <div className="space-y-1 pt-1">
                  <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                    <div
                      className="bg-gradient-to-r from-sky-400 to-cyan-400 h-full rounded-full transition-all duration-1000"
                      style={{ width: `${skill.level}%` }}
                    ></div>
                  </div>
                </div>
              </div>

              {/* Code Snippet Trigger */}
              {skill.snippet && (
                <button
                  onClick={() => setActiveSnippetSkill(skill)}
                  className="w-full mt-2 py-2 px-3 rounded-xl bg-[#0B132B] hover:bg-slate-800 border border-slate-700/80 hover:border-sky-500/50 text-sky-400 text-xs font-mono flex items-center justify-center gap-2 transition-all"
                >
                  <Code2 className="w-3.5 h-3.5" />
                  <span>Inspect {skill.name} Code Sample</span>
                </button>
              )}
            </div>
          ))}
        </div>

        {/* Code Snippet Viewer Modal */}
        {activeSnippetSkill && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <div className="bg-[#1C2541] border border-slate-700 rounded-2xl w-full max-w-2xl overflow-hidden shadow-2xl animate-in fade-in zoom-in duration-200">
              
              {/* Modal Header */}
              <div className="px-5 py-4 bg-[#0B132B] border-b border-slate-800 flex items-center justify-between font-mono text-xs">
                <div className="flex items-center gap-2 text-sky-400 font-semibold">
                  <Terminal className="w-4 h-4 text-sky-400" />
                  <span>{activeSnippetSkill.snippetTitle || `${activeSnippetSkill.name} Code Snippet`}</span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleCopyCode(activeSnippetSkill.snippet || '')}
                    className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs transition-colors"
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copied ? 'Copied!' : 'Copy'}</span>
                  </button>

                  <button
                    onClick={() => setActiveSnippetSkill(null)}
                    className="p-1 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-slate-200 transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Code Body */}
              <div className="p-5 bg-[#0B132B] max-h-[60vh] overflow-y-auto font-mono text-xs leading-relaxed text-slate-200">
                <pre className="whitespace-pre-wrap">{activeSnippetSkill.snippet}</pre>
              </div>

              <div className="px-5 py-3 bg-[#1C2541] border-t border-slate-800 flex justify-between items-center text-xs text-slate-400 font-mono">
                <span>Written & Verified by Rahul Mandal</span>
                <button
                  onClick={() => setActiveSnippetSkill(null)}
                  className="px-4 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold transition-colors"
                >
                  Close
                </button>
              </div>

            </div>
          </div>
        )}

      </div>
    </section>
  );
};
