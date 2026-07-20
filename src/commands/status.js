const {SlashCommandBuilder}=require('discord.js');const {statusBot}=require('../../embeds');const {ler}=require('../../banco');const {statusVoz}=require('../../voz');
function up(t){const s=Math.floor(t/1000);const d=Math.floor(s/86400),h=Math.floor((s%86400)/3600),m=Math.floor((s%3600)/60);return(d?d+'d ':'')+h+'h '+m+'m '+(s%60)+'s'}
module.exports={data:new SlashCommandBuilder().setName('status').setDescription('🤖 Status completo do sistema'),
async execute(cli,i){const peds=ler('pedidos')||[];const prods=ler('produtos')||[];const voz=statusVoz();const ent=peds.filter(x=>x.status==='ENTREGUE');
await i.reply({embeds:[statusBot({uptime:up(cli.uptime),guilds:cli.guilds.cache.size,users:cli.users.cache.size,produtos:prods.length,pedidos:peds.length,entregues:ent.length,faturamento:ent.reduce((s,x)=>s+x.valor,0),voz:voz.ok?voz.canal:null,memoria:Math.round(process.memoryUsage().heapUsed/1024/1024)+'MB',ping:cli.ws.ping})]})}};
