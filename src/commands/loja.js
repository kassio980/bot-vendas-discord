const {SlashCommandBuilder,ActionRowBuilder,ButtonBuilder,ButtonStyle,EmbedBuilder}=require('discord.js');
const {ler}=require('../utils/banco');
module.exports={data:new SlashCommandBuilder().setName('loja').setDescription('🛒 Abrir loja'),
async execute(c,i){
const cfg=ler('config.json')||{},prods=(ler('produtos.json')||[]).filter(p=>p.estoque>0||p.estoque===-1);
const e=new EmbedBuilder().setColor(0x9B59B6).setTitle('🛒 LOJA').setDescription(cfg.mensagem_loja||'Bem-vindo!')
.addFields({name:'📦 Produtos',value:String(prods.length),inline:true},{name:'💳 Pagamento',value:'PIX',inline:true});
if(cfg.imagem_loja)e.setImage(cfg.imagem_loja);
const r1=new ActionRowBuilder().addComponents(
new ButtonBuilder().setCustomId('cli_produtos').setLabel('📦 Produtos').setStyle(1),
new ButtonBuilder().setCustomId('cli_pedidos').setLabel('📋 Pedidos').setStyle(2),
new ButtonBuilder().setCustomId('cli_carteira').setLabel('💰 Carteira').setStyle(3),
new ButtonBuilder().setCustomId('cli_cupons').setLabel('🎟️ Cupons').setStyle(1));
const r2=new ActionRowBuilder().addComponents(new ButtonBuilder().setCustomId('cli_suporte').setLabel('🆘 Suporte').setStyle(4));
await i.reply({embeds:[e],components:[r1,r2]})}};
