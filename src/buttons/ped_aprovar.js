const{ler,salvar,addLog}=require('../../banco');const{pedido}=require('../../embeds');
module.exports={id:'ped_aprovar',async execute(c,i,a){
const p=ler('pedidos.json')||[];const x=p.find(y=>y.id===a[0]);if(!x)return;
x.status='APROVADO';salvar('pedidos.json',p);addLog('alteracoes',{acao:'PEDIDO_APROVADO',pedido:x.id});
await i.update({embeds:[pedido(x)],components:[]})}};
