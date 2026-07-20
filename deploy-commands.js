require('dotenv').config();
const {REST,Routes}=require('discord.js');const fs=require('fs'),path=require('path');const cmd=[];
const p=path.join(__dirname,'src','commands');
if(fs.existsSync(p))fs.readdirSync(p).filter(f=>f.endsWith('.js')).forEach(f=>{try{cmd.push(require(path.join(p,f)).data.toJSON())}catch(e){console.log('ERR CMD',f,e.message)}});
new REST({version:'10'}).setToken(process.env.DISCORD_TOKEN).put(Routes.applicationGuildCommands(process.env.CLIENT_ID,process.env.GUILD_ID),{body:cmd}).then(()=>console.log('✅ COMANDOS:',cmd.length)).catch(e=>console.log('❌',e.code,e.message))
