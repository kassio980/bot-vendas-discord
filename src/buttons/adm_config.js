
const { embeds } = require('../../embeds');
module.exports = { id: 'adm_config', async execute(c,i) {
  const sel = new ActionRowBuilder().addComponents(new StringSelectMenuBuilder()
    .setCustomId('sel_config_acao')
    .setPlaceholder('Configuração do sistema')
    .addOptions([
      {label:'📢 Canais e Categorias',value:'canais'},
      {label:'💳 Dados do PIX',value:'pix'},
      {label:'👑 Equipe e Permissoes',value:'equipe'},
      {label:'🔗 Integrações Render/Zap',value:'integracoes'}
    ]));
  await i.update({ embeds:[embeds.info('⚙️ CONFIGURAÇÕES GERAIS', 'Todas configurações do sistema centralizadas aqui')], components:[painelPrincipal(), painelSecundario(), sel] });
}};