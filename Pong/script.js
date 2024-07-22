const canvas = document.getElementById('pong');
const ctx = canvas.getContext('2d');

// Variáveis do jogo
let statusGame = 'menu';

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

    
    tick();
    render();

    requestAnimationFrame(gameLoop);
}

function tick(){

    if(statusGame == 'menu'){
        document.addEventListener('keydown', function(event){
            if(event.key === 'Enter'){
                statusGame = 'game';
            }
        });
    }else if(statusGame == 'game'){
        
        // Atualizar a posição da bola
        updateBall();

        //players
        movePlayer1();
        movePlayer2();
        pause();
    }else if(statusGame == 'pause'){
        pause();
    }
    
}

function render(){

    if(statusGame == 'menu'){
        ctx.beginPath();
        ctx.font = '50px Arial';
        ctx.fillStyle = 'white';

        ctx.fillText('- Aperte ENTER para iniciar -', canvas.width/2 - 320, canvas.height/2);
    }else if(statusGame == 'game'){
        // Limpar a tela antes de desenhar
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    
        // Desenhar a bola
        drawBall();

        //players
        drawPlayer1();
        drawPlayer2();

        // Desenhar o placar
        drawArena();
    }else if(statusGame == 'pause'){
        // Limpar a tela antes de desenhar
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    
        // Desenhar a bola
        drawBall();

        //players
        drawPlayer1();
        drawPlayer2();

        // Desenhar o placar
        drawArena();
    }

    
}

function pause(){
    document.addEventListener('keydown', function(event){
        if(event.key === ' '){
            statusGame = 'pause';
        }
    });

    document.addEventListener('keydown', function(event){
        if(event.key === 'Enter'){
            statusGame = 'game';
        }
    });
}

// Função para desenhar a bola
function drawBall() {
    ctx.beginPath();
    ctx.arc(ballX, ballY, ballRadius, 0, 2 * Math.PI);
    ctx.fillStyle = '#fff';
    ctx.fill();
}

function movePlayer1(){
    player1Y += player1Speed;

    player1Y = Math.max(player1Y, 0);
    player1Y = Math.min(player1Y, canvas.height - playerHeight);

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
    player2Y += player2Speed;

    player2Y = Math.max(player2Y, 0);
    player2Y = Math.min(player2Y, canvas.height - playerHeight);

    document.addEventListener('keydown', function(event) {
    if (event.key === 'ArrowUp') {
        player2Speed = -10; // Inverte a velocidade para cima
    } else if (event.key === 'ArrowDown') {
        player2Speed = 10; // Mantém a velocidade para baixo
    }
    });

    document.addEventListener('keyup', function(event) {
        if (event.key === 'ArrowUp' || event.key === 'ArrowDown') {
            player2Speed = 0; 
        }
    });
}
	
function drawPlayer2(){    
    ctx.fillStyle = '#fff';
    
    ctx.fillRect(canvas.width - 10 - playerWidth, player2Y, playerWidth, playerHeight);
}
	
function drawArena() {
    ctx.font = '60px Arial';
    ctx.fillStyle = '#fff';
    ctx.strokeStyle = '#fff';
    ctx.lineWidth = 2;

    ctx.fillText(player1Score, 250, 70);
    ctx.fillText(player2Score, canvas.width - 250, 70);

    ctx.moveTo(canvas.width/2, 0);
    ctx.lineTo(canvas.width/2, canvas.height);
    ctx.stroke();
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
    ballSpeedX = (Math.random() * 2 - 1) * 10 + 6; // Velocidade horizontal entre 6 e 12 (para direita ou esquerda)
    ballSpeedY = Math.random() * 2 - 1; // Velocidade vertical aleatória entre -1 e 1

    // Efeito visual para indicar a mudança de posse
    ctx.fillStyle = '#f00'; // Cor vermelha para indicar a mudança de posse
    ctx.fillRect(0, 0, canvas.width, canvas.height); // Preenche a tela com vermelho por um curto período

    setTimeout(() => {
       ctx.fillStyle = '#222'; // Retorna a cor de fundo original
       ctx.fillRect(0, 0, canvas.width, canvas.height);
    }, 100); // Tempo do efeito visual (em milissegundos)
}