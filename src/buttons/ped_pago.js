const {pedidoPorId,atualizarPedido,addLog}=require('../../banco');
const {pedido,sucesso}=require('../../embeds');
module.exports={id:'ped_pago',async execute(c,i,a){
const p=pedidoPorId(a[0]);if(!p)return;
atualizarPedido(p.id,{status:'PAGO'});addLog('alteracoes',{acao:'PEDIDO_PAGO',pedido:p.id});
await i.update({embeds:[pedido({...p,status:'PAGO'})],components:[]});
await i.followUp({embeds:[sucesso('PEDIDO MARCADO COMO PAGO','Pedido #'+p.id+' atualizado com sucesso!')],ephemeral:true})}};
