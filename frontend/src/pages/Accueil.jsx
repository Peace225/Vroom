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
import VehicleCategorySearch from "../components/VehicleCategorySearch";
import VehicleListingSection from "../components/VehicleListingSection";

import Catalog from "../components/Catalog";

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
    <div className="group bg-white rounded-none border border-slate-200 overflow-hidden hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-300 ease-out">
      <div className="relative h-60 overflow-hidden">
        <img
          src={car.image || car.imageUrl}
          alt={car.modele || car.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-300" />
        <div className="absolute top-4 left-4 bg-white px-3 py-1.5 rounded-none text-[11px] font-semibold uppercase flex items-center gap-1 shadow-sm">
          <MapPin size={12} className="text-slate-700" />
          {car.localisation || car.location}
        </div>
        <div className="absolute bottom-4 right-4 bg-orange-500 px-4 py-2 rounded-none text-white text-sm font-semibold shadow-lg">
          {car.prix || car.price}
        </div>
      </div>
      <div className="p-6">
        <h3 className="text-[18px] font-semibold text-slate-900">
          {car.marque || car.brand} <span className="font-light text-slate-500">{car.modele || car.model}</span>
        </h3>
        <p className="text-xs text-slate-500 mt-1 uppercase flex items-center gap-1.5">
          <span>{car.annee || car.year}</span> • <span>{car.energie || car.fuel}</span>
        </p>
        <button
          onClick={() => { setSelectedCar(car); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
          className="mt-5 w-full bg-slate-50 hover:bg-orange-500 text-slate-900 hover:text-white border border-slate-200 hover:border-orange-500 rounded-none py-3.5 text-[13px] font-medium uppercase flex items-center justify-center gap-2 transition-all duration-300 active:scale-[0.98]"
        >
          Voir le véhicule <ChevronRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
        </button>
      </div>
    </div>
  );

  const InteractiveSlider = ({ label, value, onChange, min, max, format, icon: Icon }) => (
    <div className="bg-slate-50 rounded-none p-4 border border-slate-200/80 transition-colors hover:border-slate-300">
      <div className="flex justify-between items-center mb-2.5">
        <span className="text-[11px] uppercase font-semibold text-slate-500 flex items-center gap-1.5">
          {Icon && <Icon size={14} className="text-slate-600" />}
          {label}
        </span>
        <span className="text-sm font-bold text-slate-900">{format(value)}</span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={e => onChange(Number(e.target.value))}
        className="w-full accent-slate-900 cursor-pointer"
      />
    </div>
  );

  if (selectedCar) return <DetailVehicule car={selectedCar} onBack={() => setSelectedCar(null)} />;
  if (selectedOffre) return <ListeOffreVehicules offre={selectedOffre} onBack={() => setSelectedOffre(null)} CarCard={CarCard} />;

  return (
    <div className="w-full bg-[#fafafa] font-sans">
 {/* HERO EN DEUX COLONNES SANS ARRONDI */}
{/* CORRECTION : Suppression de overflow-hidden ici pour permettre l'affichage des ombres */}
<section 
  className="w-full  border-b border-slate-200/60 bg-cover bg-center bg-no-repeat relative group/hero"
  style={{ backgroundImage: `url('https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=2000&q=85')` }}
>
  {/* Calque de profondeur et effet de zoom dynamique sur l'arrière-plan */}
  <div className="absolute inset-0 backdrop-blur-[2px] transition-transform duration-1000 ease-out group-hover/hero:scale-105" style={{ backgroundImage: `url('https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=1920&q=80')`, backgroundSize: 'cover', backgroundPosition: 'center', mixBlendMode: 'overlay' }} />

  <div className="relative z-10 px-4 md:px-8 pt-8 pb-16 max-w-[1440px] mx-auto bg-gradient-to-b  ">
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">

      {/* GAUCHE SUR DESKTOP : FORMULAIRE DE RECHERCHE À ANGLES DROITS */}
      {/* ANIMATION D'ENTRÉE : animate-fade-in-up avec délai de 150ms */}
      <div className="lg:col-span-6 order-2 lg:order-1 flex items-center animate-fade-in-up opacity-0 [animation-delay:150ms] [animation-fill-mode:forwards]">
        {/* OMBRE PORTÉE EXISTANTE CONSERVÉE ICI (shadow-[...]) */}
        <div className="w-full bg-white/95 backdrop-blur-xl rounded-none shadow-[0_30px_80px_-30px_rgba(0,0,0,0.4)] border border-white/20 p-8 md:p-10 transition-all duration-300 ease-out hover:shadow-[0_35px_90px_-25px_rgba(0,0,0,0.5)] hover:-translate-y-1">

          <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-none bg-slate-100 text-slate-700 text-xs font-semibold mb-2">
                <Sparkles size={13} className="text-orange-500 animate-pulse" />
                Recherche simplifiée
              </div>
              <h2 className="text-2xl md:text-3xl font-black font-['Montserrat',sans-serif] text-orange-500 tracking-tight">Trouver mon véhicule</h2>
              <p className="text-sm text-slate-500 mt-1 font-['Montserrat',sans-serif] font-normal">Location et vente, même plateforme</p>
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
                    className={`px-5 py-2.5 rounded-none text-[13px] font-medium transition-all duration-200 flex items-center gap-2 ${activeTab === tab.id
                        ? "bg-orange-500 text-white shadow-md scale-[1.02]"
                        : "text-slate-600 hover:text-orange-500"
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
                  className="w-full pl-11 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-none text-[14px] focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-slate-900 focus:bg-white transition-all duration-200 font-medium"
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
                    className="w-full px-4 py-3.5 bg-slate-50 border border-slate-200 rounded-none text-[14px] focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:bg-white transition-all duration-200 font-medium"
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
                    className="w-full px-4 py-3.5 bg-slate-50 border border-slate-200 rounded-none text-[14px] focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:bg-white transition-all duration-200 font-medium"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
                <div className="relative">
                  <UserCheck className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={18} />
                  <select
                    value={withDriver}
                    onChange={e => setWithDriver(e.target.value)}
                    className="w-full pl-11 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-none text-[14px] focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:bg-white transition-all duration-200 font-medium appearance-none cursor-pointer"
                  >
                    <option>Sans chauffeur</option>
                    <option>Avec chauffeur</option>
                  </select>
                  <ChevronDown size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                </div>

                <div className="relative">
                  <Car className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={18} />
                  <select className="w-full pl-11 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-none text-[14px] focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:bg-white transition-all duration-200 font-medium appearance-none cursor-pointer">
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
                className="w-full mt-4 bg-slate-900 hover:bg-black text-white rounded-none py-4 font-semibold text-[14px] flex items-center justify-center gap-2.5 transition-all duration-300 hover:shadow-xl hover:scale-[1.01] active:scale-[0.98]"
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
                        className="w-full pl-4 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-none text-[14px] flex justify-between items-center hover:border-slate-300 hover:bg-slate-100/60 transition-all duration-200 font-medium"
                      >
                        <span className="flex items-center gap-2.5 truncate text-slate-700">
                          <FilterIcon size={17} className="text-slate-400 shrink-0" />
                          {selections[filter] || filter}
                        </span>
                        <ChevronDown
                          size={16}
                          className={`text-slate-400 shrink-0 transition-transform duration-200 ${activeDropdown === filter ? "rotate-180" : ""
                            }`}
                        />
                      </button>

                      {activeDropdown === filter && (
                        <div className="absolute top-full mt-1 w-full bg-white border border-slate-200 rounded-none shadow-2xl z-50 overflow-hidden max-h-56 overflow-y-auto animate-in fade-in slide-in-from-top-2 duration-200">
                          {dropdownData[filter].map(item => (
                            <button
                              key={item}
                              onClick={() => { setSelections({ ...selections, [filter]: item }); setActiveDropdown(null); }}
                              className="w-full text-left px-4 py-3 text-[14px] font-medium hover:bg-orange-500 hover:text-white transition-colors duration-150 flex items-center gap-2 group/btn"
                            >
                              <ChevronRight size={14} className="opacity-50 transition-transform duration-150 group-hover/btn:translate-x-1" />
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
                className="w-full mt-4 bg-orange-500 hover:bg-orange-600 text-white rounded-none py-4 font-semibold text-[14px] flex items-center justify-center gap-2.5 transition-all duration-300 hover:shadow-xl hover:scale-[1.01] active:scale-[0.98]"
              >
                <Search size={18} /> Voir les véhicules disponibles
              </button>
            </div>
          )}
        </div>
      </div>

      {/* DROITE SUR DESKTOP : VIDÉO À ANGLES DROITS */}
      <div className="lg:col-span-6 order-1 lg:order-2 relative rounded-none overflow-hidden min-h-[480px] lg:min-h-[640px] flex flex-col justify-end p-8 md:p-12 shadow-[0_30px_80px_-30px_rgba(0,0,0,0.5)] border border-white/10 animate-fade-in-up opacity-0 [animation-delay:300ms] [animation-fill-mode:forwards] transition-all duration-300 ease-out hover:-translate-y-1 group">
        <div className="absolute inset-0 z-0 transition-transform duration-700 ease-out group-hover:scale-105">
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
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
        </div>

        <div className="relative z-10 text-left transition-transform duration-500 ease-out group-hover:-translate-y-1.5">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-none bg-white/10 backdrop-blur-md text-white text-xs font-semibold uppercase tracking-wider mb-4 border border-white/20 shadow-lg">
            <ShieldCheck size={14} className="text-orange-400" />
            Spécialiste Auto Côte d'Ivoire
          </span>
          <h1 className="text-[clamp(32px,4vw,56px)] font-bold text-white leading-tight drop-shadow-md">
            Louez ou achetez
            <span className="block font-light italic text-orange-400 mt-1">votre véhicule premium</span>
          </h1>
          <p className="mt-4 text-base md:text-lg text-slate-200 max-w-xl font-medium drop-shadow">
            Vroom CI vous accompagne pour trouver la voiture idéale, en location courte et longue durée ou à l'achat, sur la même plateforme.
          </p>
        </div>
      </div>

    </div>
  </div>
</section>
<VehicleCategorySearch />
<VehicleListingSection searchResults={searchResults} setSelectedCar={setSelectedCar} setSelectedOffre={setSelectedOffre} />
<Catalog />

     

      <ExitPopup />
      <WhatsAppChat />
    </div>
  );
}