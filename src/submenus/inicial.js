const mensagens = {
  bemVindo: {
    content: "Seja bem-vindo ao Clube do Controle, sua principal loja quando o assunto são games no geral. Por favor, selecione uma das opções abaixo: \n1 - Ver catálogo \n2 - Ver meu carrinho \n3 - Falar com atendente",
  },
  erroEscolha: {
    content: "Por favor, escolha uma opção válida.",
  },
};

async function handleMensagemBoasVindas(message, menuManager) {
  await menuManager.sendMessage(message.from, mensagens.bemVindo.content);
}

async function handleMenuInicial(message, menuManager) {

  switch (message.body) {
    case "1":
      menuManager.setMenu(parseInt(message.body));
      menuManager.handleMessageMenu(message);
      break;
    case "2":
      menuManager.setMenu(parseInt(message.body));
      menuManager.handleMessageMenu(message);
      break;
    case "3":
      menuManager.setMenu(parseInt(message.body));
      menuManager.handleMessageMenu(message);
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
