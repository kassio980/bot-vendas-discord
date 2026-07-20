const{ler,salvar,addLog}=require('../../banco');const{pedido}=require('../../embeds');
module.exports={id:'ped_entregar',async execute(c,i,a){
const p=ler('pedidos.json')||[];const x=p.find(y=>y.id===a[0]);if(!x)return;
x.status='ENTREGUE';x.dataEntrega=new Date().toISOString();salvar('pedidos.json',p);
addLog('vendas',{pedido:x.id,valor:x.valor});addLog('entregas',{pedido:x.id});
try{(await c.users.fetch(x.clienteId)).send(`🚚 PEDIDO #${x.id} ENTREGUE!\n**${x.produtoNome}**`)}catch{}
await i.update({embeds:[pedido(x)],components:[]})}};
