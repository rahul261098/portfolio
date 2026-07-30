import React, { useState } from 'react';
import { Mail, Send, MapPin, Github, Linkedin, CheckCircle2, MessageSquare, Sparkles, AlertCircle } from 'lucide-react';

export const Contact: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) return;

    setLoading(true);
    setErrorMsg('');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, subject, message }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setSubmitted(true);
      } else {
        throw new Error(data.error || 'Failed to deliver message.');
      }
    } catch (err: any) {
      console.error('Contact submission error:', err);
      // Fallback submit to FormSubmit.co
      try {
        const fsRes = await fetch('https://formsubmit.co/ajax/rahulmandalin1998@gmail.com', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          },
          body: JSON.stringify({ name, email, _subject: subject, message }),
        });
        if (fsRes.ok) {
          setSubmitted(true);
          return;
        }
      } catch (fallbackErr) {
        console.error('Fallback submit error:', fallbackErr);
      }
      setErrorMsg('Direct API transmission failed. Please use WhatsApp or email directly below!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="py-20 px-4 sm:px-6 relative z-10 bg-[#0F172A] border-t border-slate-800">
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* Section Heading */}
        <div>
          <p className="font-mono text-xs tracking-widest text-sky-400 uppercase mb-2">// 06 — Let's Connect</p>
          <div className="w-12 h-1 bg-gradient-to-r from-sky-400 to-cyan-400 rounded-full mb-3"></div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-100 font-sans tracking-tight">
            Start a Conversation
          </h2>
          <p className="text-slate-300 text-sm font-sans max-w-xl">
            Whether discussing full-time Data Science roles, freelance analytics, or technical collaborations, I am always available to connect.
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column - Contact Information Cards */}
          <div className="lg:col-span-5 space-y-4">
            
            <div className="card-hover rounded-2xl p-6 space-y-4">
              <h3 className="font-mono text-xs text-sky-400 uppercase tracking-widest font-bold">CONTACT CHANNELS</h3>

              <div className="space-y-3 font-sans text-sm">
                <div className="flex items-center gap-3 text-slate-300 p-3 bg-[#0B132B] rounded-xl border border-slate-800">
                  <div className="w-9 h-9 rounded-lg bg-sky-500/10 border border-sky-500/20 flex items-center justify-center text-sky-400 flex-shrink-0">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[11px] font-mono text-slate-400 block">LOCATION</span>
                    <strong className="text-slate-100">Pune, Maharashtra, India</strong>
                  </div>
                </div>

                <a
                  href="mailto:rahulmandalin1998@gmail.com"
                  className="flex items-center gap-3 text-slate-300 p-3 bg-[#0B132B] rounded-xl border border-slate-800 hover:border-sky-500/50 transition-colors block"
                >
                  <div className="w-9 h-9 rounded-lg bg-sky-500/10 border border-sky-500/20 flex items-center justify-center text-sky-400 flex-shrink-0">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[11px] font-mono text-slate-400 block">EMAIL ADDRESS</span>
                    <strong className="text-slate-100">rahulmandalin1998@gmail.com</strong>
                  </div>
                </a>

                <a
                  href="https://wa.link/p1uoki"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-slate-300 p-3 bg-[#0B132B] rounded-xl border border-slate-800 hover:border-emerald-500/50 transition-colors block"
                >
                  <div className="w-9 h-9 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 flex-shrink-0">
                    <i className="fa-brands fa-whatsapp text-lg"></i>
                  </div>
                  <div>
                    <span className="text-[11px] font-mono text-slate-400 block">WHATSAPP DIRECT</span>
                    <strong className="text-emerald-400">Connect via WhatsApp</strong>
                  </div>
                </a>

                <a
                  href="https://github.com/rahul261098"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-slate-300 p-3 bg-[#0B132B] rounded-xl border border-slate-800 hover:border-sky-500/50 transition-colors block"
                >
                  <div className="w-9 h-9 rounded-lg bg-sky-500/10 border border-sky-500/20 flex items-center justify-center text-sky-400 flex-shrink-0">
                    <Github className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[11px] font-mono text-slate-400 block">GITHUB PROFILE</span>
                    <strong className="text-slate-100">github.com/rahul261098</strong>
                  </div>
                </a>

                <a
                  href="https://www.linkedin.com/in/rahul-mandal-066231249/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-slate-300 p-3 bg-[#0B132B] rounded-xl border border-slate-800 hover:border-sky-500/50 transition-colors block"
                >
                  <div className="w-9 h-9 rounded-lg bg-sky-500/10 border border-sky-500/20 flex items-center justify-center text-sky-400 flex-shrink-0">
                    <Linkedin className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[11px] font-mono text-slate-400 block">LINKEDIN NETWORK</span>
                    <strong className="text-slate-100">linkedin.com/in/rahul-mandal</strong>
                  </div>
                </a>
              </div>
            </div>

          </div>

          {/* Right Column - Contact Form */}
          <div className="lg:col-span-7 card-hover rounded-2xl p-6 sm:p-8 bg-[#1C2541]">
            {submitted ? (
              <div className="text-center py-12 space-y-4 font-sans animate-in fade-in duration-300">
                <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-400 flex items-center justify-center text-emerald-400 mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold text-slate-100">Message Sent Successfully!</h3>
                <p className="text-slate-300 text-sm max-w-md mx-auto">
                  Thank you for reaching out, {name}. I have received your message and will get back to you shortly.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="btn-outline px-6 py-2.5 rounded-xl text-xs font-mono font-bold mt-2"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="space-y-4 font-sans text-xs"
              >
                {errorMsg && (
                  <div className="p-3 bg-rose-500/10 border border-rose-500/30 rounded-xl text-rose-300 text-xs flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 flex-shrink-0 text-rose-400" />
                      <span>{errorMsg}</span>
                    </div>
                    <a
                      href={`mailto:rahulmandalin1998@gmail.com?subject=${encodeURIComponent(subject || 'Portfolio Inquiry')}&body=${encodeURIComponent(message)}`}
                      className="underline font-bold text-sky-400 hover:text-sky-300 whitespace-nowrap"
                    >
                      Open Email App
                    </a>
                  </div>
                )}

                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="font-mono text-slate-300 uppercase tracking-wider block">YOUR NAME</label>
                    <input
                      type="text"
                      name="name"
                      required
                      placeholder="e.g. John Doe"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full bg-[#0B132B] border border-slate-700 rounded-xl p-3 text-slate-100 text-sm outline-none focus:border-sky-400"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="font-mono text-slate-300 uppercase tracking-wider block">YOUR EMAIL</label>
                    <input
                      type="email"
                      name="email"
                      required
                      placeholder="e.g. john@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-[#0B132B] border border-slate-700 rounded-xl p-3 text-slate-100 text-sm outline-none focus:border-sky-400"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="font-mono text-slate-300 uppercase tracking-wider block">SUBJECT</label>
                  <input
                    type="text"
                    name="subject"
                    required
                    placeholder="e.g. Data Scientist Role / Analytics Consultation"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="w-full bg-[#0B132B] border border-slate-700 rounded-xl p-3 text-slate-100 text-sm outline-none focus:border-sky-400"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-mono text-slate-300 uppercase tracking-wider block">YOUR MESSAGE</label>
                  <textarea
                    name="message"
                    required
                    rows={5}
                    placeholder="Describe your project, position details, or questions..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full bg-[#0B132B] border border-slate-700 rounded-xl p-3 text-slate-100 text-sm outline-none focus:border-sky-400 resize-none"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="btn-glow w-full py-3.5 rounded-xl font-bold text-sm inline-flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer"
                >
                  {loading ? (
                    <>
                      <Sparkles className="w-4 h-4 animate-spin text-sky-300" />
                      <span>Sending Message...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Send Direct Message</span>
                    </>
                  )}
                </button>
              </form>
            )}
          </div>

        </div>

      </div>
    </section>
  );
};
