const {SlashCommandBuilder}=require('discord.js');const {nivelLoja}=require('../../embeds');const {calcularNivelLoja,verificarConquistas}=require('../../banco');
module.exports={data:new SlashCommandBuilder().setName('nivel').setDescription('📊 Ver nivel da loja'),
async execute(c,i){const v=verificarConquistas();await i.reply({embeds:[nivelLoja(v.res,v.loja)]})}};
