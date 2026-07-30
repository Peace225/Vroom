import React, { useState, useRef } from "react";
import {
  MapPin, Search, ChevronDown, ChevronRight,
  ShieldCheck, Banknote, Key, Clock,
  Calendar, UserCheck, Car, Zap, Tag, Sparkles
} from "lucide-react";

import DetailVehicule from "../components/DetailVehicule";
import SectionPopulaires from "../components/SectionPopulaires";
import ListeOffreVehicules from "../components/ListeOffreVehicules";
import ExitPopup from "../components/ExitPopup";
import WhatsAppChat from "../components/WhatsAppChat";

export default function Accueil() {
  const [activeTab, setActiveTab] = useState("Louer");
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [searchResults, setSearchResults] = useState(null);
  const [selectedCar, setSelectedCar] = useState(null);
  const [selectedOffre, setSelectedOffre] = useState(null);
  const resultsRef = useRef(null);

  const [selections, setSelections] = useState({ Marques: "", Modèles: "", Localisation: "", Energie: "" });
  const [year, setYear] = useState(2022);
  const [budget, setBudget] = useState(50000000);
  const [rentalLocation, setRentalLocation] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [withDriver, setWithDriver] = useState("Sans chauffeur");

  const isRental = activeTab === "Louer";

  const dropdownData = {
    Marques: ["BMW", "Audi", "Mercedes", "Tesla", "Toyota", "Hyundai", "Peugeot"],
    Modèles: ["Série 3", "A4", "Classe C", "Model 3", "Land Cruiser", "Tucson"],
    Localisation: ["Abidjan", "Bassam", "Assinie", "Bouaké", "Yamoussoukro"],
    Energie: ["Essence", "Diesel", "Électrique", "Hybride"]
  };

  const filterIcons = {
    Marques: Tag,
    Modèles: Car,
    Localisation: MapPin,
    Energie: Zap
  };

  const handleSearch = () => {
    setTimeout(() => resultsRef.current?.scrollIntoView({ behavior: 'smooth' }), 100);
  };

  const CarCard = ({ car }) => (
    <div className="group bg-white rounded-none border border-slate-200 overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
      <div className="relative h-60 overflow-hidden">
        <img src={car.image || car.imageUrl} alt={car.modele || car.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
        <div className="absolute top-4 left-4 bg-white px-3 py-1.5 rounded-none text-[11px] font-semibold uppercase flex items-center gap-1">
          <MapPin size={12} className="text-slate-700" />
          {car.localisation || car.location}
        </div>
        <div className="absolute bottom-4 right-4 bg-slate-900 px-4 py-2 rounded-none text-white text-sm font-semibold">{car.prix || car.price}</div>
      </div>
      <div className="p-6">
        <h3 className="text-[18px] font-semibold text-slate-900">{car.marque || car.brand} <span className="font-light text-slate-500">{car.modele || car.model}</span></h3>
        <p className="text-xs text-slate-500 mt-1 uppercase flex items-center gap-1.5">
          <span>{car.annee || car.year}</span> • <span>{car.energie || car.fuel}</span>
        </p>
        <button onClick={() => { setSelectedCar(car); window.scrollTo({top:0, behavior:'smooth'}) }} className="mt-5 w-full bg-slate-50 hover:bg-slate-900 text-slate-900 hover:text-white border rounded-none py-3.5 text-[13px] font-medium uppercase flex items-center justify-center gap-2 transition-colors">
          Voir le véhicule <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );

  const InteractiveSlider = ({ label, value, onChange, min, max, format, icon: Icon }) => (
    <div className="bg-slate-50 rounded-none p-4 border border-slate-200/80">
      <div className="flex justify-between items-center mb-2.5">
        <span className="text-[11px] uppercase font-semibold text-slate-500 flex items-center gap-1.5">
          {Icon && <Icon size={14} className="text-slate-600" />}
          {label}
        </span>
        <span className="text-sm font-bold text-slate-900">{format(value)}</span>
      </div>
      <input type="range" min={min} max={max} value={value} onChange={e => onChange(Number(e.target.value))} className="w-full accent-slate-900 cursor-pointer" />
    </div>
  );

  if (selectedCar) return <DetailVehicule car={selectedCar} onBack={() => setSelectedCar(null)} />;
  if (selectedOffre) return <ListeOffreVehicules offre={selectedOffre} onBack={() => setSelectedOffre(null)} CarCard={CarCard} />;

  return (
    <div className="w-full bg-[#fafafa] font-sans">
      {/* HERO EN DEUX COLONNES SANS ARRONDI */}
      <div className="px-4 md:px-8 pt-8 pb-16 max-w-[1440px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* GAUCHE SUR DESKTOP : FORMULAIRE DE RECHERCHE À ANGLES DROITS */}
          <div className="lg:col-span-6 order-2 lg:order-1 flex items-center">
            <div className="w-full bg-white rounded-none shadow-[0_30px_80px_-30px_rgba(0,0,0,0.12)] border border-slate-200/80 p-8 md:p-10">
              
              <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
                <div>
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-none bg-slate-100 text-slate-700 text-xs font-semibold mb-2">
                    <Sparkles size={13} className="text-slate-900" />
                    Recherche simplifiée
                  </div>
                  <h2 className="text-[26px] md:text-[28px] font-semibold tracking-tight text-slate-900">Trouver mon véhicule</h2>
                  <p className="text-sm text-slate-500 mt-1">Location et vente, même plateforme</p>
                </div>

                <div className="flex bg-slate-100 p-1 rounded-none">
                  {[
                    { id: "Louer", label: "Louer", icon: Key },
                    { id: "Acheter", label: "Acheter", icon: Banknote }
                  ].map(tab => {
                    const TabIcon = tab.icon;
                    return (
                      <button
                        key={tab.id}
                        onClick={() => { setActiveTab(tab.id); setSearchResults(null); }}
                        className={`px-5 py-2.5 rounded-none text-[13px] font-medium transition-all flex items-center gap-2 ${
                          activeTab === tab.id
                            ? "bg-slate-900 text-white shadow-md"
                            : "text-slate-600 hover:text-slate-900"
                        }`}
                      >
                        <TabIcon size={15} />
                        {tab.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              {isRental ? (
                <div className="space-y-4">
                  <div className="relative">
                    <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                    <input
                      value={rentalLocation}
                      onChange={e => setRentalLocation(e.target.value)}
                      placeholder="Lieu de prise en charge"
                      className="w-full pl-11 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-none text-[14px] focus:outline-none focus:ring-2 focus:ring-slate-900/20 focus:border-slate-900 transition-all font-medium"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="relative">
                      <label className="block text-[11px] font-semibold uppercase text-slate-500 mb-1.5 ml-1 flex items-center gap-1">
                        <Calendar size={13} className="text-slate-400" /> Date de départ
                      </label>
                      <input
                        type="date"
                        value={startDate}
                        onChange={e => setStartDate(e.target.value)}
                        className="w-full px-4 py-3.5 bg-slate-50 border border-slate-200 rounded-none text-[14px] focus:outline-none focus:ring-2 focus:ring-slate-900/20 font-medium"
                      />
                    </div>
                    <div className="relative">
                      <label className="block text-[11px] font-semibold uppercase text-slate-500 mb-1.5 ml-1 flex items-center gap-1">
                        <Calendar size={13} className="text-slate-400" /> Date de retour
                      </label>
                      <input
                        type="date"
                        value={endDate}
                        onChange={e => setEndDate(e.target.value)}
                        className="w-full px-4 py-3.5 bg-slate-50 border border-slate-200 rounded-none text-[14px] focus:outline-none focus:ring-2 focus:ring-slate-900/20 font-medium"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
                    <div className="relative">
                      <UserCheck className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={18} />
                      <select
                        value={withDriver}
                        onChange={e => setWithDriver(e.target.value)}
                        className="w-full pl-11 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-none text-[14px] focus:outline-none focus:ring-2 focus:ring-slate-900/20 font-medium appearance-none cursor-pointer"
                      >
                        <option>Sans chauffeur</option>
                        <option>Avec chauffeur</option>
                      </select>
                      <ChevronDown size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                    </div>

                    <div className="relative">
                      <Car className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={18} />
                      <select className="w-full pl-11 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-none text-[14px] focus:outline-none focus:ring-2 focus:ring-slate-900/20 font-medium appearance-none cursor-pointer">
                        <option>Berline</option>
                        <option>SUV</option>
                        <option>4x4</option>
                        <option>Minibus</option>
                      </select>
                      <ChevronDown size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                    </div>
                  </div>

                  <button
                    onClick={handleSearch}
                    className="w-full mt-4 bg-slate-900 hover:bg-black text-white rounded-none py-4 font-semibold text-[14px] flex items-center justify-center gap-2.5 transition-all hover:shadow-xl"
                  >
                    <Search size={18} /> Rechercher un véhicule
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {Object.keys(dropdownData).map(filter => {
                      const FilterIcon = filterIcons[filter] || Car;
                      return (
                        <div key={filter} className="relative">
                          <button
                            onClick={() => setActiveDropdown(activeDropdown === filter ? null : filter)}
                            className="w-full pl-4 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-none text-[14px] flex justify-between items-center hover:border-slate-300 transition-all font-medium"
                          >
                            <span className="flex items-center gap-2.5 truncate text-slate-700">
                              <FilterIcon size={17} className="text-slate-400 shrink-0" />
                              {selections[filter] || filter}
                            </span>
                            <ChevronDown size={16} className="text-slate-400 shrink-0" />
                          </button>

                          {activeDropdown === filter && (
                            <div className="absolute top-full mt-1 w-full bg-white border border-slate-200 rounded-none shadow-2xl z-50 overflow-hidden max-h-56 overflow-y-auto">
                              {dropdownData[filter].map(item => (
                                <button
                                  key={item}
                                  onClick={() => { setSelections({ ...selections, [filter]: item }); setActiveDropdown(null); }}
                                  className="w-full text-left px-4 py-3 text-[14px] font-medium hover:bg-slate-900 hover:text-white transition-colors flex items-center gap-2"
                                >
                                  <ChevronRight size={14} className="opacity-50" />
                                  {item}
                                </button>
                              ))}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
                    <InteractiveSlider
                      label="Année min"
                      value={year}
                      onChange={setYear}
                      min={2018}
                      max={2025}
                      format={v => v}
                      icon={Calendar}
                    />
                    <InteractiveSlider
                      label="Budget max"
                      value={budget / 1000000}
                      onChange={v => setBudget(v * 1000000)}
                      min={5}
                      max={100}
                      format={v => `${v}M FCFA`}
                      icon={Banknote}
                    />
                  </div>

                  <button
                    onClick={handleSearch}
                    className="w-full mt-4 bg-slate-900 hover:bg-black text-white rounded-none py-4 font-semibold text-[14px] flex items-center justify-center gap-2.5 transition-all hover:shadow-xl"
                  >
                    <Search size={18} /> Voir les véhicules disponibles
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* DROITE SUR DESKTOP : VIDÉO À ANGLES DROITS */}
          <div className="lg:col-span-6 order-1 lg:order-2 relative rounded-2xl overflow-hidden min-h-[480px] lg:min-h-[640px] flex flex-col justify-end p-8 md:p-12 shadow-2xl border border-slate-200/60">
            <div className="absolute inset-0 z-0">
              <video
                autoPlay
                loop
                muted
                playsInline
                src="/videos/hero1.mp4"
                className="w-full h-full object-cover object-[center_30%]"
              >
                Votre navigateur ne prend pas en charge la lecture de vidéos.
              </video>
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20" />
            </div>
            
            <div className="relative z-10 text-left">
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-none bg-white/20 backdrop-blur-md text-white text-xs font-semibold uppercase tracking-wider mb-4 border border-white/30">
                <ShieldCheck size={14} />
                Spécialiste Auto Côte d'Ivoire
              </span>
              <h1 className="text-[clamp(32px,4vw,56px)] font-bold text-white leading-tight">
                Louez ou achetez
                <span className="block font-light italic text-white/90 mt-1">votre véhicule premium</span>
              </h1>
              <p className="mt-4 text-base md:text-lg text-white/80 max-w-xl font-medium">
                Vroom CI vous accompagne pour trouver la voiture idéale, en location courte et longue durée ou à l'achat, sur la même plateforme.
              </p>
            </div>
          </div>

        </div>
      </div>

      {/* SECTION CATALOGUE ET POPULAIRES */}
      <div ref={resultsRef} className="px-6 py-20 bg-[#fafafa]">
        <div className="max-w-7xl mx-auto">
          {searchResults ? (
            <>
              <div className="flex justify-between items-end mb-10">
                <h2 className="text-[32px] font-semibold tracking-tight text-slate-900">{searchResults.length} véhicules trouvés</h2>
                <button onClick={() => setSearchResults(null)} className="text-[13px] text-slate-500 hover:text-slate-900 underline underline-offset-4">Réinitialiser</button>
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {searchResults.map(car => <CarCard key={car.id} car={car} />)}
              </div>
            </>
          ) : (
            <SectionPopulaires />
          )}
        </div>
      </div>

      <ExitPopup />
      <WhatsAppChat />
    </div>
  );
}