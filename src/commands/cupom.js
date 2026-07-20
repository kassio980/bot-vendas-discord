const {SlashCommandBuilder}=require('discord.js');const {sucesso,erro}=require('../../embeds');const {ler,salvar,gerarId}=require('../../banco');
module.exports={data:new SlashCommandBuilder().setName('cupom').setDescription('🎟️ Criar cupom (ADM)')
.addStringOption(o=>o.setName('codigo').setRequired(true))
.addStringOption(o=>o.setName('tipo').setRequired(true).addChoices({name:'% PORCENTO',value:'PORCENTO'},{name:'R$ FIXO',value:'FIXO'}))
.addNumberOption(o=>o.setName('valor').setRequired(true))
.addNumberOption(o=>o.setName('valor_minimo').setRequired(false))
.addNumberOption(o=>o.setName('usos_maximos').setRequired(false)),
async execute(c,i){const D=process.env.DONO_ID||'';if(D&&i.user.id!==D)return i.reply({embeds:[erro('ACESSO NEGADO','')],ephemeral:true});
const cod=i.options.getString('codigo').toUpperCase();const tipo=i.options.getString('tipo');const valor=i.options.getNumber('valor');const vmin=i.options.getNumber('valor_minimo')||0;const umax=i.options.getNumber('usos_maximos')||99999;
const cups=ler('cupons')||[];if(cups.some(x=>x.codigo===cod))return i.reply({embeds:[erro('JA EXISTE','')],ephemeral:true});
cups.push({id:gerarId(),codigo:cod,tipo,valor,valorMinimo:vmin,usosMax:umax,usos:0,ativo:true,criadoPor:i.user.id,data:new Date().toISOString()});salvar('cupons',cups);
await i.reply({embeds:[sucesso('CUPOM CRIADO!','**'+cod+'**\n'+(tipo==='PORCENTO'?valor+'% OFF':'R$ '+valor.toFixed(2)+' OFF')+'\nMinimo: R$ '+vmin.toFixed(2)+'\nUsos: '+umax)],ephemeral:true})}};
