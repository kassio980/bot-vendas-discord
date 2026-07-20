const{ActionRowBuilder,StringSelectMenuBuilder,EmbedBuilder}=require('discord.js');const{ler}=require('../../banco');
module.exports={id:'cli_produtos',async execute(c,i){
const p=(ler('produtos.json')||[]).filter(x=>x.estoque>0||x.estoque===-1);
if(!p.length)return i.update({embeds:[{color:0xE74C3C,title:'❌ LOJA VAZIA'}],components:[]});
const e=new EmbedBuilder().setColor(0x9B59B6).setTitle('📦 PRODUTOS');
const r=new ActionRowBuilder().addComponents(new StringSelectMenuBuilder().setCustomId('sel_comprar').setPlaceholder('Selecione para comprar...').addOptions(p.slice(0,25).map(x=>({label:x.nome,description:`R$${x.preco.toFixed(2)}`,value:x.id}))));
await i.update({embeds:[e],components:[r]})}};
