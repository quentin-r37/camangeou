import React from 'react';
import { Users, Search, Zap, History, ChefHat } from 'lucide-react';
import { User, Restaurant, Vote } from '../types';

interface HomeScreenProps {
  user: User;
  onSelectMode: (mode: 'popularity' | 'filters' | 'serendipity') => void;
  onViewGroups: () => void;
  recentHistory: Restaurant[];
  userVote: Restaurant | null;
  allVotes: Vote[];
  allRestaurants: Restaurant[];
}

export default function HomeScreen({
  user,
  onSelectMode,
  onViewGroups,
  recentHistory,
  userVote,
  allVotes,
  allRestaurants,
}: HomeScreenProps) {
  // Calculate restaurant votes
  const restaurantVoteCounts = allRestaurants.map((restaurant) => ({
    restaurant,
    count: allVotes.filter((v) => v.restaurantId === restaurant.id).length,
  }));

  const topRestaurants = restaurantVoteCounts
    .filter((r) => r.count > 0)
    .sort((a, b) => b.count - a.count)
    .slice(0, 3);

  return (
    <div className="p-6 space-y-8">
      {/* Current Choice Section */}
      {userVote && (
        <div className="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-2xl p-6 border-2 border-emerald-200">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">✨ Votre choix</h2>
          <div className="flex items-start gap-4">
            <img
              src={userVote.image}
              alt={userVote.name}
              className="w-24 h-24 rounded-lg object-cover"
            />
            <div className="flex-1">
              <h3 className="text-xl font-bold text-gray-900 mb-1">{userVote.name}</h3>
              <p className="text-sm text-gray-600 mb-2">{userVote.cuisine}</p>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-yellow-400">⭐</span>
                <span className="text-sm font-semibold">{userVote.rating}</span>
                <span className="text-xs text-gray-500">({userVote.reviewCount} avis)</span>
              </div>
              <p className="text-xs text-gray-600">{userVote.address}</p>
            </div>
          </div>
        </div>
      )}

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <button
          onClick={() => onSelectMode('popularity')}
          className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all border-l-4 border-emerald-500"
        >
          <div className="flex items-start gap-4">
            <div className="text-3xl">👥</div>
            <div className="text-left">
              <h3 className="font-bold text-gray-900 mb-1">Par Popularité</h3>
              <p className="text-sm text-gray-600">Voir les choix de vos collègues</p>
            </div>
          </div>
        </button>

        <button
          onClick={() => onSelectMode('filters')}
          className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all border-l-4 border-teal-500"
        >
          <div className="flex items-start gap-4">
            <div className="text-3xl">🔍</div>
            <div className="text-left">
              <h3 className="font-bold text-gray-900 mb-1">Filtrer</h3>
              <p className="text-sm text-gray-600">Cuisine, distance, prix</p>
            </div>
          </div>
        </button>

        <button
          onClick={() => onSelectMode('serendipity')}
          className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all border-l-4 border-amber-500"
        >
          <div className="flex items-start gap-4">
            <div className="text-3xl">🎲</div>
            <div className="text-left">
              <h3 className="font-bold text-gray-900 mb-1">Serendipité</h3>
              <p className="text-sm text-gray-600">Découverte IA</p>
            </div>
          </div>
        </button>
      </div>

      {/* Colleagues Section */}
      <button
        onClick={onViewGroups}
        className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 text-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Users size={24} />
            <div className="text-left">
              <h3 className="font-bold text-lg">Voir mes collègues</h3>
              <p className="text-sm text-emerald-100">Rejoignez un groupe en formation</p>
            </div>
          </div>
          <div className="text-2xl">→</div>
        </div>
      </button>

      {/* Top Restaurants */}
      {topRestaurants.length > 0 && (
        <div>
          <h2 className="text-lg font-semibold text-gray-900 mb-4">🔥 Tendances du moment</h2>
          <div className="space-y-3">
            {topRestaurants.map(({ restaurant, count }) => (
              <div
                key={restaurant.id}
                className="bg-white p-4 rounded-xl shadow-md hover:shadow-lg transition-all flex items-center justify-between"
              >
                <div className="flex items-center gap-4 flex-1">
                  <img
                    src={restaurant.image}
                    alt={restaurant.name}
                    className="w-16 h-16 rounded-lg object-cover"
                  />
                  <div>
                    <h3 className="font-bold text-gray-900">{restaurant.name}</h3>
                    <p className="text-sm text-gray-600">{restaurant.cuisine}</p>
                  </div>
                </div>
                <div className="bg-emerald-100 text-emerald-700 rounded-full w-12 h-12 flex items-center justify-center font-bold text-lg">
                  {count}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Recent History */}
      {recentHistory.length > 0 && (
        <div>
          <h2 className="text-lg font-semibold text-gray-900 mb-4">📚 Historique récent</h2>
          <div className="space-y-3">
            {recentHistory.map((restaurant) => (
              <div
                key={restaurant.id}
                className="bg-white p-4 rounded-xl shadow-md hover:shadow-lg transition-all flex items-center gap-4"
              >
                <img
                  src={restaurant.image}
                  alt={restaurant.name}
                  className="w-16 h-16 rounded-lg object-cover"
                />
                <div className="flex-1">
                  <h3 className="font-bold text-gray-900">{restaurant.name}</h3>
                  <p className="text-sm text-gray-600">{restaurant.cuisine}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold text-gray-900">{restaurant.distance} km</p>
                  <div className="flex items-center gap-1 text-yellow-400">
                    <span>⭐</span>
                    <span className="text-sm">{restaurant.rating}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}