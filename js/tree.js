// Función para crear un corazón flotante
function createHeart() {
    const treeContainer = document.getElementById('tree-container');

    // Si no existe el contenedor, no hacer nada
    if (!treeContainer) return;

    const heart = document.createElement('div');
    heart.classList.add('heart');

    // Posición horizontal aleatoria
    heart.style.left = Math.random() * 100 + 'vw';

    // Duración aleatoria de animación entre 3s y 5s
    heart.style.animationDuration = (Math.random() * 2 + 3) + 's';

    // Añadir al DOM
    treeContainer.appendChild(heart);

    // Eliminar después de 5 segundos
    setTimeout(() => {
        heart.remove();
    }, 5000);
}

// Crear un corazón cada 300ms
setInterval(createHeart, 300);