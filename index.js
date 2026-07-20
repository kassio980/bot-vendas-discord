require('dotenv').config();
const http=require('http');const PORT=process.env.PORT||10000;
http.createServer((q,r)=>{r.writeHead(200,{'Content-Type':'text/plain; charset=utf-8'});r.end(q.url==='/health'?'✅ ONLINE':'🤖 MINION STORE PRO 3.0 • SISTEMA COMPLETO')}).listen(PORT,'0.0.0.0',()=>console.log('🌐 WEB:',PORT));

const {Client,GatewayIntentBits,Collection,Partials}=require('discord.js');
const fs=require('fs'),path=require('path');
const {iniciarMonitorVoz}=require('./voz');
const {antiDormir}=require('./sistema');
const {iniciar}=require('./sistemas_extras');

const c=new Client({intents:[
GatewayIntentBits.Guilds,GatewayIntentBits.GuildMessages,GatewayIntentBits.GuildMembers,
GatewayIntentBits.MessageContent,GatewayIntentBits.DirectMessages,GatewayIntentBits.GuildVoiceStates
],partials:[Partials.Channel,Partials.Message,Partials.User]});

c.commands=new Collection();c.buttons=new Collection();c.modals=new Collection();c.selects=new Collection();

const ld=(d,col)=>{const p=path.join(__dirname,'src',d);if(!fs.existsSync(p))return;
fs.readdirSync(p).filter(f=>f.endsWith('.js')).forEach(f=>{try{
const m=require(path.join(p,f));
if(m.data)c.commands.set(m.data.name,m);
else if(m.id)col.set(m.id,m);
}catch(e){console.log('❌ LOAD',d,f,'→',e.message)}})};
ld('commands',c.commands);ld('buttons',c.buttons);ld('modals',c.modals);ld('selects',c.selects);
console.log('✅ CARREGADO: Cmd='+c.commands.size+' Btn='+c.buttons.size+' Modal='+c.modals.size+' Sel='+c.selects.size);

const ep=path.join(__dirname,'src','events');
if(fs.existsSync(ep))fs.readdirSync(ep).filter(f=>f.endsWith('.js')).forEach(f=>{try{
const e=require(path.join(ep,f));c.on(e.name,(...a)=>e.execute(c,...a))
}catch(err){console.log('❌ EVENT',f,err.message)}});

c.on('ready',()=>{
console.log('\n🔥 ==========================================================');
console.log('🔥 ONLINE:  '+c.user.tag);
console.log('🔥 ID:      '+c.user.id);
console.log('🔥 VERSAO:  PRO 3.0 • NIVEL LOJA + CONQUISTAS + CARD VENDAS');
console.log('🔥 FUNCOES: VOZ | ESTOQUE | FOTO+VIDEO | CUPOM | CASHBACK | INDICACAO | SORTEIO | RANKING | RELATORIO | ZAP');
console.log('🔥 ==========================================================\n');
c.user.setActivity({name:'💛 MINION STORE • /loja para comprar',type:3});
iniciarMonitorVoz(c);antiDormir();iniciar(c);
});

c.login(process.env.DISCORD_TOKEN).catch(e=>console.log('❌ TOKEN INVALIDO:',e.message));
