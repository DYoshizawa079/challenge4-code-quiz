
// Variables for loading HTML elements
var elemStartBtn = document.querySelector("#start_quiz"); // The 'Start quiz' button
var elemSecs = document.querySelectorAll("section");
var elemSecOpening = document.querySelector("#opening");
var elemSecCurrentQ;
var elemAnswerDisp = document.querySelector("#answer_display");
var elemScoreDisp = document.querySelector("#score");
var elemSubmitBtn = document.querySelector("#score_submit");
var elemRestartBtn = document.querySelector("#restart");
var elemHighScores = document.querySelector("#highscores_list");
var elemViewHighScores = document.querySelector("#view_highscores");

// Counter to show what question is being answered
var questionCounter = 1;

// For recording your score 
var highScores = [];
var yourScore = {
    name: "",
    score: 0
}

// Set initial value of countdown timer
var timeLeft = 30;

// Show a selected <section> element and hide the other <section> elements
var showSecs = function (show) { // Parameter accepts an element selector
    for (var i = 0; i < elemSecs.length; i++) {
        elemSecs[i].className = "hidden";
    }
    document.querySelector(show).setAttribute("class","");
}

// Check whether the player selected the correct answer
var checkAnswer = function(event) {
    var btnClass = event.target.getAttribute("class");
    if (btnClass === "true") {
        elemAnswerDisp.textContent = "Correct";
        setTimeout (function(){
            elemAnswerDisp.textContent = "";
        }, 1000);
        questionCounter++; // To advance him to the next question
    } else {
        elemAnswerDisp.textContent = "Wrong";
        timeLeft = timeLeft - 5; // Penalize player by decreasing time left by 5 seconds
    }
}

// Display each quiz question
var showQuestions = function() {

    var elemSecCurrentQName;
    
    if (questionCounter === 1) {
        elemSecCurrentQName = "section[data-question='" + questionCounter + "']";
        showSecs(elemSecCurrentQName);
        document.querySelector(elemSecCurrentQName).addEventListener('click', checkAnswer);
    } else if (questionCounter === 2) {
        elemSecCurrentQName = "section[data-question='" + questionCounter + "']";
        showSecs(elemSecCurrentQName);
        document.querySelector(elemSecCurrentQName).addEventListener('click', checkAnswer);
    } else if (questionCounter === 3) {
        elemSecCurrentQName = "section[data-question='" + questionCounter + "']";
        showSecs(elemSecCurrentQName);
        document.querySelector(elemSecCurrentQName).addEventListener('click', checkAnswer);
    } else {
        endGame();
    }
    console.log("questionCounter " + questionCounter);

}

// Display scores
var displayScores = function() {

    elemHighScores.innerHTML = "";

    for (var i=0; i < highScores.length; i++) {
        var elemHighScoresItem = document.createElement("li");
        var scoreName = highScores[i].name;
        var scoreScore = highScores[i].score;
        elemHighScoresItem.textContent = scoreName + " - " + scoreScore;
        elemHighScores.appendChild(elemHighScoresItem);
    }

    // Reset the quiz
    elemRestartBtn.addEventListener("click", function() {
        showSecs("#opening");
        timeLeft = 30;
        questionCounter = 1;
    })
}

// Skip to the "View High Scores" panel
var viewHighScores = function() {
    clearInterval(runCountdown);
    console.log("Timer expired");
    getHighScore();
    displayScores();
    showSecs("#highscores");
}

// Run the game until countdown timer hits zero
var runCountdown;
var runGame = function() {

    elemSecOpening.setAttribute("class", "hidden");

    runCountdown = setInterval(function() {
        --timeLeft;
        var timeLeftDisplay = document.querySelector("#time_left");
        timeLeftDisplay.textContent = timeLeft;

        // Run the end game function once timer hits a set value
        if (timeLeft < 20) {
            endGame();
        } else {
            showQuestions();
        }
    }, 1000);
}

// Get existing high score info
var getHighScore = function() {
    highScores = localStorage.getItem("high_scores");
    highScores = JSON.parse(highScores);
}

// Recored your current score
var recordScore = function (event) {
    event.preventDefault();
    console.log(event);
    yourScore.name = document.querySelector("#name").value;
    yourScore.score = timeLeft;
    getHighScore();
    
    if (highScores === null) {
       highScores = [];
    }
    highScores.push(yourScore);
    localStorage.setItem("high_scores", JSON.stringify(highScores));
    console.log(highScores);

    showSecs("#highscores");
    document.querySelector("#name").value = "";

    displayScores();
}

// End Game function
var endGame = function () {
    clearInterval(runCountdown);
    console.log("Timer expired");

    // Hide all <Sec>, except for the one that displays the current question
    showSecs("#endgame");

    elemScoreDisp.textContent = timeLeft;

    elemSubmitBtn.addEventListener("click",recordScore);

    highScores = [];

}

elemStartBtn.addEventListener('click', runGame);
elemViewHighScores.addEventListener('click', viewHighScores);
