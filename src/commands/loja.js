const {SlashCommandBuilder,ActionRowBuilder,ButtonBuilder,ButtonStyle,StringSelectMenuBuilder}=require('discord.js');const {produto}=require('../../embeds');const {ler}=require('../../banco');
module.exports={data:new SlashCommandBuilder().setName('loja').setDescription('🛒 Abrir loja oficial'),
async execute(c,i){const p=ler('produtos')||[];const at=p.filter(x=>x.estoque!==0);
if(!at.length)return i.reply({embeds:[require('../../embeds').aviso('SEM PRODUTOS','Estamos abastecendo, volte ja!')]});
const r=new ActionRowBuilder().addComponents(new StringSelectMenuBuilder().setCustomId('sel_comprar').setPlaceholder('🛒 Escolha seu produto...').addOptions(at.slice(0,25).map(x=>({label:x.nome.slice(0,45),description:'R$ '+x.preco.toFixed(2).replace('.',',')+' • '+(x.categoria||'GERAL'),value:x.id,emoji:x.tag==='MAIS_VENDIDO'?'🔥':x.tag==='PROMOCAO'?'⚡':'📦'}))));
const r2=new ActionRowBuilder().addComponents(new ButtonBuilder().setCustomId('cli_pedidos').setLabel('📋 Pedidos').setStyle(1),new ButtonBuilder().setCustomId('cli_carteira').setLabel('💰 Carteira').setStyle(2),new ButtonBuilder().setCustomId('usar_cupom').setLabel('🎟️ Cupom').setStyle(2),new ButtonBuilder().setCustomId('cli_suporte').setLabel('🆘 Suporte').setStyle(4));
const dest=at.filter(x=>x.destaque||x.tag==='MAIS_VENDIDO').slice(0,3);const emb=dest.length?dest.map(x=>produto(x)):[produto(at[0])];
await i.reply({content:'# 🛒 **💛 MINION STORE • LOJA OFICIAL**\n👇 Selecione abaixo o produto que voce quer comprar:',embeds:emb,components:[r,r2]})}};
