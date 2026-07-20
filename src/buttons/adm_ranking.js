
const { embeds } = require('../../embeds');
const { topClientes } = require('../../banco');
module.exports = { id: 'adm_ranking', async execute(c,i) {
  await i.update({ embeds:[embeds.ranking(topClientes(10))], components:[painelNivel()] });
}};