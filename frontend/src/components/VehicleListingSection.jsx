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

// --- Liste des véhicules en location ---
const mockVehicles = [
  {
    id: 1,
    name: 'Kia Pegas',
    year: 2023,
    pricePerDay: 25000,
    transmission: 'Manuelle',
    fuel: 'Essence',
    hasDriver: false,
    brandLogo: 'https://upload.wikimedia.org/wikipedia/commons/4/47/KIA_logo2021.svg',
    image: 'https://images.unsplash.com/photo-1590362891991-f776e747a588?auto=format&fit=crop&w=600&q=80',
    description: 'Une berline compacte économique, idéale pour vos déplacements urbains quotidiens avec un excellent rendement énergétique.',
    caution: 40000,
  },
  {
    id: 2,
    name: 'Toyota Vitz',
    year: 2024,
    pricePerDay: 20000,
    transmission: 'Automatique',
    fuel: 'Essence',
    hasDriver: true,
    brandLogo: 'https://upload.wikimedia.org/wikipedia/commons/9/9d/Toyota_carlogo.svg',
    image: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=600&q=80',
    description: 'Citadine agile et moderne, parfaite pour se faufiler facilement dans la circulation tout en profitant du confort d’un chauffeur professionnel.',
    caution: 30000,
  },
  {
    id: 3,
    name: 'Suzuki S-Presso',
    year: 2025,
    pricePerDay: 18000,
    transmission: 'Manuelle',
    fuel: 'Essence',
    hasDriver: false,
    brandLogo: 'https://upload.wikimedia.org/wikipedia/commons/1/12/Suzuki_logo_2015.svg',
    image: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=600&q=80',
    description: 'Mini-SUV compact et ultra-économique, parfait pour les petits budgets à la recherche d’autonomie.',
    caution: 30000,
  },
  {
    id: 4,
    name: 'Toyota Prado TXL',
    year: 2023,
    pricePerDay: 85000,
    transmission: 'Automatique',
    fuel: 'Diesel',
    hasDriver: true,
    brandLogo: 'https://upload.wikimedia.org/wikipedia/commons/9/9d/Toyota_carlogo.svg',
    image: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=600&q=80',
    description: 'Le 4x4 de référence pour le grand confort, les missions hors d’Abidjan et les délégations officielles.',
    caution: 150000,
  },
  {
    id: 5,
    name: 'Hyundai Tucson',
    year: 2023,
    pricePerDay: 50000,
    transmission: 'Automatique',
    fuel: 'Diesel',
    hasDriver: false,
    brandLogo: 'https://upload.wikimedia.org/wikipedia/commons/4/44/Hyundai_Motor_Company_logo.svg',
    image: 'https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=600&q=80',
    description: 'SUV moderne au design racé, offrant un espace intérieur généreux et un agrément de conduite exceptionnel.',
    caution: 80000,
  },
  {
    id: 6,
    name: 'Peugeot 3008',
    year: 2022,
    pricePerDay: 45000,
    transmission: 'Automatique',
    fuel: 'Diesel',
    hasDriver: true,
    brandLogo: 'https://upload.wikimedia.org/wikipedia/commons/f/f7/Peugeot_Logo.svg',
    image: 'https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?auto=format&fit=crop&w=600&q=80',
    description: 'Alliant élégance française et technologies de pointe, ce SUV garantit un voyage tout en douceur.',
    caution: 75000,
  },
];

