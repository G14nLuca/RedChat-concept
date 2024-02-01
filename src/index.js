const WPP = require('./wpp');
const MenuManager = require('./menuManager');

const main = async () => {

	//criando o cliente
	const client = new WPP();
	const manager = new MenuManager(client);

	//iniciando o cliente
	client.initialize();

}

main();