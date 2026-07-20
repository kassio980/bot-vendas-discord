const {SlashCommandBuilder}=require('discord.js');
const {statusBot}=require('../../embeds');
const {ler}=require('../../banco');
const {statusVoz}=require('../../voz');
function uptime(t){const s=Math.floor(t/1000);const d=Math.floor(s/86400),h=Math.floor((s%86400)/3600),m=Math.floor((s%3600)/60),seg=s%60;return(d?d+'d ':'')+h+'h '+m+'m '+seg+'s'}
module.exports={data:new SlashCommandBuilder().setName('status').setDescription('🤖 Ver status completo do sistema'),
async execute(cli,i){
const peds=ler('pedidos')||[];const prods=ler('produtos')||[];const voz=statusVoz();
const entregues=peds.filter(x=>x.status==='ENTREGUE');const fat=entregues.reduce((s,x)=>s+x.valor,0);
const avs=ler('avaliacoes')||[];const media=avs.length?(avs.reduce((s,x)=>s+x.nota,0)/avs.length).toFixed(1):'5.0';
const mem=Math.round(process.memoryUsage().heapUsed/1024/1024)+'MB';
await i.reply({embeds:[statusBot({uptime:uptime(cli.uptime),guilds:cli.guilds.cache.size,users:cli.users.cache.size,produtos:prods.length,pedidos:peds.length,entregues:entregues.length,faturamento:fat,voz:voz.conectado?voz.canal:null,memoria:mem,ping:cli.ws.ping,avaliacao:media})],ephemeral:false})}};
