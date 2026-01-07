import React, { useState } from 'react';
import { ChevronLeft, Filter, Search } from 'lucide-react';
import { Restaurant, Vote } from '../types';

interface RestaurantSelectorProps {
  mode: 'popularity' | 'filters' | 'serendipity';
  onSelectRestaurant: (restaurant: Restaurant) => void;
  onBack: () => void;
  allVotes: Vote[];
  allRestaurants: Restaurant[];
}

export default function RestaurantSelector({
  mode,
  onSelectRestaurant,
  onBack,
  allVotes,
  allRestaurants,
}: RestaurantSelectorProps) {
  const [selectedCuisine, setSelectedCuisine] = useState('');
  const [maxDistance, setMaxDistance] = useState(5);
  const [searchQuery, setSearchQuery] = useState('');

  // Calculate votes per restaurant
  const restaurantWithVotes = allRestaurants.map((restaurant) => ({
    restaurant,
    voteCount: allVotes.filter((v) => v.restaurantId === restaurant.id).length,
  }));

  // Filter restaurants based on mode
  let filteredRestaurants = restaurantWithVotes;

  if (mode === 'popularity') {
    filteredRestaurants = restaurantWithVotes.sort((a, b) => b.voteCount - a.voteCount);
  } else if (mode === 'filters') {
    filteredRestaurants = restaurantWithVotes.filter((r) => {
      const matchesCuisine = !selectedCuisine || r.restaurant.cuisine === selectedCuisine;
      const matchesDistance = r.restaurant.distance <= maxDistance;
      const matchesSearch =
        !searchQuery ||
        r.restaurant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        r.restaurant.cuisine.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCuisine && matchesDistance && matchesSearch;
    });
  } else if (mode === 'serendipity') {
    // Random serendipity selection
    filteredRestaurants = restaurantWithVotes
      .sort(() => Math.random() - 0.5)
      .slice(0, 4);
  }

  const cuisines = Array.from(new Set(allRestaurants.map((r) => r.cuisine)));

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <button
          onClick={onBack}
          className="p-2 hover:bg-gray-200 rounded-lg transition-all"
        >
          <ChevronLeft size={24} />
        </button>
        <h1 className="text-2xl font-bold text-gray-900">
          {mode === 'popularity' && '👥 Par Popularité'}
          {mode === 'filters' && '🔍 Filtrer les Restaurants'}
          {mode === 'serendipity' && '🎲 Découverte du Jour'}
        </h1>
      </div>

      {/* Filters Section */}
      {mode === 'filters' && (
        <div className="bg-white p-6 rounded-xl shadow-md space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">
              🔎 Rechercher
            </label>
            <div className="relative">
              <Search className="absolute left-3 top-3 text-gray-400" size={20} />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Nom du restaurant..."
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">
              🍽️ Cuisine
            </label>
            <select
              value={selectedCuisine}
              onChange={(e) => setSelectedCuisine(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
            >
              <option value="">Toutes les cuisines</option>
              {cuisines.map((cuisine) => (
                <option key={cuisine} value={cuisine}>
                  {cuisine}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">
              📍 Distance max: {maxDistance} km
            </label>
            <input
              type="range"
              min="0.5"
              max="5"
              step="0.5"
              value={maxDistance}
              onChange={(e) => setMaxDistance(parseFloat(e.target.value))}
              className="w-full"
            />
          </div>
        </div>
      )}

      {/* Serendipity Message */}
      {mode === 'serendipity' && (
        <div className="bg-gradient-to-r from-amber-50 to-orange-50 p-6 rounded-xl border-2 border-amber-200">
          <p className="text-gray-900 font-semibold">
            ✨ Laissez-nous vous surprendre! Voici nos recommandations basées sur vos goûts et
            tendances.
          </p>
        </div>
      )}

      {/* Restaurants Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredRestaurants.map(({ restaurant, voteCount }) => (
          <button
            key={restaurant.id}
            onClick={() => onSelectRestaurant(restaurant)}
            className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all overflow-hidden text-left hover:scale-105 transform"
          >
            <div className="relative">
              <img
                src={restaurant.image}
                alt={restaurant.name}
                className="w-full h-40 object-cover"
              />
              {voteCount > 0 && (
                <div className="absolute top-3 right-3 bg-emerald-500 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold text-sm">
                  {voteCount}
                </div>
              )}
            </div>
            <div className="p-4">
              <h3 className="font-bold text-gray-900 text-lg mb-1">{restaurant.name}</h3>
              <p className="text-sm text-gray-600 mb-3">{restaurant.cuisine}</p>

              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <span className="text-yellow-400">⭐</span>
                  <span className="text-sm font-semibold">{restaurant.rating}</span>
                  <span className="text-xs text-gray-500">({restaurant.reviewCount})</span>
                </div>
                <span className="text-sm text-gray-600">{restaurant.distance} km</span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold text-gray-700">{restaurant.priceRange}</span>
                <span className="text-xs text-emerald-600 font-semibold">
                  Voir détails →
                </span>
              </div>
            </div>
          </button>
        ))}
      </div>

      {filteredRestaurants.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-600 text-lg">Aucun restaurant ne correspond à vos critères.</p>
        </div>
      )}
    </div>
  );
}