const {ActionRowBuilder,StringSelectMenuBuilder}=require('discord.js');
const {painelPedidos}=require('../../embeds');
const {ler}=require('../../banco');
module.exports={id:'adm_pedidos',async execute(c,i){
const p=ler('pedidos')||[];
const o=p.slice(0,25).map(x=>({label:'#'+x.id+' '+x.produtoNome.slice(0,30),description:'R$'+x.valor.toFixed(2)+' • '+x.status,value:x.id}));
const r=new ActionRowBuilder().addComponents(new StringSelectMenuBuilder().setCustomId('sel_pedido').setPlaceholder('Selecione um pedido...').addOptions(o.length?o:[{label:'Nenhum pedido ainda',value:'vazio'}]));
await i.update({embeds:[painelPedidos(p)],components:[r]})}};
