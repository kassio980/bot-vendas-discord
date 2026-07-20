const {produto}=require('../../embeds');const {ler}=require('../../banco');
module.exports={id:'sel_categoria',async execute(c,i,a){
const cat=i.values[0];const p=ler('produtos')||[];
const lista=cat==='TODOS'?p.filter(x=>x.estoque!==0):p.filter(x=>(x.categoria||'GERAL')===cat&&x.estoque!==0);
if(!lista.length)return i.update({embeds:[require('../../embeds').aviso('SEM PRODUTOS','Nenhum produto nesta categoria.')],components:[]});
await i.update({embeds:lista.slice(0,3).map(x=>produto(x)),content:'📂 **Categoria: '+cat+'**\nTotal: **'+lista.length+'** produtos'})}};
