import { Client, Events, GatewayIntentBits } from 'discord.js';
import fs from 'fs/promises';
import path from 'path';
import 'dotenv/config';

// --- CONFIGURAÇÕES ---
const CHANNEL_ID = '1333591724420763709'; // ID do canal de fanarts
const TOKEN = process.env.DISCORD_BOT_TOKEN; // Usando variável de ambiente
if (!TOKEN) {
  console.error("❌ Erro: DISCORD_BOT_TOKEN não encontrado no .env");
  process.exit(1);
}
const MAX_FANARTS = 20; // Quantas fanarts baixar (ex: top 20)
const MIN_REACTIONS = 0; // Se quiser filtrar as mais votadas (ex: 5 reações)

// --- INTERFACES ---
interface FanartItem {
  id: string;
  imageUrl: string;
  artistName: string;
  artistUrl: string;
  dateAdded: string;
}

// --- CLIENTE DISCORD ---
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ]
});

client.once(Events.ClientReady, async (readyClient) => {
  console.log(`✅ Logado como ${readyClient.user.tag}`);

  try {
    const channel = await client.channels.fetch(CHANNEL_ID);

    if (!channel || !channel.isTextBased()) {
      console.error('❌ Canal não encontrado ou não é de texto!');
      process.exit(1);
    }

    console.log(`📂 Lendo mensagens do canal: ${channel.id}`);
    
    // Buscar últimas 100 mensagens (limite da API por vez)
    const messages = await channel.messages.fetch({ limit: 100 });
    
    const fanarts: FanartItem[] = [];

    messages.forEach(msg => {
      // Ignora mensagens do próprio bot
      if (msg.author.bot) return;

      // Verifica se tem anexos de imagem
      const attachment = msg.attachments.find(att => 
        att.contentType?.startsWith('image/')
      );

      if (attachment) {
        // Conta reações (opcional: filtrar por popularidade)
        const reactionCount = msg.reactions.cache.reduce((acc, reaction) => acc + reaction.count, 0);
        
        if (reactionCount >= MIN_REACTIONS) {
            fanarts.push({
                id: msg.id,
                imageUrl: attachment.url,
                artistName: msg.author.displayName || msg.author.username,
                // Link direto para o perfil ou para a mensagem original
                artistUrl: `https://discord.com/channels/${msg.guildId}/${msg.channelId}/${msg.id}`, 
                dateAdded: msg.createdAt.toISOString()
            });
        }
      }
    });

    // Ordenar (opcional: mais recentes primeiro)
    // fanarts.sort((a, b) => new Date(b.dateAdded).getTime() - new Date(a.dateAdded).getTime());

    // Limitar quantidade
    const finalFanarts = fanarts.slice(0, MAX_FANARTS);

    // --- SALVAR JSON ---
    const outputPath = path.resolve('public', 'fanarts.json');
    await fs.writeFile(outputPath, JSON.stringify(finalFanarts, null, 2));

    console.log(`✨ Sucesso! ${finalFanarts.length} fanarts salvas em ${outputPath}`);

  } catch (error) {
    console.error('❌ Erro ao buscar fanarts:', error);
  } finally {
    await client.destroy();
    process.exit(0);
  }
});

client.login(TOKEN);
