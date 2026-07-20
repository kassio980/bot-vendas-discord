const fs=require('fs'),path=require('path');
const DB=path.join(__dirname,'database');
const ler=a=>{try{return JSON.parse(fs.readFileSync(path.join(DB,a),'utf8'))}catch(e){return[]}};
const salvar=(a,b)=>fs.writeFileSync(path.join(DB,a),JSON.stringify(b,null,2));
const addLog=(t,d)=>{const l=ler('logs.json');if(!Array.isArray(l[t]))l[t]=[];l[t].unshift({...d,data:new Date().toISOString()});salvar('logs.json',l)};
const gerarId=()=>Date.now().toString(36)+Math.random().toString(36).slice(2,8);
module.exports={ler,salvar,addLog,gerarId};
