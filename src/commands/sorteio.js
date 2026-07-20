const {SlashCommandBuilder}=require('discord.js');const {sucesso,erro,sorteio}=require('../../embeds');const {ler,salvar,gerarId}=require('../../banco');
module.exports={data:new SlashCommandBuilder().setName('sorteio').setDescription('🎁 Criar sorteio (ADM)')
.addStringOption(o=>o.setName('premio').setRequired(true))
.addStringOption(o=>o.setName('data').setDescription('DD/MM/AAAA HH:MM').setRequired(true))
.addNumberOption(o=>o.setName('valor_minimo').setRequired(false)),
async execute(c,i){const D=process.env.DONO_ID||'';if(D&&i.user.id!==D)return i.reply({embeds:[erro('ACESSO NEGADO','')],ephemeral:true});
const [dt,hr]=i.options.getString('data').split(' ');const [d,m,a]=dt.split('/');const [hh,mm]=hr.split(':');
const dataSorteio=new Date(a,m-1,d,hh,mm);if(isNaN(dataSorteio))return i.reply({embeds:[erro('DATA INVALIDA','Use DD/MM/AAAA HH:MM')],ephemeral:true});
const s=ler('sorteios')||[];s.forEach(x=>x.ativo=false);
s.push({id:gerarId(),premio:i.options.getString('premio'),dataSorteio:dataSorteio.toISOString(),valorMinimo:i.options.getNumber('valor_minimo')||0,participantes:[],ativo:true,criadoPor:i.user.id});
salvar('sorteios',s);await i.reply({embeds:[sucesso('SORTEIO CRIADO!','🏆 '+i.options.getString('premio')+'\n📅 '+dataSorteio.toLocaleString('pt-BR')),sorteio(s[s.length-1])],ephemeral:false})}};
