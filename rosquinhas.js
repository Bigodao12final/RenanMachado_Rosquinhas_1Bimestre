// Array de imagens das rosquinhas
const productImages = [
    "img/cremosa.png",   // Imagem 1
    "img/chocolate.png",  // Imagem 2
    "img/baunilha.png",   // Imagem 3
    "img/strawberry.png"  // Imagem 4 (adicionada para exemplo)
];

let currentIndex = 1; // Índice da imagem inicial (começando pelo meio)

// Função para mudar as imagens
function changeProduct(direction) {
    const images = document.querySelectorAll('.product-image img');
    const imageContainers = document.querySelectorAll('.product-image');

    // Se a direção for 'prev', diminui o índice (voltar para a imagem anterior)
    if (direction === 'prev') {
        currentIndex = (currentIndex - 1 + productImages.length) % productImages.length;
    } 
    // Se a direção for 'next', aumenta o índice (ir para a próxima imagem)
    else if (direction === 'next') {
        currentIndex = (currentIndex + 1) % productImages.length;
    }

    // Atualiza as três imagens exibidas com a nova posição
    images[0].src = productImages[(currentIndex - 1 + productImages.length) % productImages.length];
    images[1].src = productImages[currentIndex];
    images[2].src = productImages[(currentIndex + 1) % productImages.length];

    // Adiciona as classes de destaque
    imageContainers.forEach(container => container.classList.remove('middle')); // Remove a classe 'middle' de todas
    imageContainers[1].classList.add('middle'); // Adiciona 'middle' à imagem do meio

    // Habilita o botão de compra
    document.getElementById("buyButton").disabled = false;

    // Move as imagens para o lado (transição suave)
    document.querySelector('.product-images').style.transform = `translateX(-${200 * currentIndex}px)`;
}
