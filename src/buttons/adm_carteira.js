
const { embeds } = require('../../embeds');
const { ler } = require('../../banco');
module.exports = { id: 'adm_carteira', async execute(c,i) {
  const total = (ler('carteira')||[]).reduce((s,x)=>s+(x.saldo||0),0);
  await i.update({ embeds:[embeds.info('💵 CARTEIRA DE CLIENTES', 'Saldo total distribuido: **R$ '+total.toFixed(2).replace('.',',')+'**\nVocê pode adicionar ou remover saldo de qualquer cliente')], components:[painelPrincipal(), painelSecundario()] });
}};