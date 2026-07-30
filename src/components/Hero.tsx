import React, { useState, useEffect } from 'react';
import { Sparkles, ArrowDown, Mail, Github, Linkedin, MessageSquare, Terminal, Award, Cpu } from 'lucide-react';

interface HeroProps {
  onOpenAiAssistant: () => void;
  onOpenResume: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenAiAssistant, onOpenResume }) => {
  const titles = ['Data Scientist', 'ML Engineer', 'BI Analyst', 'Python Developer'];
  const [titleIdx, setTitleIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const current = titles[titleIdx];
    const timeout = setTimeout(
      () => {
        if (!isDeleting) {
          if (charIdx < current.length) {
            setCharIdx((prev) => prev + 1);
          } else {
            setTimeout(() => setIsDeleting(true), 1800);
          }
        } else {
          if (charIdx > 0) {
            setCharIdx((prev) => prev - 1);
          } else {
            setIsDeleting(false);
            setTitleIdx((prev) => (prev + 1) % titles.length);
          }
        }
      },
      isDeleting ? 50 : 90
    );

    return () => clearTimeout(timeout);
  }, [charIdx, isDeleting, titleIdx]);

  return (
    <section id="hero" className="relative min-h-screen flex items-center pt-28 pb-16 px-4 sm:px-6 overflow-hidden bg-grid-pattern">
      <div className="hero-glow-left"></div>
      <div className="hero-glow-right"></div>

      <div className="max-w-7xl mx-auto w-full z-10">
        <div className="grid md:grid-cols-12 gap-10 items-center">
          
          {/* Left Column - Headline & Intro */}
          <div className="md:col-span-7 space-y-6">
            
            {/* Status Pill */}
            <div className="inline-flex items-center gap-2.5 bg-[#1C2541] border border-slate-700/80 rounded-full px-4 py-1.5 text-xs font-mono text-sky-400 shadow-md">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span>Available for Full-time Roles & Projects</span>
            </div>

            {/* Name */}
            <div>
              <h1 className="font-sans font-extrabold text-4xl sm:text-5xl lg:text-6xl text-slate-100 tracking-tight leading-none mb-3">
                Rahul <span className="text-sky-400 drop-shadow-[0_0_25px_rgba(56,189,248,0.4)]">Mandal</span>
              </h1>

              {/* Typewriter Subtitle */}
              <div className="font-mono text-lg sm:text-xl lg:text-2xl text-slate-400 flex items-center gap-2 h-9">
                <Terminal className="w-5 h-5 text-sky-400" />
                <span className="text-sky-300 font-semibold">
                  {titles[titleIdx].substring(0, charIdx)}
                </span>
                <span className="w-2 h-5 bg-sky-400 animate-pulse inline-block"></span>
              </div>
            </div>

            {/* Concise Bio */}
            <p className="text-slate-300 text-base sm:text-lg leading-relaxed max-w-2xl font-sans">
              Results-driven Data Scientist based in <strong className="text-sky-300">Pune, India</strong>. 
              Abeda Inamdar CS graduate specializing in translating complex raw datasets into predictive ML models, 
              SQL data models, and executive Tableau dashboards.
            </p>

            {/* Call To Action Buttons */}
            <div className="flex flex-wrap gap-3 pt-2">
              <a
                href="#simulators"
                className="btn-glow px-6 py-3 rounded-xl text-sm font-bold inline-flex items-center gap-2 group cursor-pointer"
              >
                <Cpu className="w-4 h-4 text-slate-900 group-hover:rotate-12 transition-transform" />
                <span>Try ML & BI Simulators</span>
              </a>

              <button
                onClick={onOpenAiAssistant}
                className="px-5 py-3 rounded-xl bg-sky-500/10 border border-sky-500/30 text-sky-400 hover:bg-sky-500/20 text-sm font-mono font-semibold inline-flex items-center gap-2 transition-all shadow-[0_0_15px_rgba(56,189,248,0.15)]"
              >
                <Sparkles className="w-4 h-4 text-sky-400 animate-pulse" />
                <span>Ask AI About Rahul</span>
              </button>

              <button
                onClick={onOpenResume}
                className="btn-outline px-5 py-3 rounded-xl text-sm font-semibold inline-flex items-center gap-2"
              >
                <span>View Resume</span>
              </button>
            </div>

            {/* Social Channels */}
            <div className="pt-4 flex flex-wrap items-center gap-3 font-mono text-xs text-slate-400">
              <a
                href="https://github.com/rahul261098"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-3.5 py-2 rounded-lg bg-[#1C2541] border border-slate-700 hover:border-sky-400 hover:text-sky-400 transition-all"
              >
                <Github className="w-4 h-4" />
                <span>github.com/rahul261098</span>
              </a>

              <a
                href="https://www.linkedin.com/in/rahul-mandal-066231249/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-3.5 py-2 rounded-lg bg-[#1C2541] border border-slate-700 hover:border-sky-400 hover:text-sky-400 transition-all"
              >
                <Linkedin className="w-4 h-4" />
                <span>LinkedIn</span>
              </a>

              <a
                href="https://wa.link/p1uoki"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-3.5 py-2 rounded-lg bg-[#1C2541] border border-slate-700 hover:border-emerald-400 hover:text-emerald-400 transition-all"
              >
                <i className="fa-brands fa-whatsapp text-emerald-400 text-sm"></i>
                <span>WhatsApp</span>
              </a>
            </div>

          </div>

          {/* Right Column - Developer Visual & Stats */}
          <div className="md:col-span-5 flex flex-col items-center justify-center relative">
            <div className="relative w-full max-w-sm mx-auto">
              {/* Outer Glow Circle */}
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-tr from-sky-500/20 via-cyan-500/10 to-transparent blur-2xl transform scale-105"></div>

              {/* Card Container */}
              <div className="relative bg-[#1C2541] border border-slate-700/80 rounded-2xl p-6 shadow-2xl space-y-5">
                
                {/* Character Illustration */}
                <div className="relative flex justify-center py-2">
                  <img
                    src="https://cdni.iconscout.com/illustration/premium/thumb/programmer-boy-5120715-4299521.png"
                    alt="Rahul Mandal Data Scientist Vector"
                    className="w-56 h-auto drop-shadow-[0_0_20px_rgba(56,189,248,0.4)] object-contain transition-transform hover:scale-105 duration-300"
                    onError={(e) => {
                      // Fallback icon box
                      e.currentTarget.style.display = 'none';
                    }}
                  />
                </div>

                {/* Developer Terminal Box */}
                <div className="bg-[#0B132B] border border-slate-800 rounded-xl p-3.5 font-mono text-xs space-y-1.5">
                  <div className="flex items-center gap-1.5 text-slate-500 pb-1 border-b border-slate-800">
                    <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80"></span>
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80"></span>
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80"></span>
                    <span className="ml-2 text-[10px] text-slate-400">rahul_mandal_profile.py</span>
                  </div>
                  <p className="text-sky-400"><span className="text-purple-400">class</span> <span className="text-yellow-300">DataScientist</span>:</p>
                  <p className="pl-4 text-slate-300">location = <span className="text-emerald-400">"Pune, India"</span></p>
                  <p className="pl-4 text-slate-300">education = <span className="text-emerald-400">"B.Sc. Computer Science"</span></p>
                  <p className="pl-4 text-slate-300">certifications = <span className="text-sky-300">5</span> <span className="text-slate-500"># Internshala</span></p>
                  <p className="pl-4 text-slate-300">stack = [<span className="text-emerald-400">"Python"</span>, <span className="text-emerald-400">"SQL"</span>, <span className="text-emerald-400">"Tableau"</span>, <span className="text-emerald-400">"ML"</span>]</p>
                </div>

                {/* Quick Stats Grid */}
                <div className="grid grid-cols-3 gap-2 text-center pt-1 font-mono">
                  <div className="bg-[#0B132B] border border-slate-800 rounded-lg p-2.5">
                    <p className="text-xl font-bold text-sky-400">4+</p>
                    <p className="text-[10px] text-slate-400 uppercase">Projects</p>
                  </div>
                  <div className="bg-[#0B132B] border border-slate-800 rounded-lg p-2.5">
                    <p className="text-xl font-bold text-cyan-400">5</p>
                    <p className="text-[10px] text-slate-400 uppercase">Certs</p>
                  </div>
                  <div className="bg-[#0B132B] border border-slate-800 rounded-lg p-2.5">
                    <p className="text-xl font-bold text-emerald-400">100%</p>
                    <p className="text-[10px] text-slate-400 uppercase">Driven</p>
                  </div>
                </div>

              </div>
            </div>
          </div>

        </div>

        {/* Scroll Indicator */}
        <div className="flex justify-center mt-12 sm:mt-16">
          <a
            href="#about"
            className="flex flex-col items-center gap-1.5 text-slate-400 hover:text-sky-400 text-xs font-mono transition-colors group"
          >
            <span className="tracking-widest">SCROLL TO EXPLORE</span>
            <ArrowDown className="w-4 h-4 animate-bounce text-sky-400 group-hover:translate-y-1 transition-transform" />
          </a>
        </div>
      </div>
    </section>
  );
};
