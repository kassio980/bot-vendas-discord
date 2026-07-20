module.exports={name:'interactionCreate',async execute(c,i){
try{
let handler=null,args=[];
const id=i.customId||i.commandName;

if(i.isChatInputCommand()){handler=c.commands.get(id)}
else{
const partes=id.split('_');
for(let t=partes.length;t>0;t--){
const teste=partes.slice(0,t).join('_');
if(c.buttons.has(teste)){handler=c.buttons.get(teste);args=partes.slice(t);break}
if(c.modals.has(teste)){handler=c.modals.get(teste);args=partes.slice(t);break}
if(c.selects.has(teste)){handler=c.selects.get(teste);args=partes.slice(t);break}
}}

if(!handler){console.log('HANDLER NAO ENCONTRADO:',id);try{return i.reply({content:'⚠️ Funcao nao implementada ainda: `'+id+'`',ephemeral:true})}catch{return}}
await handler.execute(c,i,args);
}catch(e){
console.log('\n❌ ERRO INTERACAO:',i.customId||i.commandName,'\n',e.message,'\n',e.stack);
try{i.reply({content:'❌ Erro: '+e.message,ephemeral:true})}
catch{try{i.editReply({content:'❌ Erro: '+e.message,ephemeral:true})}catch{try{i.followUp({content:'❌ Erro: '+e.message,ephemeral:true})}catch{}}}
}
}};
