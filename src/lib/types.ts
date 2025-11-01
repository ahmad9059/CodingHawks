import type React from 'react';

export type Field = {
  icon: React.ElementType;
  title: string;
  description: string;
};

export type Achievement = {
  id: string;
  year: string;
  title: string;
  description: string;
  content: string;
};

export type Announcement = {
  id: string;
  title: string;
  description: string;
  date: string;
  imageUrl: string;
  content: string;
};
