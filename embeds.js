const {EmbedBuilder}=require('discord.js');
const COR={SUCESSO:0x2ECC71,ERRO:0xE74C3C,INFO:0x3498DB,AVISO:0xF39C12,VIP:0x9B59B6,PAGAMENTO:0x1ABC9C,ENTREGA:0x27AE60,PEDIDO:0xE67E22};
const base=(c,t,d)=>new EmbedBuilder().setColor(c).setTitle(t).setDescription(d||null).setTimestamp().setFooter({text:'💛 MINION STORE',iconURL:'https://i.imgur.com/AfFp7pu.png'});
module.exports={
loja:cfg=>base(COR.VIP,'🛒 MINION STORE',cfg.mensagem_loja||'Bem-vindo a nossa loja! Escolha uma opcao abaixo.').setThumbnail(cfg.imagem_loja||null),
produto:p=>base(COR.INFO,'🛍️ '+p.nome,p.descricao||'Sem descricao').addFields(
{name:'💸 Preco',value:'**R$ '+p.preco.toFixed(2)+'**',inline:true},
{name:'📦 Estoque',value:p.estoque===-1?'♾️ Ilimitado':String(p.estoque),inline:true},
{name:'🚚 Entrega',value:'`'+(p.tipoEntrega||'automatica')+'`',inline:true}),
ticketCriado:(p,canal)=>base(COR.PAGAMENTO,'📩 TICKET ABERTO #'+p.id,'Seu atendimento foi criado em <#'+canal+'>\n\nPor favor, acesse o canal para finalizar sua compra com seguranca!').setFooter({text:'Atendimento automatico • MINION STORE'}),
pagamentoPix:p=>base(COR.PAGAMENTO,'💳 PAGAMENTO PIX • PEDIDO #'+p.id,'Por favor, efetue o pagamento exato abaixo para liberarmos seu produto o mais rapido possivel.\n\n**⚠️ APOS PAGAR, CLIQUE NO BOTAO ABAIXO**').addFields(
{name:'💰 VALOR EXATO',value:'# R$ '+p.valor.toFixed(2)+' #',inline:false},
{name:'🔑 CHAVE PIX (COPIA E COLA)',value:'```'+(process.env.PIX_CHAVE||'CHAVE NAO CONFIGURADA')+'```',inline:false},
{name:'🏦 Banco',value:process.env.PIX_BANCO||'---',inline:true},
{name:'👤 Favorecido',value:process.env.PIX_NOME||'---',inline:true},
{name:'⏳ Prazo de confirmacao',value:'Ate 5 minutos apos o pagamento',inline:false}).setImage('https://api.qrserver.com/v1/create-qr-code/?size=300x300&data='+encodeURIComponent(process.env.PIX_CHAVE||'')),
pagamentoEnviado:p=>base(COR.AVISO,'✅ PAGAMENTO SOLICITADO','Recebemos sua solicitacao de pagamento!\n\n**Nosso sistema esta verificando...**\nA confirmacao pode levar de 1 a 5 minutos.\n\nSe passar de 10 minutos, contate um ADM.').addFields({name:'📦 Pedido',value:'#'+p.id,inline:true},{name:'💸 Valor',value:'R$ '+p.valor.toFixed(2),inline:true}),
avisoDono:p=>base(COR.PEDIDO,'🔔 NOVO PAGAMENTO SOLICITADO','Um cliente solicitou confirmacao de pagamento!').addFields(
{name:'🆔 Pedido',value:'#'+p.id,inline:true},
{name:'👤 Cliente',value:'<@'+p.clienteId+'>\n`'+p.clienteTag+'`',inline:true},
{name:'🛍️ Produto',value:p.produtoNome,inline:false},
{name:'💸 Valor',value:'**R$ '+p.valor.toFixed(2)+'**',inline:true},
{name:'📅 Data',value:new Date(p.data).toLocaleString('pt-BR'),inline:true}),
entregue:p=>base(COR.ENTREGA,'✅ PEDIDO ENTREGUE COM SUCESSO','Seu produto foi entregue! Obrigado por comprar na MINION STORE 💛').addFields(
{name:'🆔 Pedido',value:'#'+p.id,inline:true},
{name:'🛍️ Produto',value:p.produtoNome,inline:true},
{name:'💸 Valor pago',value:'R$ '+p.valor.toFixed(2),inline:true}),
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
painel:()=>base(COR.VIP,'⚙️ PAINEL ADMINISTRATIVO','Controle total da sua loja em um so lugar.').addFields(
{name:'📊 Acoes rapidas',value:'Escolha abaixo o que deseja gerenciar',inline:false}),
painelProdutos:()=>base(COR.INFO,'📦 GERENCIAR PRODUTOS','Crie, edite, remova e gerencie todo o seu catalogo.'),
painelPedidos:lista=>base(COR.PEDIDO,'📋 GERENCIAR PEDIDOS','Total de pedidos: **'+lista.length+'**').addFields(
{name:'🟡 Aguardando',value:String(lista.filter(x=>x.status==='AGUARDANDO').length),inline:true},
{name:'💳 Pagos',value:String(lista.filter(x=>x.status==='PAGO'||x.status==='APROVADO').length),inline:true},
{name:'✅ Entregues',value:String(lista.filter(x=>x.status==='ENTREGUE').length),inline:true},
{name:'❌ Cancelados',value:String(lista.filter(x=>x.status==='CANCELADO').length),inline:true}),
listaProdutos:lista=>{const e=base(COR.INFO,'📋 LISTA DE PRODUTOS','Total: **'+lista.length+'** produtos cadastrados');
lista.slice(0,20).forEach(p=>e.addFields({name:'🆔 '+p.id+' • '+p.nome,value:'R$ '+p.preco.toFixed(2)+' | Est:'+(p.estoque===-1?'∞':p.estoque)+' | '+p.tipoEntrega,inline:false}));return e},
listaAdms:(donos,adms)=>base(COR.VIP,'👑 EQUIPE DA LOJA','Pessoas autorizadas a gerenciar a loja.').addFields(
{name:'👑 DONO PRINCIPAL',value:donos.length?donos.map(x=>'<@'+x+'>').join('\n'):'Nenhum',inline:false},
{name:'🛡️ ADMINISTRADORES',value:adms.length?adms.map(x=>'<@'+x.id+'> • '+x.nome).join('\n'):'Nenhum convidado ainda',inline:false}),
renderPainel:st=>base(COR.INFO,'🔌 CONTROLE DO SERVIDOR','Ligue, desligue ou reinicie sua hospedagem diretamente daqui.').addFields({name:'Status atual',value:'`'+st+'`',inline:false})
};
