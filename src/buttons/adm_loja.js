const {ActionRowBuilder,ButtonBuilder,ButtonStyle,EmbedBuilder}=require('discord.js');
module.exports={id:'adm_loja',async execute(c,i){
const e=new EmbedBuilder().setColor(0x9B59B6).setTitle('🛒 CONFIGURAR LOJA').setDescription('Personalize a aparencia e mensagens da sua loja.');
const r=new ActionRowBuilder().addComponents(
new ButtonBuilder().setCustomId('cfg_msgs').setLabel('✏️ Editar mensagem').setStyle(1),
new ButtonBuilder().setCustomId('cfg_perms').setLabel('🖼️ Imagem banner').setStyle(1));
await i.update({embeds:[e],components:[r]})}};
