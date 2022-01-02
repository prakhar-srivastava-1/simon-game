// Stores the running game pattern
var gamePattern = [];

// Stores the user entered pattern
var userClickedPattern = [];

// static data - four colours to play with
var buttonColours = ["red", "blue", "green", "yellow"];

// Generate the next colour in sequence
function nextSequence() {
  var randomNumber = Math.floor(Math.random() * 4);

  // select a colour
  var randomChosenColour = buttonColours[randomNumber];

  // add the chosen colour to gamePattern
  gamePattern.push(randomChosenColour);

  // select the chosen colour
  console.log(randomChosenColour);
  $("#"+randomChosenColour).animate({opacity: 0}, 50).animate({opacity: 1}, 50);

  // play sound
  // playSound(randomChosenColour);
}

// start hadnling user clicks
// detect user buttonColour
$(".btn").on("click", function() {
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  console.log(userClickedPattern);
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

$(document).ready(function() {
  nextSequence();
});
