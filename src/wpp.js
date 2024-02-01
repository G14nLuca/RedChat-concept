const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');

class WPP {

  #client

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
      console.log(message.body);
      if (message.body === '!ping') {
        this.sendMessage(message.from, 'pong');
      }
    });

  }

  async sendMessage(to, message) {
    if (!this.#client) throw new Error('Cliente não inicializado');
    await this.#client.sendMessage(to, message);
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