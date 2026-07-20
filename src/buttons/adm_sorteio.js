
const { embeds } = require('../../embeds');
const { ler } = require('../../banco');
module.exports = { id: 'adm_sorteio', async execute(c,i) {
  const ativo = (ler('sorteios')||[]).find(x=>x.ativo);
  const sel = new ActionRowBuilder().addComponents(new StringSelectMenuBuilder()
    .setCustomId('sel_sorteio_acao')
    .setPlaceholder('Ação com sorteios')
    .addOptions([
      {label:'➕ Criar Sorteio',value:'criar'},
      {label:'🏆 Sortear Agora',value:'sortear',disabled:!ativo},
      {label:'❌ Cancelar',value:'cancelar',disabled:!ativo}
    ]));
  await i.update({ embeds:[embeds.info('🎁 SORTEIOS', ativo ? '**ATIVO:** '+ativo.premio : 'Sem sorteio ativo no momento')], components:[painelPrincipal(), painelSecundario(), sel] });
}};