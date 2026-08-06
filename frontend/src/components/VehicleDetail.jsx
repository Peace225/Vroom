import React, { useState } from 'react';

// --- Icônes Vectorielles (SVG) ---
const HeartIcon = ({ filled }) => (
  <svg className={`w-5 h-5 ${filled ? 'fill-red-500 stroke-red-500' : 'stroke-slate-500 fill-none'} transition-colors`} viewBox="0 0 24 24" strokeWidth="1.8">
    <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
  </svg>
);

const ShareIcon = () => (
  <svg className="w-5 h-5 stroke-slate-500 fill-none" viewBox="0 0 24 24" strokeWidth="1.8">
    <path strokeLinecap="round" strokeLinejoin="round" d="M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186l9.566-5.314m-9.566 7.5l9.566 5.314m0-10.628a2.25 2.25 0 100-4.5 2.25 2.25 0 000 4.5zm0 10.628a2.25 2.25 0 100-4.5 2.25 2.25 0 000 4.5z" />
  </svg>
);

const TransmissionIcon = () => (
  <svg className="w-4 h-4 stroke-slate-500 fill-none" viewBox="0 0 24 24" strokeWidth="1.8">
    <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 18H7.5M3.75 12h16.5" />
  </svg>
);

const FuelIcon = () => (
  <svg className="w-4 h-4 stroke-slate-500 fill-none" viewBox="0 0 24 24" strokeWidth="1.8">
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 5.25a3 3 0 013 3m3 0a6 6 0 01-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1121 7.5z" />
  </svg>
);

