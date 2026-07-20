const { SlashCommandBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, StringSelectMenuBuilder, EmbedBuilder } = require('discord.js');
const b = require('../../banco');
const emb = require('../../embeds');
const baseId = 'MINION_STORE_';

// ============================================================
// 🎨 COMPONENTES PADRÃO DO SISTEMA
// ============================================================
function painelPrincipal() {
  return new ActionRowBuilder().addComponents(
    new ButtonBuilder().setCustomId(baseId+'produtos').setLabel('📦 Produtos').setStyle(ButtonStyle.Secondary),
    new ButtonBuilder().setCustomId(baseId+'pedidos').setLabel('📋 Pedidos').setStyle(ButtonStyle.Secondary),
    new ButtonBuilder().setCustomId(baseId+'pagamentos').setLabel('💳 Pagamentos').setStyle(ButtonStyle.Secondary),
    new ButtonBuilder().setCustomId(baseId+'entregas').setLabel('🚚 Entregas').setStyle(ButtonStyle.Secondary)
  );
}

function painelSecundario() {
  return new ActionRowBuilder().addComponents(
    new ButtonBuilder().setCustomId(baseId+'cupons').setLabel('🎟️ Cupons').setStyle(ButtonStyle.Secondary),
    new ButtonBuilder().setCustomId(baseId+'carteira').setLabel('💵 Carteira').setStyle(ButtonStyle.Secondary),
    new ButtonBuilder().setCustomId(baseId+'sorteio').setLabel('🎁 Sorteio').setStyle(ButtonStyle.Secondary),
    new ButtonBuilder().setCustomId(baseId+'config').setLabel('⚙️ Config').setStyle(ButtonStyle.Primary)
  );
}

function painelNivel() {
  return new ActionRowBuilder().addComponents(
    new ButtonBuilder().setCustomId(baseId+'nivel').setLabel('📊 Nível Loja').setStyle(ButtonStyle.Primary),
    new ButtonBuilder().setCustomId(baseId+'ranking').setLabel('🏅 Ranking').setStyle(ButtonStyle.Secondary),
    new ButtonBuilder().setCustomId(baseId+'voz').setLabel('🔊 Voz').setStyle(ButtonStyle.Secondary),
    new ButtonBuilder().setCustomId(baseId+'estoque').setLabel('📦 Estoque').setStyle(ButtonStyle.Secondary)
  );
}

// ============================================================
// 🚪 COMANDO PRINCIPAL
// ============================================================
module.exports = {
  data: new SlashCommandBuilder()
    .setName('painel')
    .setDescription('Abre o painel administrativo da MINION STORE'),

  async execute(client, interaction) {
    try {
      // ✅ CARREGA TODOS DADOS COM VALOR PADRÃO SEGURO
      const cfg = b.ler('config') || {};
      const lojaCfg = cfg.loja || { nome: 'MINION STORE', cor: '#FFC107' };
      const produtos = Array.isArray(b.ler('produtos')) ? b.ler('produtos') : [];
      const pedidos = Array.isArray(b.ler('pedidos')) ? b.ler('pedidos') : [];
      const progresso = typeof b.calcularProgresso === 'function' ? b.calcularProgresso() : {};
      const topClientes = typeof b.topClientes === 'function' ? b.topClientes(5) : [];
      const conquistas = typeof b.verificarConquistas === 'function' ? b.verificarConquistas(interaction.user.id) : [];

      // ✅ CONTADORES SEGUROS
      const aguardandoPagamento = pedidos.filter(p => p?.status === 'AGUARDANDO').length;
      const pedidosPagos = pedidos.filter(p => p?.status === 'PAGO').length;
      const pedidosEntregues = pedidos.filter(p => p?.status === 'ENTREGUE').length;
      const estoqueBaixo = produtos.filter(p => p?.estoque > 0 && p?.estoque <= 5).length;

      // ✅ EMBED PRINCIPAL SEM ERROS
      const embedPrincipal = new EmbedBuilder()
        .setTitle(`💛 ${lojaCfg.nome} 💛`)
        .setColor(lojaCfg.cor)
        .setThumbnail(client.user.displayAvatarURL({ dynamic: true }))
        .setDescription(`
📊 **RESUMO GERAL DA LOJA**
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📦 Produtos cadastrados: **${produtos.length}**
⏳ Aguardando pagamento: **${aguardandoPagamento}**
✅ Pagos aguardando entrega: **${pedidosPagos}**
🚚 Pedidos já entregues: **${pedidosEntregues}**
⚠️ Produtos com estoque baixo: **${estoqueBaixo}**

📈 **Nível atual:** ${progresso?.loja?.nome || 'LOJA INICIANTE'}
📊 Progresso para próximo nível: **${progresso?.progresso || 0}%**
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Clique nos botões abaixo para gerenciar cada área:
        `)
        .setFooter({ text: `${lojaCfg.nome} • Versão Pro 3.0`, iconURL: client.user.displayAvatarURL() })
        .setTimestamp();

      // ✅ ENVIA TUDO JUNTO
      await interaction.reply({
        embeds: [embedPrincipal],
        components: [painelPrincipal(), painelSecundario(), painelNivel()],
        ephemeral: true
      });

    } catch (erro) {
      console.error('❌ ERRO NO PAINEL:', erro);
      await interaction.reply({
        embeds: [emb.erro('Não foi possível carregar o painel, verifique os logs do sistema.')],
        ephemeral: true
      });
    }
  }
};
