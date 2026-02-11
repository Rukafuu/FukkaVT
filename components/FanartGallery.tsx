import React from 'react';
import { FanartItem } from '../types';
import { ExternalLink } from 'lucide-react';

interface FanartGalleryProps {
  items: FanartItem[];
}

const FanartGallery: React.FC<FanartGalleryProps> = ({ items }) => {
  if (items.length === 0) {
    return (
      <div className="text-center py-12 text-fukka-text/60">
        <p>Nenhuma fanart carregada ainda. Seja o primeiro a enviar no Discord!</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl mx-auto px-4">
      {items.map((art) => (
        <div 
          key={art.id} 
          className="group relative rounded-xl overflow-hidden bg-white/60 border border-white/80 shadow-lg hover:shadow-[0_0_20px_rgba(255,105,180,0.3)] transition-all duration-300"
        >
          {/* Image Container */}
          <div className="aspect-[3/4] overflow-hidden bg-gray-100">
            <img 
              src={art.imageUrl} 
              alt={`Fanart por ${art.artistName}`}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              loading="lazy"
            />
          </div>

          {/* Overlay Info (Visible on Hover/Focus) */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
            <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 text-white">
              <p className="font-bold text-lg drop-shadow-md">{art.artistName}</p>
              <div className="flex items-center justify-between mt-2">
                <span className="text-xs text-gray-300">{new Date(art.dateAdded).toLocaleDateString()}</span>
                {art.artistUrl && (
                  <a 
                    href={art.artistUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-sm text-fukka-rose hover:text-white hover:underline"
                  >
                    Ver Perfil <ExternalLink size={14} />
                  </a>
                )}
              </div>
            </div>
          </div>
          
          {/* Mobile persistent minimal overlay */}
          <div className="lg:hidden absolute bottom-0 left-0 right-0 p-2 bg-white/90 backdrop-blur-sm border-t border-white/50">
             <p className="text-fukka-text text-sm font-bold truncate">Por {art.artistName}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FanartGallery;