import React, { useState, useEffect, useRef } from 'react';
import { Terminal, Shield, Play, ArrowRight, X, Printer } from 'lucide-react';

export default function TerminalHero({ themeColor = 'green', playClickSound, onInitializeContact }) {
  const [terminalCommand, setTerminalCommand] = useState('');
  const [activeCommand, setActiveCommand] = useState('whoami');
  const [typedOutput, setTypedOutput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showResumeModal, setShowResumeModal] = useState(false);
  const typingTimerRef = useRef(null);

  const commands = {
    whoami: `> Fetching system identity...
NAME: Manknojiya Sufiyan Bhai Aiyub Bhai
ALIAS: Sufill X Man
ROLE: Freelance Web Developer & Student
ACADEMICS: Pursuing BCA (Bachelor of Computer Applications)
STATUS: Actively developing full-stack web architectures.`,

    skills: `> Initializing tech stack analysis...
[BACKEND CONTEXT]
 - Language: Python
 - Frameworks: Django, Django REST Framework (DRF)
 - Database: MySQL, PostgreSQL
[FRONTEND CONTEXT]
 - Framework: React.js
 - Styling: Tailwind CSS, CSS3, Vanilla HTML5
 - Language: Modern JavaScript (ES6+)`,

    target: `> Projecting milestones to target 2026...
[TARGET 2026]
 OBJECTIVE: Evolve into a Top-Tier AI, Web & API Full-Stack Developer.
 FOCUS AREAS: 
  - LLM Fine-Tuning & Prompt Engineering
  - Autonomous Agent & Drone Protocol API integration
  - Production-grade High-Availability Microservices`
  };

  const runCommand = (cmdKey) => {
    if (isTyping) return;
    playClickSound();
    setActiveCommand(cmdKey);
    setIsTyping(true);
    setTerminalCommand(cmdKey);
    setTypedOutput('');

    const fullText = commands[cmdKey];
    let index = 0;
    
    if (typingTimerRef.current) clearInterval(typingTimerRef.current);

    typingTimerRef.current = setInterval(() => {
      if (index < fullText.length) {
        setTypedOutput((prev) => prev + fullText.charAt(index));
        index++;
      } else {
        clearInterval(typingTimerRef.current);
        setIsTyping(false);
      }
    }, 12);
  };

  useEffect(() => {
    runCommand('whoami');
    return () => {
      if (typingTimerRef.current) clearInterval(typingTimerRef.current);
    };
  }, []);

  const textPrimary = themeColor === 'green' ? 'text-[#00ff66]' : 'text-[#00f0ff]';
  const borderPrimary = themeColor === 'green' ? 'border-[#00ff66]' : 'border-[#00f0ff]';
  const bgPrimary = themeColor === 'green' ? 'bg-[#00ff66]' : 'bg-[#00f0ff]';
  const glowShadow = themeColor === 'green' ? 'shadow-[0_0_15px_rgba(0,255,102,0.4)]' : 'shadow-[0_0_15px_rgba(0,240,255,0.4)]';
  const borderLight = themeColor === 'green' ? 'border-[#00ff66]/30' : 'border-[#00f0ff]/30';

  return (
    <section id="hero" className="min-h-screen pt-28 pb-12 flex flex-col justify-center items-center px-4 relative max-w-6xl mx-auto font-grotesk">
      
      <div className="flex items-center gap-2 px-3 py-1 bg-neutral-900/85 border border-neutral-800 rounded-full mb-6 animate-pulse">
        <Shield className={`w-3.5 h-3.5 ${textPrimary}`} />
        <span className="font-code text-[10px] tracking-wider text-neutral-400">
          SECURE CONNECTION ESTABLISHED // PORT: 8080
        </span>
      </div>

      <div className="text-center max-w-4xl mb-8">
        <h1 className="font-extrabold text-4xl sm:text-6xl lg:text-7xl tracking-tight leading-none mb-6">
          Executing Code.<br />
          <span className={`bg-gradient-to-r ${themeColor === 'green' ? 'from-[#00ff66] to-[#00aa44]' : 'from-[#00f0ff] to-[#0088cc]'} bg-clip-text text-transparent`}>
            Engineering the Future.
          </span>
        </h1>
        <p className="text-neutral-400 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
          Hi, I am <strong className="text-white font-medium">Manknojiya Sufiyan</strong> (Alias: <strong className="text-white font-medium">Sufill X Man</strong>). 
          A Backend Specialist and Frontend Creator shaping high-performance APIs, database architectures, and next-generation full-stack systems.
        </p>
      </div>

      <div className={`w-full max-w-3xl bg-neutral-950/80 rounded-xl border ${borderLight} ${glowShadow} overflow-hidden backdrop-blur-md transition-all duration-300 mb-10`}>
        <div className="flex items-center justify-between px-4 py-3 bg-neutral-900/60 border-b border-neutral-900">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-red-500/80"></span>
            <span className="w-3 h-3 rounded-full bg-yellow-500/80"></span>
            <span className="w-3 h-3 rounded-full bg-green-500/80"></span>
          </div>
          <span className="font-code text-[10px] text-neutral-500 flex items-center gap-1.5">
            <Terminal className="w-3 h-3" /> bash - sufill@mainframe:~
          </span>
          <span className="w-12"></span>
        </div>

        <div className="p-5 font-code text-xs sm:text-sm text-neutral-300 min-h-[280px] flex flex-col justify-between">
          <div className="whitespace-pre-wrap leading-relaxed select-text">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-neutral-500">guest@sfx-terminal:~$</span>
              <span className={`px-2 py-0.5 rounded text-[10px] bg-neutral-900 border border-neutral-800 ${textPrimary}`}>
                {terminalCommand}
              </span>
            </div>

            <div className="text-neutral-300 font-light min-h-[160px]">
              {typedOutput}
              {isTyping && <span className={`inline-block w-2 h-4 ${bgPrimary} ml-1 animate-pulse`} />}
            </div>
          </div>

          <div className="mt-6 border-t border-neutral-900 pt-4 flex flex-wrap gap-2 items-center justify-between">
            <div className="flex flex-wrap gap-2">
              <button
                disabled={isTyping}
                onClick={() => runCommand('whoami')}
                className={`px-3 py-1.5 rounded border text-[11px] font-medium transition-all ${
                  activeCommand === 'whoami' 
                    ? `${borderPrimary} ${textPrimary} bg-neutral-900` 
                    : 'border-neutral-800 text-neutral-400 hover:border-neutral-700 hover:text-white'
                }`}
              >
                whoami
              </button>
              <button
                disabled={isTyping}
                onClick={() => runCommand('skills')}
                className={`px-3 py-1.5 rounded border text-[11px] font-medium transition-all ${
                  activeCommand === 'skills' 
                    ? `${borderPrimary} ${textPrimary} bg-neutral-900` 
                    : 'border-neutral-800 text-neutral-400 hover:border-neutral-700 hover:text-white'
                }`}
              >
                cat skills.cfg
              </button>
              <button
                disabled={isTyping}
                onClick={() => runCommand('target')}
                className={`px-3 py-1.5 rounded border text-[11px] font-medium transition-all ${
                  activeCommand === 'target' 
                    ? `${borderPrimary} ${textPrimary} bg-neutral-900` 
                    : 'border-neutral-800 text-neutral-400 hover:border-neutral-700 hover:text-white'
                }`}
              >
                ./target_2026.exe
              </button>
            </div>
            
            <span className="text-[10px] text-neutral-600 hidden sm:inline">
              [CMD_EXECUTOR READY]
            </span>
          </div>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto items-center justify-center">
        <button
          onClick={() => {
            playClickSound();
            setShowResumeModal(true);
          }}
          className={`group flex items-center justify-center gap-2 px-8 py-3.5 rounded-lg font-bold border transition-all duration-300 w-full sm:w-52 text-black ${bgPrimary} ${borderPrimary} hover:bg-transparent hover:text-white hover:shadow-none ${
            themeColor === 'green' ? 'hover:border-[#00ff66]' : 'hover:border-[#00f0ff]'
          }`}
          data-magnetic
        >
          <Play className="w-4 h-4 fill-current transition-transform group-hover:scale-110" />
          <span>Deploy Resume</span>
        </button>

        <button
          onClick={() => {
            playClickSound();
            onInitializeContact();
          }}
          className="flex items-center justify-center gap-2 px-8 py-3.5 rounded-lg font-bold border border-solid transition-all duration-300 w-full sm:w-52 bg-transparent text-white border-neutral-800 hover:border-white"
          data-magnetic
        >
          <span>Initialize Contact</span>
          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
        </button>
      </div>

      {showResumeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-sm p-4 overflow-y-auto">
          <div className="relative w-full max-w-4xl bg-neutral-900 border border-neutral-800 rounded-xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]">
            
            <div className="flex items-center justify-between px-6 py-4 bg-neutral-950 border-b border-neutral-800 print:hidden">
              <span className="font-bold text-sm tracking-widest text-white flex items-center gap-2">
                <Shield className={`w-4 h-4 ${textPrimary}`} />
                SUFIYAN_AIYUB_RESUME_CV
              </span>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => window.print()}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded bg-neutral-900 hover:bg-neutral-800 text-xs font-semibold text-neutral-200 border border-neutral-800"
                >
                  <Printer className="w-3.5 h-3.5" />
                  Print / Save PDF
                </button>
                <button
                  onClick={() => setShowResumeModal(false)}
                  className="p-1 rounded bg-neutral-900 hover:bg-neutral-800 text-neutral-400 hover:text-white border border-neutral-800"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-8 md:p-12 text-neutral-800 bg-white print:p-0 print:m-0 print:bg-white select-text">
              <div className="border-b-2 border-neutral-900 pb-6 mb-6 flex flex-col md:flex-row md:items-end justify-between">
                <div>
                  <h1 className="text-3xl font-extrabold text-neutral-900 leading-none mb-1">
                    Manknojiya Sufiyan Bhai Aiyub Bhai
                  </h1>
                  <p className="text-neutral-500 font-code text-sm font-semibold">
                    Alias: Sufill X Man | BCA Student & Full-Stack Developer
                  </p>
                </div>
                <div className="text-left md:text-right mt-4 md:mt-0 font-code text-xs text-neutral-600 space-y-1">
                  <div>Email: sufilldigital@gmail.com</div>
                  <div>GitHub: github.com/sufillxman</div>
                  <div>LinkedIn: linkedin.com/in/sufill-x-man</div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="space-y-6 md:col-span-1">
                  <div>
                    <h3 className="text-sm font-black uppercase tracking-wider text-neutral-900 border-b border-neutral-300 pb-1.5 mb-3">
                      Core Tech Stack
                    </h3>
                    <div className="space-y-4">
                      <div>
                        <div className="text-xs font-bold text-neutral-700">Backend Development</div>
                        <div className="text-xs text-neutral-600 font-code mt-1">Python, Django, Django REST Framework (DRF), MySQL, PostgreSQL</div>
                      </div>
                      <div>
                        <div className="text-xs font-bold text-neutral-700">Frontend Development</div>
                        <div className="text-xs text-neutral-600 font-code mt-1">React, Tailwind CSS, JavaScript (ES6+), HTML5, CSS3</div>
                      </div>
                      <div>
                        <div className="text-xs font-bold text-neutral-700">Tools & Platforms</div>
                        <div className="text-xs text-neutral-600 font-code mt-1">Git, GitHub Education, CapacitorJS, Vite</div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm font-black uppercase tracking-wider text-neutral-900 border-b border-neutral-300 pb-1.5 mb-3">
                      Education
                    </h3>
                    <div>
                      <div className="text-xs font-bold text-neutral-800">Bachelor of Computer Applications (BCA)</div>
                      <div className="text-[10px] text-neutral-500 font-code">2023 - Present</div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm font-black uppercase tracking-wider text-neutral-900 border-b border-neutral-300 pb-1.5 mb-3">
                      Milestones
                    </h3>
                    <ul className="text-xs text-neutral-600 space-y-2 list-disc pl-4 font-code">
                      <li>Approved GitHub Student Developer Partner</li>
                      <li>Active Google Developers Profile contributor</li>
                      <li>Independent full-stack freelance projects</li>
                    </ul>
                  </div>
                </div>

                <div className="space-y-6 md:col-span-2">
                  <div>
                    <h3 className="text-sm font-black uppercase tracking-wider text-neutral-900 border-b border-neutral-300 pb-1.5 mb-3">
                      Professional Objective
                    </h3>
                    <p className="text-xs text-neutral-600 leading-relaxed">
                      Driven BCA undergraduate and active freelance developer dedicated to engineering reliable, secure backend APIs and dynamic frontends. Projecting to escalate core expertise in LLM agents, cloud infrastructure integrations, and high-availability database scaling to stand as a top-tier Full-Stack AI Engineer by 2026.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-sm font-black uppercase tracking-wider text-neutral-900 border-b border-neutral-300 pb-1.5 mb-3">
                      Featured Software Projects
                    </h3>
                    <div className="space-y-4">
                      <div>
                        <div className="flex items-center justify-between">
                          <h4 className="text-xs font-bold text-neutral-850">NMP ERP — Custom Billing & Enterprise Automation</h4>
                          <span className="text-[10px] font-code text-neutral-500">Python, Django, Tally</span>
                        </div>
                        <p className="text-xs text-neutral-650 mt-1 leading-relaxed">
                          Developed a modular enterprise automation suite integrating legacy Tally accounting formats. Designed automated invoice logs, ledger reconciliation queues, and dynamic tax calculation models.
                        </p>
                      </div>

                      <div>
                        <div className="flex items-center justify-between">
                          <h4 className="text-xs font-bold text-neutral-850">AI & Drone Autopilot Automation Research</h4>
                          <span className="text-[10px] font-code text-neutral-500">Python, LLMs, DroneKit</span>
                        </div>
                        <p className="text-xs text-neutral-650 mt-1 leading-relaxed">
                          Experimented with autonomous navigation pipelines, utilizing computer vision mapping algorithms linked with Large Language Model decision agents to trigger heading updates.
                        </p>
                      </div>

                      <div>
                        <div className="flex items-center justify-between">
                          <h4 className="text-xs font-bold text-neutral-850">K-Mart Business Workflows Analysis</h4>
                          <span className="text-[10px] font-code text-neutral-500">System Blueprinting, UML</span>
                        </div>
                        <p className="text-xs text-neutral-650 mt-1 leading-relaxed">
                          Analyzed enterprise billing architectures and retail logic flows during academic internships. Mapped bottlenecks and designed database schema revisions to optimize order speed.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
