require('dotenv').config();
const {REST,Routes}=require('discord.js'),fs=require('fs'),path=require('path');
const cmd=[];const p=path.join(__dirname,'src','commands');if(fs.existsSync(p))fs.readdirSync(p).filter(f=>f.endsWith('.js')).forEach(f=>{try{cmd.push(require(`${p}/${f}`).data.toJSON())}catch(e){}});
new REST({version:'10'}).setToken(process.env.DISCORD_TOKEN).put(Routes.applicationGuildCommands(process.env.CLIENT_ID,process.env.GUILD_ID),{body:cmd}).then(()=>console.log('✅ COMANDOS OK:',cmd.length)).catch(console.error);
