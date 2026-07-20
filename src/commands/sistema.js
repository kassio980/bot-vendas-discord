const {SlashCommandBuilder,ActionRowBuilder,ButtonBuilder,ButtonStyle}=require('discord.js');const {ler,salvar}=require('../../banco');const {equipe,renderPainel,sucesso,erro}=require('../../embeds');const {iniciarMonitorVoz,statusVoz}=require('../../voz');const ren=require('../../render_api');
module.exports={data:new SlashCommandBuilder().setName('sistema').setDescription('⚙️ Controle total')
.addSubcommand(s=>s.setName('render').setDescription('🔌 Hospedagem'))
.addSubcommand(s=>s.setName('voz').setDescription('🔊 Conectar voz'))
.addSubcommand(s=>s.setName('add-adm').setDescription('➕ Convidar ADM').addUserOption(u=>u.setName('usuario').setRequired(true)).addStringOption(u=>u.setName('nivel').setRequired(true).addChoices({name:'GERENTE',value:'GERENTE'},{name:'VENDEDOR',value:'VENDEDOR'},{name:'ESTOQUE',value:'ESTOQUE'})))
.addSubcommand(s=>s.setName('del-adm').setDescription('➖ Remover ADM').addUserOption(u=>u.setName('usuario').setRequired(true)))
.addSubcommand(s=>s.setName('lista-adms').setDescription('👑 Ver equipe')),
async execute(c,i){const D=process.env.DONO_ID||'';const cfg=ler('config');if(D&&i.user.id!==D)return i.reply({embeds:[erro('ACESSO NEGADO','Apenas o DONO')],ephemeral:true});
const sb=i.options.getSubcommand();
if(sb==='voz'){iniciarMonitorVoz(c);const v=statusVoz();return i.reply({embeds:[sucesso('MONITOR DE VOZ ATIVADO',v.ok?'✅ Conectado em <#'+v.canal+'>':'🔁 Conectando... Verifique CANAL_VOZ_ID no Render')],ephemeral:true})}
if(sb==='render'){let st='offline';try{st=(await ren.status()).json().service?.status||'verificando'}catch{}
const r=new ActionRowBuilder().addComponents(new ButtonBuilder().setCustomId('ren_ligar').setLabel('🟢 Ligar').setStyle(3),new ButtonBuilder().setCustomId('ren_desligar').setLabel('🔴 Desligar').setStyle(4),new ButtonBuilder().setCustomId('ren_reiniciar').setLabel('🔁 Reiniciar').setStyle(1),new ButtonBuilder().setCustomId('ren_status').setLabel('🔃 Atualizar').setStyle(2));
return i.reply({embeds:[renderPainel(st)],components:[r],ephemeral:true})}
if(sb==='add-adm'){const u=i.options.getUser('usuario');const nv=i.options.getString('nivel');const A=cfg.niveisEquipe=cfg.niveisEquipe||[];
if(A.some(x=>x.id===u.id))return i.reply({embeds:[erro('JA EXISTE','Ja esta na equipe')],ephemeral:true});
A.push({id:u.id,nome:u.tag,nivel:nv,adicionadoPor:i.user.id,data:new Date().toISOString(),ativo:true});salvar('config',cfg);
return i.reply({embeds:[sucesso('ADM ADICIONADO','<@'+u.id+'> • Nivel: **'+nv+'**')],ephemeral:true})}
if(sb==='del-adm'){const u=i.options.getUser('usuario');const A=cfg.niveisEquipe=cfg.niveisEquipe||[];const p=A.findIndex(x=>x.id===u.id);if(p===-1)return i.reply({embeds:[erro('NAO ENCONTRADO','Nao esta na equipe')],ephemeral:true});
A.splice(p,1);salvar('config',cfg);return i.reply({embeds:[sucesso('REMOVIDO','<@'+u.id+'> saiu da equipe')],ephemeral:true})}
if(sb==='lista-adms')return i.reply({embeds:[equipe([D].filter(Boolean),cfg.niveisEquipe||[])],ephemeral:true})}};
