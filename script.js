// PROYECTO 1: TABLERO DE AJEDREZ

//busca el elemento id=tablero y lo guarda en la constante
const tablero = document.getElementById('tablero');


//si el elemento existe, ejecuta el código
if (tablero) {
    //posición de las piezas en el tablero (array)
    const piezasIniciales = [
        ["♜", "♞", "♝", "♛", "♚", "♝", "♞", "♜"],
        ["♟", "♟", "♟", "♟", "♟", "♟", "♟", "♟"],
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
        ["♙", "♙", "♙", "♙", "♙", "♙", "♙", "♙"],
        ["♖", "♘", "♗", "♕", "♔", "♗", "♘", "♖"]
    ];

    for (let fila = 0; fila < 8; fila++) { //recorre el array
        for (let col = 0; col < 8; col++) {
            const casilla = document.createElement('div'); //crea un nuevo div
            casilla.classList.add('casilla'); //añade css al nuevo div (casilla)
            
            if ((fila + col) % 2 === 0) { //alterna colores de las casillas: si es par, blanco; si es impar, negro
                casilla.classList.add('blanco');
            } else {
                casilla.classList.add('negro');
            }
            
            casilla.textContent = piezasIniciales[fila][col]; //asigna posiciones a las fichas (textContent porque son texto)
            tablero.appendChild(casilla); //coloca la casilla en el tablero html
        }
    }
}


//MINI-JUEGO

//busca el elemento con el id y lo guarda en la constante
const character = document.getElementById('character');
const obstacle = document.getElementById('obstacle');
const scoreElement = document.getElementById('score');
const gameOverElement = document.getElementById('game-over');

//solo ejecutar la lógica del juego si estamos en la página del juego y si existen los elementos character y obstacle
if (character && obstacle) {
    let isGameOver = false;
    let score = 0;
    let scoreInterval;

    //cuando el usuario pulsa el espacio lo interpreta como salto
    document.addEventListener('keydown', (event) => {
        if ((event.code === 'Space' || event.key === ' ') && !isGameOver) {
            saltar();
        }
    });

    //funcion que define el salto
    function saltar() {
        if (character.classList.contains('salto')) return; //si hay salto, la funcion se detiene (evita saltos infinitos)
        character.classList.add('salto'); //activa la animación del salto (css)
        setTimeout(() => {
            character.classList.remove('salto'); //para el salto después de 0.5 segundos
        }, 500);
    }

    //ejecuta el código constantemente casa 10 milisegundos
    const checkCollision = setInterval(() => {
        const characterBottom = parseInt(window.getComputedStyle(character).getPropertyValue('bottom'));
        const characterRect = character.getBoundingClientRect(); //obtiene la posición del personaje
        const obstacleRect = obstacle.getBoundingClientRect(); //obtiene la del obstáculo
        const margin = 10;

        //si el personaje y el obstáculo se tocan (o si no se ha saltado lo suficiente), es game over
        if (
            obstacleRect.left < characterRect.right - margin &&
            obstacleRect.right > characterRect.left + margin &&
            characterBottom <= 30 
        ) {
            isGameOver = true;
            obstacle.style.animation = 'none'; //para la animación
            clearInterval(scoreInterval); //detiene la puntuación
            clearInterval(checkCollision); //detiene la detección de colisión (personaje y obstáculo)
            gameOverElement.classList.remove('hidden'); 
        }
    }, 10);

    scoreInterval = setInterval(() => {
        //aumenta la puntuación cada segundo
        if (!isGameOver) {
            score++;
            if (scoreElement) scoreElement.textContent = score; //actualiza el número
        }
    }, 1000);
}
