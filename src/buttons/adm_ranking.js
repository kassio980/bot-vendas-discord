
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

module.exports = { id: 'MINION_STORE_ranking', async execute(c,i) {
  if(typeof b.topClientes !== 'function') return await i.update({ content:'❌ Função topClientes não existe no banco.js', components:[] });
  await i.update({ embeds:[emb.ranking(b.topClientes(10))], components:[painelNivel()] });
}};