const {ActionRowBuilder,ButtonBuilder,ButtonStyle,EmbedBuilder}=require('discord.js');
module.exports={id:'adm_cupons',async execute(c,i){
const e=new EmbedBuilder().setColor(0xE67E22).setTitle('🎟️ SISTEMA DE CUPONS').setDescription('Crie cupons de desconto para seus clientes!');
const r=new ActionRowBuilder().addComponents(
new ButtonBuilder().setCustomId('cup_criar').setLabel('➕ Criar').setStyle(3),
new ButtonBuilder().setCustomId('cup_editar').setLabel('✏️ Editar').setStyle(1),
new ButtonBuilder().setCustomId('cup_remover').setLabel('🗑️ Remover').setStyle(4),
new ButtonBuilder().setCustomId('cup_stats').setLabel('📊 Stats').setStyle(2));
await i.update({embeds:[e],components:[r]})}};
