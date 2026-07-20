const {SlashCommandBuilder,ActionRowBuilder,ButtonBuilder,ButtonStyle}=require('discord.js');
const {loja}=require('../../embeds');
module.exports={data:new SlashCommandBuilder().setName('loja').setDescription('🛒 Abrir loja oficial'),
async execute(c,i){
const r=new ActionRowBuilder().addComponents(
new ButtonBuilder().setCustomId('cli_produtos').setLabel('📦 Ver Produtos').setStyle(3),
new ButtonBuilder().setCustomId('cli_pedidos').setLabel('📋 Meus Pedidos').setStyle(1),
new ButtonBuilder().setCustomId('cli_carteira').setLabel('💰 Carteira').setStyle(2),
new ButtonBuilder().setCustomId('cli_suporte').setLabel('🆘 Suporte').setStyle(4));
await i.reply({embeds:[loja()],components:[r]})}};
