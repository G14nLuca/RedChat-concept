const messagens = [
  {
    titulo: "Bem-vindo",
    conteudo: "Seja bem-vindo ao Clube do Controle, sua principal loja quando o assunto são games no geral. Por favor, selecione uma das opções abaixo: \n1 - Ver catálogo \n2 - Ver meu carrinho \n3 - Falar com atendente",
  },
  {
    titulo: "Erro de escolha",
    conteudo: "Por favor, escolha uma opção válida",
  },
  
]

async function handleMenuInicial(message, menuManager) {
  switch(message.body){
    case "1":
      menuManager.setMenu(1);
      menuManager.ha
  }

  if (message.body != " ") {
    await menuManager.sendMessage(message.from, welcomeMessage);
  }
}

module.exports = {
  handleMenuInicial
};
