import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { supabase } from "../supabaseClient";

export default function ProtectedRoute({ children }) {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 1. Vérifier la session initiale au chargement
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
    });

    // 2. Écouter les changements d'état (très important pour synchroniser le loading)
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, currentSession) => {
      setSession(currentSession);
      setLoading(false); // CORRECTIF : On s'assure d'arrêter le chargement ici aussi
    });

    return () => subscription.unsubscribe();
  }, []);

  // Bloque toute redirection tant que Supabase n'a pas répondu
  if (loading) {
    return (
      <div className="min-h-screen bg-black flex justify-center items-center text-[#fb201e] font-bold">
        Vérification de l'accès...
      </div>
    );
  }

  // Si le chargement est terminé et qu'aucune session n'existe, on renvoie vers le login
  if (!session) {
    return <Navigate to="/login" replace />;
  }

  // Si tout est bon, on affiche le Dashboard
  return children;
}