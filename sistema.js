const https=require('https');
const {EmbedBuilder}=require('discord.js');
const {MARCA,ICONE}=require('./embeds');

// Anti dormir: pinga a propria URL a cada 8 minutos
function antiDormir(){
const URL=process.env.RENDER_EXTERNAL_URL||process.env.URL_SELF;
if(!URL){console.log('ℹ️ Anti-dormir desligado (sem URL)');return}
console.log('✅ Anti-dormir ATIVO → pingando '+URL);
setInterval(()=>{https.get(URL+'/health',r=>console.log('💓 Ping anti-dormir:',r.statusCode)).on('e',()=>{})},480000);
}

// Envia log em canal do Discord
async function logCanal(c,tipo,titulo,descricao,cor=0x34495E){
const ID=process.env.CANAL_LOGS;if(!ID||!c)return;
try{
const ch=await c.channels.fetch(ID).catch(()=>null);if(!ch)return;
const e=new EmbedBuilder().setColor(cor).setAuthor({name:MARCA+tipo,iconURL:ICONE}).setTitle(titulo).setDescription(descricao).setTimestamp().setFooter({text:MARCA+'Logs automaticos'});
await ch.send({embeds:[e]}).catch(()=>{});
}catch(e){console.log('logCanal erro:',e.message)}
}

module.exports={antiDormir,logCanal};
