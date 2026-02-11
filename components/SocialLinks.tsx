import React from 'react';
import { SocialLink } from '../types';
import { Twitter, Twitch, Youtube, MessageCircle, Instagram, Facebook } from 'lucide-react';

const socialData: SocialLink[] = [
  {
    platform: 'Twitch',
    url: 'https://www.twitch.tv/fukkavt',
    icon: <Twitch size={24} />,
    color: 'hover:bg-[#9146FF] hover:text-white text-[#9146FF] border-[#9146FF]/30',
  },
  {
    platform: 'Twitter',
    url: 'https://x.com/FukkaVT',
    icon: <Twitter size={24} />,
    color: 'hover:bg-black hover:text-white text-black border-black/30',
  },
  {
    platform: 'YouTube',
    url: 'https://www.youtube.com/channel/UCi2-k55QrD8iFCp8ejxb9qw',
    icon: <Youtube size={24} />,
    color: 'hover:bg-[#FF0000] hover:text-white text-[#FF0000] border-[#FF0000]/30',
  },
  {
    platform: 'Discord',
    url: 'https://discord.gg/jAdkKxWs',
    icon: <MessageCircle size={24} />,
    color: 'hover:bg-[#5865F2] hover:text-white text-[#5865F2] border-[#5865F2]/30',
  },
  {
    platform: 'Instagram',
    url: 'https://www.instagram.com/fukkavt',
    icon: <Instagram size={24} />,
    color: 'hover:bg-[#E1306C] hover:text-white text-[#E1306C] border-[#E1306C]/30',
  },
  {
    platform: 'Facebook',
    url: 'https://www.facebook.com/fukka.chan.2025',
    icon: <Facebook size={24} />,
    color: 'hover:bg-[#1877F2] hover:text-white text-[#1877F2] border-[#1877F2]/30',
  },
];

const SocialLinks: React.FC = () => {
  return (
    <div className="flex flex-wrap justify-center gap-4 py-6">
      {socialData.map((social) => (
        <a
          key={social.platform}
          href={social.url}
          target="_blank"
          rel="noopener noreferrer"
          className={`
            flex items-center justify-center p-3 rounded-full border-2 
            bg-white/40 backdrop-blur-sm transition-all duration-300
            transform hover:scale-110 hover:border-transparent
            shadow-sm hover:shadow-md
            ${social.color}
          `}
          aria-label={social.platform}
        >
          {social.icon}
        </a>
      ))}
    </div>
  );
};

export default SocialLinks;