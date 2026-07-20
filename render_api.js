const https=require('https');const K=process.env.RENDER_API_KEY||'';const S=process.env.RENDER_SERVICE_ID||'';
const api=(m,p,body)=>new Promise((rs,rj)=>{const d=body?JSON.stringify(body):'';
const o={hostname:'api.render.com',path:'/v1'+p,method:m,headers:{Authorization:'Bearer '+K,Accept:'application/json','Content-Type':'application/json','Content-Length':Buffer.byteLength(d)}};
const r=https.request(o,re=>{let x='';re.on('data',c=>x+=c);re.on('end',()=>rs({ok:re.statusCode<300,status:re.statusCode,raw:x,json:()=>{try{return JSON.parse(x)}catch{return{}}}))});
r.on('error',rj);if(d)r.write(d);r.end()});
module.exports={ligar:()=>api('POST','/services/'+S+'/resume'),desligar:()=>api('POST','/services/'+S+'/suspend'),reiniciar:()=>api('POST','/services/'+S+'/deploys',{clearCache:'do_not_clear'}),status:()=>api('GET','/services/'+S)};
