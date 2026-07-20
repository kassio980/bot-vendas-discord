const {SlashCommandBuilder,ActionRowBuilder,ButtonBuilder,ButtonStyle}=require('discord.js');
const {painel,erro}=require('../../embeds');
const {ler}=require('../../banco');
module.exports={data:new SlashCommandBuilder().setName('painel').setDescription('⚙️ Painel ADM'),
async execute(c,i){
const DONO=process.env.DONO_ID||'';const cfg=ler('config');
const PERM=(DONO&&i.user.id===DONO)||(cfg.donos||[]).includes(i.user.id)||(cfg.admsAutorizados||[]).some(x=>x.id===i.user.id&&x.ativo);
if(!PERM)return i.reply({embeds:[erro('ACESSO NEGADO','Voce nao tem permissao para acessar o painel administrativo.\n\nSeu ID: `'+i.user.id+'`')],ephemeral:true});
const r=new ActionRowBuilder().addComponents(
new ButtonBuilder().setCustomId('adm_produtos').setLabel('📦 Produtos').setStyle(2),
new ButtonBuilder().setCustomId('adm_pedidos').setLabel('📋 Pedidos').setStyle(2),
new ButtonBuilder().setCustomId('adm_pagamentos').setLabel('💳 Pagamentos').setStyle(2),
new ButtonBuilder().setCustomId('adm_entregas').setLabel('🚚 Entregas').setStyle(2));
const r2=new ActionRowBuilder().addComponents(
new ButtonBuilder().setCustomId('adm_cupons').setLabel('🎟️ Cupons').setStyle(2),
new ButtonBuilder().setCustomId('adm_carteira').setLabel('💵 Carteira').setStyle(2),
new ButtonBuilder().setCustomId('adm_config').setLabel('⚙️ Config').setStyle(3),
new ButtonBuilder().setCustomId('adm_loja').setLabel('🛒 Loja').setStyle(3));
await i.reply({embeds:[painel()],components:[r,r2],ephemeral:true})}};
