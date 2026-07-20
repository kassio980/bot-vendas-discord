const {EmbedBuilder}=require('discord.js');const {ler}=require('../../banco');
module.exports={id:'adm_carteira',async execute(c,i){
const car=ler('carteira')||{};const peds=ler('pedidos')||[];
const total=peds.filter(x=>x.status==='ENTREGUE').reduce((s,x)=>s+x.valor,0);
const e=new EmbedBuilder().setColor(0xF1C40F).setTitle('💰 CARTEIRA DA LOJA').addFields(
{name:'💸 Saldo bruto total',value:'**R$ '+total.toFixed(2)+'**',inline:true},
{name:'📦 Pedidos finalizados',value:String(peds.filter(x=>x.status==='ENTREGUE').length),inline:true},
{name:'👥 Clientes unicos',value:String(new Set(peds.map(x=>x.clienteId)).size),inline:true},
{name:'💵 Saldo disponivel',value:'R$ '+(car.saldo||0).toFixed(2),inline:true},
{name:'📤 Saques realizados',value:String((car.saques||[]).length),inline:true});
await i.update({embeds:[e],components:[]})}};
