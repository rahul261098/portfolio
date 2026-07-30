import React from 'react';
import { User, MapPin, GraduationCap, Award, Brain, Database, BarChart3, Target, Sparkles, CheckCircle2 } from 'lucide-react';

export const About: React.FC = () => {
  return (
    <section id="about" className="py-20 px-4 sm:px-6 relative z-10 bg-[#0B132B]">
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* Section Heading */}
        <div>
          <p className="font-mono text-xs tracking-widest text-sky-400 uppercase mb-2">// 01 — About Me</p>
          <div className="w-12 h-1 bg-gradient-to-r from-sky-400 to-cyan-400 rounded-full mb-3"></div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-100 font-sans tracking-tight">
            Bridging Data Analytics & Strategic Action
          </h2>
        </div>

        {/* Core Grid */}
        <div className="grid lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Detailed Biography Card */}
          <div className="lg:col-span-7 card-hover rounded-2xl p-7 flex flex-col justify-between space-y-6">
            <div className="space-y-4 text-slate-300 text-base leading-relaxed">
              <p>
                I am <strong className="text-sky-300">Rahul Mandal</strong>, a dedicated Data Scientist based in <strong className="text-slate-100">Pune, Maharashtra, India</strong>. 
                Holding a B.Sc. in Computer Science from Abeda Inamdar Senior College, my passion lies in solving complex analytical challenges by engineering scalable machine learning models and crafting executive data visualizers.
              </p>
              
              <p>
                Through rigorous coursework and hands-on specializations in Python, Scikit-learn, SQL, and Tableau, I have built end-to-end analytical solutions — from predicting CTC salary brackets for new hires to constructing strategic auction valuation engines for sports franchises.
              </p>

              <p>
                Whether exploring raw distributions, performing feature selection, or communicating insights through interactive dashboards, my focus is always on delivery: clear metrics, reproducible code, and measurable business impact.
              </p>
            </div>

            {/* Core Values / Highlights */}
            <div className="grid sm:grid-cols-2 gap-3 pt-4 border-t border-slate-800 font-mono text-xs">
              <div className="flex items-center gap-2.5 text-slate-200 bg-[#0B132B] p-3 rounded-xl border border-slate-800">
                <CheckCircle2 className="w-4 h-4 text-sky-400 flex-shrink-0" />
                <span>End-to-End ML Pipelines</span>
              </div>
              <div className="flex items-center gap-2.5 text-slate-200 bg-[#0B132B] p-3 rounded-xl border border-slate-800">
                <CheckCircle2 className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                <span>Exploratory Data Analysis (EDA)</span>
              </div>
              <div className="flex items-center gap-2.5 text-slate-200 bg-[#0B132B] p-3 rounded-xl border border-slate-800">
                <CheckCircle2 className="w-4 h-4 text-sky-400 flex-shrink-0" />
                <span>Relational SQL Query Optimization</span>
              </div>
              <div className="flex items-center gap-2.5 text-slate-200 bg-[#0B132B] p-3 rounded-xl border border-slate-800">
                <CheckCircle2 className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                <span>Tableau & BI Executive Reporting</span>
              </div>
            </div>
          </div>

          {/* Quick Info & Stats Column */}
          <div className="lg:col-span-5 flex flex-col justify-between gap-4">
            
            {/* Academic Card */}
            <div className="card-hover rounded-2xl p-6 relative overflow-hidden">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-sky-500/10 border border-sky-500/20 flex items-center justify-center flex-shrink-0 text-sky-400">
                  <GraduationCap className="w-6 h-6" />
                </div>
                <div>
                  <span className="font-mono text-xs text-sky-400 tracking-wider">2018 — 2021 | PUNE, INDIA</span>
                  <h3 className="text-slate-100 font-bold text-lg mt-0.5">B.Sc. in Computer Science</h3>
                  <p className="text-slate-400 text-sm mt-1">Abeda Inamdar Senior College</p>
                  <p className="text-slate-400 text-xs mt-2">
                    Solid grounding in algorithms, data structures, linear algebra, statistics, and database systems.
                  </p>
                </div>
              </div>
            </div>

            {/* Key Expertise Grid */}
            <div className="grid grid-cols-2 gap-4 flex-1">
              <div className="card-hover rounded-2xl p-5 flex flex-col justify-center items-center text-center space-y-2">
                <div className="w-10 h-10 rounded-xl bg-sky-500/10 border border-sky-500/20 flex items-center justify-center text-sky-400">
                  <Brain className="w-5 h-5" />
                </div>
                <h4 className="text-slate-100 font-bold text-sm">Machine Learning</h4>
                <p className="text-slate-400 text-xs">Regression, Trees, Feature Engineering</p>
              </div>

              <div className="card-hover rounded-2xl p-5 flex flex-col justify-center items-center text-center space-y-2">
                <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400">
                  <Database className="w-5 h-5" />
                </div>
                <h4 className="text-slate-100 font-bold text-sm">SQL & Analytics</h4>
                <p className="text-slate-400 text-xs">Complex CTEs, Window Functions</p>
              </div>

              <div className="card-hover rounded-2xl p-5 flex flex-col justify-center items-center text-center space-y-2">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                  <BarChart3 className="w-5 h-5" />
                </div>
                <h4 className="text-slate-100 font-bold text-sm">BI & Tableau</h4>
                <p className="text-slate-400 text-xs">LOD Expressions & Dashboards</p>
              </div>

              <div className="card-hover rounded-2xl p-5 flex flex-col justify-center items-center text-center space-y-2">
                <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400">
                  <Award className="w-5 h-5" />
                </div>
                <h4 className="text-slate-100 font-bold text-sm">Certifications</h4>
                <p className="text-slate-400 text-xs">5 Specializations Earned</p>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
