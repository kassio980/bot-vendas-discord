const {ModalBuilder,TextInputBuilder,TextInputStyle,ActionRowBuilder}=require('discord.js');
module.exports={id:'produto_criar',async execute(c,i){
const m=new ModalBuilder().setCustomId('modal_produto_criar').setTitle('➕ CRIAR NOVO PRODUTO');
const add=(id,l,p,r=true,s=TextInputStyle.Short,ph='')=>new ActionRowBuilder().addComponents(new TextInputBuilder().setCustomId(id).setLabel(l).setPlaceholder(p||ph).setStyle(s).setRequired(r));
m.addComponents(
add('nome','📦 Nome do produto','Ex: VIP 30 DIAS - PREMIUM'),
add('descricao','📝 Descricao detalhada','Descreva beneficios, garantia, tempo de entrega...',true,TextInputStyle.Paragraph),
add('preco','💸 Preco (apenas numeros)','Ex: 29.90'),
add('estoque','📦 Estoque (-1 = ilimitado)','Ex: 50 ou -1'),
add('tipo','🚚 Tipo entrega | CATEGORIA | FOTO | DESTAQUE','codigo | GERAL | https://link-da-foto.jpg | SIM',true,TextInputStyle.Paragraph,'Formato: TIPO | CATEGORIA | URL_IMAGEM | SIM/NAO (destaque)'));
await i.showModal(m)}};
