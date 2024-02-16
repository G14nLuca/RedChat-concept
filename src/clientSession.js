const MENUS = require('./submenus/index.js');
const ClientCart = require('./ClientCart');

class ClientSession {

  #currentMenu
  #welcomeMessage
  #humanContact
  #cart

  constructor() {
    this.#currentMenu = MENUS.INICIAL;
    this.#welcomeMessage = true;
    this.#humanContact = true;
    this.#cart = new ClientCart();
  }

  setCurrentMenu(menuNumber) {
    this.#currentMenu = menuNumber;
  }

  getCurrentMenu() {
    return this.#currentMenu;
  }
  
  setWelcome(welcome) {
    this.#welcomeMessage = welcome;
  }

  getWelcome(){
    return this.#welcomeMessage;
  }
  
  setHumanContact(human){
    this.#humanContact = human;
  }

  getHumanContact(){
    return this.#humanContact;
  }

  getCart(){
    return this.#cart;
  }
}

module.exports = ClientSession;