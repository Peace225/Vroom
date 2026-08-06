import React, { useState } from 'react';
import VehicleDetail from './VehicleDetail';

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

const TagIcon = () => (
  <svg className="w-4 h-4 text-blue-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9.568 3H5.25A2.25 2.25 0 003 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 005.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 009.568 3z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 6h.008v.008H6V6z" />
  </svg>
);

const carBrands = [
  { name: 'Acura', logo: 'https://upload.wikimedia.org/wikipedia/commons/5/5e/Acura_logo.svg' },
  { name: 'Changan', logo: 'https://upload.wikimedia.org/wikipedia/commons/8/85/Changan_Automobile_logo.svg' },
  { name: 'Chery', logo: 'https://upload.wikimedia.org/wikipedia/commons/1/18/Chery_Logo.svg' },
  { name: 'Citroen', logo: 'https://upload.wikimedia.org/wikipedia/commons/1/11/Citro%C3%ABn_logo_2022.svg' },
  { name: 'Dayun', logo: 'https://upload.wikimedia.org/wikipedia/commons/2/22/Dongfeng_Motor_logo.svg' }, // fallback/placeholder
  { name: 'Dongfeng', logo: 'https://upload.wikimedia.org/wikipedia/commons/2/22/Dongfeng_Motor_logo.svg' },
  { name: 'FAW', logo: 'https://upload.wikimedia.org/wikipedia/commons/a/a5/FAW_group_logo.svg' },
  { name: 'Ford', logo: 'https://upload.wikimedia.org/wikipedia/commons/3/3e/Ford_logo_flat.svg' },
  { name: 'Gac', logo: 'https://upload.wikimedia.org/wikipedia/commons/0/05/GAC_Group_logo.svg' },
  { name: 'Geely', logo: 'https://upload.wikimedia.org/wikipedia/commons/e/ea/Geely-logo.svg' },
  { name: 'Great Wall', logo: 'https://upload.wikimedia.org/wikipedia/commons/9/97/Great_Wall_Motor_logo.svg' },
  { name: 'Haval', logo: 'https://upload.wikimedia.org/wikipedia/commons/9/93/Haval_logo.svg' },
  { name: 'Honda', logo: 'https://upload.wikimedia.org/wikipedia/commons/7/7b/Honda_Logo.svg' },
  { name: 'Hyundai', logo: 'https://upload.wikimedia.org/wikipedia/commons/4/44/Hyundai_Motor_Company_logo.svg' },
  { name: 'JAC', logo: 'https://upload.wikimedia.org/wikipedia/commons/e/ec/JAC_motors_logo.svg' },
  { name: 'Jeep', logo: 'https://upload.wikimedia.org/wikipedia/commons/5/5b/Jeep_%28logo%29.svg' },
  { name: 'Jetour', logo: 'https://upload.wikimedia.org/wikipedia/commons/2/25/Jetour_logo.svg' },
  { name: 'Kaiyi', logo: 'https://upload.wikimedia.org/wikipedia/commons/4/4e/Kaiyi_Auto_logo.svg' },
  { name: 'Kia', logo: 'https://upload.wikimedia.org/wikipedia/commons/4/47/KIA_logo2021.svg' },
  { name: 'Leapmotor', logo: 'https://upload.wikimedia.org/wikipedia/commons/8/86/Leapmotor_logo.svg' },
  { name: 'MG', logo: 'https://upload.wikimedia.org/wikipedia/commons/7/77/MG_Motor_logo.svg' },
  { name: 'Mazda', logo: 'https://upload.wikimedia.org/wikipedia/commons/7/77/Mazda_Logo.svg' },
  { name: 'Mercedes-Benz', logo: 'https://upload.wikimedia.org/wikipedia/commons/9/90/Mercedes-Logo.svg' },
  { name: 'Mitsubishi', logo: 'https://upload.wikimedia.org/wikipedia/commons/5/5a/Mitsubishi_logo.svg' },
  { name: 'Nissan', logo: 'https://upload.wikimedia.org/wikipedia/commons/8/8c/Nissan_logo.svg' },
  { name: 'Peugeot', logo: 'https://upload.wikimedia.org/wikipedia/commons/f/f7/Peugeot_Logo.svg' },
  { name: 'Renault', logo: 'https://upload.wikimedia.org/wikipedia/commons/4/42/Renault_2021_logo.svg' },
  { name: 'Suzuki', logo: 'https://upload.wikimedia.org/wikipedia/commons/1/12/Suzuki_logo_2015.svg' },
  { name: 'Toyota', logo: 'https://upload.wikimedia.org/wikipedia/commons/9/9d/Toyota_carlogo.svg' },
  { name: 'Volkswagen', logo: 'https://upload.wikimedia.org/wikipedia/commons/a/a1/Volkswagen_Logo_till_1995.svg' }
];

