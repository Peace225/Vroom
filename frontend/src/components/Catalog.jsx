import React, { useState, useEffect, useMemo, useRef } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { db } from '../firebaseConfig';
import { collection, getDocs } from 'firebase/firestore'; 
import { LayoutGrid, Star, Crown, Diamond, Loader2, MessageCircle, Zap, Tag, Share2, Heart, SlidersHorizontal, Fuel, CheckCircle2, Key } from 'lucide-react';

const getOptimizedImage = (url) => {
  if (!url || !url.includes('cloudinary.com')) return url;
  const parts = url.split('upload/');
  if (parts.length === 2) {
    return `${parts[0]}upload/w_800,h_600,c_fill,f_auto,q_auto/${parts[1]}`;
  }
  return url;
};

// --- SOUS-COMPOSANT : Carte Voiture ---
const CarCard = ({ item, handleContactAdmin }) => {
  const displayImage = item.images?.front || item.image;
  
  // Normalisation de l'état pour l'affichage du badge
  const conditionText = item.condition ? item.condition.toUpperCase() : 'NEUF';
  const isNeuf = conditionText.includes('NEUF');

  // Génération du lien du logo local pour la carte
 const brandLogoSrc = item.brandLogo || (item.brand ? `/images/logos/${item.brand.trim().toLowerCase().replace(/[^a-z0-9]/g, '')}.jpg` : null);

  return (
    <div className="bg-white text-slate-900 border border-slate-100 rounded-[1.5rem] md:rounded-[2rem] overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 group relative h-full flex flex-col">
      
      {/* Badge État (Neuf / Occasion) */}
      <div className={`absolute top-3 left-3 md:top-4 md:left-4 z-10 text-[9px] md:text-[10px] font-black uppercase px-2.5 py-1 md:px-3.5 md:py-1.5 rounded-full shadow-md text-white tracking-wider ${
        isNeuf ? 'bg-[#22c55e]' : 'bg-slate-900'
      }`}>
        {conditionText}
      </div>

      {/* Image & Logo de la marque */}
      <div className="h-48 md:h-64 overflow-hidden relative flex-shrink-0 bg-slate-100">
        <img 
          src={getOptimizedImage(displayImage)} 
          alt={item.model} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
        />
        {brandLogoSrc && (
          <div className="absolute top-3 right-3 md:top-4 md:right-4 w-7 h-7 md:w-9 md:h-9 bg-white rounded-full p-1 md:p-1.5 shadow-md flex items-center justify-center border border-slate-100">
            <img 
              src={brandLogoSrc} 
              alt={item.brand} 
              onError={(e) => { e.target.onerror = null; e.target.style.display = 'none'; }} // Cache le logo s'il n'existe pas en local
              className="max-w-full max-h-full object-contain" 
            />
          </div>
        )}
      </div>

      {/* Contenu de la carte */}
      <div className="p-4 md:p-6 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-1 md:mb-2">
          <div>
            <h3 className="text-lg md:text-xl font-black text-slate-900 tracking-tight">
              {item.model} <span className="text-xs md:text-sm font-normal text-slate-400">({item.year || '2024'})</span>
            </h3>
          </div>
          <div className="flex items-center gap-1 md:gap-2 text-slate-400">
            <button className="hover:text-slate-700 transition-colors p-1"><Share2 size={14} className="md:w-4 md:h-4" /></button>
            <button className="hover:text-red-500 transition-colors p-1"><Heart size={14} className="md:w-4 md:h-4" /></button>
          </div>
        </div>

        {/* Prix */}
        <div className="text-xl md:text-2xl font-black text-blue-600 mb-3 md:mb-4 tracking-tight">
          {item.price ? `${item.price.toLocaleString()} FCFA` : "Sur Devis"}
        </div>
        
        {/* Caractéristiques (Transmission & Carburant) */}
        <div className="flex items-center gap-3 md:gap-4 text-[10px] md:text-xs text-slate-500 mb-3 md:mb-4 font-medium">
          <span className="flex items-center gap-1.5">
            <SlidersHorizontal size={12} className="md:w-3.5 md:h-3.5 text-slate-400" /> {item.transmission || 'Automatique'}
          </span>
          <span className="flex items-center gap-1.5">
            <Fuel size={12} className="md:w-3.5 md:h-3.5 text-slate-400" /> {item.fuel || 'Essence'}
          </span>
        </div>

        {/* Badges de certification */}
        <div className="flex flex-wrap gap-1.5 md:gap-2 mb-4 md:mb-6 pt-2.5 md:pt-3 border-t border-slate-100">
          {item.certified !== false && (
            <span className="inline-flex items-center gap-1 text-[9px] md:text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 md:px-2.5 md:py-1 rounded-full">
              <CheckCircle2 size={10} className="md:w-3 md:h-3" /> Certifiée
            </span>
          )}
          {item.inspected !== false && (
            <span className="inline-flex items-center gap-1 text-[9px] md:text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 md:px-2.5 md:py-1 rounded-full">
              <CheckCircle2 size={10} className="md:w-3 md:h-3" /> Inspectée
            </span>
          )}
          {item.warranty && (
            <span className="inline-flex items-center gap-1 text-[9px] md:text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 md:px-2.5 md:py-1 rounded-full">
              <Key size={10} className="md:w-3 md:h-3" /> {item.warranty}
            </span>
          )}
        </div>

        {/* Bouton Consulter l'offre */}
        <Link 
          to={`/voiture/${item.id}`} 
          className="mt-auto w-full bg-slate-900 hover:bg-[#fb201e] text-white font-bold py-2.5 md:py-3.5 px-3 md:px-4 rounded-xl md:rounded-2xl text-center text-[10px] md:text-xs uppercase tracking-wider transition-colors shadow-md flex items-center justify-center gap-2"
        >
          Consulter l'offre
        </Link>
      </div>
    </div>
  );
};

