const ren=require('../../render_api');
const {info,erro}=require('../../embeds');
module.exports={id:'ren_status',async execute(c,i){
await i.deferUpdate();
try{var r=await ren.status();var b=JSON.parse(r.raw||'{}');var st=b.service?(b.service.status||r.status):r.status;
await i.followUp({embeds:[info('Status atual','Servico: '+st)],ephemeral:true})
}catch(e){await i.followUp({embeds:[erro('Erro',e.message)],ephemeral:true})}}};
