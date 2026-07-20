const fs = require('fs');
const caminho = './database/';

if(!fs.existsSync(caminho)) fs.mkdirSync(caminho, {recursive:true});

function ler(nome){
  const arq = caminho + nome + '.json';
  if(!fs.existsSync(arq)) return [];
  try{ return JSON.parse(fs.readFileSync(arq, 'utf8')); }
  catch{ return []; }
}

function salvar(nome, dados){
  fs.writeFileSync(caminho+nome+'.json', JSON.stringify(dados, null, 2));
}

function gerarId(){
  return Math.random().toString(36).substring(2,10).toUpperCase();
}

function addLog(tipo, dados){
  const l = ler('logs')||[];
  l.unshift({tipo, data:new Date().toISOString(), ...dados});
  salvar('logs', l.slice(0,500));
}

function pedidoPorId(id){
  return (ler('pedidos')||[]).find(x=>x.id===id);
}
function produtoPorId(id){
  return (ler('produtos')||[]).find(x=>x.id===id);
}
function cupomPorCodigo(cod){
  const agora = new Date();
  return (ler('cupons')||[]).find(x=>
    x.codigo.toLowerCase()===cod.toLowerCase()
    && (x.expira ? new Date(x.expira) > agora : true)
    && (x.usosMax===0 || x.usos < x.usosMax)
  );
}
function atualizarPedido(id, novodados){
  const p = ler('pedidos')||[];
  const idx = p.findIndex(x=>x.id===id);
  if(idx===-1) return;
  p[idx] = {...p[idx], ...novodados};
  salvar('pedidos', p);
}
function atualizarProduto(id, novodados){
  const p = ler('produtos')||[];
  const idx = p.findIndex(x=>x.id===id);
  if(idx===-1) return;
  p[idx] = {...p[idx], ...novodados};
  salvar('produtos', p);
}
function removerEstoque(id, qtd=1){
  const p = ler('produtos')||[];
  const prod = p.find(x=>x.id===id);
  if(!prod || prod.estoque===-1) return;
  prod.estoque = Math.max(0, prod.estoque - qtd);
  salvar('produtos', p);
}

// ====== FUNÇÕES EXTRAS DA VERSÃO PRO ======
function calcularProgresso(){
  const todos = ler('pedidos') || [];
  const vendas = todos.filter(p => p.status === 'ENTREGUE');
  const totalVendas = vendas.length;
  const totalFaturado = vendas.reduce((s,x) => s + (x.valor||0), 0);

  const niveis = [
    {id:1,nome:'LOJA INICIANTE',vendas:0,faturamento:0},
    {id:2,nome:'LOJA EM CRESCIMENTO',vendas:3,faturamento:25},
    {id:3,nome:'LOJA CRESCENDO',vendas:5,faturamento:50},
    {id:4,nome:'LOJA POPULAR',vendas:10,faturamento:150},
    {id:5,nome:'LOJA TOP',vendas:25,faturamento:500}
  ];

  let nivelAtual = niveis[0];
  let proximo = null;
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
  const pedidos = ler('pedidos') || [];
  const contagem = {};
  pedidos.forEach(p => {
    if(!contagem[p.clienteId]) contagem[p.clienteId] = {id:p.clienteId, total:0, vezes:0};
    contagem[p.clienteId].total += p.valor||0;
    contagem[p.clienteId].vezes++;
  });
  return Object.values(contagem).sort((a,b) => b.total - a.total).slice(0,qtd);
}

function verificarConquistas(){
  // Mantido da versão Pro
}

// ====== EXPORTA TUDO CORRETAMENTE ======
module.exports = {
  ler, salvar, gerarId, addLog,
  pedidoPorId, produtoPorId, cupomPorCodigo,
  atualizarPedido, atualizarProduto, removerEstoque,
  calcularProgresso, topClientes, verificarConquistas,
  MARCOS: []
};
