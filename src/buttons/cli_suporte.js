
const { ModalBuilder, TextInputBuilder, TextInputStyle, ActionRowBuilder } = require('discord.js');
module.exports = { id: 'cli_suporte', async execute(c,i) {
  const m = new ModalBuilder().setCustomId('modal_suporte_abrir').setTitle('📩 Abrir Chamado');
  m.addComponents(
    new ActionRowBuilder().addComponents(new TextInputBuilder().setCustomId('assunto').setLabel('Assunto').setStyle(TextInputStyle.Short).setRequired(true)),
    new ActionRowBuilder().addComponents(new TextInputBuilder().setCustomId('mensagem').setLabel('Descreva seu problema').setStyle(TextInputStyle.Paragraph).setRequired(true))
  );
  await i.showModal(m);
}};