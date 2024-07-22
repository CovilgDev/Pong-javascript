const canvas = document.getElementById('pong');
const ctx = canvas.getContext('2d');

// Variáveis do jogo
let ballX = canvas.width / 2;
let ballY = canvas.height / 2;
let ballRadius = 10;
let ballSpeedX = 4;
let ballSpeedY = 4;

let player1Y = canvas.height / 2 - 50;
let player2Y = canvas.height / 2 - 50;
const playerHeight = 100;
const playerWidth = 10;
let player1Speed = 0;
let player2Speed = 0;

let player1Score = 0;
let player2Score = 0;

window.onload = gameLoop;

function gameLoop() {
    // Limpar a tela antes de desenhar
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Atualizar a posição da bola
    updateBall();

    // Desenhar a bola
    drawBall();

    // Mover as raquetes
    player1Y += player1Speed;
    player2Y += player2Speed;

    // Limitar as raquetes às bordas da tela
    player1Y = Math.max(player1Y, 0); // Limite superior
    player1Y = Math.min(player1Y, canvas.height - playerHeight); // Limite inferior
    player2Y = Math.max(player2Y, 0); // Limite superior
    player2Y = Math.min(player2Y, canvas.height - playerHeight); // Limite inferior

    // Desenhar os raquetes
    drawPlayer1();
    movePlayer1();
    drawPlayer2();
    movePlayer2();

    // Desenhar o placar
    drawScore();

    // Solicitar a próxima iteração do game loop
    requestAnimationFrame(gameLoop);
    console.log("1:",player1Speed);
    console.log("2",player2Speed);
}

// Função para desenhar a bola
function drawBall() {
    ctx.beginPath();
    ctx.arc(ballX, ballY, ballRadius, 0, 2 * Math.PI);
    ctx.fillStyle = '#fff';
    ctx.fill();
}

// Players ----------------------------------------------------------------------------------------------
function movePlayer1(){
    // Evento de teclado para a raquete do Jogador 1:
    document.addEventListener('keydown', function(event) {
        if (event.key === 'w') {
            player1Speed = -10; // Inverte a velocidade para cima
        } else if (event.key === 's') {
            player1Speed = 10; // Mantém a velocidade para baixo
        }
    });

    document.addEventListener('keyup', function(event) {
        if (event.key === 'w' || event.key === 's') {
            player1Speed = 0; // Para a raquete quando a tecla for solta
        }
    });
}

function drawPlayer1(){
    ctx.fillStyle = '#fff';

    ctx.fillRect(10, player1Y, playerWidth, playerHeight);
}

function movePlayer2(){
// Evento de teclado para a raquete do Jogador 2:
    document.addEventListener('keydown', function(event) {
    if (event.key === 'ArrowUp') {
        player2Speed = -10; // Inverte a velocidade para cima
    } else if (event.key === 'ArrowDown') {
        player2Speed = 10; // Mantém a velocidade para baixo
    }
    });

    document.addEventListener('keyup', function(event) {
        if (event.key === 'ArrowUp' || event.key === 'ArrowDown') {
            player2Speed = 0; // Para a raquete quando a tecla for solta
        }
    });
}
	
function drawPlayer2(){    
    ctx.fillStyle = '#fff';
    
    ctx.fillRect(canvas.width - 10 - playerWidth, player2Y, playerWidth, playerHeight);
}
// Players ----------------------------------------------------------------------------------------------
	
// Função para desenhar o placar
function drawScore() {
    ctx.font = '30px Arial';
    ctx.fillStyle = '#fff';

    ctx.fillText(player1Score, 50, 30);
    ctx.fillText(player2Score, canvas.width - 50, 30);
}

// Função para atualizar a posição da bola
function updateBall() {
    ballX += ballSpeedX;
    ballY += ballSpeedY;

    // Rebater a bola nas paredes superior e inferior
    if (ballY <= ballRadius || ballY >= canvas.height - ballRadius) {
        ballSpeedY *= -1;
    }

    // Rebater a bola nos raquetes
    // Verifique se há colisões com a raquete do Jogador 1
    if (ballX <= ballRadius + playerWidth && ballY >= player1Y && ballY     <= player1Y + playerHeight) {
    ballSpeedX = (Math.random() * 6 + 2);
    }

    // Verifique se há colisões com a raquete do Jogador 2
    if (ballX >= canvas.width - ballRadius - playerWidth && ballY >=     player2Y && ballY <= player2Y + playerHeight) {
        ballSpeedX = (Math.random() * 6 + 2) * (-1);
    }

    // Pontuação
    if (ballX <= 0) {
        player2Score++;
        resetBall();
    } else if (ballX >= canvas.width) {
        player1Score++;
        resetBall();
    }
}
	
// Função para resetar a bola
function resetBall() {
    ballX = canvas.width / 2;
    ballY = canvas.height / 2;

    // Definindo a velocidade inicial da bola e direção inicial
    ballSpeedX = (Math.random() * 2 - 1) * 6 + 2; // Velocidade horizontal entre 2 e 8 (para direita ou esquerda)
    ballSpeedY = Math.random() * 2 - 1; // Velocidade vertical aleatória entre -1 e 1

    // Efeito visual para indicar a mudança de posse
    ctx.fillStyle = '#f00'; // Cor vermelha para indicar a mudança de posse
    ctx.fillRect(0, 0, canvas.width, canvas.height); // Preenche a tela com vermelho por um curto período

    setTimeout(() => {
       ctx.fillStyle = '#222'; // Retorna a cor de fundo original
       ctx.fillRect(0, 0, canvas.width, canvas.height);
    }, 100); // Tempo do efeito visual (em milissegundos)
}