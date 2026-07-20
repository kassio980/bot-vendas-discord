const{ActionRowBuilder,ButtonBuilder,ButtonStyle}=require('discord.js');const{ler}=require('../../banco');const{pedido}=require('../../embeds');
module.exports={id:'sel_pedido',async execute(c,i){const id=i.values[0];if(id==='vazio')return;
const p=(ler('pedidos.json')||[]).find(x=>x.id===id);if(!p)return;
const r=new ActionRowBuilder().addComponents(
new ButtonBuilder().setCustomId(`ped_aprovar_${p.id}`).setLabel('✅ Aprovar').setStyle(3),
new ButtonBuilder().setCustomId(`ped_pago_${p.id}`).setLabel('💳 Pago').setStyle(1),
new ButtonBuilder().setCustomId(`ped_entregar_${p.id}`).setLabel('🚚 Entregar').setStyle(3),
new ButtonBuilder().setCustomId(`ped_cancelar_${p.id}`).setLabel('❌ Cancelar').setStyle(4));
await i.update({embeds:[pedido(p)],components:[r]})}};
