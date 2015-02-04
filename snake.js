$(document).ready(function () {

  var canvas = $("#canvasForSnake");
  var ctx = canvas[0].getContext("2d");

  var wSnakePart = 10;
  var wScene = canvas.width();
  var hScene = canvas.height();
  direction = {
    "dx": 1,
    "dy": 0
  };
  var snakeArray = [];
  var food = {
    "x": 0,
    "y": 0
  };
  foodRandom();

  function foodRandom() {
    food.x = Math.floor(Math.random() * (wScene / wSnakePart));
    food.y = Math.floor(Math.random() * (hScene / wSnakePart));
    console.log(food);
  }

  function init() {
    direction = {
      "dx": 1,
      "dy": 0
    };
    snakeArray = [{
        "x": 0,
        "y": 0
      },
      {
        "x": 1,
        "y": 0
      },
      {
        "x": 2,
        "y": 0
      },
      {
        "x": 3,
        "y": 0
      },
      {
        "x": 4,
        "y": 0
      }];
  }

  function drawSnake() {
    ctx.fillStyle = "blue";
    for (var i = 0; i < snakeArray.length; i++) {
      snakePart = snakeArray[i];
      ctx.fillRect(snakePart.x * wSnakePart,
        snakePart.y * wSnakePart,
        wSnakePart - 1,
        wSnakePart - 1);
    }
  }

  function drawFood() {
    ctx.fillStyle = "blue";
    ctx.fillRect(food.x * wSnakePart,
      food.y * wSnakePart,
      wSnakePart - 1,
      wSnakePart - 1);
  }

  function snakeMove() {
    var headSnake = snakeArray[snakeArray.length - 1];
    snakeArray.push({
      "x": headSnake.x + direction.dx,
      "y": headSnake.y + direction.dy
    });
    snakeArray.shift();
  }

  function checkCollision() {
    var headSnake = snakeArray[snakeArray.length - 1];
    if (headSnake.x < 0) init();
    if (headSnake.x * wSnakePart + wSnakePart > wScene) init();
    if (headSnake.y < 0) init();
    if (headSnake.y * wSnakePart + wSnakePart > hScene) init();

    if (headSnake.x === food.x && headSnake.y === food.y) {
      snakeArray.push({
        "x": headSnake.x + direction.dx,
        "y": headSnake.y + direction.dy
      });
      foodRandom();
    }
  }

  function gameLoop() {
    clearBackgroud();
    snakeMove();
    drawSnake();
    drawFood();
    checkCollision();
    setTimeout(gameLoop, 60);
  }

  function clearBackgroud() {
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, 300, 400);
  }

  init();
  gameLoop();

})

$(document).keydown(function (e) {
  key = e.which;
  if (key === 40 && direction.dy !== -1) {
    direction.dx = 0;
    direction.dy = 1;
  }
  if (key === 38 && direction.dy !== 1) {
    direction.dx = 0;
    direction.dy = -1;
  }
  if (key === 37 && direction.dx !== 1) {
    direction.dx = -1;
    direction.dy = 0;
  }
  if (key === 39 && direction.dx !== -1) {
    direction.dx = 1;
    direction.dy = 0;
  }
})