const {joinVoiceChannel,entersState,VoiceConnectionStatus}=require('@discordjs/voice');
let CONEXAO=null;let TENTANDO=false;let ULTIMO_CANAL=null;let TIMER_RECONEXAO=null;

const log=msg=>console.log('🔊 [VOZ]',msg);

async function conectarVoz(c){
if(TENTANDO)return;TENTANDO=true;
const CANAL=process.env.CANAL_VOZ_ID;
if(!CANAL){log('CANAL_VOZ_ID nao configurado no Render. Pulando voz.');TENTANDO=false;return}
try{
const guild=c.guilds.cache.first()||c.guilds.cache.find(g=>g.channels.cache.has(CANAL));
if(!guild){log('Servidor nao encontrado. Tentando em 30s...');TENTANDO=false;setTimeout(()=>conectarVoz(c),30000);return}
const canal=await guild.channels.fetch(CANAL).catch(()=>null);
if(!canal||!canal.isVoiceBased()){log('Canal de voz invalido ou nao encontrado. Tentando em 30s...');TENTANDO=false;setTimeout(()=>conectarVoz(c),30000);return}

log('Conectando em: #'+canal.name+' ('+canal.id+')');
CONEXAO=joinVoiceChannel({channelId:canal.id,guildId:canal.guild.id,adapterCreator:canal.guild.voiceAdapterCreator,selfDeaf:true,selfMute:true});
ULTIMO_CANAL=canal.id;

CONEXAO.on(VoiceConnectionStatus.Ready,()=>log('✅ CONECTADO NA VOZ E NUNCA MAIS SAI!'));
CONEXAO.on(VoiceConnectionStatus.Disconnected,async()=>{
log('⚠️ Caiu da voz! Tentando reconectar IMEDIATAMENTE...');
try{await Promise.race([entersState(CONEXAO,VoiceConnectionStatus.Signalling,5000),entersState(CONEXAO,VoiceConnectionStatus.Connecting,5000)])}
catch(_){log('🔁 Reiniciando conexao do zero...');CONEXAO?.destroy();CONEXAO=null;setTimeout(()=>conectarVoz(c),2000)}
});
CONEXAO.on('error',e=>log('Erro voz:',e.message));
TENTANDO=false;
}catch(e){log('ERRO AO CONECTAR VOZ:',e.message);TENTANDO=false;setTimeout(()=>conectarVoz(c),5000)}
}

// Loop infinito: verifica a cada 15 segundos se esta conectado
function iniciarMonitorVoz(c){
conectarVoz(c);
if(TIMER_RECONEXAO)clearInterval(TIMER_RECONEXAO);
TIMER_RECONEXAO=setInterval(()=>{
if(!CONEXAO||CONEXAO.state.status===VoiceConnectionStatus.Disconnected||CONEXAO.state.status===VoiceConnectionStatus.Destroyed){
log('🔁 Monitor detectou queda. Reconectando...');
CONEXAO?.destroy();CONEXAO=null;conectarVoz(c);
}},15000);
log('✅ Monitor de voz INICIADO (nunca mais sai do canal!)');
}

function statusVoz(){return{conectado:!!(CONEXAO&&CONEXAO.state.status===VoiceConnectionStatus.Ready),canal:ULTIMO_CANAL}}

module.exports={iniciarMonitorVoz,statusVoz,conectarVoz};
