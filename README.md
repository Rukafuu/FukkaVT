<div align="center">
  <img src="public/fukka-banner.jpg" alt="FukkaVT Banner" width="100%" />

# 🐟 FukkaVT Portal

**O Hub oficial da sua glitch favorita!**

[![React](https://img.shields.io/badge/React-19-blue?logo=react)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-6.0-purple?logo=vite)](https://vitejs.dev/)
[![Tailwind](https://img.shields.io/badge/Tailwind-CV-cyan?logo=tailwindcss)](https://tailwindcss.com/)
[![Discord.js](https://img.shields.io/badge/Discord.js-14-5865F2?logo=discord)](https://discord.js.org/)

[🌐 Acesse o Site](https://fukkavt.vercel.app/) • [📺 Canal no YouTube](https://www.youtube.com/@FukkaVT) • [💜 Discord](https://discord.gg/fukkavt)

</div>

---

## ✨ Sobre o Projeto

Este é o novo portal interativo da **FukkaVT**, desenvolvido para reunir tudo o que importa: vídeos, lives, redes sociais e a comunidade.

O site foi construído com foco em performance, estética "caótica-fofa" e interatividade, refletindo a personalidade única da Fukka.

## 🚀 Funcionalidades Principais

- **🎨 Modo Piranha (Dark Mode)**:
  - Alterne entre o "Modo Anjo" (Claro/Peach) e o "Modo Piranha" (Escuro/Neon) com um clique.
  - Todo o site reage à mudança de tema.

- **🖼️ Galeria de Fanarts Automática**:
  - Um script inteligente (`scripts/fetch-fanarts.ts`) conecta no canal `#fanart` do Discord, baixa as artes mais recentes e atualiza o site automaticamente.
  - Curadoria feita pela comunidade através de reações!

- **🎮 Easter Eggs**:
  - Tente usar o **Konami Code** (`↑ ↑ ↓ ↓ ← → ← → B A`) no teclado... 👀
  - Clique com `Alt` no botão de "Offline" para ver o que acontece.

- **🔴 Status da Twitch**:
  - Indicador visual se a Fukka está em live (simulado/integrável).

## 🛠️ Tecnologias

- **Frontend**: React (TypeScript) + Vite
- **Estilização**: TailwindCSS (com suporte a Dark Mode via classe)
- **Ícones**: Lucide React
- **Automação**: Script Node.js com `discord.js` para buscar fanarts.

## 📦 Como Rodar Localmente

1. **Clone o repositório:**

   ```bash
   git clone https://github.com/Rukafuu/FukkaVT.git
   cd FukkaVT
   ```

2. **Instale as dependências:**

   ```bash
   npm install
   ```

3. **Configure o Ambiente (Opcional para Fanarts):**
   - Crie um arquivo `.env.local` na raiz.
   - Adicione seu token de bot do Discord:
     ```env
     DISCORD_BOT_TOKEN=seu_token_aqui
     ```

4. **Rode o projeto:**
   ```bash
   npm run dev
   ```
   Acesse em `http://localhost:5173`.

## 🤖 Atualizando Fanarts

Para puxar as novas artes do Discord:

```bash
npx ts-node scripts/fetch-fanarts.ts
```

_Isso irá gerar um novo `public/fanarts.json` com as últimas artes._

---

<div align="center">
  Feito com ❤️, ☕ e muito caos por <a href="https://github.com/Rukafuu">Rukafuu</a>
</div>
