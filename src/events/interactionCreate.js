module.exports={name:'interactionCreate',async execute(c,i){
try{
const R=async(id,col,a=[])=>{const m=col.get(id);if(m)await m.execute(c,i,a)};
if(i.isChatInputCommand())await R(i.commandName,c.commands);
if(i.isButton()){const[x,...y]=i.customId.split('_');await R(x,c.buttons,y)}
if(i.isModalSubmit()){const[x,...y]=i.customId.split('_');await R(x,c.modals,y)}
if(i.isStringSelectMenu()){const[x,...y]=i.customId.split('_');await R(x,c.selects,y)}
}catch(e){console.error(e);try{i.reply({content:`❌ ${e.message}`,ephemeral:true})}catch{try{i.editReply({content:`❌ ${e.message}`,ephemeral:true})}catch{}}}
}};
