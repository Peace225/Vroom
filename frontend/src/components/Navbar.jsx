import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Phone, Lock, Home, Car, Info } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "unset";
    return () => { document.body.style.overflow = "unset"; };
  }, [isOpen]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <nav className={`fixed top-0 w-full z-[100] transition-all duration-500 ${
        scrolled || isOpen
          ? "bg-white backdrop-blur-xl shadow-[0_8px_30px_rgba(0,0,0,0.06)] border-b border-slate-200/60"
          : "bg-white backdrop-blur-md border-b border-transparent"
      }`}>
        <div className="max-w-[1400px] mx-auto px-6 md:px-8 h-[76px] md:h-[84px] flex justify-between items-center">

          {/* LOGO */}
          <Link to="/" onClick={() => setIsOpen(false)} className="flex items-center gap-3 group relative z-[110]">
            <div className="relative">
              <div className="absolute -inset-2 bg-slate-900/5 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <img
                src="/images/logo.jpg"
                alt="Vroom CI Logo"
                className="w-12 h-12 md:w-14 md:h-14 object-contain relative transition-transform duration-500 group-hover:scale-105 group-hover:rotate-3"
              />
            </div>
            <div>
              <h1 className="font-bold text-[22px] md:text-[28px] text-orange-500 tracking-[-0.02em] leading-none">
                Vroom<span className="text-green-500 font-light ml-0.5">CI</span>
              </h1>
              <p className="text-[10px] uppercase tracking-[0.2em] text-slate-400 font-medium -mt-1 hidden md:block">Premium Auto</p>
            </div>
          </Link>

          {/* DESKTOP */}
          <div className="hidden md:flex items-center gap-6">
            <Link
              to="/login"
              className="flex items-center gap-2 text-[12px] font-medium uppercase tracking-widest text-slate-500 hover:text-orange-500 transition-all duration-300 group"
            >
              <div className="p-1.5 rounded-lg bg-green-600 group-hover:bg-orange-500 transition-colors duration-300">
                <Lock size={12} className="text-slate-100 group-hover:text-white transition-colors" />
              </div>
              Connexion
            </Link>

            <a
              href="tel:+2250151104839"
              className="relative group"
            >
              <div className="absolute -inset-0.5 bg-gradient-to-r from-slate-900 to-slate-700 rounded-2xl blur opacity-20 group-hover:opacity-30 transition duration-500" />
              <div className="relative bg-slate-900 text-white px-7 py-3 rounded-xl text-[13px] font-medium uppercase tracking-wider flex items-center gap-2.5 shadow-lg shadow-slate-900/20 group-hover:shadow-xl group-hover:shadow-slate-900/30 transition-all duration-300 group-hover:-translate-y-0.5">
                <Phone size={14} className="group-hover:rotate-12 transition-transform" />
                +225 0151 10 48 39
              </div>
            </a>
          </div>

          {/* BURGER */}
          <button
            className="md:hidden relative z-[110] w-11 h-11 flex items-center justify-center rounded-xl bg-slate-900/5 backdrop-blur-sm border border-slate-200/50 text-slate-800 hover:bg-slate-900 hover:text-white transition-all duration-300"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Menu"
          >
            <div className="relative w-5 h-5">
              <Menu size={20} className={`absolute inset-0 transition-all duration-300 ${isOpen ? 'opacity-0 rotate-90 scale-0' : 'opacity-100 rotate-0 scale-100'}`} />
              <X size={20} className={`absolute inset-0 transition-all duration-300 ${isOpen ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 -rotate-90 scale-0'}`} />
            </div>
          </button>
        </div>
      </nav>

      {/* MOBILE (Placé hors du <nav> pour un affichage plein écran correct) */}
      <div className={`fixed inset-0 bg-white z-[90] md:hidden transition-all duration-700 ${
        isOpen ? "opacity-100 visible" : "opacity-0 invisible pointer-events-none"
      }`}>
        <div className="h-full flex flex-col justify-between px-8 pt-28 pb-12">
          <div className="flex flex-col gap-4 max-w-sm mx-auto w-full">
            <Link
              to="/"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-4 py-4 border-b border-slate-100 text-slate-700 hover:text-orange-500 transition-colors"
            >
              <Home size={20} className="text-orange-500" />
              <span className="text-[16px] uppercase tracking-wider font-semibold">Accueil</span>
            </Link>

            <Link
              to="/login"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-4 py-4 border-b border-slate-100 text-slate-700 hover:text-orange-500 transition-colors"
            >
              <Lock size={20} className="text-green-600" />
              <span className="text-[16px] uppercase tracking-wider font-semibold">Espace Admin</span>
            </Link>
          </div>

          <div className="max-w-sm mx-auto w-full mt-auto">
            <a
              href="tel:+2250151104839"
              onClick={() => setIsOpen(false)}
              className="block w-full relative group"
            >
              <div className="absolute -inset-1 bg-gradient-to-r from-slate-900 to-slate-700 rounded-2xl blur-xl opacity-25 group-active:opacity-40 transition" />
              <div className="relative bg-slate-900 text-white py-4 rounded-2xl text-[16px] font-medium tracking-wide shadow-2xl flex items-center justify-center gap-3">
                <Phone size={18} />
                Appeler maintenant
              </div>
            </a>
            <p className="text-center text-[13px] text-slate-400 mt-3 tracking-wide">+225 0151 10 48 39</p>
          </div>
        </div>
      </div>
    </>
  );
}