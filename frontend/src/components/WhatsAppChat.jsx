import React from "react";
import { MessageCircle, Sparkles, Bot, ArrowUpRight } from "lucide-react";

export default function WhatsAppChat() {
  const phoneNumber = "2250151104839"; // Numéro international sans +
  
  // Message par défaut mis à jour pour Vroom CI
  const defaultMessage = "Bonjour Vroom CI, je vous contacte depuis votre site web et j'aimerais avoir plus d'informations.";

  const handleWhatsAppClick = () => {
    // CORRECTION ICI : Remplacement du numéro en dur par la variable ${phoneNumber}
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(defaultMessage)}`;
    window.open(url, "_blank");
  };

  return (
    <div className="fixed bottom-6 right-6 z-[998] group flex items-center">
      
      {/* HALO LUMINEUX D'ARRIÈRE-PLAN (EFFET IA NEON) */}
      <div className="absolute -inset-2 bg-gradient-to-r from-[#25D366] via-[#10b981] to-[#059669] rounded-full blur-xl opacity-60 group-hover:opacity-100 transition-opacity duration-500 animate-pulse pointer-events-none" />

      {/* BULLE / TOOLTIP STYLE "ASSISTANT IA 3D" AU SURVOL */}
      <div className="absolute right-full mr-4 bottom-1/2 translate-y-1/2 whitespace-nowrap bg-slate-900/90 backdrop-blur-xl text-white px-4 py-3 rounded-2xl shadow-[0_20px_40px_rgba(0,0,0,0.3)] border border-white/10 opacity-0 pointer-events-none transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0 translate-x-3">
        <div className="flex items-center gap-2.5">
          <div className="flex items-center justify-center w-7 h-7 rounded-lg bg-gradient-to-tr from-[#25D366] to-[#10b981] text-white shadow-inner">
            <Bot size={15} />
          </div>
          <div className="text-left">
            <div className="flex items-center gap-1.5">
              <span className="text-[11px] font-bold tracking-wide text-white">Assistant Vroom CI</span>
              <Sparkles size={11} className="text-[#25D366] animate-spin" style={{ animationDuration: '4s' }} />
            </div>
            <p className="text-[10px] text-slate-300 font-medium flex items-center gap-1.5 mt-0.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#25D366] animate-ping" />
              Réponse instantanée • 24/7
            </p>
          </div>
          <ArrowUpRight size={14} className="text-slate-400 ml-1" />
        </div>
      </div>

      {/* BOUTON 3D EFFET SPHERE BRIGHT */}
      <button 
        onClick={handleWhatsAppClick}
        title="Nous contacter sur WhatsApp"
        className="relative p-4 rounded-full transition-all duration-300 flex items-center justify-center
                   bg-gradient-to-b from-[#42e87c] via-[#25D366] to-[#119948] 
                   text-white
                   shadow-[0_12px_24px_-6px_rgba(37,211,102,0.6),inset_0_2px_4px_rgba(255,255,255,0.7),inset_0_-4px_6px_rgba(0,0,0,0.25)]
                   border border-white/30
                   group-hover:scale-110 group-hover:-translate-y-1 group-hover:shadow-[0_20px_35px_-8px_rgba(37,211,102,0.8)]
                   active:scale-95 z-10"
      >
        {/* REFLET SUPÉRIEUR 3D (GLOSS EFFECT) */}
        <span className="absolute top-1 left-1/2 -translate-x-1/2 w-8 h-2.5 bg-gradient-to-b from-white/60 to-transparent rounded-full pointer-events-none" />

        {/* ICÔNE WHATSAPP */}
        <MessageCircle size={30} className="drop-shadow-[0_2px_3px_rgba(0,0,0,0.3)]" />
        
        {/* BADGE DE NOTIFICATION TYPE "IA ACTIVE" */}
        <span className="absolute -top-1 -right-1 flex h-5 w-5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#25D366] opacity-75" />
          <span className="relative inline-flex items-center justify-center rounded-full h-5 w-5 bg-slate-900 border-2 border-[#25D366] text-[#25D366] shadow-md">
            <Sparkles size={10} />
          </span>
        </span>
      </button>

    </div>
  );
}