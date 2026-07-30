import React, { useState } from 'react';
import { CERTIFICATIONS_DATA } from '../data/portfolioData';
import { Certification } from '../types';
import { GraduationCap, Award, Calendar, CheckCircle2, ShieldCheck, X, Sparkles } from 'lucide-react';

export const EducationCertifications: React.FC = () => {
  const [selectedCert, setSelectedCert] = useState<Certification | null>(null);

  return (
    <section id="education" className="py-20 px-4 sm:px-6 relative z-10 bg-[#0B132B]">
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* Section Heading */}
        <div>
          <p className="font-mono text-xs tracking-widest text-sky-400 uppercase mb-2">// 05 — Education & Specializations</p>
          <div className="w-12 h-1 bg-gradient-to-r from-sky-400 to-cyan-400 rounded-full mb-3"></div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-100 font-sans tracking-tight">
            Academic Background & Verified Certifications
          </h2>
        </div>

        <div className="grid lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Academic Degree */}
          <div className="lg:col-span-5 space-y-6">
            <h3 className="font-mono text-xs tracking-widest text-sky-400 uppercase flex items-center gap-2">
              <GraduationCap className="w-4 h-4 text-sky-400" />
              <span>ACADEMIC QUALIFICATION</span>
            </h3>

            <div className="card-hover rounded-2xl p-7 relative space-y-4">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <span className="font-mono text-xs text-sky-400">2018 — 2021 | PUNE, MAHARASHTRA</span>
                  <h4 className="text-2xl font-bold text-slate-100 font-sans mt-1">Bachelor of Science in Computer Science</h4>
                  <p className="text-slate-300 text-base font-sans mt-1">Abeda Inamdar Senior College</p>
                </div>
              </div>

              <p className="text-slate-400 text-sm leading-relaxed font-sans">
                Comprehensive 3-year degree curriculum building strong analytical foundations in Computer Science, Discrete Mathematics, Data Structures, Relational Database Systems, and Object-Oriented Programming.
              </p>

              {/* Coursework Tags */}
              <div className="pt-2 flex flex-wrap gap-2 font-mono text-xs">
                <span className="px-2.5 py-1 rounded-full bg-sky-500/10 border border-sky-500/20 text-sky-300">Mathematics</span>
                <span className="px-2.5 py-1 rounded-full bg-sky-500/10 border border-sky-500/20 text-sky-300">Algorithms</span>
                <span className="px-2.5 py-1 rounded-full bg-sky-500/10 border border-sky-500/20 text-sky-300">DBMS & SQL</span>
                <span className="px-2.5 py-1 rounded-full bg-sky-500/10 border border-sky-500/20 text-sky-300">Software Engineering</span>
              </div>
            </div>
          </div>

          {/* Right Column: 5 Internshala Certifications */}
          <div className="lg:col-span-7 space-y-6">
            <h3 className="font-mono text-xs tracking-widest text-sky-400 uppercase flex items-center gap-2">
              <Award className="w-4 h-4 text-sky-400" />
              <span>INTERNSHALA CERTIFICATIONS (2024)</span>
            </h3>

            <div className="space-y-3">
              {CERTIFICATIONS_DATA.map((cert) => (
                <div
                  key={cert.id}
                  onClick={() => setSelectedCert(cert)}
                  className="card-hover rounded-2xl p-5 flex items-center justify-between gap-4 cursor-pointer group"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-11 h-11 rounded-xl bg-sky-500/10 border border-sky-500/20 flex items-center justify-center text-sky-400 text-lg group-hover:scale-110 transition-transform">
                      <i className={cert.icon}></i>
                    </div>

                    <div>
                      <h4 className="text-slate-100 font-bold text-base font-sans group-hover:text-sky-400 transition-colors">
                        {cert.title}
                      </h4>
                      <p className="text-slate-400 text-xs font-mono">{cert.issuer}</p>
                    </div>
                  </div>

                  <div className="text-right flex-shrink-0 font-mono text-xs">
                    <span className="text-sky-400 font-semibold bg-sky-500/10 border border-sky-500/20 px-3 py-1 rounded-full">
                      {cert.date}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Certificate Modal */}
        {selectedCert && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <div className="bg-[#1C2541] border border-slate-700 rounded-2xl w-full max-w-lg p-6 space-y-6 shadow-2xl animate-in fade-in zoom-in duration-200">
              <div className="flex items-start justify-between border-b border-slate-800 pb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-sky-500/10 border border-sky-500/20 flex items-center justify-center text-sky-400">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="font-mono text-xs text-sky-400 uppercase tracking-wider">VERIFIED CERTIFICATE</span>
                    <h3 className="text-lg font-bold text-slate-100 font-sans mt-0.5">{selectedCert.title}</h3>
                  </div>
                </div>

                <button
                  onClick={() => setSelectedCert(null)}
                  className="p-1 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-slate-200"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-4 font-mono text-xs">
                <div className="bg-[#0B132B] p-4 rounded-xl border border-slate-800 space-y-2">
                  <div className="flex justify-between">
                    <span className="text-slate-400">ISSUER:</span>
                    <strong className="text-slate-200">{selectedCert.issuer}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">DATE ISSUED:</span>
                    <strong className="text-sky-400">{selectedCert.date}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">CREDENTIAL ID:</span>
                    <strong className="text-slate-200">{selectedCert.credentialId}</strong>
                  </div>
                </div>

                <div className="space-y-2 font-sans">
                  <span className="font-mono text-xs text-slate-400 uppercase block">CORE COMPETENCIES TESTED:</span>
                  <div className="flex flex-wrap gap-2 font-mono text-xs">
                    {selectedCert.skillsLearned.map((skill, idx) => (
                      <span key={idx} className="px-2.5 py-1 rounded-full bg-sky-500/10 border border-sky-500/20 text-sky-300">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="pt-2 flex justify-end">
                <button
                  onClick={() => setSelectedCert(null)}
                  className="px-5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-mono font-bold transition-colors"
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
