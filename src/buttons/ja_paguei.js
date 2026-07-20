const {ActionRowBuilder,ButtonBuilder,ButtonStyle}=require('discord.js');
const {pedidoPorId,atualizarPedido,addLog}=require('../../banco');
const {pagamentoEnviado,avisoDono}=require('../../embeds');
const {logCanal}=require('../../sistema');
module.exports={id:'ja_paguei',async execute(c,i,a){
const p=pedidoPorId(a[0]);if(!p)return;
atualizarPedido(p.id,{status:'PAGO',dataPagamento:new Date().toISOString()});
addLog('pagamentos',{pedido:p.id,valor:p.valor,cliente:i.user.id});
logCanal(c,'💳 PAGAMENTO','**#'+p.id+'**\n👤 <@'+i.user.id+'>\n💸 R$ '+p.valor.toFixed(2),0x00BFA5);

await i.reply({embeds:[pagamentoEnviado(p)]});
if(i.channel)await i.channel.send('> ✅ **SOLICITACAO ENVIADA PARA O ADM!**\n> Aguarde ate 5 minutos para a confirmacao.');

const DONO=process.env.DONO_ID;if(DONO){try{
const dono=await c.users.fetch(DONO);
const r=new ActionRowBuilder().addComponents(
new ButtonBuilder().setCustomId('entregar_produto_'+p.id).setLabel('✅ ENTREGAR PRODUTO').setStyle(3),
new ButtonBuilder().setCustomId('recusar_pagamento_'+p.id).setLabel('❌ RECUSAR').setStyle(4),
new ButtonBuilder().setURL('https://discord.com/channels/'+i.guildId+'/'+p.canalId).setLabel('🔗 ABRIR CANAL DO TICKET').setStyle(5));
const emb=avisoDono(p);
await dono.send({content:'||<@'+DONO+'>|| 🔔 **NOVO PAGAMENTO PARA CONFIRMAR**',embeds:[emb],components:[r]});
}catch(e){console.log('DM DONO FALHOU:',e.message)}}
}};
