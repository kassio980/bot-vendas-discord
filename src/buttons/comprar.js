const{ActionRowBuilder,ButtonBuilder,ButtonStyle,EmbedBuilder}=require('discord.js');const{ler,salvar,gerarId,addLog}=require('../../banco');
module.exports={id:'comprar',async execute(c,i,a){
const p=(ler('produtos.json')||[]).find(x=>x.id===a[0]);if(!p)return;
const ped={id:gerarId(),clienteId:i.user.id,clienteTag:i.user.tag,produtoId:p.id,produtoNome:p.nome,valor:p.preco,status:'AGUARDANDO',data:new Date().toISOString()};
const P=ler('pedidos.json')||[];P.unshift(ped);salvar('pedidos.json',P);addLog('alteracoes',{acao:'PEDIDO_NOVO',pedido:ped.id});
const e=new EmbedBuilder().setColor(0xF39C12).setTitle(`🟡 PEDIDO #${ped.id}`).addFields(
{name:'🛍️ Produto',value:p.nome,inline:true},{name:'💰 Valor',value:`R$${p.preco.toFixed(2)}`,inline:true},
{name:'🔑 CHAVE PIX',value:`\`\`\`${process.env.PIX_CHAVE||'COLOQUE NO .ENV (Render)'}\`\`\``,inline:false},
{name:'🏦 Banco',value:process.env.PIX_BANCO||'---',inline:true},{name:'👤 Nome',value:process.env.PIX_NOME||'---',inline:true});
const r=new ActionRowBuilder().addComponents(
new ButtonBuilder().setCustomId(`pago_${ped.id}`).setLabel('✅ JÁ PAGUEI').setStyle(3),
new ButtonBuilder().setCustomId(`cancelarped_${ped.id}`).setLabel('❌ CANCELAR').setStyle(4));
await i.update({embeds:[e],components:[r]})}};
