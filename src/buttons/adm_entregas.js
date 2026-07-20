const {EmbedBuilder}=require('discord.js');const {ler}=require('../../banco');
module.exports={id:'adm_entregas',async execute(c,i){
const p=(ler('pedidos')||[]).filter(x=>x.status==='ENTREGUE').slice(0,15);
const total=p.reduce((s,x)=>s+x.valor,0);
const e=new EmbedBuilder().setColor(0x27AE60).setTitle('🚚 RELATORIO DE ENTREGAS').addFields(
{name:'📊 Total entregue',value:'**R$ '+total.toFixed(2)+'**',inline:true},
{name:'📦 Quantidade',value:String(p.length),inline:true},
{name:'✅ Ultimas entregas',value:p.length?p.map(x=>'#'+x.id+' • '+x.produtoNome+' • R$'+x.valor.toFixed(2)).join('\n'):'Nenhuma ainda',inline:false});
await i.update({embeds:[e],components:[]})}};
