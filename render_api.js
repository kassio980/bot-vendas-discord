const https=require('https');
const KEY=process.env.RENDER_API_KEY||'';
const SID=process.env.RENDER_SERVICE_ID||'';
const api=(met,path,body)=>new Promise((res,rej)=>{
const data=body?JSON.stringify(body):'';
const o={hostname:'api.render.com',path:'/v1'+path,method:met,headers:{'Authorization':'Bearer '+KEY,'Accept':'application/json','Content-Type':'application/json','Content-Length':Buffer.byteLength(data)}};
const r=https.request(o,re=>{let d='';re.on('data',c=>d+=c);re.on('end',()=>res({ok:re.statusCode<300,status:re.statusCode,raw:d,json:()=>{try{return JSON.parse(d)}catch{return{}}}))});
r.on('error',rej);if(data)r.write(data);r.end()});
module.exports={ligar:()=>api('POST','/services/'+SID+'/resume'),desligar:()=>api('POST','/services/'+SID+'/suspend'),reiniciar:()=>api('POST','/services/'+SID+'/deploys',{clearCache:'do_not_clear'}),status:()=>api('GET','/services/'+SID)};
