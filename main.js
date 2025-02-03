 // The Game state
 let score = 0;
 let targetColor = '';
 let colors = [];

 // Our DOM elements
 const colorBox = document.querySelector('[data-testid="colorBox"]');
 const optionsContainer = document.querySelector('.options-container');
 const gameStatus = document.querySelector('[data-testid="gameStatus"]');
 const scoreElement = document.querySelector('[data-testid="score"]');
 const newGameButton = document.querySelector('[data-testid="newGameButton"]');

 // To Generate the random color
 function generateRandomColor() {
     const r = Math.floor(Math.random() * 256);
     const g = Math.floor(Math.random() * 256);
     const b = Math.floor(Math.random() * 256);
     return `rgb(${r}, ${g}, ${b})`;
 }

 // To Generate array of colors including target color
 function generateColors() {
     const colors = [];
     // Generate target color
     const targetColor = generateRandomColor();
     colors.push(targetColor);
     
     // Generate 5 more random colors
     while (colors.length < 6) {
         const newColor = generateRandomColor();
         if (!colors.includes(newColor)) {
             colors.push(newColor);
         }
     }
     
     // Our Shuffle array
     return {
         targetColor,
         options: colors.sort(() => Math.random() - 0.5)
     };
 }

 // To Handle the color guess
 function handleGuess(color) {
     if (color === targetColor) {
         score++;
         scoreElement.textContent = score;
         gameStatus.textContent = "Correct! Well done! 🎉";
         gameStatus.className = "game-status correct";
         setTimeout(startNewGame, 1000);
     } else {
         gameStatus.textContent = "Wrong guess! Try again! 😅";
         gameStatus.className = "game-status wrong";
     }
 }

 // To Create color options
 function createColorOptions() {
     optionsContainer.innerHTML = '';
     colors.forEach(color => {
         const button = document.createElement('button');
         button.className = 'color-option';
         button.setAttribute('data-testid', 'colorOption');
         button.style.backgroundColor = color;
         button.onclick = () => handleGuess(color);
         optionsContainer.appendChild(button);
     });
 }

 // To Start new game
 function startNewGame() {
     const colorData = generateColors();
     targetColor = colorData.targetColor;
     colors = colorData.options;
     
     colorBox.style.backgroundColor = targetColor;
     gameStatus.textContent = '';
     gameStatus.className = 'game-status';
     
     createColorOptions();
 }

 // Our Event listeners
 newGameButton.addEventListener('click', () => {
     score = 0;
     scoreElement.textContent = score;
     startNewGame();
 });

 // Initialize game
 startNewGame();