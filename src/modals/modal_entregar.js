const {pedidoPorId,atualizarPedido,addLog}=require('../../banco');
const {entregue,sucesso}=require('../../embeds');
module.exports={id:'modal_entregar',async execute(c,i,a){
const pid=a[0];const p=pedidoPorId(pid);if(!p)return;
const tipo=i.fields.getTextInputValue('tipo')||'codigo';
const conteudo=i.fields.getTextInputValue('conteudo');
const obs=i.fields.getTextInputValue('obs')||'';

// ATUALIZA BANCO
const final=atualizarPedido(pid,{status:'ENTREGUE',dataEntrega:new Date().toISOString(),entrega:{tipo,conteudo,obs,entreguePor:i.user.id}});
addLog('entregas',{pedido:pid,produto:p.produtoNome,valor:p.valor,entreguePor:i.user.id,cliente:p.clienteId});

// ENVIA DIRETO NA DM DO CLIENTE
try{
const cliente=await c.users.fetch(p.clienteId);
const txt='\n\n**📦 SEU PRODUTO:**\n```'+conteudo+'```\n\n**📋 Tipo:** `'+tipo+'`'+(obs?'\n\n**📝 Observacao:** '+obs:'')+'\n\nObrigado pela preferencia 💛';
await cliente.send({embeds:[entregue(p).setDescription(txt)]});
}catch(e){console.log('DM CLIENTE FALHOU:',e.message)}

// AVISA NO CANAL DO TICKET E FECHA
if(p.canalId){try{
const ch=await c.channels.fetch(p.canalId);
await ch.send({content:'||<@'+p.clienteId+'>||',embeds:[entregue(p).setDescription('\n\n**📦 CONTEUDO DA ENTREGA:**\n```'+conteudo+'```\n\n**📋 Tipo:** `'+tipo+'`'+(obs?'\n\n**📝 Observacao:** '+obs:''))]});
await ch.send('> ✅ **PEDIDO FINALIZADO!** Este canal sera fechado em 15 segundos. Obrigado!');
setTimeout(async()=>{try{await ch.delete()}catch{}},15000);
}catch(e){console.log('CANAL FALHOU:',e.message)}}

// CONFIRMA PARA QUEM ENTREGOU
await i.reply({embeds:[sucesso('ENTREGUE COM SUCESSO!','Pedido #'+pid+'\nProduto: **'+p.produtoNome+'**\nCliente: <@'+p.clienteId+'>\nValor: **R$ '+p.valor.toFixed(2)+'**')],ephemeral:true})
}};
