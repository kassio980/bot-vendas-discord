const {ActionRowBuilder,ButtonBuilder,ButtonStyle,EmbedBuilder}=require('discord.js');
module.exports={id:'adm_produtos',async execute(c,i){
const e=new EmbedBuilder().setColor(0x3498DB).setTitle('📦 PRODUTOS');
const r=new ActionRowBuilder().addComponents(
new ButtonBuilder().setCustomId('produto_criar').setLabel('➕ Criar').setStyle(3),
new ButtonBuilder().setCustomId('produto_lista').setLabel('📋 Lista').setStyle(1),
new ButtonBuilder().setCustomId('produto_editar').setLabel('✏️ Editar').setStyle(1),
new ButtonBuilder().setCustomId('produto_remover').setLabel('🗑️ Remover').setStyle(4),
new ButtonBuilder().setCustomId('produto_estoque').setLabel('📦 Estoque').setStyle(2));
await i.update({embeds:[e],components:[r]})}};
