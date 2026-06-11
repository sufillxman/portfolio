import React, { useState, useRef, useEffect } from 'react';
import { sendContactMessage, getSavedMessages } from '../services/api';
import { Mail, CheckCircle2, Send, Loader2, Database } from 'lucide-react';

export default function TerminalContact({ themeColor = 'green', playClickSound }) {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [inputVal, setInputVal] = useState('');
  const [logs, setLogs] = useState([
    'System: Connecting to Sufiyan\'s Message Portal...',
    'System: Secure gateway established. Ready for input.'
  ]);
  const [submitting, setSubmitting] = useState(false);
  const [savedMessages, setSavedMessages] = useState([]);

  const inputRef = useRef(null);
  const logContainerRef = useRef(null);

  useEffect(() => {
    setSavedMessages(getSavedMessages());
  }, []);

  useEffect(() => {
    if (logContainerRef.current) {
      logContainerRef.current.scrollTop = logContainerRef.current.scrollHeight;
    }
  }, [logs]);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [step]);

  const addLog = (text) => {
    setLogs((prev) => [...prev, text]);
  };

  const handleNext = (e) => {
    if (e) e.preventDefault();
    if (!inputVal.trim()) return;

    playClickSound();

    if (step === 0) {
      setFormData((prev) => ({ ...prev, name: inputVal }));
      addLog(`guest@sfx-portal:~$ set_name "${inputVal}"`);
      addLog(`System: Name verified. Please enter your email address.`);
      setInputVal('');
      setStep(1);
    } else if (step === 1) {
      if (!inputVal.includes('@')) {
        addLog(`[Error] Invalid email address format. Try again.`);
        return;
      }
      setFormData((prev) => ({ ...prev, email: inputVal }));
      addLog(`guest@sfx-portal:~$ set_email "${inputVal}"`);
      addLog(`System: Email verified. Please type your message.`);
      setInputVal('');
      setStep(2);
    } else if (step === 2) {
      setFormData((prev) => ({ ...prev, message: inputVal }));
      addLog(`guest@sfx-portal:~$ set_message "${inputVal.substring(0, 30)}..."`);
      addLog(`System: Message loaded. Please review your details and confirm.`);
      setInputVal('');
      setStep(3);
    }
  };

  const handleSubmit = async () => {
    playClickSound();
    setSubmitting(true);
    addLog(`guest@sfx-portal:~$ submit_form`);
    addLog(`System: Sending message details to API server...`);

    try {
      const res = await sendContactMessage(formData);
      if (res.success) {
        addLog(`System: Success! Message logged on backend database.`);
        setSavedMessages(getSavedMessages());
        setStep(4);
      } else {
        throw new Error("Rejection");
      }
    } catch (err) {
      addLog(`[Error] Failed to transmit message. Check your server logs.`);
      setSubmitting(false);
    }
  };

  const handleReset = () => {
    playClickSound();
    setFormData({ name: '', email: '', message: '' });
    setInputVal('');
    setStep(0);
    setLogs([
      'System: Re-initializing message connection...',
      'System: Ready for input details.'
    ]);
  };

  const textPrimary = themeColor === 'green' ? 'text-[#00ff66]' : 'text-[#00f0ff]';
  const borderPrimary = themeColor === 'green' ? 'border-[#00ff66]' : 'border-[#00f0ff]';
  const bgPrimary = themeColor === 'green' ? 'bg-[#00ff66]' : 'bg-[#00f0ff]';
  const glowShadow = themeColor === 'green' ? 'shadow-[0_0_20px_rgba(0,255,102,0.25)]' : 'shadow-[0_0_20px_rgba(0,240,255,0.25)]';
  const borderLight = themeColor === 'green' ? 'border-[#00ff66]/20' : 'border-[#00f0ff]/20';

  return (
    <section id="contact" className="py-20 px-4 max-w-4xl mx-auto border-t border-neutral-900/60 relative font-grotesk">
      
      <div className="text-center mb-12">
        <span className={`font-code text-xs tracking-widest ${textPrimary} uppercase block mb-2`}>
          // GET IN TOUCH
        </span>
        <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white">
          Contact Me
        </h2>
        <p className="text-neutral-400 text-sm max-w-md mx-auto mt-4 leading-relaxed">
          Fill out this interactive form to send me an email. Your messages will show up in the live outbox list below.
        </p>
      </div>

      <div className={`w-full bg-neutral-950/80 rounded-xl border ${borderLight} ${glowShadow} overflow-hidden backdrop-blur-md transition-all duration-300 mb-8`}>
        
        <div className="flex items-center justify-between px-4 py-3 bg-neutral-900/60 border-b border-neutral-900">
          <div className="flex items-center gap-2">
            <Mail className="w-3.5 h-3.5 text-neutral-500" />
            <span className="font-code text-[10px] text-neutral-400 tracking-wider">
              MESSAGE_PORTAL@SUFILLXMAN
            </span>
          </div>
          <span className="font-code text-[10px] text-neutral-500 uppercase">
            SECURE ROUTE ACTIVE
          </span>
        </div>

        <div className="p-6 font-code text-xs sm:text-sm">
          
          <div 
            ref={logContainerRef}
            className="space-y-2 mb-6 max-h-40 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-neutral-800 text-neutral-400"
          >
            {logs.map((log, index) => {
              let color = 'text-neutral-400';
              if (log.startsWith('[Error]')) color = 'text-red-500 font-bold';
              else if (log.startsWith('guest@sfx-portal')) color = 'text-white';
              else if (log.includes('Success!') || log.includes('verified')) color = textPrimary + ' font-semibold';
              
              return (
                <div key={index} className={`${color} leading-relaxed`}>
                  {log}
                </div>
              );
            })}
          </div>

          <div className="bg-neutral-900/40 border border-neutral-900 p-4 rounded-lg">
            
            {step === 0 && (
              <form onSubmit={handleNext} className="space-y-4">
                <label className="block text-neutral-400">
                  &gt; Enter Your Name:
                </label>
                <div className="flex items-center gap-2">
                  <span className={textPrimary}>$</span>
                  <input
                    ref={inputRef}
                    type="text"
                    value={inputVal}
                    onChange={(e) => setInputVal(e.target.value)}
                    className="flex-1 bg-transparent border-none outline-none text-white focus:ring-0 p-0 font-code placeholder-neutral-700"
                    placeholder="E.g., Sufiyan"
                    required
                  />
                  <button type="submit" className={`px-4 py-1.5 rounded ${bgPrimary} text-black font-bold text-xs uppercase hover:opacity-90`}>
                    Next
                  </button>
                </div>
              </form>
            )}

            {step === 1 && (
              <form onSubmit={handleNext} className="space-y-4">
                <label className="block text-neutral-400">
                  &gt; Enter Your Email Address:
                </label>
                <div className="flex items-center gap-2">
                  <span className={textPrimary}>$</span>
                  <input
                    ref={inputRef}
                    type="email"
                    value={inputVal}
                    onChange={(e) => setInputVal(e.target.value)}
                    className="flex-1 bg-transparent border-none outline-none text-white focus:ring-0 p-0 font-code placeholder-neutral-700"
                    placeholder="E.g., contact@mail.com"
                    required
                  />
                  <button type="submit" className={`px-4 py-1.5 rounded ${bgPrimary} text-black font-bold text-xs uppercase hover:opacity-90`}>
                    Next
                  </button>
                </div>
              </form>
            )}

            {step === 2 && (
              <form onSubmit={handleNext} className="space-y-4">
                <label className="block text-neutral-400">
                  &gt; Type Your Message:
                </label>
                <div className="flex items-center gap-2">
                  <span className={textPrimary}>$</span>
                  <input
                    ref={inputRef}
                    type="text"
                    value={inputVal}
                    onChange={(e) => setInputVal(e.target.value)}
                    className="flex-1 bg-transparent border-none outline-none text-white focus:ring-0 p-0 font-code placeholder-neutral-700"
                    placeholder="Hello, let's connect for projects..."
                    required
                  />
                  <button type="submit" className={`px-4 py-1.5 rounded ${bgPrimary} text-black font-bold text-xs uppercase hover:opacity-90`}>
                    Next
                  </button>
                </div>
              </form>
            )}

            {step === 3 && (
              <div className="space-y-4 font-code">
                <div className="text-neutral-400">// Verify Details Before Sending:</div>
                <div className="grid grid-cols-3 gap-2 py-2 border-y border-neutral-900 text-xs text-neutral-400">
                  <div>Name:</div>
                  <div className="col-span-2 text-white">{formData.name}</div>
                  <div>Email:</div>
                  <div className="col-span-2 text-white">{formData.email}</div>
                  <div>Message:</div>
                  <div className="col-span-2 text-white whitespace-pre-wrap">{formData.message}</div>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={handleSubmit}
                    disabled={submitting}
                    className={`flex items-center gap-2 px-5 py-2.5 rounded font-bold uppercase text-xs text-black transition-all ${bgPrimary} hover:opacity-90 disabled:opacity-50`}
                  >
                    {submitting ? (
                      <>
                        <Loader2 className="w-3.5 h-3.5 animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="w-3.5 h-3.5" />
                        Send Message
                      </>
                    )}
                  </button>
                  <button
                    onClick={handleReset}
                    disabled={submitting}
                    className="px-5 py-2.5 rounded border border-neutral-800 text-neutral-400 hover:text-white uppercase text-xs"
                  >
                    Reset
                  </button>
                </div>
              </div>
            )}

            {step === 4 && (
              <div className="text-center py-6 space-y-4">
                <div className="flex justify-center">
                  <CheckCircle2 className={`w-12 h-12 ${textPrimary} animate-bounce`} />
                </div>
                <h4 className="text-lg font-bold text-white uppercase tracking-wider">
                  Message Sent Successfully!
                </h4>
                <p className="text-xs text-neutral-400 max-w-sm mx-auto leading-relaxed font-grotesk">
                  Your message has been processed and saved. Check the live outbox list below to view the output.
                </p>
                <button
                  onClick={handleReset}
                  className="px-5 py-2 rounded border border-neutral-800 hover:border-neutral-700 text-neutral-400 hover:text-white text-xs font-code transition-all"
                >
                  Send Another Message
                </button>
              </div>
            )}

          </div>

        </div>
      </div>

      <div className="bg-neutral-950 border border-neutral-900 rounded-xl p-5 font-code text-xs text-neutral-400">
        <div className="flex items-center justify-between border-b border-neutral-900 pb-3 mb-4">
          <span className="flex items-center gap-2 font-bold text-neutral-300 text-[10px] tracking-wider uppercase">
            <Database className={`w-4 h-4 ${textPrimary}`} />
            Live Outbox Messages Log (Local Cache)
          </span>
          <span className="text-[9px] text-neutral-500">
            TOTAL: {savedMessages.length} MESSAGE(S)
          </span>
        </div>

        {savedMessages.length === 0 ? (
          <div className="text-center py-8 text-neutral-600">
            No messages sent yet. Fill out the terminal form above to see your submissions logged here in real-time.
          </div>
        ) : (
          <div className="space-y-3 max-h-60 overflow-y-auto pr-2 scrollbar-thin">
            {savedMessages.map((msg) => (
              <div key={msg.id} className="p-3 bg-neutral-900/50 rounded border border-neutral-900 flex flex-col gap-1 select-text">
                <div className="flex justify-between items-center text-[10px] text-neutral-500 border-b border-neutral-900 pb-1 mb-1">
                  <span>TIMESTAMP: {msg.timestamp}</span>
                  <span className={textPrimary}>ID: {msg.id}</span>
                </div>
                <div><span className="text-neutral-500 font-bold">FROM:</span> <span className="text-white">{msg.name}</span> (<span className="text-neutral-300">{msg.email}</span>)</div>
                <div><span className="text-neutral-500 font-bold">PAYLOAD:</span> <span className="text-neutral-300">{msg.message}</span></div>
              </div>
            ))}
          </div>
        )}
      </div>
      
    </section>
  );
}
