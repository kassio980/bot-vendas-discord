const {pedidoPorId,atualizarPedido,addLog}=require('../../banco');
const {erro}=require('../../embeds');
module.exports={id:'cancelar_pedido',async execute(c,i,a){
const p=pedidoPorId(a[0]);if(!p)return;
if(p.clienteId!==i.user.id && i.user.id!==process.env.DONO_ID)return i.reply({content:'Apenas o cliente ou dono',ephemeral:true});
atualizarPedido(p.id,{status:'CANCELADO',dataCancelamento:new Date().toISOString()});
addLog('alteracoes',{acao:'PEDIDO_CANCELADO',pedido:p.id});
await i.reply({embeds:[erro('PEDIDO CANCELADO','Pedido #'+p.id+' foi cancelado com sucesso.')]});
if(i.channel&&i.channel.name.startsWith('🛒-pedido')){setTimeout(async()=>{try{await i.channel.delete()}catch{}},5000)}
}};
