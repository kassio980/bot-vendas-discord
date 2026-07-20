
const { embeds } = require('../../embeds');
const { ler } = require('../../banco');
module.exports = { id: 'adm_pedidos', async execute(c,i) {
  const todos = ler('pedidos')||[];
  const aguardando = todos.filter(x=>x.status==='AGUARDANDO').length;
  const pagos = todos.filter(x=>x.status==='PAGO').length;
  const entregues = todos.filter(x=>x.status==='ENTREGUE').length;
  const sel = new ActionRowBuilder().addComponents(new StringSelectMenuBuilder()
    .setCustomId('sel_pedido_filtro')
    .setPlaceholder('Filtrar por status')
    .addOptions([
      {label:'🔴 Aguardando ('+aguardando+')',value='AGUARDANDO'},
      {label:'🟡 Pagos ('+pagos+')',value='PAGO'},
      {label:'🟢 Entregues ('+entregues+')',value='ENTREGUE'},
      {label:'📜 Todos ('+todos.length+')',value='TODOS'}
    ]));
  await i.update({ embeds:[embeds.info('📋 GERENCIAR PEDIDOS', 'Total: **'+todos.length+'**')], components:[painelPrincipal(), painelSecundario(), sel] });
}};