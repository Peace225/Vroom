import React from 'react';

const VehicleIcon = ({ type }) => {
  // Bulle bleue claire en arrière-plan
  const BlobBackground = () => (
    <ellipse cx="50" cy="22" rx="42" ry="17" fill="#E2F0FE" />
  );

  // Ombre au sol sous la voiture
  const Shadow = () => (
    <ellipse cx="50" cy="39" rx="38" ry="2.5" fill="#1E293B" opacity="0.2" />
  );

  // Roue détaillée avec jante et moyeu
  const Wheel = ({ cx, cy }) => (
    <g>
      <circle cx={cx} cy={cy} r="6" fill="#1E293B" />
      <circle cx={cx} cy={cy} r="3.8" fill="#E2E8F0" />
      <circle cx={cx} cy={cy} r="1.5" fill="#475569" />
    </g>
  );

  // Styles communs pour l'effet voiture blanche de l'image
  const bodyStyle = { fill: "#FFFFFF", stroke: "#CBD5E1", strokeWidth: "0.8", strokeLinejoin: "round" };
  const windowStyle = { fill: "#334155" };

  const renderVehicle = () => {
    switch (type) {
      case '4X4':
        return (
          <g>
            <Shadow />
            {/* Galerie de toit */}
            <path d="M 22 10 H 52 M 25 10 V 13 M 37 10 V 13 M 49 10 V 13" stroke="#94A3B8" strokeWidth="1.2" strokeLinecap="round" />
            {/* Roue de secours arrière */}
            <rect x="11" y="16" width="4" height="13" rx="2" fill="#334155" />
            {/* Carrosserie angulaire 4x4 */}
            <path d="M 15 36 V 15 H 55 L 68 23 H 85 V 36 Z" {...bodyStyle} />
            {/* Vitres */}
            <path d="M 20 17 H 36 V 23 H 20 Z" {...windowStyle} />
            <path d="M 39 17 H 53 L 64 23 H 39 Z" {...windowStyle} />
            {/* Feux */}
            <rect x="83" y="24" width="2" height="3" fill="#F59E0B" rx="0.5" />
            <rect x="15" y="24" width="1.5" height="4" fill="#EF4444" />
            <Wheel cx="28" cy="36" />
            <Wheel cx="72" cy="36" />
          </g>
        );

      case 'COMPACTE':
        return (
          <g>
            <Shadow />
            <path d="M 14 36 L 16 26 Q 24 16 42 16 L 56 16 Q 72 17 84 27 L 86 36 Z" {...bodyStyle} />
            <path d="M 34 18 H 52 V 26 H 24 L 34 18 Z" {...windowStyle} />
            <path d="M 55 18 H 63 L 74 26 H 55 Z" {...windowStyle} />
            <rect x="84" y="28" width="2" height="2" fill="#F59E0B" />
            <path d="M 14 27 L 16 27 V 30 H 14 Z" fill="#EF4444" />
            <Wheel cx="28" cy="36" />
            <Wheel cx="72" cy="36" />
          </g>
        );

      case 'MINI SUV':
        return (
          <g>
            <Shadow />
            <path d="M 14 36 V 22 Q 22 14 42 14 H 56 Q 74 16 85 25 L 87 36 Z" {...bodyStyle} />
            <rect x="36" y="12" width="22" height="1.5" fill="#64748B" rx="0.5" />
            <path d="M 30 16 H 52 V 25 H 20 L 30 16 Z" {...windowStyle} />
            <path d="M 55 16 H 65 L 76 25 H 55 Z" {...windowStyle} />
            <circle cx="85" cy="27" r="1.2" fill="#F59E0B" />
            <rect x="14" y="25" width="1.5" height="4" fill="#EF4444" />
            <Wheel cx="28" cy="36" />
            <Wheel cx="73" cy="36" />
          </g>
        );

      case 'MONOSPACE':
        return (
          <g>
            <Shadow />
            <path d="M 15 36 V 16 Q 32 15 48 15 Q 74 17 87 28 L 88 36 Z" {...bodyStyle} />
            <path d="M 20 17 H 46 V 26 H 20 Z" {...windowStyle} />
            <path d="M 49 17 H 62 Q 72 19 79 26 H 49 Z" {...windowStyle} />
            <circle cx="86" cy="30" r="1.2" fill="#F59E0B" />
            <rect x="15" y="25" width="1.5" height="5" fill="#EF4444" />
            <Wheel cx="29" cy="36" />
            <Wheel cx="74" cy="36" />
          </g>
        );

      case 'PICKUP':
        return (
          <g>
            <Shadow />
            <path d="M 12 36 V 23 H 45 V 15 H 68 L 76 23 H 87 V 36 Z" {...bodyStyle} />
            <rect x="14" y="23" width="30" height="2" fill="#CBD5E1" />
            <path d="M 48 17 H 64 L 72 23 H 48 Z" {...windowStyle} />
            <circle cx="85" cy="26" r="1.2" fill="#F59E0B" />
            <rect x="12" y="25" width="1.5" height="4" fill="#EF4444" />
            <Wheel cx="27" cy="36" />
            <Wheel cx="73" cy="36" />
          </g>
        );

      case 'BERLINE':
        return (
          <g>
            <Shadow />
            <path d="M 12 36 V 26 Q 20 25 28 25 Q 38 15 52 15 H 60 Q 72 16 83 25 H 88 V 36 Z" {...bodyStyle} />
            <path d="M 38 17 H 54 V 25 H 26 L 38 17 Z" {...windowStyle} />
            <path d="M 57 17 H 64 L 74 25 H 57 Z" {...windowStyle} />
            <circle cx="86" cy="27" r="1.2" fill="#F59E0B" />
            <rect x="12" y="26" width="1.5" height="4" fill="#EF4444" />
            <Wheel cx="27" cy="36" />
            <Wheel cx="73" cy="36" />
          </g>
        );

      case 'SUV':
        return (
          <g>
            <Shadow />
            <path d="M 14 36 V 18 H 52 Q 68 18 74 22 L 88 27 V 36 Z" {...bodyStyle} />
            <rect x="24" y="15" width="28" height="1.5" fill="#64748B" rx="0.5" />
            <path d="M 20 20 H 45 V 26 H 20 Z" {...windowStyle} />
            <path d="M 48 20 H 60 L 70 26 H 48 Z" {...windowStyle} />
            <circle cx="86" cy="29" r="1.2" fill="#F59E0B" />
            <rect x="14" y="25" width="1.5" height="5" fill="#EF4444" />
            <Wheel cx="29" cy="36" />
            <Wheel cx="74" cy="36" />
          </g>
        );

      case 'FOURGONNETTE':
        return (
          <g>
            <Shadow />
            <path d="M 18 36 V 12 H 60 L 76 18 L 84 25 V 36 Z" {...bodyStyle} fill="#F8FAFC" />
            <line x1="52" y1="12" x2="52" y2="36" stroke="#CBD5E1" strokeWidth="1" />
            <path d="M 56 14 H 68 L 76 22 H 56 Z" {...windowStyle} />
            <rect x="80" y="26" width="4" height="6" fill="#64748B" rx="1" />
            <circle cx="82" cy="28" r="1" fill="#F59E0B" />
            <Wheel cx="32" cy="36" />
            <Wheel cx="70" cy="36" />
          </g>
        );

      default:
        return null;
    }
  };

  return (
    <svg viewBox="0 0 100 48" className="w-full h-full">
      <BlobBackground />
      {renderVehicle()}
    </svg>
  );
};

