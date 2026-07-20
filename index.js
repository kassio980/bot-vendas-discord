require('dotenv').config();
const http=require('http');
const PORT=process.env.PORT||10000;
http.createServer((q,r)=>{r.writeHead(200,{'Content-Type':'text/plain'});r.end(q.url==='/health'?'✅ ONLINE':'🤖 BOT VENDAS')}).listen(PORT,'0.0.0.0',()=>console.log('🌐 WEB:',PORT));

const {Client,GatewayIntentBits,Collection,Partials}=require('discord.js');
const fs=require('fs'),path=require('path');
const c=new Client({intents:[GatewayIntentBits.Guilds,GatewayIntentBits.GuildMessages,GatewayIntentBits.GuildMembers,GatewayIntentBits.MessageContent,GatewayIntentBits.DirectMessages],partials:[Partials.Channel,Partials.Message]});
c.commands=new Collection();c.buttons=new Collection();c.modals=new Collection();c.selects=new Collection();

const ld=(d,col)=>{const p=path.join(__dirname,'src',d);if(!fs.existsSync(p))return;fs.readdirSync(p).filter(f=>f.endsWith('.js')).forEach(f=>{try{const m=require(`${p}/${f}`);if(m.data)c.commands.set(m.data.name,m);else if(m.id)col.set(m.id,m)}catch(e){console.log('ERRO',d,f,e.message)}})};
ld('commands',c.commands);ld('buttons',c.buttons);ld('modals',c.modals);ld('selects',c.selects);
const ep=path.join(__dirname,'src','events');if(fs.existsSync(ep))fs.readdirSync(ep).filter(f=>f.endsWith('.js')).forEach(f=>{try{const e=require(`${ep}/${f}`);c.on(e.name,(...a)=>e.execute(c,...a))}catch(err){console.log('ERRO EVENT',f,err.message)}});

c.login(process.env.DISCORD_TOKEN).catch(e=>console.log('❌ TOKEN:',e.message));
