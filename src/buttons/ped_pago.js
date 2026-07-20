const{ler,salvar,addLog}=require('../../banco');const{pedido}=require('../../embeds');
module.exports={id:'ped_pago',async execute(c,i,a){
const p=ler('pedidos.json')||[];const x=p.find(y=>y.id===a[0]);if(!x)return;
x.status='PAGO';salvar('pedidos.json',p);addLog('pagamentos',{pedido:x.id,valor:x.valor});
await i.update({embeds:[pedido(x)],components:[]})}};
