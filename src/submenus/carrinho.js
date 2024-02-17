const mensagens = {
    bemVindo: {
        content: "Este é o menu do carrinho. Ainda em construção. Digite 0 para retornar ao menu principal.",
    },
    erroEscolha: {
        content: "Por favor, escolha uma opção válida.",
    },
};

async function handleMenuCarrinho(session, message, menuManager) {
    switch (message.body) {
        case "0":
            session.setCurrentMenu(parseInt(message.body));
            session.setWelcome(true);
            menuManager.handleMessageMenu(message, session);
            break;
        default:
            await menuManager.sendMessage(message.from, mensagens.bemVindo.content);
            break;
    }
}

module.exports = {
    handleMenuCarrinho
};