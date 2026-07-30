import React, { useState, useEffect } from "react";
import { 
  ArrowLeft, Calendar, Gauge, Settings, Car, 
  MapPin, MessageCircle, Mail, Share2, ShieldCheck, Info, Sparkles, PhoneCall
} from "lucide-react";
import { db } from '../firebaseConfig';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore'; 

const getOptimizedImage = (url) => {
  if (!url || !url.includes('cloudinary.com')) return url;
  const parts = url.split('upload/');
  return parts.length === 2 ? `${parts[0]}upload/w_1400,h_900,c_fill,f_auto,q_auto/${parts[1]}` : url;
};

const formatPrice = (price) => {
  if (typeof price === 'string' && price.includes('FCFA')) return price;
  const num = parseInt(price);
  return isNaN(num) ? price : new Intl.NumberFormat('fr-FR').format(num) + " FCFA";
};

export default function DetailVehicule({ car, onBack }) {
  const defaultImage = car?.images?.front || car?.image;
  const [activeImage, setActiveImage] = useState(defaultImage);

  useEffect(() => { 
    window.scrollTo(0, 0); 
  }, [car]);

  if (!car) return null;

  const carTitle = `${car.brand || car.marque} ${car.model || car.modele}`;
  const carPriceFormatted = formatPrice(car.price || car.prix);

  const handleContactWhatsApp = async () => {
    try {
      await addDoc(collection(db, "messages"), {
        carId: car.id,
        carName: carTitle,
        carPrice: carPriceFormatted,
        source: "Mobile Details",
        timestamp: serverTimestamp() 
      });
      window.open(`https://wa.me/2250151104839?text=${encodeURIComponent(`Bonjour Vroom CI, je suis intéressé(e) par la ${carTitle} (${carPriceFormatted}).`)}`, '_blank');
    } catch (error) {
      window.open(`https://wa.me/2250151104839`, '_blank');
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({ 
          title: carTitle, 
          text: `Découvrez cette ${carTitle} sur Vroom CI`, 
          url: window.location.href 
        });
      } catch (err) { 
        console.log(err); 
      }
    }
  };

  return (
    <div className="w-full min-h-screen bg-[#f8f9fa] font-sans pb-32 lg:pb-24 text-slate-900 selection:bg-[#ff4d00] selection:text-white">
      
      {/* HEADER PREMIUM GLASSMORPHISM */}
      <nav className="bg-white/80 backdrop-blur-xl border-b border-slate-200/60 sticky top-0 z-50 transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <button 
            onClick={onBack} 
            className="group flex items-center gap-2.5 px-3 py-1.5 rounded-full hover:bg-slate-100/80 transition-colors text-xs font-bold uppercase tracking-widest text-slate-600 hover:text-slate-900"
          >
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform duration-300 text-[#ff4d00]" /> 
            <span>Retour au catalogue</span>
          </button>

          <div className="flex items-center gap-4">
            <button 
              onClick={handleShare} 
              className="p-2.5 bg-slate-100/80 hover:bg-slate-200/70 text-slate-700 rounded-full transition-colors sm:hidden"
              title="Partager"
            >
              <Share2 size={16} />
            </button>
            <div className="flex items-center gap-1.5 font-black text-sm tracking-tighter uppercase">
              <span>VROOM</span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#ff4d00]" />
              <span className="text-[#ff4d00]">CI</span>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 md:pt-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          
          {/* COLONNE GAUCHE : VISUELS & CARACTÉRISTIQUES */}
          <div className="lg:col-span-8 space-y-8 md:space-y-10">
            
            {/* GALERIE PHOTO PREMIUM */}
            <div className="space-y-4">
              <div className="relative w-full h-[300px] sm:h-[450px] md:h-[580px] rounded-[2rem] overflow-hidden bg-slate-900 shadow-[0_20px_50px_rgba(0,0,0,0.08)] border border-slate-200/60 group">
                <img 
                  key={activeImage}
                  src={getOptimizedImage(activeImage)} 
                  alt={carTitle}
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105" 
                  onError={(e) => { e.target.src = "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?q=80&w=1000"; }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-60 pointer-events-none" />
                
                {/* Badge statut sur l'image */}
                <div className="absolute top-5 left-5 flex items-center gap-2">
                  <span className="bg-slate-900/80 backdrop-blur-md text-white px-3.5 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest border border-white/10 flex items-center gap-1.5">
                    <Sparkles size={11} className="text-[#ff4d00]" /> Sélection Vroom CI
                  </span>
                </div>
              </div>
              
              {/* MINIATURES */}
              {car.images && (
                <div className="flex gap-3 overflow-x-auto pb-2 no-scrollbar">
                  {['front', 'back', 'interior'].map((key) => car.images[key] && (
                    <button 
                      key={key}
                      onClick={() => setActiveImage(car.images[key])}
                      className={`relative w-24 h-16 md:w-28 md:h-20 rounded-2xl overflow-hidden flex-shrink-0 transition-all duration-300 ${
                        activeImage === car.images[key] 
                          ? 'ring-2 ring-[#ff4d00] ring-offset-2 ring-offset-[#f8f9fa] scale-[0.98] opacity-100 shadow-md' 
                          : 'opacity-50 hover:opacity-85'
                      }`}
                    >
                      <img src={getOptimizedImage(car.images[key])} className="w-full h-full object-cover" alt="" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* EN-TÊTE DU VÉHICULE */}
            <div className="border-b border-slate-200/80 pb-8 space-y-3">
              <div className="flex flex-wrap items-center gap-2.5">
                <span className="bg-[#ff4d00]/10 text-[#ff4d00] px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-widest border border-[#ff4d00]/20">
                  Exclusivité
                </span>
                <span className="bg-emerald-500/10 text-emerald-700 px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-widest border border-emerald-500/20">
                  Disponible immédiatement
                </span>
              </div>

              <h1 className="text-3xl sm:text-5xl md:text-6xl font-black uppercase tracking-tight text-slate-900 leading-none">
                {car.brand || car.marque} <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ff4d00] to-amber-600">{car.model || car.modele}</span>
              </h1>

              <div className="flex flex-wrap items-center gap-6 pt-2 text-slate-500 text-xs font-semibold uppercase tracking-wider">
                <div className="flex items-center gap-1.5">
                  <MapPin size={15} className="text-[#ff4d00]" /> 
                  <span>{car.location || car.localisation || "Abidjan"}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <ShieldCheck size={15} className="text-blue-600" /> 
                  <span>Garantie & Contrôle technique certifiés</span>
                </div>
              </div>
            </div>

            {/* CARACTÉRISTIQUES TECHNIQUES - DESIGN ÉPURÉ */}
            <div>
              <h3 className="text-xs font-black uppercase tracking-widest text-slate-400 mb-4">
                Spécifications principales
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
                {[
                  { icon: <Calendar size={18} />, label: "Année", val: car.year || car.annee },
                  { icon: <Gauge size={18} />, label: "Kilométrage", val: `${(car.kilometrage || 0).toLocaleString()} km` },
                  { icon: <Settings size={18} />, label: "Transmission", val: car.transmission || "Automatique" },
                  { icon: <Car size={18} />, label: "Énergie", val: car.energy || car.energie || "Essence" }
                ].map((item, i) => (
                  <div 
                    key={i} 
                    className="bg-white p-5 rounded-2xl border border-slate-200/60 shadow-[0_2px_10px_rgba(0,0,0,0.02)] hover:border-slate-300 transition-all duration-300"
                  >
                    <div className="w-9 h-9 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center text-[#ff4d00] mb-3">
                      {item.icon}
                    </div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{item.label}</p>
                    <p className="text-sm md:text-base font-black text-slate-900 mt-0.5">{item.val}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* NOTE TECHNIQUE / DESCRIPTION */}
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/60 shadow-[0_2px_15px_rgba(0,0,0,0.02)] space-y-4">
              <div className="flex items-center gap-2 text-slate-900 font-black uppercase tracking-tight text-sm">
                <span className="w-2 h-2 rounded-full bg-[#ff4d00]" />
                <h3>Note technique de l'inspecteur</h3>
              </div>
              <p className="text-sm md:text-base text-slate-600 font-normal leading-relaxed">
                {car.description || "Véhicule d'exception rigoureusement sélectionné par nos équipes. État mécanique irréprochable, historique d'entretien vérifié et carrosserie en excellente condition. Prêt pour une prise en main immédiate sans frais à prévoir."}
              </p>
            </div>

          </div>

          {/* COLONNE DROITE : CARTE DE PRIX & ACTION (STICKY DESKTOP) */}
          <div className="lg:col-span-4">
            <div className="sticky top-28 space-y-4">
              
              {/* CARTE PRIX SHOWROOM */}
              <div className="bg-slate-900 text-white p-6 sm:p-8 rounded-3xl shadow-2xl border border-slate-800 relative overflow-hidden">
                {/* Lueur d'ambiance en arrière-plan */}
                <div className="absolute -right-10 -top-10 w-40 h-40 bg-[#ff4d00]/20 rounded-full blur-3xl pointer-events-none" />
                
                <p className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-slate-400 mb-1">
                  Prix de vente TTC
                </p>
                <div className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight mb-8">
                  {carPriceFormatted}
                </div>

                <div className="hidden lg:space-y-3 lg:block">
                  <button 
                    onClick={handleContactWhatsApp} 
                    className="w-full bg-[#ff4d00] hover:bg-[#e04300] active:scale-[0.99] transition-all py-4 px-6 rounded-xl text-xs font-extrabold uppercase tracking-wider text-white flex justify-center items-center gap-2.5 shadow-lg shadow-[#ff4d00]/25"
                  >
                    <MessageCircle size={18} /> Discuter avec un conseiller
                  </button>
                  
                  <a 
                    href="tel:2250151104839" 
                    className="w-full bg-white/5 hover:bg-white/10 active:scale-[0.99] transition-all py-4 px-6 rounded-xl text-xs font-extrabold uppercase tracking-wider text-slate-200 border border-white/10 flex justify-center items-center gap-2.5"
                  >
                    <PhoneCall size={16} className="text-slate-400" /> Appeler directement
                  </a>
                </div>

                <div className="mt-6 pt-6 border-t border-slate-800/80 flex items-center justify-between text-slate-400 text-[11px]">
                  <span>Réponse garantie</span>
                  <span className="text-emerald-400 font-semibold flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" /> Moins de 15 min
                  </span>
                </div>
              </div>

              {/* ESTIMATION FINANCEMENT */}
              <div className="bg-white p-6 rounded-3xl border border-slate-200/60 shadow-[0_2px_10px_rgba(0,0,0,0.02)] flex items-center justify-between">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
                    Estimation crédit
                  </p>
                  <p className="text-sm font-semibold text-slate-600 mt-0.5">
                    À partir de <strong className="text-slate-900 font-black">250 000 FCFA</strong> / mois
                  </p>
                </div>
                <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-400">
                  <Info size={16} />
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
      
      {/* BARRE MOBILE DOCK FIXE - STYLE IOS PREMIUM */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-xl border-t border-slate-200/80 px-4 py-3.5 z-50 flex items-center gap-3 shadow-[0_-8px_30px_rgba(0,0,0,0.06)]">
        <a 
          href="tel:2250151104839" 
          className="w-12 h-12 bg-slate-100 hover:bg-slate-200 text-slate-800 flex items-center justify-center rounded-2xl active:scale-95 transition-all shrink-0"
          title="Appeler"
        >
          <PhoneCall size={18} />
        </a>
        <button 
          onClick={handleContactWhatsApp} 
          className="flex-1 bg-[#ff4d00] hover:bg-[#e04300] text-white py-3.5 px-4 rounded-2xl text-xs font-extrabold uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-[#ff4d00]/25 active:scale-[0.98] transition-all"
        >
          <MessageCircle size={18} /> Discuter sur WhatsApp
        </button>
      </div>

    </div>
  );
}