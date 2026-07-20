const ren=require('../../render_api');
const {info,erro}=require('../../embeds');
module.exports={id:'ren_desligar',async execute(c,i){
await i.deferUpdate();
try{var r=await ren.desligar();var b=JSON.parse(r.raw||'{}');var st=b.service?(b.service.status||r.status):r.status;
await i.followUp({embeds:[info('Comando enviado','Desligando... Status: '+st)],ephemeral:true})
}catch(e){await i.followUp({embeds:[erro('Erro',e.message)],ephemeral:true})}}};
