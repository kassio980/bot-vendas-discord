const {ModalBuilder,TextInputBuilder,TextInputStyle,ActionRowBuilder}=require('discord.js');
module.exports={id:'produto_criar',async execute(c,i){
const m=new ModalBuilder().setCustomId('modal_produto_criar').setTitle('➕ CRIAR PRODUTO');
const f=(id,l,p,r=true,s=TextInputStyle.Short)=>new ActionRowBuilder().addComponents(new TextInputBuilder().setCustomId(id).setLabel(l).setPlaceholder(p).setStyle(s).setRequired(r));
m.addComponents(f('nome','Nome','Ex: VIP 1 Mês'),f('descricao','Descrição','Descreva',true,TextInputStyle.Paragraph),f('preco','Preço ex: 29.90','Numero'),f('estoque','Estoque (-1=∞)','10'),f('entrega','Tipo: codigo|cargo|arquivo|link|msg','codigo'));
await i.showModal(m)}};
