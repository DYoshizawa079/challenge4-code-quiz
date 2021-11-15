// Variables for HTML elements
var elemSecs = document.querySelectorAll("section");
var elemAnswerDisp = document.querySelector("#answer_display");
var elemHighScores = document.querySelector("#highscores_list");
var elemSecQuestions = document.querySelectorAll(".question");

// Set initial value of countdown timer
var initialCountdownValue = 60;
// Used to display the actual time left for the player
var timeLeft = initialCountdownValue;

// Counter to tell the browser what question to display
var questionCounter = 1;

// For recording your score 
var highScores = [];
var yourScore = {
    name: "",
    score: 0
}

///////////////////////////////// FUNCTIONS /////////////////////////////////

// Show a selected <section> element and hide the other <section> elements
var showSection = function (show) { // Parameter accepts an element selector
    for (var i = 0; i < elemSecs.length; i++) {
        elemSecs[i].setAttribute("data-visibility","hidden");
    }
    document.querySelector(show).setAttribute("data-visibility","");
}

// Check whether the player selected the correct answer
var checkAnswer = function(event) {
    var btnClass = event.target.getAttribute("class");
    if (btnClass === "true") { // Buttons for the correct answer have a CSS class called "true"
        elemAnswerDisp.textContent = "Correct";
        setTimeout (function(){
            elemAnswerDisp.textContent = "";
        }, 1000);
        questionCounter++; // To advance him to the next question
    } else {
        elemAnswerDisp.textContent = "Wrong";
        timeLeft = timeLeft - 10; // Penalize player by decreasing time left by 10 seconds
    }
}

// Display the quiz questions
var showQuestionPages = function() {

    // Show the appropriate quiz question/page
    var showQuestion = function(question) {
        var elemSecCurrentQName = "section[data-question='" + question + "']";
        showSection(elemSecCurrentQName);
        document.querySelector(elemSecCurrentQName).addEventListener('click', checkAnswer);
    }

    if (questionCounter <= elemSecQuestions.length) {
        showQuestion(questionCounter);
    } else {
        endGame();
    }

}

// Display high scores and reset the quiz if needed
var displayScores = function() {

    elemHighScores.innerHTML = "";

    // Display the high scores that were extracted from localStorage
    if (highScores !== null) {
        for (var i=0; i < highScores.length; i++) {
            var elemHighScoresItem = document.createElement("li");
            var scoreName = highScores[i].name;
            var scoreScore = highScores[i].score;
            elemHighScoresItem.textContent = scoreName + " - " + scoreScore;
            elemHighScores.appendChild(elemHighScoresItem);
        }
    }

    // Provide ability to reset the quiz
    document.querySelector("#restart").addEventListener("click", function() {
        showSection("#opening");
        timeLeft = initialCountdownValue;
        questionCounter = 1;
    })
}

// Skip to the "View High Scores" panel
var viewHighScores = function() {
    clearInterval(runCountdown);
    getHighScore();
    displayScores();
    showSection("#highscores");
}

// Run the game until countdown timer hits zero
var runCountdown;
var runGame = function() {

    //Start running the countdown timer
    runCountdown = setInterval(function() {
        --timeLeft;
        var timeLeftDisplay = document.querySelector("#time_left");
        timeLeftDisplay.textContent = timeLeft;

        // Run the end game function once timer hits a set value
        if (timeLeft <= 0) {
            endGame();
        } else {
            showQuestionPages();
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
    yourScore.name = document.querySelector("#name").value;
    yourScore.score = timeLeft;
    getHighScore();
    
    // Write high scores to localStorage
    if (highScores === null) {
       highScores = [];
    }
    highScores.push(yourScore);
    localStorage.setItem("high_scores", JSON.stringify(highScores));

    showSection("#highscores");
    document.querySelector("#name").value = "";
    displayScores();
}

// End Game function. Get user's initials and record his score if he requests it.
var endGame = function () {
    clearInterval(runCountdown);

    // Hide all <section>, except for the one that displays the current question
    showSection("#endgame");

    document.querySelector("#score").textContent = timeLeft;
    document.querySelector("#score_submit").addEventListener("click",recordScore);
    highScores = []; // It seems that failing to have this causes high score displays to duplicate
}

// Clear the 'High Scores' List
var clearHighScores = function(){
    localStorage.removeItem("high_scores");
    elemHighScores.innerHTML = "";
}

///////////////////////////////// EXECUTION STARTS HERE /////////////////////////////////

document.querySelector("#start_quiz").addEventListener('click', runGame);
document.querySelector("#view_highscores").addEventListener('click', viewHighScores);
document.querySelector("#clear_scores").addEventListener('click', clearHighScores);
