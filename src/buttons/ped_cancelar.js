const {pedidoPorId,atualizarPedido,addLog}=require('../../banco');
const {pedido,sucesso}=require('../../embeds');
module.exports={id:'ped_cancelar',async execute(c,i,a){
const p=pedidoPorId(a[0]);if(!p)return;
atualizarPedido(p.id,{status:'CANCELADO'});addLog('alteracoes',{acao:'PEDIDO_CANCELADO',pedido:p.id});
await i.update({embeds:[pedido({...p,status:'CANCELADO'})],components:[]});
await i.followUp({embeds:[sucesso('PEDIDO CANCELADO','Pedido #'+p.id+' atualizado com sucesso!')],ephemeral:true})}};
