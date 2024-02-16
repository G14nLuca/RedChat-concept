const mensagens = {
  bemVindo: {
    content: "Seja bem-vindo ao Clube do Controle, sua principal loja quando o assunto são games no geral. Por favor, selecione uma das opções abaixo: \n1 - Ver catálogo \n2 - Ver meu carrinho \n3 - Falar com atendente",
  },
  erroEscolha: {
    content: "Por favor, escolha uma opção válida.",
  },
};

async function handleMensagemBoasVindas(message, menuManager) {''
  await menuManager.sendMessage(message.from, mensagens.bemVindo.content);
}

async function handleMenuInicial(session, message, menuManager) {

  switch (message.body) {
    case "1":
      session.setCurrentMenu(parseInt(message.body));
      menuManager.handleMessageMenu(message, session);
      break;
    case "2":
      session.setMenu(parseInt(message.body));
      menuManager.handleMessageMenu(message, session);
      break;
    case "3":
      session.setMenu(parseInt(message.body));
      menuManager.handleMessageMenu(message, session);
      break;
    default:
      await menuManager.sendMessage(message.from, mensagens.erroEscolha.content);
      handleMensagemBoasVindas(message, menuManager);
      break;
  }
}


module.exports = {
  handleMenuInicial, handleMensagemBoasVindas
};
