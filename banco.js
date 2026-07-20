const fs=require('fs'),path=require('path');
const DB=path.join(__dirname,'database');
if(!fs.existsSync(DB))fs.mkdirSync(DB,{recursive:true});
['produtos','pedidos','tickets','entregas','carteira','cupons','config','logs','avaliacoes','niveis','indicacoes','sorteios','notificacoes','conquistas','loja','ranking','estoque_historico'].forEach(a=>{if(!fs.existsSync(path.join(DB,a+'.json')))fs.writeFileSync(path.join(DB,a+'.json'),'{}')});

const ler=a=>{try{const r=JSON.parse(fs.readFileSync(path.join(DB,a+'.json'),'utf8'));return Array.isArray(r)?r:(typeof r==='object'?r:[])}catch(e){return['config','carteira','loja'].includes(a)?{}:[]}};
const salvar=(a,b)=>fs.writeFileSync(path.join(DB,a+'.json'),JSON.stringify(b,null,2));
const addLog=(t,d)=>{const l=ler('logs');if(!Array.isArray(l[t]))l[t]=[];l[t].unshift({...d,data:new Date().toISOString()});if(l[t].length>2000)l[t]=l[t].slice(0,2000);salvar('logs',l)};
const gerarId=()=>Date.now().toString(36)+Math.random().toString(36).slice(2,7).toUpperCase();
const pedidoPorId=id=>(ler('pedidos')||[]).find(x=>x.id===id);
const produtoPorId=id=>(ler('produtos')||[]).find(x=>x.id===id);
const cupomPorCodigo=c=>(ler('cupons')||[]).find(x=>x.codigo.toUpperCase()===String(c).toUpperCase()&&x.ativo&&(x.usosMax===undefined||x.usos<x.usosMax)&&(!x.validade||new Date(x.validade)>=new Date()));
const atualizarPedido=(id,dados)=>{const p=ler('pedidos')||[];const i=p.findIndex(x=>x.id===id);if(i>-1){p[i]={...p[i],...dados};salvar('pedidos',p);return p[i]}return null};
const atualizarProduto=(id,dados)=>{const p=ler('produtos')||[];const i=p.findIndex(x=>x.id===id);if(i>-1){const ant=p[i];p[i]={...ant,...dados};salvar('produtos',p);if(dados.estoque!==undefined&&dados.estoque!==ant.estoque){const h=ler('estoque_historico')||[];h.unshift({produtoId:id,antes:ant.estoque,depois:dados.estoque,data:new Date().toISOString()});salvar('estoque_historico',h)}return p[i]}return null};

const temPermissao=(uid,permissao)=>{
const DONO=process.env.DONO_ID;if(DONO&&uid===DONO)return true;
const cfg=ler('config');const n=(cfg.niveisEquipe||[]).find(x=>x.id===uid);if(!n)return false;
const P={DONO:['*'],GERENTE:['produtos','pedidos','pagamentos','entregas','cupons','carteira','relatorios','adms','sorteios','niveis'],VENDEDOR:['pedidos','pagamentos','entregas'],ESTOQUE:['produtos','estoque']};
return !!P[n.nivel]&&(P[n.nivel].includes('*')||P[n.nivel].includes(permissao));
};

