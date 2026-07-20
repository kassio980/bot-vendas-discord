
const { ActionRowBuilder, StringSelectMenuBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const emb = require('../../embeds');
const baseId = 'MINION_STORE_';

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

module.exports = { id: 'MINION_STORE_config', async execute(c,i) {
  const sel = new ActionRowBuilder().addComponents(new StringSelectMenuBuilder()
    .setCustomId('sel_config_acao')
    .setPlaceholder('Configuração do sistema')
    .addOptions([
      {label:'📢 Canais e Categorias',value:'canais'},
      {label:'💳 Dados do PIX',value:'pix'},
      {label:'👑 Equipe e Permissoes',value:'equipe'},
      {label:'🔗 Integrações Render/Zap',value:'integracoes'}
    ]));
  await i.update({ embeds:[emb.info('⚙️ CONFIGURAÇÕES GERAIS', 'Todas configurações do sistema centralizadas aqui')], components:[painelPrincipal(), painelSecundario(), sel] });
}};