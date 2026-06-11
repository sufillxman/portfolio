import { useEffect } from 'react';
import { CheckCircle2, XCircle, X } from 'lucide-react';

export default function Toast({ message, type = 'success', onClose }) {
  useEffect(() => {
    const timer = setTimeout(onClose, 4000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="fixed bottom-6 right-6 z-[100] animate-slide-up">
      <div className={`flex items-center gap-3 px-5 py-3 rounded-lg border shadow-2xl text-sm font-code backdrop-blur-md ${
        type === 'success' 
          ? 'bg-[#00ff66]/10 border-[#00ff66]/30 text-[#00ff66]' 
          : 'bg-red-500/10 border-red-500/30 text-red-400'
      }`}>
        {type === 'success' 
          ? <CheckCircle2 className="w-5 h-5 shrink-0" />
          : <XCircle className="w-5 h-5 shrink-0" />
        }
        <span>{message}</span>
        <button onClick={onClose} className="ml-2 opacity-60 hover:opacity-100">
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
