const {ModalBuilder,TextInputBuilder,TextInputStyle,ActionRowBuilder}=require('discord.js');
module.exports={id:'entregar_produto',async execute(c,i,a){
const m=new ModalBuilder().setCustomId('modal_entregar_'+a[0]).setTitle('✅ ENTREGAR PEDIDO #'+a[0]);
const f=(id,l,ph,r=true,s=TextInputStyle.Short)=>new ActionRowBuilder().addComponents(new TextInputBuilder().setCustomId(id).setLabel(l).setPlaceholder(ph).setStyle(s).setRequired(r));
m.addComponents(
f('tipo','📋 Tipo de entrega','codigo | link | arquivo | mensagem | cargo'),
f('conteudo','📦 CONTEUDO DO PRODUTO (cole tudo aqui)','Ex: login:senha123 ou https://seulink.com',true,TextInputStyle.Paragraph),
f('obs','📝 Observacao para o cliente (opcional)','Instrucoes extras, garantia, etc...',false,TextInputStyle.Short),
f('foto','🖼️ URL FOTO EXTRA (opcional)','https://link-da-imagem.jpg',false));
await i.showModal(m)}};
