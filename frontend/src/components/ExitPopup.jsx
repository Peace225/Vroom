import React, { useState, useEffect } from "react";
import { X, Gift, ArrowRight, CheckCircle } from "lucide-react";

export default function ExitPopup() {
  const [isVisible, setIsVisible] = useState(false);
  const [hasShown, setHasShown] = useState(false);
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    const handleMouseLeave = (e) => {
      if (e.clientY < 0 && !hasShown) {
        setIsVisible(true);
        setHasShown(true);
      }
    };
    document.addEventListener("mouseleave", handleMouseLeave);
    return () => document.removeEventListener("mouseleave", handleMouseLeave);
  }, [hasShown]);

  const handleConfirm = () => {
    if (email.trim().length > 3) {
      setIsSubmitted(true);
      setTimeout(() => setIsVisible(false), 2500);
    }
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center px-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-300 font-sans">
      
      {/* Conteneur Principal Blanc & Épuré */}
      <div className="relative w-full max-w-[340px] bg-white rounded-3xl border border-slate-200/80 shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300">
        
        {/* Bouton Fermer Discret */}
        <button 
          onClick={() => setIsVisible(false)}
          className="absolute top-4 right-4 p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-800 transition-all z-20"
          aria-label="Fermer"
        >
          <X size={15} />
        </button>

        <div className="p-8 text-center">
          
          {/* Icône Cadeau Circulaire Raffinée */}
          <div className="w-14 h-14 bg-red-50 border border-red-100 rounded-full flex items-center justify-center mx-auto mb-5 text-[#fb201e] shadow-sm">
            <Gift size={24} />
          </div>

          {!isSubmitted ? (
            <div className="animate-in fade-in duration-300">
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 uppercase tracking-tight mb-2">
                Offre <span className="text-[#fb201e]">Exclusive</span>
              </h2>
              
              <p className="text-xs font-medium text-slate-500 leading-relaxed mb-6">
                Recevez <span className="text-slate-900 font-bold">150 000 FCFA</span> de réduction sur votre première acquisition.
              </p>

              <div className="space-y-4 text-left">
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                    Votre contact
                  </label>
                  <input 
                    type="text" 
                    placeholder="WhatsApp ou Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 outline-none font-semibold text-xs text-slate-800 focus:border-[#fb201e] focus:bg-white transition-all shadow-2xs"
                  />
                </div>

                <button 
                  onClick={handleConfirm}
                  className="w-full bg-[#fb201e] hover:bg-[#e01918] text-white font-bold text-xs py-3.5 px-4 rounded-xl transition-all flex items-center justify-center gap-2 group shadow-md shadow-red-500/10 active:scale-[0.98]"
                >
                  <span>Valider l'offre</span> 
                  <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </button>
              </div>

              <button 
                onClick={() => setIsVisible(false)}
                className="mt-5 text-[10px] font-bold text-slate-400 hover:text-slate-700 transition-colors uppercase tracking-wider"
              >
                Non, merci
              </button>
            </div>
          ) : (
            <div className="py-6 animate-in zoom-in-90 duration-300 text-center space-y-3">
              <div className="w-12 h-12 bg-emerald-50 text-emerald-600 border border-emerald-100 rounded-full flex items-center justify-center mx-auto shadow-sm">
                <CheckCircle size={24} />
              </div>
              <h3 className="text-sm font-black text-slate-900 uppercase tracking-tight">
                Offre Activée !
              </h3>
              <p className="text-xs text-slate-500">
                Nous vous contactons dans les plus brefs délais.
              </p>
            </div>
          )}
        </div>

        {/* Ligne de finition subtile en bas */}
        <div className="h-1.5 w-full bg-gradient-to-r from-transparent via-slate-200 to-transparent"></div>
      </div>
    </div>
  );
}