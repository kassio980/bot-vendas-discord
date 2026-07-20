const b = require('./banco');

function montarRelatorioTexto(r) {
  var t = '';
  t += '🛒 Vendas: **' + r.vendas + '**\n';
  t += '✅ Entregues: **' + r.entregues + '**\n';
  t += '💸 Faturamento: **R$ ' + r.faturamento.toFixed(2).replace('.', ',') + '**\n';
  t += '👥 Novos: **' + r.novosClientes + '**\n';
  t += '🏆 Top: **' + r.topProduto + '**\n';
  t += '📈 Ticket medio: **R$ ' + r.ticketMedio.toFixed(2).replace('.', ',') + '**';
  return t;
}

function relatorio(c) {
  try {
    var agora = new Date();
    if (agora.getHours() !== 23 || agora.getMinutes() !== 59) return;
    var peds = b.ler('pedidos') || [];
    var hj = new Date().toDateString();
    var h = peds.filter(function(x){ return new Date(x.data).toDateString() === hj; });
    var ent = h.filter(function(x){ return x.status === 'ENTREGUE'; });
    var cl = new Set(h.map(function(x){ return x.clienteId; }));
    var fat = ent.reduce(function(s,x){ return s + x.valor; }, 0);
    var pr = {};
    ent.forEach(function(x){ pr[x.produtoNome] = (pr[x.produtoNome] || 0) + 1; });
    var topArr = Object.entries(pr).sort(function(x,y){ return y[1] - x[1]; });
    var top = topArr[0];
    var r = {
      data: new Date().toLocaleDateString('pt-BR'),
      vendas: h.length,
      entregues: ent.length,
      faturamento: fat,
      novosClientes: cl.size,
      topProduto: top ? top[0] + ' (' + top[1] + 'x)' : '---',
      ticketMedio: ent.length ? fat / ent.length : 0
    };
    var D = process.env.DONO_ID;
    if (D) {
      c.users.fetch(D).then(function(d){
        var E = require('./embeds');
        d.send({ embeds: [ E.info('📊 RELATORIO DIARIO ' + r.data, montarRelatorioTexto(r)) ] });
      }).catch(function(e){ console.log('dm relatorio:', e.message); });
    }
    b.addLog('relatorios', r);
  } catch(e) { console.log('relatorio loop:', e.message); }
}

function sorteio(c) {
  try {
    var s = b.ler('sorteios') || [];
    var at = null;
    for (var i = 0; i < s.length; i++) {
      if (s[i].ativo && new Date(s[i].dataSorteio) <= new Date()) { at = s[i]; break; }
    }
    if (!at) return;
    if (!at.participantes || !at.participantes.length) { at.ativo = false; b.salvar('sorteios', s); return; }
    var idx = Math.floor(Math.random() * at.participantes.length);
    var g = at.participantes[idx];
    at.ganhador = g; at.ativo = false;
    b.salvar('sorteios', s);
    b.addLog('sorteios', { premio: at.premio, ganhador: g });
    c.users.fetch(g).then(function(u){
      var E = require('./embeds');
      u.send({ embeds: [ E.sucesso('🎉 VOCE GANHOU O SORTEIO!', '🏆 Premio: **' + at.premio + '**\nContate o ADM para resgatar!') ] });
    }).catch(function(e){ console.log('dm sorteio:', e.message); });
  } catch(e) { console.log('sorteio loop:', e.message); }
}

function loop(c) {
  setInterval(function(){ relatorio(c); sorteio(c); }, 60000);
  console.log('✅ Sistemas extras: Relatorio diario + Sorteio ATIVOS');
}

module.exports = { iniciar: loop };
