const MENUS = require('./submenus/index.js');
const { createSession } = require('./sesssionManagement.js');
const menuInicial = require('./submenus/inicial.js');
const menuCatalogo = require('./submenus/catalogo.js');
const menuCarrinho = require('./submenus/carrinho.js');
const menuAtendente = require('./submenus/atendente.js');
const { getSession } = require('./sesssionManagement.js');

class MenuManager {

  #client

  constructor(client) {
    this.#client = client;
  }

  async handleReceivedMessage(message) {
    var clientPhone = message.from;
    var session = getSession(clientPhone);
    console.log(message.body);
    this.handleMessageMenu(message, session);
  }

  async handleMessageMenu(message, session) {

    switch (session.getCurrentMenu()) {

      case MENUS.INICIAL:

        if (session.getWelcome()) {
          await menuInicial.handleMensagemBoasVindas(message, this);
          session.setWelcome(false);

        } else {
          await menuInicial.handleMenuInicial(session, message, this);
        }

        break;

      case MENUS.CATALOGO:
        await menuCatalogo.handleMenuCatalogo(message, this);
        break;

      case MENUS.CARRINHO:
        await menuCarrinho.handleMenuCarrinho(message, this);
        break;

      case MENUS.ATENDENTE:
        if (session.getHumanContact()) {
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