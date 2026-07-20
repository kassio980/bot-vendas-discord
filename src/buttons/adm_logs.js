const {EmbedBuilder}=require('discord.js');const {ler}=require('../../banco');
module.exports={id: 'MINION_STORE_logs',async execute(c,i){
const l=ler('logs')||{};const ultimos=[];
['alteracoes','pagamentos','entregas','saques','vendas'].forEach(t=>{(l[t]||[]).slice(0,3).forEach(x=>ultimos.push({t,...x}))});
ultimos.sort((a,b)=>new Date(b.data)-new Date(a.data));
const e=new EmbedBuilder().setColor(0x34495E).setTitle('📝 ULTIMOS 15 REGISTROS').setDescription(ultimos.length?ultimos.slice(0,15).map(x=>'`'+new Date(x.data).toLocaleString('pt-BR')+'` • **'+x.t.toUpperCase()+'** • '+JSON.stringify(x).slice(0,80)).join('\n'):'Sem registros ainda.');
await i.update({embeds:[e],components:[]})}};
