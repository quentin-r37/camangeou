import React, { useState } from 'react';
import { ChevronLeft, Users } from 'lucide-react';
import { Restaurant, Vote, User } from '../types';

interface GroupViewProps {
  onSelectRestaurant: (restaurant: Restaurant) => void;
  onJoin: (restaurant: Restaurant) => void;
  onBack: () => void;
  allVotes: Vote[];
  allRestaurants: Restaurant[];
  colleagues: User[];
}

export default function GroupView({
  onSelectRestaurant,
  onJoin,
  onBack,
  allVotes,
  allRestaurants,
  colleagues,
}: GroupViewProps) {
  // Group votes by restaurant
  const restaurantGroups = allRestaurants.map((restaurant) => ({
    restaurant,
    votes: allVotes.filter((v) => v.restaurantId === restaurant.id),
  }));

  const activeGroups = restaurantGroups.filter((g) => g.votes.length > 0);

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <button
          onClick={onBack}
          className="p-2 hover:bg-gray-200 rounded-lg transition-all"
        >
          <ChevronLeft size={24} />
        </button>
        <h1 className="text-2xl font-bold text-gray-900">👥 Groupes en Formation</h1>
      </div>

      {/* Active Groups */}
      {activeGroups.length > 0 ? (
        <div className="space-y-4">
          {activeGroups
            .sort((a, b) => b.votes.length - a.votes.length)
            .map(({ restaurant, votes }) => {
              const votingColleagues = colleagues.filter((c) =>
                votes.some((v) => v.userId === c.id)
              );

              return (
                <div
                  key={restaurant.id}
                  className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all overflow-hidden"
                >
                  <div className="flex flex-col md:flex-row">
                    {/* Image */}
                    <img
                      src={restaurant.image}
                      alt={restaurant.name}
                      className="w-full md:w-40 h-40 object-cover"
                    />

                    {/* Info */}
                    <div className="flex-1 p-6 flex flex-col justify-between">
                      <div>
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <h3 className="text-xl font-bold text-gray-900 mb-1">
                              {restaurant.name}
                            </h3>
                            <p className="text-sm text-gray-600 mb-2">{restaurant.cuisine}</p>
                          </div>
                          <div className="bg-emerald-100 text-emerald-700 rounded-full px-3 py-1 font-bold text-lg">
                            {votes.length}
                          </div>
                        </div>

                        {/* Colleague Avatars */}
                        <div className="mb-4">
                          <p className="text-xs font-semibold text-gray-600 mb-2">Collègues :</p>
                          <div className="flex flex-wrap gap-2">
                            {votingColleagues.map((colleague) => (
                              <div
                                key={colleague.id}
                                className="relative group"
                                title={colleague.name}
                              >
                                <img
                                  src={colleague.avatar}
                                  alt={colleague.name}
                                  className="w-10 h-10 rounded-full border-2 border-emerald-500 object-cover"
                                />
                                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 bg-gray-900 text-white px-2 py-1 rounded text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
                                  {colleague.name}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Details */}
                        <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-4">
                          <span>⭐ {restaurant.rating}</span>
                          <span>📍 {restaurant.distance} km</span>
                          <span>{restaurant.priceRange}</span>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex gap-3">
                        <button
                          onClick={() => onJoin(restaurant)}
                          className="flex-1 bg-gradient-to-r from-emerald-600 to-teal-600 text-white py-2 rounded-lg font-semibold hover:shadow-lg transition-all"
                        >
                          👋 Rejoindre
                        </button>
                        <button
                          onClick={() => onSelectRestaurant(restaurant)}
                          className="flex-1 bg-gray-100 text-gray-900 py-2 rounded-lg font-semibold hover:bg-gray-200 transition-all"
                        >
                          ℹ️ Détails
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      ) : (
        <div className="text-center py-12 bg-gray-50 rounded-xl">
          <Users size={48} className="mx-auto text-gray-400 mb-4" />
          <p className="text-gray-600 text-lg font-semibold">Aucun groupe en formation</p>
          <p className="text-gray-500 text-sm mt-2">Soyez le premier à choisir un restaurant!</p>
        </div>
      )}
    </div>
  );
}