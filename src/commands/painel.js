const {SlashCommandBuilder,PermissionFlagsBits,ActionRowBuilder,ButtonBuilder,ButtonStyle,EmbedBuilder}=require('discord.js');
module.exports={data:new SlashCommandBuilder().setName('painel').setDescription('🛡️ Painel ADM').setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
async execute(c,i){
const e=new EmbedBuilder().setColor(0x9B59B6).setTitle('👑 PAINEL ADMINISTRATIVO').setTimestamp();
const r1=new ActionRowBuilder().addComponents(
new ButtonBuilder().setCustomId('adm_produtos').setLabel('📦 Produtos').setStyle(1),
new ButtonBuilder().setCustomId('adm_pagamentos').setLabel('💳 Pagamentos').setStyle(3),
new ButtonBuilder().setCustomId('adm_loja').setLabel('🛍️ Loja').setStyle(2),
new ButtonBuilder().setCustomId('adm_pedidos').setLabel('📋 Pedidos').setStyle(1));
const r2=new ActionRowBuilder().addComponents(
new ButtonBuilder().setCustomId('adm_entregas').setLabel('🚚 Entregas').setStyle(3),
new ButtonBuilder().setCustomId('adm_vendas').setLabel('📊 Vendas').setStyle(1),
new ButtonBuilder().setCustomId('adm_carteira').setLabel('💰 Carteira').setStyle(3),
new ButtonBuilder().setCustomId('adm_cupons').setLabel('🎟️ Cupons').setStyle(2));
const r3=new ActionRowBuilder().addComponents(
new ButtonBuilder().setCustomId('adm_config').setLabel('⚙️ Config').setStyle(4),
new ButtonBuilder().setCustomId('adm_logs').setLabel('📝 Logs').setStyle(2));
await i.reply({embeds:[e],components:[r1,r2,r3],ephemeral:true})}};
