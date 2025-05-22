import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Home, FileImage, BarChart3, Leaf, User, ShoppingBag } from "lucide-react";

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const currentUser = JSON.parse(localStorage.getItem("currentUser") || "null");

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
    <nav className="bg-green-800 text-white py-4 px-6 shadow-md">
      <div className="container mx-auto flex items-center justify-between">
        <Link to="/home" className="text-xl font-bold flex items-center gap-2">
          <Leaf size={20} />
          GreenPulse
        </Link>
        
        <div className="flex items-center space-x-6">
          <Link to="/home" className="flex items-center gap-2 hover:text-green-300 transition-colors">
            <Home size={18} />
            Home
          </Link>
          <Link to="/bill-upload" className="flex items-center gap-2 hover:text-green-300 transition-colors">
            <FileImage size={18} />
            Upload Bill
          </Link>
          <Link to="/dashboard" className="flex items-center gap-2 hover:text-green-300 transition-colors">
            <BarChart3 size={18} />
            Dashboard
          </Link>
          <Link to="/marketplace" className="flex items-center gap-2 hover:text-green-300 transition-colors">
            <ShoppingBag size={18} />
            Marketplace
          </Link>
          <Link to="/profile" className="flex items-center gap-2 hover:text-green-300 transition-colors">
            <User size={18} />
            Profile
          </Link>
          <div className="flex items-center gap-4">
            <span className="text-sm font-medium">Welcome, {currentUser.name}</span>
            <Button onClick={handleLogout} variant="secondary" className="bg-white text-green-800 hover:bg-green-50 font-medium">
              Logout
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
