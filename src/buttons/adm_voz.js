
const { ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const emb = require('../../embeds');
const v = require('../../voz');
const baseId = 'MINION_STORE_';

function painelNivel() {
  return new ActionRowBuilder().addComponents(
    new ButtonBuilder().setCustomId(baseId+'nivel').setLabel('📊 Nivel Loja').setStyle(ButtonStyle.Primary),
    new ButtonBuilder().setCustomId(baseId+'ranking').setLabel('🏅 Ranking').setStyle(ButtonStyle.Secondary),
    new ButtonBuilder().setCustomId(baseId+'voz').setLabel('🔊 Voz').setStyle(ButtonStyle.Secondary),
    new ButtonBuilder().setCustomId(baseId+'estoque').setLabel('📦 Estoque').setStyle(ButtonStyle.Secondary)
  );
}

module.exports = { id: 'MINION_STORE_voz', async execute(c,i) {
  if(typeof v.iniciarMonitorVoz === 'function') v.iniciarMonitorVoz(c);
  const st = typeof v.statusVoz === 'function' ? v.statusVoz() : {ok:false, mensagem:'Sistema de voz desativado'};
  await i.update({ embeds:[emb.info('🔊 CANAL DE VOZ PERMANENTE', st.ok ? '✅ Conectado em <#'+st.canal+'>\nBot **NUNCA** sai sozinho' : '🔁 Reconectando automaticamente...')], components:[painelNivel()] });
}};