const { ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const emb = require('../../embeds');
const b = require('../../banco');
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

module.exports = {
  id: 'MINION_STORE_carteira',
  async execute(c,i) {
    const arr = Array.isArray(b.ler('carteira')) ? b.ler('carteira') : [];
    const total = arr.reduce(function(s,x){ return s + (x.saldo||0); }, 0);
    await i.update({
      embeds:[emb.info('💵 CARTEIRA DE CLIENTES', 'Saldo total distribuido: **R$ '+total.toFixed(2).replace('.',',')+'**\nVocê pode adicionar ou remover saldo de qualquer cliente')],
      components:[painelPrincipal(), painelSecundario()]
    });
  }
};
