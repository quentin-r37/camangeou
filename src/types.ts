export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
}

export interface Restaurant {
  id: string;
  name: string;
  cuisine: string;
  distance: number;
  rating: number;
  reviewCount: number;
  image: string;
  address: string;
  openingHours: string;
  priceRange: string;
  description: string;
}

export interface Vote {
  userId: string;
  restaurantId: string;
  timestamp: Date;
}

export interface UserPreferences {
  favoriteCuisines: string[];
  maxDistance: number;
  priceRangePreference: string[];
}