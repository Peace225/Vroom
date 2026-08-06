// src/data/vehiclesData.js

// --- Liste des marques ---
export const carBrands = [
    { name: 'Kia', logo: 'https://upload.wikimedia.org/wikipedia/commons/4/47/KIA_logo2021.svg' },
    { name: 'Toyota', logo: 'https://upload.wikimedia.org/wikipedia/commons/9/9d/Toyota_carlogo.svg' },
    { name: 'Suzuki', logo: 'https://upload.wikimedia.org/wikipedia/commons/1/12/Suzuki_logo_2015.svg' },
    { name: 'Hyundai', logo: 'https://upload.wikimedia.org/wikipedia/commons/4/44/Hyundai_Motor_Company_logo.svg' },
    { name: 'Peugeot', logo: 'https://upload.wikimedia.org/wikipedia/commons/f/f7/Peugeot_Logo.svg' },
    { name: 'Mercedes-Benz', logo: 'https://upload.wikimedia.org/wikipedia/commons/9/90/Mercedes-Logo.svg' },
    { name: 'Nissan', logo: 'https://upload.wikimedia.org/wikipedia/commons/8/8c/Nissan_logo.svg' },
    { name: 'Mitsubishi', logo: 'https://upload.wikimedia.org/wikipedia/commons/5/5a/Mitsubishi_logo.svg' },
    { name: 'Honda', logo: 'https://upload.wikimedia.org/wikipedia/commons/7/7b/Honda_Logo.svg' },
    { name: 'Volkswagen', logo: 'https://upload.wikimedia.org/wikipedia/commons/a/a1/Volkswagen_Logo_till_1995.svg' }
  ];
  
  // --- Liste des véhicules ---
  // Note: J'ai converti les ID en chaînes de caractères (strings) car les paramètres d'URL sont des strings.
  export const mockVehicles = [
    {
      id: '1',
      name: 'Kia Pegas',
      year: 2024,
      price: 8500000,
      transmission: 'Manuelle',
      fuel: 'Essence',
      condition: 'Neuf',
      brandLogo: 'https://upload.wikimedia.org/wikipedia/commons/4/47/KIA_logo2021.svg',
      image: 'https://images.unsplash.com/photo-1590362891991-f776e747a588?auto=format&fit=crop&w=600&q=80',
      certified: true,
      inspected: true,
      warranty: '2 Ans',
      mileage: '0 km',
      tags: ['NOUVEAU', 'GARANTIE EXTENDED'],
      views: 45
    },
    {
      id: '2',
      name: 'Toyota Vitz',
      year: 2019,
      price: 4500000,
      transmission: 'Automatique',
      fuel: 'Essence',
      condition: 'Occasion',
      brandLogo: 'https://upload.wikimedia.org/wikipedia/commons/9/9d/Toyota_carlogo.svg',
      image: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=600&q=80',
      certified: true,
      inspected: true,
      warranty: '6 Mois',
      mileage: '45 000 km',
      tags: ['BONNE AFFAIRE'],
      views: 120
    },
    // ... Ajoutez les 8 autres véhicules ici en convertissant leurs ID en 'string'
  ];