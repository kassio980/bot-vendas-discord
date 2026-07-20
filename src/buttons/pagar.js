const {pagamentoPix}=require('../../embeds');
const {pedidoPorId}=require('../../banco');
module.exports={id:'pagar',async execute(c,i,a){
const p=pedidoPorId(a[0]);if(!p)return i.update({content:'Pedido nao encontrado',components:[]});
await i.reply({embeds:[pagamentoPix(p)],ephemeral:false})}};
