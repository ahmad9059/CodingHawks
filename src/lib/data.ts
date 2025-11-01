import {
  Code,
  BrainCircuit,
  Zap,
  Smartphone,
  Shield,
  CloudCog,
  Palette,
} from 'lucide-react';
import type { Field, Achievement, Announcement } from '@/lib/types';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export const fieldsData: Field[] = [
  {
    icon: Code,
    title: 'Web Development',
    description: 'Master front-end and back-end technologies to build modern web applications.',
  },
  {
    icon: BrainCircuit,
    title: 'AI/ML',
    description: 'Explore the world of artificial intelligence and machine learning models.',
  },
  {
    icon: Zap,
    title: 'Speed Programming',
    description: 'Hone your problem-solving skills and compete in coding challenges.',
  },
  {
    icon: Smartphone,
    title: 'Android Development',
    description: 'Create innovative and user-friendly mobile applications for Android.',
  },
  {
    icon: Shield,
    title: 'Cybersecurity',
    description: 'Learn to protect systems and networks from digital threats and attacks.',
  },
  {
    icon: CloudCog,
    title: 'SaaS/AI Development',
    description: 'Build and deploy scalable Software as a Service applications with AI.',
  },
  {
    icon: Palette,
    title: 'Graphic Design/UI/UX',
    description: 'Design intuitive and visually appealing interfaces for a great user experience.',
  },
];

export const achievementsData: Achievement[] = [
  {
    year: '2024',
    title: 'Hackathon Winner',
    description: 'Our team secured the first place in the National Inter-University Hackathon.',
  },
  {
    year: '2024',
    title: 'Tech Conference Speaker',
    description: 'Society members were invited to speak at the Annual Tech Innovators Conference.',
  },
  {
    year: '2023',
    title: 'Open Source Contribution',
    description: 'Major contributions to a popular open-source machine learning library.',
  },
  {
    year: '2023',
    title: 'Coding Competition Victory',
    description: 'Won the regional speed programming competition, setting a new record.',
  },
];

const announcementImage1 = PlaceHolderImages.find(p => p.id === 'announcement-1')?.imageUrl ?? '';
const announcementImage2 = PlaceHolderImages.find(p => p.id === 'announcement-2')?.imageUrl ?? '';
const announcementImage3 = PlaceHolderImages.find(p => p.id === 'announcement-3')?.imageUrl ?? '';

export const announcementsData: Announcement[] = [
  {
    id: '1',
    title: 'Web Development Workshop',
    description: 'Join us for a hands-on workshop covering the fundamentals of React and Next.js. Perfect for beginners!',
    date: '2024-08-15T10:00:00Z',
    imageUrl: announcementImage1,
  },
  {
    id: '2',
    title: 'Annual Hackathon "CodeRumble"',
    description: 'Get ready for 24 hours of intense coding, innovation, and fun. Prizes worth thousands await the winners.',
    date: '2024-09-01T09:00:00Z',
    imageUrl: announcementImage2,
  },
  {
    id: '3',
    title: 'Tech Meetup & Networking Event',
    description: 'Connect with industry professionals and fellow students. Keynote speech on the future of AI.',
    date: '2024-09-20T18:00:00Z',
    imageUrl: announcementImage3,
  },
];

// Mock function to simulate fetching data from Firestore
export const getAnnouncements = async (): Promise<Announcement[]> => {
  // In a real app, you would fetch this from Firebase Firestore
  // e.g., const snapshot = await getDocs(collection(db, "announcements"));
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(announcementsData);
    }, 500); // Simulate network delay
  });
};
