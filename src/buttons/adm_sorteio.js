
const { ActionRowBuilder, StringSelectMenuBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
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

module.exports = { id: 'MINION_STORE_sorteio', async execute(c,i) {
  const lista = Array.isArray(b.ler('sorteios')) ? b.ler('sorteios') : [];
  const ativo = lista.find(function(x){ return x.ativo; });
  const sel = new ActionRowBuilder().addComponents(new StringSelectMenuBuilder()
    .setCustomId('sel_sorteio_acao')
    .setPlaceholder('Ação com sorteios')
    .addOptions([
      {label:'➕ Criar Sorteio',value:'criar'},
      {label:'🏆 Sortear Agora',value:'sortear',disabled:!ativo},
      {label:'❌ Cancelar',value:'cancelar',disabled:!ativo}
    ]));
  await i.update({ embeds:[emb.info('🎁 SORTEIOS', ativo ? '**ATIVO:** '+ativo.premio : 'Sem sorteio ativo no momento')], components:[painelPrincipal(), painelSecundario(), sel] });
}};