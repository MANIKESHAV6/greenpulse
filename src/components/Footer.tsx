import React from "react";
import { Twitter, Instagram, Linkedin, Facebook, Mail, Phone, MapPin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-green-800 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold mb-4">GreenPulse</h3>
            <p className="text-sm text-green-100">
              Empowering households to make smarter energy choices for a sustainable future.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-green-300 transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="hover:text-green-300 transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="hover:text-green-300 transition-colors">
                <Linkedin size={20} />
              </a>
              <a href="#" className="hover:text-green-300 transition-colors">
                <Facebook size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-green-300 transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-green-300 transition-colors">Our Services</a></li>
              <li><a href="#" className="hover:text-green-300 transition-colors">Energy Tips</a></li>
              <li><a href="#" className="hover:text-green-300 transition-colors">Blog</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center gap-2">
                <Mail size={16} />
                <span>info@greenpulse.com</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone size={16} />
                <span>+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center gap-2">
                <MapPin size={16} />
                <span>123 Energy Street, Green City</span>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Stay Updated</h3>
            <p className="text-sm mb-4">Subscribe to our newsletter for energy saving tips and updates.</p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="px-3 py-2 rounded-md text-green-900 text-sm flex-1"
              />
              <button className="bg-green-600 px-4 py-2 rounded-md text-sm hover:bg-green-500 transition-colors">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        <div className="border-t border-green-700 mt-8 pt-8 text-center text-sm">
          <p>© 2024 GreenPulse. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 