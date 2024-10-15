const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// Настройки игры
const gridSize = 20; // Размер одной клетки
canvas.width = 400;
canvas.height = 400;

let snake = [{ x: 160, y: 160 }]; // Начальная позиция змейки
let direction = { x: gridSize, y: 0 }; // Направление движения змейки
let food = generateFood(); // Позиция еды
let score = 0;

// Основной игровой цикл
function gameLoop() {
    moveSnake();
    if (checkCollision()) {
        alert("Game Over! Your score: " + score);
        resetGame();
    }
    drawGame();
}

function moveSnake() {
    const head = { x: snake[0].x + direction.x, y: snake[0].y + direction.y };
    snake.unshift(head); // Добавляем новую голову

    if (head.x === food.x && head.y === food.y) {
        score++;
        food = generateFood(); // Генерируем новую еду
    } else {
        snake.pop(); // Убираем хвост, если змейка не съела еду
    }
}

function drawGame() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Очищаем экран

    // Рисуем еду
    ctx.fillStyle = "red";
    ctx.fillRect(food.x, food.y, gridSize, gridSize);

    // Рисуем змейку
    ctx.fillStyle = "green";
    snake.forEach(segment => {
        ctx.fillRect(segment.x, segment.y, gridSize, gridSize);
    });
}

// Проверяем столкновение змейки с краем или самой собой
function checkCollision() {
    const head = snake[0];

    // Проверяем столкновение с краями
    if (head.x < 0 || head.x >= canvas.width || head.y < 0 || head.y >= canvas.height) {
        return true;
    }

    // Проверяем столкновение с самим собой
    for (let i = 1; i < snake.length; i++) {
        if (head.x === snake[i].x && head.y === snake[i].y) {
            return true;
        }
    }

    return false;
}

// Генерация еды в случайном месте
function generateFood() {
    return {
        x: Math.floor(Math.random() * (canvas.width / gridSize)) * gridSize,
        y: Math.floor(Math.random() * (canvas.height / gridSize)) * gridSize
    };
}

// Сброс игры после поражения
function resetGame() {
    snake = [{ x: 160, y: 160 }];
    direction = { x: gridSize, y: 0 };
    score = 0;
}

// Управление змейкой
document.addEventListener("keydown", event => {
    const key = event.key;
    if (key === "ArrowUp" && direction.y === 0) {
        direction = { x: 0, y: -gridSize };
    } else if (key === "ArrowDown" && direction.y === 0) {
        direction = { x: 0, y: gridSize };
    } else if (key === "ArrowLeft" && direction.x === 0) {
        direction = { x: -gridSize, y: 0 };
    } else if (key === "ArrowRight" && direction.x === 0) {
        direction = { x: gridSize, y: 0 };
    }
});

// Запуск игры
setInterval(gameLoop, 100);
