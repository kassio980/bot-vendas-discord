const ren=require('../../render_api');const{info,erro}=require('../../embeds');
module.exports={id:'ren_status',async execute(c,i){
await i.deferUpdate();
try{var r=await ren.status();var b=r.json();var st=b.service?(b.service.status||r.status):r.status;
await i.followUp({embeds:[info('COMANDO ENVIADO','🔃 Status atualizado\n\nStatus: \')],ephemeral:true})
}catch(e){await i.followUp({embeds:[erro('ERRO',e.message)],ephemeral:true})}}};
