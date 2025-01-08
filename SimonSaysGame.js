const buttons = ["red", "green", "blue", "yellow"];
const simonSequence = []; // To store the Simon sequence
let playerSequence = []; // To store the player sequence
const statusText = document.getElementById("status");
const startButton = document.getElementById("start-btn");

// Flash a button
function flashButton(color) {
  const button = document.getElementById(color);
  button.classList.add("flash"); // Add a flashing effect
  setTimeout(() => button.classList.remove("flash"), 500); // Remove it after 500ms
}

// Play the sequence
function playSequence() {
  simonSequence.forEach((color, index) => {
    setTimeout(() => {
      flashButton(color);
    }, (index + 1) * 1000);
  });

  // Tell the player it's their turn after the sequence
  setTimeout(() => {
    statusText.textContent = "Your Turn!";
  }, simonSequence.length * 1000 + 500);
}

// Add a random color to the sequence
function addToSequence() {
  const randomColor = buttons[Math.floor(Math.random() * buttons.length)];
  simonSequence.push(randomColor)
}

//check the players' sequence against Simon
function checkPlayerSequence() {
  const currentIndex = playerSequence.length - 1;

  if(playerSequence[currentIndex] !== simonSequence[currentIndex]) {
    statusText.textContent = "Game Over! You Lost!";
    resetGame();
    return;
  }

  //If the player matches the sequence , check if the sequence is complete
  if(playerSequence.length === simonSequence.length){
    statusText.textContent = "Good Job! Next Round";
    playerSequence = [];
    setTimeout(() => {
      addToSequence();
      playSequence();
    },1000);
  }

}

//Reset the game
function resetGame() {
  simonSequence.length = 0;
  playerSequence = [];
  startButton.disabled = false; // enable the button click
}


// Start the game
startButton.addEventListener("click", () => {
  // Reset sequence and status
  simonSequence.length = 0;
  statusText.textContent = "Watch the sequence!";
  
  // Add the first color to the sequence and play
  addToSequence();
  playSequence();
});

//Handle button clicks for the players' turn 
buttons.forEach(color => {
  const button = document.getElementById(color);
  button.addEventListener("click", ()=> {
    if(simonSequence.length > 0 && statusText.textContent === "Your Turn!") {
      playerSequence.push(color);
      flashButton(color);
      checkPlayerSequence();  
      }
  });
});