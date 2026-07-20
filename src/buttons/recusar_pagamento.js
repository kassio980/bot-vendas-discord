const {pedidoPorId,atualizarPedido}=require('../../banco');const {erro}=require('../../embeds');
module.exports={id:'recusar_pagamento',async execute(c,i,a){
const p=pedidoPorId(a[0]);if(!p)return;
atualizarPedido(p.id,{status:'RECUSADO',dataRecusa:new Date().toISOString(),recusadoPor:i.user.id});
await i.reply({embeds:[erro('PAGAMENTO RECUSADO','Pedido #'+p.id+'\n👤 <@'+p.clienteId+'>')],ephemeral:true});
if(p.canalId){try{const ch=await c.channels.fetch(p.canalId);await ch.send({embeds:[erro('❌ PAGAMENTO NAO CONFIRMADO','O ADM verificou e nao encontrou o pagamento.\n\nContate o suporte se houve engano.')]});setTimeout(async()=>{try{await ch.delete()}catch{}},10000)}catch{}}}};
