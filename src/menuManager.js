const MENUS = require('./submenus/index.js');
const menuInicial = require('./submenus/inicial.js');
const menuCatalogo = require('./submenus/catalogo.js');
const menuCarrinho = require('./submenus/carrinho.js');
const menuAtendente = require('./submenus/atendente.js');

class MenuManager {

  #client
  #currentMenu
  #welcomeMessage
  #humanContact

  constructor(client) {
    this.#client = client;
    this.#currentMenu = MENUS.INICIAL;
    this.#welcomeMessage = true;
    this.#humanContact = true;
  }

  setMenu(menu) {
    this.#currentMenu = menu;
  }

  setWelcome(welcome) {
    this.#welcomeMessage = welcome;
  }

  setHumanContact(human){
    this.#humanContact = human;
  }

  async handleReceivedMessage(message) {
    console.log(`Mensagem recebida: ${message.body}`);
    this.handleMessageMenu(message);
  }

  async handleMessageMenu(message) {
    switch (this.#currentMenu) {

      case MENUS.INICIAL:
        if (this.#welcomeMessage) {
          await menuInicial.handleMensagemBoasVindas(message, this);
          this.setWelcome(false);
        } else {
          await menuInicial.handleMenuInicial(message, this);
        }
        break;

      case MENUS.CATALOGO:
        await menuCatalogo.handleMenuCatalogo(message, this);
        break;

      case MENUS.CARRINHO:
        await menuCarrinho.handleMenuCarrinho(message, this);
        break;

      case MENUS.ATENDENTE:
        if (this.#humanContact) {
          await menuAtendente.handleBoasVindasAtendente(message, this);
          this.setHumanContact(false);
        } else {
          await menuAtendente.handleMenuAtendente(message, this);
        }
        break;

    }
  }

  async sendMessage(destination, message) {
    await this.#client.sendMessage(destination, message);
  }

  getManager() {
    if (this === undefined) throw new Error("Manager não iniciado");
    return this;
  }

}

module.exports = MenuManager;