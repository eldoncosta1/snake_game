let canvas = document.getElementById("snake");
let context = canvas.getContext("2d");
let box = 32;
let snake = [];
// cobrinha criada no centro do canvas com tamanho definido no index.html
snake[0] = {
  x: 8 * box,
  y: 8 * box
}
let direction = "right";
let food = {
  x: Math.floor(Math.random() * 15 + 1) * box,
  y: Math.floor(Math.random() * 15 + 1) * box
}

function criarBG() {
  context.fillStyle = "lightgreen";
  /*
    fillRect(posX, posY, Width, Height)
  */
  context.fillRect(0, 0, 16 * box, 16 * box);
}

function criarCobrinha() {
  for (let i = 0; i < snake.length; i++) {
    context.fillStyle = "green";
    context.fillRect(snake[i].x, snake[i].y, box, box);
  }
}

function drawFood() {
  context.fillStyle = "red";
  context.fillRect(food.x, food.y, box, box);
}

document.addEventListener('keydown', update);

function update(event) {
  if (event.keyCode == 37 && direction != "right") direction = "left";
  if (event.keyCode == 38 && direction != "down") direction = "up";
  if (event.keyCode == 39 && direction != "left") direction = "right";
  if (event.keyCode == 40 && direction != "up") direction = "down";

}

function iniciarJogo() {  
  // Ao chegar no fim do canvas, aparece do outro lado (corrigindo bug que deixava a cobra passeando fora do canva)
  if (snake[0].x > 15 * box && direction != "left") snake[0].x = 0;
  if (snake[0].x < 0 && direction != "right") snake[0].x = 15 * box;
  if (snake[0].y > 15 * box && direction != "up") snake[0].y = 0;
  if (snake[0].y < 0 && direction != "down") snake[0].y = 15 * box;

  // se a posição 0 (cabeça) se chocar com o corpo, ela para o jogo
  for (let i = 1; i < snake.length; i++) {
    if (snake[0].x == snake[i].x && snake[0].y == snake[i].y) {
      clearInterval(jogo);
      alert('Game Over :(');
    }
  }

  criarBG();
  criarCobrinha();
  drawFood();

  // posição da cabeça da cobrinha
  let snakeX = snake[0].x;
  let snakeY = snake[0].y

  // movimento da cobrinha
  if (direction == "right") snakeX += box;
  if (direction == "left") snakeX -= box;
  if (direction == "up") snakeY -= box;
  if (direction == "down") snakeY += box;

  // crescimento da cobrinha
  if (snakeX != food.x || snakeY != food.y) {
    /**
     * caso a posição da cobrinha seja diferente da comida,
     * ela continua em movimento (removendo um item do array)
     */
    snake.pop();
  } else {
    // caso contrário, não remove o item do array (aumenta de tamanho e a modia muda para outra posição aleatória)
    food.x = Math.floor(Math.random() * 15 + 1) * box;
    food.y = Math.floor(Math.random() * 15 + 1) * box;
  }

  let newHead = {
    x: snakeX,
    y: snakeY
  }

  snake.unshift(newHead);

}

let jogo = setInterval(iniciarJogo, 100);
