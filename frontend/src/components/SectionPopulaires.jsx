import React, { useState, useEffect, useMemo, useRef } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { db } from '../firebaseConfig';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { LayoutGrid, Star, Crown, Diamond, Loader2, MessageCircle, Truck, MapPin, ArrowUp, ShoppingBag, KeyRound } from 'lucide-react';

const getOptimizedImage = (url) => {
  if (!url || !url.includes('cloudinary.com')) return url;
  const parts = url.split('upload/');
  if (parts.length === 2) {
    return `${parts[0]}upload/w_800,h_600,c_fill,f_auto,q_auto/${parts[1]}`;
  }
  return url;
};

// --- SOUS-COMPOSANT : Carte interactive (Gère Voitures et Engins) ---
const CarCard = ({ item, handleContactAdmin, isEngin = false }) => {
  const displayImage = isEngin ? item.imageUrl : (item.images?.front || item.image);
  const isRental = (item.type || item.listingType || '').toLowerCase() === 'location';

  return (
    <div className="bg-white border border-slate-300 rounded-none overflow-hidden hover:border-[#fb201e] transition-all group relative h-full flex flex-col shadow-md hover:shadow-xl">
      
      {/* Badge Type de transaction (Vente / Location) */}
      <div className="absolute top-3 left-3 z-10 flex gap-2">
        <span className={`text-[7px] font-black uppercase px-2 py-0.5 backdrop-blur-md border ${
          isRental ? 'bg-blue-600 text-white border-blue-500' : 'bg-[#fb201e] text-white border-red-500'
        }`}>
          {isRental ? '🔑 Location' : '🏷️ Vente'}
        </span>
      </div>

      {/* Badge Disponibilité (Uniquement pour voitures) */}
      {!isEngin && item.availability && (
        <div className={`absolute top-3 right-3 z-10 text-[7px] font-black uppercase px-2 py-0.5 backdrop-blur-md border ${
          item.availability === 'Disponible' ? 'bg-[#22c55e] text-white border-green-500' : 
          item.availability === 'En arrivage' ? 'bg-blue-500 text-white border-blue-400' : 
          'bg-red-500 text-white border-red-400'
        }`}>
          {item.availability === 'Disponible' ? '✅ Dispo' : item.availability}
        </div>
      )}

      {/* Badge Catégorie (Pour les Engins) */}
      {isEngin && (
        <div className="absolute top-3 right-3 z-10 text-[7px] font-black uppercase px-2 py-0.5 backdrop-blur-md border bg-[#fb201e] text-white border-red-400">
          {item.category}
        </div>
      )}

      <div className="h-60 overflow-hidden relative flex-shrink-0 bg-slate-100">
        <img 
          src={getOptimizedImage(displayImage)} 
          alt={item.model || item.name} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
        />
        <div className="absolute bottom-3 left-3 flex gap-2">
          <span className="bg-slate-900 text-white text-[7px] font-black px-2 py-0.5 uppercase border border-slate-800">
            {isEngin ? item.tonnage : item.brand}
          </span>
        </div>
      </div>

      <div className="p-4 flex flex-col flex-grow bg-white">
        <div className="mb-2">
          <h3 className="text-sm font-black italic uppercase text-slate-900 line-clamp-1">{isEngin ? item.name : item.model}</h3>
          <p className="text-slate-400 text-[8px] font-bold uppercase flex items-center gap-1 mt-0.5">
            {isEngin ? <><MapPin size={8}/> {item.location}</> : `Réf: ${item.id ? item.id.slice(0,6) : ''}`}
          </p>
        </div>
        
        <div className="flex items-center justify-between mt-auto pt-3 border-t border-slate-100">
          <div className="flex flex-col">
            <span className="text-slate-400 text-[6px] font-black uppercase">{isEngin ? "Localisation" : (isRental ? "Prix / Jour" : "Prix TTC")}</span>
            <span className="text-[#fb201e] text-xs font-black italic">
               {isEngin ? item.location : (item.price || "Sur Devis")}
            </span>
          </div>
          <div className="flex gap-1.5">
            <button onClick={() => handleContactAdmin(item, isEngin)} className="bg-slate-100 border border-slate-200 text-green-600 h-8 w-8 rounded-none flex items-center justify-center hover:bg-[#25D366] hover:text-white transition-all">
              <MessageCircle size={14} />
            </button>
            {!isEngin && (
              <Link to={`/voiture/${item.id}`} className="bg-slate-900 text-white h-8 w-8 rounded-none flex items-center justify-center hover:bg-[#fb201e] hover:text-white transition-all">
                <LayoutGrid size={14} />
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default function SectionPopulaires() {
  const [cars, setCars] = useState([]);
  const [heavyVehicles, setHeavyVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchParams] = useSearchParams();
  const categoryFromUrl = searchParams.get('categorie');
  
  const [activeFilter, setActiveFilter] = useState(categoryFromUrl ? (categoryFromUrl.toUpperCase()) : "Tous");
  const [listingMode, setListingMode] = useState("vente"); // "vente" | "location"

  useEffect(() => {
    const fetchData = async () => {
      try {
        const carsSnap = await getDocs(collection(db, "cars"));
        setCars(carsSnap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
        
        const enginsSnap = await getDocs(query(collection(db, "heavy_vehicles"), orderBy("createdAt", "desc")));
        setHeavyVehicles(enginsSnap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      } catch (error) { 
        console.error("Erreur Fetch:", error); 
      } finally { 
        setLoading(false); 
      }
    };
    fetchData();
  }, []);

  const getNumericPrice = (p) => p ? parseInt(p.replace(/[^0-9]/g, ''), 10) : 0;

  const filteredItems = useMemo(() => {
    let items = activeFilter === "ENGIN" ? heavyVehicles : cars;

    // Filtrage par Mode de transaction (Vente / Location)
    if (activeFilter !== "ENGIN") {
      items = items.filter(car => {
        const type = (car.type || car.listingType || 'vente').toLowerCase();
        return type === listingMode.toLowerCase();
      });
    }

    if (activeFilter === "ENGIN") return heavyVehicles;
    if (activeFilter === "Tous") return items;

    return items.filter(car => {
      const price = getNumericPrice(car.price);
      if (activeFilter === "GOLD") return (price >= 5000000 && price <= 6500000) || car.offer === "Gold";
      if (activeFilter === "PREMIUM") return (price > 6500000 && price <= 10000000) || car.offer === "Premium";
      if (activeFilter === "VIP") return price > 10000000 || car.offer === "VIP";
      return false;
    });
  }, [cars, heavyVehicles, activeFilter, listingMode]);

  const filters = [
    { name: "Tous", icon: <LayoutGrid size={14} />, desc: "Tout le stock" },
    { name: "GOLD", icon: <Star size={14} fill="currentColor" />, desc: "Budget Moyen" },
    { name: "PREMIUM", icon: <Crown size={14} fill="currentColor" />, desc: "Haut de gamme" },
    { name: "VIP", icon: <Diamond size={14} fill="currentColor" />, desc: "Luxe & Prestige" },
    { name: "ENGIN", icon: <Truck size={14} />, desc: "Poids Lourds" },
  ];

  const handleContactAdmin = (item, isEngin) => {
    const adminWhatsApp = "2250151104839";
    const name = isEngin ? item.name : `${item.brand} ${item.model}`;
    const price = isEngin ? `(Tonnage: ${item.tonnage})` : `(${item.price})`;
    const modeLabel = (item.type || item.listingType) === 'location' ? 'en Location' : 'à la Vente';
    const msg = `Bonjour Vroomci, je souhaiterais des informations sur ce véhicule ${modeLabel} : ${name} ${price}.`;
    window.open(`https://wa.me/${adminWhatsApp}?text=${encodeURIComponent(msg)}`, '_blank');
  };

  if (loading) return (
    <div className="min-h-[50vh] bg-white flex flex-col justify-center items-center">
      <Loader2 className="animate-spin text-[#fb201e] mb-4" size={36} />
      <p className="text-slate-400 font-black text-[10px] uppercase tracking-widest">Initialisation du catalogue...</p>
    </div>
  );

  return (
    <div className="w-full bg-white text-slate-900 py-12 px-4 md:px-6">
      <div className="max-w-7xl mx-auto">
        
       <div className="flex flex-col items-center text-center mb-10">
          <span className="text-orange-500 text-[8px] font-black uppercase tracking-[0.3em] mb-1.5">
            Vroomci • Le Carburant de vos Projets en Côte d'Ivoire
          </span>
          <h2 className="text-2xl md:text-3xl font-black italic uppercase tracking-tighter text-slate-900">
            La Route de l'Excellence : <span className="text-orange-500">Nos Modèles Phares</span>
          </h2>
          <p className="text-slate-500 text-[8px] font-bold uppercase tracking-[0.15em] mt-2">
            Vente & Location • Voitures de Prestige, Citadines et Poids Lourds Disponibles
          </p>
        </div>

        {/* BARRE DE NAVIGATION VENTE / LOCATION */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex bg-slate-100 p-1 rounded-none border border-slate-200 shadow-md">
            <button
              onClick={() => setListingMode("vente")}
              className={`flex items-center gap-1.5 px-6 py-3 rounded-none text-[10px] font-black uppercase tracking-wider transition-all duration-300 ${
                listingMode === "vente" 
                ? "bg-[#fb201e] text-white shadow shadow-[#fb201e]/30" 
                : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <ShoppingBag size={12} />
              <span>Vente</span>
            </button>
            <button
              onClick={() => setListingMode("location")}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-none text-[10px] font-black uppercase tracking-wider transition-all duration-300 ${
                listingMode === "location" 
                ? "bg-blue-600 text-white shadow shadow-blue-600/30" 
                : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <KeyRound size={12} />
              <span>Location</span>
            </button>
          </div>
        </div>

        {/* LE BLOC "DISPONIBLES DE SUITE" A ÉTÉ ENLEVÉ ICI */}

        {/* BARRE DE FILTRES CATEGORIES / GAMMES */}
        <div className="flex flex-wrap justify-center gap-3 md:gap-4 mb-12">
          {filters.map((f) => (
            <button
              key={f.name}
              onClick={() => setActiveFilter(f.name)}
              className={`flex flex-col items-center flex-1 min-w-[95px] max-w-[140px] p-3 rounded-none border transition-all duration-300 ${
                activeFilter === f.name 
                ? "bg-[#fb201e] border-[#fb201e] text-white shadow-[0_5px_20px_rgba(251,32,30,0.3)] scale-105" 
                : "bg-slate-50 border-slate-200 text-slate-800 hover:border-slate-300"
              }`}
            >
              <span className={`mb-1.5 ${activeFilter === f.name ? "text-white" : "text-[#fb201e]"}`}>{f.icon}</span>
              <span className="text-[9px] font-black uppercase tracking-widest">{f.name}</span>
              <span className={`text-[7px] font-bold mt-0.5 uppercase ${activeFilter === f.name ? "text-white/80" : "text-slate-400"}`}>{f.desc}</span>
            </button>
          ))}
        </div>

        {/* GRILLE DE RESULTATS */}
        {filteredItems.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-in fade-in duration-500">
            {filteredItems.map((item) => (
              <CarCard 
                key={item.id} 
                item={item} 
                handleContactAdmin={handleContactAdmin} 
                isEngin={activeFilter === "ENGIN"} 
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-slate-50 rounded-none border border-slate-200">
            <p className="text-slate-400 font-black italic text-base uppercase">Aucun résultat trouvé en <span className={listingMode === 'vente' ? "text-[#fb201e]" : "text-blue-600"}>{listingMode}</span> pour <span className="text-[#fb201e]">{activeFilter}</span></p>
          </div>
        )}

        {/* BOUTON DE RETOUR EN HAUT */}
        <div className="mt-14 text-center">
          <button 
            onClick={() => { window.scrollTo({ top: 0, behavior: 'smooth' }); }}
            className="inline-flex items-center gap-1.5 bg-slate-900 border border-slate-800 hover:bg-[#fb201e] hover:border-[#fb201e] text-white px-6 py-3 rounded-none text-[10px] font-black uppercase tracking-widest transition-all shadow-md"
          >
            <span>Retour en haut</span>
            <ArrowUp size={14} />
          </button>
        </div>

      </div>
    </div>
  );
}