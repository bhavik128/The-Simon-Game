const buttonColours = ["red", "blue", "green", "yellow"];
let gamePattern = [];
let userClickedPattern = [];
let count = 0;
let level = 0;
let gameStarted = false;

//Event listener to handle click.
$(document).click(function (e) {
    if(!gameStarted) return;
    const userChosenColour = e.target.id;
    if(userChosenColour !== "") {
        count++;
        animatePress(userChosenColour);
        userClickedPattern.push(userChosenColour);
        if(gamePattern[count-1] !== userClickedPattern[count-1]) {
            gameOver();
            return;
        }
        playSound(userChosenColour);
        if(count === level) {
            userClickedPattern = [];
            setTimeout(nextSequence, 1250);
            count=0;
        }
    }
})

//Starting game for the first time.
$(document).on("keypress",function() {
    if (!gameStarted) {
        gameStarted = true;
        nextSequence();
    }
});

//Generating next sequence randomly.
function nextSequence() {
    if(!gameStarted) return;
    const randomNumber = Math.floor(Math.random() * 4);
    const randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    $("#" + randomChosenColour).fadeIn(200).fadeOut(200).fadeIn(200);
    playSound(randomChosenColour);
    level++;
    $("#level-title").text("Level "+level);
}

//Function to play sound.
function playSound(name) {
    const audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

//Function to animate when button pressed.
function animatePress(currentColour) {
    const id = "#"+currentColour;
    $(id).addClass("pressed");
    setTimeout(function () {$(id).removeClass("pressed");},90);
}

//To add game over effect and animation.
function gameOver() {
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(function () {$("body").removeClass("game-over");},200);
    $("#level-title").text("Game Over, Press Any Key to Restart");
    startOver();
}

//To start the game again.
function startOver() {
    gamePattern = [];
    userClickedPattern = [];
    count = 0;
    level = 0;
    gameStarted = false;
}