const mockVehicles = [
  { id: 1, name: 'Kia Pegas', year: 2024, price: 8500000, transmission: 'Manuelle', fuel: 'Essence', condition: 'Neuf', brandLogo: 'https://upload.wikimedia.org/wikipedia/commons/4/47/KIA_logo2021.svg', image: 'https://images.unsplash.com/photo-1590362891991-f776e747a588?auto=format&fit=crop&w=600&q=80', certified: true, inspected: true, warranty: '2 Ans' },
  { id: 2, name: 'Toyota Vitz', year: 2019, price: 4500000, transmission: 'Automatique', fuel: 'Essence', condition: 'Occasion', brandLogo: 'https://upload.wikimedia.org/wikipedia/commons/9/9d/Toyota_carlogo.svg', image: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=600&q=80', certified: true, inspected: true, warranty: '6 Mois' },
  { id: 3, name: 'Suzuki S-Presso', year: 2024, price: 6500000, transmission: 'Manuelle', fuel: 'Essence', condition: 'Neuf', brandLogo: 'https://upload.wikimedia.org/wikipedia/commons/1/12/Suzuki_logo_2015.svg', image: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=600&q=80', certified: true, inspected: true, warranty: '2 Ans' },
  { id: 4, name: 'Toyota RAV4', year: 2021, price: 18000000, transmission: 'Automatique', fuel: 'Essence', condition: 'Occasion', brandLogo: 'https://upload.wikimedia.org/wikipedia/commons/9/9d/Toyota_carlogo.svg', image: 'https://images.unsplash.com/photo-1626668893632-6f3a4466d22f?auto=format&fit=crop&w=600&q=80', certified: true, inspected: true, warranty: '1 An' },
  { id: 5, name: 'Hyundai Tucson', year: 2024, price: 25000000, transmission: 'Automatique', fuel: 'Diesel', condition: 'Neuf', brandLogo: 'https://upload.wikimedia.org/wikipedia/commons/4/44/Hyundai_Motor_Company_logo.svg', image: 'https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=600&q=80', certified: true, inspected: true, warranty: '3 Ans' },
  { id: 6, name: 'Peugeot 3008', year: 2020, price: 14000000, transmission: 'Automatique', fuel: 'Diesel', condition: 'Occasion', brandLogo: 'https://upload.wikimedia.org/wikipedia/commons/f/f7/Peugeot_Logo.svg', image: 'https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?auto=format&fit=crop&w=600&q=80', certified: true, inspected: true, warranty: '6 Mois' },
  { id: 7, name: 'Mercedes-Benz Classe C', year: 2024, price: 45000000, transmission: 'Automatique', fuel: 'Essence', condition: 'Neuf', brandLogo: 'https://upload.wikimedia.org/wikipedia/commons/9/90/Mercedes-Logo.svg', image: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&w=600&q=80', certified: true, inspected: true, warranty: '2 Ans' },
  { id: 8, name: 'Nissan Qashqai', year: 2018, price: 9500000, transmission: 'Automatique', fuel: 'Essence', condition: 'Occasion', brandLogo: 'https://upload.wikimedia.org/wikipedia/commons/8/8c/Nissan_logo.svg', image: 'https://images.unsplash.com/photo-1570733117311-d990c3816c47?auto=format&fit=crop&w=600&q=80', certified: true, inspected: true, warranty: '6 Mois' },
  { id: 9, name: 'Mitsubishi L200', year: 2024, price: 22000000, transmission: 'Manuelle', fuel: 'Diesel', condition: 'Neuf', brandLogo: 'https://upload.wikimedia.org/wikipedia/commons/5/5a/Mitsubishi_logo.svg', image: 'https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?auto=format&fit=crop&w=600&q=80', certified: true, inspected: true, warranty: '3 Ans' },
  { id: 10, name: 'Toyota Corolla', year: 2017, price: 6000000, transmission: 'Manuelle', fuel: 'Essence', condition: 'Occasion', brandLogo: 'https://upload.wikimedia.org/wikipedia/commons/9/9d/Toyota_carlogo.svg', image: 'https://images.unsplash.com/photo-1559416523-140ddc3d238c?auto=format&fit=crop&w=600&q=80', certified: true, inspected: true, warranty: '3 Mois' },
];

export default function VehicleSalesSection() {
  const [filter, setFilter] = useState('ALL');
  const [selectedBrand, setSelectedBrand] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [selectedVehicleForDetail, setSelectedVehicleForDetail] = useState(null);

  const toggleFavorite = (id) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((favId) => favId !== id) : [...prev, id]
    );
  };

  const filteredVehicles = mockVehicles.filter((car) => {
    const conditionMatch =
      filter === 'ALL' ||
      (filter === 'OCCASION' && car.condition === 'Occasion') ||
      (filter === 'NEUF' && car.condition === 'Neuf');

    const brandMatch = selectedBrand
      ? car.name.toLowerCase().includes(selectedBrand.toLowerCase())
      : true;

    return conditionMatch && brandMatch;
  });

  if (selectedVehicleForDetail) {
    return (
      <VehicleDetail
        vehicle={selectedVehicleForDetail}
        onBack={() => setSelectedVehicleForDetail(null)}
      />
    );
  }

  return (
    <section className="relative py-16 px-4 md:px-8 font-['Montserrat',sans-serif] overflow-hidden min-h-screen">
      
      {/* --- IMAGE DE FOND AVEC OVERLAY SOMBRE IMMERSIF --- */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=1920&q=80"
          alt="Arrière-plan showroom automobile"
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/90 via-slate-900/85 to-slate-950/95 backdrop-blur-[3px]" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10 w-full">
        
        {/* En-tête de section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-300 text-xs font-bold uppercase tracking-wider mb-3 backdrop-blur-md">
              <TagIcon />
              <span>Showroom Vente</span>
            </div>

            <h2 className="text-3xl md:text-4xl font-black text-white tracking-tight">
              Véhicules en vente
            </h2>
            <p className="text-sm md:text-base text-slate-300 mt-1.5">
              Explorez notre sélection de véhicules <span className="font-bold text-blue-400">neufs et d'occasion</span> certifiés au meilleur prix
            </p>
          </div>
        </div>

        {/* Grille de sélection par marque (Showroom Glassmorphic Panel) */}
        <div className="mb-10 bg-slate-900/60 backdrop-blur-md p-6 rounded-3xl shadow-xl border border-white/10">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-bold text-slate-300 uppercase tracking-wider">
              Filtrer par marque ({carBrands.length} marques disponibles)
            </span>
            {selectedBrand && (
              <button
                onClick={() => setSelectedBrand(null)}
                className="text-xs font-semibold text-blue-400 hover:text-blue-300 underline transition-colors"
              >
                Réinitialiser la marque
              </button>
            )}
          </div>

          <div className="flex flex-wrap justify-center gap-3 md:gap-4 max-h-[320px] overflow-y-auto pr-1">
            {carBrands.map((brand) => {
              const isSelected = selectedBrand === brand.name;
              return (
                <button
                  key={brand.name}
                  onClick={() => setSelectedBrand(isSelected ? null : brand.name)}
                  className={`flex flex-col items-center justify-center p-3 rounded-2xl transition-all duration-300 w-24 md:w-28 ${
                    isSelected
                      ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30 scale-105 ring-2 ring-blue-400'
                      : 'bg-white/90 hover:bg-white text-slate-800 hover:shadow-md hover:-translate-y-0.5 border border-white/20'
                  }`}
                >
                  <div className="w-10 h-10 md:w-11 md:h-11 flex items-center justify-center mb-2">
                    <img
                      src={brand.logo}
                      alt={brand.name}
                      className={`max-w-full max-h-full object-contain transition-all ${
                        isSelected ? 'brightness-0 invert' : ''
                      }`}
                    />
                  </div>
                  <span className="text-[11px] md:text-xs font-bold tracking-tight text-center truncate w-full">
                    {brand.name}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Barre de filtre d'état et compteur */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8 pb-4 border-b border-white/10">
          <div className="flex items-center gap-2.5 overflow-x-auto scrollbar-none">
            <button
              onClick={() => setFilter('ALL')}
              className={`px-5 py-2.5 text-xs md:text-sm font-semibold rounded-full transition-all whitespace-nowrap backdrop-blur-md ${
                filter === 'ALL'
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30 border border-blue-500'
                  : 'bg-slate-900/60 text-slate-300 hover:bg-slate-800/80 border border-white/10'
              }`}
            >
              Tous les états
            </button>
            <button
              onClick={() => setFilter('OCCASION')}
              className={`px-5 py-2.5 text-xs md:text-sm font-semibold rounded-full transition-all whitespace-nowrap backdrop-blur-md ${
                filter === 'OCCASION'
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30 border border-blue-500'
                  : 'bg-slate-900/60 text-slate-300 hover:bg-slate-800/80 border border-white/10'
              }`}
            >
              Occasion
            </button>
            <button
              onClick={() => setFilter('NEUF')}
              className={`px-5 py-2.5 text-xs md:text-sm font-semibold rounded-full transition-all whitespace-nowrap backdrop-blur-md ${
                filter === 'NEUF'
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30 border border-blue-500'
                  : 'bg-slate-900/60 text-slate-300 hover:bg-slate-800/80 border border-white/10'
              }`}
            >
              Neuf
            </button>
          </div>

          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/15 text-xs font-bold text-white shadow-sm">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>{filteredVehicles.length} véhicule(s) disponible(s)</span>
          </div>
        </div>

        {/* Grille des cartes véhicules */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredVehicles.map((car) => {
            const isFav = favorites.includes(car.id);

            return (
              <div
                key={car.id}
                onClick={() => setSelectedVehicleForDetail(car)}
                className="group bg-white/95 backdrop-blur-md rounded-2xl border border-white/20 overflow-hidden shadow-xl hover:shadow-2xl hover:border-blue-300 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between cursor-pointer"
              >
                <div>
                  <div className="relative aspect-[16/10] bg-slate-100 overflow-hidden">
                    <img
                      src={car.image}
                      alt={`${car.name} ${car.year}`}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-slate-900/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-4">
                      <span className="text-white bg-white/20 backdrop-blur-md border border-white/30 px-4 py-2 rounded-full text-xs font-bold shadow-lg transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                        Voir les détails &gt;
                      </span>
                    </div>

                    <span
                      className={`absolute top-3 left-3 text-white text-[10px] tracking-wider uppercase font-bold px-2.5 py-1 rounded-lg backdrop-blur-md shadow-sm border border-white/10 ${
                        car.condition === 'Neuf'
                          ? 'bg-emerald-600/90'
                          : 'bg-slate-900/80'
                      }`}
                    >
                      {car.condition}
                    </span>

                    <div className="absolute bottom-3 right-3 w-10 h-10 bg-white/95 rounded-xl p-2 shadow-md backdrop-blur-sm flex items-center justify-center border border-slate-100">
                      <img
                        src={car.brandLogo}
                        alt="Brand logo"
                        className="max-w-full max-h-full object-contain"
                      />
                    </div>
                  </div>

                  <div className="p-5">
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="text-base font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                        {car.name}{' '}
                        <span className="text-slate-400 font-normal">({car.year})</span>
                      </h3>

                      <div className="flex items-center gap-1" onClick={(e) => e.stopPropagation()}>
                        <button className="p-1.5 hover:bg-slate-100 rounded-full transition-colors">
                          <ShareIcon />
                        </button>
                        <button
                          onClick={() => toggleFavorite(car.id)}
                          className="p-1.5 hover:bg-slate-100 rounded-full transition-colors"
                        >
                          <HeartIcon filled={isFav} />
                        </button>
                      </div>
                    </div>

                    <div className="mt-3">
                      <span className="text-2xl font-black text-blue-600 tracking-tight">
                        {car.price.toLocaleString('fr-FR')}
                      </span>
                      <span className="text-xs font-bold text-blue-800 ml-1">FCFA</span>
                    </div>

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
                      <span>Garantie {car.warranty}</span>
                    </div>
                  </div>

                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedVehicleForDetail(car);
                    }}
                    className="w-full py-2.5 bg-slate-900 hover:bg-blue-600 text-white font-bold text-xs rounded-xl shadow-sm hover:shadow-md transition-all duration-200 flex items-center justify-center gap-2"
                  >
                    <span>Consulter l'offre</span>
                  </button>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}