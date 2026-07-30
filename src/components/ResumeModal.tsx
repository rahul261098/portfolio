import React, { useRef } from 'react';
import { X, Printer, Download, Mail, MapPin, Linkedin, Github, Award, GraduationCap, CheckCircle2 } from 'lucide-react';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ResumeModal: React.FC<ResumeModalProps> = ({ isOpen, onClose }) => {
  const resumeRef = useRef<HTMLDivElement>(null);

  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md">
      <div className="bg-[#1C2541] border border-slate-700 rounded-2xl w-full max-w-4xl h-[90vh] flex flex-col shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
        
        {/* Modal Header */}
        <div className="px-6 py-4 bg-[#0B132B] border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs text-sky-400 font-bold uppercase tracking-wider">// RAHUL MANDAL RESUME</span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-sky-500/10 border border-sky-500/30 text-sky-400 hover:bg-sky-500/20 text-xs font-mono transition-colors"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / Save PDF</span>
            </button>

            <button
              onClick={onClose}
              className="p-1.5 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-slate-200"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Resume Body */}
        <div ref={resumeRef} className="flex-1 p-6 sm:p-10 overflow-y-auto bg-[#0B132B] text-slate-100 font-sans space-y-8">
          
          {/* Header */}
          <div className="border-b border-slate-800 pb-6 space-y-3">
            <h1 className="text-3xl font-extrabold text-slate-100 tracking-tight">RAHUL MANDAL</h1>
            <p className="text-sky-400 font-mono text-base font-semibold">Data Scientist | Machine Learning & BI Analytics</p>
            
            <div className="flex flex-wrap gap-4 text-xs font-mono text-slate-400 pt-1">
              <span className="flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5 text-sky-400" /> Pune, Maharashtra, India</span>
              <span className="flex items-center gap-1.5"><Mail className="w-3.5 h-3.5 text-sky-400" /> rahulmandalin1998@gmail.com</span>
              <span className="flex items-center gap-1.5"><Github className="w-3.5 h-3.5 text-sky-400" /> github.com/rahul261098</span>
              <span className="flex items-center gap-1.5"><Linkedin className="w-3.5 h-3.5 text-sky-400" /> linkedin.com/in/rahul-mandal</span>
            </div>
          </div>

          {/* Professional Summary */}
          <div className="space-y-2">
            <h2 className="font-mono text-xs text-sky-400 uppercase tracking-widest font-bold">PROFESSIONAL SUMMARY</h2>
            <p className="text-slate-300 text-sm leading-relaxed">
              Results-driven Data Scientist with a B.Sc. in Computer Science and 5 industry certifications in Data Science, Machine Learning, SQL, Tableau, and Excel. Skilled in executing end-to-end predictive modeling pipelines, conducting in-depth exploratory data analysis (EDA), optimizing complex SQL database queries, and designing executive Tableau reporting dashboards.
            </p>
          </div>

          {/* Technical Skills */}
          <div className="space-y-3">
            <h2 className="font-mono text-xs text-sky-400 uppercase tracking-widest font-bold">TECHNICAL SKILLS</h2>
            <div className="grid sm:grid-cols-2 gap-3 text-xs font-mono">
              <div className="bg-[#1C2541] p-3 rounded-xl border border-slate-800">
                <strong className="text-sky-300 block mb-1">Languages & Core:</strong>
                <span className="text-slate-300">Python, SQL, MS Excel (VLOOKUP, Pivot)</span>
              </div>
              <div className="bg-[#1C2541] p-3 rounded-xl border border-slate-800">
                <strong className="text-sky-300 block mb-1">Machine Learning:</strong>
                <span className="text-slate-300">Scikit-learn, Regression, Decision Trees, Random Forests, EDA</span>
              </div>
              <div className="bg-[#1C2541] p-3 rounded-xl border border-slate-800">
                <strong className="text-sky-300 block mb-1">Data Visualization & BI:</strong>
                <span className="text-slate-300">Tableau, Matplotlib, Seaborn, Dashboards</span>
              </div>
              <div className="bg-[#1C2541] p-3 rounded-xl border border-slate-800">
                <strong className="text-sky-300 block mb-1">Databases & Tools:</strong>
                <span className="text-slate-300">PostgreSQL, MySQL, Git/GitHub, Jupyter</span>
              </div>
            </div>
          </div>

          {/* Key Projects */}
          <div className="space-y-4">
            <h2 className="font-mono text-xs text-sky-400 uppercase tracking-widest font-bold">KEY PROJECTS</h2>

            <div className="space-y-3 text-xs">
              <div className="bg-[#1C2541] p-4 rounded-xl border border-slate-800 space-y-1.5">
                <div className="flex justify-between font-bold text-sm text-slate-100">
                  <span>Customer Churn Predictor & Retention Engine</span>
                  <span className="text-sky-400 font-mono text-xs">Python, Scikit-learn, SMOTE</span>
                </div>
                <ul className="list-disc list-inside text-slate-300 space-y-1">
                  <li>Trained binary classification models (Random Forest, XGBoost) to detect subscriber churn risk with 89% recall.</li>
                  <li>Handled imbalanced dataset distribution using SMOTE oversampling and hyperparameter tuning.</li>
                </ul>
              </div>

              <div className="bg-[#1C2541] p-4 rounded-xl border border-slate-800 space-y-1.5">
                <div className="flex justify-between font-bold text-sm text-slate-100">
                  <span>Salary / CTC Prediction for New Hires</span>
                  <span className="text-sky-400 font-mono text-xs">Python, Scikit-learn, EDA</span>
                </div>
                <ul className="list-disc list-inside text-slate-300 space-y-1">
                  <li>Performed comprehensive EDA on employee compensation datasets to isolate top salary predictors.</li>
                  <li>Trained and benchmarked Linear Regression & Random Forest models achieving an R² score of 0.88.</li>
                </ul>
              </div>

              <div className="bg-[#1C2541] p-4 rounded-xl border border-slate-800 space-y-1.5">
                <div className="flex justify-between font-bold text-sm text-slate-100">
                  <span>Bike Heaven Sales & Profitability Analysis</span>
                  <span className="text-sky-400 font-mono text-xs">Tableau, Python, BI</span>
                </div>
                <ul className="list-disc list-inside text-slate-300 space-y-1">
                  <li>Processed 50,000+ sales transactions to identify high-margin regions and product categories.</li>
                  <li>Created interactive Tableau dashboards with LOD calculations for executive forecasting.</li>
                </ul>
              </div>

              <div className="bg-[#1C2541] p-4 rounded-xl border border-slate-800 space-y-1.5">
                <div className="flex justify-between font-bold text-sm text-slate-100">
                  <span>IPL Franchise Auction Strategy & Player Valuation</span>
                  <span className="text-sky-400 font-mono text-xs">SQL, Analytics, Optimization</span>
                </div>
                <ul className="list-disc list-inside text-slate-300 space-y-1">
                  <li>Aggregated multi-season player performance using SQL window functions, CTEs, and complex joins.</li>
                  <li>Formulated budget-constrained 100 Cr squad optimization algorithm maximizing team win rate.</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Education & Certifications */}
          <div className="grid sm:grid-cols-2 gap-6">
            <div className="space-y-2">
              <h2 className="font-mono text-xs text-sky-400 uppercase tracking-widest font-bold">EDUCATION</h2>
              <div className="bg-[#1C2541] p-4 rounded-xl border border-slate-800 text-xs space-y-1">
                <strong className="text-slate-100 text-sm block">B.Sc. in Computer Science</strong>
                <span className="text-slate-300 block">Abeda Inamdar Senior College, Pune</span>
                <span className="text-sky-400 font-mono text-[11px] block">2018 — 2021</span>
              </div>
            </div>

            <div className="space-y-2">
              <h2 className="font-mono text-xs text-sky-400 uppercase tracking-widest font-bold">CERTIFICATIONS (2024)</h2>
              <div className="bg-[#1C2541] p-4 rounded-xl border border-slate-800 text-xs space-y-1">
                <p className="text-slate-200">• Data Science Specialization (Internshala)</p>
                <p className="text-slate-200">• Machine Learning with Python (Internshala)</p>
                <p className="text-slate-200">• Tableau for Data Visualization (Internshala)</p>
                <p className="text-slate-200">• SQL for Data Science (Internshala)</p>
                <p className="text-slate-200">• Excel for Data Analysis (Internshala)</p>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
