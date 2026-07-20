const {joinVoiceChannel,entersState,VoiceConnectionStatus}=require('@discordjs/voice');
let C=null,T=false,U=null,I=null;const l=m=>console.log('🔊 [VOZ]',m);
async function cv(c){if(T)return;T=true;const CANAL=process.env.CANAL_VOZ_ID;if(!CANAL){l('sem canal');T=false;return}
try{const g=c.guilds.cache.find(x=>x.channels.cache.has(CANAL));if(!g){T=false;setTimeout(()=>cv(c),3e4);return}
const ch=await g.channels.fetch(CANAL).catch(()=>null);if(!ch){T=false;setTimeout(()=>cv(c),3e4);return}
l('Conectando: '+ch.name);C=joinVoiceChannel({channelId:ch.id,guildId:g.id,adapterCreator:g.voiceAdapterCreator,selfDeaf:true,selfMute:true});U=ch.id;
C.on(VoiceConnectionStatus.Ready,()=>l('✅ NA VOZ E NUNCA MAIS SAI!'));
C.on(VoiceConnectionStatus.Disconnected,async()=>{l('caiu, reconectando...');try{await Promise.race([entersState(C,VoiceConnectionStatus.Signalling,5e3),entersState(C,VoiceConnectionStatus.Connecting,5e3)])}catch(_){C?.destroy();C=null;setTimeout(()=>cv(c),2e3)}});
C.on('error',e=>l('erro',e.message));T=false}catch(e){l('erro',e.message);T=false;setTimeout(()=>cv(c),5e3)}}
function iv(c){cv(c);if(I)clearInterval(I);I=setInterval(()=>{if(!C||C.state.status===VoiceConnectionStatus.Disconnected||C.state.status===VoiceConnectionStatus.Destroyed){C?.destroy();C=null;cv(c)}},15e3);l('✅ Monitor voz ATIVO')}
function sv(){return{ok:!!(C&&C.state.status===VoiceConnectionStatus.Ready),canal:U}}
module.exports={iniciarMonitorVoz:iv,statusVoz:sv,conectarVoz:cv};
