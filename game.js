var buttonColours = ["red", "blue", "green", "yellow"];

var userClickedPattern = [];

var gamePattern = [];

var started = false;

var level = 0;

$(document).on("keypress", function() {
  if (!started){
    $("#level-title").text("Level " + level);
    nextSequence();
    started=true;
  }

});

$(".btn").on("click", function(event) {
  var userChosenColour = event.target.id;
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length - 1);
});

function nextSequence() {
userClickedPattern=[];
  level++;
  $("#level-title").text("Level " + level);

  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour).fadeOut(150).fadeIn(150);
  playSound(randomChosenColour);

};

function playSound(name) {

  var sound = new Audio('sounds/' + name + '.mp3');
  sound.play();

};


function animatePress(currentColour) {
  $("#" + currentColour).addClass("pressed");
  setTimeout(function() {
    $("#" + currentColour).removeClass("pressed");
  }, 100);
};

function checkAnswer(currentLevel) {

  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
    if (userClickedPattern.length===gamePattern.length) {

      setTimeout(function(){
        nextSequence();
      },1000);

    }

  } else {
    console.log("wrong!");
    var sound = new Audio('sounds/wrong.mp3');
      sound.play();
      $("body").addClass("game-over");
      setTimeout(function(){
        $("body").removeClass("game-over");
      },200);
      $("#level-title").text("Game Over, Press Any Key to Restart ");
      startOver();
  }
};

function startOver() {
  level=0;
  gamePattern=[];
  started=false;
};
