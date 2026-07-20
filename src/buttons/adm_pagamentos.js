
const { embeds } = require('../../embeds');
const { ler } = require('../../banco');
module.exports = { id: 'adm_pagamentos', async execute(c,i) {
  const pendentes = (ler('pedidos')||[]).filter(x=>x.status==='AGUARDANDO').length;
  await i.update({ embeds:[embeds.info('💳 GERENCIAR PAGAMENTOS', 'Pagamentos aguardando aprovação: **'+pendentes+'**\nClique em um pedido para aprovar ou recusar')], components:[painelPrincipal(), painelSecundario()] });
}};