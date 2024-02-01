const WPP = require('./wpp');

const main = async () => {

	//criando o cliente
	const client = new WPP();

	//iniciando o cliente
	client.initialize();

}

main();