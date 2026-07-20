const {EmbedBuilder}=require('discord.js');const {ler}=require('../../banco');
module.exports={id:'adm_pagamentos',async execute(c,i){
const p=(ler('pedidos')||[]).filter(x=>x.status==='PAGO'||x.status==='APROVADO').slice(0,15);
const total=p.reduce((s,x)=>s+x.valor,0);
const e=new EmbedBuilder().setColor(0x1ABC9C).setTitle('💳 RELATORIO DE PAGAMENTOS').addFields(
{name:'📊 Total recebido',value:'**R$ '+total.toFixed(2)+'**',inline:true},
{name:'🧾 Quantidade',value:String(p.length),inline:true},
{name:'📋 Ultimos pagamentos',value:p.length?p.map(x=>'#'+x.id+' • R$'+x.valor.toFixed(2)+' • <@'+x.clienteId+'>').join('\n'):'Nenhum ainda',inline:false});
await i.update({embeds:[e],components:[]})}};
