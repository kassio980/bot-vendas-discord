const {SlashCommandBuilder}=require('discord.js');const {sucesso,erro}=require('../../embeds');const {criarIndicacao}=require('../../banco');
module.exports={data:new SlashCommandBuilder().setName('indicar').setDescription('🔗 Indique um amigo e ganhe cashback').addUserOption(o=>o.setName('amigo').setRequired(true)),
async execute(c,i){const am=i.options.getUser('amigo');if(am.id===i.user.id)return i.reply({embeds:[erro('INVALIDO','Nao pode se auto-indicar')],ephemeral:true});
const r=criarIndicacao(i.user.id,am.id,5);if(!r)return i.reply({embeds:[erro('JA INDICADO','Este usuario ja foi indicado')],ephemeral:true});
await i.reply({embeds:[sucesso('INDICACAO CADASTRADA!','🔗 <@'+am.id+'> indicado por voce!\n\nQuando ele fizer a PRIMEIRA compra, voce ganha **5% DE CASHBACK** automaticamente na sua carteira!')],ephemeral:true})}};
