import React, { useState, useEffect } from 'react';
import { LogOut } from 'lucide-react';
import LoginScreen from './components/LoginScreen';
import HomeScreen from './components/HomeScreen';
import RestaurantSelector from './components/RestaurantSelector';
import RestaurantDetails from './components/RestaurantDetails';
import GroupView from './components/GroupView';
import ConfirmationScreen from './components/ConfirmationScreen';
import { User, Restaurant, Vote } from './types';

type Screen = 'login' | 'home' | 'selector' | 'details' | 'groups' | 'confirmation';
type SelectorMode = 'popularity' | 'filters' | 'serendipity';

export default function App() {
  const [screen, setScreen] = useState<Screen>('login');
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [selectedRestaurant, setSelectedRestaurant] = useState<Restaurant | null>(null);
  const [selectorMode, setSelectorMode] = useState<SelectorMode>('popularity');
  const [userVote, setUserVote] = useState<Restaurant | null>(null);
  const [allVotes, setAllVotes] = useState<Vote[]>([]);
  const [recentHistory, setRecentHistory] = useState<Restaurant[]>([]);

  // Mock authentication
  const handleLogin = (user: User) => {
    setCurrentUser(user);
    setScreen('home');
    loadMockData(user.id);
  };

  // Load mock data for the user
  const loadMockData = (userId: string) => {
    // Mock recent history
    setRecentHistory(mockRestaurants.slice(0, 3));
    // Mock votes from colleagues
    setAllVotes(mockVotes);
  };

  const handleSelectRestaurant = (restaurant: Restaurant) => {
    setSelectedRestaurant(restaurant);
    setScreen('details');
  };

  const handleVoteRestaurant = (restaurant: Restaurant) => {
    setUserVote(restaurant);
    setSelectedRestaurant(null);
    // Add user's vote to the list
    if (currentUser) {
      const newVote: Vote = {
        userId: currentUser.id,
        restaurantId: restaurant.id,
        timestamp: new Date(),
      };
      setAllVotes([...allVotes, newVote]);
    }
    setScreen('confirmation');
  };

  const handleJoinCollege = (restaurant: Restaurant) => {
    setUserVote(restaurant);
    setSelectedRestaurant(null);
    if (currentUser) {
      const newVote: Vote = {
        userId: currentUser.id,
        restaurantId: restaurant.id,
        timestamp: new Date(),
      };
      setAllVotes([...allVotes, newVote]);
    }
    setScreen('confirmation');
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setScreen('login');
    setUserVote(null);
    setSelectedRestaurant(null);
  };

  const handleBackToHome = () => {
    setScreen('home');
    setSelectedRestaurant(null);
  };

  const renderHeader = () => {
    if (screen === 'login') return null;
    return (
      <header className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white p-4 flex justify-between items-center shadow-lg">
        <div className="flex items-center gap-2">
          <div className="text-2xl">🍽️</div>
          <h1 className="text-2xl font-bold">RestaurantPick</h1>
        </div>
        {currentUser && (
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <img
                src={currentUser.avatar}
                alt={currentUser.name}
                className="w-10 h-10 rounded-full border-2 border-white"
              />
              <span className="text-sm">{currentUser.name}</span>
            </div>
            <button
              onClick={handleLogout}
              className="bg-white bg-opacity-20 hover:bg-opacity-30 px-3 py-2 rounded-lg transition-all flex items-center gap-2"
            >
              <LogOut size={18} />
            </button>
          </div>
        )}
      </header>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {renderHeader()}
      <main className="max-w-7xl mx-auto">
        {screen === 'login' && <LoginScreen onLogin={handleLogin} />}
        {screen === 'home' && currentUser && (
          <HomeScreen
            user={currentUser}
            onSelectMode={(mode) => {
              setSelectorMode(mode);
              setScreen('selector');
            }}
            onViewGroups={() => setScreen('groups')}
            recentHistory={recentHistory}
            userVote={userVote}
            allVotes={allVotes}
            allRestaurants={mockRestaurants}
          />
        )}
        {screen === 'selector' && currentUser && (
          <RestaurantSelector
            mode={selectorMode}
            onSelectRestaurant={handleSelectRestaurant}
            onBack={handleBackToHome}
            allVotes={allVotes}
            allRestaurants={mockRestaurants}
          />
        )}
        {screen === 'details' && selectedRestaurant && currentUser && (
          <RestaurantDetails
            restaurant={selectedRestaurant}
            onVote={handleVoteRestaurant}
            onBack={() => setScreen('selector')}
            colleagueCount={allVotes.filter((v) => v.restaurantId === selectedRestaurant.id).length}
          />
        )}
        {screen === 'groups' && currentUser && (
          <GroupView
            onSelectRestaurant={handleSelectRestaurant}
            onJoin={handleJoinCollege}
            onBack={handleBackToHome}
            allVotes={allVotes}
            allRestaurants={mockRestaurants}
            colleagues={mockColleagues}
          />
        )}
        {screen === 'confirmation' && currentUser && userVote && (
          <ConfirmationScreen
            user={currentUser}
            restaurant={userVote}
            onHome={() => {
              setScreen('home');
              setUserVote(null);
            }}
            colleagues={mockColleagues.filter((c) =>
              allVotes.some((v) => v.userId === c.id && v.restaurantId === userVote.id)
            )}
          />
        )}
      </main>
    </div>
  );
}

// Mock Data
const mockColleagues: User[] = [
  {
    id: '1',
    name: 'Alice Martin',
    email: 'alice@company.com',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop',
  },
  {
    id: '2',
    name: 'Bob Dupont',
    email: 'bob@company.com',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
  },
  {
    id: '3',
    name: 'Claire Rousseau',
    email: 'claire@company.com',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop',
  },
  {
    id: '4',
    name: 'David Leclerc',
    email: 'david@company.com',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop',
  },
  {
    id: '5',
    name: 'Emma Petit',
    email: 'emma@company.com',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=400&fit=crop',
  },
];

const mockRestaurants: Restaurant[] = [
  {
    id: '1',
    name: 'Le Petit Bistro',
    cuisine: 'French',
    distance: 0.5,
    rating: 4.5,
    reviewCount: 328,
    image: 'https://images.unsplash.com/photo-1579871494635-c7589f084646?w=500&h=300&fit=crop',
    address: '45 Rue de Rivoli, 75004 Paris',
    openingHours: '11:30 - 23:00',
    priceRange: '€€',
    description: 'Petit restaurant français traditionnel avec une excellente cuisine et une ambiance chaleureuse.',
  },
  {
    id: '2',
    name: 'Sakura Ramen',
    cuisine: 'Japanese',
    distance: 0.8,
    rating: 4.7,
    reviewCount: 412,
    image: 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=500&h=300&fit=crop',
    address: '82 Rue Montmartre, 75001 Paris',
    openingHours: '11:00 - 22:00',
    priceRange: '€€',
    description: 'Authentique restaurant japonais spécialisé dans les ramen savoureux et bouillons maison.',
  },
  {
    id: '3',
    name: 'Pizza Napoli',
    cuisine: 'Italian',
    distance: 1.2,
    rating: 4.3,
    reviewCount: 256,
    image: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=500&h=300&fit=crop',
    address: '120 Rue de Turenne, 75003 Paris',
    openingHours: '12:00 - 23:30',
    priceRange: '€',
    description: 'Pizzeria italienne avec four à bois traditionnel et ingrédients frais importés.',
  },
  {
    id: '4',
    name: 'Le Marrakech',
    cuisine: 'Moroccan',
    distance: 1.5,
    rating: 4.4,
    reviewCount: 189,
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500&h=300&fit=crop',
    address: '35 Rue des Martyrs, 75009 Paris',
    openingHours: '11:30 - 23:00',
    priceRange: '€€',
    description: 'Restaurant marocain avec tajines succulents et ambiance authentique du Maghreb.',
  },
  {
    id: '5',
    name: 'The Burger Station',
    cuisine: 'American',
    distance: 0.3,
    rating: 4.2,
    reviewCount: 578,
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500&h=300&fit=crop',
    address: '12 Boulevard Saint-Germain, 75005 Paris',
    openingHours: '11:00 - 22:00',
    priceRange: '€',
    description: 'Burgers artisanaux avec frites maison et une variété de sauces originales.',
  },
  {
    id: '6',
    name: 'Pho Vietnam',
    cuisine: 'Vietnamese',
    distance: 2.0,
    rating: 4.6,
    reviewCount: 342,
    image: 'https://images.unsplash.com/photo-1455619452474-d2be0d1fdec2?w=500&h=300&fit=crop',
    address: '78 Rue Mouffetard, 75005 Paris',
    openingHours: '11:00 - 22:30',
    priceRange: '€',
    description: 'Restaurant vietnamien authentique avec pho, rouleaux frais et soupe traditionnelle.',
  },
];

const mockVotes: Vote[] = [
  { userId: '1', restaurantId: '1', timestamp: new Date(Date.now() - 600000) },
  { userId: '2', restaurantId: '1', timestamp: new Date(Date.now() - 500000) },
  { userId: '3', restaurantId: '2', timestamp: new Date(Date.now() - 400000) },
  { userId: '4', restaurantId: '1', timestamp: new Date(Date.now() - 300000) },
  { userId: '5', restaurantId: '3', timestamp: new Date(Date.now() - 200000) },
];