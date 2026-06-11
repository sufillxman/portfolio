import React, { useState } from 'react';
import Navbar from './components/Navbar';
import TerminalHero from './components/TerminalHero';
import ProjectsGrid from './components/ProjectsGrid';
import Timeline from './components/Timeline';
import TerminalContact from './components/TerminalContact';
import InteractiveBackground from './components/InteractiveBackground';
import { Shield, ShieldCheck, Heart } from 'lucide-react';

function App() {
  const [themeColor, setThemeColor] = useState('green');
  const [backgroundMode, setBackgroundMode] = useState('matrix');
  const [soundEnabled, setSoundEnabled] = useState(false);

  const playClickSound = () => {
    if (!soundEnabled) return;
    try {
      const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(900, audioCtx.currentTime);

      gain.gain.setValueAtTime(0.03, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.06);

      osc.connect(gain);
      gain.connect(audioCtx.destination);

      osc.start();
      osc.stop(audioCtx.currentTime + 0.06);
    } catch (e) {
      console.warn("AudioContext failed:", e);
    }
  };

  const handleInitializeContact = () => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const textPrimary = themeColor === 'green' ? 'text-[#00ff66]' : 'text-[#00f0ff]';

  return (
    <>
      <InteractiveBackground themeColor={themeColor} mode={backgroundMode} />

      <div className="scanlines" />

      <div className="min-h-screen flex flex-col justify-between selection:bg-[#00ff66]/20 selection:text-[#00ff66] text-neutral-300 antialiased relative z-10">
        
        <Navbar 
          themeColor={themeColor} 
          setThemeColor={setThemeColor} 
          backgroundMode={backgroundMode} 
          setBackgroundMode={setBackgroundMode}
          soundEnabled={soundEnabled}
          setSoundEnabled={setSoundEnabled}
          playClickSound={playClickSound}
        />

        <main className="flex-grow">
          <TerminalHero 
            themeColor={themeColor} 
            playClickSound={playClickSound}
            onInitializeContact={handleInitializeContact}
          />

          <ProjectsGrid 
            themeColor={themeColor} 
            playClickSound={playClickSound}
          />

          <Timeline 
            themeColor={themeColor} 
            playClickSound={playClickSound}
          />

          <TerminalContact 
            themeColor={themeColor} 
            playClickSound={playClickSound}
          />
        </main>

        <footer className="bg-[#050505] border-t border-neutral-900 py-10 px-4 font-code text-xs text-neutral-500 transition-all duration-300">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
            
            <div className="flex items-center gap-2">
              <Shield className={`w-4 h-4 ${textPrimary}`} />
              <span>
                SYS: <span className="text-white font-bold">STABLE</span> | DATABASE: <span className={textPrimary}>LOCAL_CACHE</span>
              </span>
            </div>

            <div className="flex flex-col items-center gap-2 text-center">
              <div className="flex items-center gap-1.5">
                <span>Made with</span>
                <Heart className="w-3.5 h-3.5 text-red-500 fill-current animate-pulse" />
                <span>by <strong className="text-neutral-300">Manknojiya Sufiyan</strong></span>
              </div>
              <div className="flex items-center gap-4 text-xs font-grotesk mt-1">
                <a href="https://www.linkedin.com/in/sufill-x-man/" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">LinkedIn</a>
                <span>•</span>
                <a href="https://github.com/sufillxman" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">GitHub</a>
                <span>•</span>
                <a href="https://www.instagram.com/sufilldigital/" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">Instagram</a>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-neutral-600" />
                SECURE SSL Handshake
              </span>
              <span className="hidden sm:inline">
                © {new Date().getFullYear()} SFX.ALL_RIGHTS_RESERVED
              </span>
            </div>

          </div>
        </footer>

      </div>
    </>
  );
}

export default App;
