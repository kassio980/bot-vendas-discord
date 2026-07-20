const {ler,salvar,addLog}=require('../../banco');
const {obrigadoAvaliacao}=require('../../embeds');
module.exports={id:'avaliar',async execute(c,i,a){
const pid=a[0];const nota=parseInt(a[1])||5;
const p=ler('pedidos').find(x=>x.id===pid);if(!p)return;
const avs=ler('avaliacoes')||[];
if(avs.some(x=>x.pedido===pid))return i.update({content:'Voce ja avaliou este pedido!',components:[]});
avs.unshift({pedido:pid,cliente:i.user.id,nota,produto:p.produtoId,data:new Date().toISOString()});salvar('avaliacoes',avs);
addLog('alteracoes',{acao:'AVALIACAO',pedido:pid,nota});
await i.update({embeds:[obrigadoAvaliacao(p,nota)],components:[]})}};
