const { ActionRowBuilder, StringSelectMenuBuilder } = require('discord.js');
const { embeds } = require('../../embeds');
const { ler } = require('../../banco');

function painelPrincipal() {
  return new ActionRowBuilder().addComponents(
    new (require('discord.js').ButtonBuilder)().setCustomId('ONLY_STORE_produtos').setLabel('📦 Produtos').setStyle(require('discord.js').ButtonStyle.Secondary),
    new (require('discord.js').ButtonBuilder)().setCustomId('ONLY_STORE_pedidos').setLabel('📋 Pedidos').setStyle(require('discord.js').ButtonStyle.Secondary),
    new (require('discord.js').ButtonBuilder)().setCustomId('ONLY_STORE_pagamentos').setLabel('💳 Pagamentos').setStyle(require('discord.js').ButtonStyle.Secondary),
    new (require('discord.js').ButtonBuilder)().setCustomId('ONLY_STORE_entregas').setLabel('🚚 Entregas').setStyle(require('discord.js').ButtonStyle.Secondary)
  );
}
function painelSecundario() {
  return new ActionRowBuilder().addComponents(
    new (require('discord.js').ButtonBuilder)().setCustomId('ONLY_STORE_cupons').setLabel('🎟️ Cupons').setStyle(require('discord.js').ButtonStyle.Secondary),
    new (require('discord.js').ButtonBuilder)().setCustomId('ONLY_STORE_carteira').setLabel('💵 Carteira').setStyle(require('discord.js').ButtonStyle.Secondary),
    new (require('discord.js').ButtonBuilder)().setCustomId('ONLY_STORE_sorteio').setLabel('🎁 Sorteio').setStyle(require('discord.js').ButtonStyle.Secondary),
    new (require('discord.js').ButtonBuilder)().setCustomId('ONLY_STORE_config').setLabel('⚙️ Config').setStyle(require('discord.js').ButtonStyle.Primary)
  );
}

module.exports = {
  id: 'adm_pedidos',
  async execute(c, i) {
    const todos = ler('pedidos') || [];
    const aguardando = todos.filter(function(x){ return x.status === 'AGUARDANDO'; }).length;
    const pagos = todos.filter(function(x){ return x.status === 'PAGO'; }).length;
    const entregues = todos.filter(function(x){ return x.status === 'ENTREGUE'; }).length;

    const sel = new ActionRowBuilder().addComponents(
      new StringSelectMenuBuilder()
        .setCustomId('sel_pedido_filtro')
        .setPlaceholder('Filtrar por status')
        .addOptions([
          { label: '🔴 Aguardando ('+aguardando+')', value: 'AGUARDANDO' },
          { label: '🟡 Pagos ('+pagos+')', value: 'PAGO' },
          { label: '🟢 Entregues ('+entregues+')', value: 'ENTREGUE' },
          { label: '📜 Todos ('+todos.length+')', value: 'TODOS' }
        ])
    );

    await i.update({
      embeds: [ embeds.info('📋 GERENCIAR PEDIDOS', 'Total de pedidos registrados: **'+todos.length+'**') ],
      components: [ painelPrincipal(), painelSecundario(), sel ]
    });
  }
};
