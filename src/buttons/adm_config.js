const {ActionRowBuilder,ButtonBuilder,ButtonStyle,EmbedBuilder}=require('discord.js');
module.exports={id:'adm_config',async execute(c,i){
const e=new EmbedBuilder().setColor(0x34495E).setTitle('⚙️ CONFIGURACOES GERAIS').setDescription('Personalize sua loja!');
const r=new ActionRowBuilder().addComponents(
new ButtonBuilder().setCustomId('cfg_msgs').setLabel('💬 Mensagens').setStyle(1),
new ButtonBuilder().setCustomId('cfg_canais').setLabel('📢 Canais').setStyle(1),
new ButtonBuilder().setCustomId('cfg_cargos').setLabel('🎖️ Cargos').setStyle(1),
new ButtonBuilder().setCustomId('cfg_perms').setLabel('🔐 Permissoes').setStyle(2));
await i.update({embeds:[e],components:[r]})}};
