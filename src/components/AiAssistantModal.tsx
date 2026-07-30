import React, { useState, useRef, useEffect } from 'react';
import { ChatMessage } from '../types';
import { Bot, Sparkles, Send, X, FileText, User, RefreshCw, Copy, Check, MessageSquare } from 'lucide-react';

interface AiAssistantModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AiAssistantModal: React.FC<AiAssistantModalProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<'chat' | 'coverLetter'>('chat');
  
  // Chat state
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      sender: 'ai',
      text: "Hello! I am Rahul Mandal's AI Data Science Assistant. Ask me anything about Rahul's machine learning projects, SQL queries, Tableau dashboards, education at Abeda Inamdar College, or how he can contribute to your team!",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Cover Letter Generator state
  const [companyName, setCompanyName] = useState('');
  const [jobRole, setJobRole] = useState('Data Scientist');
  const [requirements, setRequirements] = useState('');
  const [generatedCoverLetter, setGeneratedCoverLetter] = useState('');
  const [coverLoading, setCoverLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (activeTab === 'chat') {
      chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, activeTab]);

  if (!isOpen) return null;

  const getSmartFallbackResponse = (query: string): string => {
    const q = query.toLowerCase();

    if (q.includes('churn') || q.includes('smote') || q.includes('imbalance') || q.includes('retention') || q.includes('random forest')) {
      return `📊 Customer Churn Predictor & Retention Engine\n\nRahul built an end-to-end binary classification ML pipeline to predict customer churn:\n• Key Algorithms: XGBoost, Random Forest, Decision Trees, Logistic Regression.\n• Class Imbalance: Applied SMOTE oversampling to boost minority class detection.\n• Results: Achieved 89% recall and 0.91 ROC-AUC, directly identifying high-risk customers before churn.\n• Business Action: Created automated risk scoring rules that trigger targeted retention workflows.\n• GitHub Repository: https://github.com/rahul261098/churn_predictor`;
    }

    if (q.includes('salary') || q.includes('ctc') || q.includes('compensation') || q.includes('regression')) {
      return `💡 Salary / CTC Prediction for New Hires\n\nRahul engineered a predictive analytics solution for HR compensation modeling:\n• Approach: Multi-variable Linear Regression & Random Forest Regressor.\n• Feature Engineering: Standardized tier rankings, weighted years of experience, and skill set indices.\n• Outcome: Reduced variance in candidate salary estimates, helping talent acquisition optimize compensation budgets.`;
    }

    if (q.includes('bike') || q.includes('tableau') || q.includes('sales') || q.includes('dashboard') || q.includes('excel')) {
      return `🚴 Bike Heaven Sales Analytics & Executive Dashboards\n\nRahul conducted comprehensive sales & operational analysis using Excel, Python, and Tableau:\n• Key Insights: Identified top-performing geographic regions, seasonal demand spikes, and high-margin product categories.\n• Deliverables: Created interactive Tableau dashboards with dynamic parameters and automated Excel reporting templates for executive decision-making.`;
    }

    if (q.includes('ipl') || q.includes('auction') || q.includes('valuation') || q.includes('cricket') || q.includes('sql')) {
      return `🏏 IPL Franchise Auction Strategy & Player Valuation\n\nRahul leveraged SQL and Python to build a sports analytics valuation system:\n• SQL Analysis: Aggregated multi-season player stats using complex SQL queries (window functions, JOINs, CTEs).\n• Valuation Metric: Computed custom Composite Performance Scores per player role (Batsmen, Bowlers, All-rounders).\n• Outcome: Designed a budget-constrained squad optimization model for IPL franchise auction strategy.`;
    }

    if (q.includes('skill') || q.includes('python') || q.includes('tech') || q.includes('language') || q.includes('stack') || q.includes('tool')) {
      return `🛠️ Rahul Mandal's Technical Stack & Core Competencies\n\n• Programming & Databases: Python (Pandas, NumPy, Scikit-learn, Matplotlib, Seaborn), SQL (PostgreSQL, MySQL, Complex Queries, Window Functions)\n• Data Analytics & BI: Tableau (Interactive Dashboards, Calculated Fields), MS Excel (Advanced Formulas, VLOOKUP, Pivot Tables)\n• Machine Learning: Binary/Multi-class Classification, Regression Analysis, SMOTE, Hyperparameter Tuning, Feature Engineering, Cross-Validation\n• Certifications: Data Science Specialization, Machine Learning with Python, Tableau, SQL, and Excel (Internshala 2024)`;
    }

    if (q.includes('education') || q.includes('college') || q.includes('degree') || q.includes('abeda') || q.includes('pune') || q.includes('university')) {
      return `🎓 Education & Certifications\n\n• Degree: B.Sc. in Computer Science (2018 – 2021)\n• Institution: Abeda Inamdar Senior College, Pune, Maharashtra, India\n• Coursework: Mathematics, Data Structures, Algorithms, Relational Databases, Computer Fundamentals\n• Certifications (2024): Data Science Specialization, ML with Python, Tableau, SQL, and Advanced Excel`;
    }

    if (q.includes('why') || q.includes('hire') || q.includes('contribute') || q.includes('value') || q.includes('benefit')) {
      return `🎯 Why Hire Rahul Mandal for Your Data Team?\n\n1. End-to-End Execution: Experienced in taking raw data from SQL extraction to EDA, feature engineering, ML modeling, and deployment.\n2. Business Impact Focus: Prioritizes key business metrics (like 89% recall in churn reduction or HR salary estimation accuracy) rather than just theoretical models.\n3. Strong Analytical Foundation: Strong combination of B.Sc. CS education, 5 professional certifications, and hands-on Python/SQL/Tableau project expertise.\n4. Actionable Communication: Skilled in translating statistical findings into clear executive dashboards and data stories.\n\nReach out directly at rahulmandalin1998@gmail.com or via WhatsApp!`;
    }

    if (q.includes('contact') || q.includes('email') || q.includes('whatsapp') || q.includes('phone') || q.includes('linkedin') || q.includes('github') || q.includes('location') || q.includes('pune')) {
      return `📬 Get in Touch with Rahul Mandal\n\n• Location: Pune, Maharashtra, India\n• Email: rahulmandalin1998@gmail.com\n• WhatsApp: https://wa.link/p1uoki\n• LinkedIn: https://www.linkedin.com/in/rahul-mandal-066231249/\n• GitHub: https://github.com/rahul261098`;
    }

    return `🤖 Rahul Mandal's Data Science AI Assistant\n\nRahul is a Data Scientist and ML Engineer based in Pune, India. Here are key highlights of his background:\n\n• Specializations: Machine Learning (Scikit-learn, XGBoost), Python Data Analysis (Pandas, NumPy), SQL Database Querying, and Tableau BI Dashboards.\n• Top Projects:\n  1. Customer Churn Predictor & Retention Engine (89% Recall, SMOTE)\n  2. Salary / CTC Prediction for New Hires (ML HR Analytics)\n  3. Bike Heaven Sales Analysis (Tableau & Excel BI)\n  4. IPL Franchise Auction Player Valuation (SQL Analytics)\n• Education: B.Sc. Computer Science (Abeda Inamdar College, Pune) + 5 Data Science Certifications (2024).\n\nHow can I help you today? You can ask about his projects, technical stack, or generate a tailored cover letter!`;
  };

  const generateFallbackCoverLetter = (company: string, role: string, reqs: string): string => {
    const comp = company.trim() || '[Company Name]';
    const job = role.trim() || 'Data Scientist';
    const focus = reqs.trim() || 'Data Science, Machine Learning, Python, SQL, Tableau, and predictive modeling';

    return `Dear Hiring Manager,

I am writing to express my enthusiastic interest in the ${job} position at ${comp}. With a solid academic background in Computer Science (B.Sc. from Abeda Inamdar Senior College, Pune), 5 professional Data Science certifications, and hands-on experience building end-to-end Machine Learning pipelines, I am eager to contribute to ${comp}'s data initiatives.

In my recent projects, I have consistently applied Python, SQL, Scikit-learn, and Tableau to solve critical business challenges:
• In my Customer Churn Predictor project, I built a machine learning classification pipeline with SMOTE oversampling, achieving an 89% recall rate and 0.91 ROC-AUC to help identify at-risk customers proactively.
• In HR compensation analytics, I engineered regression models to predict new-hire salary expectations, optimizing budget allocation.
• In business intelligence, I designed interactive Tableau dashboards and SQL analytics solutions to extract high-impact operational insights.

Your requirement for skills in ${focus} aligns directly with my expertise in exploratory data analysis, feature engineering, predictive modeling, and data storytelling. I pride myself on turning raw datasets into structured, actionable business strategy.

I would welcome the opportunity to discuss how my technical skills and analytical mindset can add immediate value to ${comp}. Thank you for your time and consideration.

Sincerely,

Rahul Mandal
Pune, Maharashtra, India
Email: rahulmandalin1998@gmail.com
LinkedIn: linkedin.com/in/rahul-mandal-066231249/
GitHub: github.com/rahul261098`;
  };

  const handleSendMessage = async (textToSend?: string) => {
    const text = textToSend || inputMessage.trim();
    if (!text || loading) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: 'user',
      text: text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInputMessage('');
    setLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: text,
          history: messages,
        }),
      });

      if (!response.ok) {
        throw new Error(`Server returned ${response.status}`);
      }

      const data = await response.json();

      if (data && data.reply) {
        const aiMsg: ChatMessage = {
          id: (Date.now() + 1).toString(),
          sender: 'ai',
          text: data.reply,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        };
        setMessages((prev) => [...prev, aiMsg]);
      } else {
        throw new Error(data?.error || 'Failed to receive response');
      }
    } catch (err) {
      // Fallback to intelligent client-side portfolio AI assistant
      const fallbackReply = getSmartFallbackResponse(text);
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          sender: 'ai',
          text: fallbackReply,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleGenerateCoverLetter = async (e: React.FormEvent) => {
    e.preventDefault();
    setCoverLoading(true);

    try {
      const response = await fetch('/api/cover-letter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          companyName,
          jobRole,
          keyRequirements: requirements,
        }),
      });

      if (!response.ok) {
        throw new Error(`Server status ${response.status}`);
      }

      const data = await response.json();
      if (data && data.coverLetter) {
        setGeneratedCoverLetter(data.coverLetter);
      } else {
        throw new Error(data?.error || 'Generation failed');
      }
    } catch (err) {
      // Fallback client-side cover letter generator
      const fallbackLetter = generateFallbackCoverLetter(companyName, jobRole, requirements);
      setGeneratedCoverLetter(fallbackLetter);
    } finally {
      setCoverLoading(false);
    }
  };

  const handleCopyCoverLetter = () => {
    navigator.clipboard.writeText(generatedCoverLetter);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md">
      <div className="bg-[#1C2541] border border-slate-700 rounded-2xl w-full max-w-3xl h-[85vh] flex flex-col shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
        
        {/* Modal Header */}
        <div className="px-6 py-4 bg-[#0B132B] border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-sky-500/10 border border-sky-500/20 flex items-center justify-center text-sky-400">
              <Sparkles className="w-5 h-5 text-sky-400 animate-pulse" />
            </div>
            <div>
              <h3 className="text-slate-100 font-bold text-base font-sans">Rahul's Gemini AI Assistant</h3>
              <p className="text-slate-400 font-mono text-[11px]">Powered by Google Gemini 3.6 Flash</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Modal Tabs */}
            <div className="flex bg-[#1C2541] p-1 rounded-xl border border-slate-800 font-mono text-xs">
              <button
                onClick={() => setActiveTab('chat')}
                className={`px-3 py-1 rounded-lg flex items-center gap-1.5 transition-colors ${
                  activeTab === 'chat'
                    ? 'bg-sky-500 text-slate-900 font-bold'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>Chat</span>
              </button>

              <button
                onClick={() => setActiveTab('coverLetter')}
                className={`px-3 py-1 rounded-lg flex items-center gap-1.5 transition-colors ${
                  activeTab === 'coverLetter'
                    ? 'bg-sky-500 text-slate-900 font-bold'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <FileText className="w-3.5 h-3.5" />
                <span>Cover Letter</span>
              </button>
            </div>

            <button
              onClick={onClose}
              className="p-1.5 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-slate-200"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body - Tab 1: Chat */}
        {activeTab === 'chat' && (
          <div className="flex-1 flex flex-col justify-between overflow-hidden bg-[#0B132B]">
            
            {/* Scrollable Message Thread */}
            <div className="flex-1 p-4 sm:p-6 overflow-y-auto space-y-4">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex gap-3 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  {msg.sender === 'ai' && (
                    <div className="w-8 h-8 rounded-xl bg-sky-500/10 border border-sky-500/20 flex items-center justify-center text-sky-400 flex-shrink-0 mt-1">
                      <Bot className="w-4 h-4" />
                    </div>
                  )}

                  <div
                    className={`max-w-[80%] rounded-2xl p-4 text-sm font-sans leading-relaxed shadow-md ${
                      msg.sender === 'user'
                        ? 'bg-sky-500 text-slate-950 font-medium'
                        : 'bg-[#1C2541] border border-slate-700/80 text-slate-100'
                    }`}
                  >
                    <p className="whitespace-pre-wrap">{msg.text}</p>
                    <span
                      className={`block font-mono text-[10px] mt-2 text-right ${
                        msg.sender === 'user' ? 'text-slate-900/70' : 'text-slate-500'
                      }`}
                    >
                      {msg.timestamp}
                    </span>
                  </div>

                  {msg.sender === 'user' && (
                    <div className="w-8 h-8 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-300 flex-shrink-0 mt-1">
                      <User className="w-4 h-4" />
                    </div>
                  )}
                </div>
              ))}

              {loading && (
                <div className="flex gap-3 items-center text-slate-400 font-mono text-xs">
                  <div className="w-8 h-8 rounded-xl bg-sky-500/10 border border-sky-500/20 flex items-center justify-center text-sky-400">
                    <Sparkles className="w-4 h-4 animate-spin" />
                  </div>
                  <span>Gemini AI is generating response...</span>
                </div>
              )}

              <div ref={chatEndRef} />
            </div>

            {/* Quick Suggestion Chips */}
            <div className="px-4 py-2 bg-[#1C2541]/60 border-t border-slate-800 flex gap-2 overflow-x-auto text-xs font-mono text-slate-300">
              <button
                onClick={() => handleSendMessage('How does Rahul handle imbalanced data and SMOTE in the Churn Predictor project?')}
                className="px-3 py-1 rounded-full bg-slate-800 hover:bg-slate-700 border border-slate-700 whitespace-nowrap text-rose-300"
              >
                📊 Churn ML & SMOTE
              </button>
              <button
                onClick={() => handleSendMessage('What ML algorithms did Rahul use for CTC prediction?')}
                className="px-3 py-1 rounded-full bg-slate-800 hover:bg-slate-700 border border-slate-700 whitespace-nowrap"
              >
                💡 CTC Prediction ML
              </button>
              <button
                onClick={() => handleSendMessage("Tell me about Rahul's SQL work on the IPL Auction project.")}
                className="px-3 py-1 rounded-full bg-slate-800 hover:bg-slate-700 border border-slate-700 whitespace-nowrap"
              >
                🏏 IPL SQL Valuation
              </button>
              <button
                onClick={() => handleSendMessage('Why should we hire Rahul for a Data Science role?')}
                className="px-3 py-1 rounded-full bg-slate-800 hover:bg-slate-700 border border-slate-700 whitespace-nowrap"
              >
                🎯 Why Hire Rahul
              </button>
            </div>

            {/* Message Input Box */}
            <div className="p-4 bg-[#1C2541] border-t border-slate-800">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSendMessage();
                }}
                className="flex items-center gap-2"
              >
                <input
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  placeholder="Ask Gemini anything about Rahul Mandal..."
                  className="flex-1 bg-[#0B132B] border border-slate-700 rounded-xl px-4 py-3 text-slate-100 placeholder-slate-500 text-sm outline-none focus:border-sky-400"
                />
                <button
                  type="submit"
                  disabled={loading || !inputMessage.trim()}
                  className="btn-glow px-5 py-3 rounded-xl font-bold text-xs inline-flex items-center gap-2 disabled:opacity-50"
                >
                  <span>Send</span>
                  <Send className="w-3.5 h-3.5" />
                </button>
              </form>
            </div>

          </div>
        )}

        {/* Modal Body - Tab 2: Cover Letter Generator */}
        {activeTab === 'coverLetter' && (
          <div className="flex-1 p-6 overflow-y-auto bg-[#0B132B] space-y-6">
            <div className="space-y-1">
              <h4 className="text-slate-100 font-bold text-lg font-sans">Generate Tailored Cover Letter</h4>
              <p className="text-slate-400 text-xs font-mono">
                Provide hiring company details to instantly generate a tailored cover letter from Rahul.
              </p>
            </div>

            <form onSubmit={handleGenerateCoverLetter} className="grid sm:grid-cols-2 gap-4 font-sans text-xs">
              <div>
                <label className="text-slate-300 font-mono block mb-1">Company / Organization Name:</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Acme Corp / Tech Mahindra"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  className="w-full bg-[#1C2541] border border-slate-700 rounded-xl p-3 text-slate-100 outline-none focus:border-sky-400"
                />
              </div>

              <div>
                <label className="text-slate-300 font-mono block mb-1">Job Role Title:</label>
                <input
                  type="text"
                  required
                  value={jobRole}
                  onChange={(e) => setJobRole(e.target.value)}
                  className="w-full bg-[#1C2541] border border-slate-700 rounded-xl p-3 text-slate-100 outline-none focus:border-sky-400"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="text-slate-300 font-mono block mb-1">Key Focus Areas / Skill Requirements:</label>
                <textarea
                  rows={2}
                  placeholder="e.g. Python, SQL, Machine Learning pipelines, Tableau dashboards, predictive analytics..."
                  value={requirements}
                  onChange={(e) => setRequirements(e.target.value)}
                  className="w-full bg-[#1C2541] border border-slate-700 rounded-xl p-3 text-slate-100 outline-none focus:border-sky-400 resize-none"
                ></textarea>
              </div>

              <div className="sm:col-span-2">
                <button
                  type="submit"
                  disabled={coverLoading}
                  className="btn-glow w-full py-3 rounded-xl font-bold flex items-center justify-center gap-2"
                >
                  {coverLoading ? (
                    <>
                      <Sparkles className="w-4 h-4 animate-spin" />
                      <span>Generating Cover Letter...</span>
                    </>
                  ) : (
                    <>
                      <FileText className="w-4 h-4" />
                      <span>Generate Tailored Cover Letter</span>
                    </>
                  )}
                </button>
              </div>
            </form>

            {/* Result Box */}
            {generatedCoverLetter && (
              <div className="bg-[#1C2541] border border-slate-700 rounded-2xl p-5 space-y-3">
                <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                  <span className="font-mono text-xs text-sky-400 font-bold">GENERATED COVER LETTER</span>
                  <button
                    onClick={handleCopyCoverLetter}
                    className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 font-mono text-xs transition-colors"
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copied ? 'Copied to Clipboard' : 'Copy Text'}</span>
                  </button>
                </div>

                <div className="text-slate-200 text-sm leading-relaxed whitespace-pre-wrap font-sans max-h-[35vh] overflow-y-auto">
                  {generatedCoverLetter}
                </div>
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
};
