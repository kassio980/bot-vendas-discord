const {SlashCommandBuilder,ActionRowBuilder,ButtonBuilder,ButtonStyle,EmbedBuilder}=require('discord.js');
const {ler,salvar}=require('../../banco');
const ren=require('../../render_api');

module.exports={
data:new SlashCommandBuilder()
.setName('sistema').setDescription('Controle Principal')
.addSubcommand(function(s){return s.setName('render').setDescription('Ligar Desligar Reiniciar')})
.addSubcommand(function(s){return s.setName('add-adm').setDescription('Adicionar ADM').addUserOption(function(u){return u.setName('usuario').setDescription('Pessoa').setRequired(true)})})
.addSubcommand(function(s){return s.setName('del-adm').setDescription('Remover ADM').addUserOption(function(u){return u.setName('usuario').setDescription('Pessoa').setRequired(true)})})
.addSubcommand(function(s){return s.setName('lista-adms').setDescription('Ver ADMs')}),

async execute(c,i){
var DONO=process.env.DONO_ID||'';
var cfg=ler('config.json');
var donos=cfg.donos||[];
var adms=cfg.admsAutorizados||[];
var eu=i.user.id;

var PERMITIDO = (DONO && eu===DONO) || donos.includes(eu) || adms.some(function(x){return x.id===eu&&x.ativo});
if(!PERMITIDO){
return i.reply({content:'❌ Acesso negado!\nSeu ID: '+eu+'\nDono: '+DONO,ephemeral:true})
}

var sb=i.options.getSubcommand();

if(sb==='render'){
var st='verificando';
try{var s=await ren.status();var d=JSON.parse(s.raw||'{}');st=d.service?(d.service.status||'indefinido'):'indefinido'}catch(e){}
var e=new EmbedBuilder().setColor(0x9B59B6).setTitle('Controle Render').addFields({name:'Status',value:st});
var r=new ActionRowBuilder().addComponents(
new ButtonBuilder().setCustomId('ren_ligar').setLabel('Ligar').setStyle(3),
new ButtonBuilder().setCustomId('ren_desligar').setLabel('Desligar').setStyle(4),
new ButtonBuilder().setCustomId('ren_reiniciar').setLabel('Reiniciar').setStyle(1),
new ButtonBuilder().setCustomId('ren_status').setLabel('Atualizar').setStyle(2));
return i.reply({embeds:[e],components:[r],ephemeral:true});
}

if(sb==='add-adm'){
var u=i.options.getUser('usuario');
if(DONO && u.id===DONO)return i.reply({content:'Ja e dono principal',ephemeral:true});
if(adms.some(function(x){return x.id===u.id}))return i.reply({content:'Ja e ADM',ephemeral:true});
adms.push({id:u.id,nome:u.tag,por:eu,ativo:true});salvar('config.json',cfg);
return i.reply({content:'Adicionado: '+u.toString(),ephemeral:true});
}

if(sb==='del-adm'){
var u=i.options.getUser('usuario');
var p=adms.findIndex(function(x){return x.id===u.id});
if(p===-1)return i.reply({content:'Nao encontrado',ephemeral:true});
adms.splice(p,1);salvar('config.json',cfg);
return i.reply({content:'Removido: '+u.toString(),ephemeral:true});
}

if(sb==='lista-adms'){
var txtd=donos.length?donos.map(function(x){return '<@'+x+'>'}).join('\n'):'Nenhum';
var txta=adms.length?adms.map(function(x){return '<@'+x.id+'> - '+x.nome}).join('\n'):'Nenhum';
var e=new EmbedBuilder().setColor(0x3498DB).setTitle('Equipe').addFields({name:'Donos',value:txtd},{name:'ADMs',value:txta});
return i.reply({embeds:[e],ephemeral:true});
}
}};
