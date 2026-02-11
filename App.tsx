import React, { useState, useEffect } from 'react';
import { fetchFanarts } from './services/fanartService';
import { FanartItem } from './types';
import SocialLinks from './components/SocialLinks';
import LoreModal from './components/LoreModal';
import FanartGallery from './components/FanartGallery';
import { Sparkles, Image as ImageIcon, Heart, Coffee, Gift, Lock, Package, Youtube, Mail, Music, Github, Moon, Sun, MonitorPlay } from 'lucide-react';

const KONAMI_CODE = [
  "ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown", 
  "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight", 
  "b", "a"
];

const useKonamiCode = (action: () => void) => {
  const [input, setInput] = useState<string[]>([]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const newInput = [...input, e.key];
      if (newInput.length > KONAMI_CODE.length) {
        newInput.shift();
      }
      setInput(newInput);

      if (newInput.join('') === KONAMI_CODE.join('')) {
        action();
        setInput([]);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [input, action]);
};

const App: React.FC = () => {
  const [fanarts, setFanarts] = useState<FanartItem[]>([]);
  const [isLoreOpen, setIsLoreOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  
  // Theme State
  const [darkMode, setDarkMode] = useState(false);
  
  // Twitch Status (Mocked for now)
  const [isLive, setIsLive] = useState(false); 

  // Konami Code Action
  useKonamiCode(() => {
    alert("KONAMI CODE ACTIVATED! 🎮🔥");
    setDarkMode(prev => !prev); // Toggle Chaos Mode
    // Add more chaos here later!
  });

  useEffect(() => {
    // Check system preference on load
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      // setDarkMode(true); // Optional: Auto-detect
    }

    // Apply dark mode class to html element
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }

    const loadData = async () => {
      try {
        const data = await fetchFanarts();
        setFanarts(data);
      } catch (e) {
        console.error("Failed to load fanarts", e);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, [darkMode]);

  const toggleTheme = () => setDarkMode(!darkMode);

  return (
    <div className={`min-h-screen transition-colors duration-500 overflow-x-hidden
      ${darkMode 
        ? 'bg-slate-900 text-pink-200' 
        : 'bg-gradient-to-br from-fukka-peach to-fukka-rose'
      }`}
    >
      
      {/* Background decoration */}
      <div className="fixed inset-0 pointer-events-none transition-opacity duration-500">
         <div className={`absolute top-0 left-0 w-96 h-96 rounded-full blur-[80px] -translate-x-1/2 -translate-y-1/2 transition-colors duration-500 ${darkMode ? 'bg-purple-900/30' : 'bg-white/30'}`}></div>
         <div className={`absolute bottom-0 right-0 w-96 h-96 rounded-full blur-[80px] translate-x-1/2 translate-y-1/2 transition-colors duration-500 ${darkMode ? 'bg-pink-900/30' : 'bg-yellow-100/30'}`}></div>
      </div>

      {/* Top Bar (Theme Toggle & Status) */}
      <div className="absolute top-4 right-4 z-50 flex items-center gap-3">
        {/* Twitch Status Pill */}
        <a 
          href="https://twitch.tv/fukkavt" 
          target="_blank" 
          rel="noopener noreferrer"
          className={`flex items-center gap-2 px-3 py-1.5 rounded-full font-bold text-xs transition-all cursor-pointer ${
            isLive 
            ? 'bg-red-500 text-white animate-pulse shadow-[0_0_15px_rgba(239,68,68,0.6)]' 
            : 'bg-black/20 text-white/50 hover:bg-black/40'
          }`}
          onClick={(e) => {
             // For demo: click to toggle live status (easter egg)
             if (e.altKey) {
                e.preventDefault();
                setIsLive(!isLive);
             }
          }}
        >
          {isLive ? (
            <>
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
              </span>
              AO VIVO
            </>
          ) : (
            <>
              <MonitorPlay size={14} />
              OFFLINE
            </>
          )}
        </a>

        {/* Theme Toggle Button */}
        <button 
          onClick={toggleTheme}
          className={`p-2 rounded-full transition-all duration-300 shadow-lg ${
            darkMode 
            ? 'bg-yellow-400 text-yellow-900 hover:rotate-180' 
            : 'bg-slate-800 text-yellow-100 hover:rotate-12'
          }`}
          title={darkMode ? "Voltar para Modo Anjo" : "Ativar Modo Piranha"}
        >
          {darkMode ? <Sun size={20} /> : <Moon size={20} />}
        </button>
      </div>

      <main className="relative z-10 container mx-auto px-4 pb-20 max-w-4xl">
        
        {/* Header Section */}
        <header className="flex flex-col items-center pt-20 pb-10 text-center">
          <div className="relative group cursor-pointer" onClick={() => setIsLoreOpen(true)}>
            {/* Avatar Ring */}
            <div className={`absolute -inset-2 rounded-full opacity-60 group-hover:opacity-100 transition duration-500 blur-sm animate-pulse ${darkMode ? 'bg-gradient-to-tr from-purple-500 to-pink-500' : 'bg-gradient-to-tr from-white to-fukka-accent'}`}></div>
            
            {/* Avatar Image */}
            <div className={`relative w-44 h-44 rounded-full overflow-hidden shadow-xl transition-all duration-500 ${darkMode ? 'grayscale-[20%] group-hover:grayscale-0' : ''}`}>
              <img 
                src="/fukka-avatar.png" 
                alt="Fukka Avatar" 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
            </div>
            
            {/* Lore Hint Badge */}
            <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 bg-white text-fukka-text border border-fukka-rose px-4 py-1.5 rounded-full text-sm font-bold flex items-center gap-1 shadow-md opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0 whitespace-nowrap z-20">
              <Sparkles size={14} className="text-fukka-accent" /> Ler Lore
            </div>
          </div>

          <h1 className={`mt-8 text-6xl md:text-7xl font-bold drop-shadow-md tracking-tight transition-colors duration-300 ${darkMode ? 'text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600' : 'text-white'}`}>
            FukkaVT
          </h1>
          
          {/* Main Description */}
          <p className={`mt-4 text-xl font-medium ${darkMode ? 'text-gray-300' : 'text-fukka-text/90'}`}>
             Sua glitch favorita. Games, arte e caos toda semana.
          </p>

          {/* Mensagem da Piranha */}
          <div className={`mt-6 p-6 backdrop-blur-sm rounded-2xl border max-w-2xl shadow-sm transition-colors duration-300
            ${darkMode 
              ? 'bg-black/40 border-purple-500/50 text-gray-200' 
              : 'bg-white/40 border-white/50 text-fukka-text'
            }`}>
             <h3 className={`font-bold mb-2 uppercase tracking-wide text-xs ${darkMode ? 'text-pink-400' : 'text-fukka-accent'}`}>Mensagem da Piranha</h3>
             <p className="italic text-lg leading-relaxed font-serif">
               “Você não precisa agradar todo mundo. Seja você mesmo, seja essa piranha maravilhosa que enfrenta a vida com coragem, carinho e caos controlado. Vamos valorizar quem nos apoia, quem nos ama de verdade!”
             </p>
          </div>

          {/* Social Links */}
          <div className="mt-8 w-full">
            <SocialLinks />
          </div>
        </header>

        {/* Latest Video Section */}
        <section className="mb-12 w-full">
           <h2 className={`text-2xl font-bold mb-6 flex items-center justify-center gap-2 drop-shadow-md ${darkMode ? 'text-purple-300' : 'text-white'}`}>
             <Youtube className={`rounded-full p-1 ${darkMode ? 'text-red-400 bg-slate-800' : 'text-red-500 bg-white'}`} size={32} /> Último Vídeo
           </h2>
           <div className={`aspect-video w-full rounded-2xl overflow-hidden shadow-xl border-4 bg-black transition-colors duration-300 ${darkMode ? 'border-purple-500/30' : 'border-white/40'}`}>
             <iframe 
               width="100%" 
               height="100%" 
               src="https://www.youtube.com/embed/Jhfb6nYEBGw" 
               title="Último Vídeo da Fukka" 
               allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
               referrerPolicy="strict-origin-when-cross-origin"
               allowFullScreen
               className="w-full h-full border-0"
             ></iframe>
           </div>
        </section>

        {/* Support Section */}
        <section className="mt-8 mb-16">
          <div className={`backdrop-blur-md rounded-3xl p-8 border shadow-lg transition-colors duration-300 ${darkMode ? 'bg-slate-800/50 border-slate-700' : 'bg-white/50 border-white/60'}`}>
            <h2 className={`text-2xl font-bold mb-6 flex items-center justify-center gap-2 ${darkMode ? 'text-pink-300' : 'text-fukka-text'}`}>
              <Heart className={`${darkMode ? 'text-pink-500 fill-pink-500' : 'text-fukka-accent fill-fukka-accent'}`} />
              Área de Suporte
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
               {/* Livepix */}
               <a href="https://livepix.gg/fukka" target="_blank" rel="noopener noreferrer" 
                  className={`flex items-center gap-3 p-4 rounded-xl shadow-sm hover:shadow-md hover:scale-[1.02] transition-all border group ${darkMode ? 'bg-slate-700 border-slate-600 hover:border-green-500/50' : 'bg-white border-green-100'}`}>
                  <div className={`p-3 rounded-full transition-colors ${darkMode ? 'bg-green-900/30 text-green-400 group-hover:bg-green-500 group-hover:text-white' : 'bg-green-100 text-green-600 group-hover:bg-green-500 group-hover:text-white'}`}>
                    <Gift size={24} />
                  </div>
                  <div className="text-left">
                    <span className={`block font-bold ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>Livepix</span>
                    <span className="text-sm text-gray-500">Mande um mimo!</span>
                  </div>
               </a>

               {/* OnlyFans (Meme) */}
               <a href="https://www.youtube.com/watch?v=dQw4w9WgXcQ&list=RDdQw4w9WgXcQ&start_radio=1" target="_blank" rel="noopener noreferrer" 
                  className={`flex items-center gap-3 p-4 rounded-xl shadow-sm hover:shadow-md hover:scale-[1.02] transition-all border group ${darkMode ? 'bg-slate-700 border-slate-600 hover:border-blue-500/50' : 'bg-white border-blue-100'}`}>
                  <div className={`p-3 rounded-full transition-colors ${darkMode ? 'bg-blue-900/30 text-blue-400 group-hover:bg-blue-500 group-hover:text-white' : 'bg-blue-100 text-blue-500 group-hover:bg-blue-500 group-hover:text-white'}`}>
                    <Lock size={24} />
                  </div>
                  <div className="text-left">
                    <span className={`block font-bold ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>OnlyFans</span>
                    <span className="text-sm text-gray-500">Conteúdo Exclusivo 👀</span>
                  </div>
               </a>
               
               {/* Patreon - Em breve */}
               <div className={`flex items-center gap-3 p-4 rounded-xl border opacity-75 cursor-not-allowed ${darkMode ? 'bg-slate-800/50 border-slate-700' : 'bg-white/50 border-gray-100'}`}>
                  <div className={`p-3 rounded-full ${darkMode ? 'bg-slate-700 text-gray-500' : 'bg-gray-200 text-gray-500'}`}>
                    <Heart size={24} />
                  </div>
                  <div className="text-left">
                    <span className={`block font-bold ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Patreon</span>
                    <span className="text-sm text-gray-500">Em breve</span>
                  </div>
               </div>

               {/* Ko-fi - Em breve */}
               <div className={`flex items-center gap-3 p-4 rounded-xl border opacity-75 cursor-not-allowed ${darkMode ? 'bg-slate-800/50 border-slate-700' : 'bg-white/50 border-gray-100'}`}>
                  <div className={`p-3 rounded-full ${darkMode ? 'bg-slate-700 text-gray-500' : 'bg-gray-200 text-gray-500'}`}>
                    <Coffee size={24} />
                  </div>
                  <div className="text-left">
                    <span className={`block font-bold ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Ko-fi</span>
                    <span className="text-sm text-gray-500">Em breve</span>
                  </div>
               </div>
            </div>
          </div>
        </section>

        {/* Info Grid (Downloads, Contact, PO Box) */}
        <section className="mb-16 grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* PO Box */}
          <div className={`md:col-span-2 rounded-2xl p-6 border-2 border-dashed relative overflow-hidden flex flex-col items-center justify-center text-center transaction-colors duration-300 ${darkMode ? 'bg-[#2a1b25] border-pink-500/20' : 'bg-[#FFF5E1] border-fukka-text/20'}`}>
             <div className="absolute top-0 right-0 p-4 opacity-10">
               <Package size={120} className={darkMode ? 'text-pink-200' : 'text-fukka-text'} />
             </div>
             <div className="relative z-10">
               <h3 className={`text-xl font-bold flex items-center justify-center gap-2 mb-4 ${darkMode ? 'text-pink-200' : 'text-fukka-text'}`}>
                 <Package className="text-fukka-accent" />
                 Caixa Postal
               </h3>
               <div className={`p-6 rounded-xl shadow-sm inline-block w-full max-w-sm ${darkMode ? 'bg-slate-800' : 'bg-white/80'}`}>
                 <p className={`font-bold text-lg ${darkMode ? 'text-white' : 'text-fukka-text'}`}>Fukka (LFAN)</p>
                 <p className="text-gray-600">Caixa Postal 7796</p>
                 <p className="text-gray-600">CEP: 30411-973</p>
                 <p className="text-gray-600 font-medium">Belo Horizonte - MG</p>
               </div>
               <p className={`mt-4 text-sm italic ${darkMode ? 'text-pink-200/60' : 'text-fukka-text/60'}`}>Envie cartas, presentes e muito amor!</p>
             </div>
          </div>

          {/* Email Contact */}
          <div className={`backdrop-blur-md rounded-2xl p-6 border flex flex-col items-center justify-center text-center shadow-sm hover:shadow-md transition-all ${darkMode ? 'bg-slate-800/40 border-slate-700' : 'bg-white/40 border-white/50'}`}>
              <Mail className="text-fukka-accent mb-3" size={32} />
              <h3 className={`font-bold text-lg ${darkMode ? 'text-white' : 'text-fukka-text'}`}>Contato</h3>
              <a href="mailto:fukka@fukka.com.br" className={`font-medium mt-1 hover:text-fukka-accent transition-colors ${darkMode ? 'text-gray-300' : 'text-fukka-text/80'}`}>
                fukka@fukka.com.br
              </a>
          </div>

          {/* Music Download */}
          <a href="http://www.fukka.com.br/musicas/Fukka%20Live%20Show%203k.rar" className={`backdrop-blur-md rounded-2xl p-6 border flex flex-col items-center justify-center text-center shadow-sm hover:shadow-md transition-all group cursor-pointer ${darkMode ? 'bg-slate-800/40 border-slate-700' : 'bg-white/40 border-white/50'}`}>
              <Music className="text-purple-500 mb-3 group-hover:scale-110 transition-transform" size={32} />
              <h3 className={`font-bold text-lg ${darkMode ? 'text-white' : 'text-fukka-text'}`}>Músicas do Show 3k</h3>
              <span className={`text-sm mt-1 flex items-center gap-1 ${darkMode ? 'text-gray-400' : 'text-fukka-text/70'}`}>
                 Baixar Pack (.rar)
              </span>
          </a>

        </section>

        {/* Fanart Section */}
        <section className="mt-16">
          <div className="flex items-center justify-center gap-4 mb-10">
            <div className="h-[2px] w-16 bg-white/50 rounded-full"></div>
            <h2 className={`text-3xl font-bold drop-shadow-md flex items-center gap-3 ${darkMode ? 'text-pink-300' : 'text-white'}`}>
              <ImageIcon className={darkMode ? 'text-pink-300' : 'text-white'} />
              Galeria de Fanarts
            </h2>
            <div className="h-[2px] w-16 bg-white/50 rounded-full"></div>
          </div>

          {loading ? (
             <div className="flex justify-center py-20">
               <div className="w-12 h-12 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
             </div>
          ) : (
            <FanartGallery items={fanarts} />
          )}

          <div className={`text-center mt-12 backdrop-blur-sm p-6 rounded-2xl inline-block w-full border ${darkMode ? 'bg-slate-800/30 border-slate-700 text-gray-300' : 'bg-white/30 border-white/40 text-fukka-text'}`}>
             <p className="font-medium mb-2">Quer ver sua arte aqui?</p>
             <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-fukka-text/80'}`}>
               Poste no canal <a href="https://discord.com/channels/1318308751605764106/1333591724420763709" target="_blank" rel="noopener noreferrer" className="text-fukka-accent font-bold hover:underline hover:text-fukka-text transition-colors">#fanart</a> no servidor do Discord!
             </p>
          </div>
        </section>

      </main>

      {/* Footer */}
      <footer className={`py-10 text-center text-sm relative z-10 border-t backdrop-blur-md transition-colors ${darkMode ? 'text-gray-400 border-slate-800 bg-slate-900/50' : 'text-fukka-text/70 border-white/20 bg-white/20'}`}>
        <p>© {new Date().getFullYear()} Fukka Channel. Todos os direitos reservados.</p>
        <p className="mt-2 text-xs opacity-80 flex items-center justify-center gap-1">
          Feito com ❤️, ☕ e caos por 
          <a href="https://github.com/rukafuu" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 hover:text-fukka-accent transition-colors font-bold">
            <Github size={12} className="mb-0.5" /> Rukafuu
          </a>
        </p>
      </footer>

      <LoreModal isOpen={isLoreOpen} onClose={() => setIsLoreOpen(false)} />
    </div>
  );
};

export default App;