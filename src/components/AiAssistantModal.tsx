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

      const data = await response.json();

      if (data.reply) {
        const aiMsg: ChatMessage = {
          id: (Date.now() + 1).toString(),
          sender: 'ai',
          text: data.reply,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        };
        setMessages((prev) => [...prev, aiMsg]);
      } else {
        throw new Error(data.error || 'Failed to receive response');
      }
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          sender: 'ai',
          text: "I'm having trouble connecting to the Gemini server right now. Please try again shortly or contact Rahul directly via email or WhatsApp!",
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

      const data = await response.json();
      if (data.coverLetter) {
        setGeneratedCoverLetter(data.coverLetter);
      } else {
        throw new Error(data.error || 'Generation failed');
      }
    } catch (err) {
      alert('Failed to generate cover letter. Please try again.');
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
