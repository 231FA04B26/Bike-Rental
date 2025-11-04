import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebook, FaTwitter, FaInstagram, FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-b from-gray-900 to-gray-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-blue-300 bg-clip-text text-transparent mb-4">BikeRental</h3>
            <p className="text-gray-300 mb-4">
              Your trusted partner for bike rentals. Explore new places, stay active,
              and create unforgettable memories with our premium bike collection.
            </p>
            <div className="flex space-x-6">
              <a href="https://facebook.com/bikerental" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-400 transform hover:scale-110 transition-all duration-200">
                <FaFacebook size={24} aria-label="Facebook" />
              </a>
              <a href="https://twitter.com/bikerental" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-400 transform hover:scale-110 transition-all duration-200">
                <FaTwitter size={24} aria-label="Twitter" />
              </a>
              <a href="https://instagram.com/bikerental" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-400 transform hover:scale-110 transition-all duration-200">
                <FaInstagram size={24} aria-label="Instagram" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-300 hover:text-blue-400 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/bikes" className="text-gray-300 hover:text-blue-400 transition-colors">
                  Browse Bikes
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-300 hover:text-blue-400 transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-300 hover:text-blue-400 transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact Info</h4>
            <div className="space-y-3">
              <div className="flex items-center">
                <FaMapMarkerAlt className="text-blue-400 mr-2" />
                <span className="text-gray-300">123 Bike Street, City, State 12345</span>
              </div>
              <div className="flex items-center">
                <FaPhone className="text-blue-400 mr-2" />
                <span className="text-gray-300">(555) 123-4567</span>
              </div>
              <div className="flex items-center">
                <FaEnvelope className="text-blue-400 mr-2" />
                <span className="text-gray-300">info@bikerental.com</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-300 text-sm">
              © {new Date().getFullYear()} BikeRental. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link to="/privacy" className="text-gray-300 hover:text-blue-400 text-sm transition-colors">
                Privacy Policy
              </Link>
              <Link to="/terms" className="text-gray-300 hover:text-blue-400 text-sm transition-colors">
                Terms of Service
              </Link>
              <Link to="/cookies" className="text-gray-300 hover:text-blue-400 text-sm transition-colors">
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
