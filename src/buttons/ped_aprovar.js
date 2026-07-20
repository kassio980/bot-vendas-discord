const {pedidoPorId,atualizarPedido,addLog}=require('../../banco');
const {pedido,sucesso}=require('../../embeds');
module.exports={id:'ped_aprovar',async execute(c,i,a){
const p=pedidoPorId(a[0]);if(!p)return;
atualizarPedido(p.id,{status:'APROVADO'});addLog('alteracoes',{acao:'PEDIDO_APROVADO',pedido:p.id});
await i.update({embeds:[pedido({...p,status:'APROVADO'})],components:[]});
await i.followUp({embeds:[sucesso('PEDIDO APROVADO','Pedido #'+p.id+' atualizado com sucesso!')],ephemeral:true})}};
