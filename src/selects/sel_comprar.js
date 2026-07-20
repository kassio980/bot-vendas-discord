const {ActionRowBuilder,ButtonBuilder,ButtonStyle,ChannelType,PermissionFlagsBits}=require('discord.js');
const {ler,salvar,gerarId,addLog,produtoPorId}=require('../../banco');
const {produto,ticketCriado,erro}=require('../../embeds');
const {logCanal}=require('../../sistema');
module.exports={id:'sel_comprar',async execute(c,i,a){
const pid=i.values[0];const p=produtoPorId(pid);
if(!p)return i.update({embeds:[erro('PRODUTO INDISPONIVEL','Este produto nao existe mais ou foi removido pelo ADM.')],components:[]});
if(p.estoque===0)return i.update({embeds:[erro('ESGOTADO','Produto temporariamente indisponivel. Tente novamente mais tarde.')],components:[]});

const pedido={id:gerarId(),clienteId:i.user.id,clienteTag:i.user.tag,produtoId:p.id,produtoNome:p.nome,valor:p.preco,imagemProduto:p.imagem||null,status:'AGUARDANDO',data:new Date().toISOString(),canalId:null};
const PEDS=ler('pedidos')||[];PEDS.unshift(pedido);salvar('pedidos',PEDS);

const catId=process.env.CATEGORIA_TICKETS||null;
const DONO=process.env.DONO_ID;
const over=[
{id:i.guild.id,deny:[PermissionFlagsBits.ViewChannel]},
{id:i.user.id,allow:[PermissionFlagsBits.ViewChannel,PermissionFlagsBits.SendMessages,PermissionFlagsBits.ReadMessageHistory,PermissionFlagsBits.AttachFiles,PermissionFlagsBits.EmbedLinks]},
{id:c.user.id,allow:[PermissionFlagsBits.ViewChannel,PermissionFlagsBits.SendMessages,PermissionFlagsBits.ManageMessages,PermissionFlagsBits.ManageChannels]}];
if(DONO)over.push({id:DONO,allow:[PermissionFlagsBits.ViewChannel,PermissionFlagsBits.SendMessages]});

try{
const canal=await i.guild.channels.create({
name:'🛒-'+p.nome.toLowerCase().replace(/[^a-z0-9]/g,'').slice(0,12)+'-'+pedido.id.toLowerCase(),
type:ChannelType.GuildText,parent:catId||null,
topic:'🛒 Pedido #'+pedido.id+' • '+i.user.tag+' • R$'+p.preco.toFixed(2),
permissionOverwrites:over,reason:'Compra automatica #'+pedido.id});

pedido.canalId=canal.id;salvar('pedidos',PEDS);
const T=ler('tickets')||[];T.unshift({id:pedido.id,canalId:canal.id,clienteId:i.user.id,pedidoId:pedido.id,aberto:true,data:new Date().toISOString()});salvar('tickets',T);
addLog('alteracoes',{acao:'TICKET_ABERTO',pedido:pedido.id,produto:p.nome,valor:p.preco});
logCanal(c,'🛒 NOVO PEDIDO','**# '+pedido.id+'**\n👤 <@'+i.user.id+'>\n🛍️ '+p.nome+'\n💸 R$ '+p.preco.toFixed(2),0x9B59B6);

const r=new ActionRowBuilder().addComponents(
new ButtonBuilder().setCustomId('pagar_'+pedido.id).setLabel('💳 PIX PAGAR AGORA').setStyle(3).setEmoji('💳'),
new ButtonBuilder().setCustomId('ja_paguei_'+pedido.id).setLabel('✅ JA PAGUEI').setStyle(1).setEmoji('✅'),
new ButtonBuilder().setCustomId('cancelar_pedido_'+pedido.id).setLabel('❌ CANCELAR').setStyle(4).setEmoji('❌'));

const emb=produto(p,true);
await canal.send({content:'||<@'+i.user.id+'>|| <@'+(DONO||'everyone')+'>\n\n# 🛒 BEM-VINDO AO SEU ATENDIMENTO PRIVADO',embeds:[emb],components:[r]});
await canal.send('> 📌 **Instrucoes:**\n> 1. Clique em **💳 PIX PAGAR AGORA** para ver a chave\n> 2. Efetue o pagamento **exato**\n> 3. Clique em **✅ JA PAGUEI** apos pagar\n> 4. Aguarde a confirmacao (ate 5 min)\n> ❌ Nao compartilhe este canal com ninguem!');

await i.update({embeds:[ticketCriado(pedido,canal.id)],components:[]});
}catch(e){console.log('ERRO CANAL:',e);await i.update({embeds:[erro('ERRO INTERNO',e.message)],components:[]})}
}};
