const {ActionRowBuilder,ButtonBuilder,ButtonStyle}=require('discord.js');
const {pedidoPorId,atualizarPedido,atualizarProduto,addLog}=require('../../banco');
const {entregue,sucesso,avaliarPedido}=require('../../embeds');
const {logCanal}=require('../../sistema');
module.exports={id:'modal_entregar',async execute(c,i,a){
const pid=a[0];const p=pedidoPorId(pid);if(!p)return;
const tipo=i.fields.getTextInputValue('tipo')||'codigo';
const conteudo=i.fields.getTextInputValue('conteudo');
const obs=i.fields.getTextInputValue('obs')||'';
const foto=i.fields.getTextInputValue('foto')||null;

const entrega={tipo,conteudo,obs,foto,entreguePor:i.user.id,data:new Date().toISOString()};
const final=atualizarPedido(pid,{status:'ENTREGUE',dataEntrega:new Date().toISOString(),entrega});
atualizarProduto(p.produtoId,{vendas:(p.vendasProd||0)+1});
addLog('entregas',{pedido:pid,produto:p.produtoNome,valor:p.valor,cliente:p.clienteId});
logCanal(c,'✅ ENTREGUE','**#'+pid+'**\n🛍️ '+p.produtoNome+'\n👤 <@'+p.clienteId+'>\n💸 R$ '+p.valor.toFixed(2),0x00E676);

// ENVIA NA DM DO CLIENTE
try{
const cliente=await c.users.fetch(p.clienteId);
const e=entregue(p,entrega);if(foto)e.setImage(foto);
const aval=new ActionRowBuilder().addComponents(
new ButtonBuilder().setCustomId('avaliar_'+pid+'_1').setLabel('⭐').setStyle(2),
new ButtonBuilder().setCustomId('avaliar_'+pid+'_2').setLabel('⭐⭐').setStyle(2),
new ButtonBuilder().setCustomId('avaliar_'+pid+'_3').setLabel('⭐⭐⭐').setStyle(2),
new ButtonBuilder().setCustomId('avaliar_'+pid+'_4').setLabel('⭐⭐⭐⭐').setStyle(2),
new ButtonBuilder().setCustomId('avaliar_'+pid+'_5').setLabel('⭐⭐⭐⭐⭐').setStyle(3));
await cliente.send({embeds:[e],components:[aval]});
}catch(e){console.log('DM CLIENTE:',e.message)}

// CANAL DO TICKET
if(p.canalId){try{
const ch=await c.channels.fetch(p.canalId);
const e=entregue(p,entrega);if(foto)e.setImage(foto);
await ch.send({content:'||<@'+p.clienteId+'>|| ✅ **PEDIDO FINALIZADO!**',embeds:[e]});
await ch.send('> 🔒 Este canal sera **fechado automaticamente em 30 segundos**. Obrigado pela preferencia! 💛');
setTimeout(async()=>{try{await ch.delete()}catch{}},30000);
}catch(e){console.log('CANAL:',e.message)}}

await i.reply({embeds:[sucesso('ENTREGUE COM SUCESSO! 🎉','Pedido #'+pid+'\n\n🛍️ **'+p.produtoNome+'**\n👤 <@'+p.clienteId+'>\n💸 R$ '+p.valor.toFixed(2)+'\n\n✅ Produto enviado na DM do cliente e no canal do ticket!')],ephemeral:true})
}};