const adicionarCarteira=(uid,valor)=>{const car=ler('carteira');car[uid]=(car[uid]||0)+valor;salvar('carteira',car);return car[uid]};
const removerEstoque=(pid,qtd=1)=>{const p=produtoPorId(pid);if(!p||p.estoque===-1)return true;if(p.estoque<qtd)return false;atualizarProduto(pid,{estoque:p.estoque-qtd,vendas:(p.vendas||0)+qtd});return true};
const reporEstoque=(pid,qtd,motivo='Reposicao')=>{const p=produtoPorId(pid);if(!p)return false;atualizarProduto(pid,{estoque:p.estoque===-1?qtd:p.estoque+qtd});addLog('estoque',{acao:'REPOR',produto:pid,qtd,motivo});return true};
const pedidoStock=(pid,qtd,motivo)=>{const s=ler('config');s.pedidosStock=(s.pedidosStock||[]).concat([{produtoId:pid,qtd,motivo,data:new Date().toISOString(),status:'PENDENTE'}]);salvar('config',s);return s.pedidosStock[s.pedidosStock.length-1]};
const adicionarRanking=(uid,nome,valor)=>{const r=ler('ranking')||{};r[uid]={nome,total:(r[uid]?.total||0)+valor,compras:(r[uid]?.compras||0)+1,ultima:new Date().toISOString()};salvar('ranking',r);return r[uid]};
const usarCupom=(cod,valorCompra)=>{const cup=cupomPorCodigo(cod);if(!cup)return{ok:false,erro:'Invalido/expirado'};
let desc=0;if(cup.tipo==='PORCENTO')desc=Math.min(cup.valor,90);else if(cup.tipo==='FIXO')desc=Math.min((cup.valor/valorCompra)*100,90);
if(cup.valorMinimo&&valorCompra<cup.valorMinimo)return{ok:false,erro:'Valor minimo: R$'+cup.valorMinimo};
cup.usos=(cup.usos||0)+1;const cups=ler('cupons').map(c=>c.id===cup.id?cup:c);salvar('cupons',cups);
return{ok:true,cupom:cup,descontoPercentual:desc,valorFinal:valorCompra*(1-desc/100)};
};
const criarIndicacao=(indicadorId,convidadoId,porcento=5)=>{const ind=ler('indicacoes')||[];if(ind.some(x=>x.convidadoId===convidadoId))return null;const i={id:gerarId(),indicadorId,convidadoId,porcento,usou:false,data:new Date().toISOString()};ind.push(i);salvar('indicacoes',ind);return i};
const usarIndicacao=(convidadoId,valorCompra)=>{const ind=ler('indicacoes')||[];const i=ind.find(x=>x.convidadoId===convidadoId&&!x.usou);if(!i)return 0;const g=valorCompra*i.porcento/100;adicionarCarteira(i.indicadorId,g);i.usou=true;i.valorGanho=g;i.dataUso=new Date().toISOString();salvar('indicacoes',ind);addLog('indicacoes',{indicador:i.indicadorId,convidado:convidadoId,ganhou:g});return g};

const NIVEIS=[
{n:1,titulo:'LOJA INICIANTE',cor:0x9E9E9E,vendas:0,fat:0},
{n:3,titulo:'LOJA CRESCENDO',cor:0x66BB6A,vendas:5,fat:50},
{n:5,titulo:'LOJA EM ASCENSAO',cor:0x29B6F6,vendas:10,fat:200},
{n:8,titulo:'LOJA CONFIANCA',cor:0xAB47BC,vendas:25,fat:500},
{n:10,titulo:'LOJA PROFISSIONAL',cor:0xFFA726,vendas:50,fat:1000},
{n:15,titulo:'LOJA DE SUCESSO',cor:0xEF5350,vendas:100,fat:3000},
{n:20,titulo:'LOJA DESTAQUE',cor:0xEC407A,vendas:200,fat:7000},
{n:30,titulo:'LOJA FENOMENO',cor:0x7B1FA2,vendas:400,fat:15000},
{n:40,titulo:'LOJA MONSTRA',cor:0xD32F2F,vendas:700,fat:30000},
{n:50,titulo:'👑 LOJA IMPERADORA',cor:0xFFD700,vendas:1000,fat:100000}
];
const MARCOS=[
{id:'primeira_venda',nome:'Primeira Venda',desc:'Voce realizou sua primeira venda!',icone:'🏆',tipo:'vendas',valor:1},
{id:'10_vendas',nome:'10 Vendas',desc:'Bateu 10 vendas!',icone:'🥈',tipo:'vendas',valor:10},
{id:'50_vendas',nome:'50 Vendas',desc:'Loja bombando! 50 vendas',icone:'🥇',tipo:'vendas',valor:50},
{id:'100_vendas',nome:'💯 Vendas',desc:'Centena de vendas!',icone:'💯',tipo:'vendas',valor:100},
{id:'fat_100',nome:'R$ 100',desc:'Primeiras notas!',icone:'💰',tipo:'faturamento',valor:100},
{id:'fat_500',nome:'R$ 500',desc:'Loja crescendo!',icone:'💵',tipo:'faturamento',valor:500},
{id:'fat_1k',nome:'R$ 1.000',desc:'Meta importante batida!',icone:'🤑',tipo:'faturamento',valor:1000},
{id:'fat_5k',nome:'R$ 5.000',desc:'Sucesso confirmado!',icone:'💸',tipo:'faturamento',valor:5000},
{id:'fat_10k',nome:'R$ 10 MIL',desc:'LOJA MONSTRA!',icone:'👑',tipo:'faturamento',valor:10000},
{id:'fat_50k',nome:'R$ 50 MIL!',desc:'VOCÊ EH RICO!',icone:'🏦',tipo:'faturamento',valor:50000}
];

