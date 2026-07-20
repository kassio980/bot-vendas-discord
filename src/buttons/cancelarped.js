const{ler,salvar}=require('../../banco');const{erro}=require('../../embeds');
module.exports={id:'cancelarped',async execute(c,i,a){
const p=ler('pedidos.json')||[];const x=p.find(y=>y.id===a[0]);if(!x)return;
x.status='CANCELADO';salvar('pedidos.json',p);
await i.update({embeds:[erro('CANCELADO',`Pedido #${x.id}`)],components:[]})}};
