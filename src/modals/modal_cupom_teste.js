const {cupomPorCodigo}=require('../../banco');const {sucesso,erro}=require('../../embeds');
module.exports={id:'modal_cupom_teste',async execute(c,i){
const cod=i.fields.getTextInputValue('codigo').trim();const cup=cupomPorCodigo(cod);
if(!cup)return i.reply({embeds:[erro('CUPOM INVALIDO/EXPIRADO','')],ephemeral:true});
await i.reply({embeds:[sucesso('✅ CUPOM VALIDO!','**'+cup.codigo.toUpperCase()+'**\n'+(cup.tipo==='PORCENTO'?cup.valor+'% OFF':'R$ '+cup.valor.toFixed(2).replace('.',',')+' OFF')+'\nMinimo: R$ '+(cup.valorMinimo||0).toFixed(2)+'\nUsos: '+(cup.usos||0)+' / '+(cup.usosMax||'∞'))],ephemeral:true})}};
