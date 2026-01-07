import React, { useState } from 'react';
import { Mail, Lock, LogIn } from 'lucide-react';
import { User } from '../types';

interface LoginScreenProps {
  onLogin: (user: User) => void;
}

export default function LoginScreen({ onLogin }: LoginScreenProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock user creation
    const mockUser: User = {
      id: Date.now().toString(),
      name: email.split('@')[0],
      email,
      avatar: 'https://images.unsplash.com/photo-1511367461735-48a90e2f7338?w=400&h=400&fit=crop',
    };
    onLogin(mockUser);
  };

  const handleDemoLogin = () => {
    const demoUser: User = {
      id: '0',
      name: 'Demo User',
      email: 'demo@company.com',
      avatar: 'https://images.unsplash.com/photo-1511367461735-48a90e2f7338?w=400&h=400&fit=crop',
    };
    onLogin(demoUser);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md">
        <div className="text-center mb-8">
          <div className="text-6xl mb-4">🍽️</div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">RestaurantPick</h1>
          <p className="text-gray-600">Décidez ensemble où manger</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 text-gray-400" size={20} />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="vous@company.com"
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 text-gray-400" size={20} />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 text-white py-3 rounded-lg font-semibold hover:shadow-lg transition-all flex items-center justify-center gap-2"
          >
            <LogIn size={20} />
            Connexion
          </button>
        </form>

        <div className="relative mb-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-gray-500">Ou</span>
          </div>
        </div>

        <button
          onClick={handleDemoLogin}
          className="w-full bg-gray-100 hover:bg-gray-200 text-gray-900 py-3 rounded-lg font-semibold transition-all mb-4"
        >
          Démo
        </button>

        <p className="text-center text-sm text-gray-600">
          Pas de compte?{' '}
          <button className="text-emerald-600 hover:text-emerald-700 font-semibold">
            S'inscrire
          </button>
        </p>
      </div>
    </div>
  );
}