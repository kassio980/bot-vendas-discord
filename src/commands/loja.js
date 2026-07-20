const {SlashCommandBuilder,ActionRowBuilder,ButtonBuilder,ButtonStyle}=require('discord.js');
const {loja}=require('../../embeds');
const {ler}=require('../../banco');
module.exports={data:new SlashCommandBuilder().setName('loja').setDescription('🛒 Acessar a loja'),
async execute(c,i){
const cfg=ler('config');
const r=new ActionRowBuilder().addComponents(
new ButtonBuilder().setCustomId('cli_produtos').setLabel('📦 Ver Produtos').setStyle(3).setEmoji('🛒'),
new ButtonBuilder().setCustomId('cli_pedidos').setLabel('📋 Meus Pedidos').setStyle(1).setEmoji('📋'),
new ButtonBuilder().setCustomId('cli_carteira').setLabel('💰 Carteira').setStyle(2).setEmoji('💰'),
new ButtonBuilder().setCustomId('cli_suporte').setLabel('🆘 Suporte').setStyle(4).setEmoji('🆘'));
await i.reply({embeds:[loja(cfg)],components:[r]})}};
