const {SlashCommandBuilder,ActionRowBuilder,ButtonBuilder,ButtonStyle,EmbedBuilder}=require('discord.js');
const {ler}=require('../../banco');
module.exports={
data:new SlashCommandBuilder().setName('painel').setDescription('⚙️ Painel de Administrador'),
async execute(c,i){
const cfg=ler('config.json');const donos=cfg.donos||[];const adms=cfg.admsAutorizados||[];
if(!donos.includes(i.user.id) && !adms.some(x=>x.id===i.user.id&&x.ativo))return i.reply({content:'❌ Acesso negado',ephemeral:true});
const e=new EmbedBuilder().setColor(0x9B59B6).setTitle('⚙️ PAINEL DE CONTROLE');
const r=new ActionRowBuilder().addComponents(
new ButtonBuilder().setCustomId('adm_produtos').setLabel('📦 Produtos').setStyle(2),
new ButtonBuilder().setCustomId('adm_pedidos').setLabel('📋 Pedidos').setStyle(2),
new ButtonBuilder().setCustomId('adm_pagamentos').setLabel('💳 Pagamentos').setStyle(2),
new ButtonBuilder().setCustomId('adm_entregas').setLabel('🚚 Entregas').setStyle(2),
new ButtonBuilder().setCustomId('adm_config').setLabel('⚙️ Configurações').setStyle(3));
await i.reply({embeds:[e],components:[r],ephemeral:true})}};
