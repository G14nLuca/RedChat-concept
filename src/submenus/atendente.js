const mensagens = {
    bemVindo: {
        content: "Aguarde um instante, você já vai conversar com um dos nossos colaboradores. A qualquer momento, você pode encerrar esse atendimento e voltar ao menu principal do bot mandando uma mensagem com a palavra '#bot'.",
    },
    retorno: {
        content: "Encerrando atendimento e retornando ao menu principal...",
    },
};

async function handleBoasVindasAtendente(message, menuManager) {
    await menuManager.sendMessage(message.from, mensagens.bemVindo.content);
}

async function handleMenuAtendente(message, menuManager) {
    switch (message.body) {
        case "#bot":
            await menuManager.sendMessage(message.from, mensagens.retorno.content);
            menuManager.setMenu(parseInt(0));
            menuManager.setHumanContact(true);
            menuManager.handleMessageMenu(message);
            break;
    }
}

module.exports = {
    handleBoasVindasAtendente, handleMenuAtendente
};