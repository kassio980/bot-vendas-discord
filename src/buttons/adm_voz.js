const {info}=require('../../embeds');const {statusVoz,iniciarMonitorVoz}=require('../../voz');
module.exports={id:'adm_voz',async execute(c,i){iniciarMonitorVoz(c);const v=statusVoz();
await i.update({embeds:[info('🔊 SISTEMA DE VOZ','Monitor **ATIVO E FUNCIONANDO**!\n\nStatus: '+(v.ok?'✅ **Conectado** em <#'+v.canal+'>\n\n**Este bot NUNCA MAIS sai do canal, mesmo que caia a internet!**':'🔁 **Conectando...**\n\nVerifique no Render a variavel:\n`CANAL_VOZ_ID = ID_DO_CANAL`'))],components:[]})}};
