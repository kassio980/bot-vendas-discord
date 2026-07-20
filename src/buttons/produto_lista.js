const {EmbedBuilder}=require('discord.js');const{ler}=require('../../banco');
module.exports={id:'produto_lista',async execute(c,i){
const p=ler('produtos.json')||[];
if(!p.length)return i.update({embeds:[{color:0xE74C3C,title:'❌ NENHUM PRODUTO'}],components:[]});
const e=new EmbedBuilder().setColor(0x3498DB).setTitle('📋 LISTA DE PRODUTOS');
p.forEach(x=>e.addFields({name:`🆔 ${x.id}`,value:`**${x.nome}**\nR$ ${x.preco.toFixed(2)} | Est:${x.estoque===-1?'∞':x.estoque} | ${x.tipoEntrega}`,inline:false}));
await i.update({embeds:[e],components:[]})}};
