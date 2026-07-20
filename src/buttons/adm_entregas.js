
const { embeds } = require('../../embeds');
const { ler } = require('../../banco');
module.exports = { id: 'adm_entregas', async execute(c,i) {
  const prontos = (ler('pedidos')||[]).filter(x=>x.status==='PAGO').length;
  await i.update({ embeds:[embeds.info('🚚 ENTREGAS', 'Pedidos prontos para entrega: **'+prontos+'**\nSelecione o pedido e clique em **ENTREGAR**')], components:[painelPrincipal(), painelSecundario()] });
}};