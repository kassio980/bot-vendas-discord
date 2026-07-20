const {produtoPorId,atualizarProduto,addLog}=require('../../banco');const {sucesso,erro}=require('../../embeds');
module.exports={id:'modal_produto_editar',async execute(c,i,a){try{
const p=produtoPorId(a[0]);if(!p)throw new Error('Produto nao encontrado');
const g=k=>i.fields.getTextInputValue(k).trim();
const dados={};
if(g('nome'))dados.nome=g('nome');
if(g('descricao'))dados.descricao=g('descricao');
if(g('preco'))dados.preco=parseFloat(g('preco').replace(',','.'))||p.preco;
if(g('estoque'))dados.estoque=parseInt(g('estoque'))||p.estoque;
const extra=g('extra');if(extra){const ex=extra.split('|').map(x=>x.trim());
if(ex[0])dados.tipoEntrega=ex[0];if(ex[1])dados.categoria=ex[1].toUpperCase();
if(ex[2]&&ex[2].startsWith('http'))dados.imagem=ex[2];
if(ex[3]&&ex[3].startsWith('http')){dados.video=ex[3];dados.videoTitulo='Assistir demonstracao'}
if(['MAIS_VENDIDO','NOVO','PROMOCAO','LIMITADO'].includes(ex[4]?.toUpperCase()))dados.tag=ex[4].toUpperCase();
if(ex[5])dados.destaque=ex[5].toUpperCase()==='SIM';
if(ex[6])dados.beneficios=ex[6].split(';;;').map(x=>x.trim()).filter(Boolean)}
atualizarProduto(p.id,dados);addLog('alteracoes',{acao:'PRODUTO_EDITADO',id:p.id});
await i.reply({embeds:[sucesso('✅ PRODUTO ATUALIZADO!','🆔 '+p.id+'\n**'+(dados.nome||p.nome)+'**')],ephemeral:true});
}catch(e){await i.reply({embeds:[erro('ERRO',e.message)],ephemeral:true})}}};
