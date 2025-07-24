// Canvas setup
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// Variables to check if buttons are pressed
let isLeftPressed = false;
let isRightPressed = false;

document.getElementById('moveLeft').addEventListener('mousedown', function() {
    isLeftPressed = true;
});

document.getElementById('moveLeft').addEventListener('mouseup', function() {
    isLeftPressed = false;
});

document.getElementById('moveRight').addEventListener('mousedown', function() {
    isRightPressed = true;
});

document.getElementById('moveRight').addEventListener('mouseup', function() {
    isRightPressed = false;
});

// For touch support (mobile)
document.getElementById('moveLeft').addEventListener('touchstart', function() {
    isLeftPressed = true;
});

document.getElementById('moveLeft').addEventListener('touchend', function() {
    isLeftPressed = false;
});

document.getElementById('moveRight').addEventListener('touchstart', function() {
    isRightPressed = true;
});

document.getElementById('moveRight').addEventListener('touchend', function() {
    isRightPressed = false;
});


// Resize canvas
resizeCanvas();
window.addEventListener("resize", resizeCanvas);

// Adjust bricks layout and number for the current level
function adjustBricksForLevel() {
    // Set the brick row and column count dynamically based on the current level
    brickRowCount = 3 + currentLevel;
    brickColumnCount = Math.min(10, 5 + Math.floor(currentLevel / 2)); // Cap columns at 10

    // Call createBricks to adjust the layout based on new counts
    createBricks();
}

// Reset the ball and paddle for the next level or after losing a life
function resetBallAndPaddle() {
    x = canvas.width / 2;
    y = canvas.height - 30;
    dx = 2;
    dy = -2;
    paddleX = (canvas.width - paddleWidth) / 2;
}


function updateLevelDisplay() {
    document.getElementById("levelDisplay").textContent = "Level: " + currentLevel;
}

// .............................................
function resizeCanvas() {
    canvas.width = window.innerWidth * 0.8;
    canvas.height = window.innerHeight * 0.8;
}


// Ball variables
let ballRadius = 10;
let x = canvas.width / 2;
let y = canvas.height - 30;
let dx = 2;
let dy = -2;

// Paddle variables
const paddleHeight = 10;
const paddleWidth = 75;
let paddleX = (canvas.width - paddleWidth) / 2;

// Control variables
let rightPressed = false;
let leftPressed = false;

// Brick variables
let brickRowCount = 3;
let brickColumnCount = 5;
const brickWidth = 75;
const brickHeight = 20;
const brickPadding = 10;
const brickOffsetTop = 30;
const brickOffsetLeft = 30;
let bricks = [];

// Level variables
let currentLevel = 1;
const maxLevel = 20;

// Sound effects
const brickHitSound = document.getElementById("brickHitSound");
const paddleHitSound = document.getElementById("paddleHitSound");
const wallHitSound = document.getElementById("wallHitSound");
const levelUpSound = document.getElementById("levelUpSound");
const gameOverSound = document.getElementById("gameOverSound");

// Build the bricks
function createBricks() {
    // Calculate brick dimensions based on canvas width
    const brickWidth = (canvas.width - brickOffsetLeft * 2 - (brickColumnCount - 1) * brickPadding) / brickColumnCount;
    const brickHeight = 20; // Fixed height for visual consistency

    bricks = [];
    for (let c = 0; c < brickColumnCount; c++) {
        bricks[c] = [];
        for (let r = 0; r < brickRowCount; r++) {
            const brickX = brickOffsetLeft + c * (brickWidth + brickPadding);
            const brickY = brickOffsetTop + r * (brickHeight + brickPadding);
            const color = getRandomColor(); // Random color for variety
            bricks[c][r] = { x: brickX, y: brickY, status: 1, color: color, width: brickWidth, height: brickHeight };
        }
    }
}
createBricks();

// Get random color for bricks
function getRandomColor() {
    const colors = ['#FF5733', '#33FF57', '#3357FF', '#FF33FF', '#FFFF33'];
    return colors[Math.floor(Math.random() * colors.length)];
}

// Draw the ball
function drawBall() {
    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
}

// Draw the paddle
function drawPaddle() {
    ctx.beginPath();
    ctx.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
}

