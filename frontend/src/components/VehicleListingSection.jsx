import React, { useState } from 'react';

// --- Icônes Vectorielles (SVG) ---
const HeartIcon = ({ filled }) => (
  <svg className={`w-5 h-5 ${filled ? 'fill-red-500 stroke-red-500' : 'stroke-slate-400 fill-none'} transition-colors`} viewBox="0 0 24 24" strokeWidth="1.8">
    <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
  </svg>
);

const ShareIcon = () => (
  <svg className="w-5 h-5 stroke-slate-400 fill-none hover:stroke-slate-600 transition-colors" viewBox="0 0 24 24" strokeWidth="1.8">
    <path strokeLinecap="round" strokeLinejoin="round" d="M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186l9.566-5.314m-9.566 7.5l9.566 5.314m0-10.628a2.25 2.25 0 100-4.5 2.25 2.25 0 000 4.5zm0 10.628a2.25 2.25 0 100-4.5 2.25 2.25 0 000 4.5z" />
  </svg>
);

const TransmissionIcon = () => (
  <svg className="w-4 h-4 stroke-slate-400 fill-none" viewBox="0 0 24 24" strokeWidth="1.8">
    <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 18H7.5M3.75 12h16.5" />
  </svg>
);

const FuelIcon = () => (
  <svg className="w-4 h-4 stroke-slate-400 fill-none" viewBox="0 0 24 24" strokeWidth="1.8">
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 5.25a3 3 0 013 3m3 0a6 6 0 01-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1121 7.5z" />
  </svg>
);

