import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  ArrowLeft, Share2, Check, MessageCircle, Loader2, 
  Calendar, MapPin, Fuel, Gauge, Sparkles 
} from 'lucide-react';

// Firebase Imports
import { db } from '../firebaseConfig';
import { doc, getDoc, collection, addDoc, serverTimestamp } from 'firebase/firestore';

// --- FONCTION D'OPTIMISATION CLOUDINARY ---
const getOptimizedHeroImage = (url) => {
  if (!url || !url.includes('cloudinary.com')) return url;
  const parts = url.split('upload/');
  if (parts.length === 2) {
    return `${parts[0]}upload/w_1400,f_auto,q_auto/${parts[1]}`;
  }
  return url;
};

// --- FONCTION POUR OBTENIR LA TRANCHE DE PRIX ---
const getOfferPriceRange = (offer) => {
  if (!offer) return "";
  const offerLower = offer.toLowerCase();
  if (offerLower === "gold") return "5 - 6,5 Millions";
  if (offerLower === "premium") return "7 - 10 Millions";
  if (offerLower === "vip") return "11 Millions et +";
  return "";
};

export default function CarDetails() {
  const { id } = useParams();
  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [activeImage, setActiveImage] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchCar = async () => {
      try {
        const docRef = doc(db, "cars", id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = { id: docSnap.id, ...docSnap.data() };
          setCar(data);
          setActiveImage(data.images?.front || data.image);
        }
      } catch (error) {
        console.error("Erreur de récupération :", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCar();
  }, [id]);

  const handleContactWhatsApp = async () => {
    if (!car) return;

    setIsSending(true);
    const phoneNumber = "2250151104839";
    const messageText = `Bonjour AutoLife ! 🚘\nJe suis intéressé par la ${car.brand} ${car.model} affichée à ${car.price}.\nPouvez-vous me donner plus d'infos ?`;
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(messageText)}`;

    try {
      await addDoc(collection(db, "messages"), {
        carId: id,
        carName: `${car.brand} ${car.model}`,
        carPrice: car.price,
        status: "Nouveau",
        timestamp: serverTimestamp(),
      });
      window.open(whatsappUrl, '_blank');
    } catch (error) {
      console.error("Erreur lors de l'envoi du signal :", error);
      window.open(whatsappUrl, '_blank');
    } finally {
      setIsSending(false);
    }
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#f8f9fa] flex flex-col justify-center items-center">
        <Loader2 className="animate-spin text-[#fb201e] mb-3" size={32} />
        <p className="text-slate-500 uppercase font-bold text-[10px] tracking-widest">
          Chargement du véhicule...
        </p>
      </div>
    );
  }

  if (!car) {
    return (
      <div className="min-h-screen bg-[#f8f9fa] text-slate-800 flex flex-col items-center justify-center p-6 text-center">
        <h2 className="text-2xl md:text-3xl font-extrabold uppercase mb-3 tracking-tight">
          Véhicule <span className="text-[#fb201e]">Indisponible</span>
        </h2>
        <p className="text-slate-500 text-xs md:text-sm max-w-sm mb-6">
          Ce véhicule a été vendu ou retiré de notre catalogue en ligne.
        </p>
        <Link 
          to="/catalogue" 
          className="bg-slate-900 text-white px-6 py-3 rounded-full text-xs font-bold uppercase tracking-wider hover:bg-[#fb201e] transition-all duration-300 shadow-sm"
        >
          Retour au catalogue
        </Link>
      </div>
    );
  }

  const specs = [
    { icon: <Calendar size={15} />, label: 'Année', value: car.year || 'N/A' },
    { icon: <MapPin size={15} />, label: 'Localisation', value: car.location || 'Abidjan' },
    { icon: <Fuel size={15} />, label: 'Énergie', value: car.energy || 'N/A' },
    { icon: <Gauge size={15} />, label: 'Boîte', value: car.transmission || 'N/A' },
  ];

  return (
    <div className="min-h-screen bg-[#f8f9fa] text-slate-900 py-6 md:py-10 px-4 sm:px-6 lg:px-8 font-sans selection:bg-[#fb201e] selection:text-white">
      <div className="max-w-6xl mx-auto">
        
        {/* Navigation minimaliste */}
        <div className="mb-6 md:mb-8">
          <Link 
            to="/catalogue" 
            className="group inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-slate-200 text-slate-600 hover:text-slate-900 hover:border-slate-300 transition-all text-xs font-bold uppercase tracking-wider shadow-sm"
          >
            <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform duration-300 text-[#fb201e]" /> 
            <span>Retour au catalogue</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* --- COLONNE GAUCHE : GALERIE D'IMAGES (7 COLONNES) --- */}
          <div className="lg:col-span-7 flex flex-col gap-3">
            
            {/* Vue principale */}
            <div className="relative group aspect-[16/11] sm:aspect-[4/3] rounded-2xl overflow-hidden border border-slate-200/80 bg-slate-100 shadow-md">
              <img 
                key={activeImage}
                src={getOptimizedHeroImage(activeImage)} 
                alt={car.model} 
                fetchPriority="high"
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-60 pointer-events-none" />
              
              {/* Badges statut & catégorie */}
              <div className="absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-none">
                {car.availability && (
                  <span className={`text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full backdrop-blur-md shadow-sm border ${
                    car.availability === 'Disponible' 
                      ? 'bg-emerald-600/90 text-white border-emerald-500/30' 
                      : car.availability === 'En arrivage' 
                      ? 'bg-blue-600/90 text-white border-blue-500/30' 
                      : 'bg-red-600/90 text-white border-red-500/30'
                  }`}>
                    {car.availability}
                  </span>
                )}
                {car.type && (
                  <span className="bg-white/90 backdrop-blur-md px-3 py-1 rounded-full border border-slate-200/60 text-[10px] font-bold uppercase tracking-wider text-[#fb201e] flex items-center gap-1.5 ml-auto shadow-sm">
                    <Sparkles size={11} />
                    {car.type}
                  </span>
                )}
              </div>
            </div>

            {/* Miniatures */}
            {car.images && (car.images.front || car.images.back || car.images.interior) && (
              <div className="flex gap-2.5 overflow-x-auto pb-1 no-scrollbar">
                {[
                  { key: 'front', label: 'Face Avant' },
                  { key: 'back', label: 'Arrière' },
                  { key: 'interior', label: 'Intérieur' }
                ].map((view) => {
                  if (!car.images[view.key]) return null;

                  const isSelected = activeImage === car.images[view.key];

                  return (
                    <button 
                      key={view.key}
                      onClick={() => setActiveImage(car.images[view.key])}
                      className={`relative w-20 h-14 sm:w-24 sm:h-16 rounded-xl overflow-hidden flex-shrink-0 transition-all duration-300 ${
                        isSelected 
                          ? 'ring-2 ring-[#fb201e] ring-offset-2 ring-offset-[#f8f9fa] scale-[0.98] shadow-sm' 
                          : 'opacity-60 hover:opacity-100 border border-slate-200'
                      }`}
                    >
                      <img 
                        src={getOptimizedHeroImage(car.images[view.key])} 
                        className="w-full h-full object-cover" 
                        alt={view.label} 
                      />
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* --- COLONNE DROITE : INFORMATIONS & ACTION (5 COLONNES) --- */}
          <div className="lg:col-span-5 flex flex-col justify-between h-full space-y-6">
            
            {/* Titre & Formule - Textes réduits */}
            <div>
              {car.offer && (
                <div className="inline-flex items-center gap-1.5 bg-white border border-slate-200 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider text-slate-600 mb-3 shadow-2xs">
                  <span>Formule {car.offer}</span>
                  <span className="text-slate-300">•</span>
                  <span className="text-[#fb201e] font-extrabold">{getOfferPriceRange(car.offer)}</span>
                </div>
              )}

              <h1 className="text-2xl sm:text-3xl md:text-4xl font-black uppercase tracking-tight leading-tight text-slate-900">
                {car.brand}
              </h1>
              <h2 className="text-sm sm:text-base font-semibold text-slate-500 uppercase tracking-wide mt-0.5">
                {car.model}
              </h2>
            </div>

            {/* Grille des spécifications */}
            <div className="grid grid-cols-2 gap-2.5">
              {specs.map((item, index) => (
                <div 
                  key={index} 
                  className="bg-white border border-slate-200/80 hover:border-slate-300 p-3.5 rounded-xl transition-all duration-200 shadow-2xs"
                >
                  <div className="flex items-center gap-1.5 text-slate-400 mb-1">
                    <span className="text-[#fb201e]">{item.icon}</span>
                    <span className="text-[10px] font-bold uppercase tracking-wider">{item.label}</span>
                  </div>
                  <span className="text-slate-800 font-extrabold text-xs uppercase block truncate">
                    {item.value}
                  </span>
                </div>
              ))}
            </div>

            {/* Description */}
            <div className="bg-white border border-slate-200/80 p-4 rounded-xl shadow-2xs">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#fb201e] block mb-1">
                Note de l'inspection
              </span>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                {car.description || "Véhicule premium rigoureusement inspecté et validé par nos techniciens. Excellent état mécanique et esthétique, prêt pour une prise en main immédiate."}
              </p>
            </div>

            {/* Bloc Prix & Call To Action - Look raffiné */}
            <div className="bg-white border border-slate-200/80 p-5 rounded-2xl space-y-5 shadow-sm">
              <div>
                <span className="text-slate-400 text-[10px] font-bold uppercase tracking-wider block mb-0.5">
                  Prix de vente conseillé
                </span>
                <div className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                  {car.price}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-12 gap-2.5">
                <button 
                  onClick={handleContactWhatsApp}
                  disabled={isSending}
                  className="sm:col-span-8 bg-[#25D366] hover:bg-[#1ebd59] text-white py-3.5 px-4 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-sm active:scale-[0.98] transition-all disabled:opacity-50"
                >
                  {isSending ? (
                    <Loader2 className="animate-spin" size={16} />
                  ) : (
                    <MessageCircle size={16} className="fill-current" />
                  )}
                  <span>Négocier sur WhatsApp</span>
                </button>

                <button 
                  onClick={handleCopyLink}
                  className={`sm:col-span-4 py-3.5 px-3 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 border transition-all active:scale-[0.98] ${
                    copied 
                      ? 'bg-slate-900 text-white border-slate-900' 
                      : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                  }`}
                  title="Partager la fiche"
                >
                  {copied ? <Check size={15} /> : <Share2 size={15} />}
                  <span>{copied ? "Copié" : "Partager"}</span>
                </button>
              </div>

              <div className="flex items-center justify-between text-[10px] text-slate-400 font-medium pt-3 border-t border-slate-100">
                <span>RÉF : {car.id.toUpperCase()}</span>
                <span className="flex items-center gap-1.5 text-emerald-600 font-semibold">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  Réponse rapide
                </span>
              </div>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
}