const ren=require('../../render_api');const{info,erro}=require('../../embeds');
module.exports={id:'ren_ligar',async execute(c,i){
await i.deferUpdate();
try{var r=await ren.ligar();var b=r.json();var st=b.service?(b.service.status||r.status):r.status;
await i.followUp({embeds:[info('COMANDO ENVIADO','✅ Servico LIGADO\n\nStatus: \')],ephemeral:true})
}catch(e){await i.followUp({embeds:[erro('ERRO',e.message)],ephemeral:true})}}};
