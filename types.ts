export interface Doctor {
  id: string;
  name: string;
  specialty: string;
  experience: number;
  rating: number;
  image: string;
  price: number;
  available: boolean;
}

export interface Test {
  id: string;
  name: string;
  category: string;
  price: number;
  turnaroundTime: string;
  description: string;
  image: string;
}

export interface Package {
  id: string;
  name: string;
  testsIncluded: string[];
  price: number;
  discount: number;
  image: string;
}

export interface Appointment {
  id: string;
  type: 'doctor' | 'test';
  itemId: string;
  itemName: string;
  date: string;
  status: 'upcoming' | 'completed' | 'cancelled';
  patientName: string;
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  image: string;
  content: string;
}

export interface SiteConfig {
  heroTitle: string;
  heroSubtitle: string;
  heroImage: string;
  contactEmail: string;
  contactPhone: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'user' | 'admin';
  subscription: 'free' | 'gold' | 'platinum';
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: number;
}
