
const { embeds } = require('../../embeds');
const { statusVoz, iniciarMonitorVoz } = require('../../voz');
module.exports = { id: 'adm_voz', async execute(c,i) {
  iniciarMonitorVoz(c);
  const v = statusVoz();
  await i.update({ embeds:[embeds.info('🔊 CANAL DE VOZ PERMANENTE', v.ok ? '✅ Conectado em <#'+v.canal+'>\nBot **NUNCA** sai sozinho' : '🔁 Reconectando automaticamente...')], components:[painelNivel()] });
}};