export default function Catalog() {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedBrand, setSelectedBrand] = useState(null);
  const sliderRef = useRef(null);
  const [searchParams] = useSearchParams();
  const categoryFromUrl = searchParams.get('categorie');
  
  const [activeFilter, setActiveFilter] = useState(categoryFromUrl ? categoryFromUrl.toUpperCase() : "Tous");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const carsSnap = await getDocs(collection(db, "cars"));
        setCars(carsSnap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      } catch (error) { 
        console.error("Erreur Fetch:", error); 
      } finally { 
        setLoading(false); 
      }
    };
    fetchData();
  }, []);

  // --- EXTRACTION DYNAMIQUE DES MARQUES (Modifiée pour les logos locaux) ---
  const carBrands = useMemo(() => {
    const brandsMap = {};
    cars.forEach(car => {
      if (car.brand) {
        const brandName = car.brand.trim();
        if (!brandsMap[brandName]) {
          const normalizedName = brandName.toLowerCase().replace(/[^a-z0-9]/g, '');
          // On va chercher l'image dans le dossier /logos/
         brandsMap[brandName] = car.brandLogo || `/images/logos/${normalizedName}.jpg`;
        }
      }
    });
    return Object.keys(brandsMap).map(name => ({
      name,
      logo: brandsMap[name]
    }));
  }, [cars]);

  // --- LOGIQUE SLIDER : Uniquement Voitures Disponibles ---
  const availableCars = useMemo(() => cars.filter(c => c.availability === 'Disponible').slice(0, 8), [cars]);

  useEffect(() => {
    if (availableCars.length === 0) return;
    const interval = setInterval(() => {
      if (sliderRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = sliderRef.current;
        if (scrollLeft + clientWidth >= scrollWidth - 10) sliderRef.current.scrollTo({ left: 0, behavior: 'smooth' });
        else sliderRef.current.scrollBy({ left: 380, behavior: 'smooth' });
      }
    }, 3500);
    return () => clearInterval(interval);
  }, [availableCars]);

  const getNumericPrice = (p) => p ? parseInt(p.toString().replace(/[^0-9]/g, ''), 10) : 0;

  // --- LOGIQUE FILTRAGE DYNAMIQUE ---
  const filteredItems = useMemo(() => {
    let items = cars;

    if (activeFilter !== "Tous") {
      items = items.filter(car => {
        const price = getNumericPrice(car.price);
        if (activeFilter === "GOLD") return (price >= 5000000 && price <= 6500000) || car.offer === "Gold";
        if (activeFilter === "PREMIUM") return (price > 6500000 && price <= 10000000) || car.offer === "Premium";
        if (activeFilter === "VIP") return price > 10000000 || car.offer === "VIP";
        return false;
      });
    }

    if (selectedBrand) {
      items = items.filter(car => car.brand?.toLowerCase() === selectedBrand.toLowerCase());
    }

    return items;
  }, [cars, activeFilter, selectedBrand]);

  const filters = [
    { name: "Tous", icon: <LayoutGrid size={14} className="md:w-4 md:h-4" />, desc: "Tout le stock" },
    { name: "GOLD", icon: <Star size={14} className="md:w-4 md:h-4" fill="currentColor" />, desc: "Budget Moyen" },
    { name: "PREMIUM", icon: <Crown size={14} className="md:w-4 md:h-4" fill="currentColor" />, desc: "Haut de gamme" },
    { name: "VIP", icon: <Diamond size={14} className="md:w-4 md:h-4" fill="currentColor" />, desc: "Luxe & Prestige" },
  ];

  const handleContactAdmin = (item) => {
    const adminWhatsApp = "2250151104839";
    const name = `${item.brand} ${item.model}`;
    const price = `(${item.price})`;
    const msg = `Bonjour AutoLife, je souhaiterais des informations sur ce véhicule : ${name} ${price}.`;
    window.open(`https://wa.me/${adminWhatsApp}?text=${encodeURIComponent(msg)}`, '_blank');
  };

  if (loading) return (
    <div className="min-h-screen bg-black flex flex-col justify-center items-center">
      <Loader2 className="animate-spin text-[#fb201e] mb-4" size={40} className="md:w-12 md:h-12" />
      <p className="text-white/20 font-black text-[10px] md:text-xs uppercase tracking-widest">Initialisation du catalogue...</p>
    </div>
  );

  return (
    <div className="min-h-screen bg-black text-white py-10 md:py-16 px-4 md:px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        
        {/* SECTION SLIDER : VEHICULES DISPONIBLES */}
        {availableCars.length > 0 && (
          <div className="mb-12 md:mb-20 animate-in fade-in slide-in-from-bottom-6 duration-700">
            <div className="flex items-center gap-2 md:gap-3 mb-6 md:mb-8">
              <Zap className="text-[#22c55e] w-6 h-6 md:w-7 md:h-7" />
              <h3 className="text-xl md:text-2xl font-black italic uppercase">Véhicules <span className="text-[#22c55e]">Disponibles</span></h3>
            </div>
            <div ref={sliderRef} className="flex overflow-x-auto gap-4 md:gap-6 pb-6 md:pb-8 scroll-smooth no-scrollbar">
              {availableCars.map((car) => (
                <div key={`dispo-${car.id}`} className="min-w-[85vw] sm:min-w-[400px] lg:min-w-[380px] flex-shrink-0">
                  <CarCard item={car} handleContactAdmin={handleContactAdmin} />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* En-tête de section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 md:mb-10 gap-3 md:gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 md:gap-2 px-2.5 py-1 md:px-3.5 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-300 text-[10px] md:text-xs font-bold uppercase tracking-wider mb-2 md:mb-3 backdrop-blur-md">
              <Tag size={12} className="md:w-3.5 md:h-3.5" />
              <span>Showroom Vente</span>
            </div>

            <h2 className="text-2xl md:text-3xl lg:text-4xl font-black text-white tracking-tight">
              Véhicules en vente
            </h2>
            <p className="text-xs md:text-base text-slate-300 mt-1 md:mt-1.5">
              Explorez notre sélection de véhicules <span className="font-bold text-blue-400">neufs et d'occasion</span> certifiés au meilleur prix
            </p>
          </div>
        </div>

        {/* Grille de sélection par marque */}
        <div className="mb-8 md:mb-10 bg-slate-900/60 backdrop-blur-md p-4 md:p-6 rounded-2xl md:rounded-3xl shadow-xl border border-white/10">
          <div className="flex items-center justify-between mb-3 md:mb-4">
            <span className="text-[10px] md:text-xs font-bold text-slate-300 uppercase tracking-wider">
              Filtrer par marque <span className="hidden md:inline">({carBrands.length} disponibles)</span>
            </span>
            {selectedBrand && (
              <button
                onClick={() => setSelectedBrand(null)}
                className="text-[10px] md:text-xs font-semibold text-blue-400 hover:text-blue-300 underline transition-colors"
              >
                Réinitialiser <span className="hidden md:inline">la marque</span>
              </button>
            )}
          </div>

          <div className="flex flex-wrap justify-center gap-2 md:gap-4 max-h-[250px] md:max-h-[320px] overflow-y-auto pr-1">
            {carBrands.map((brand) => {
              const isSelected = selectedBrand === brand.name;
              return (
                <button
                  key={brand.name}
                  onClick={() => setSelectedBrand(isSelected ? null : brand.name)}
                  className={`flex flex-col items-center justify-center p-2 md:p-3 rounded-xl md:rounded-2xl transition-all duration-300 w-20 md:w-28 ${
                    isSelected
                      ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30 scale-105 ring-2 ring-blue-400'
                      : 'bg-white/90 hover:bg-white text-slate-800 hover:shadow-md hover:-translate-y-0.5 border border-white/20'
                  }`}
                >
                  <div className="w-8 h-8 md:w-11 md:h-11 flex items-center justify-center mb-1 md:mb-2">
                    <img
                      src={brand.logo}
                      alt={brand.name}
                      onError={(e) => { e.target.onerror = null; e.target.style.display = 'none'; }} // Cache l'image manquante
                      className={`max-w-full max-h-full object-contain transition-all ${
                        isSelected ? 'brightness-0 invert' : ''
                      }`}
                    />
                  </div>
                  <span className="text-[9px] md:text-[11px] font-bold tracking-tight text-center truncate w-full">
                    {brand.name}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* BARRE DE FILTRES BUDGET / GAMME */}
        <div className="flex flex-wrap justify-center gap-2 md:gap-6 mb-10 md:mb-16">
          {filters.map((f) => (
            <button
              key={f.name}
              onClick={() => setActiveFilter(f.name)}
              className={`flex flex-col items-center flex-1 min-w-[80px] max-w-[160px] p-3 md:p-5 rounded-2xl md:rounded-3xl border transition-all duration-300 ${
                activeFilter === f.name 
                ? "bg-[#fb201e] border-[#fb201e] shadow-[0_10px_30px_rgba(251,32,30,0.3)] scale-105" 
                : "bg-[#111] border-white/5 hover:border-white/20"
              }`}
            >
              <span className={`mb-1.5 md:mb-2 ${activeFilter === f.name ? "text-white" : "text-[#fb201e]"}`}>{f.icon}</span>
              <span className="text-[9px] md:text-[11px] font-black uppercase tracking-widest">{f.name}</span>
              <span className={`text-[7px] md:text-[8px] font-bold mt-0.5 md:mt-1 uppercase ${activeFilter === f.name ? "text-white/70" : "text-white/30"}`}>{f.desc}</span>
            </button>
          ))}
        </div>

        {/* GRILLE DE RESULTATS */}
        {filteredItems.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 animate-in fade-in duration-500">
            {filteredItems.map((item) => (
              <CarCard 
                key={item.id} 
                item={item} 
                handleContactAdmin={handleContactAdmin} 
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 md:py-20 bg-[#0a0a0a] rounded-[2rem] md:rounded-[3rem] border border-white/5">
            <p className="text-white/20 font-black italic text-xl md:text-2xl uppercase">Rien en stock pour vos critères</p>
          </div>
        )}
      </div>
    </div>
  );
}