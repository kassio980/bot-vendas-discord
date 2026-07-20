
const { embeds } = require('../../embeds');
const { ler } = require('../../banco');
module.exports = { id: 'adm_produtos', async execute(c,i) {
  const lista = ler('produtos')||[];
  const sel = new ActionRowBuilder().addComponents(new StringSelectMenuBuilder()
    .setCustomId('sel_produto_acao')
    .setPlaceholder('Escolha uma ação com produtos')
    .addOptions([
      {label:'➕ Criar Novo',value:'criar'},
      {label:'✏️ Editar Existente',value:'editar'},
      {label:'🗑️ Remover',value:'remover'},
      {label:'📜 Ver Todos',value:'lista'}
    ]));
  await i.update({ embeds:[embeds.info('📦 GERENCIAR PRODUTOS', 'Total cadastrado: **'+lista.length+'**\nEscolha abaixo o que deseja fazer')], components:[painelPrincipal(), painelSecundario(), sel] });
}};