const items = require('./items_index');


const mensagens = {
  instrucoes: {
    content: "Para adicionar um item ao carrinho, mande uma mensagem com a palavra '#' e o número do id do item. \nPara avançar para a próxima página, digite 'P'. \nPara retroceder uma página, digite 'A'. \nPara ver seu carrinho, digite 'C'. \nPara voltar ao menu principal, digite '0'. ",
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

async function handleMenuCatalogo(session, message, menuManager) {

  var content = message.body;
  var destination = message.from;

  if (content.includes('#')){
    var item = content.split("#")[1];
    session.getCart().addToCart(item);
  }

  switch (content) {

    case "P":
      currentPage++;
      await sendCatalogPage(menuManager, currentPage, destination);
      break;

    case "A":
      if (currentPage == 1) {
        await menuManager.sendMessage(destination, "Você já está na primeira página.");
        await sendCatalogPage(menuManager, currentPage, destination);
        await menuManager.sendMessage(destination, mensagens.instrucoes.content);

      } else {
        currentPage--;
        await sendCatalogPage(menuManager, currentPage, destination);
      }

      break;

    case "0":
      session.setCurrentMenu(parseInt(message.body));
      session.setWelcome(true);
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