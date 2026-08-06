import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Accueil from "./pages/Accueil";
import Vente from "./pages/Vente";
import Location from "./pages/Location";
import Detail from "./pages/Detail";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AdminDashboard from "./pages/AdminDashboard";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Catalog from "./components/Catalog";
import CarDetails from "./components/CarDetails";

// Composant pour l'importation de données
import ImportData from "./components/ImportData"; 

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <div className="min-h-[80vh]">
        <Routes>
          <Route path="/" element={<Accueil />} />
          
          <Route path="/vente" element={<Vente />} />
          <Route path="/location" element={<Location />} />
          
          {/* CORRECTION : Ajout de la route /vehicule/:id correspondant à l'URL appelée */}
          <Route path="/vehicule/:id" element={<CarDetails />} />
          <Route path="/voiture/:id" element={<CarDetails />} />
          <Route path="/detail/:id" element={<Detail />} />
          
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<AdminDashboard />} />
          <Route path="/catalogue" element={<Catalog />} />
          
          {/* Route temporaire pour importer vos voitures */}
          <Route path="/import" element={<ImportData />} />

          {/* Route 404 pour gérer les pages inexistantes */}
          <Route 
            path="*" 
            element={
              <div className="p-12 text-center text-slate-600 font-medium">
                404 - Page introuvable
              </div>
            } 
          />
        </Routes>
      </div>
      <Footer />
    </BrowserRouter>
  );
}