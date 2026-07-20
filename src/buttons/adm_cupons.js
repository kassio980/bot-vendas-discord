
const { embeds } = require('../../embeds');
const { ler } = require('../../banco');
module.exports = { id: 'adm_cupons', async execute(c,i) {
  const lista = ler('cupons')||[];
  const sel = new ActionRowBuilder().addComponents(new StringSelectMenuBuilder()
    .setCustomId('sel_cupom_acao')
    .setPlaceholder('Ação com cupons')
    .addOptions([
      {label:'➕ Criar Cupom',value:'criar'},
      {label:'✏️ Editar Cupom',value:'editar'},
      {label:'🗑️ Remover Cupom',value:'remover'},
      {label:'📜 Ver Todos',value:'lista'}
    ]));
  await i.update({ embeds:[embeds.info('🎟️ GERENCIAR CUPONS', 'Ativos: **'+lista.length+'**')], components:[painelPrincipal(), painelSecundario(), sel] });
}};