const {SlashCommandBuilder}=require('discord.js');const {sucesso,erro}=require('../../embeds');const {ler,reporEstoque,pedidoStock,temPermissao}=require('../../banco');
module.exports={data:new SlashCommandBuilder().setName('estoque').setDescription('📦 Gerenciar estoque (ADM)')
.addSubcommand(s=>s.setName('repor').addStringOption(o=>o.setName('id_produto').setRequired(true)).addIntegerOption(o=>o.setName('quantidade').setRequired(true)).addStringOption(o=>o.setName('motivo').setRequired(false)))
.addSubcommand(s=>s.setName('pedir').addStringOption(o=>o.setName('id_produto').setRequired(true)).addIntegerOption(o=>o.setName('quantidade').setRequired(true)).addStringOption(o=>o.setName('motivo').setRequired(false)))
.addSubcommand(s=>s.setName('ver').addStringOption(o=>o.setName('id_produto').setRequired(false))),
async execute(c,i){const D=process.env.DONO_ID||'';const P=(D&&i.user.id===D)||temPermissao(i.user.id,'estoque');if(!P)return i.reply({embeds:[erro('ACESSO NEGADO','')],ephemeral:true});
const sb=i.options.getSubcommand();
if(sb==='repor'){const ok=reporEstoque(i.options.getString('id_produto'),i.options.getInteger('quantidade'),i.options.getString('motivo')||'Reposicao');return i.reply({embeds:[ok?sucesso('ESTOQUE REPOSTO!','Quantidade adicionada com sucesso'):erro('PRODUTO NAO ENCONTRADO','')],ephemeral:true})}
if(sb==='pedir'){const p=pedidoStock(i.options.getString('id_produto'),i.options.getInteger('quantidade'),i.options.getString('motivo')||'Pedido');return i.reply({embeds:[sucesso('PEDIDO DE STOCK CRIADO','# '+p.id)],ephemeral:true})}
const prods=ler('produtos')||[];const id=i.options.getString('id_produto');const lista=id?prods.filter(x=>x.id===id):prods.slice(0,20);
await i.reply({embeds:[require('../../embeds').info('📦 ESTOQUE ATUAL',lista.map(x=>'🆔 **'+x.id+'** • '+x.nome+' → **'+(x.estoque===-1?'♾️ ILIMITADO':x.estoque)+'** unid.').join('\n')||'Sem produtos')],ephemeral:true})}};
