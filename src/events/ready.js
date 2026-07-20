module.exports={name:'ready',once:true,execute(c){console.log(`\n🔥 ONLINE: ${c.user.tag}\n🔥 /painel | /loja | /sistema\n`);c.user.setActivity({name:'🛒 LOJA | /loja',type:3})}};
