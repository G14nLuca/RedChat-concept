const MENUS = require('./submenus/index.js');
const menuInicial = require('./submenus/inicial.js')

class MenuManager {

  #client
  #currentMenu
  #welcomeMessage

  constructor(client) {
    this.#client = client;
    this.#currentMenu = MENUS.INICIAL;
    this.#welcomeMessage = true;
  }

  setMenu(menu) {
    this.#currentMenu = menu;
  }

  setWelcome(welcome) {
    this.#welcomeMessage = welcome;
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

     /* case MENUS.CATALOGO:
        if (this.#welcomeMessage) {
          await menuInicial.handleMensagemBoasVindas(message, this);
          this.setWelcome(false);
        } else {
          await menuInicial.handleMenuInicial(message, this);
        }
        break;

      case MENUS.CARRINHO:
        if (this.#welcomeMessage) {
          await menuInicial.handleMensagemBoasVindas(message, this);
          this.setWelcome(false);
        } else {
          await menuInicial.handleMenuInicial(message, this);
        }
        break;

      case MENUS.ATENDENTE:
        if (this.#welcomeMessage) {
          await menuInicial.handleMensagemBoasVindas(message, this);
          this.setWelcome(false);
        } else {
          await menuInicial.handleMenuInicial(message, this);
        }
        break;*/
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