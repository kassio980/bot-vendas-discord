const ren=require('../../render_api');const{info,erro}=require('../../embeds');
module.exports={id:'ren_reiniciar',async execute(c,i){
await i.deferUpdate();
try{var r=await ren.reiniciar();var b=r.json();var st=b.service?(b.service.status||r.status):r.status;
await i.followUp({embeds:[info('COMANDO ENVIADO','Servico REINICIADO com sucesso!\n\nStatus: \')],ephemeral:true})
}catch(e){await i.followUp({embeds:[erro('ERRO',e.message)],ephemeral:true})}}};
