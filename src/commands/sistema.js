const {SlashCommandBuilder,ActionRowBuilder,ButtonBuilder,ButtonStyle}=require('discord.js');
const {ler,salvar}=require('../../banco');
const {listaAdms,renderPainel,sucesso,erro}=require('../../embeds');
const ren=require('../../render_api');
module.exports={
data:new SlashCommandBuilder().setName('sistema').setDescription('⚙️ Controle Principal')
.addSubcommand(s=>s.setName('render').setDescription('🔌 Gerenciar hospedagem'))
.addSubcommand(s=>s.setName('add-adm').setDescription('➕ Convidar ADM').addUserOption(u=>u.setName('usuario').setDescription('Pessoa').setRequired(true)))
.addSubcommand(s=>s.setName('del-adm').setDescription('➖ Remover ADM').addUserOption(u=>u.setName('usuario').setDescription('Pessoa').setRequired(true)))
.addSubcommand(s=>s.setName('lista-adms').setDescription('👑 Ver equipe')),
async execute(c,i){
const DONO=process.env.DONO_ID||'';const cfg=ler('config');
const PERM=(DONO&&i.user.id===DONO)||(cfg.donos||[]).includes(i.user.id);
if(!PERM)return i.reply({embeds:[erro('ACESSO NEGADO','Apenas o DONO principal pode usar este comando.')],ephemeral:true});
const sb=i.options.getSubcommand();
if(sb==='render'){
let st='offline';try{const s=await ren.status();st=s.json().service?.status||'verificando'}catch{}
const r=new ActionRowBuilder().addComponents(
new ButtonBuilder().setCustomId('ren_ligar').setLabel('🟢 Ligar').setStyle(3),
new ButtonBuilder().setCustomId('ren_desligar').setLabel('🔴 Desligar').setStyle(4),
new ButtonBuilder().setCustomId('ren_reiniciar').setLabel('🔁 Reiniciar').setStyle(1),
new ButtonBuilder().setCustomId('ren_status').setLabel('🔃 Atualizar').setStyle(2));
return i.reply({embeds:[renderPainel(st)],components:[r],ephemeral:true})}
if(sb==='add-adm'){const u=i.options.getUser('usuario');const A=cfg.admsAutorizados=cfg.admsAutorizados||[];
if(A.some(x=>x.id===u.id))return i.reply({embeds:[erro('JA EXISTE','Este usuario ja e ADM.')],ephemeral:true});
A.push({id:u.id,nome:u.tag,adicionadoPor:i.user.id,data:new Date().toISOString(),ativo:true});salvar('config',cfg);
return i.reply({embeds:[sucesso('ADM ADICIONADO','<@'+u.id+'> agora faz parte da equipe!')],ephemeral:true})}
if(sb==='del-adm'){const u=i.options.getUser('usuario');const A=cfg.admsAutorizados=cfg.admsAutorizados||[];const p=A.findIndex(x=>x.id===u.id);
if(p===-1)return i.reply({embeds:[erro('NAO ENCONTRADO','Este usuario nao e ADM.')],ephemeral:true});
A.splice(p,1);salvar('config',cfg);return i.reply({embeds:[sucesso('REMOVIDO','<@'+u.id+'> foi removido da equipe.')],ephemeral:true})}
if(sb==='lista-adms')return i.reply({embeds:[listaAdms(cfg.donos||[DONO],cfg.admsAutorizados||[])],ephemeral:true})
}};
