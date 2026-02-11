import React from 'react';

export interface FanartItem {
  id: string;
  imageUrl: string;
  artistName: string;
  artistUrl?: string;
  dateAdded: string;
}

export interface SocialLink {
  platform: 'Twitch' | 'Twitter' | 'YouTube' | 'Discord' | 'TikTok' | 'Instagram' | 'Facebook';
  url: string;
  icon: React.ReactNode;
  color: string;
}

export interface LoreChapter {
  title: string;
  content: string;
}