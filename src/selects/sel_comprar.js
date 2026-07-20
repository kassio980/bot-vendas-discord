const{ActionRowBuilder,ButtonBuilder,ButtonStyle,EmbedBuilder}=require('discord.js');const{ler}=require('../../banco');
module.exports={id:'sel_comprar',async execute(c,i){
const p=(ler('produtos.json')||[]).find(x=>x.id===i.values[0]);if(!p)return;
const e=new EmbedBuilder().setColor(0x3498DB).setTitle(`🛍️ ${p.nome}`).setDescription(p.descricao||'')
.addFields({name:'💰 Preço',value:`R$${p.preco.toFixed(2)}`,inline:true},{name:'📦 Estoque',value:p.estoque===-1?'Ilimitado':String(p.estoque),inline:true},{name:'🚚 Entrega',value:p.tipoEntrega||'codigo',inline:true});
const r=new ActionRowBuilder().addComponents(
new ButtonBuilder().setCustomId(`comprar_${p.id}`).setLabel(`💳 COMPRAR R$${p.preco.toFixed(2)}`).setStyle(3),
new ButtonBuilder().setCustomId('cli_produtos').setLabel('↩️ Voltar').setStyle(2));
await i.update({embeds:[e],components:[r]})}};
