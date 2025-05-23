import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Home, FileImage, BarChart3, Leaf, User, ShoppingBag } from "lucide-react";

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const currentUser = JSON.parse(localStorage.getItem("currentUser") || "null");
  const [scrolled, setScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 20;
      setScrolled(isScrolled);
    };

    setMounted(true);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    localStorage.removeItem("billData");
    localStorage.removeItem("selectedAppliances");
    localStorage.removeItem("cart");
    navigate("/login");
  };

  if (!currentUser) {
    return null;
  }

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled 
          ? 'bg-green-800/95 backdrop-blur-sm shadow-lg' 
          : 'bg-green-800'
      } ${mounted ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'}`}
    >
      <div className="container mx-auto px-6 h-16 flex items-center justify-between">
        <Link 
          to="/home" 
          className="text-xl font-bold flex items-center gap-2 text-white transition-all duration-300 hover:scale-105"
        >
          <Leaf className="h-6 w-6 transition-transform duration-300 group-hover:rotate-12" strokeWidth={2} />
          <span className="bg-gradient-to-r from-white to-green-100 bg-clip-text text-transparent">
            GreenPulse
          </span>
        </Link>
        
        <div className="flex items-center gap-6">
          <Link 
            to="/home" 
            className="nav-item text-white/90 hover:text-white flex items-center gap-2 transition-all duration-300 hover:-translate-y-0.5 px-3 py-2"
          >
            <Home className="h-5 w-5" strokeWidth={2} />
            <span>Home</span>
          </Link>
          
          <Link 
            to="/dashboard" 
            className="nav-item text-white/90 hover:text-white flex items-center gap-2 transition-all duration-300 hover:-translate-y-0.5 px-3 py-2"
          >
            <BarChart3 className="h-5 w-5" strokeWidth={2} />
            <span>Dashboard</span>
          </Link>
          
          <Link 
            to="/marketplace" 
            className="nav-item text-white/90 hover:text-white flex items-center gap-2 transition-all duration-300 hover:-translate-y-0.5 px-3 py-2"
          >
            <ShoppingBag className="h-5 w-5" strokeWidth={2} />
            <span>Shop</span>
          </Link>
          
          <Link 
            to="/profile" 
            className="nav-item text-white/90 hover:text-white flex items-center gap-2 transition-all duration-300 hover:-translate-y-0.5 px-3 py-2"
          >
            <User className="h-5 w-5" strokeWidth={2} />
            <span>Profile</span>
          </Link>

          <Button 
            onClick={handleLogout}
            variant="outline" 
            className="bg-white/10 text-white border-2 border-white/20 hover:bg-white/20 hover:scale-105 transition-all duration-300 font-semibold"
          >
            Logout
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
