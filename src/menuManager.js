class MenuManager {

  #manager

  constructor(manager) {
    this.#manager = manager;
  }
  
  getClient() {
    if (this.#manager === undefined) throw new Error("Manager não iniciado");
    return this.#manager;
  }

}

module.exports = MenuManager;