import React, { useState, useEffect } from 'react';
import { Terminal, Clock, Volume2, VolumeX, Grid, Code, Power, Linkedin, Github, Instagram } from 'lucide-react';

export default function Navbar({ 
  themeColor, 
  setThemeColor, 
  backgroundMode, 
  setBackgroundMode,
  soundEnabled,
  setSoundEnabled,
  playClickSound
}) {
  const [ping, setPing] = useState(24);
  const [time, setTime] = useState(new Date().toLocaleTimeString());

  useEffect(() => {
    const interval = setInterval(() => {
      setPing((prev) => {
        const delta = Math.floor(Math.random() * 9) - 4;
        const next = prev + delta;
        return next > 8 && next < 80 ? next : 24;
      });
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      const date = new Date();
      setTime(date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false }));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleNavClick = (sectionId) => {
    playClickSound();
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const borderClass = themeColor === 'green' ? 'border-[#00ff66]/20' : 'border-[#00f0ff]/20';
  const textPrimary = themeColor === 'green' ? 'text-[#00ff66]' : 'text-[#00f0ff]';
  const bgPrimary = themeColor === 'green' ? 'bg-[#00ff66]' : 'bg-[#00f0ff]';
  const shadowClass = themeColor === 'green' ? 'shadow-[0_0_10px_rgba(0,255,102,0.15)]' : 'shadow-[0_0_10px_rgba(0,240,255,0.15)]';

  return (
    <header className="fixed top-0 left-0 w-full z-40 bg-[#050505]/75 backdrop-blur-md border-b border-solid border-neutral-900 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 md:px-6 h-16 flex items-center justify-between">
        
        <div 
          onClick={() => handleNavClick('hero')}
          className="flex items-center gap-1.5 cursor-pointer group"
        >
          <div className={`p-1 rounded border ${borderClass} transition-all duration-300 group-hover:scale-105`}>
            <Terminal className={`w-4 h-4 ${textPrimary} animate-pulse`} />
          </div>
          <span className="font-grotesk font-bold tracking-widest text-base uppercase hidden sm:inline-block">
            SUFILL<span className={textPrimary}>_X_</span>MAN
          </span>
          <span className="font-grotesk font-bold tracking-widest text-sm uppercase sm:hidden">
            SFX<span className={textPrimary}>X</span>M
          </span>
        </div>

        <nav className="hidden md:flex items-center gap-6 font-grotesk text-xs tracking-wider font-semibold">
          <button onClick={() => handleNavClick('hero')} className="text-neutral-400 hover:text-white transition-colors duration-200 py-1">
            HOME
          </button>
          <button onClick={() => handleNavClick('projects')} className="text-neutral-400 hover:text-white transition-colors duration-200 py-1">
            PROJECTS
          </button>
          <button onClick={() => handleNavClick('timeline')} className="text-neutral-400 hover:text-white transition-colors duration-200 py-1">
            CREDENTIALS
          </button>
          <button onClick={() => handleNavClick('contact')} className="text-neutral-400 hover:text-white transition-colors duration-200 py-1">
            CONTACT
          </button>
        </nav>

        <div className="flex items-center gap-1.5 sm:gap-4 font-code text-[10px] tracking-wider text-neutral-400">
          
          <div className="hidden sm:flex items-center gap-1.5 bg-neutral-900/60 px-2.5 py-1 rounded border border-neutral-800">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping"></span>
            <span>PING: <span className={`${textPrimary} font-bold`}>{ping}ms</span></span>
          </div>

          <div className="hidden lg:flex items-center gap-1.5 bg-neutral-900/60 px-2.5 py-1 rounded border border-neutral-800">
            <Clock className="w-3.5 h-3.5 text-neutral-500" />
            <span>SYS: <span className="text-neutral-200 font-bold">{time}</span></span>
          </div>

          <button
            onClick={() => {
              playClickSound();
              setBackgroundMode(backgroundMode === 'matrix' ? 'neural' : 'matrix');
            }}
            className="p-1.5 rounded bg-neutral-900/80 border border-neutral-800 hover:border-neutral-700 transition-colors"
            title="Toggle Background FX"
          >
            {backgroundMode === 'matrix' ? (
              <Code className="w-4 h-4 text-neutral-400" />
            ) : (
              <Grid className="w-4 h-4 text-neutral-400" />
            )}
          </button>

          <button
            onClick={() => {
              playClickSound();
              setThemeColor(themeColor === 'green' ? 'cyan' : 'green');
            }}
            className="p-1.5 rounded bg-neutral-900/80 border border-neutral-800 hover:border-neutral-700 transition-colors"
            title="Toggle Color Theme"
          >
            <span className={`block w-4 h-4 rounded-full transition-colors ${bgPrimary} ${shadowClass}`} />
          </button>

          <button
            onClick={() => {
              setSoundEnabled(!soundEnabled);
              if (!soundEnabled) {
                const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
                const osc = audioCtx.createOscillator();
                osc.type = 'sine';
                osc.frequency.setValueAtTime(600, audioCtx.currentTime);
                osc.connect(audioCtx.destination);
                osc.start();
                osc.stop(audioCtx.currentTime + 0.08);
              }
            }}
            className="p-1.5 rounded bg-neutral-900/80 border border-neutral-800 hover:border-neutral-700 transition-colors"
            title={soundEnabled ? "Mute Audio" : "Unmute Audio"}
          >
            {soundEnabled ? (
              <Volume2 className="w-4 h-4 text-neutral-400" />
            ) : (
              <VolumeX className="w-4 h-4 text-neutral-500" />
            )}
          </button>

          {/* Social Icons Panel (Hidden on mobile navbar to save space) */}
          <div className="hidden sm:flex items-center gap-2 border-l border-neutral-800 pl-3">
            <a 
              href="https://www.linkedin.com/in/sufill-x-man/" 
              target="_blank" 
              rel="noreferrer" 
              className="text-neutral-400 hover:text-[#00f0ff] transition-colors p-1"
              title="LinkedIn"
            >
              <Linkedin className="w-4 h-4" />
            </a>
            <a 
              href="https://github.com/sufillxman" 
              target="_blank" 
              rel="noreferrer" 
              className="text-neutral-400 hover:text-white transition-colors p-1"
              title="GitHub"
            >
              <Github className="w-4 h-4" />
            </a>
            <a 
              href="https://www.instagram.com/sufilldigital/" 
              target="_blank" 
              rel="noreferrer" 
              className="text-neutral-400 hover:text-[#ff007f] transition-colors p-1"
              title="Instagram"
            >
              <Instagram className="w-4 h-4" />
            </a>
          </div>

          <button
            onClick={() => handleNavClick('contact')}
            className="md:hidden p-1.5 rounded bg-neutral-900 border border-neutral-800 hover:border-neutral-700 text-neutral-200"
          >
            <Power className="w-4 h-4" />
          </button>
          
        </div>
      </div>
    </header>
  );
}
