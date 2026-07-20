const {SlashCommandBuilder,ActionRowBuilder,ButtonBuilder,ButtonStyle,EmbedBuilder}=require('discord.js');
const {ler,salvar}=require('../../banco');
const ren=require('../../render_api');
module.exports={
data:new SlashCommandBuilder().setName('sistema').setDescription('⚙️ Controle Principal')
.addSubcommand(s=>s.setName('render').setDescription('🔌 Ligar/Desligar/Reiniciar Serviço'))
.addSubcommand(s=>s.setName('adicionar-adm').setDescription('➕ Convidar novo Administrador').addUserOption(u=>u.setName('usuario').setDescription('Quem vai virar ADM').setRequired(true)))
.addSubcommand(s=>s.setName('remover-adm').setDescription('➖ Remover Administrador').addUserOption(u=>u.setName('usuario').setDescription('Quem remover').setRequired(true)))
.addSubcommand(s=>s.setName('lista-adms').setDescription('📜 Ver todos os ADMs autorizados')),
async execute(c,i){
const cfg=ler('config.json');const D=cfg.donos||[];const A=cfg.admsAutorizados||[];const eU=i.user.id;
if(!D.includes(eU) && !A.some(x=>x.id===eU&&x.ativo)) return i.reply({content:'❌ Sem permissão',ephemeral:true});
const sub=i.options.getSubcommand();

if(sub==='render'){
let st='verificando';try{const s=await ren.status();st=JSON.parse(s.raw||'{}').service?.status||'indefinido'}catch{}
const e=new EmbedBuilder().setColor(0x9B59B6).setTitle('🔌 GERENCIAR RENDER').addFields({name:'Status atual',value:`\`${st}\``});
const r=new ActionRowBuilder().addComponents(
new ButtonBuilder().setCustomId('ren_ligar').setLabel('🟢 Ligar').setStyle(3),
new ButtonBuilder().setCustomId('ren_desligar').setLabel('🔴 Desligar').setStyle(4),
new ButtonBuilder().setCustomId('ren_reiniciar').setLabel('🔁 Reiniciar').setStyle(1),
new ButtonBuilder().setCustomId('ren_status').setLabel('🔃 Atualizar').setStyle(2));
return i.reply({embeds:[e],components:[r],ephemeral:true});
}

if(sub==='adicionar-adm'){
const u=i.options.getUser('usuario');if(D.includes(u.id))return i.reply({content:'❌ Já é dono',ephemeral:true});
if(A.some(x=>x.id===u.id))return i.reply({content:'❌ Já é ADM',ephemeral:true});
A.push({id:u.id,nome:u.tag,adicionadoPor:eU,data:new Date().toISOString(),ativo:true});salvar('config.json',cfg);
return i.reply({content:`✅ ${u} agora é Administrador`,ephemeral:true});
}

if(sub==='remover-adm'){
const u=i.options.getUser('usuario');const idx=A.findIndex(x=>x.id===u.id);if(idx===-1)return i.reply({content:'❌ Não encontrado',ephemeral:true});
A.splice(idx,1);salvar('config.json',cfg);return i.reply({content:`➖ ${u} removido`,ephemeral:true});
}

if(sub==='lista-adms'){
const txtD=D.length?D.map(x=>`<@${x}>`).join('\n'):'Nenhum';
const txtA=A.length?A.map(x=>`<@${x.id}> | ${x.nome}`).join('\n'):'Nenhum';
const e=new EmbedBuilder().setColor(0x3498DB).setTitle('👑 EQUIPE DE ADMINISTRAÇÃO')
.addFields({name:'👑 DONOS',value:txtD},{name:'🛡️ ADMS AUTORIZADOS',value:txtA});
return i.reply({embeds:[e],ephemeral:true});
}
}};
