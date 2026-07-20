const {ModalBuilder,TextInputBuilder,TextInputStyle,ActionRowBuilder}=require('discord.js');
module.exports={id:'entregar_produto',async execute(c,i,a){
const m=new ModalBuilder().setCustomId('modal_entregar_'+a[0]).setTitle('✅ ENTREGAR PEDIDO #'+a[0]);
const tipo=new ActionRowBuilder().addComponents(new TextInputBuilder().setCustomId('tipo').setLabel('Tipo de entrega').setPlaceholder('codigo | link | arquivo | mensagem | cargo').setValue('codigo').setStyle(TextInputStyle.Short).setRequired(true));
const conteudo=new ActionRowBuilder().addComponents(new TextInputBuilder().setCustomId('conteudo').setLabel('Conteudo do produto (cole aqui tudo)').setPlaceholder('Ex: login:senha ou https://...').setStyle(TextInputStyle.Paragraph).setRequired(true));
const obs=new ActionRowBuilder().addComponents(new TextInputBuilder().setCustomId('obs').setLabel('Observacao (opcional)').setPlaceholder('Instrucoes extras para o cliente...').setStyle(TextInputStyle.Short).setRequired(false));
m.addComponents(tipo,conteudo,obs);await i.showModal(m)}};
