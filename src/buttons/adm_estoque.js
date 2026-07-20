
const { ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const emb = require('../../embeds');
const b = require('../../banco');
const baseId = 'MINION_STORE_';

function painelNivel() {
  return new ActionRowBuilder().addComponents(
    new ButtonBuilder().setCustomId(baseId+'nivel').setLabel('📊 Nivel Loja').setStyle(ButtonStyle.Primary),
    new ButtonBuilder().setCustomId(baseId+'ranking').setLabel('🏅 Ranking').setStyle(ButtonStyle.Secondary),
    new ButtonBuilder().setCustomId(baseId+'voz').setLabel('🔊 Voz').setStyle(ButtonStyle.Secondary),
    new ButtonBuilder().setCustomId(baseId+'estoque').setLabel('📦 Estoque').setStyle(ButtonStyle.Secondary)
  );
}

module.exports = { id: 'MINION_STORE_estoque', async execute(c,i) {
  const baixo = (Array.isArray(b.ler('produtos')) ? b.ler('produtos') : []).filter(function(x){ return x.estoque>0 && x.estoque<=5; }).length;
  await i.update({ embeds:[emb.info('📦 CONTROLE DE ESTOQUE', 'Produtos com estoque baixo: **'+baixo+'**')], components:[painelNivel()] });
}};