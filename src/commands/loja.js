const {SlashCommandBuilder,ActionRowBuilder,ButtonBuilder,ButtonStyle,EmbedBuilder}=require('discord.js');
const {ler}=require('../../banco');
module.exports={
data:new SlashCommandBuilder().setName('loja').setDescription('🛒 Ver produtos da loja'),
async execute(c,i){
const cfg=ler('config.json');
const e=new EmbedBuilder().setColor(cfg.cor||0x9B59B6).setTitle('🛒 MINHA LOJA').setDescription(cfg.mensagem_loja||'Escolha abaixo o que você quer comprar');
const r=new ActionRowBuilder().addComponents(
new ButtonBuilder().setCustomId('cli_produtos').setLabel('📦 Ver Produtos').setStyle(3),
new ButtonBuilder().setCustomId('cli_pedidos').setLabel('📋 Meus Pedidos').setStyle(1),
new ButtonBuilder().setCustomId('cli_carteira').setLabel('💰 Carteira').setStyle(2),
new ButtonBuilder().setCustomId('cli_suporte').setLabel('🆘 Suporte').setStyle(4));
if(cfg.imagem_loja)e.setImage(cfg.imagem_loja);
await i.reply({embeds:[e],components:[r],ephemeral:false})}};
