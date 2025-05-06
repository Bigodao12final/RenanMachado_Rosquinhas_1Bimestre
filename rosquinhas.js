let cart = [];  // Array para armazenar os itens do carrinho

// Função para adicionar um produto ao carrinho
// Função para adicionar um produto ao carrinho
function addToCart(name, price) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    const item = cart.find(i => i.name === name);
    if (item) {
        item.quantity += 1;
    } else {
        cart.push({ name, price, quantity: 1 });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    alert(`${name} foi adicionado ao carrinho!`);
}


// Exibe os itens do carrinho
function displayCart() {
    const cartItemsContainer = document.getElementById("cart-items");
    const cartData = JSON.parse(localStorage.getItem('cart')) || [];
    let total = 0;

    cartItemsContainer.innerHTML = '';  // Limpa o carrinho

    cartData.forEach(item => {
        const itemElement = document.createElement('div');
        itemElement.textContent = `${item.name} - R$ ${item.price}`;
        cartItemsContainer.appendChild(itemElement);
        total += item.price;
    });

    const totalElement = document.getElementById("total");
    totalElement.textContent = `Total: R$ ${total.toFixed(2)}`;
}

// Redireciona para a página de checkout
// Função para redirecionar para a página de checkout (pagamento)
function goToCheckout() {
    const cartData = JSON.parse(localStorage.getItem('cart')) || [];
    
    // Verificar se o carrinho não está vazio
    if (cartData.length === 0) {
        alert("Seu carrinho está vazio. Adicione itens antes de finalizar a compra.");
    } else {
        window.location.href = 'pagamento.html';  // Redireciona para a página de pagamento
    }
}

// Finaliza a compra
function completePurchase() {
    const name = document.getElementById('name').value;
    const address = document.getElementById('address').value;
    const paymentMethod = document.getElementById('payment').value;

    if (name && address && paymentMethod) {
        alert(`Compra realizada com sucesso!\nNome: ${name}\nEndereço: ${address}\nForma de pagamento: ${paymentMethod}`);
        localStorage.removeItem('cart');  // Limpa o carrinho após o pagamento
        window.location.href = 'rosquinhas.html';  // Redireciona de volta para a página de produtos
    } else {
        alert('Por favor, preencha todos os campos.');
    }
}

// Exibe os itens do carrinho quando a página de carrinho for carregada
if (document.getElementById("cart-items")) {
    displayCart();
}
  // Mascara simples para campos numéricos
document.querySelector('input[name="numeroCartao"]').addEventListener('input', function () {
    this.value = this.value.replace(/\D/g, '').slice(0, 16);
  });
  
  document.querySelector('input[name="cvv"]').addEventListener('input', function () {
    this.value = this.value.replace(/\D/g, '').slice(0, 3);
  });
  
  document.querySelector('input[name="validade"]').addEventListener('input', function () {
    this.value = this.value.replace(/[^0-9\/]/g, '').slice(0, 5);
  });
  
  document.querySelector('input[name="cpf"]').addEventListener('input', function () {
    this.value = this.value.replace(/\D/g, '').slice(0, 11);
  });
  // Impede letras e limita a 11 dígitos no CPF
document.getElementById("cpfInput").addEventListener("input", function () {
    this.value = this.value.replace(/\D/g, "").slice(0, 11);
  });
  // Formata validade para MM/AA e impede letras
// Formata automaticamente MM/AA com barra e só números
const validadeInput = document.getElementById("validadeInput");

validadeInput.addEventListener("input", function () {
  let val = this.value.replace(/\D/g, "").slice(0, 4); // Apenas números, até 4 dígitos
  if (val.length >= 3) {
    const mes = parseInt(val.slice(0, 2), 10);
    const ano = val.slice(2);

    // Verifica se mês está entre 01 e 12
    if (mes < 1 || mes > 12) {
      this.value = "";
      alert("Mês inválido. Use um valor entre 01 e 12.");
      return;
    }

    this.value = (mes < 10 ? "0" + mes : mes) + "/" + ano;
  } else {
    this.value = val;
  }
});
document.getElementById("confirmarCompraBtn").addEventListener("click", function () {
    const forma = document.querySelector('input[name="formaPagamento"]:checked');
    if (!forma) {
      alert("Selecione uma forma de pagamento.");
      return;
    }
  
    const tipo = forma.value;
    let dados = `<h3>Resumo da Compra</h3><p><strong>Forma de pagamento:</strong> ${tipo}</p>`;
  
    if (tipo === "pix") {
      const nome = document.querySelector('input[name="nomePix"]').value;
      const email = document.querySelector('input[name="emailPix"]').value;
      dados += `<p><strong>Nome:</strong> ${nome}</p>`;
      dados += `<p><strong>Email:</strong> ${email}</p>`;
    }
  
    if (tipo === "dinheiro") {
      const troco = document.querySelector('input[name="troco"]').value;
      dados += `<p><strong>Precisa de troco?</strong> ${troco}</p>`;
    }
  
    if (tipo === "cartao") {
      const tipoCartao = document.querySelector('input[name="tipoCartao"]:checked');
      if (!tipoCartao) {
        alert("Selecione débito ou crédito.");
        return;
      }
  
      const nome = document.querySelector('input[name="nomeCartao"]').value;
      const cpf = document.querySelector('input[name="cpf"]').value;
      const numero = document.querySelector('input[name="numeroCartao"]').value;
      const validade = document.querySelector('input[name="validade"]').value;
      const cvv = document.querySelector('input[name="cvv"]').value;
  
      dados += `<p><strong>Tipo de cartão:</strong> ${tipoCartao.value}</p>`;
      dados += `<p><strong>Nome:</strong> ${nome}</p>`;
      dados += `<p><strong>CPF:</strong> ${cpf}</p>`;
      dados += `<p><strong>Número do cartão:</strong> ${numero.replace(/.(?=.{4})/g, "*")}</p>`;
      dados += `<p><strong>Validade:</strong> ${validade}</p>`;
      dados += `<p><strong>CVV:</strong> ***</p>`;
    }
  
    document.getElementById("resumoCompra").innerHTML = dados;
  });
  
