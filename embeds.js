const {EmbedBuilder}=require('discord.js');
const cfg=require('./banco').ler('config')||{};
const COR={SUCESSO:0x00C853,ERRO:0xFF1744,INFO:0x2979FF,AVISO:0xFF9100,VIP:0x7B1FA2,PAGAMENTO:0x00BFA5,ENTREGA:0x00E676,PEDIDO:0xFF6D00,PRETO:0x121212};
const MARCA='💛 MINION STORE • ';
const ICONE='https://i.imgur.com/AfFp7pu.png';
const base=(c,t,d)=>new EmbedBuilder().setColor(c).setAuthor({name:MARCA+'Sistema Oficial',iconURL:ICONE}).setTitle(t).setDescription(d||null).setTimestamp().setFooter({text:MARCA+'A sua loja automatica',iconURL:ICONE});

module.exports={
COR,MARCA,ICONE,
loja:()=>{const e=base(COR.VIP,'🛒 MINION STORE • LOJA OFICIAL',(cfg.mensagem_loja||'Bem-vindo a melhor loja do Discord! Atendimento 100% automatico e seguro.')+'\n\n👇 Escolha uma opcao abaixo para comecar:');
if(cfg.banner_loja)e.setImage(cfg.banner_loja);return e},
produto:(p,full=false)=>{const e=base(COR.INFO,'🛍️ '+p.nome,p.descricao||'Produto de alta qualidade, entrega rapida e garantida!').addFields(
{name:'💸 Preco',value:'```R$ '+p.preco.toFixed(2)+'```',inline:true},
{name:'📦 Estoque',value:'```'+(p.estoque===-1?'♾️ ILIMITADO':p.estoque)+'```',inline:true},
{name:'🚚 Entrega',value:'```'+(p.tipoEntrega||'AUTOMATICA')+'```',inline:true},
{name:'📂 Categoria',value:'`'+(p.categoria||'GERAL')+'`',inline:true},
{name:'🔥 Vendas',value:'`'+(p.vendas||0)+' unid.`',inline:true},
{name:'⭐ Avaliacao',value:'`'+(p.avaliacao||'5.0')+'`',inline:true});
if(p.imagem)e.setImage(p.imagem);if(p.destaque)e.addFields({name:'⭐ DESTAQUE',value:'Este e um dos nossos produtos mais vendidos!',inline:false});
return e},
ticketCriado:(p,canal)=>base(COR.PAGAMENTO,'📩 TICKET ABERTO COM SUCESSO #'+p.id,'Seu atendimento **privado e confidencial** foi criado!\n\n👉 Acesse agora: <#'+canal+'>\n\nLá voce encontrara todas as informacoes para finalizar sua compra com seguranca total.').addFields({name:'🛍️ Produto',value:p.produtoNome,inline:true},{name:'💸 Valor',value:'R$ '+p.valor.toFixed(2),inline:true},{name:'⏳ Tempo medio',value:'1 a 5 minutos apos o pagamento',inline:true}),
pagamentoPix:p=>{const e=base(COR.PAGAMENTO,'💳 PAGAMENTO VIA PIX • PEDIDO #'+p.id,'✅ **PAGAMENTO 100% SEGURO**\nEfetuando o pagamento exato abaixo, seu produto sera liberado automaticamente em ate 5 minutos.\n\n⚠️ **Apos pagar, clique obrigatoriamente no botao ✅ JA PAGUEI**').addFields(
{name:'💰 VALOR EXATO',value:'# R$ '+p.valor.toFixed(2)+' #',inline:false},
{name:'🔑 CHAVE PIX (COPIA E COLA)',value:'```'+(process.env.PIX_CHAVE||'CHAVE NAO CONFIGURADA NO RENDER')+'```',inline:false},
{name:'🏦 Banco',value:process.env.PIX_BANCO||'---',inline:true},
{name:'👤 Favorecido',value:process.env.PIX_NOME||'---',inline:true},
{name:'📌 Pedido',value:'#'+p.id,inline:true},
{name:'⏳ Prazo',value:'Ate 5 min',inline:true});
e.setImage('https://api.qrserver.com/v1/create-qr-code/?size=320x320&margin=10&data='+encodeURIComponent(process.env.PIX_CHAVE||''));return e},
pagamentoEnviado:p=>base(COR.AVISO,'✅ SOLICITACAO DE PAGAMENTO ENVIADA','Recebemos sua solicitacao com sucesso!\n\n**Nosso sistema ja esta verificando a transacao...**\nA confirmacao costuma levar de 1 a 5 minutos.\n\nSe passar de 10 minutos sem retorno, mencione um ADM no canal.').addFields({name:'📦 Pedido',value:'#'+p.id,inline:true},{name:'💸 Valor pago',value:'R$ '+p.valor.toFixed(2),inline:true}),
avisoDono:p=>{const e=base(COR.PEDIDO,'🔔 NOVO PAGAMENTO PARA CONFIRMAR','Um cliente acabou de solicitar confirmacao de pagamento!').addFields(
{name:'🆔 Pedido',value:'#'+p.id,inline:true},
{name:'👤 Cliente',value:'<@'+p.clienteId+'>\n`'+p.clienteTag+'`',inline:true},
{name:'🛍️ Produto',value:p.produtoNome,inline:false},
{name:'💸 Valor',value:'**R$ '+p.valor.toFixed(2)+'**',inline:true},
{name:'📅 Data/Hora',value:new Date(p.data).toLocaleString('pt-BR'),inline:true},
{name:'📞 Canal',value:p.canalId?'<#'+p.canalId+'>':'---',inline:true});
if(p.imagemProduto)e.setThumbnail(p.imagemProduto);return e},
entregue:(p,entrega)=>{const e=base(COR.ENTREGA,'✅ PEDIDO ENTREGUE COM SUCESSO','Obrigado por comprar na **💛 MINION STORE**!\n\nAbaixo esta o seu produto, guarde bem!\n\n**⭐ Gostou do servico? Avalie-nos abaixo!**').addFields(
{name:'🆔 Pedido',value:'#'+p.id,inline:true},
{name:'🛍️ Produto',value:p.produtoNome,inline:true},
{name:'💸 Valor pago',value:'R$ '+p.valor.toFixed(2),inline:true},
{name:'📋 Tipo de entrega',value:'`'+(entrega?.tipo||'codigo')+'`',inline:true});
if(entrega?.conteudo)e.addFields({name:'📦 SEU PRODUTO 👇','value':'```'+entrega.conteudo+'```',inline:false});
if(entrega?.obs)e.addFields({name:'📝 Observacao','value':entrega.obs,inline:false});
if(p.imagemProduto)e.setImage(p.imagemProduto);return e},
sucesso:(t,d)=>base(COR.SUCESSO,'✅ '+t,d),
erro:(t,d)=>base(COR.ERRO,'❌ '+t,d),
info:(t,d)=>base(COR.INFO,'ℹ️ '+t,d),
aviso:(t,d)=>base(COR.AVISO,'⚠️ '+t,d),
pedido:p=>{const C={AGUARDANDO:COR.AVISO,PAGO:COR.PAGAMENTO,APROVADO:COR.INFO,ENTREGUE:COR.ENTREGA,CANCELADO:COR.ERRO};
return base(C[p.status]||COR.INFO,'📦 PEDIDO #'+p.id).addFields(
{name:'👤 Cliente',value:'<@'+p.clienteId+'>',inline:true},
{name:'🛍️ Produto',value:p.produtoNome,inline:true},
{name:'💸 Valor',value:'**R$ '+p.valor.toFixed(2)+'**',inline:true},
{name:'📊 Status',value:'`'+p.status+'`',inline:true},
{name:'📅 Criado',value:new Date(p.data).toLocaleString('pt-BR'),inline:true},
p.dataEntrega?{name:'✅ Entregue em',value:new Date(p.dataEntrega).toLocaleString('pt-BR'),inline:true}:{name:'\u200b',value:'\u200b',inline:true})},
painel:(stats)=>{const e=base(COR.VIP,'⚙️ PAINEL ADMINISTRATIVO','Controle **TOTAL** da sua loja em um so lugar. Gerencie produtos, pedidos, entregas e muito mais.').addFields(
{name:'📊 ESTATISTICAS GERAIS',value:'---',inline:false},
{name:'🛒 Pedidos totais',value:String(stats.pedidos||0),inline:true},
{name:'✅ Entregues',value:String(stats.entregues||0),inline:true},
{name:'💸 Faturamento',value:'R$ '+(stats.faturamento||0).toFixed(2),inline:true},
{name:'📦 Produtos cadastrados',value:String(stats.produtos||0),inline:true},
{name:'👥 Clientes unicos',value:String(stats.clientes||0),inline:true},
{name:'⭐ Media avaliacoes',value:(stats.avaliacao||'5.0'),inline:true});
if(cfg.banner_loja)e.setThumbnail(cfg.banner_loja);return e},
painelProdutos:()=>base(COR.INFO,'📦 GERENCIAR PRODUTOS','Crie, edite, remova, adicione **FOTOS**, defina categorias e coloque em destaque.'),
listaProdutos:lista=>{const e=base(COR.INFO,'📋 LISTA COMPLETA DE PRODUTOS','Total: **'+lista.length+'** produtos cadastrados');
lista.slice(0,20).forEach(p=>e.addFields({name:'🆔 '+p.id+' • '+p.nome+(p.destaque?' ⭐':''),value:'R$ '+p.preco.toFixed(2)+' | Est:'+(p.estoque===-1?'∞':p.estoque)+' | '+p.categoria+' | Vendas:'+(p.vendas||0),inline:false}));return e},
listaAdms:(donos,adms)=>base(COR.VIP,'👑 EQUIPE AUTORIZADA','Pessoas com acesso ao painel administrativo.').addFields(
{name:'👑 DONO PRINCIPAL',value:donos.length?donos.map(x=>'<@'+x+'>').join('\n'):'Nenhum configurado',inline:false},
{name:'🛡️ ADMINISTRADORES CONVIDADOS',value:adms.length?adms.map(x=>'<@'+x.id+'> • '+x.nome).join('\n'):'Nenhum convidado ainda',inline:false}),
renderPainel:st=>base(COR.INFO,'🔌 CONTROLE DE HOSPEDAGEM','Ligue, desligue ou reinicie seu servidor **sem sair do Discord**!').addFields({name:'Status atual do servico',value:'```'+st+'```',inline:false}),
statusBot:(dados)=>{const e=base(COR.INFO,'🤖 STATUS DO SISTEMA','Relatorio completo em tempo real').addFields(
{name:'🟢 Estado',value:'```ONLINE```',inline:true},
{name:'⏱️ Tempo online',value:'```'+dados.uptime+'```',inline:true},
{name:'🏷️ Versao',value:'```PRO 2.0```',inline:true},
{name:'🏰 Servidores',value:String(dados.guilds),inline:true},
{name:'👥 Usuarios',value:String(dados.users),inline:true},
{name:'📦 Produtos',value:String(dados.produtos),inline:true},
{name:'📋 Pedidos',value:String(dados.pedidos),inline:true},
{name:'✅ Entregues',value:String(dados.entregues),inline:true},
{name:'💸 Faturamento',value:'R$ '+dados.faturamento.toFixed(2),inline:true},
{name:'🔊 Canal de voz',value:dados.voz?'✅ Conectado em <#'+dados.voz+'>':'❌ Desconectado',inline:true},
{name:'💡 Memoria usada',value:dados.memoria,inline:true},
{name:'⚡ Latencia API',value:dados.ping+'ms',inline:true});
if(cfg.banner_loja)e.setThumbnail(cfg.banner_loja);return e},
avaliarPedido:p=>base(COR.AVISO,'⭐ AVALIE NOSSO SERVICO','Sua opiniao e muito importante para nos!\n\nComo voce avalia a compra do **'+p.produtoNome+'**?').addFields({name:'🆔 Pedido',value:'#'+p.id,inline:true},{name:'💸 Valor',value:'R$ '+p.valor.toFixed(2),inline:true}),
obrigadoAvaliacao:(p,nota)=>base(COR.SUCESSO,'⭐ OBRIGADO PELA AVALIACAO!','Voce nos deu **'+nota+' estrelas**!\n\nSua avaliacao ajuda a melhorarmos cada vez mais.\n\n**Volte sempre! 💛 MINION STORE**').addFields({name:'Pedido',value:'#'+p.id,inline:true},{name:'Nota',value:'⭐'.repeat(nota)+'☆'.repeat(5-nota),inline:true})
};
