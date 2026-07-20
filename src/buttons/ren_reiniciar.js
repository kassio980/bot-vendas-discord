const ren=require('../../render_api');const{info,erro}=require('../../embeds');
module.exports={id:'ren_reiniciar',async execute(c,i){
await i.deferUpdate();try{const r=await ren.reiniciar();const b=JSON.parse(r.raw||'{}');
await i.followUp({embeds:[info('✅ COMANDO ENVIADO','Reiniciando agora...\nStatus: `'+(b.service?.status||r.status)+'`')],ephemeral:true})
}catch(e){await i.followUp({embeds:[erro('ERRO',e.message)],ephemeral:true})}}};
