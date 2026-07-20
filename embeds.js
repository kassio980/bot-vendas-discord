const {EmbedBuilder}=require('discord.js');const b=require('./banco');const cfg=b.ler('config')||{};
const C={SUCESSO:0x00C853,ERRO:0xFF1744,INFO:0x2979FF,AVISO:0xFF9100,VIP:0x7B1FA2,PAG:0x00BFA5,ENT:0x00E676,PED:0xFF6D00,PRETO:0x0A0A0A,DOURADO:0xFFD700,CINZA:0x2B2D31};
const M='💛 MINION STORE • ';const I='https://i.imgur.com/AfFp7pu.png';const L='━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━';
const base=(c,t,d)=>new EmbedBuilder().setColor(c).setAuthor({name:M+'OFICIAL',iconURL:I}).setTitle(t).setDescription(d||null).setTimestamp().setFooter({text:M+'Profissionalismo e confianca',iconURL:I});

module.exports={
C,M,I,L,base,

novaVenda:(p,loja)=>new EmbedBuilder().setColor(C.SUCESSO).setAuthor({name:'🛒 Nova venda!',iconURL:I})
.setDescription('**Servidor registrou uma nova venda, confira as informacoes abaixo:**\n\n'+L)
.addFields({name:'👤 Comprador:','value:p.clienteMencao+'\n`('+p.clienteId+')`',inline:false},{name:'📦 Produto:','value:p.produtoNome,inline:false},{name:'🆔 Pedido:','value:'#'+p.id,inline:true},{name:'💸 Valor pago:','value:'```R$ '+p.valor.toFixed(2).replace('.',',')+'```',inline:true})
.setThumbnail(p.clienteFoto||'https://cdn.discordapp.com/embed/avatars/0.png')
.setFooter({text:M+'Venda registrada • Nivel '+loja.nivel+' - '+loja.titulo,iconURL:I}).setTimestamp(),

metaAlcancada:(m,loja,res)=>new EmbedBuilder().setColor(C.DOURADO).setAuthor({name:'🏆 META ALCANCADA',iconURL:I})
.setTitle('Parabens! Voce acaba de desbloquear uma nova conquista de vendas.')
.setDescription(L+'\n\n## '+m.icone+' **'+m.nome+'**\n> '+m.desc+'\n\n'+L)
.addFields({name:'🎖️ Conquista','value:m.icone+' '+m.nome,inline:true},{name:'📝 Resultado','value:m.desc,inline:true},
{name:'⚡ Proximo marco','value:res.proximo?'Nivel '+res.proximo.n+' ('+res.proximo.titulo+')\nFaltam: '+res.faltaVendas+' vendas / R$ '+res.faltaFat.toFixed(0):'✅ MAXIMO!',inline:false},
{name:'📊 Status atual','value:'Nivel **'+loja.nivel+'** ('+loja.titulo+')\nVendas: **'+res.totalVendas+'**\nFaturamento: **R$ '+res.faturamento.toFixed(2).replace('.',',')+'**',inline:false})
.setFooter({text:M+'Que venham as proximas vendas!',iconURL:I}).setTimestamp(),

nivelLoja:(res,loja)=>{const bar='█'.repeat(Math.floor(res.progresso/5))+'░'.repeat(20-Math.floor(res.progresso/5));
const e=base(loja.cor||C.VIP,'📊 NIVEL DA SUA LOJA','**'+M+loja.titulo.toUpperCase()+'**\n\n'+L)
.addFields({name:'🎖️ Nivel atual','value:'# **'+loja.nivel+'**\n'+loja.titulo,inline:true},{name:'🛒 Vendas','value:'**'+res.totalVendas+'**',inline:true},{name:'💸 Faturamento','value:'## R$ '+res.faturamento.toFixed(2).replace('.',','),inline:false},
{name:'📈 Progresso proximo nivel','value:'```['+bar+'] '+res.progresso+'%```',inline:false},
{name:'🎯 Proximo marco','value:res.proximo?'**Nivel '+res.proximo.n+'** ('+res.proximo.titulo+')\n• Faltam **'+res.faltaVendas+'** vendas\n• Faltam **R$ '+res.faltaFat.toFixed(2).replace('.',',')+'**':'✅ NIVEL MAXIMO 👑',inline:false},
{name:'🏆 Conquistas','value:(loja.conquistas?.length||0)+' / '+b.MARCOS.length,inline:true});
if(cfg.banner_loja)e.setThumbnail(cfg.banner_loja);return e},

comanda:(p,prod,desc=0)=>{const v=desc>0?p.valor*(1-desc/100):p.valor;
return new EmbedBuilder().setColor(C.PRETO).setAuthor({name:M+'COMANDA',iconURL:I}).setTitle('🛒 Resumo do Pedido #'+p.id)
.setDescription('**Carrinho:**\n\n'+L)
.addFields({name:'📦 Item','value:'1x '+prod.nome+' | '+(prod.categoria||'GERAL'),inline:false},{name:'💰 Subtotal','value:'R$ '+p.valor.toFixed(2).replace('.',','),inline:true},
{name:'🎟️ Desconto','value:desc>0?'- R$ '+(p.valor-v).toFixed(2).replace('.',',')+' ('+desc+'% OFF)':'---',inline:true},{name:'💳 VALOR PAGO','value:'## R$ '+v.toFixed(2).replace('.',','),inline:false})
.setFooter({text:'Pedido gerado automaticamente',iconURL:I}).setTimestamp()},

pix:(p,desc=0)=>{const v=desc>0?p.valor*(1-desc/100):p.valor;
const e=base(C.PAG,'💳 PAGAMENTO VIA PIX • #'+p.id,'✅ **PAGAMENTO 100% SEGURO**\nApos pagar, clique em **✅ JA PAGUEI**\n\n'+L)
.addFields({name:'💰 VALOR EXATO','value:'## R$ '+v.toFixed(2).replace('.',','),inline:false},{name:'🔑 CHAVE PIX (COPIA E COLA)','value:'```'+(process.env.PIX_CHAVE||'CHAVE NAO CONFIGURADA')+'```',inline:false},
{name:'🏦 Banco','value:process.env.PIX_BANCO||'---',inline:true},{name:'👤 Favorecido','value:process.env.PIX_NOME||'---',inline:true},{name:'⏳ Prazo','value:'Ate 5 min',inline:true},{name:'📦 Pedido','value:'#'+p.id,inline:true});
e.setImage('https://api.qrserver.com/v1/create-qr-code/?size=350x350&margin=10&data='+encodeURIComponent(process.env.PIX_CHAVE||''));
if(p.imagemProduto)e.setThumbnail(p.imagemProduto);return e},

produto:(p,desc=0)=>{const v=desc>0?p.preco*(1-desc/100):p.preco;
const tag=p.tag?{MAIS_VENDIDO:['🔥 MAIS VENDIDO',0xFF6D00],NOVO:['✨ NOVO',0x2979FF],PROMOCAO:['⚡ PROMOCAO',0xFF1744],LIMITADO:['⏳ LIMITADO',0x9C27B0]}[p.tag]:null;
const e=new EmbedBuilder().setColor(tag?tag[1]:C.INFO).setAuthor({name:(tag?'['+tag[0]+'] ':'')+p.nome.toUpperCase(),iconURL:I})
.setTitle('🏷️ '+p.nome).setDescription('> '+p.descricao+'\n\n'+L+'\n\n### ✅ BENEFICIOS:\n'+(p.beneficios||['Original','Entrega rapida','Suporte 24h','Garantia']).map(x=>' • '+x).join('\n')+'\n\n'+L)
.addFields({name:'💰 PRECO','value:'# **R$ '+v.toFixed(2).replace('.',',')+'** #'+(desc>0?'\n~~De: R$ '+p.preco.toFixed(2).replace('.',',')+'~~\nEconomia: R$ '+(p.preco-v).toFixed(2).replace('.',','):''),inline:false},
{name:'📦 Estoque','value:'```'+(p.estoque===-1?'♾️ ILIMITADO':p.estoque)+'```'+(p.estoque>0&&p.estoque<=5?'\n⚠️ **APENAS '+p.estoque+'!**':''),inline:true},
{name:'🚚 Entrega','value:'```AUTOMATICA```\n1-5 min',inline:true},{name:'📂 Categoria','value:'`'+(p.categoria||'GERAL')+'`',inline:true},
{name:'🔥 Vendas','value:'`'+(p.vendas||0)+'`',inline:true},{name:'⭐','value:'`'+(p.avaliacao||'5.0')+'`',inline:true});
if(p.imagem)e.setImage(p.imagem);if(p.video)e.addFields({name:'🎬 VIDEO DEMO','value:'🔗 [Clique para assistir]('+p.video+')',inline:false});return e},

entregue:(p,e)=>base(C.ENT,'✅ ENTREGUE','Obrigado por comprar!\n\n'+L).addFields({name:'🆔','value:'#'+p.id,inline:true},{name:'🛍️','value':p.produtoNome,inline:true},{name:'💸','value:'R$ '+p.valor.toFixed(2).replace('.',','),inline:true},{name:'📦 SEU PRODUTO','value:'```'+e.conteudo+'```',inline:false}),
painel:(s)=>base(C.VIP,'⚙️ PAINEL ADM • DASHBOARD','Controle total\n\n'+L).addFields({name:'🛒 Pedidos','value:String(s.pedidos),inline:true},{name:'✅ Entregues','value:String(s.entregues),inline:true},{name:'💸 Fat.','value:'R$ '+s.faturamento.toFixed(2).replace('.',','),inline:false},{name:'📦 Produtos','value:String(s.produtos),inline:true},{name:'👥 Clientes','value:String(s.clientes),inline:true},{name:'⭐ Media','value:s.avaliacao,inline:true}),
sucesso:(t,d)=>base(C.SUCESSO,'✅ '+t,d),erro:(t,d)=>base(C.ERRO,'❌ '+t,d),info:(t,d)=>base(C.INFO,'ℹ️ '+t,d),aviso:(t,d)=>base(C.AVISO,'⚠️ '+t,d),
statusBot:(d)=>base(C.INFO,'🤖 STATUS SISTEMA','Relatorio em tempo real').addFields({name:'🟢','value:'```ONLINE```',inline:true},{name:'⏱️','value:'```'+d.uptime+'```',inline:true},{name:'🏷️','value:'```PRO 3.0```',inline:true},{name:'🏰','value:String(d.guilds),inline:true},{name:'👥','value:String(d.users),inline:true},{name:'📦','value:String(d.produtos),inline:true},{name:'📋','value:String(d.pedidos),inline:true},{name:'✅','value:String(d.entregues),inline:true},{name:'💸','value:'R$ '+d.faturamento.toFixed(2).replace('.',','),inline:true},{name:'🔊 Voz','value:d.voz?'✅ <#'+d.voz+'>':'❌',inline:true},{name:'💡 Mem','value:d.memoria,inline:true},{name:'⚡ Ping','value:d.ping+'ms',inline:true}),
equipe:(d,a)=>base(C.VIP,'👑 EQUIPE AUTORIZADA','').addFields({name:'👑 DONO','value:d.length?d.map(x=>'<@'+x+'>').join('\n'):'Nenhum'},{name:'⚙️ GERENTES','value:a.filter(x=>x.nivel==='GERENTE').map(x=>'<@'+x.id+'>').join('\n')||'Nenhum'},{name:'💼 VENDEDORES','value:a.filter(x=>x.nivel==='VENDEDOR').map(x=>'<@'+x.id+'>').join('\n')||'Nenhum'},{name:'📦 ESTOQUISTAS','value:a.filter(x=>x.nivel==='ESTOQUE').map(x=>'<@'+x.id+'>').join('\n')||'Nenhum'}),
ranking:(lista)=>base(C.DOURADO,'🏅 RANKING TOP CLIENTES','Os que mais compraram:\n\n'+L).addFields({name:'📊 TOP 10','value:lista.length?lista.map((x,i)=>'**'+(i+1)+'º** <@'+x.id+'> • R$ '+x.total.toFixed(2).replace('.',',')+' • '+x.compras+'x').join('\n'):'Sem dados ainda',inline:false}),
sorteio:(s)=>base(C.VIP,'🎁 SORTEIO ATIVO','Concorra a **'+s.premio+'**!\n\n'+L).addFields({name:'💰 Premio','value:s.premio,inline:true},{name:'📅 Data','value:new Date(s.dataSorteio).toLocaleString('pt-BR'),inline:true},{name:'🎫 Participantes','value:String(s.participantes?.length||0),inline:true},{name:'✅ Como participar','value:'Compre acima de R$ '+s.valorMinimo.toFixed(2).replace('.',',')+' e ja esta dentro!',inline:false}),
cupomAplicado:(cup,antigo,novo)=>base(C.DOURADO,'🎟️ CUPOM APLICADO!','**'+cup.codigo.toUpperCase()+'**\n\n'+L).addFields({name:'💸 Desconto','value:cup.tipo==='PORCENTO'?cup.valor+'% OFF':'R$ '+cup.valor.toFixed(2).replace('.',',')+' OFF',inline:true},{name:'💰 Antes','value:'R$ '+antigo.toFixed(2).replace('.',','),inline:true},{name:'💳 NOVO VALOR','value:'## R$ '+novo.toFixed(2).replace('.',','),inline:false})
};
