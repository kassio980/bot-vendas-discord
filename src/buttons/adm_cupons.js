
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

module.exports = { id: 'MINION_STORE_cupons', async execute(c,i) {
  const lista = Array.isArray(b.ler('cupons')) ? b.ler('cupons') : [];
  const sel = new ActionRowBuilder().addComponents(new StringSelectMenuBuilder()
    .setCustomId('sel_cupom_acao')
    .setPlaceholder('Ação com cupons')
    .addOptions([
      {label:'➕ Criar Cupom',value:'criar'},
      {label:'✏️ Editar Cupom',value:'editar'},
      {label:'🗑️ Remover Cupom',value:'remover'},
      {label:'📜 Ver Todos',value:'lista'}
    ]));
  await i.update({ embeds:[emb.info('🎟️ GERENCIAR CUPONS', 'Ativos: **'+lista.length+'**')], components:[painelPrincipal(), painelSecundario(), sel] });
}};