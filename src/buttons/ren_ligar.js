const ren=require('../../render_api');const{info,erro}=require('../../embeds');
module.exports={id:'ren_ligar',async execute(c,i){
await i.deferUpdate();try{const r=await ren.ligar();const b=r.json();
await i.followUp({embeds:[info('✅ COMANDO ENVIADO','Serviço ligando\nStatus: `'+(b.service?.status||r.status)+'`')],ephemeral:true})
}catch(e){await i.followUp({embeds:[erro('ERRO',e.message)],ephemeral:true})}}};
