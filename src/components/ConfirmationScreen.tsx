import React from 'react';
import { CheckCircle, Home, Share2 } from 'lucide-react';
import { User, Restaurant } from '../types';

interface ConfirmationScreenProps {
  user: User;
  restaurant: Restaurant;
  onHome: () => void;
  colleagues: User[];
}

export default function ConfirmationScreen({
  user,
  restaurant,
  onHome,
  colleagues,
}: ConfirmationScreenProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-50 p-6 flex items-center justify-center">
      <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full text-center space-y-8">
        {/* Success Icon */}
        <div className="flex justify-center">
          <div className="relative">
            <div className="text-6xl">✨</div>
            <CheckCircle className="absolute -bottom-2 -right-2 text-emerald-500 fill-emerald-500" size={32} />
          </div>
        </div>

        {/* Confirmation Message */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Excellent choix!</h1>
          <p className="text-gray-600">Vous avez voté pour</p>
        </div>

        {/* Restaurant Card */}
        <div className="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-xl p-4 border-2 border-emerald-200">
          <img
            src={restaurant.image}
            alt={restaurant.name}
            className="w-full h-40 rounded-lg object-cover mb-4"
          />
          <h2 className="text-2xl font-bold text-gray-900 mb-1">{restaurant.name}</h2>
          <p className="text-sm text-gray-600 mb-3">{restaurant.cuisine}</p>
          <div className="flex justify-center gap-4 text-sm">
            <span>⭐ {restaurant.rating}</span>
            <span>📍 {restaurant.distance} km</span>
            <span>{restaurant.priceRange}</span>
          </div>
        </div>

        {/* Colleagues Info */}
        {colleagues.length > 0 && (
          <div className="bg-blue-50 rounded-xl p-4 border-2 border-blue-200">
            <p className="text-sm font-semibold text-gray-900 mb-3">
              👥 Vous mangez avec {colleagues.length} collègue{colleagues.length > 1 ? 's' : ''}
            </p>
            <div className="flex justify-center gap-2 flex-wrap">
              {colleagues.map((colleague) => (
                <div
                  key={colleague.id}
                  className="relative group"
                >
                  <img
                    src={colleague.avatar}
                    alt={colleague.name}
                    className="w-12 h-12 rounded-full border-2 border-blue-500 object-cover"
                  />
                  <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 bg-gray-900 text-white px-2 py-1 rounded text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
                    {colleague.name}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Restaurant Details */}
        <div className="bg-gray-50 rounded-xl p-4 text-left space-y-3">
          <div>
            <p className="text-xs font-semibold text-gray-600 mb-1">📍 Adresse</p>
            <p className="text-sm text-gray-900">{restaurant.address}</p>
          </div>
          <div>
            <p className="text-xs font-semibold text-gray-600 mb-1">🕐 Horaires</p>
            <p className="text-sm text-gray-900">{restaurant.openingHours}</p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <button
            onClick={onHome}
            className="flex-1 bg-gradient-to-r from-emerald-600 to-teal-600 text-white py-3 rounded-lg font-semibold hover:shadow-lg transition-all flex items-center justify-center gap-2"
          >
            <Home size={20} />
            Retour à l'accueil
          </button>
          <button
            className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-900 py-3 rounded-lg font-semibold transition-all flex items-center justify-center gap-2"
          >
            <Share2 size={20} />
            Partager
          </button>
        </div>

        {/* Footer Message */}
        <p className="text-xs text-gray-500">
          À bientôt pour un excellent déjeuner! 🍽️
        </p>
      </div>
    </div>
  );
}