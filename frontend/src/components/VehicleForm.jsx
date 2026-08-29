import React, { useState } from 'react';
import { Zap, ImageIcon, Trash2, Loader2, Key } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

// SUPABASE (Remplace Firebase pour les requêtes)
import { supabase } from '../supabaseClient';

const Toast = Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  background: '#18181b',
  color: '#f4f4f5',
  iconColor: '#fb201e',
});

export default function VehicleForm({ cars }) {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [imagePreviews, setImagePreviews] = useState({ front: null, back: null, interior: null });
  const [formData, setFormData] = useState({
    brand: '', 
    model: '', 
    price: '', 
    location: '',
    category: 'Disponible',
    offer: 'Gold',
    // Nouveaux champs spécifiques à la location
    year: new Date().getFullYear(),
    transmission: 'Automatique',
    fuel: 'Essence',
    hasDriver: false,
    caution: '',
    images: { front: null, back: null, interior: null }
  });

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      navigate('/login');
    } catch (error) {
      Toast.fire({ icon: 'error', title: 'Erreur lors de la déconnexion' });
    }
  };

  const uploadToCloudinary = async (file, folder) => {
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "autolife_preset");
    data.append("cloud_name", "dpje4d7xa");
    data.append("folder", folder);
    const res = await fetch(`https://api.cloudinary.com/v1_1/dpje4d7xa/image/upload`, { method: "POST", body: data });
    const resData = await res.json();
    return resData.secure_url;
  };

  const handleSubmitCar = async (e) => {
    e.preventDefault();
    if (!formData.images.front) return Toast.fire({ icon: 'error', title: 'Photo principale requise !' });
    
    setIsSubmitting(true);
    try {
      const [front, back, interior] = await Promise.all([
        uploadToCloudinary(formData.images.front, "autolife_cars"),
        formData.images.back ? uploadToCloudinary(formData.images.back, "autolife_cars") : null,
        formData.images.interior ? uploadToCloudinary(formData.images.interior, "autolife_cars") : null
      ]);

      let availabilityStatus = 'Sur Commande';
      if (formData.category === 'Disponible') availabilityStatus = 'Disponible';
      if (formData.category === 'Location') availabilityStatus = 'Location';

      // INSERTION DANS SUPABASE
      const { error } = await supabase
        .from('cars')
        .insert([
          {
            brand: formData.brand,
            model: formData.model,
            price: formData.price,
            location: formData.location || "Abidjan",
            category: formData.category,
            offer: formData.category === 'Offre' ? formData.offer : null,
            availability: availabilityStatus,
            // Ajout des données de location si la catégorie est "Location"
            year: formData.category === 'Location' ? formData.year : null,
            transmission: formData.category === 'Location' ? formData.transmission : null,
            fuel: formData.category === 'Location' ? formData.fuel : null,
            has_driver: formData.category === 'Location' ? formData.hasDriver : null,
            // CORRECTION ICI : on s'assure d'envoyer un nombre ou null, pas une chaîne vide
            caution: formData.category === 'Location' ? (formData.caution ? Number(formData.caution) : null) : null,
            images: { front, back, interior }
          }
        ]);

      if (error) throw error;

      Toast.fire({ icon: 'success', title: 'Véhicule ajouté !' });
      
      setFormData({ 
        brand: '', model: '', price: '', location: '', category: 'Disponible', offer: 'Gold', 
        year: new Date().getFullYear(), transmission: 'Automatique', fuel: 'Essence', hasDriver: false, caution: '',
        images: { front: null, back: null, interior: null } 
      });
      setImagePreviews({ front: null, back: null, interior: null });
    } catch (err) {
      console.error(err);
      Toast.fire({ icon: 'error', title: 'Erreur lors de l\'enregistrement' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 animate-in fade-in duration-500">
      
      <form onSubmit={handleSubmitCar} className="bg-zinc-900/50 p-6 rounded-2xl border border-zinc-800/80 space-y-6 h-fit">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold flex items-center gap-2 text-zinc-100">
            <Zap className="text-[#fb201e]" size={20}/> Ajouter un Véhicule
          </h3>
          <button type="button" onClick={handleLogout} className="text-xs text-zinc-500 hover:text-red-400 transition-colors">
            Déconnexion
          </button>
        </div>
        
        <div className="flex bg-zinc-950 p-1.5 rounded-xl border border-zinc-800/60">
          <button type="button" onClick={() => setFormData({...formData, category: 'Disponible'})} 
            className={`flex-1 py-2.5 rounded-lg text-xs font-semibold transition-all ${formData.category === 'Disponible' ? 'bg-zinc-800 text-zinc-100 shadow' : 'text-zinc-500 hover:text-zinc-300'}`}>
            En Stock
          </button>
          <button type="button" onClick={() => setFormData({...formData, category: 'Offre'})} 
            className={`flex-1 py-2.5 rounded-lg text-xs font-semibold transition-all ${formData.category === 'Offre' ? 'bg-zinc-800 text-zinc-100 shadow' : 'text-zinc-500 hover:text-zinc-300'}`}>
            Sur Commande
          </button>
          <button type="button" onClick={() => setFormData({...formData, category: 'Location'})} 
            className={`flex-1 py-2.5 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-all ${formData.category === 'Location' ? 'bg-[#fb201e] text-white shadow' : 'text-zinc-500 hover:text-zinc-300'}`}>
            <Key size={14}/> Location
          </button>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <input type="text" required placeholder="Marque (ex: Toyota)" value={formData.brand} onChange={e => setFormData({...formData, brand: e.target.value})} 
            className="bg-zinc-950 border border-zinc-800/60 p-3.5 rounded-xl text-sm text-zinc-100 outline-none focus:border-[#fb201e] transition-colors" />
          <input type="text" required placeholder="Modèle (ex: Prado)" value={formData.model} onChange={e => setFormData({...formData, model: e.target.value})} 
            className="bg-zinc-950 border border-zinc-800/60 p-3.5 rounded-xl text-sm text-zinc-100 outline-none focus:border-[#fb201e] transition-colors" />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <input type="text" placeholder={formData.category === 'Location' ? "Prix / jour (ex: 50000)" : "Prix (ex: 6.5M)"} value={formData.price} onChange={e => setFormData({...formData, price: e.target.value})} 
            className="bg-zinc-950 border border-zinc-800/60 p-3.5 rounded-xl text-sm text-zinc-100 outline-none focus:border-[#fb201e] transition-colors" />
          
          <select disabled={formData.category !== 'Offre'} value={formData.offer} onChange={e => setFormData({...formData, offer: e.target.value})} 
            className={`bg-zinc-950 border border-zinc-800/60 p-3.5 rounded-xl text-sm font-semibold outline-none transition-colors ${formData.category !== 'Offre' ? 'opacity-30 cursor-not-allowed text-zinc-500' : 'text-[#fb201e] focus:border-[#fb201e]'}`}>
            <option value="Gold">🌟 Gold (5-6.5M)</option>
            <option value="Premium">🏆 Premium (7-10M)</option>
            <option value="VIP">👑 VIP (11M+)</option>
          </select>
        </div>

        {/* CHAMPS SPÉCIFIQUES À LA LOCATION */}
        {formData.category === 'Location' && (
          <div className="grid grid-cols-2 gap-4 p-4 bg-zinc-950/50 border border-blue-900/30 rounded-xl">
            <select value={formData.transmission} onChange={e => setFormData({...formData, transmission: e.target.value})} 
              className="bg-zinc-900 border border-zinc-800/60 p-3.5 rounded-xl text-sm text-zinc-100 outline-none focus:border-blue-500 transition-colors">
              <option value="Automatique">Automatique</option>
              <option value="Manuelle">Manuelle</option>
            </select>
            
            <select value={formData.fuel} onChange={e => setFormData({...formData, fuel: e.target.value})} 
              className="bg-zinc-900 border border-zinc-800/60 p-3.5 rounded-xl text-sm text-zinc-100 outline-none focus:border-blue-500 transition-colors">
              <option value="Essence">Essence</option>
              <option value="Diesel">Diesel</option>
              <option value="Électrique">Électrique</option>
            </select>

            <select value={formData.hasDriver} onChange={e => setFormData({...formData, hasDriver: e.target.value === 'true'})} 
              className="bg-zinc-900 border border-zinc-800/60 p-3.5 rounded-xl text-sm text-zinc-100 outline-none focus:border-blue-500 transition-colors">
              <option value="false">Sans chauffeur</option>
              <option value="true">Avec chauffeur</option>
            </select>

            <input type="number" placeholder="Caution (ex: 40000)" value={formData.caution} onChange={e => setFormData({...formData, caution: e.target.value})} 
              className="bg-zinc-900 border border-zinc-800/60 p-3.5 rounded-xl text-sm text-zinc-100 outline-none focus:border-blue-500 transition-colors" />
          </div>
        )}

        <div className="grid grid-cols-3 gap-3">
          {['front', 'back', 'interior'].map(type => (
            <div key={type} className="relative h-28 bg-zinc-950 border-2 border-dashed border-zinc-800/80 rounded-xl flex flex-col items-center justify-center overflow-hidden group hover:border-zinc-700 transition-colors">
              {imagePreviews[type] ? (
                <img src={imagePreviews[type]} alt={`Vue ${type}`} className="absolute inset-0 w-full h-full object-cover" />
              ) : (
                <div className="text-center">
                  <ImageIcon className="text-zinc-600 mx-auto mb-1" size={20}/>
                  <span className="text-[9px] text-zinc-500 uppercase font-medium">{type}</span>
                </div>
              )}
              <input type="file" accept="image/*" onChange={(e) => {
                const file = e.target.files[0];
                if(file) {
                  setFormData(prev => ({...prev, images: {...prev.images, [type]: file}}));
                  setImagePreviews(prev => ({...prev, [type]: URL.createObjectURL(file)}));
                }
              }} className="absolute inset-0 opacity-0 cursor-pointer" />
            </div>
          ))}
        </div>

        <button disabled={isSubmitting} className="w-full bg-[#fb201e] hover:bg-red-600 transition-colors text-white py-4 rounded-xl font-bold uppercase text-xs disabled:opacity-50 flex justify-center items-center gap-2">
          {isSubmitting ? <><Loader2 className="animate-spin" size={16}/> Traitement...</> : "Enregistrer sur Supabase"}
        </button>
      </form>

      <div className="bg-zinc-900/50 p-6 rounded-2xl border border-zinc-800/80 h-[600px] flex flex-col">
        <h3 className="text-lg font-semibold text-zinc-100 mb-6 flex justify-between items-center">
          Inventaire Actuel
          <span className="text-xs font-medium bg-zinc-800 text-zinc-300 px-3 py-1 rounded-full">{cars.length} Véhicules</span>
        </h3>
        
        <div className="space-y-3 overflow-y-auto custom-scrollbar pr-2 flex-1">
          {cars.length === 0 ? (
            <p className="text-sm text-zinc-500 text-center mt-10">Aucun véhicule enregistré.</p>
          ) : (
            cars.map(car => (
              <div key={car.id} className="bg-zinc-950 p-3.5 rounded-xl border border-zinc-800/50 flex items-center gap-4 hover:border-zinc-700 transition-colors">
                <img src={car.images?.front} alt={car.model} className="w-16 h-12 object-cover rounded-lg bg-zinc-900" />
                <div className="flex-grow">
                  <p className="font-semibold text-sm text-zinc-100">{car.brand} {car.model}</p>
                  
                  <div className="mt-1 flex items-center gap-2">
                    <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-md ${
                      car.category === 'Disponible' ? 'bg-emerald-500/10 text-emerald-400' : 
                      car.category === 'Location' ? 'bg-blue-500/10 text-blue-400' : 
                      'bg-amber-500/10 text-amber-400'
                    }`}>
                      {car.category}
                    </span>
                    {car.category === 'Location' && car.has_driver !== undefined && (
                      <span className="text-[10px] font-medium px-2 py-0.5 rounded-md bg-zinc-800 text-zinc-400">
                        {car.has_driver ? 'Avec chauffeur' : 'Sans chauffeur'}
                      </span>
                    )}
                    <span className="text-[10px] text-zinc-500">{car.price} {car.category === 'Location' ? 'FCFA/j' : ''}</span>
                  </div>
                </div>
                
                <button onClick={async () => {
                  const res = await Swal.fire({ title: 'Supprimer ce véhicule ?', text: "Action irréversible !", icon: 'warning', showCancelButton: true, confirmButtonText: 'Supprimer', cancelButtonText: 'Annuler', confirmButtonColor: '#fb201e', background: '#18181b', color: '#f4f4f5' });
                  if(res.isConfirmed) {
                    const { error } = await supabase.from('cars').delete().eq('id', car.id);
                    if (error) {
                      Toast.fire({ icon: 'error', title: 'Erreur de suppression' });
                    } else {
                      Toast.fire({ icon: 'success', title: 'Véhicule supprimé' });
                    }
                  }
                }} className="p-2 text-zinc-500 hover:text-red-500 hover:bg-red-500/10 rounded-lg transition-all">
                  <Trash2 size={18}/>
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}