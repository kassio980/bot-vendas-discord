const {ModalBuilder,TextInputBuilder,TextInputStyle,ActionRowBuilder}=require('discord.js');
module.exports={id:'usar_cupom',async execute(c,i){
const m=new ModalBuilder().setCustomId('modal_cupom_teste').setTitle('🎟️ TESTAR CUPOM');
m.addComponents(new ActionRowBuilder().addComponents(new TextInputBuilder().setCustomId('codigo').setLabel('Digite o codigo').setPlaceholder('PRIMEIRACOMPRA10').setStyle(TextInputStyle.Short).setRequired(true)));
await i.showModal(m)}};
