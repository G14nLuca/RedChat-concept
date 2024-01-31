const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');

const client = new Client({
	puppeteer: { 
		headless: true
	},

	authStrategy: new LocalAuth({
		dataPath: 'storage',
		clientId: 'test'
	})
});

//gerar qrcode
client.on('qr', (qr) => {
	qrcode.generate(qr, { small: true });
});

//avisar quando o cliente está pronto para funcionar
client.on('ready', () => {
	console.log('Client is ready!');
});

//imprimir no terminal as mensgens recebidas
client.on('message', (message) => {
	console.log(message.body);
});

//enviar mensagem "pong" caso alguém digite "!ping"
client.on('message', async (message) => {
	if (message.body === '!ping') {
		await client.sendMessage(message.from, 'pong');
	}
});

//Inicializar o cliente
client.initialize();