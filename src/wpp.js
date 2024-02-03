const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const MenuManager = require('./menuManager');

class WPP {

  #client
  #menuManager

  static getClient() {
    if (this.client === undefined) this.client = new WPP();
    return this.client;
  }

  constructor() {

    this.#client = new Client({
      puppeteer: {
        headless: true
      },

      authStrategy: new LocalAuth({
        dataPath: './storage',
        clientId: 'test'
      })
    });

    this.#menuManager = new MenuManager(this.#client);

    this.setupEventListeners();
  }

  setupEventListeners() {

    this.#client.on('qr', (qr) => {
      qrcode.generate(qr, { small: true });
    });

    this.#client.on('ready', () => {
      console.log('Overdrive, accelerate!');
    });

    this.#client.on('message', (message) => {
      this.#menuManager.tratarMensagemRecebida(message);
    });

  }

  async sendMessage(mensagem) {
    if (!this.#client) throw new Error('Cliente não inicializado');
    await this.#client.sendMessage(message.from, message);
  }

  initialize() {
    if (!this.#client) throw new Error('Cliente não inicializado');
    this.#client.initialize();
  }

  getInstance() {
    if (!this.#client) throw new Error('Cliente não inicializado');
    return this.#client;
  }

}

module.exports = WPP;