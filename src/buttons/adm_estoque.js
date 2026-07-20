
const { embeds } = require('../../embeds');
const { ler } = require('../../banco');
module.exports = { id: 'adm_estoque', async execute(c,i) {
  const baixo = (ler('produtos')||[]).filter(x=>x.estoque>0 && x.estoque<=5).length;
  await i.update({ embeds:[embeds.info('📦 CONTROLE DE ESTOQUE', 'Produtos com estoque baixo: **'+baixo+'**')], components:[painelPrincipal(), painelSecundario()] });
}};