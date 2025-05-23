import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-green-50/80 to-green-100/50">
      <Navbar />
      <div className="flex-1 min-h-0 mt-16 md:mt-20">
        <div className="w-full h-full py-6 md:py-8">
          {children}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Layout; 