const {SlashCommandBuilder,ActionRowBuilder,ButtonBuilder,ButtonStyle,EmbedBuilder}=require('discord.js');
const {ler}=require('../../banco');

module.exports={
data:new SlashCommandBuilder().setName('painel').setDescription('Painel de Administrador'),

async execute(c,i){
// 👇 VERIFICACAO DIRETA PELA VARIAVEL DO RENDER — 100% CONFIAVEL
const DONO=process.env.DONO_ID||'';
const cfg=ler('config.json');
const donos=cfg.donos||[];
const adms=cfg.admsAutorizados||[];
const eu=i.user.id;

// LIBERA SE FOR DONO NA VARIAVEL OU NO BANCO
const PERMITIDO = (DONO && eu===DONO) || donos.includes(eu) || adms.some(x=>x.id===eu&&x.ativo);

if(!PERMITIDO){
return i.reply({content:'❌ Acesso negado!\n\nSeu ID: `'+eu+'`\nDono configurado: `'+DONO+'`',ephemeral:true})
}

const e=new EmbedBuilder().setColor(0x9B59B6).setTitle('⚙️ PAINEL DE CONTROLE').setFooter({text:'ID: '+eu});
const r=new ActionRowBuilder().addComponents(
new ButtonBuilder().setCustomId('adm_produtos').setLabel('Produtos').setStyle(2),
new ButtonBuilder().setCustomId('adm_pedidos').setLabel('Pedidos').setStyle(2),
new ButtonBuilder().setCustomId('adm_pagamentos').setLabel('Pagamentos').setStyle(2),
new ButtonBuilder().setCustomId('adm_entregas').setLabel('Entregas').setStyle(2),
new ButtonBuilder().setCustomId('adm_config').setLabel('Config').setStyle(3));

await i.reply({embeds:[e],components:[r],ephemeral:true})
}};
