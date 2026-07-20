const {ActionRowBuilder,ButtonBuilder,ButtonStyle,ChannelType,PermissionFlagsBits}=require('discord.js');
const {ler,salvar,gerarId,addLog}=require('../../banco');
const {produto,ticketCriado,erro}=require('../../embeds');
module.exports={id:'sel_comprar',async execute(c,i,a){
const pid=i.values[0];
const PRODS=ler('produtos')||[];const p=PRODS.find(x=>x.id===pid);
if(!p)return i.update({embeds:[erro('PRODUTO NAO ENCONTRADO','Este produto nao existe mais ou foi removido.')],components:[]});
if(p.estoque===0)return i.update({embeds:[erro('ESGOTADO','Este produto esta fora de estoque no momento.')],components:[]});

// CRIA PEDIDO
const pedido={id:gerarId(),clienteId:i.user.id,clienteTag:i.user.tag,produtoId:p.id,produtoNome:p.nome,valor:p.preco,status:'AGUARDANDO',data:new Date().toISOString(),canalId:null};
const PEDS=ler('pedidos')||[];PEDS.unshift(pedido);salvar('pedidos',PEDS);

// CRIA CANAL PRIVADO
const catId=process.env.CATEGORIA_TICKETS||null;
const overwrites=[
{id:i.guild.id,deny:[PermissionFlagsBits.ViewChannel]},
{id:i.user.id,allow:[PermissionFlagsBits.ViewChannel,PermissionFlagsBits.SendMessages,PermissionFlagsBits.ReadMessageHistory,PermissionFlagsBits.AttachFiles]},
{id:c.user.id,allow:[PermissionFlagsBits.ViewChannel,PermissionFlagsBits.SendMessages,PermissionFlagsBits.ManageMessages]}];
const DONO=process.env.DONO_ID;if(DONO)overwrites.push({id:DONO,allow:[PermissionFlagsBits.ViewChannel,PermissionFlagsBits.SendMessages]});
try{
const canal=await i.guild.channels.create({
name:'🛒-pedido-'+pedido.id.toLowerCase(),
type:ChannelType.GuildText,
parent:catId||null,
topic:'Pedido #'+pedido.id+' | Cliente: '+i.user.tag+' | Valor: R$'+p.preco.toFixed(2),
permissionOverwrites:overwrites,
reason:'Compra automatica - Pedido #'+pedido.id});

pedido.canalId=canal.id;salvar('pedidos',PEDS);
const TICKS=ler('tickets')||[];TICKS.unshift({id:pedido.id,canalId:canal.id,clienteId:i.user.id,pedidoId:pedido.id,aberto:true,data:new Date().toISOString()});salvar('tickets',TICKS);
addLog('alteracoes',{acao:'TICKET_ABERTO',pedido:pedido.id,cliente:i.user.id});

// BOTOES NO CANAL
const r=new ActionRowBuilder().addComponents(
new ButtonBuilder().setCustomId('pagar_'+pedido.id).setLabel('💳 PIX PAGAR AGORA').setStyle(3),
new ButtonBuilder().setCustomId('ja_paguei_'+pedido.id).setLabel('✅ JA PAGUEI').setStyle(1),
new ButtonBuilder().setCustomId('cancelar_pedido_'+pedido.id).setLabel('❌ CANCELAR').setStyle(4));

await canal.send({content:'||<@'+i.user.id+'>|| <@'+DONO+'>',embeds:[produto(p)],components:[r]});
await canal.send('> 📌 **Regras:** Nao compartilhe este canal. Tudo aqui e confidencial. Apos o pagamento, clique em **✅ JA PAGUEI** para agilizar!');

// AVISA O CLIENTE
await i.update({embeds:[ticketCriado(pedido,canal.id)],components:[]});
}catch(e){console.log('ERRO CRIAR CANAL:',e);await i.update({embeds:[erro('ERRO AO CRIAR CANAL',e.message)],components:[]})}
}};
