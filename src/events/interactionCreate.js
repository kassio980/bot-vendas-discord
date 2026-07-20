module.exports={name:'interactionCreate',async execute(c,i){
try{let h=null,args=[];const id=i.customId||i.commandName;
if(i.isChatInputCommand())h=c.commands.get(id);
else{const pt=id.split('_');for(let t=pt.length;t>0;t--){const te=pt.slice(0,t).join('_');
if(c.buttons.has(te)){h=c.buttons.get(te);args=pt.slice(t);break}
if(c.modals.has(te)){h=c.modals.get(te);args=pt.slice(t);break}
if(c.selects.has(te)){h=c.selects.get(te);args=pt.slice(t);break}}}
if(!h){console.log('HANDLER NAO:',id);try{return i.reply({content:'⚠️ Implementando: `'+id+'`',ephemeral:true})}catch{return}}
await h.execute(c,i,args);
}catch(e){console.log('\n❌ ERRO:',i.customId||i.commandName,'\n',e.message);
try{i.reply({content:'❌ Erro: '+e.message,ephemeral:true})}catch{try{i.editReply({content:'❌ Erro: '+e.message,ephemeral:true})}catch{try{i.followUp({content:'❌ Erro: '+e.message,ephemeral:true})}catch{}}}}}};
