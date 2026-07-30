import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Skills } from './components/Skills';
import { Projects } from './components/Projects';
import { Simulators } from './components/Simulators';
import { EducationCertifications } from './components/EducationCertifications';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { AiAssistantModal } from './components/AiAssistantModal';
import { ResumeModal } from './components/ResumeModal';

export default function App() {
  const [aiModalOpen, setAiModalOpen] = useState(false);
  const [resumeModalOpen, setResumeModalOpen] = useState(false);
  const [activeSimulator, setActiveSimulator] = useState<'ctc' | 'bike' | 'ipl' | 'wefit' | 'churn'>('churn');

  const handleLaunchSimulator = (simType: 'ctc' | 'bike' | 'ipl' | 'wefit' | 'churn') => {
    setActiveSimulator(simType);
    const simSection = document.getElementById('simulators');
    if (simSection) {
      simSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#0B132B] text-slate-100 selection:bg-sky-500/30 selection:text-sky-300">
      {/* Navigation Header */}
      <Navbar
        onOpenAiAssistant={() => setAiModalOpen(true)}
        onOpenResume={() => setResumeModalOpen(true)}
      />

      {/* Main Sections */}
      <main>
        <Hero
          onOpenAiAssistant={() => setAiModalOpen(true)}
          onOpenResume={() => setResumeModalOpen(true)}
        />
        <About />
        <Skills />
        <Projects onSelectSimulator={handleLaunchSimulator} />
        <Simulators
          activeSimType={activeSimulator}
          onSimTypeChange={setActiveSimulator}
        />
        <EducationCertifications />
        <Contact />
      </main>

      {/* Footer */}
      <Footer />

      {/* Modals */}
      <AiAssistantModal
        isOpen={aiModalOpen}
        onClose={() => setAiModalOpen(false)}
      />

      <ResumeModal
        isOpen={resumeModalOpen}
        onClose={() => setResumeModalOpen(false)}
      />
    </div>
  );
}
