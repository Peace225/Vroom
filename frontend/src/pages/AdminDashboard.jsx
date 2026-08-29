import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Truck, Car, MessageSquare, Zap, Activity, ExternalLink, Flame, Trophy 
} from 'lucide-react';

// FIREBASE
import { db } from '../firebaseConfig';
import { collection, query, orderBy, onSnapshot, limit } from 'firebase/firestore';

// SUPABASE
import { supabase } from '../supabaseClient';

// COMPONENTS
import Sidebar from '../components/Sidebar'; 
import VehicleForm from '../components/VehicleForm';
import EnginForm from '../components/EnginForm';
import SettingsForm from '../components/SettingsForm';

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('dashboard'); 
  const [isLoading, setIsLoading] = useState(true);
  const [copied, setCopied] = useState(false);
  
  // DONNÉES
  const [cars, setCars] = useState([]);
  const [heavyVehicles, setHeavyVehicles] = useState([]);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    // Sync Voitures
    const unsubCars = onSnapshot(query(collection(db, "cars"), orderBy("createdAt", "desc")), (snap) => {
      setCars(snap.docs.map(d => ({ id: d.id, ...d.data() })));
      setIsLoading(false);
    });

    // Sync Engins
    const unsubEngins = onSnapshot(query(collection(db, "heavy_vehicles"), orderBy("createdAt", "desc")), (snap) => {
      setHeavyVehicles(snap.docs.map(d => ({ id: d.id, ...d.data() })));
    });

    // Sync Traction (Derniers clics WhatsApp)
    const unsubMsgs = onSnapshot(query(collection(db, "messages"), orderBy("timestamp", "desc"), limit(6)), (snap) => {
      setMessages(snap.docs.map(d => ({ id: d.id, ...d.data() })));
    });

    return () => { 
      unsubCars(); 
      unsubEngins(); 
      unsubMsgs(); 
    };
  }, []);

  // Déconnexion via Supabase sécurisée
  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      navigate("/login");
    } catch (error) {
      console.error("Erreur lors de la déconnexion :", error);
    }
  };

  return (
    <div className="flex h-screen bg-[#09090b] text-zinc-100 overflow-hidden font-sans">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} onLogout={handleLogout} />

      <main className="flex-1 overflow-y-auto bg-[#09090b]">
        
        {/* HEADER */}
        <header className="px-8 py-6 flex justify-between items-center border-b border-zinc-800/60 sticky top-0 bg-[#09090b]/80 backdrop-blur-md z-50">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#fb201e]"></span>
              </span>
              <span className="text-xs font-medium tracking-wider text-zinc-400 uppercase">Système Live</span>
            </div>
            <h1 className="text-3xl font-bold tracking-tight">
              Vroom<span className="text-[#fb201e]">CI</span> <span className="text-zinc-500 font-normal">HQ</span>
            </h1>
          </div>
          
          <button 
            onClick={() => {
              navigator.clipboard.writeText(window.location.origin + "/catalogue");
              setCopied(true); 
              setTimeout(() => setCopied(false), 2000);
            }} 
            className="flex items-center gap-2 bg-zinc-100 hover:bg-white text-zinc-900 px-5 py-2.5 rounded-xl text-xs font-semibold tracking-wide transition-all shadow-sm"
          >
            <span>{copied ? "Lien Copié !" : "Partager Catalogue"}</span>
            <ExternalLink size={14} className="text-zinc-600" />
          </button>
        </header>

        <div className="p-8">
          {activeTab === 'dashboard' && (
            <div className="space-y-8 animate-in fade-in duration-500">
              
              {/* SECTION 1: PERFORMANCE RÉELLE */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                <HeroStat 
                   label="Parc Automobile" 
                   value={cars.length} 
                   sub="Véhicules Actifs" 
                   icon={<Car size={24}/>} 
                />
                <HeroStat 
                   label="Logistique" 
                   value={heavyVehicles.length} 
                   sub="Engins Lourds" 
                   icon={<Truck size={24}/>} 
                />
                <HeroStat 
                   label="Traction 24h" 
                   value={messages.length} 
                   sub="Intérêts WhatsApp" 
                   icon={<Flame size={24} className="text-orange-500"/>} 
                />
              </div>

              {/* SECTION 2: TRACTION & ANALYTICS */}
              <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                
                {/* FLUX DE TRACTION */}
                <div className="bg-zinc-900/50 border border-zinc-800/80 rounded-2xl p-6">
                   <div className="flex items-center justify-between mb-6">
                      <h3 className="text-sm font-semibold tracking-wide flex items-center gap-2 text-zinc-200">
                        <Activity size={16} className="text-[#fb201e]"/> Traction Récente
                      </h3>
                      <span className="text-xs text-zinc-500">Dernières 48h</span>
                   </div>

                   <div className="space-y-3">
                      {messages.length === 0 ? (
                        <p className="text-xs text-zinc-500 py-4 text-center">Aucun message récent</p>
                      ) : (
                        messages.map((msg) => (
                          <div key={msg.id} className="flex items-center justify-between p-4 bg-zinc-900/80 border border-zinc-800/50 rounded-xl hover:border-zinc-700 transition-all">
                             <div className="flex items-center gap-4">
                                <div className="h-10 w-10 rounded-lg bg-zinc-800 flex items-center justify-center text-zinc-400">
                                   <MessageSquare size={18}/>
                                </div>
                                <div>
                                   <p className="text-sm font-medium text-zinc-100">{msg.carName}</p>
                                   <p className="text-xs text-zinc-400">{msg.carPrice} — {msg.source}</p>
                                </div>
                             </div>
                             <div className="text-right">
                                <p className="text-xs font-semibold text-[#fb201e]">{msg.phone || "ANONYME"}</p>
                                <p className="text-[10px] text-zinc-500 mt-0.5">WhatsApp</p>
                             </div>
                          </div>
                        ))
                      )}
                   </div>
                </div>

                {/* RÉPARTITION DES OFFRES */}
                <div className="bg-zinc-900/50 border border-zinc-800/80 rounded-2xl p-6 flex flex-col justify-between">
                   <div>
                      <h3 className="text-sm font-semibold tracking-wide mb-6 flex items-center gap-2 text-zinc-200">
                        <Trophy size={16} className="text-amber-400"/> Statut de la Flotte
                      </h3>
                      <div className="space-y-6">
                         <ProgressLine label="Véhicules VIP/GOLD" count={cars.filter(c => c.offer === 'VIP' || c.offer === 'Gold').length} total={cars.length} color="bg-amber-400" />
                         <ProgressLine label="Stock Disponible" count={cars.filter(c => c.availability === 'Disponible').length} total={cars.length} color="bg-[#fb201e]" />
                         <ProgressLine label="En Arrivage" count={cars.filter(c => c.availability === 'En arrivage').length} total={cars.length} color="bg-zinc-400" />
                      </div>
                   </div>

                   <div className="mt-8 p-4 bg-zinc-900 border border-zinc-800 rounded-xl flex items-center gap-3">
                      <Zap className="text-[#fb201e] shrink-0" size={20} />
                      <div>
                         <p className="text-xs font-semibold text-zinc-200">Optimisation</p>
                         <p className="text-xs text-zinc-400">
                            Le modèle <span className="text-zinc-200 font-medium">Toyota Land Cruiser</span> génère 40% de votre traction actuelle.
                         </p>
                      </div>
                   </div>
                </div>

              </div>
            </div>
          )}

          {/* AUTRES VUES */}
          {activeTab === 'inventory' && <VehicleForm cars={cars} />}
          {activeTab === 'engins' && <EnginForm heavyVehicles={heavyVehicles} />}
          {activeTab === 'settings' && <SettingsForm />}
        </div>
      </main>
    </div>
  );
}

// --- SOUS-COMPOSANTS ---

function HeroStat({ label, value, sub, icon }) {
  return (
    <div className="bg-zinc-900/50 border border-zinc-800/80 p-6 rounded-2xl flex items-center justify-between">
      <div>
        <p className="text-xs font-medium text-zinc-400 mb-1">{label}</p>
        <span className="text-4xl font-bold tracking-tight text-zinc-100">{value}</span>
        <p className="text-xs font-medium text-[#fb201e] mt-2">{sub}</p>
      </div>
      <div className="h-12 w-12 rounded-xl bg-zinc-800/50 border border-zinc-700/40 flex items-center justify-center text-zinc-300">
        {icon}
      </div>
    </div>
  );
}

function ProgressLine({ label, count, total, color }) {
  const width = total > 0 ? (count / total) * 100 : 0;
  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center text-xs">
        <span className="text-zinc-400 font-medium">{label}</span>
        <span className="text-zinc-200 font-semibold">{count}</span>
      </div>
      <div className="h-1.5 w-full bg-zinc-800 rounded-full overflow-hidden">
        <div className={`h-full ${color} rounded-full transition-all duration-700`} style={{ width: `${width}%` }}></div>
      </div>
    </div>
  );
}