import React from 'react';
import { X, BookOpen } from 'lucide-react';

interface LoreModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const LoreModal: React.FC<LoreModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity" 
        onClick={onClose}
      />
      
      {/* Modal Content */}
      <div className="relative bg-[#FFF5E1] border-2 border-fukka-rose rounded-2xl w-full max-w-2xl max-h-[80vh] overflow-hidden shadow-2xl animate-float">
        
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-fukka-text/10 bg-white/50">
          <h2 className="text-2xl font-bold text-fukka-text flex items-center gap-2">
            <BookOpen size={24} className="text-fukka-accent" />
            A História da Fukka
          </h2>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-black/5 rounded-full transition-colors text-fukka-text/70 hover:text-fukka-text"
          >
            <X size={24} />
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="p-6 overflow-y-auto max-h-[60vh] text-fukka-text/90 leading-relaxed space-y-4">
          <p>
            <strong className="text-fukka-accent">Fukkahara Leona Flowes Avelino Natterelli</strong> (Fukka Chan) é uma VTuber brasileira que chegou como quem não quer nada — e, em pouco tempo, conquistou tudo: corações, risadas e muito respeito.
          </p>
          
          <p>
            <strong className="text-[#E1306C]">A Ascensão</strong><br/>
            Desde sua primeira live no dia 5 de março de 2025, ela vem crescendo em ritmo exponencial. Em poucas semanas, seu canal no YouTube já passou dos 3.300 inscritos, e a cada vídeo conquista mais gente com seu jeito único.
          </p>
          
          <p>
            <strong className="text-[#9146FF]">A Essência</strong><br/>
            Fukka é caótica, carinhosa, espontânea e profundamente humana. Impossível assistir sem rir, pensar e se sentir acolhido. Ela transforma julgamentos em humor, inseguranças em força e cada momento em algo memorável.
          </p>

          <p>
            O mais bonito? Onde quer que ela vá — seja numa collab, stream própria ou só aparecendo...
          </p>
          
          <div className="mt-8 p-4 bg-white/60 border border-fukka-rose rounded-lg text-sm italic text-center text-fukka-text/80 shadow-sm">
            "Transformando julgamentos em humor e inseguranças em força."
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-fukka-text/10 bg-white/50 flex justify-end">
          <button 
            onClick={onClose}
            className="px-6 py-2 bg-gradient-to-r from-fukka-rose to-fukka-peach hover:from-fukka-peach hover:to-fukka-rose rounded-full text-white font-bold shadow-md hover:shadow-lg transition-all"
          >
            Fechar Arquivos
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoreModal;