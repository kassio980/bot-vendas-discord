const b=require('./banco');
function relatorio(c){const a=new Date();if(a.getHours()!==23||a.getMinutes()!==59)return;
const peds=b.ler('pedidos')||[];const hj=new Date().toDateString();
const h=peds.filter(x=>new Date(x.data).toDateString()===hj);const ent=h.filter(x=>x.status==='ENTREGUE');
const cl=new Set(h.map(x=>x.clienteId));const fat=ent.reduce((s,x)=>s+x.valor,0);
const pr={};ent.forEach(x=>pr[x.produtoNome]=(pr[x.produtoNome]||0)+1);const top=Object.entries(pr).sort((x,y)=>y[1]-x[1])[0];
const r={data:new Date().toLocaleDateString('pt-BR'),vendas:h.length,entregues:ent.length,faturamento:fat,novosClientes:cl.size,topProduto:top?top[0]+' ('+top[1]+'x)':'---',ticketMedio:ent.length?fat/ent.length:0};
const D=process.env.DONO_ID;if(D){c.users.fetch(D).then(d=>d.send({embeds:[require('./embeds').info('📊 RELATORIO DIARIO '+r.data,'🛒 Vendas: **'+r.vendas+'**\n✅ Entregues: **'+r.entregues+'**\n💸 Faturamento: **R$ '+r.faturamento.toFixed(2).replace('.',',')+'**\n👥 Novos: **'+r.novosClientes+'**\n🏆 Top: **'+r.topProduto+'**\n📈 Ticket medio: **R$ '+r.ticketMedio.toFixed(2).replace('.',',')+'**')})).catch(()=>{})}
b.addLog('relatorios',r)}
function sorteio(c){const s=b.ler('sorteios')||[];const at=s.find(x=>x.ativo&&new Date(x.dataSorteio)<=new Date());if(!at){return}if(!at.participantes?.length){at.ativo=false;b.salvar('sorteios',s);return}
const g=at.participantes[Math.floor(Math.random()*at.participantes.length)];at.ganhador=g;at.ativo=false;b.salvar('sorteios',s);b.addLog('sorteios',{premio:at.premio,ganhador:g});
c.users.fetch(g).then(u=>u.send({embeds:[require('./embeds').sucesso('🎉 VOCE GANHOU O SORTEIO!','🏆 Premio: **'+at.premio+'**\nContate o ADM para resgatar!')})).catch(()=>{})}
function loop(c){setInterval(()=>{relatorio(c);sorteio(c)},60000);console.log('✅ Sistemas extras: Relatorio diario + Sorteio ATIVOS')}
module.exports={iniciar:loop};