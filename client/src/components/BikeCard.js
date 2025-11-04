import React from 'react';
import { Link } from 'react-router-dom';
import { FaMapMarkerAlt } from 'react-icons/fa';
import { formatCurrency, generateStars } from '../utils/helpers';

const BikeCard = ({ bike }) => {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
      {/* Bike Image */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={bike.images[0] || 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400'}
          alt={bike.name}
          className="w-full h-full object-cover hover:scale-110 transition-transform duration-500 ease-out"
        />
        <div className="absolute top-3 right-3 bg-blue-600/90 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs font-semibold shadow-lg">
          {bike.type}
        </div>
        {!bike.availability && (
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <span className="text-white font-medium">Unavailable</span>
          </div>
        )}
      </div>

      {/* Bike Info */}
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
          {bike.name}
        </h3>

        <p className="text-gray-600 text-sm mb-3 line-clamp-2">
          {bike.description}
        </p>

        {/* Rating */}
        <div className="flex items-center mb-3">
          <div className="flex text-yellow-400 mr-2">
            {generateStars(bike.rating).split('').map((star, index) => (
              <span key={index}>{star}</span>
            ))}
          </div>
          <span className="text-sm text-gray-600">
            ({bike.reviewCount} reviews)
          </span>
        </div>

        {/* Location */}
        <div className="flex items-center text-gray-600 text-sm mb-3">
          <FaMapMarkerAlt className="mr-1" />
          <span className="truncate">{bike.location.address}</span>
        </div>

        {/* Price */}
        <div className="flex items-center justify-between">
          <div className="text-lg font-bold text-blue-600">
            {formatCurrency(bike.pricePerDay)}
            <span className="text-sm text-gray-600 font-normal">/day</span>
          </div>

          <Link
            to={`/bikes/${bike._id}`}
            className={`inline-flex items-center px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200
              ${bike.availability 
                ? 'bg-blue-600 hover:bg-blue-700 text-white transform hover:scale-105'
                : 'bg-gray-400 text-white cursor-not-allowed'
              }`}
            onClick={(e) => !bike.availability && e.preventDefault()}
          >
            {bike.availability ? 'View Details' : 'Unavailable'}
          </Link>
        </div>

        {/* Key Specs */}
        <div className="mt-3 pt-3 border-t border-gray-200">
          <div className="flex justify-between text-xs text-gray-600">
            <span>Brand: {bike.brand}</span>
            <span>Gears: {bike.specs?.gears || 'N/A'}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BikeCard;
