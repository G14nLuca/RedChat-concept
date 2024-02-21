const items = require("./submenus/items_index");

class ClientCart {
    constructor() {
        this.cart = new Map();
    }

    addToCart(productId) {

        var id = parseInt(productId);

        if (this.cart.has(id)) {
            this.cart.get(id).quantity += 1;

        } else {

            var productName = items.get(id)[0];
            var productPrice = items.get(id)[1];

            this.cart.set(id, {
                name: productName,
                price: productPrice,
                quantity: 1,
            });
        }
    }

    removeFromCart(productId) {
        this.cart.delete(productId);
    }

    clearCart() {
        this.cart.clear();
    }

    getCartItems() {
        return Array.from(this.cart.values());
    }

    calculateTotalPrice() {
        let totalPrice = 0;
        for (const item of this.cart.values()) {
            totalPrice += item.price * item.quantity;
        }
        return totalPrice;
    }

}

module.exports = ClientCart;
