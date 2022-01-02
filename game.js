// Globals
// level - tracks level; -1 => game not started or is over
var level = -1;
// moveTracker - keeps track of gamePattern array for comparisons
var moveTracker = 0;

// Stores the running game pattern
var gamePattern = [];

// Stores the user entered pattern
var userClickedPattern = [];

// static data - four colours to play with
var buttonColours = ["red", "blue", "green", "yellow"];

// Generate the next colour in sequence
function nextSequence() {
  // paint the level
  $("#level-title").text("Level " + level);

  // select a random colour
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  // add the chosen colour to gamePattern
  gamePattern.push(randomChosenColour);
  // animate the chosen colour
  $("#" + randomChosenColour).animate({opacity: 0}, 70).animate({opacity: 1}, 70);

  // play sound
  playSound(randomChosenColour);

  // increase the level for next round - subjected to correct guess
  level++;
}

// start handling user clicks
// detect user buttonColour
$(".btn").on("click", function() {
  // if game is running
  if(level != -1) {
    // get user chosen colour
    var userChosenColour = $(this).attr("id");

    // play sound and animate colour clicked
    playSound(userChosenColour);
    animatePress(userChosenColour);

    // check if user broke the gamePattern
    if(gamePattern[moveTracker] !== userChosenColour) {
      // Game over
      gameOver();
    }
    else {
      moveTracker++;
      // moveTracker == gamePattern length => all colours guessed corectly
      if (moveTracker === gamePattern.length) {
        // stop taking inputs
        // pattern successfully guessed
        // reset moveTracker to the beginning of gamePattern array
        moveTracker = 0;
        // get next round
        nextSequence();
      }
    }
  }
});

// function takes name of the colour as input and plays the corresponding sound
function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

// Animate user clicks
function animatePress(currentColour) {
  $("#" + currentColour).addClass("pressed");
  // add a 100 ms timeout
  setTimeout(function () {
    $("#" + currentColour).removeClass("pressed");
  }, 100);
}

// Start the game..
$(document).keydown(function() {
  var headText = $("#level-title").text();
  if (headText == "Press A Key to Start" ||
      headText == "Game Over, Press Any Key to Restart") {
    level = 0;
    nextSequence();
  }
});

// Game Over function
// updates the page with Game over style and
// reset all variables
function gameOver() {
  playSound("wrong");
  $("body").addClass("game-over");
  setTimeout(function() {
      $("body").removeClass("game-over");
    },
    200);
  $("#level-title").text("Game Over, Press Any Key to Restart");
  level = -1;
  moveTracker = 0;
  gamePattern = [];
}