function calcularNivelLoja(){
const peds=ler('pedidos')||[];const ent=peds.filter(x=>x.status==='ENTREGUE');
const tv=ent.length;const fat=ent.reduce((s,x)=>s+x.valor,0);
let at=NIVEIS[0],prox=null;
for(let i=0;i<NIVEIS.length;i++)if(tv>=NIVEIS[i].vendas||fat>=NIVEIS[i].fat)at=NIVEIS[i];
for(let i=0;i<NIVEIS.length;i++)if((NIVEIS[i].vendas>tv||NIVEIS[i].fat>fat)&&NIVEIS[i].n>at.n){prox=NIVEIS[i];break}
const fv=prox?Math.max(0,prox.vendas-tv):0;const ff=prox?Math.max(0,prox.fat-fat):0;
const baseP=prox?Math.max(prox.vendas,1)+prox.fat/10:1;
const faltaP=fv+ff/10;const prog=prox?Math.min(100,Math.round((1-faltaP/baseP)*100)):100;
return{atual:at,proximo:prox,totalVendas:tv,faturamento:fat,faltaVendas:fv,faltaFat:ff,progresso:Math.max(0,prog),entregues:ent}
}
function verificarConquistas(){
const loja=ler('loja');const res=calcularNivelLoja();const novas=[];
MARCOS.forEach(m=>{
const bateu=m.tipo==='vendas'?res.totalVendas>=m.valor:res.faturamento>=m.valor;
if(bateu&&!loja.conquistas?.includes(m.id)){
loja.conquistas=loja.conquistas||[];loja.conquistas.push(m.id);
loja.ultimaConquista={...m,data:new Date().toISOString()};novas.push(m);
}});
loja.nivel=res.atual.n;loja.titulo=res.atual.titulo;loja.cor=res.atual.cor;
loja.totalVendas=res.totalVendas;loja.faturamento=res.faturamento;
salvar('loja',loja);return{novas,loja,res}
}



// ==============================================
// ✅ FUNÇÕES ADICIONADAS AGORA
// ==============================================
function calcularProgresso(){
  const vendas = ler('pedidos').filter(p=>p.status==='ENTREGUE')||[];
  const totalVendas = vendas.length;
  const totalFaturado = vendas.reduce((s,x)=>s+(x.valor||0),0);
  const niveis = [
    {id:1,nome:'LOJA INICIANTE',vendas:0,faturamento:0},
    {id:2,nome:'LOJA EM CRESCIMENTO',vendas:3,faturamento:25},
    {id:3,nome:'LOJA CRESCENDO',vendas:5,faturamento:50},
    {id:4,nome:'LOJA POPULAR',vendas:10,faturamento:150},
    {id:5,nome:'LOJA TOP',vendas:25,faturamento:500}
  ];
  let nivelAtual = niveis[0];
  let proximo = niveis[1];
  for(let i=0;i<niveis.length;i++){
    if(totalVendas >= niveis[i].vendas && totalFaturado >= niveis[i].faturamento){
      nivelAtual = niveis[i];
      proximo = niveis[i+1] || null;
    }
  }
  const faltaV = proximo ? proximo.vendas - totalVendas : 0;
  const faltaF = proximo ? proximo.faturamento - totalFaturado : 0;
  const porcento = proximo ? Math.min(100, Math.round(((totalVendas/proximo.vendas)*50 + (totalFaturado/proximo.faturamento)*50))) : 100;
  return {
    loja: nivelAtual,
    vendas: totalVendas,
    faturamento: totalFaturado,
    progresso: porcento,
    proximo: proximo,
    faltaVendas: faltaV,
    faltaValor: faltaF
  };
}

function topClientes(qtd=10){
  const pedidos = ler('pedidos')||[];
  const contagem = {};
  pedidos.forEach(p=>{
    if(!contagem[p.clienteId]) contagem[p.clienteId] = {id:p.clienteId, total:0, vezes:0};
    contagem[p.clienteId].total += p.valor||0;
    contagem[p.clienteId].vezes++;
  });
  return Object.values(contagem).sort((a,b)=>b.total - a.total).slice(0,qtd);
}

module.exports.calcularProgresso = calcularProgresso;
module.exports.topClientes = topClientes;
