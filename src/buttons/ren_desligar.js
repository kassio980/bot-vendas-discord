const ren=require('../../render_api');
const {info,erro}=require('../../embeds');
module.exports={id:'ren_desligar',async execute(c,i){
await i.deferUpdate();
try{const r=await ren.desligar();const b=JSON.parse(r.raw||'{}');
await i.followUp({embeds:[info('Comando enviado','Desligando... Status: `'+(b.service?.status||r.status)+'`')],ephemeral:true})
}catch(e){await i.followUp({embeds:[erro('Erro',e.message)],ephemeral:true})}}};
