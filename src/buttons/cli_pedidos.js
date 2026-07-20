const{EmbedBuilder}=require('discord.js');const{ler}=require('../../banco');
module.exports={id:'cli_pedidos',async execute(c,i){
const m=(ler('pedidos.json')||[]).filter(x=>x.clienteId===i.user.id).slice(0,15);
const S={AGUARDANDO:'🟡',PAGO:'🔵',ENTREGUE:'🟢',CANCELADO:'🔴',APROVADO:'🟣'};
await i.update({embeds:[new EmbedBuilder().setColor(0x3498DB).setTitle('📋 MEUS PEDIDOS').setDescription(m.length?m.map(x=>`${S[x.status]||'⚪'} **#${x.id}** - ${x.produtoNome} | R$${x.valor.toFixed(2)} | ${x.status}`).join('\n'):'Nenhum pedido ainda.')],components:[]})}};
