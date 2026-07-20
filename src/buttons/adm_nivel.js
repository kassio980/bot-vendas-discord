
const { embeds } = require('../../embeds');
const { calcularProgresso } = require('../../banco');
module.exports = { id: 'adm_nivel', async execute(c,i) {
  const res = calcularProgresso();
  await i.update({ embeds:[embeds.nivelLoja(res, res.loja)], components:[painelNivel()] });
}};