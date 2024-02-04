const mensagens = {
  bemVindo: {
    content: "Este é o menu do catálogo. Ainda em construção. Digite 0 para retornar ao menu principal.",
  },
  erroEscolha: {
    content: "Por favor, escolha uma opção válida.",
  },
};

async function handleMenuCatalogo(message, menuManager) {
  switch (message.body) {
    case "0":
      menuManager.setMenu(parseInt(message.body));
      menuManager.setWelcome(true);
      menuManager.handleMessageMenu(message);
      break;
    default:
      await menuManager.sendMessage(message.from, mensagens.bemVindo.content);
      break;
  }
}

module.exports = {
  handleMenuCatalogo
};