import { Doctor, Test, Package, BlogPost, SiteConfig, User } from './types';

export const INITIAL_SITE_CONFIG: SiteConfig = {
  heroTitle: "Your Complete Health Care Partner",
  heroSubtitle: "Book lab tests, consult top doctors, and manage your health journey all in one place. Fast, secure, and reliable.",
  heroImage: "https://picsum.photos/1600/900",
  contactEmail: "support@healthconnect.com",
  contactPhone: "+1 (555) 123-4567"
};

export const INITIAL_USER: User = {
  id: 'u1',
  name: 'John Doe',
  email: 'john@example.com',
  role: 'user', // Change to 'admin' to test admin features instantly if needed, though login handles this
  subscription: 'free'
};

export const INITIAL_DOCTORS: Doctor[] = [
  {
    id: 'd1',
    name: 'Dr. Sarah Smith',
    specialty: 'Cardiologist',
    experience: 12,
    rating: 4.9,
    image: 'https://picsum.photos/200/200?random=1',
    price: 120,
    available: true
  },
  {
    id: 'd2',
    name: 'Dr. James Wilson',
    specialty: 'Dermatologist',
    experience: 8,
    rating: 4.7,
    image: 'https://picsum.photos/200/200?random=2',
    price: 90,
    available: true
  },
  {
    id: 'd3',
    name: 'Dr. Emily Chen',
    specialty: 'Pediatrician',
    experience: 15,
    rating: 4.9,
    image: 'https://picsum.photos/200/200?random=3',
    price: 100,
    available: true
  },
  {
    id: 'd4',
    name: 'Dr. Michael Brown',
    specialty: 'General Physician',
    experience: 20,
    rating: 4.8,
    image: 'https://picsum.photos/200/200?random=4',
    price: 60,
    available: true
  }
];

export const INITIAL_TESTS: Test[] = [
  {
    id: 't1',
    name: 'Complete Blood Count (CBC)',
    category: 'Hematology',
    price: 25,
    turnaroundTime: '24 Hours',
    description: 'Measures different parts of the blood to help diagnose diseases.',
    image: 'https://picsum.photos/400/300?random=5'
  },
  {
    id: 't2',
    name: 'Thyroid Profile (Total)',
    category: 'Hormones',
    price: 40,
    turnaroundTime: '24 Hours',
    description: 'Check thyroid function with T3, T4, and TSH levels.',
    image: 'https://picsum.photos/400/300?random=6'
  },
  {
    id: 't3',
    name: 'HbA1c (Glycosylated Hemoglobin)',
    category: 'Diabetes',
    price: 30,
    turnaroundTime: '12 Hours',
    description: 'Average blood sugar level over the past 2-3 months.',
    image: 'https://picsum.photos/400/300?random=7'
  },
  {
    id: 't4',
    name: 'Vitamin D Total',
    category: 'Vitamins',
    price: 45,
    turnaroundTime: '24 Hours',
    description: 'Screen for Vitamin D deficiency and bone health.',
    image: 'https://picsum.photos/400/300?random=8'
  }
];

export const INITIAL_PACKAGES: Package[] = [
  {
    id: 'p1',
    name: 'Full Body Checkup - Basic',
    testsIncluded: ['CBC', 'Blood Sugar Fasting', 'Lipid Profile', 'Liver Function'],
    price: 99,
    discount: 20,
    image: 'https://picsum.photos/400/300?random=9'
  },
  {
    id: 'p2',
    name: 'Women Wellness Premium',
    testsIncluded: ['CBC', 'Thyroid', 'Vitamin D', 'Iron Studies', 'Calcium'],
    price: 149,
    discount: 15,
    image: 'https://picsum.photos/400/300?random=10'
  }
];

export const INITIAL_BLOGS: BlogPost[] = [
  {
    id: 'b1',
    title: 'Understanding Your Blood Test Results',
    excerpt: 'Learn how to read your CBC and lipid profile reports without a medical degree.',
    date: '2023-10-15',
    image: 'https://picsum.photos/600/400?random=11',
    content: 'Full content here...'
  },
  {
    id: 'b2',
    title: 'The Importance of Vitamin D',
    excerpt: 'Why the "sunshine vitamin" is crucial for your immunity and bone health.',
    date: '2023-10-20',
    image: 'https://picsum.photos/600/400?random=12',
    content: 'Full content here...'
  },
  {
    id: 'b3',
    title: '5 Tips for a Healthy Heart',
    excerpt: 'Simple lifestyle changes that can drastically improve your cardiovascular health.',
    date: '2023-10-25',
    image: 'https://picsum.photos/600/400?random=13',
    content: 'Full content here...'
  }
];
