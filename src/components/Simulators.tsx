import React, { useState } from 'react';
import { Cpu, DollarSign, Bike, Trophy, Users, RefreshCw, BarChart2, PieChart, Sparkles, AlertCircle, UserX, ShieldAlert, ArrowRight, ExternalLink } from 'lucide-react';

interface SimulatorsProps {
  activeSimType: 'ctc' | 'bike' | 'ipl' | 'wefit' | 'churn';
  onSimTypeChange: (simType: 'ctc' | 'bike' | 'ipl' | 'wefit' | 'churn') => void;
}

export const Simulators: React.FC<SimulatorsProps> = ({ activeSimType, onSimTypeChange }) => {
  // ── CTC Simulator State ──
  const [experience, setExperience] = useState<number>(3);
  const [educationTier, setEducationTier] = useState<number>(2); // 1: B.Sc, 2: B.Tech/M.Sc, 3: Ph.D / Premier
  const [skillTier, setSkillTier] = useState<number>(2); // 1: Core Python, 2: ML Scikit-Learn, 3: Advanced AI/Deep Learning
  const [companyTier, setCompanyTier] = useState<number>(2); // 1: Early Startup, 2: Mid-Size Tech, 3: Product Giant
  const [projectsCount, setProjectsCount] = useState<number>(5);

  // CTC Formula Computation
  const baseSalary = 4.0;
  const expFactor = experience * 1.6;
  const eduFactor = educationTier === 1 ? 0 : educationTier === 2 ? 1.5 : 3.5;
  const skillFactor = skillTier === 1 ? 0.8 : skillTier === 2 ? 2.2 : 4.5;
  const compFactor = companyTier === 1 ? 1.0 : companyTier === 2 ? 1.8 : 3.8;
  const projFactor = Math.min(projectsCount, 10) * 0.35;

  const calculatedCtc = Number((baseSalary + expFactor + eduFactor + skillFactor + compFactor + projFactor).toFixed(2));
  const minRange = Number((calculatedCtc * 0.9).toFixed(1));
  const maxRange = Number((calculatedCtc * 1.15).toFixed(1));

  // ── Bike Heaven BI State ──
  const [selectedRegion, setSelectedRegion] = useState<string>('All');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const bikeData = [
    { region: 'North', category: 'Mountain Bikes', sales: 420000, profit: 98000, margin: '23.3%' },
    { region: 'North', category: 'Road Bikes', sales: 310000, profit: 74000, margin: '23.8%' },
    { region: 'South', category: 'Mountain Bikes', sales: 510000, profit: 135000, margin: '26.4%' },
    { region: 'South', category: 'Accessories', sales: 180000, profit: 62000, margin: '34.4%' },
    { region: 'West', category: 'Road Bikes', sales: 620000, profit: 178000, margin: '28.7%' },
    { region: 'West', category: 'Clothing', sales: 140000, profit: 45000, margin: '32.1%' },
    { region: 'East', category: 'Accessories', sales: 220000, profit: 79000, margin: '35.9%' },
  ];

  const filteredBikeData = bikeData.filter((item) => {
    const regionMatch = selectedRegion === 'All' || item.region === selectedRegion;
    const catMatch = selectedCategory === 'All' || item.category === selectedCategory;
    return regionMatch && catMatch;
  });

  const totalSales = filteredBikeData.reduce((acc, curr) => acc + curr.sales, 0);
  const totalProfit = filteredBikeData.reduce((acc, curr) => acc + curr.profit, 0);
  const avgMargin = totalSales > 0 ? ((totalProfit / totalSales) * 100).toFixed(1) : '0.0';

  // ── IPL Auction Simulator State ──
  const initialPlayers = [
    { id: 1, name: 'Virat K. (Batsman)', role: 'Batsman', cost: 18.0, rating: 94, selected: true },
    { id: 2, name: 'Jasprit B. (Fast Bowler)', role: 'Bowler', cost: 16.5, rating: 96, selected: true },
    { id: 3, name: 'Hardik P. (All-Rounder)', role: 'All-Rounder', cost: 15.0, rating: 91, selected: true },
    { id: 4, name: 'Rishabh P. (WK/Batsman)', role: 'Wicketkeeper', cost: 14.0, rating: 89, selected: false },
    { id: 5, name: 'Rashid K. (Spinner)', role: 'Bowler', cost: 13.5, rating: 93, selected: false },
    { id: 6, name: 'Surya K. (360 Batsman)', role: 'Batsman', cost: 15.5, rating: 92, selected: false },
    { id: 7, name: 'Ravindra J. (Spin All-Rounder)', role: 'All-Rounder', cost: 12.0, rating: 90, selected: false },
  ];

  const [players, setPlayers] = useState(initialPlayers);
  const totalPurse = 100.0; // 100 Cr

  const selectedPlayers = players.filter((p) => p.selected);
  const spentPurse = Number(selectedPlayers.reduce((acc, curr) => acc + curr.cost, 0).toFixed(1));
  const remainingPurse = Number((totalPurse - spentPurse).toFixed(1));

  const squadRating = selectedPlayers.length > 0
    ? Math.round(selectedPlayers.reduce((acc, curr) => acc + curr.rating, 0) / selectedPlayers.length)
    : 0;

  const predictedWinRate = Math.min(95, Math.round(squadRating * 0.85 + (selectedPlayers.length >= 5 ? 10 : 0)));

  const togglePlayerSelection = (id: number) => {
    setPlayers((prev) =>
      prev.map((p) => {
        if (p.id === id) {
          if (!p.selected && spentPurse + p.cost > totalPurse) {
            alert('Purse Exceeded! Cannot add player exceeding 100 Cr limit.');
            return p;
          }
          return { ...p, selected: !p.selected };
        }
        return p;
      })
    );
  };

  // ── WeFit Customer Analytics State ──
  const [rfmSegment, setRfmSegment] = useState<'champions' | 'atRisk' | 'new' | 'churned'>('champions');

  // ── Churn Predictor State ──
  const [tenure, setTenure] = useState<number>(6); // months
  const [contractType, setContractType] = useState<'month-to-month' | 'one-year' | 'two-year'>('month-to-month');
  const [monthlyCharges, setMonthlyCharges] = useState<number>(85);
  const [supportCalls, setSupportCalls] = useState<number>(4);
  const [techSupport, setTechSupport] = useState<boolean>(false);
  const [paymentMethod, setPaymentMethod] = useState<'electronic' | 'automatic'>('electronic');

  // Churn Probability Calculation Logic
  let churnScore = 35; // base
  if (contractType === 'month-to-month') churnScore += 25;
  if (contractType === 'one-year') churnScore -= 12;
  if (contractType === 'two-year') churnScore -= 28;

  if (tenure <= 6) churnScore += 18;
  else if (tenure <= 24) churnScore += 4;
  else churnScore -= 16;

  if (monthlyCharges > 80) churnScore += 14;
  else if (monthlyCharges <= 50) churnScore -= 10;

  if (supportCalls > 2) churnScore += (supportCalls - 2) * 8;
  else churnScore -= 8;

  if (!techSupport) churnScore += 8;
  else churnScore -= 10;

  if (paymentMethod === 'electronic') churnScore += 6;
  else churnScore -= 6;

  const finalChurnProb = Math.min(98, Math.max(3, churnScore));

  const getRiskCategory = (prob: number) => {
    if (prob >= 70) return { label: 'CRITICAL CHURN RISK', color: 'text-rose-400', bg: 'bg-rose-500/10 border-rose-500/30', bar: 'bg-rose-500' };
    if (prob >= 40) return { label: 'MODERATE ATTRITION RISK', color: 'text-amber-400', bg: 'bg-amber-500/10 border-amber-500/30', bar: 'bg-amber-500' };
    return { label: 'LOW RISK / RETENTION STABLE', color: 'text-emerald-400', bg: 'bg-emerald-500/10 border-emerald-500/30', bar: 'bg-emerald-500' };
  };

  const riskInfo = getRiskCategory(finalChurnProb);

  const segmentDetails = {
    champions: {
      title: 'Champions (High Recency, High Frequency, High LTV)',
      size: '28% of userbase',
      churnRisk: '4.2% (Low)',
      ltv: '$850 / user',
      strategy: 'VIP loyalty perks, referral rewards, exclusive early feature access.',
    },
    atRisk: {
      title: 'At-Risk Members (Low Recency, High Past Value)',
      size: '18% of userbase',
      churnRisk: '62.5% (High)',
      ltv: '$420 / user',
      strategy: 'Automated discount re-engagement triggers, personal fitness check-in emails.',
    },
    new: {
      title: 'New Members (High Recency, Low Frequency)',
      size: '34% of userbase',
      churnRisk: '22.0% (Medium)',
      ltv: '$190 / user',
      strategy: '7-day guided workout streak challenge, community introduction push notifications.',
    },
    churned: {
      title: 'Dormant / Churned Users (Low Recency, Low Frequency)',
      size: '20% of userbase',
      churnRisk: '88.9% (Critical)',
      ltv: '$65 / user',
      strategy: 'Win-back subscription campaigns with 50% discount for first month.',
    },
  };

  return (
    <section id="simulators" className="py-20 px-4 sm:px-6 relative z-10 bg-[#0F172A] border-t border-slate-800">
      <div className="max-w-7xl mx-auto space-y-10">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <p className="font-mono text-xs tracking-widest text-sky-400 uppercase">// 04 — Interactive Case Study Simulators</p>
          <div className="w-16 h-1 bg-gradient-to-r from-sky-400 to-cyan-400 rounded-full mx-auto"></div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-100 font-sans tracking-tight">
            Test Rahul's Models & Dashboards Live
          </h2>
          <p className="text-slate-300 text-sm font-sans">
            Interactively adjust parameters, test machine learning predictions, query simulated business databases, and evaluate strategic outcomes.
          </p>
        </div>

        {/* Simulator Selector Tabs */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 font-mono text-xs">
          <button
            onClick={() => onSimTypeChange('churn')}
            className={`p-4 rounded-2xl border flex flex-col items-center justify-center text-center gap-2 transition-all ${
              activeSimType === 'churn'
                ? 'bg-sky-500/15 border-sky-400 text-sky-300 shadow-[0_0_20px_rgba(56,189,248,0.2)]'
                : 'bg-[#1C2541] border-slate-700 text-slate-400 hover:text-slate-200'
            }`}
          >
            <UserX className="w-5 h-5 text-rose-400" />
            <span className="font-bold text-sm">Churn Predictor</span>
            <span className="text-[10px] text-slate-400">Classification ML</span>
          </button>

          <button
            onClick={() => onSimTypeChange('ctc')}
            className={`p-4 rounded-2xl border flex flex-col items-center justify-center text-center gap-2 transition-all ${
              activeSimType === 'ctc'
                ? 'bg-sky-500/15 border-sky-400 text-sky-300 shadow-[0_0_20px_rgba(56,189,248,0.2)]'
                : 'bg-[#1C2541] border-slate-700 text-slate-400 hover:text-slate-200'
            }`}
          >
            <DollarSign className="w-5 h-5 text-sky-400" />
            <span className="font-bold text-sm">CTC Predictor</span>
            <span className="text-[10px] text-slate-400">Regression ML</span>
          </button>

          <button
            onClick={() => onSimTypeChange('bike')}
            className={`p-4 rounded-2xl border flex flex-col items-center justify-center text-center gap-2 transition-all ${
              activeSimType === 'bike'
                ? 'bg-sky-500/15 border-sky-400 text-sky-300 shadow-[0_0_20px_rgba(56,189,248,0.2)]'
                : 'bg-[#1C2541] border-slate-700 text-slate-400 hover:text-slate-200'
            }`}
          >
            <Bike className="w-5 h-5 text-cyan-400" />
            <span className="font-bold text-sm">Bike Sales BI</span>
            <span className="text-[10px] text-slate-400">Tableau Analytics</span>
          </button>

          <button
            onClick={() => onSimTypeChange('ipl')}
            className={`p-4 rounded-2xl border flex flex-col items-center justify-center text-center gap-2 transition-all ${
              activeSimType === 'ipl'
                ? 'bg-sky-500/15 border-sky-400 text-sky-300 shadow-[0_0_20px_rgba(56,189,248,0.2)]'
                : 'bg-[#1C2541] border-slate-700 text-slate-400 hover:text-slate-200'
            }`}
          >
            <Trophy className="w-5 h-5 text-yellow-400" />
            <span className="font-bold text-sm">IPL Auction Engine</span>
            <span className="text-[10px] text-slate-400">SQL & Purse Valuation</span>
          </button>

          <button
            onClick={() => onSimTypeChange('wefit')}
            className={`p-4 rounded-2xl border flex flex-col items-center justify-center text-center gap-2 transition-all ${
              activeSimType === 'wefit'
                ? 'bg-sky-500/15 border-sky-400 text-sky-300 shadow-[0_0_20px_rgba(56,189,248,0.2)]'
                : 'bg-[#1C2541] border-slate-700 text-slate-400 hover:text-slate-200'
            }`}
          >
            <Users className="w-5 h-5 text-emerald-400" />
            <span className="font-bold text-sm">WeFit RFM Cohorts</span>
            <span className="text-[10px] text-slate-400">Customer Segmentation</span>
          </button>
        </div>

        {/* ── SIMULATOR 0: CUSTOMER CHURN PREDICTOR ── */}
        {activeSimType === 'churn' && (
          <div className="card-hover rounded-3xl p-6 sm:p-8 bg-[#1C2541] space-y-8 animate-in fade-in duration-300">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
              <div>
                <span className="font-mono text-xs text-rose-400 uppercase tracking-widest">// Machine Learning Classification Pipeline (rahul261098/churn_predictor)</span>
                <h3 className="text-2xl font-bold text-slate-100 font-sans mt-0.5">Customer Churn & Attrition Predictor</h3>
              </div>
              <div className="flex items-center gap-3">
                <a
                  href="https://github.com/rahul261098/churn_predictor"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 font-mono text-xs bg-[#0B132B] px-3.5 py-1.5 rounded-xl border border-slate-800 text-sky-400 hover:border-sky-500/50 transition-colors"
                >
                  <span>GitHub Repo</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
                <div className="flex items-center gap-2 font-mono text-xs bg-[#0B132B] px-3 py-1.5 rounded-xl border border-slate-800 text-slate-300">
                  <Sparkles className="w-4 h-4 text-rose-400 animate-pulse" />
                  <span>Recall: 89% | ROC-AUC: 0.91</span>
                </div>
              </div>
            </div>

            <div className="grid lg:grid-cols-12 gap-8 items-center">
              
              {/* Form Controls */}
              <div className="lg:col-span-7 space-y-5 font-sans">
                
                {/* Tenure Slider */}
                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs font-mono">
                    <span className="text-slate-300">Customer Tenure (Months Active):</span>
                    <span className="text-sky-400 font-bold">{tenure} Months</span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="60"
                    step="1"
                    value={tenure}
                    onChange={(e) => setTenure(parseInt(e.target.value))}
                    className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-sky-400"
                  />
                </div>

                {/* Contract Type */}
                <div className="space-y-1.5">
                  <label className="text-xs font-mono text-slate-300 block">Subscription Contract Type:</label>
                  <div className="grid grid-cols-3 gap-2 font-mono text-xs">
                    <button
                      type="button"
                      onClick={() => setContractType('month-to-month')}
                      className={`py-2 px-3 rounded-xl border transition-all ${
                        contractType === 'month-to-month'
                          ? 'bg-rose-500/20 border-rose-400 text-rose-300 font-bold'
                          : 'bg-[#0B132B] border-slate-800 text-slate-400'
                      }`}
                    >
                      Month-to-Month
                    </button>
                    <button
                      type="button"
                      onClick={() => setContractType('one-year')}
                      className={`py-2 px-3 rounded-xl border transition-all ${
                        contractType === 'one-year'
                          ? 'bg-sky-500/20 border-sky-400 text-sky-300 font-bold'
                          : 'bg-[#0B132B] border-slate-800 text-slate-400'
                      }`}
                    >
                      1-Year Fixed
                    </button>
                    <button
                      type="button"
                      onClick={() => setContractType('two-year')}
                      className={`py-2 px-3 rounded-xl border transition-all ${
                        contractType === 'two-year'
                          ? 'bg-emerald-500/20 border-emerald-400 text-emerald-300 font-bold'
                          : 'bg-[#0B132B] border-slate-800 text-slate-400'
                      }`}
                    >
                      2-Year Fixed
                    </button>
                  </div>
                </div>

                {/* Monthly Charges Slider */}
                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs font-mono">
                    <span className="text-slate-300">Monthly Billing Charges ($):</span>
                    <span className="text-sky-400 font-bold">${monthlyCharges} / Mo</span>
                  </div>
                  <input
                    type="range"
                    min="15"
                    max="150"
                    step="5"
                    value={monthlyCharges}
                    onChange={(e) => setMonthlyCharges(parseInt(e.target.value))}
                    className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-sky-400"
                  />
                </div>

                {/* Support Calls */}
                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs font-mono">
                    <span className="text-slate-300">Customer Support Tickets Logged:</span>
                    <span className={supportCalls > 3 ? 'text-rose-400 font-bold' : 'text-emerald-400 font-bold'}>
                      {supportCalls} Tickets
                    </span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="8"
                    step="1"
                    value={supportCalls}
                    onChange={(e) => setSupportCalls(parseInt(e.target.value))}
                    className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-sky-400"
                  />
                </div>

                {/* Tech Support & Payment Method */}
                <div className="grid sm:grid-cols-2 gap-4 font-mono text-xs">
                  <div>
                    <label className="text-slate-300 block mb-1">Dedicated Tech Support:</label>
                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={() => setTechSupport(true)}
                        className={`flex-1 py-2 rounded-xl border transition-all ${
                          techSupport
                            ? 'bg-emerald-500/20 border-emerald-400 text-emerald-300 font-bold'
                            : 'bg-[#0B132B] border-slate-800 text-slate-400'
                        }`}
                      >
                        Yes (+Shield)
                      </button>
                      <button
                        type="button"
                        onClick={() => setTechSupport(false)}
                        className={`flex-1 py-2 rounded-xl border transition-all ${
                          !techSupport
                            ? 'bg-rose-500/20 border-rose-400 text-rose-300 font-bold'
                            : 'bg-[#0B132B] border-slate-800 text-slate-400'
                        }`}
                      >
                        No
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="text-slate-300 block mb-1">Billing Payment Method:</label>
                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={() => setPaymentMethod('electronic')}
                        className={`flex-1 py-2 rounded-xl border transition-all ${
                          paymentMethod === 'electronic'
                            ? 'bg-amber-500/20 border-amber-400 text-amber-300 font-bold'
                            : 'bg-[#0B132B] border-slate-800 text-slate-400'
                        }`}
                      >
                        Elec. Check
                      </button>
                      <button
                        type="button"
                        onClick={() => setPaymentMethod('automatic')}
                        className={`flex-1 py-2 rounded-xl border transition-all ${
                          paymentMethod === 'automatic'
                            ? 'bg-emerald-500/20 border-emerald-400 text-emerald-300 font-bold'
                            : 'bg-[#0B132B] border-slate-800 text-slate-400'
                        }`}
                      >
                        Auto Bank / CC
                      </button>
                    </div>
                  </div>
                </div>

              </div>

              {/* Prediction Result Display */}
              <div className="lg:col-span-5 bg-[#0B132B] border border-slate-800 rounded-2xl p-6 text-center space-y-5 shadow-2xl">
                <div>
                  <span className="font-mono text-xs text-slate-400 uppercase tracking-widest">PREDICTED CHURN PROBABILITY</span>
                  <div className={`text-5xl font-extrabold font-sans my-2 tracking-tight ${riskInfo.color}`}>
                    {finalChurnProb}%
                  </div>
                  <div className={`inline-block px-3 py-1 rounded-full font-mono text-xs border font-bold ${riskInfo.bg} ${riskInfo.color}`}>
                    {riskInfo.label}
                  </div>
                </div>

                {/* Probability Bar */}
                <div className="w-full bg-slate-800 h-2.5 rounded-full overflow-hidden">
                  <div className={`h-full transition-all duration-300 ${riskInfo.bar}`} style={{ width: `${finalChurnProb}%` }}></div>
                </div>

                {/* Risk Drivers & AI Retention Recommendation */}
                <div className="space-y-3 pt-2 border-t border-slate-800 text-left font-sans text-xs">
                  <span className="font-mono text-[11px] text-slate-400 uppercase block">RECOMMENDED RETENTION WORKFLOW:</span>
                  <div className="p-3 bg-[#1C2541] rounded-xl border border-slate-800 space-y-1">
                    {finalChurnProb >= 70 ? (
                      <p className="text-rose-300 leading-relaxed font-medium">
                        🚨 High risk! Trigger immediate VIP retention campaign: Offer 25% discount on 1-Year commitment and assign a personal technical manager.
                      </p>
                    ) : finalChurnProb >= 40 ? (
                      <p className="text-amber-300 leading-relaxed font-medium">
                        ⚠️ Moderate risk! Send automated in-app feedback survey and offer a free tech-support add-on upgrade.
                      </p>
                    ) : (
                      <p className="text-emerald-300 leading-relaxed font-medium">
                        ✅ Low risk! Customer is stable. Target for referral loyalty rewards and annual plan expansion.
                      </p>
                    )}
                  </div>
                </div>

              </div>

            </div>
          </div>
        )}

        {/* ── SIMULATOR 1: CTC PREDICTOR ── */}
        {activeSimType === 'ctc' && (
          <div className="card-hover rounded-3xl p-6 sm:p-8 bg-[#1C2541] space-y-8 animate-in fade-in duration-300">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
              <div>
                <span className="font-mono text-xs text-sky-400 uppercase tracking-widest">// Machine Learning Regression Model</span>
                <h3 className="text-2xl font-bold text-slate-100 font-sans mt-0.5">Salary / CTC Market Value Predictor</h3>
              </div>
              <div className="flex items-center gap-2 font-mono text-xs bg-[#0B132B] px-3 py-1.5 rounded-xl border border-slate-800 text-slate-300">
                <Sparkles className="w-4 h-4 text-sky-400 animate-pulse" />
                <span>Model R² Score: 0.88</span>
              </div>
            </div>

            <div className="grid lg:grid-cols-12 gap-8 items-center">
              
              {/* Sliders Form */}
              <div className="lg:col-span-7 space-y-5 font-sans">
                
                {/* Experience Slider */}
                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs font-mono">
                    <span className="text-slate-300">Years of Experience:</span>
                    <span className="text-sky-400 font-bold">{experience} Years</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="12"
                    step="0.5"
                    value={experience}
                    onChange={(e) => setExperience(parseFloat(e.target.value))}
                    className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-sky-400"
                  />
                </div>

                {/* Education Tier */}
                <div className="space-y-1.5">
                  <label className="text-xs font-mono text-slate-300 block">Education Qualification:</label>
                  <div className="grid grid-cols-3 gap-2 font-mono text-xs">
                    <button
                      type="button"
                      onClick={() => setEducationTier(1)}
                      className={`py-2 px-3 rounded-xl border transition-all ${
                        educationTier === 1
                          ? 'bg-sky-500/20 border-sky-400 text-sky-300 font-bold'
                          : 'bg-[#0B132B] border-slate-800 text-slate-400'
                      }`}
                    >
                      B.Sc. / B.A.
                    </button>
                    <button
                      type="button"
                      onClick={() => setEducationTier(2)}
                      className={`py-2 px-3 rounded-xl border transition-all ${
                        educationTier === 2
                          ? 'bg-sky-500/20 border-sky-400 text-sky-300 font-bold'
                          : 'bg-[#0B132B] border-slate-800 text-slate-400'
                      }`}
                    >
                      B.Tech / M.Sc.
                    </button>
                    <button
                      type="button"
                      onClick={() => setEducationTier(3)}
                      className={`py-2 px-3 rounded-xl border transition-all ${
                        educationTier === 3
                          ? 'bg-sky-500/20 border-sky-400 text-sky-300 font-bold'
                          : 'bg-[#0B132B] border-slate-800 text-slate-400'
                      }`}
                    >
                      M.Tech / Ph.D.
                    </button>
                  </div>
                </div>

                {/* Primary Skill Tier */}
                <div className="space-y-1.5">
                  <label className="text-xs font-mono text-slate-300 block">Primary Skill Specialization:</label>
                  <div className="grid grid-cols-3 gap-2 font-mono text-xs">
                    <button
                      type="button"
                      onClick={() => setSkillTier(1)}
                      className={`py-2 px-3 rounded-xl border transition-all ${
                        skillTier === 1
                          ? 'bg-sky-500/20 border-sky-400 text-sky-300 font-bold'
                          : 'bg-[#0B132B] border-slate-800 text-slate-400'
                      }`}
                    >
                      Python / SQL
                    </button>
                    <button
                      type="button"
                      onClick={() => setSkillTier(2)}
                      className={`py-2 px-3 rounded-xl border transition-all ${
                        skillTier === 2
                          ? 'bg-sky-500/20 border-sky-400 text-sky-300 font-bold'
                          : 'bg-[#0B132B] border-slate-800 text-slate-400'
                      }`}
                    >
                      Scikit ML / EDA
                    </button>
                    <button
                      type="button"
                      onClick={() => setSkillTier(3)}
                      className={`py-2 px-3 rounded-xl border transition-all ${
                        skillTier === 3
                          ? 'bg-sky-500/20 border-sky-400 text-sky-300 font-bold'
                          : 'bg-[#0B132B] border-slate-800 text-slate-400'
                      }`}
                    >
                      Advanced AI / DL
                    </button>
                  </div>
                </div>

                {/* Company Tier */}
                <div className="space-y-1.5">
                  <label className="text-xs font-mono text-slate-300 block">Target Hiring Company Tier:</label>
                  <div className="grid grid-cols-3 gap-2 font-mono text-xs">
                    <button
                      type="button"
                      onClick={() => setCompanyTier(1)}
                      className={`py-2 px-3 rounded-xl border transition-all ${
                        companyTier === 1
                          ? 'bg-sky-500/20 border-sky-400 text-sky-300 font-bold'
                          : 'bg-[#0B132B] border-slate-800 text-slate-400'
                      }`}
                    >
                      Early Startup
                    </button>
                    <button
                      type="button"
                      onClick={() => setCompanyTier(2)}
                      className={`py-2 px-3 rounded-xl border transition-all ${
                        companyTier === 2
                          ? 'bg-sky-500/20 border-sky-400 text-sky-300 font-bold'
                          : 'bg-[#0B132B] border-slate-800 text-slate-400'
                      }`}
                    >
                      Mid-Size Tech
                    </button>
                    <button
                      type="button"
                      onClick={() => setCompanyTier(3)}
                      className={`py-2 px-3 rounded-xl border transition-all ${
                        companyTier === 3
                          ? 'bg-sky-500/20 border-sky-400 text-sky-300 font-bold'
                          : 'bg-[#0B132B] border-slate-800 text-slate-400'
                      }`}
                    >
                      Tech Giant
                    </button>
                  </div>
                </div>

                {/* Projects Slider */}
                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs font-mono">
                    <span className="text-slate-300">Portfolio Projects Completed:</span>
                    <span className="text-sky-400 font-bold">{projectsCount} Projects</span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="10"
                    step="1"
                    value={projectsCount}
                    onChange={(e) => setProjectsCount(parseInt(e.target.value))}
                    className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-sky-400"
                  />
                </div>

              </div>

              {/* Prediction Result Display */}
              <div className="lg:col-span-5 bg-[#0B132B] border border-slate-800 rounded-2xl p-6 text-center space-y-6 shadow-2xl">
                <div>
                  <span className="font-mono text-xs text-slate-400 uppercase tracking-widest">PREDICTED ANNUAL CTC</span>
                  <div className="text-4xl sm:text-5xl font-extrabold text-sky-400 font-sans my-2 tracking-tight drop-shadow-[0_0_25px_rgba(56,189,248,0.3)]">
                    ₹{calculatedCtc} <span className="text-xl font-mono text-slate-300">LPA</span>
                  </div>
                  <p className="font-mono text-xs text-slate-400">
                    Estimated Salary Range: <strong className="text-slate-200">₹{minRange} - ₹{maxRange} LPA</strong>
                  </p>
                </div>

                {/* Feature Weight Contribution */}
                <div className="space-y-2 pt-2 border-t border-slate-800 text-left font-mono text-xs">
                  <p className="text-slate-400 text-[11px] uppercase tracking-wider mb-2">Model Feature Importance Breakdown:</p>

                  <div className="space-y-1.5">
                    <div className="flex justify-between text-slate-300">
                      <span>Experience Contribution:</span>
                      <span className="text-sky-400">+₹{expFactor.toFixed(1)} LPA</span>
                    </div>
                    <div className="w-full bg-slate-800 h-1 rounded-full overflow-hidden">
                      <div className="bg-sky-400 h-full" style={{ width: `${Math.min((expFactor / calculatedCtc) * 100, 100)}%` }}></div>
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <div className="flex justify-between text-slate-300">
                      <span>Skill & Tech Tier:</span>
                      <span className="text-cyan-400">+₹{skillFactor.toFixed(1)} LPA</span>
                    </div>
                    <div className="w-full bg-slate-800 h-1 rounded-full overflow-hidden">
                      <div className="bg-cyan-400 h-full" style={{ width: `${Math.min((skillFactor / calculatedCtc) * 100, 100)}%` }}></div>
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <div className="flex justify-between text-slate-300">
                      <span>Company Tier Multiplier:</span>
                      <span className="text-emerald-400">+₹{compFactor.toFixed(1)} LPA</span>
                    </div>
                    <div className="w-full bg-slate-800 h-1 rounded-full overflow-hidden">
                      <div className="bg-emerald-400 h-full" style={{ width: `${Math.min((compFactor / calculatedCtc) * 100, 100)}%` }}></div>
                    </div>
                  </div>
                </div>

              </div>

            </div>
          </div>
        )}

        {/* ── SIMULATOR 2: BIKE HEAVEN BI DASHBOARD ── */}
        {activeSimType === 'bike' && (
          <div className="card-hover rounded-3xl p-6 sm:p-8 bg-[#1C2541] space-y-6 animate-in fade-in duration-300">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
              <div>
                <span className="font-mono text-xs text-cyan-400 uppercase tracking-widest">// Tableau Executive BI Simulator</span>
                <h3 className="text-2xl font-bold text-slate-100 font-sans mt-0.5">Bike Heaven Sales & Profit Dashboard</h3>
              </div>

              {/* Filter Controls */}
              <div className="flex flex-wrap items-center gap-3 font-mono text-xs">
                <div>
                  <label className="text-slate-400 mr-2">Region:</label>
                  <select
                    value={selectedRegion}
                    onChange={(e) => setSelectedRegion(e.target.value)}
                    className="bg-[#0B132B] border border-slate-700 text-sky-400 rounded-lg px-3 py-1.5 outline-none"
                  >
                    <option value="All">All Regions</option>
                    <option value="North">North</option>
                    <option value="South">South</option>
                    <option value="West">West</option>
                    <option value="East">East</option>
                  </select>
                </div>

                <div>
                  <label className="text-slate-400 mr-2">Category:</label>
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="bg-[#0B132B] border border-slate-700 text-cyan-400 rounded-lg px-3 py-1.5 outline-none"
                  >
                    <option value="All">All Categories</option>
                    <option value="Mountain Bikes">Mountain Bikes</option>
                    <option value="Road Bikes">Road Bikes</option>
                    <option value="Accessories">Accessories</option>
                    <option value="Clothing">Clothing</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Top KPI Scorecards */}
            <div className="grid grid-cols-3 gap-4 font-mono text-center">
              <div className="bg-[#0B132B] border border-slate-800 p-4 rounded-2xl">
                <p className="text-slate-400 text-xs">TOTAL REVENUE</p>
                <p className="text-2xl sm:text-3xl font-extrabold text-sky-400 mt-1">${(totalSales / 1000).toFixed(1)}k</p>
              </div>
              <div className="bg-[#0B132B] border border-slate-800 p-4 rounded-2xl">
                <p className="text-slate-400 text-xs">NET PROFIT</p>
                <p className="text-2xl sm:text-3xl font-extrabold text-emerald-400 mt-1">${(totalProfit / 1000).toFixed(1)}k</p>
              </div>
              <div className="bg-[#0B132B] border border-slate-800 p-4 rounded-2xl">
                <p className="text-slate-400 text-xs">PROFIT MARGIN</p>
                <p className="text-2xl sm:text-3xl font-extrabold text-cyan-400 mt-1">{avgMargin}%</p>
              </div>
            </div>

            {/* Interactive Data Table */}
            <div className="bg-[#0B132B] border border-slate-800 rounded-2xl overflow-hidden font-mono text-xs">
              <div className="px-5 py-3 bg-[#0B132B] border-b border-slate-800 font-bold text-slate-300 flex justify-between items-center">
                <span>SEGMENT BREAKDOWN RECORDS ({filteredBikeData.length})</span>
                <span className="text-slate-500 font-normal">Tableau Parameter LOD Filtered</span>
              </div>
              
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead className="bg-[#1C2541] text-slate-400 border-b border-slate-800">
                    <tr>
                      <th className="p-3">Region</th>
                      <th className="p-3">Category</th>
                      <th className="p-3 text-right">Sales Revenue</th>
                      <th className="p-3 text-right">Net Profit</th>
                      <th className="p-3 text-right">Profit Margin</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60 text-slate-200">
                    {filteredBikeData.map((row, idx) => (
                      <tr key={idx} className="hover:bg-slate-800/40 transition-colors">
                        <td className="p-3 text-sky-400">{row.region}</td>
                        <td className="p-3 text-slate-300">{row.category}</td>
                        <td className="p-3 text-right font-bold text-slate-100">${row.sales.toLocaleString()}</td>
                        <td className="p-3 text-right text-emerald-400">${row.profit.toLocaleString()}</td>
                        <td className="p-3 text-right text-cyan-400">{row.margin}</td>
                      </tr>
                    ))}
                    {filteredBikeData.length === 0 && (
                      <tr>
                        <td colSpan={5} className="p-6 text-center text-slate-500">
                          No matching segments found for the selected filter combination.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ── SIMULATOR 3: IPL AUCTION SQUAD BUILDER ── */}
        {activeSimType === 'ipl' && (
          <div className="card-hover rounded-3xl p-6 sm:p-8 bg-[#1C2541] space-y-6 animate-in fade-in duration-300">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
              <div>
                <span className="font-mono text-xs text-yellow-400 uppercase tracking-widest">// IPL Auction Valuation & Squad Strategy Engine</span>
                <h3 className="text-2xl font-bold text-slate-100 font-sans mt-0.5">100 Cr Squad Purse Allocator</h3>
              </div>

              {/* Purse Tracker */}
              <div className="flex items-center gap-4 font-mono text-xs">
                <div className="bg-[#0B132B] px-3.5 py-1.5 rounded-xl border border-slate-800">
                  <span className="text-slate-400">REMAINING PURSE: </span>
                  <strong className={remainingPurse < 15 ? 'text-rose-400' : 'text-emerald-400'}>
                    ₹{remainingPurse} Cr
                  </strong>
                </div>
              </div>
            </div>

            {/* Squad Metrics & Player Picker */}
            <div className="grid lg:grid-cols-12 gap-8 items-start font-mono">
              
              {/* Player Pool List */}
              <div className="lg:col-span-8 space-y-3">
                <p className="text-xs text-slate-400 uppercase tracking-wider">Select Players to Bid & Build Squad:</p>
                <div className="space-y-2">
                  {players.map((player) => (
                    <div
                      key={player.id}
                      onClick={() => togglePlayerSelection(player.id)}
                      className={`p-3.5 rounded-xl border flex items-center justify-between gap-3 cursor-pointer transition-all ${
                        player.selected
                          ? 'bg-sky-500/10 border-sky-400 text-slate-100 shadow-md'
                          : 'bg-[#0B132B] border-slate-800 text-slate-400 hover:border-slate-700'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <input
                          type="checkbox"
                          checked={player.selected}
                          onChange={() => {}}
                          className="w-4 h-4 rounded text-sky-400 accent-sky-400"
                        />
                        <div>
                          <p className="font-bold text-sm text-slate-200">{player.name}</p>
                          <span className="text-[11px] text-sky-400">{player.role} | Rating: {player.rating}/100</span>
                        </div>
                      </div>

                      <div className="text-right">
                        <p className="font-bold text-yellow-400 text-sm">₹{player.cost} Cr</p>
                        <span className="text-[10px] text-slate-500">Auction Price</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Squad Analytics Panel */}
              <div className="lg:col-span-4 bg-[#0B132B] border border-slate-800 rounded-2xl p-6 space-y-5 text-center shadow-xl">
                <div>
                  <span className="text-xs text-slate-400 uppercase tracking-wider">PREDICTED WIN RATE</span>
                  <div className="text-4xl font-extrabold text-yellow-400 my-2">{predictedWinRate}%</div>
                  <p className="text-xs text-slate-400">Calculated via SQL Valuation Model</p>
                </div>

                <div className="space-y-3 pt-3 border-t border-slate-800 text-left text-xs">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Total Players Bought:</span>
                    <strong className="text-slate-200">{selectedPlayers.length} Players</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Purse Spent:</span>
                    <strong className="text-yellow-400">₹{spentPurse} Cr</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Squad Average Rating:</span>
                    <strong className="text-sky-400">{squadRating} / 100</strong>
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    onClick={() => setPlayers(initialPlayers)}
                    className="w-full py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs flex items-center justify-center gap-2 transition-colors"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                    <span>Reset Auction Purse</span>
                  </button>
                </div>
              </div>

            </div>
          </div>
        )}

        {/* ── SIMULATOR 4: WEFIT CUSTOMER COHORTS ── */}
        {activeSimType === 'wefit' && (
          <div className="card-hover rounded-3xl p-6 sm:p-8 bg-[#1C2541] space-y-6 animate-in fade-in duration-300">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
              <div>
                <span className="font-mono text-xs text-emerald-400 uppercase tracking-widest">// MS Excel RFM Customer Segmentation Matrix</span>
                <h3 className="text-2xl font-bold text-slate-100 font-sans mt-0.5">WeFit Customer Churn & Cohort Simulator</h3>
              </div>
            </div>

            {/* Cohort Selector Pills */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 font-mono text-xs">
              <button
                onClick={() => setRfmSegment('champions')}
                className={`p-3.5 rounded-xl border text-left transition-all ${
                  rfmSegment === 'champions'
                    ? 'bg-emerald-500/20 border-emerald-400 text-emerald-300 font-bold'
                    : 'bg-[#0B132B] border-slate-800 text-slate-400'
                }`}
              >
                <p className="text-sm">Champions</p>
                <span className="text-[10px] text-slate-500">High LTV</span>
              </button>

              <button
                onClick={() => setRfmSegment('atRisk')}
                className={`p-3.5 rounded-xl border text-left transition-all ${
                  rfmSegment === 'atRisk'
                    ? 'bg-rose-500/20 border-rose-400 text-rose-300 font-bold'
                    : 'bg-[#0B132B] border-slate-800 text-slate-400'
                }`}
              >
                <p className="text-sm">At-Risk</p>
                <span className="text-[10px] text-slate-500">High Churn Risk</span>
              </button>

              <button
                onClick={() => setRfmSegment('new')}
                className={`p-3.5 rounded-xl border text-left transition-all ${
                  rfmSegment === 'new'
                    ? 'bg-sky-500/20 border-sky-400 text-sky-300 font-bold'
                    : 'bg-[#0B132B] border-slate-800 text-slate-400'
                }`}
              >
                <p className="text-sm">New Members</p>
                <span className="text-[10px] text-slate-500">Onboarding Phase</span>
              </button>

              <button
                onClick={() => setRfmSegment('churned')}
                className={`p-3.5 rounded-xl border text-left transition-all ${
                  rfmSegment === 'churned'
                    ? 'bg-amber-500/20 border-amber-400 text-amber-300 font-bold'
                    : 'bg-[#0B132B] border-slate-800 text-slate-400'
                }`}
              >
                <p className="text-sm">Dormant</p>
                <span className="text-[10px] text-slate-500">Win-Back Target</span>
              </button>
            </div>

            {/* Segment Detail Output */}
            <div className="bg-[#0B132B] border border-slate-800 rounded-2xl p-6 space-y-4 font-sans">
              <div className="flex justify-between items-start border-b border-slate-800 pb-3">
                <div>
                  <h4 className="text-slate-100 font-bold text-lg font-sans">{segmentDetails[rfmSegment].title}</h4>
                  <span className="font-mono text-xs text-sky-400">{segmentDetails[rfmSegment].size}</span>
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4 font-mono text-xs">
                <div className="bg-[#1C2541] p-4 rounded-xl border border-slate-800">
                  <span className="text-slate-400">CHURN RISK METRIC:</span>
                  <p className="text-xl font-bold text-rose-400 mt-1">{segmentDetails[rfmSegment].churnRisk}</p>
                </div>

                <div className="bg-[#1C2541] p-4 rounded-xl border border-slate-800">
                  <span className="text-slate-400">PROJECTED LIFETIME VALUE (LTV):</span>
                  <p className="text-xl font-bold text-emerald-400 mt-1">{segmentDetails[rfmSegment].ltv}</p>
                </div>
              </div>

              <div className="p-4 bg-[#1C2541] border border-slate-800 rounded-xl space-y-1">
                <span className="font-mono text-xs text-sky-400 font-bold uppercase">STRATEGIC ACTION WORKFLOW:</span>
                <p className="text-slate-300 text-sm">{segmentDetails[rfmSegment].strategy}</p>
              </div>
            </div>

          </div>
        )}

      </div>
    </section>
  );
};
