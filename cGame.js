const howToPlay = document.getElementById("howToPlay");
const popUp = document.getElementById("popUp");
const cancel = document.getElementById("cancel");
const startGame = document.getElementById("startGame");
const gameInstructions = document.getElementById("gameInstructions");

howToPlay.addEventListener("click", () => {
  popUp.style.display = "block";
});

cancel.addEventListener("click", () => {
  popUp.style.display = "none";
});

startGame.addEventListener("click", function () {
  gameInstructions.remove();

  const gameScreen = document.createElement("section");
  gameScreen.classList.add("screen");

  gameScreen.innerHTML = `
    <section id="gameContainer" class="game-container">
      <div id="playerStat" class="player-stat">
            <span>Score: <span id="score" data-testid="score">0</span></span>
            <span>High Score: <span id="highScore">0</span></span>
      </div>
      <div id="gameStat" class="game-stat">
        <div id="colorBox" data-testid="colorBox" class="screen"></div>
        <div id="colorOptions" data-testid="colorOption" class="color-buttons"></div>
        <div id="gameStatus data-testid="gameStatus""></div>
        <div id="gameStatus " ></div>
      </div>
      <button type="button" id="newGameButton" data-testid="newGameButton">Start New Game</button>
      <button type="button" id="endGame">End Game</button>
    </section>
  `;

  document.body.appendChild(gameScreen);

  // Get fresh references to elements AFTER adding them to the DOM
  const colorBox = document.getElementById("colorBox");
  const colorOptions = document.getElementById("colorOptions");
  const gameStatus = document.getElementById("gameStatus");
  const scoreElement = document.getElementById("score");
  const highScoreElement = document.getElementById("highScore");
  const newGameButton = document.getElementById("newGameButton");

  let score = 0;
  let highScore = 0;
  let targetColor;

  const colors = [
    "#FF0000",
    "#00FF00",
    "#0000FF",
    "#FFFF00",
    "#FF00FF",
    "#00FFFF",
    "#FFA500",
    "#800080",
    "#008000",
    "#800000",
    "#008080",
    "#000080",
  ];

  function getRandomColor() {
    return colors[Math.floor(Math.random() * colors.length)];
  }

  function updateHighScore() {
    if (score > highScore) {
      highScore = score;
      highScoreElement.textContent = highScore;
    }
  }

  function initGame() {
    // Set target color and display it
    targetColor = getRandomColor();
    colorBox.style.backgroundColor = targetColor;

    // Clear previous options
    colorOptions.innerHTML = "";

    // Generate 6 color options
    const options = [targetColor];
    while (options.length < 6) {
      const randomColor = getRandomColor();
      if (!options.includes(randomColor)) {
        options.push(randomColor);
      }
    }

    // Shuffle options
    options.sort(() => Math.random() - 0.5);

    // Create color buttons
    options.forEach((color) => {
      const button = document.createElement("button");
      button.style.backgroundColor = color;
      button.classList.add("color-button");
      button.addEventListener("click", () => checkGuess(color));
      colorOptions.appendChild(button);
    });

    // Reset game status
    gameStatus.textContent = "";
    gameStatus.style.position = "absolute";
    gameStatus.style.top = "10%";
    gameStatus.style.left = "50%";
    gameStatus.style.transform = "translate(-50%, -50%)";
    gameStatus.style.fontSize = "clamp(16px, 5vw, 40px)";
    gameStatus.style.fontWeight = "600";
    gameStatus.style.textAlign = "center";
  }

  function checkGuess(guess) {
    if (guess === targetColor) {
      gameStatus.textContent = "Correct!";
      gameStatus.style.color = "green";
      score++;
      scoreElement.textContent = score;
      updateHighScore();
      setTimeout(initGame, 1000);
    } else {
      gameStatus.textContent = "Wrong! Try again.";
      gameStatus.style.color = "red";
    }
  }

  // Event listeners
  newGameButton.addEventListener("click", () => {
    score = 0;
    scoreElement.textContent = score;
    initGame();
  });

  document.getElementById("endGame").addEventListener("click", function () {
    location.reload();
  });

  // Start the game
  initGame();
});
