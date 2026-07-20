module.exports={name:'interactionCreate',async execute(c,i){
try{
let handler=null,args=[];const id=i.customId||i.commandName;
if(i.isChatInputCommand())handler=c.commands.get(id);
else{const pt=id.split('_');for(let t=pt.length;t>0;t--){const te=pt.slice(0,t).join('_');
if(c.buttons.has(te)){handler=c.buttons.get(te);args=pt.slice(t);break}
if(c.modals.has(te)){handler=c.modals.get(te);args=pt.slice(t);break}
if(c.selects.has(te)){handler=c.selects.get(te);args=pt.slice(t);break}}}
if(!handler){console.log('HANDLER NAO ENCONTRADO:',id);try{return i.reply({content:'⚠️ Em implementacao: `'+id+'`',ephemeral:true})}catch{return}}
await handler.execute(c,i,args);
}catch(e){console.log('\n❌ ERRO:',i.customId||i.commandName,'\n',e.message);
try{i.reply({content:'❌ Erro: '+e.message,ephemeral:true})}
catch{try{i.editReply({content:'❌ Erro: '+e.message,ephemeral:true})}catch{try{i.followUp({content:'❌ Erro: '+e.message,ephemeral:true})}catch{}}}
}
}};
