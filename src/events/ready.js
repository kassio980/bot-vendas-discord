const {ler,salvar}=require('../../banco');
module.exports={name:'ready',once:true,execute(c){
const cfg=ler('config.json');
const DONO=process.env.DONO_ID;
if(DONO){cfg.donos=cfg.donos||[];if(!cfg.donos.includes(DONO))cfg.donos.push(DONO);salvar('config.json',cfg)}
console.log('\n🔥 ONLINE:',c.user.tag,'\n🔥 /painel | /loja | /sistema\n');
c.user.setActivity({name:'LOJA | /loja',type:3})}};
