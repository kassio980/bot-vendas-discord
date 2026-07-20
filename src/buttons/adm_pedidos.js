
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

module.exports = { id: 'MINION_STORE_pedidos', async execute(c,i) {
  const todos = Array.isArray(b.ler('pedidos')) ? b.ler('pedidos') : [];
  const aguardando = todos.filter(function(x){ return x.status === 'AGUARDANDO'; }).length;
  const pagos = todos.filter(function(x){ return x.status === 'PAGO'; }).length;
  const entregues = todos.filter(function(x){ return x.status === 'ENTREGUE'; }).length;
  const sel = new ActionRowBuilder().addComponents(new StringSelectMenuBuilder()
    .setCustomId('sel_pedido_filtro')
    .setPlaceholder('Filtrar por status')
    .addOptions([
      {label:'🔴 Aguardando ('+aguardando+')',value:'AGUARDANDO'},
      {label:'🟡 Pagos ('+pagos+')',value:'PAGO'},
      {label:'🟢 Entregues ('+entregues+')',value:'ENTREGUE'},
      {label:'📜 Todos ('+todos.length+')',value:'TODOS'}
    ]));
  await i.update({ embeds:[emb.info('📋 GERENCIAR PEDIDOS', 'Total de pedidos registrados: **'+todos.length+'**')], components:[painelPrincipal(), painelSecundario(), sel] });
}};