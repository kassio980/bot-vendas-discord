const {ler,salvar,gerarId,addLog}=require('../../banco');
const {sucesso,erro}=require('../../embeds');
const T=['codigo','cargo','arquivo','link','mensagem','msg'];
module.exports={id:'modal_produto_criar',async execute(c,i){try{
const g=k=>i.fields.getTextInputValue(k);
const preco=parseFloat(g('preco').replace(',','.'));const estoque=parseInt(g('estoque'))||0;
const entrega=g('entrega').toLowerCase().trim();
if(isNaN(preco)||preco<=0)throw new Error('Preco invalido');
const p=ler('produtos')||[];
p.unshift({id:gerarId(),nome:g('nome'),descricao:g('descricao'),preco,estoque,tipoEntrega:T.includes(entrega)?entrega:'mensagem',dataCriacao:new Date().toISOString()});
salvar('produtos',p);addLog('alteracoes',{acao:'PRODUTO_CRIADO',nome:g('nome'),preco});
await i.reply({embeds:[sucesso('PRODUTO CRIADO!','**'+g('nome')+'**\nR$ '+preco.toFixed(2)+'\nEstoque: '+(estoque===-1?'Ilimitado':estoque))],ephemeral:true});
}catch(e){await i.reply({embeds:[erro('ERRO',e.message)],ephemeral:true})}}};
