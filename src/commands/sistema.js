const {SlashCommandBuilder,ActionRowBuilder,ButtonBuilder,ButtonStyle,EmbedBuilder}=require('discord.js');
const {ler,salvar}=require('../../banco');
const ren=require('../../render_api');

module.exports={
data:new SlashCommandBuilder()
.setName('sistema').setDescription('Controle Principal')
.addSubcommand(s=>s.setName('render').setDescription('Ligar/Desligar/Reiniciar'))
.addSubcommand(s=>s.setName('add-adm').setDescription('Adicionar ADM').addUserOption(u=>u.setName('usuario').setDescription('Pessoa').setRequired(true)))
.addSubcommand(s=>s.setName('del-adm').setDescription('Remover ADM').addUserOption(u=>u.setName('usuario').setDescription('Pessoa').setRequired(true)))
.addSubcommand(s=>s.setName('lista-adms').setDescription('Ver ADMs')),

async execute(c,i){
const cfg=ler('config.json');
const donos=cfg.donos||[];
const adms=cfg.admsAutorizados||[];
const eu=i.user.id;

if(!donos.includes(eu) && !adms.some(x=>x.id===eu&&x.ativo)) return i.reply({content:'Sem permissao',ephemeral:true});
const sb=i.options.getSubcommand();

if(sb==='render'){
let st='verificando';
try{const s=await ren.status();const d=JSON.parse(s.raw||'{}');st=d.service?.status||'indefinido'}catch{}
const e=new EmbedBuilder().setColor(0x9B59B6).setTitle('Controle Render').addFields({name:'Status',value:'`'+st+'`'});
const r=new ActionRowBuilder().addComponents(
new ButtonBuilder().setCustomId('ren_ligar').setLabel('Ligar').setStyle(3),
new ButtonBuilder().setCustomId('ren_desligar').setLabel('Desligar').setStyle(4),
new ButtonBuilder().setCustomId('ren_reiniciar').setLabel('Reiniciar').setStyle(1),
new ButtonBuilder().setCustomId('ren_status').setLabel('Atualizar').setStyle(2));
return i.reply({embeds:[e],components:[r],ephemeral:true});
}

if(sb==='add-adm'){
const u=i.options.getUser('usuario');
if(donos.includes(u.id)||adms.some(x=>x.id===u.id)) return i.reply({content:'Ja existe',ephemeral:true});
adms.push({id:u.id,nome:u.tag,por:eu,ativo:true});salvar('config.json',cfg);
return i.reply({content:'Adicionado: '+u,ephemeral:true});
}

if(sb==='del-adm'){
const u=i.options.getUser('usuario');
const p=adms.findIndex(x=>x.id===u.id);
if(p===-1) return i.reply({content:'Nao encontrado',ephemeral:true});
adms.splice(p,1);salvar('config.json',cfg);
return i.reply({content:'Removido: '+u,ephemeral:true});
}

if(sb==='lista-adms'){
const txtd=donos.length?donos.map(x=>'<@'+x+'>').join('\n'):'Nenhum';
const txta=adms.length?adms.map(x=>'<@'+x.id+'> - '+x.nome).join('\n'):'Nenhum';
const e=new EmbedBuilder().setColor(0x3498DB).setTitle('Equipe').addFields({name:'Donos',value:txtd},{name:'ADMs',value:txta});
return i.reply({embeds:[e],ephemeral:true});
}
}};
