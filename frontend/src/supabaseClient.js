import { createClient } from '@supabase/supabase-js';

// 1. Client pour la Location
const rentalUrl = import.meta.env.VITE_SUPABASE_RENTAL_URL;
const rentalKey = import.meta.env.VITE_SUPABASE_RENTAL_ANON_KEY;

if (!rentalUrl || !rentalKey) {
  console.error("Erreur : VITE_SUPABASE_RENTAL_URL ou VITE_SUPABASE_RENTAL_ANON_KEY est manquant !");
}

export const supabaseRental = createClient(rentalUrl || '', rentalKey || '');

// 2. Client pour la Vente
const salesUrl = import.meta.env.VITE_SUPABASE_SALES_URL;
const salesKey = import.meta.env.VITE_SUPABASE_SALES_ANON_KEY;

if (!salesUrl || !salesKey) {
  console.error("Erreur : VITE_SUPABASE_SALES_URL or VITE_SUPABASE_SALES_ANON_KEY est manquant !");
}

export const supabaseSales = createClient(salesUrl || '', salesKey || '');