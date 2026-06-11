import React, { useState, useEffect } from 'react';
import { getMilestones } from '../services/api';
import { ShieldCheck, ChevronRight } from 'lucide-react';

export default function Timeline({ themeColor = 'green', playClickSound }) {
  const [milestones, setMilestones] = useState([]);
  const [activeMilestoneId, setActiveMilestoneId] = useState('m-1');

  useEffect(() => {
    const fetchMilestones = async () => {
      const data = await getMilestones();
      setMilestones(data);
    };
    fetchMilestones();
  }, []);

  const textPrimary = themeColor === 'green' ? 'text-[#00ff66]' : 'text-[#00f0ff]';
  const borderPrimary = themeColor === 'green' ? 'border-[#00ff66]' : 'border-[#00f0ff]';
  const bgPrimary = themeColor === 'green' ? 'bg-[#00ff66]' : 'bg-[#00f0ff]';
  const glowShadow = themeColor === 'green' ? 'shadow-[0_0_15px_rgba(0,255,102,0.3)]' : 'shadow-[0_0_15px_rgba(0,240,255,0.3)]';
  const borderLight = themeColor === 'green' ? 'border-[#00ff66]/20' : 'border-[#00f0ff]/20';
  
  const getLogVerification = (milestoneId) => {
    switch (milestoneId) {
      case 'm-1':
        return `[VISION CONFIG]
TARGET_YEAR = 2026
PRIORITY = "CRITICAL"
AI_TECH_LIST = ["RAG", "LLM-Finetuning", "DeepSeek", "PyTorch"]
STATUS = "COMPILING_EXPERTISE"
HANDSHAKE_INITIATED = True`;
      case 'm-2':
        return `[GDC VERIFICATION]
PROFILE_STATUS = "ACTIVE"
BADGES_UNLOCKED = ["Cloud Fundamental", "API Architecture", "Python Core"]
LAST_CONTRIBUTION_TIMESTAMP = "${new Date().toISOString().substring(0,10)}"
VERDICT = "SECURE_CREDENTIAL"`;
      case 'm-3':
        return `[GH_EDU HANDSHAKE]
PARTNER_PACK_STATUS = "APPROVED"
COGNITO_TOKEN = "GH-EDU-77A9E281C3F9"
BENEFITS_CLAIMED = ["Copilot Access", "Premium SaaS Integration", "API Credits"]
INTEGRITY_CHECK = "PASS"`;
      case 'm-4':
        return `[FREELANCE INITIALIZATION]
INIT_YEAR = 2023
BUSINESS_TYPE = "Freelance Custom Web Apps"
TECH_DEFAULT = ["Python-Django", "DRF", "React", "PostgreSQL"]
TOTAL_CLIENTS_SERVED = 10+
FEEDBACK_SCORE = 1.00 (Max Integrity)`;
      default:
        return '';
    }
  };

  return (
    <section id="timeline" className="py-20 px-4 max-w-7xl mx-auto border-t border-neutral-900/60 relative font-grotesk">
      
      <div className="mb-12">
        <span className={`font-code text-xs tracking-widest ${textPrimary} uppercase block mb-2`}>
          // VERIFIED LOG & METRICS
        </span>
        <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white">
          Credentials & Milestones
        </h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        <div className="lg:col-span-7 relative pl-8 border-l border-neutral-900 flex flex-col gap-10">
          {milestones.map((item) => {
            const isActive = activeMilestoneId === item.id;
            return (
              <div 
                key={item.id} 
                className="relative group cursor-pointer"
                onClick={() => {
                  playClickSound();
                  setActiveMilestoneId(item.id);
                }}
              >
                <div 
                  className={`absolute -left-[41px] top-1.5 w-6 h-6 rounded-full border border-neutral-900 bg-neutral-950 flex items-center justify-center transition-all duration-300 ${
                    isActive 
                      ? `${borderPrimary} ${glowShadow} scale-110` 
                      : 'group-hover:border-neutral-700'
                  }`}
                >
                  <div className={`w-2 h-2 rounded-full transition-all ${
                    isActive ? bgPrimary : 'bg-neutral-800 group-hover:bg-neutral-600'
                  }`} />
                </div>

                <div className={`p-5 rounded-lg border transition-all duration-300 ${
                  isActive 
                    ? 'bg-neutral-900/40 border-neutral-800' 
                    : 'bg-transparent border-transparent hover:bg-neutral-950/40'
                }`}>
                  <div className="flex items-center gap-3 mb-2 flex-wrap">
                    <span className="font-code text-xs text-neutral-500 font-semibold">{item.year}</span>
                    <span className={`px-2 py-0.5 rounded text-[9px] font-code font-bold tracking-wider uppercase bg-neutral-900 border border-neutral-800 ${textPrimary}`}>
                      {item.badge}
                    </span>
                  </div>
                  <h3 className="font-bold text-white text-lg flex items-center gap-1.5 group-hover:text-white transition-colors">
                    {item.title}
                    <ChevronRight className={`w-4 h-4 transition-transform ${
                      isActive ? `translate-x-1 ${textPrimary}` : 'text-neutral-600'
                    }`} />
                  </h3>
                  <p className="text-xs text-neutral-400 mt-2 leading-relaxed max-w-xl">
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="lg:col-span-5">
          <div className="w-full bg-neutral-950 rounded-xl border border-neutral-900 p-5 font-code text-xs text-neutral-400 min-h-[300px] flex flex-col justify-between backdrop-blur-sm relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 pointer-events-none opacity-5 bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:10px_10px]" />
            
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-neutral-900 mb-4">
                <span className="flex items-center gap-1.5 font-bold uppercase text-[10px] tracking-wider text-neutral-300">
                  <ShieldCheck className={`w-4 h-4 ${textPrimary}`} />
                  Credentials Auditor
                </span>
                <span className="text-[9px] text-[#00ff66] flex items-center gap-1 animate-pulse">
                  ● SIGNATURE_VALID
                </span>
              </div>

              <div className="space-y-4">
                <div>
                  <span className="text-neutral-500">AUDIT_TARGET:</span>
                  <span className="text-white ml-2 block font-semibold">
                    {milestones.find(m => m.id === activeMilestoneId)?.title || 'SELECTING_LOG...'}
                  </span>
                </div>

                <div className="bg-black/80 p-4 rounded border border-neutral-900 text-[11px] leading-relaxed whitespace-pre font-light text-neutral-300 overflow-x-auto">
                  {getLogVerification(activeMilestoneId)}
                </div>
              </div>
            </div>

            <div className="border-t border-neutral-900 pt-4 mt-6 text-[10px] text-neutral-500 flex items-center justify-between">
              <span>ALGORITHM: SHA-256</span>
              <span>SECURE COMPLIANCE: 100%</span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