export default function VehicleRentalSection() {
  const [filter, setFilter] = useState('ALL');
  const [favorites, setFavorites] = useState([]);
  const [selectedCar, setSelectedCar] = useState(null);

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
    <section className="relative py-16 px-4 md:px-8 font-sans overflow-hidden min-h-screen flex items-center">
      
      {/* --- IMAGE DE FOND AVEC OVERLAY SOMBRE --- */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1920&q=80"
          alt="Arrière-plan véhicule"
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/85 via-slate-900/80 to-slate-950/90 backdrop-blur-[2px]" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10 w-full">
        
        {/* En-tête de section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-300 text-xs font-bold uppercase tracking-wider mb-3 backdrop-blur-md">
              <KeyIcon />
              <span>Service Location</span>
            </div>

            <h2 className="text-2xl md:text-4xl font-black font-['Montserrat',sans-serif] text-white tracking-tight">
              Voitures disponibles en location
            </h2>
            
            <p className="text-sm md:text-base text-slate-300 mt-1.5 font-['Montserrat',sans-serif] font-normal">
              Réservez votre véhicule <span className="font-bold text-blue-400">avec ou sans chauffeur</span> au meilleur tarif journalier
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
        <div className="flex items-center gap-2.5 mb-10 pb-2 overflow-x-auto scrollbar-none">
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
          {filteredVehicles.map((car) => {
            const isFav = favorites.includes(car.id);

            return (
              <div
                key={car.id}
                className="group bg-white/95 backdrop-blur-md rounded-2xl border border-white/20 overflow-hidden shadow-xl hover:shadow-2xl hover:border-blue-300 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  {/* Image du véhicule & badges */}
                  <div className="relative aspect-[16/10] bg-slate-100 overflow-hidden">
                    <img
                      src={car.image}
                      alt={`${car.name} ${car.year}`}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />

                    <span className="absolute top-3 left-3 bg-slate-900/80 text-white text-[10px] tracking-wider uppercase font-bold px-2.5 py-1 rounded-lg backdrop-blur-md border border-white/10 shadow-sm">
                      {car.hasDriver ? 'Avec chauffeur' : 'Sans chauffeur'}
                    </span>

                    <div className="absolute bottom-3 right-3 w-10 h-10 bg-white/95 rounded-xl p-2 shadow-md backdrop-blur-sm flex items-center justify-center border border-slate-100">
                      <img
                        src={car.brandLogo}
                        alt="Brand logo"
                        className="max-w-full max-h-full object-contain"
                      />
                    </div>
                  </div>

                  {/* Contenu principal */}
                  <div className="p-5">
                    <h3 className="text-base font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                      {car.name} <span className="text-slate-400 font-normal">({car.year})</span>
                    </h3>

                    <div className="flex items-baseline justify-between mt-2">
                      <div>
                        <span className="text-2xl font-black text-blue-600 tracking-tight">
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
                <div className="px-5 pb-5 pt-2 flex flex-col gap-3">
                  <div className="flex items-center justify-between text-[11px] font-semibold text-emerald-600 bg-emerald-50/70 px-3 py-1.5 rounded-lg border border-emerald-100/50">
                    <div className="flex items-center gap-1">
                      <CheckBadgeIcon />
                      <span>Certifiée</span>
                    </div>
                    <span className="text-emerald-300">•</span>
                    <div className="flex items-center gap-1">
                      <CheckBadgeIcon />
                      <span>Inspectée</span>
                    </div>
                    <span className="text-emerald-300">•</span>
                    <div className="flex items-center gap-1">
                      <CheckBadgeIcon />
                      <span>Tous risques</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setSelectedCar(car)}
                      className="flex-1 py-2.5 bg-slate-300 hover:bg-slate-300 text-slate-800 font-bold text-xs rounded-xl transition-all duration-200 flex items-center justify-center gap-2 border border-slate-200"
                    >
                      <span>Détails</span>
                    </button>
                    
                    <button
                      onClick={() => alert(`Demande de réservation initiée pour ${car.name}`)}
                      className="flex-1 py-2.5 bg-green-900 hover:bg-green-600 text-white font-bold text-xs rounded-xl shadow-sm hover:shadow-md transition-all duration-200 flex items-center justify-center gap-2"
                    >
                      <span>Réserver</span>
                    </button>
                  </div>
                </div>

              </div>
            );
          })}
        </div>

      </div>

      {/* --- MODAL DE DÉTAIL & DEVIS --- */}
{selectedCar && (
  <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fadeIn">
    <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden shadow-2xl border border-slate-100 flex flex-col md:flex-row relative">
      
      {/* Bouton Fermer fixé en haut à droite de la modale */}
      <button
        onClick={() => setSelectedCar(null)}
        className="absolute top-4 right-4 w-9 h-9 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-full flex items-center justify-center transition-all font-bold text-sm z-30 shadow-md"
      >
        ✕
      </button>

      {/* Colonne de Gauche : Image & Badge */}
      <div className="relative w-full md:w-1/2 min-h-[260px] md:min-h-full bg-slate-100 flex-shrink-0">
        <img src={selectedCar.image} alt={selectedCar.name} className="w-full h-full object-cover" />
        <div className="absolute bottom-4 left-4 bg-slate-900/80 backdrop-blur-md text-white text-xs font-bold px-3.5 py-1.5 rounded-lg border border-white/10 shadow-md">
          {selectedCar.hasDriver ? 'Avec chauffeur' : 'Sans chauffeur'}
        </div>
      </div>

      {/* Colonne de Droite : Contenu, Détails et Devis */}
      <div className="p-6 flex flex-col justify-between flex-1 overflow-y-auto max-h-[85vh] md:max-h-[90vh]">
        
        {/* CORRECTION : Ajout d'un padding-right plus large (pr-14) pour éviter le chevauchement avec le bouton */}
        <div className="flex flex-col gap-5 pt-2 pr-14">
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2">
            <div>
              <h3 className="text-2xl font-bold text-slate-900 font-['Montserrat',sans-serif]">
                {selectedCar.name} <span className="text-slate-400 font-normal">({selectedCar.year})</span>
              </h3>
              <p className="text-slate-500 text-xs sm:text-sm mt-1">Véhicule climatisé et rigoureusement inspecté pour vos déplacements.</p>
            </div>
            <div className="text-left sm:text-right">
              <span className="text-2xl font-black text-blue-600">{selectedCar.pricePerDay.toLocaleString('fr-FR')} FCFA</span>
              <span className="text-xs text-slate-400 block">/ jour</span>
            </div>
          </div>

          {/* Caractéristiques Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 bg-slate-50 p-4 rounded-xl border border-slate-100 text-xs">
            <div>
              <span className="text-slate-400 block font-medium">Transmission</span>
              <span className="font-bold text-slate-800">{selectedCar.transmission}</span>
            </div>
            <div>
              <span className="text-slate-400 block font-medium">Carburant</span>
              <span className="font-bold text-slate-800">{selectedCar.fuel}</span>
            </div>
            <div>
              <span className="text-slate-400 block font-medium">Disponibilité</span>
              <span className="font-bold text-emerald-600">Immédiate</span>
            </div>
          </div>

          {/* Description */}
          <div>
            <h4 className="font-bold text-sm text-slate-900 mb-2">Description du véhicule</h4>
            <p className="text-slate-800 text-xs leading-relaxed">
              {selectedCar.description} Ce tarif inclut l'assurance tous risques et un support technique disponible 24h/24.
            </p>
          </div>

          {/* Devis Estimatif */}
          <div className="border border-blue-100 bg-blue-50/50 p-4 rounded-xl">
            <h4 className="font-bold text-sm text-blue-900 mb-3 flex items-center justify-between">
              <span>Devis estimatif (1 Jour)</span>
              <span className="text-[11px] font-normal text-blue-700">Taxes incluses</span>
            </h4>
            <div className="space-y-2 text-xs">
              <div className="flex justify-between text-slate-800">
                <span>Location journalière (1 j)</span>
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
              <div className="border-t border-blue-200 pt-2 flex justify-between font-bold text-slate-900 text-sm">
                <span>Total estimé (1er jour + caution)</span>
                <span className="text-blue-600">{(selectedCar.pricePerDay + selectedCar.caution).toLocaleString('fr-FR')} FCFA</span>
              </div>
            </div>
          </div>
        </div>

        {/* Actions du Modal */}
        <div className="flex gap-3 pt-6 mt-6 border-t border-slate-100">
          <button
            onClick={() => setSelectedCar(null)}
            className="flex-1 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl transition-all"
          >
            Fermer
          </button>
          <button
            onClick={() => {
              alert(`Réservation confirmée pour ${selectedCar.name}`);
              setSelectedCar(null);
            }}
            className="flex-1 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-lg shadow-blue-600/30 transition-all"
          >
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