// Draw the bricks
function drawBricks() {
    for (let c = 0; c < brickColumnCount; c++) {
        for (let r = 0; r < brickRowCount; r++) {
            if (bricks[c][r].status == 1) {
                const b = bricks[c][r];
                ctx.beginPath();
                ctx.rect(b.x, b.y, b.width, b.height); // Use dynamic brick size
                ctx.fillStyle = b.color;
                ctx.fill();
                ctx.closePath();
            }
        }
    }
}

function movePaddle() {
    if (isLeftPressed && paddleX > 0) {
        paddleX -= 7; // Adjust paddle speed as needed
    }
    if (isRightPressed && paddleX < canvas.width - paddleWidth) {
        paddleX += 7; // Adjust paddle speed as needed
    }
}

// Draw everything
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBricks();
    drawBall();
    drawPaddle();
    collisionDetection();

    // Ball movement
    x += dx;
    y += dy;

    // Ball collision detection
    if (x + dx > canvas.width - ballRadius || x + dx < ballRadius) {
        dx = -dx;
        wallHitSound.play();  // Play sound when hitting the wall
    }
    if (y + dy < ballRadius) {
        dy = -dy;
        wallHitSound.play();  // Play sound when hitting the ceiling
    } else if (y + dy > canvas.height - ballRadius) {
        if (x > paddleX && x < paddleX + paddleWidth) {
            dy = -dy;
            paddleHitSound.play();  // Play sound when hitting the paddle
        } else {
            gameOverSound.play();  // Play sound when ball goes out
            showModal("Level incomplete! Try again.");
            resetLevel();  // Reset current level
            return;  // Exit draw loop until user restarts
        }
    }

    // Paddle movement
    if (rightPressed && paddleX < canvas.width - paddleWidth) {
        paddleX += 7;
    }
    else if (leftPressed && paddleX > 0) {
        paddleX -= 7;
    }

    movePaddle(); // Add this line to the game loop

    // More game rendering logic...
    requestAnimationFrame(draw);
    
}

// Detect collisions between the ball and the bricks
function collisionDetection() {
    for (let c = 0; c < brickColumnCount; c++) {
        for (let r = 0; r < brickRowCount; r++) {
            const b = bricks[c][r];
            if (b.status == 1) {
                if (x > b.x && x < b.x + brickWidth && y > b.y && y < b.y + brickHeight) {
                    dy = -dy;
                    b.status = 0;
                    brickHitSound.play();  // Play sound when a brick is hit
                    if (checkLevelComplete()) {
                        setTimeout(() => { nextLevel(); }, 500);  // Small delay before next level
                    }
                }
            }
        }
    }
}

// Handle key presses
document.addEventListener("keydown", keyDownHandler);
document.addEventListener("keyup", keyUpHandler);

function keyDownHandler(e) {
    if (e.key === "Right" || e.key === "ArrowRight") {
        rightPressed = true;
    }
    else if (e.key === "Left" || e.key === "ArrowLeft") {
        leftPressed = true;
    }
}

function keyUpHandler(e) {
    if (e.key === "Right" || e.key === "ArrowRight") {
        rightPressed = false;
    }
    else if (e.key === "Left" || e.key === "ArrowLeft") {
        leftPressed = false;
    }
}

// Check if the level is complete
function checkLevelComplete() {
    for (let c = 0; c < brickColumnCount; c++) {
        for (let r = 0; r < brickRowCount; r++) {
            if (bricks[c][r].status == 1) {
                return false;
            }
        }
    }
    return true;
}

// Move to the next level
function nextLevel() {
    if (currentLevel < maxLevel) {
        currentLevel++;
        levelUpSound.play();
        adjustBricksForLevel(); // Adjust brick layout and count
        resetBallAndPaddle();
        updateLevelDisplay();  // Update the level display
        draw();
    } else {
        showModal("Congratulations! You've completed all levels.");
        resetGame();
    }
}

// Reset the game
function resetGame() {
    currentLevel = 1;
    brickRowCount = 3;
    brickColumnCount = 5;
    createBricks();
    resetBallAndPaddle();
    updateLevelDisplay();  // Update the level display at game start
    draw();
}

// Reset the level
function resetLevel() {
    createBricks();
    resetBallAndPaddle();
}

// Show modal with a message
function showModal(message) {
    const modal = document.getElementById("gameModal");
    const modalMessage = document.getElementById("modalMessage");
    modalMessage.textContent = message;
    modal.style.display = "block";
}

// Close modal and continue the game
function closeModal() {
    const modal = document.getElementById("gameModal");
    modal.style.display = "none";
    draw();  // Restart the game after closing the modal
}

// Start the game
draw();
