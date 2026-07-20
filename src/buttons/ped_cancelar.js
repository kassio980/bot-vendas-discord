const{ler,salvar,addLog}=require('../../banco');const{pedido}=require('../../embeds');
module.exports={id:'ped_cancelar',async execute(c,i,a){
const p=ler('pedidos.json')||[];const x=p.find(y=>y.id===a[0]);if(!x)return;
x.status='CANCELADO';salvar('pedidos.json',p);
await i.update({embeds:[pedido(x)],components:[]})}};
