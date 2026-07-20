module.exports={name:'ready',once:true,execute(c){
console.log('\n🔥 ======================================');
console.log('🔥 ONLINE:  '+c.user.tag);
console.log('🔥 ID:      '+c.user.id);
console.log('🔥 SERVIDORES: '+c.guilds.cache.size);
console.log('🔥 COMANDOS: /loja | /painel | /sistema');
console.log('🔥 ======================================\n');
c.user.setActivity({name:'🛒 LOJA | /loja',type:3})}};
