const {SlashCommandBuilder,ActionRowBuilder,ButtonBuilder,ButtonStyle,EmbedBuilder}=require('discord.js');
const {ler,salvar}=require('../utils/banco');
const ren=require('../utils/render');
module.exports={
data:new SlashCommandBuilder().setName('sistema').setDescription('⚙️ Controle ADM')
.addSubcommand(s=>s.setName('render').setDescription('🔌 Ligar/Desligar/Reiniciar'))
.addSubcommand(s=>s.setName('add-adm').setDescription('➕ Convidar ADM').addUserOption(u=>u.setName('u').setDescription('Usuário').setRequired(true)))
.addSubcommand(s=>s.setName('del-adm').setDescription('➖ Remover ADM').addUserOption(u=>u.setName('u').setDescription('Usuário').setRequired(true)))
.addSubcommand(s=>s.setName('adms').setDescription('📜 Lista de ADMs')),
async execute(c,i){
const cfg=ler('config.json');const D=cfg.donos||[];const A=cfg.admsAutorizados||[];const eu=i.user.id;
if(!D.includes(eu)&&!A.some(x=>x.id===eu&&x.ativo))return i.reply({content:'❌ Sem permissão',ephemeral:true});
const sb=i.options.getSubcommand();

if(sb==='render'){
let st='verificando';try{const s=await ren.status();st=JSON.parse(s.body||'{}').service?.status||'indefinido'}catch{}
const e=new EmbedBuilder().setColor(0x9B59B6).setTitle('🔌 CONTROLE RENDER').addFields({name:'Status',value:`\`${st}\``});
const r=new ActionRowBuilder().addComponents(
new ButtonBuilder().setCustomId('ren_ligar').setLabel('🟢 Ligar').setStyle(3),
new ButtonBuilder().setCustomId('ren_desligar').setLabel('🔴 Desligar').setStyle(4),
new ButtonBuilder().setCustomId('ren_reiniciar').setLabel('🔁 Reiniciar').setStyle(1),
new ButtonBuilder().setCustomId('ren_status').setLabel('🔃 Atualizar').setStyle(2));
return i.reply({embeds:[e],components:[r],ephemeral:true});
}
if(sb==='add-adm'){const u=i.options.getUser('u');if(D.includes(u.id)||A.some(x=>x.id===u.id))return i.reply({content:'❌ Já é ADM',ephemeral:true});A.push({id:u.id,nome:u.tag,por:eu,data:new Date().toISOString(),ativo:true});salvar('config.json',cfg);return i.reply({content:`✅ ${u} agora é ADM`,ephemeral:true})}
if(sb==='del-adm'){const u=i.options.getUser('u');const x=A.findIndex(z=>z.id===u.id);if(x===-1)return i.reply({content:'❌ Não encontrado',ephemeral:true});A.splice(x,1);salvar('config.json',cfg);return i.reply({content:`➖ ${u} removido`,ephemeral:true})}
if(sb==='adms'){return i.reply({embeds:[new EmbedBuilder().setColor(0x3498DB).setTitle('👑 EQUIPE').addFields({name:'Donos',value:D.length?D.map(x=>`<@${x}>`).join('\n'):'Nenhum'},{name:'ADMs',value:A.length?A.map(x=>`<@${x.id}> • ${x.nome}`).join('\n'):'Nenhum'})],ephemeral:true})}
}};
