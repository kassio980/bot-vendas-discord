const {pedidoPorId,atualizarPedido}=require('../../banco');
const {erro}=require('../../embeds');
module.exports={id:'recusar_pagamento',async execute(c,i,a){
const p=pedidoPorId(a[0]);if(!p)return;
atualizarPedido(p.id,{status:'AGUARDANDO'});
await i.reply({embeds:[erro('PAGAMENTO RECUSADO','O pagamento do pedido #'+p.id+' foi recusado. Contate o cliente.')],ephemeral:true});
if(p.canalId){try{const ch=await c.channels.fetch(p.canalId);await ch.send({embeds:[erro('⚠️ PAGAMENTO NAO ENCONTRADO','Nao localizamos seu pagamento ainda.\n\nSe voce ja pagou, aguarde mais alguns minutos ou envie o comprovante aqui no canal.')]})}catch{}}
}};
