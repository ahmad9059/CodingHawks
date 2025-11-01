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
    id: 'hackathon-winner-2024',
    year: '2024',
    title: 'Hackathon Winner',
    description: 'Our team secured the first place in the National Inter-University Hackathon.',
    content: '<p>Our team showcased exceptional skill and innovation to win the prestigious National Inter-University Hackathon. The project, a solution for local farmers using AI-powered crop monitoring, was praised by judges for its real-world impact and technical sophistication. This victory is a testament to the talent and collaborative spirit of our members.</p>',
  },
  {
    id: 'tech-conference-speaker-2024',
    year: '2024',
    title: 'Tech Conference Speaker',
    description: 'Society members were invited to speak at the Annual Tech Innovators Conference.',
    content: '<p>Two of our senior members were honored with an invitation to speak at the Annual Tech Innovators Conference. They presented their research on scalable machine learning infrastructure, sharing the stage with industry leaders and academics. This was a significant recognition of their expertise and our society\'s contribution to the tech community.</p>',
  },
  {
    id: 'open-source-contribution-2023',
    year: '2023',
    title: 'Open Source Contribution',
    description: 'Major contributions to a popular open-source machine learning library.',
    content: '<p>Throughout 2023, several of our members made significant code contributions to a widely-used open-source machine learning library. Their work on improving the performance of data preprocessing modules has been merged into the main branch and is now used by thousands of developers worldwide.</p>',
  },
  {
    id: 'coding-competition-victory-2023',
    year: '2023',
    title: 'Coding Competition Victory',
    description: 'Won the regional speed programming competition, setting a new record.',
    content: '<p>The Coding Hawks competitive programming team dominated the regional speed programming competition. They solved a series of complex algorithmic challenges faster than any other team, setting a new record for the event and bringing home the championship trophy.</p>',
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
    content: `<p>This workshop is designed to get you up and running with two of the most popular technologies in modern web development: React and Next.js. We'll start from the very basics, so no prior experience is required. By the end of the session, you'll have built your first dynamic web application.</p>
    <h3>What You'll Learn:</h3>
    <ul>
      <li>The core concepts of React: components, state, and props.</li>
      <li>How to set up a new project using Next.js.</li>
      <li>Building pages and creating routes.</li>
      <li>Fetching data and displaying it in your application.</li>
      <li>Styling your components with Tailwind CSS.</li>
    </ul>
    <p>Make sure to bring your laptop with Node.js and a code editor (like VS Code) installed. We can't wait to see you there!</p>`,
  },
  {
    id: '2',
    title: 'Annual Hackathon "CodeRumble"',
    description: 'Get ready for 24 hours of intense coding, innovation, and fun. Prizes worth thousands await the winners.',
    date: '2024-09-01T09:00:00Z',
    imageUrl: announcementImage2,
    content: `<h2>The Ultimate Coding Challenge is Back!</h2>
    <p>CodeRumble is our flagship annual hackathon, bringing together the brightest minds to solve real-world problems through technology. Whether you're a seasoned coder or just starting out, this is an opportunity to learn, collaborate, and create something amazing.</p>
    <h3>Event Details:</h3>
    <ul>
      <li><strong>Duration:</strong> 24 hours straight.</li>
      <li><strong>Team Size:</strong> 1-4 members.</li>
      <li><strong>Prizes:</strong> Cash prizes, tech gadgets, and internship opportunities for the top 3 teams.</li>
      <li><strong>Mentors:</strong> Industry experts will be available to guide you.</li>
    </ul>
    <p>Food, drinks, and plenty of coffee will be provided to keep you going. Register your team now and get ready to rumble!</p>`,
  },
  {
    id: '3',
    title: 'Tech Meetup & Networking Event',
    description: 'Connect with industry professionals and fellow students. Keynote speech on the future of AI.',
    date: '2024-09-20T18:00:00Z',
    imageUrl: announcementImage3,
    content: `<p>Join us for an evening of insightful talks, networking, and inspiration. This is a fantastic opportunity to connect with people from the tech industry, learn about career paths, and discuss the latest trends.</p>
    <h3>Agenda:</h3>
    <ul>
      <li><strong>6:00 PM:</strong> Welcome & Networking</li>
      <li><strong>7:00 PM:</strong> Keynote: "The AI Revolution: What's Next?" by industry veteran Jane Doe.</li>
      <li><strong>8:00 PM:</strong> Q&A Session and Panel Discussion.</li>
      <li><strong>8:30 PM:</strong> More Networking & Refreshments.</li>
    </ul>
    <p>Don't miss this chance to expand your professional network and gain valuable insights. The event is free, but seats are limited, so be sure to RSVP.</p>`,
  },
];

// Mock function to simulate fetching data
export const getAnnouncements = async (): Promise<Announcement[]> => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(announcementsData);
    }, 500); // Simulate network delay
  });
};

export const getAnnouncementById = async (id: string): Promise<Announcement | null> => {
  return new Promise(resolve => {
    setTimeout(() => {
      const announcement = announcementsData.find(a => a.id === id) || null;
      resolve(announcement);
    }, 300);
  });
};

export const getAchievements = async (): Promise<Achievement[]> => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(achievementsData);
    }, 500);
  });
};

export const getAchievementById = async (id: string): Promise<Achievement | null> => {
  return new Promise(resolve => {
    setTimeout(() => {
      const achievement = achievementsData.find(a => a.id === id) || null;
      resolve(achievement);
    }, 300);
  });
};
