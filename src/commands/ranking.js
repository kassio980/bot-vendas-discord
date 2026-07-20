const {SlashCommandBuilder}=require('discord.js');const {ranking}=require('../../embeds');const {ler}=require('../../banco');
module.exports={data:new SlashCommandBuilder().setName('ranking').setDescription('🏅 Top clientes'),
async execute(c,i){const r=Object.entries(ler('ranking')||{}).map(([id,v])=>({id,...v})).sort((a,b)=>b.total-a.total).slice(0,10);await i.reply({embeds:[ranking(r)]})}};
