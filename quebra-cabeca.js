const puzzleContainer = document.getElementById('puzzle-container');
const resetButton = document.getElementById('reset');

// Imagem do quebra-cabeça (substitua pelo caminho da imagem desejada)
const imageSrc = './jogos/quebra.jpg';

// Tamanho fixo da imagem original
const imageWidth = 300; // Largura da imagem original
const imageHeight = 300; // Altura da imagem original

// Cria as peças do quebra-cabeça
function createPuzzlePieces() {
    const pieces = [];
    for (let i = 0; i < 9; i++) {
        const piece = document.createElement('div');
        piece.classList.add('puzzle-piece');
        piece.style.backgroundImage = `url(${imageSrc})`;

        const pieceWidth = imageWidth / 3; // Largura de cada peça
        const pieceHeight = imageHeight / 3; // Altura de cada peça

        // Define a posição da peça dentro da imagem
        piece.style.backgroundPosition = `${(i % 3) * -pieceWidth}px ${Math.floor(i / 3) * -pieceHeight}px`;
        piece.style.backgroundSize = `${imageWidth}px ${imageHeight}px`; // Mantém o tamanho original da imagem

        piece.dataset.order = i; // Ordem original da peça
        pieces.push(piece);
    }
    return pieces;
}

// Embaralha as peças do quebra-cabeça
function shufflePuzzle(pieces) {
    const shuffledOrder = [...Array(pieces.length).keys()].sort(() => Math.random() - 0.5);
    pieces.forEach((piece, index) => {
        piece.style.order = shuffledOrder[index];
        piece.dataset.currentOrder = shuffledOrder[index];
    });
    pieces.forEach(piece => puzzleContainer.appendChild(piece));
}

// Verifica se o quebra-cabeça foi resolvido
function checkPuzzle() {
    const pieces = Array.from(document.querySelectorAll('.puzzle-piece'));
    const isSolved = pieces.every((piece, index) => Number(piece.dataset.currentOrder) === Number(piece.dataset.order));
    if (isSolved) {
        alert('Parabéns! Você resolveu o quebra-cabeça!');
    }
}

// Adiciona funcionalidade de troca de peças
function enablePieceSwap() {
    let selectedPiece = null;

    puzzleContainer.addEventListener('click', (e) => {
        const clickedPiece = e.target;
        if (!clickedPiece.classList.contains('puzzle-piece')) return;

        if (!selectedPiece) {
            selectedPiece = clickedPiece;
            clickedPiece.style.border = '2px solid #ff6f91';
        } else {
            // Troca os atributos de ordem
            const tempOrder = selectedPiece.style.order;
            selectedPiece.style.order = clickedPiece.style.order;
            clickedPiece.style.order = tempOrder;

            const tempCurrentOrder = selectedPiece.dataset.currentOrder;
            selectedPiece.dataset.currentOrder = clickedPiece.dataset.currentOrder;
            clickedPiece.dataset.currentOrder = tempCurrentOrder;

            selectedPiece.style.border = '2px solid #fff';
            selectedPiece = null;

            checkPuzzle();
        }
    });
}

// Inicializa o quebra-cabeça
function initPuzzle() {
    puzzleContainer.innerHTML = '';
    const pieces = createPuzzlePieces();
    shufflePuzzle(pieces); // Embaralha as peças antes de renderizar
    enablePieceSwap();
}

// Reinicia o quebra-cabeça
resetButton.addEventListener('click', initPuzzle);

// Carrega o quebra-cabeça ao abrir a página
window.addEventListener('load', initPuzzle);

// Redimensiona o quebra-cabeça ao ajustar a janela
window.addEventListener('resize', () => {
    initPuzzle(); // Recria as peças para ajustar a posição e o tamanho
});