const CategoryCard = ({ label, iconType, onClick }) => (
  <button
    onClick={() => onClick && onClick(label)}
    className="bg-white p-4 rounded-xl flex flex-col items-center justify-between transition-all duration-200 hover:shadow-md hover:-translate-y-1 group cursor-pointer w-full"
  >
    <div className="w-24 h-14 flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
      <VehicleIcon type={iconType} />
    </div>
    <span className="text-[11px] font-bold text-slate-800 tracking-wider group-hover:text-blue-600">
      {label}
    </span>
  </button>
);

// Tableau des catégories mis à jour incluant la Fourgonnette
const categories = [
  { label: '4X4', iconType: '4X4' },
  { label: 'COMPACTE', iconType: 'COMPACTE' },
  { label: 'MINI SUV', iconType: 'MINI SUV' },
  { label: 'PICKUP', iconType: 'PICKUP' },
  { label: 'BERLINE', iconType: 'BERLINE' },
  { label: 'SUV', iconType: 'SUV' },
  { label: 'FOURGONNETTE', iconType: 'FOURGONNETTE' },
];

export default function VehicleCategorySearch({ onSelectCategory }) {
  return (
    <section className="bg-white py-12 px-4">
      <div className="max-w-7xl mx-auto flex flex-col items-center">
        {/* En-tête */}
        <div className="mb-10 text-center flex flex-col items-center">
          <div className="w-16 h-1 bg-blue-700 mb-4 rounded-full" />
          <h2 className="text-3xl font-extrabold text-slate-900">
            Rechercher par Catégorie
          </h2>
          <p className="text-sm text-slate-500 font-medium mt-2">
            Rechercher par type carrosserie
          </p>
        </div>

        {/* Grille unique pour tous les véhicules */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-4 w-full">
          {categories.map((cat) => (
            <CategoryCard 
              key={cat.label} 
              label={cat.label} 
              iconType={cat.iconType} 
              onClick={onSelectCategory} 
            />
          ))}
        </div>
      </div>
    </section>
  );
}