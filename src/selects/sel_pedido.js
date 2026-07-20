const {ActionRowBuilder,ButtonBuilder,ButtonStyle}=require('discord.js');
const {pedidoPorId}=require('../../banco');
const {pedido,erro}=require('../../embeds');
module.exports={id:'sel_pedido',async execute(c,i,a){
const id=i.values[0];if(id==='vazio')return;
const p=pedidoPorId(id);if(!p)return i.update({embeds:[erro('NAO ENCONTRADO','Pedido nao existe.')],components:[]});
const r=new ActionRowBuilder().addComponents(
new ButtonBuilder().setCustomId('ped_aprovar_'+p.id).setLabel('✅ Aprovar').setStyle(3).setDisabled(p.status!=='AGUARDANDO'),
new ButtonBuilder().setCustomId('ped_pago_'+p.id).setLabel('💳 Marcar Pago').setStyle(1).setDisabled(p.status==='ENTREGUE'),
new ButtonBuilder().setCustomId('entregar_produto_'+p.id).setLabel('🚚 Entregar').setStyle(3).setDisabled(p.status==='ENTREGUE'),
new ButtonBuilder().setCustomId('ped_cancelar_'+p.id).setLabel('❌ Cancelar').setStyle(4).setDisabled(p.status==='ENTREGUE'));
await i.update({embeds:[pedido(p)],components:[r]})}};