const CheckBadgeIcon = () => (
  <svg className="w-3.5 h-3.5 text-emerald-500 fill-none stroke-current" viewBox="0 0 24 24" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const KeyIcon = () => (
  <svg className="w-4 h-4 text-blue-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 5.25a3 3 0 013 3m3 0a6 6 0 01-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1121 7.5z" />
  </svg>
);

const ChevronLeftIcon = () => (
  <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
  </svg>
);

const ChevronRightIcon = () => (
  <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
  </svg>
);

// Icône WhatsApp ajoutée pour le bouton
const WhatsAppIcon = () => (
  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

// --- Liste des véhicules en location ---
const mockVehicles = [
  {
    id: 1,
    name: 'Kia Pegas',
    year: 2023,
    pricePerDay: 60000,
    transmission: 'Manuelle',
    fuel: 'Essence',
    hasDriver: false,
    images: [
      '/images/voitures/kia-pegas-1.jpg',
      '/images/voitures/kia-pegas-2.jpg',
    ],
    description: 'Une berline compacte économique, idéale pour vos déplacements urbains quotidiens avec un excellent rendement énergétique.',
    caution: 40000,
  },
  {
    id: 2,
    name: 'Poer Kingkong 4X4 Pickup',
    year: 2024,
    pricePerDay: 60000,
    transmission: 'Automatique',
    fuel: 'Essence',
    hasDriver: true,
    images: [
      '/images/voitures/poer-kingkong.jpg',
      '/images/voitures/poer-kingkong1.jpg',
      '/images/voitures/poer-kingkong2.jpg',
      '/images/voitures/poer-kingkong3.jpg'
    ],
    description: 'Citadine agile et moderne, parfaite pour se faufiler facilement dans la circulation tout en profitant du confort d’un chauffeur professionnel.',
    caution: 30000,
  },
  {
    id: 3,
    name: ' Mini Bus',
    year: 2025,
    pricePerDay: 60000,
    transmission: 'Manuelle',
    fuel: 'Essence',
    hasDriver: false,
    images: [
      '/images/voitures/bus.jpg',
      '/images/voitures/bus1.jpg',
      '/images/voitures/bus2.jpg',
    ],
    description: 'Mini-SUV compact et ultra-économique, parfait pour les petits budgets à la recherche d’autonomie.',
    caution: 30000,
  },
  {
    id: 4,
    name: 'Poer Kingkong 4X4 Pickup',
    year: 2023,
    pricePerDay: 60000,
    transmission: 'Automatique',
    fuel: 'Diesel',
    hasDriver: true,
    images: [
      '/images/voitures/poer.jpg',
      '/images/voitures/poer1.jpg',
      '/images/voitures/poer-kingkong1.jpg',
      '/images/voitures/poer-kingkong3.jpg'
    ],
    description: 'Le 4x4 de référence pour le grand confort, les missions hors d’Abidjan et les délégations officielles.',
    caution: 150000,
  },
  {
    id: 5,
    name: 'Changan Gs5',
    year: 2023,
    pricePerDay: 60000,
    transmission: 'Automatique',
    fuel: 'Diesel',
    hasDriver: false,
    images: [
      '/images/voitures/changan-gs.jpg',
      '/images/voitures/changan-gs1.jpg',
      '/images/voitures/changan-gs2.jpg',
      '/images/voitures/changan-gs3.jpg'
    ],
    description: 'SUV moderne au design racé, offrant un espace intérieur généreux et un agrément de conduite exceptionnel.',
    caution: 80000,
  },
  {
    id: 6,
    name: 'Kia Sportage',
    year: 2022,
    pricePerDay: 60000,
    transmission: 'Automatique',
    fuel: 'Diesel',
    hasDriver: true,
    images: [
      '/images/voitures/kia.jpg',
      '/images/voitures/kia1.jpg',
      '/images/voitures/kia2.jpg',
      '/images/voitures/kia3.jpg'
    ],
    description: 'Alliant élégance française et technologies de pointe, ce SUV garantit un voyage tout en douceur.',
    caution: 75000,
  },
];

// --- Composant d'une Carte de Véhicule ---
// Ajout de la prop "onReserve"
const VehicleCard = ({ car, isFav, toggleFavorite, onSelectCar, onReserve }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const nextImage = (e) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev + 1) % car.images.length);
  };

  const prevImage = (e) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev === 0 ? car.images.length - 1 : prev - 1));
  };

  return (
    <div className="group bg-white/95 backdrop-blur-md rounded-2xl border border-white/20 overflow-hidden shadow-xl hover:shadow-2xl hover:border-blue-300 transition-all duration-300 flex flex-col justify-between">
      <div>
        {/* CARROUSEL D'IMAGES */}
        <div className="relative aspect-[16/10] bg-slate-100 overflow-hidden group/carousel">
          <img
            src={car.images[currentImageIndex]}
            alt={`${car.name} - Vue ${currentImageIndex + 1}`}
            className="w-full h-full object-cover transition-opacity duration-300"
          />

          {/* Badge Chauffeur */}
          <span className="absolute top-3 left-3 bg-slate-900/80 text-white text-[10px] tracking-wider uppercase font-bold px-2.5 py-1 rounded-lg backdrop-blur-md border border-white/10 shadow-sm z-10">
            {car.hasDriver ? 'Avec chauffeur' : 'Sans chauffeur'}
          </span>

          {/* Contrôles du Carrousel (Flèches) */}
          <button 
            onClick={prevImage} 
            className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/70 text-white p-1.5 rounded-full opacity-0 group-hover/carousel:opacity-100 transition-all duration-200 z-20 backdrop-blur-sm"
          >
            <ChevronLeftIcon />
          </button>
          
          <button 
            onClick={nextImage} 
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/70 text-white p-1.5 rounded-full opacity-0 group-hover/carousel:opacity-100 transition-all duration-200 z-20 backdrop-blur-sm"
          >
            <ChevronRightIcon />
          </button>

          {/* Indicateurs du Carrousel (Points) */}
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 z-20">
            {car.images.map((_, idx) => (
              <div 
                key={idx} 
                className={`h-1.5 rounded-full transition-all duration-300 ${idx === currentImageIndex ? 'w-4 bg-white' : 'w-1.5 bg-white/50'}`} 
              />
            ))}
          </div>
        </div>

        {/* Contenu principal */}
        <div className="p-4 sm:p-5">
          <h3 className="text-base font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
            {car.name} <span className="text-slate-400 font-normal">({car.year})</span>
          </h3>

          <div className="flex items-baseline justify-between mt-2">
            <div>
              <span className="text-xl sm:text-2xl font-black text-blue-600 tracking-tight">
                {car.pricePerDay.toLocaleString('fr-FR')}
              </span>
              <span className="text-xs font-bold text-blue-800 ml-1">FCFA</span>
              <span className="text-xs text-slate-400 font-medium"> / jour</span>
            </div>

            <div className="flex items-center gap-1">
              <button className="p-2 hover:bg-slate-100 rounded-full transition-colors">
                <ShareIcon />
              </button>
              <button
                onClick={() => toggleFavorite(car.id)}
                className="p-2 hover:bg-slate-100 rounded-full transition-colors"
              >
                <HeartIcon filled={isFav} />
              </button>
            </div>
          </div>

          {/* Caractéristiques */}
          <div className="flex items-center gap-4 mt-4 pt-3 border-t border-slate-100 text-xs font-medium text-slate-600">
            <div className="flex items-center gap-1.5">
              <TransmissionIcon />
              <span>{car.transmission}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <FuelIcon />
              <span>{car.fuel}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bas de carte : Badges + Boutons Détails et Réservation */}
      <div className="px-4 sm:px-5 pb-4 sm:pb-5 pt-2 flex flex-col gap-3">
        <div className="flex flex-wrap items-center justify-center sm:justify-between gap-y-1 gap-x-2 text-[10px] sm:text-[11px] font-semibold text-emerald-600 bg-emerald-50/70 px-2 py-1.5 rounded-lg border border-emerald-100/50">
          <div className="flex items-center gap-1">
            <CheckBadgeIcon />
            <span>Certifiée</span>
          </div>
          <span className="text-emerald-300 hidden sm:inline">•</span>
          <div className="flex items-center gap-1">
            <CheckBadgeIcon />
            <span>Inspectée</span>
          </div>
          <span className="text-emerald-300 hidden sm:inline">•</span>
          <div className="flex items-center gap-1">
            <CheckBadgeIcon />
            <span>Tous risques</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => onSelectCar(car)}
            className="flex-1 py-2.5 bg-slate-300 hover:bg-slate-400 text-slate-800 font-bold text-xs rounded-xl transition-all duration-200 flex items-center justify-center gap-2 border border-slate-200"
          >
            <span>Détails</span>
          </button>
          
          {/* BOUTON WHATSAPP DE LA CARTE */}
          <button
            onClick={onReserve}
            className="flex-1 py-2.5 bg-[#25D366] hover:bg-[#1ebd5b] text-white font-bold text-xs rounded-xl shadow-sm hover:shadow-md transition-all duration-200 flex items-center justify-center gap-2"
          >
            <WhatsAppIcon />
            <span>Réserver</span>
          </button>
        </div>
      </div>
    </div>
  );
};

