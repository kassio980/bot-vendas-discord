const {EmbedBuilder}=require('discord.js');
const S=(c,t,d)=>new EmbedBuilder().setColor(c).setTitle(t).setDescription(d).setTimestamp();
module.exports={
sucesso:(t,d)=>S(0x2ECC71,`✅ ${t}`,d),
erro:(t,d)=>S(0xE74C3C,`❌ ${t}`,d),
info:(t,d)=>S(0x3498DB,`ℹ️ ${t}`,d),
aviso:(t,d)=>S(0xF39C12,`⚠️ ${t}`,d),
pedido:p=>{const C={AGUARDANDO:0xF39C12,PAGO:0x3498DB,ENTREGUE:0x2ECC71,CANCELADO:0xE74C3C,APROVADO:0x9B59B6};
return new EmbedBuilder().setColor(C[p.status]||0x95A5A6).setTitle(`📦 PEDIDO #${p.id}`)
.addFields({name:'👤 Cliente',value:`<@${p.clienteId}>`,inline:true},{name:'🛍️ Produto',value:p.produtoNome,inline:true},
{name:'💰 Valor',value:`R$ ${p.valor.toFixed(2)}`,inline:true},{name:'📊 Status',value:`\`${p.status}\``,inline:true},
{name:'📅 Data',value:new Date(p.data).toLocaleString('pt-BR'),inline:true}).setTimestamp()}};
