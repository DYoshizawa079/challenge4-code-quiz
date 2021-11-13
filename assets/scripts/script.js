
// Load HTML elements
var elemStartBtn = document.querySelector("#start_quiz"); // The 'Start quiz' button
var elemSecs = document.querySelectorAll("Sec");
var elemSecOpening = document.querySelector("#opening");
var elemSecCurrentQ;

// Set initial value of countdown timer
var timeLeft = 30;

// Show a selected <Sec> element and hide the other <Sec> elements
var showSecs = function (show) { // Parameter accepts an element selector
    for (var i = 0; i < elemSecs.length; i++) {
        elemSecs[i].className = "hidden";
    }
    document.querySelector(show).setAttribute("class","");
}

var checkAnswer = function(event) {
    var btnClass = event.target.getAttribute("class");
    if (btnClass === "true") {
        alert("correct answer");

    } else {
        alert("wrong answer");
    }
}

// Display each quiz question
var showQuestions = function() {

    var questionCounter = 1;
    var elemSecCurrentQName = "section[data-question='" + questionCounter + "']";
    elemSecCurrentQ = document.querySelector(elemSecCurrentQName);
    
    showSecs(elemSecCurrentQName);

    document.querySelector(elemSecCurrentQName).addEventListener('click', checkAnswer);

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
        if (timeLeft === 20) {
            endGame();
        } else {
            showQuestions();
        }
    }, 1000);
}

// End Game function
var endGame = function () {
    clearInterval(runCountdown);
    console.log("Timer expired");

    // Hide all <Sec>, except for the one that displays the current question
    showSecs("#endgame");
}

elemStartBtn.addEventListener('click', runGame);
