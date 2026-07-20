const {ActionRowBuilder,StringSelectMenuBuilder,EmbedBuilder}=require('discord.js');const{ler}=require('../../banco');
module.exports={id:'adm_pedidos',async execute(c,i){
const p=ler('pedidos.json')||[];
const e=new EmbedBuilder().setColor(0xF39C12).setTitle('📋 PEDIDOS').addFields(
{name:'🟡 Aguardando',value:String(p.filter(x=>x.status==='AGUARDANDO').length),inline:true},
{name:'🔵 Pagos',value:String(p.filter(x=>x.status==='PAGO').length),inline:true},
{name:'🟢 Entregues',value:String(p.filter(x=>x.status==='ENTREGUE').length),inline:true},
{name:'🔴 Cancelados',value:String(p.filter(x=>x.status==='CANCELADO').length),inline:true});
const o=p.slice(0,25).map(x=>({label:`#${x.id} ${x.produtoNome}`,description:`R$${x.valor.toFixed(2)} ${x.status}`,value:x.id}));
const r=new ActionRowBuilder().addComponents(new StringSelectMenuBuilder().setCustomId('sel_pedido').setPlaceholder('Selecione...').addOptions(o.length?o:[{label:'Nenhum',value:'vazio'}]));
await i.update({embeds:[e],components:[r]})}};
