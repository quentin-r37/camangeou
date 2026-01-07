import React from 'react';
import { ChevronLeft, MapPin, Clock, Phone, Star } from 'lucide-react';
import { Restaurant } from '../types';

interface RestaurantDetailsProps {
  restaurant: Restaurant;
  onVote: (restaurant: Restaurant) => void;
  onBack: () => void;
  colleagueCount: number;
}

export default function RestaurantDetails({
  restaurant,
  onVote,
  onBack,
  colleagueCount,
}: RestaurantDetailsProps) {
  return (
    <div className="max-w-2xl mx-auto">
      {/* Hero Image */}
      <div className="relative h-80 md:h-96">
        <img
          src={restaurant.image}
          alt={restaurant.name}
          className="w-full h-full object-cover"
        />
        <button
          onClick={onBack}
          className="absolute top-4 left-4 bg-white bg-opacity-90 hover:bg-opacity-100 p-2 rounded-full transition-all"
        >
          <ChevronLeft size={24} />
        </button>
      </div>

      {/* Content */}
      <div className="bg-white p-6 md:p-8 space-y-6">
        {/* Header Info */}
        <div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            {restaurant.name}
          </h1>
          <p className="text-lg text-gray-600 mb-4">{restaurant.cuisine}</p>

          <div className="flex flex-wrap gap-4 mb-4">
            <div className="flex items-center gap-2">
              <Star className="text-yellow-400 fill-yellow-400" size={20} />
              <span className="text-lg font-bold">{restaurant.rating}</span>
              <span className="text-gray-600">({restaurant.reviewCount} avis)</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-lg font-semibold text-gray-900">{restaurant.priceRange}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-lg font-semibold text-gray-900">
                {restaurant.distance} km
              </span>
            </div>
          </div>

          {colleagueCount > 0 && (
            <div className="inline-block bg-emerald-100 text-emerald-700 px-4 py-2 rounded-full font-semibold">
              👥 {colleagueCount} collègue{colleagueCount > 1 ? 's' : ''} a déjà choisi ce restaurant
            </div>
          )}
        </div>

        {/* Description */}
        <div>
          <h2 className="text-xl font-bold text-gray-900 mb-3">À propos</h2>
          <p className="text-gray-700 leading-relaxed">{restaurant.description}</p>
        </div>

        {/* Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Address */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="flex items-start gap-3">
              <MapPin className="text-emerald-600 mt-1" size={20} />
              <div>
                <p className="font-semibold text-gray-900 mb-1">Adresse</p>
                <p className="text-gray-700 text-sm">{restaurant.address}</p>
              </div>
            </div>
          </div>

          {/* Hours */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="flex items-start gap-3">
              <Clock className="text-emerald-600 mt-1" size={20} />
              <div>
                <p className="font-semibold text-gray-900 mb-1">Horaires</p>
                <p className="text-gray-700 text-sm">{restaurant.openingHours}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Reviews Section */}
        <div>
          <h2 className="text-xl font-bold text-gray-900 mb-4">Avis des clients</h2>
          <div className="space-y-4">
            {[1, 2].map((i) => (
              <div key={i} className="border-b border-gray-200 pb-4 last:border-0">
                <div className="flex items-center gap-2 mb-2">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, j) => (
                      <Star
                        key={j}
                        size={16}
                        className={
                          j < (i === 1 ? 5 : 4)
                            ? 'text-yellow-400 fill-yellow-400'
                            : 'text-gray-300'
                        }
                      />
                    ))}
                  </div>
                  <span className="font-semibold text-gray-900">
                    {i === 1 ? '5 / 5' : '4 / 5'}
                  </span>
                </div>
                <p className="text-gray-700 text-sm">
                  {i === 1
                    ? 'Excellent restaurant! Les plats sont délicieux et le service impeccable.'
                    : 'Très bon rapport qualité-prix. À recommander pour les déjeuners d\'équipe.'}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="flex gap-4 pt-4">
          <button
            onClick={() => onVote(restaurant)}
            className="flex-1 bg-gradient-to-r from-emerald-600 to-teal-600 text-white py-4 rounded-xl font-bold text-lg hover:shadow-lg transition-all"
          >
            ✅ Je vote pour ce restaurant
          </button>
        </div>
      </div>
    </div>
  );
}