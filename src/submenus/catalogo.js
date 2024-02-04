const items = require('./items_index');
const mensagens = {
  instrucoes: {
    content: "Para adicionar um item ao carrinho, mande uma mensagem com a palavra 'add' e o número do id do item. \nPara avançar para a próxima página, digite 'próximo'. \nPara retroceder uma página, digite 'anterior'. \nPara ver seu carrinho, digite 'carrinho'. \nPara voltar ao menu principal, digite '0'. ",
  },
  erroEscolha: {
    content: "Por favor, escolha uma opção válida.",
  },
};

const itemsPerPage = 5;
let currentPage = 1;

async function sendCatalogPage(menuManager, page, destination) {
  const startIdx = (page - 1) * itemsPerPage + 1;
  const endIdx = startIdx + itemsPerPage - 1;

  let catalogMessage = `Catálogo de itens - página ${page}:\n`;

  for (let i = startIdx; i <= endIdx; i++) {
    const item = items.get(i);
    if (item) {
      const [itemName, itemPrice] = item;
      catalogMessage += `ID: ${i}, Nome: ${itemName}, Preço: R$${itemPrice}\n`;
    }
  }

  await menuManager.sendMessage(destination, catalogMessage);
}

async function handleMenuCatalogo(message, menuManager) {

  const destination = message.from;

  switch (message.body) {

    case "próximo":
      currentPage++;
      await sendCatalogPage(menuManager, currentPage, destination);
      break;

    case "anterior":

      if (currentPage == 1) {
        await menuManager.sendMessage(destination, "Você já está na primeira página.");
        await sendCatalogPage(menuManager, currentPage, destination);
      } else {
        currentPage--;
        await sendCatalogPage(menuManager, currentPage, destination);
      }

      break;

    case "0":
      menuManager.setMenu(parseInt(message.body));
      menuManager.setWelcome(true);
      menuManager.handleMessageMenu(message);
      break;

    default:
      await sendCatalogPage(menuManager, currentPage, destination);
      await menuManager.sendMessage(destination, mensagens.instrucoes.content);
      break;
  }
}

module.exports = {
  handleMenuCatalogo
};