// --- Composant Principal ---
export default function VehicleRentalSection() {
  const [filter, setFilter] = useState('ALL');
  const [favorites, setFavorites] = useState([]);
  const [selectedCar, setSelectedCar] = useState(null);

  // Fonction pour générer le lien et ouvrir WhatsApp
  const handleWhatsAppReservation = (car) => {
    // Remplacer par le vrai numéro au format international (sans le +)
    const adminWhatsApp = "2250544404780"; // Numéro international sans +
    const message = `Bonjour AutoLife, je souhaite réserver le véhicule suivant en location :
- Modèle : ${car.name} (${car.year})
- Tarif : ${car.pricePerDay.toLocaleString('fr-FR')} FCFA / jour
- Formule : ${car.hasDriver ? 'Avec chauffeur' : 'Sans chauffeur'}

Pourriez-vous me confirmer sa disponibilité ?`;
    
    const whatsappUrl = `https://wa.me/${adminWhatsApp}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const toggleFavorite = (id) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((favId) => favId !== id) : [...prev, id]
    );
  };

  const filteredVehicles = mockVehicles.filter((car) => {
    if (filter === 'WITHOUT_DRIVER') return !car.hasDriver;
    if (filter === 'WITH_DRIVER') return car.hasDriver;
    return true;
  });

  return (
    <section className="relative py-12 md:py-16 px-4 md:px-8 font-sans overflow-hidden min-h-screen flex items-center">
      
      {/* Arrière-plan */}
      <div className="absolute inset-0 z-0">
        <img
          src="/images/bg-hero.jpg"
          alt="Arrière-plan véhicule"
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/85 via-slate-900/80 to-slate-950/90 backdrop-blur-[2px]" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10 w-full">
        
        {/* En-tête de section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-6 md:mb-8 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-300 text-xs font-bold uppercase tracking-wider mb-3 backdrop-blur-md">
              <KeyIcon />
              <span>Service Location</span>
            </div>
            <h2 className="text-2xl md:text-4xl font-black font-['Montserrat',sans-serif] text-white tracking-tight">
              Voitures disponibles en location
            </h2>
            <p className="text-sm md:text-base text-slate-300 mt-1.5 font-['Montserrat',sans-serif] font-normal">
              Réservez votre véhicule <span className="font-bold text-blue-400">avec ou sans chauffeur</span> au meilleur tarif
            </p>
          </div>
          <a
            href="#voir-tout"
            className="group inline-flex items-center gap-2 text-xs font-bold text-white hover:text-blue-300 uppercase tracking-wider self-start md:self-auto bg-white/10 hover:bg-white/20 backdrop-blur-md px-5 py-2.5 rounded-full border border-white/20 shadow-lg transition-all"
          >
            <span>Voir toutes les locations</span>
            <span className="group-hover:translate-x-1 transition-transform">&gt;</span>
          </a>
        </div>

        {/* Barre de filtre */}
        <div className="flex items-center gap-2.5 mb-8 md:mb-10 pb-4 overflow-x-auto scrollbar-none">
          <button
            onClick={() => setFilter('ALL')}
            className={`px-5 py-2.5 text-xs md:text-sm font-semibold rounded-full transition-all whitespace-nowrap backdrop-blur-md ${
              filter === 'ALL'
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30 border border-blue-500'
                : 'bg-slate-900/60 text-slate-300 hover:bg-slate-800/80 border border-white/10'
            }`}
          >
            Toutes les voitures ({mockVehicles.length})
          </button>

          <button
            onClick={() => setFilter('WITHOUT_DRIVER')}
            className={`px-5 py-2.5 text-xs md:text-sm font-semibold rounded-full transition-all whitespace-nowrap backdrop-blur-md ${
              filter === 'WITHOUT_DRIVER'
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30 border border-blue-500'
                : 'bg-orange-500 text-slate-300 hover:bg-slate-800/80 border border-white/10'
            }`}
          >
            Sans chauffeur
          </button>

          <button
            onClick={() => setFilter('WITH_DRIVER')}
            className={`px-5 py-2.5 text-xs md:text-sm font-semibold rounded-full transition-all whitespace-nowrap backdrop-blur-md ${
              filter === 'WITH_DRIVER'
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30 border border-blue-500'
                : 'bg-slate-900/60 text-slate-300 hover:bg-slate-800/80 border border-white/10'
            }`}
          >
            Avec chauffeur
          </button>
        </div>

        {/* Grille des cartes véhicules */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredVehicles.map((car) => (
            <VehicleCard 
              key={car.id}
              car={car}
              isFav={favorites.includes(car.id)}
              toggleFavorite={toggleFavorite}
              onSelectCar={setSelectedCar}
              onReserve={() => handleWhatsAppReservation(car)} // Passage de la fonction
            />
          ))}
        </div>

      </div>

      {/* --- MODAL DE DÉTAIL & DEVIS --- */}
      {selectedCar && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/85 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[95vh] md:max-h-[90vh] overflow-hidden shadow-2xl border border-slate-100 flex flex-col md:flex-row relative">
            
            <button
              onClick={() => setSelectedCar(null)}
              className="absolute top-3 right-3 md:top-4 md:right-4 w-8 h-8 md:w-9 md:h-9 bg-white/90 md:bg-slate-100 hover:bg-white md:hover:bg-slate-200 text-slate-700 rounded-full flex items-center justify-center transition-all font-bold text-sm z-30 shadow-md backdrop-blur-sm md:backdrop-blur-none"
            >
              ✕
            </button>

            {/* Colonne de Gauche : Image & Badge */}
            <div className="relative w-full md:w-1/2 h-56 sm:h-64 md:h-auto flex-shrink-0">
              <img src={selectedCar.images[0]} alt={selectedCar.name} className="w-full h-full object-cover" />
              <div className="absolute bottom-3 left-3 md:bottom-4 md:left-4 bg-slate-900/80 backdrop-blur-md text-white text-[11px] md:text-xs font-bold px-3 py-1.5 rounded-lg border border-white/10 shadow-md">
                {selectedCar.hasDriver ? 'Avec chauffeur' : 'Sans chauffeur'}
              </div>
            </div>

            {/* Colonne de Droite : Contenu, Détails et Devis */}
            <div className="p-4 sm:p-6 flex flex-col flex-1 overflow-y-auto">
              <div className="flex flex-col gap-4 sm:gap-5 pt-1 md:pt-2 pr-0 md:pr-12">
                
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-1 sm:gap-2">
                  <div>
                    <h3 className="text-xl md:text-2xl font-bold text-slate-900 font-['Montserrat',sans-serif]">
                      {selectedCar.name} <span className="text-slate-400 font-normal">({selectedCar.year})</span>
                    </h3>
                    <p className="text-slate-500 text-xs sm:text-sm mt-1">Véhicule climatisé et rigoureusement inspecté pour vos déplacements.</p>
                  </div>
                  <div className="text-left sm:text-right mt-1 sm:mt-0">
                    <span className="text-xl md:text-2xl font-black text-blue-600">{selectedCar.pricePerDay.toLocaleString('fr-FR')} FCFA</span>
                    <span className="text-xs text-slate-400 sm:block ml-1 sm:ml-0">/ jour</span>
                  </div>
                </div>

                {/* Caractéristiques Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-3 bg-slate-50 p-3 sm:p-4 rounded-xl border border-slate-100 text-xs">
                  <div>
                    <span className="text-slate-400 block font-medium">Transmission</span>
                    <span className="font-bold text-slate-800">{selectedCar.transmission}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block font-medium">Carburant</span>
                    <span className="font-bold text-slate-800">{selectedCar.fuel}</span>
                  </div>
                  <div className="col-span-2 sm:col-span-1">
                    <span className="text-slate-400 block font-medium">Disponibilité</span>
                    <span className="font-bold text-emerald-600">Immédiate</span>
                  </div>
                </div>

                {/* Description */}
                <div>
                  <h4 className="font-bold text-sm text-slate-900 mb-1.5 sm:mb-2">Description du véhicule</h4>
                  <p className="text-slate-800 text-xs leading-relaxed">
                    {selectedCar.description} Ce tarif inclut l'assurance tous risques et un support technique disponible 24h/24.
                  </p>
                </div>

                {/* Devis Estimatif */}
                <div className="border border-blue-100 bg-blue-50/50 p-3 sm:p-4 rounded-xl">
                  <h4 className="font-bold text-sm text-blue-900 mb-3 flex items-center justify-between">
                    <span>Devis estimatif (1 Jour)</span>
                    <span className="text-[10px] sm:text-[11px] font-normal text-blue-700">Taxes incluses</span>
                  </h4>
                  <div className="space-y-2 text-xs">
                    <div className="flex justify-between text-slate-800">
                      <span>Location (1 j)</span>
                      <span className="font-medium">{selectedCar.pricePerDay.toLocaleString('fr-FR')} FCFA</span>
                    </div>
                    <div className="flex justify-between text-slate-800">
                      <span>Assurance tous risques</span>
                      <span className="font-medium text-emerald-600">Inclus</span>
                    </div>
                    <div className="flex justify-between text-slate-800">
                      <span>Caution remboursable</span>
                      <span className="font-medium">{selectedCar.caution.toLocaleString('fr-FR')} FCFA</span>
                    </div>
                    <div className="border-t border-blue-200 pt-2 mt-2 flex justify-between font-bold text-slate-900 text-sm">
                      <span>Total estimé</span>
                      <span className="text-blue-600">{(selectedCar.pricePerDay + selectedCar.caution).toLocaleString('fr-FR')} FCFA</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Actions du Modal - BOUTON WHATSAPP DE LA MODALE */}
              <div className="flex flex-col-reverse sm:flex-row gap-2.5 sm:gap-3 pt-5 mt-auto sm:mt-6 border-t border-slate-100">
                <button
                  onClick={() => setSelectedCar(null)}
                  className="flex-1 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl transition-all"
                >
                  Fermer
                </button>
                <button
                  onClick={() => {
                    handleWhatsAppReservation(selectedCar); // Déclenchement WhatsApp
                    setSelectedCar(null); // Optionnel : Fermer la modal après l'envoi
                  }}
                  className="flex-1 py-3 bg-[#25D366] hover:bg-[#1ebd5b] text-white font-bold text-xs rounded-xl shadow-lg shadow-green-600/30 transition-all flex items-center justify-center gap-2"
                >
                  <WhatsAppIcon />
                  Réserver maintenant
                </button>
              </div>

            </div>
          </div>
        </div>
      )}
    </section>
  );
}