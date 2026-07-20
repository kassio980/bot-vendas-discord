const {ModalBuilder,TextInputBuilder,TextInputStyle,ActionRowBuilder}=require('discord.js');
module.exports={id:'produto_criar',async execute(c,i){
const m=new ModalBuilder().setCustomId('modal_produto_criar').setTitle('➕ CRIAR NOVO PRODUTO');
const f=(id,l,ph,r=true,s=TextInputStyle.Short)=>new ActionRowBuilder().addComponents(new TextInputBuilder().setCustomId(id).setLabel(l).setPlaceholder(ph).setStyle(s).setRequired(r));
m.addComponents(
f('nome','📦 NOME DO PRODUTO','Ex: VIP 30 DIAS - PREMIUM'),
f('descricao','📝 DESCRICAO DETALHADA','Descreva beneficios, garantia, tempo de entrega...',true,TextInputStyle.Paragraph),
f('preco','💸 PRECO (apenas numeros)','Ex: 29.90'),
f('estoque','📦 ESTOQUE (-1 = ilimitado)','Ex: 50 ou -1'),
f('extra','🚚 TIPO | CATEGORIA | FOTO | VIDEO | TAG | DESTAQUE | BENEFICIOS','codigo | VIP | https://foto.jpg | https://youtu.be/xxx | MAIS_VENDIDO | SIM | Beneficio 1;;;Beneficio 2;;;Beneficio 3',true,TextInputStyle.Paragraph,'FORMATO: TIPO | CAT | URL_FOTO | URL_VIDEO | TAG | SIM/NAO (destaque) | B1;;;B2;;;B3'));
await i.showModal(m)}};
