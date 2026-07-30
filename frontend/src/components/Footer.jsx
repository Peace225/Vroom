import React from "react";
import { Link } from "react-router-dom";
import { Facebook, Instagram, Twitter, Youtube, Mail, Phone, MapPin } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#0a0a0a] text-white pt-16 pb-8 border-t border-white/10">
      <div className="max-w-[1400px] mx-auto px-6 md:px-8">

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-14">

          {/* Colonne 1 : Branding Vroom CI */}
          <div className="space-y-5">
            <Link to="/" className="flex items-center gap-3 group">
              <img src="/images/logo.jpg" alt="Vroom CI" className="w-10 h-10 object-contain bg-white rounded-lg p-1" />
              <div>
                <span className="font-bold text-[22px] tracking-tight text-white">
                  Vroom<span className="font-light text-white/60 ml-0.5">CI</span>
                </span>
                <p className="text-[10px] uppercase tracking-[0.2em] text-white/40 -mt-1">Premium Auto</p>
              </div>
            </Link>
            <p className="text-[13px] text-white/50 leading-relaxed max-w-[260px] font-light">
              Spécialiste location courte durée et vente de véhicules contrôlés en Côte d'Ivoire.
            </p>
            <div className="flex gap-2.5 pt-2">
              {[Facebook, Instagram, Twitter, Youtube].map((Icon, i) => (
                <a key={i} href="#" className="w-9 h-9 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl flex items-center justify-center hover:bg-white hover:text-black transition-all duration-300 group">
                  <Icon size={15} className="text-white/60 group-hover:text-black transition-colors" />
                </a>
              ))}
            </div>
          </div>

          {/* Colonne 2 : Navigation */}
          <div>
            <h4 className="text-[11px] font-semibold uppercase tracking-widest text-white/40 mb-6">Navigation</h4>
            <ul className="space-y-3.5">
              {[
                {name:"Accueil", to:"/"},
                {name:"Catalogue", to:"/catalogue"},
                {name:"Location", to:"/?tab=louer"},
                {name:"Vente", to:"/?tab=acheter"},
              ].map((item) => (
                <li key={item.name}>
                  <Link to={item.to} className="text-[14px] text-white/70 hover:text-white flex items-center gap-2 group transition-colors">
                    <span className="w-0 group-hover:w-4 h-[1px] bg-white transition-all duration-300" />
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Colonne 3 : Support */}
          <div>
            <h4 className="text-[11px] font-semibold uppercase tracking-widest text-white/40 mb-6">Entreprise</h4>
            <ul className="space-y-3.5">
              {["À propos", "FAQ", "Mentions légales", "Confidentialité"].map((item) => (
                <li key={item}>
                  <Link to="#" className="text-[14px] text-white/70 hover:text-white transition-colors">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Colonne 4 : Contact Vroom CI */}
          <div>
            <h4 className="text-[11px] font-semibold uppercase tracking-widest text-white/40 mb-6">Contact</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin size={16} className="text-white/40 mt-0.5 shrink-0" />
                <span className="text-[14px] text-white/70 leading-snug">Abidjan, Cocody<br/>Côte d'Ivoire</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={16} className="text-white/40 shrink-0" />
                <a href="tel:+2250151104839" className="text-[14px] text-white/70 hover:text-white transition-colors">
                  +225 01 51 10 48 39
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={16} className="text-white/40 shrink-0" />
                <a href="mailto:contact@vroomci.com" className="text-[14px] text-white/70 hover:text-white hover:underline underline-offset-4 transition-colors">
                  contact@vroomci.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bas du Footer */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-[12px] text-white/40 font-light tracking-wide">
            © {currentYear} Vroom CI — Location & Vente Automobile Premium
          </p>
          <div className="flex items-center gap-6">
            <span className="text-[11px] text-white/30 uppercase tracking-widest">Paiement sécurisé</span>
            <div className="flex gap-3 opacity-60">
              <img src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" alt="Visa" className="h-4 brightness-0 invert" />
              <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" alt="Mastercard" className="h-4 brightness-0 invert" />
              <span className="text-[11px] text-white/50 font-medium">Mobile Money</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}