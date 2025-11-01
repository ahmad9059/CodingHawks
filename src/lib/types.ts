import type React from 'react';

export type Field = {
  icon: React.ElementType;
  title: string;
  description: string;
};

export type Achievement = {
  year: string;
  title: string;
  description: string;
};

export type Announcement = {
  id: string;
  title: string;
  description: string;
  date: string;
  imageUrl: string;
};