const CheckBadgeIcon = () => (
  <svg className="w-4 h-4 text-emerald-600 fill-none stroke-current" viewBox="0 0 24 24" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const ArrowLeftIcon = () => (
  <svg className="w-5 h-5 stroke-current" viewBox="0 0 24 24" fill="none" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
  </svg>
);

const WhatsappIcon = () => (
  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.124-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
  </svg>
);

export default function VehicleDetail({ vehicle, onBack, favorites = [], toggleFavorite = () => {} }) {
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  // Sécurité si aucun véhicule n'est fourni
  if (!vehicle) {
    return (
      <section className="bg-slate-50 py-12 px-4 text-center min-h-screen flex flex-col items-center justify-center">
        <p className="text-slate-600 mb-4 font-medium">Aucun détail de véhicule à afficher.</p>
        <button
          onClick={onBack}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors shadow-sm text-sm"
        >
          <ArrowLeftIcon />
          Retour aux véhicules
        </button>
      </section>
    );
  }

  const carImages = vehicle.images?.length > 0 ? vehicle.images : [vehicle.image].filter(Boolean);
  const isFav = Array.isArray(favorites) && vehicle.id ? favorites.includes(vehicle.id) : false;

  return (
    <section className="bg-slate-50 py-8 px-4 md:px-8 font-sans min-h-screen">
      <div className="max-w-7xl mx-auto">
        
        {/* Bouton retour */}
        <button
          onClick={onBack}
          className="flex items-center gap-2 mb-6 px-4 py-2 bg-white border border-slate-200 rounded-lg text-slate-700 font-semibold hover:bg-slate-100 transition-colors shadow-sm text-sm"
        >
          <ArrowLeftIcon />
          Retour aux véhicules
        </button>

        {/* Bloc Détails */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-slate-100">
          
          {/* Galerie Photo */}
          <div className="lg:col-span-7 flex flex-col gap-4">
            <div className="relative aspect-[16/10] bg-slate-100 rounded-2xl overflow-hidden border border-slate-100 shadow-inner">
              <img
                src={carImages[activeImageIndex] || ''}
                alt={vehicle.name || 'Véhicule'}
                className="w-full h-full object-cover transition-all duration-300"
              />
              {vehicle.condition && (
                <span className={`absolute top-4 left-4 text-white text-xs uppercase font-bold px-3 py-1 rounded-md backdrop-blur-md ${vehicle.condition === 'Neuf' ? 'bg-emerald-600/90' : 'bg-slate-900/80'}`}>
                  {vehicle.condition}
                </span>
              )}
            </div>

            {carImages.length > 1 && (
              <div className="grid grid-cols-4 gap-3">
                {carImages.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveImageIndex(index)}
                    className={`relative aspect-[16/10] rounded-xl overflow-hidden border-2 transition-all ${
                      activeImageIndex === index ? 'border-blue-600 ring-2 ring-blue-100' : 'border-transparent opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Informations et Actions */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="text-3xl md:text-4xl font-extrabold text-blue-600">
                    {vehicle.price ? vehicle.price.toLocaleString('fr-FR') : '0'} FCFA
                  </div>
                  {vehicle.oldPrice && (
                    <div className="text-xs text-slate-400 mt-1">
                      Prix neuf à partir de <span className="line-through">{vehicle.oldPrice.toLocaleString('fr-FR')} FCFA</span>
                    </div>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  <button className="p-2.5 hover:bg-slate-100 rounded-full border border-slate-200 transition-colors">
                    <ShareIcon />
                  </button>
                  <button
                    onClick={() => toggleFavorite(vehicle.id)}
                    className="p-2.5 hover:bg-slate-100 rounded-full border border-slate-200 transition-colors"
                  >
                    <HeartIcon filled={isFav} />
                  </button>
                </div>
              </div>

              {vehicle.tags && vehicle.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-4">
                  {vehicle.tags.map((tag, idx) => (
                    <span key={idx} className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-[11px] font-bold bg-slate-900 text-white tracking-wide">
                      {tag === 'BONNE AFFAIRE' ? '🔥' : '🏷️'} {tag}
                    </span>
                  ))}
                </div>
              )}

              <div className="mt-6 p-4 bg-slate-50 rounded-2xl border border-slate-100">
                <h1 className="text-xl font-bold text-slate-900 mb-3">
                  {vehicle.name} {vehicle.year}
                </h1>

                <div className="grid grid-cols-3 gap-2 text-xs font-semibold text-slate-600 pt-3 border-t border-slate-200">
                  <div className="flex items-center gap-1.5">
                    <TransmissionIcon />
                    <span>{vehicle.transmission}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <FuelIcon />
                    <span>{vehicle.fuel}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-slate-700">
                    <span>{vehicle.mileage}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between mt-4 px-2 text-xs font-semibold text-emerald-700">
                <div className="flex items-center gap-1.5">
                  <CheckBadgeIcon />
                  <span>Certifiée</span>
                </div>
                <span className="text-slate-300">•</span>
                <div className="flex items-center gap-1.5">
                  <CheckBadgeIcon />
                  <span>Inspectée</span>
                </div>
                <span className="text-slate-300">•</span>
                <div className="flex items-center gap-1.5">
                  <CheckBadgeIcon />
                  <span>Garantie {vehicle.warranty}</span>
                </div>
              </div>
            </div>

            <div className="mt-8 flex flex-col gap-3">
              <button 
                onClick={() => alert(`Demande d'intérêt envoyée pour la ${vehicle.name} !`)}
                className="w-full py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-md transition-colors text-center text-sm uppercase tracking-wider"
              >
                Je suis intéressé
              </button>
              <a
                href={`https://wa.me/?text=Bonjour,%20je%20suis%20intéressé%20par%20le%20véhicule%20${encodeURIComponent(vehicle.name || '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl shadow-md transition-colors flex items-center justify-center gap-2 text-sm uppercase tracking-wider"
              >
                <WhatsappIcon />
                WhatsApp
              </a>

              <div className="text-center text-xs text-slate-400 mt-2">
                👁️ Vues {vehicle.views || 10} fois aujourd'hui
              </div>
            </div>

          </div>

        </div>

        {/* Section de réassurance */}
        <div className="mt-8 bg-white p-6 rounded-2xl border border-slate-100 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div className="flex flex-col items-center">
            <span className="text-2xl mb-1">🛡️</span>
            <h4 className="text-xs font-bold text-slate-800">Garantie mécanique</h4>
            <p className="text-[11px] text-slate-500 mt-0.5">Incluse sur tous nos véhicules</p>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-2xl mb-1">🔍</span>
            <h4 className="text-xs font-bold text-slate-800">100+ points d'inspection</h4>
            <p className="text-[11px] text-slate-500 mt-0.5">Examinée par nos experts</p>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-2xl mb-1">🔄</span>
            <h4 className="text-xs font-bold text-slate-800">Satisfait ou remboursé</h4>
            <p className="text-[11px] text-slate-500 mt-0.5">Période d'essai incluse</p>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-2xl mb-1">🚚</span>
            <h4 className="text-xs font-bold text-slate-800">Livraison à domicile</h4>
            <p className="text-[11px] text-slate-500 mt-0.5">Partout dans le pays</p>
          </div>
        </div>

      </div>
    </section>
  );
}