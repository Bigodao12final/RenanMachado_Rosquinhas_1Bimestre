let cart = [];

// Função para adicionar item ao carrinho
function addToCart(button) {
    const container = button.parentElement;
    const qtyInput = container.querySelector('input.qty');
    const quantity = parseInt(qtyInput.value);
    const name = qtyInput.getAttribute('data-name');
    const price = parseFloat(qtyInput.getAttribute('data-price'));

    if (quantity > 0) {
        const existing = cart.find(item => item.name === name);
        if (existing) {
            existing.quantity += quantity;
        } else {
            cart.push({ name, price, quantity });
        }
        updateCart();
        qtyInput.value = 0;  // Reseta a quantidade após adicionar
    }
}

// Função para atualizar o carrinho
function updateCart() {
    const cartItems = document.getElementById("cartItems");
    const totalElement = document.getElementById("total");
    cartItems.innerHTML = "";

    let total = 0;

    cart.forEach(item => {
        const li = document.createElement("li");
        li.textContent = `${item.name} x${item.quantity} - R$ ${(item.price * item.quantity).toFixed(2)}`;
        cartItems.appendChild(li);
        total += item.price * item.quantity;
    });

    totalElement.textContent = total.toFixed(2);
}
function changeQuantity(button, delta) {
    const qtySpan = button.parentElement.querySelector('.qty');
    let currentQty = parseInt(qtySpan.textContent);

    // Verificar se o valor é maior que 0 antes de diminuir a quantidade
    if (currentQty + delta >= 0) {
        qtySpan.textContent = currentQty + delta;
    }
}
