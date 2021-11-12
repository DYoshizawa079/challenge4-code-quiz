console.log("Script loaded");

// Load HTML elements
var elemStartBtn = document.querySelector("#start_quiz"); // The 'Start quiz' button
var elemSections = document.querySelectorAll("section");
var elemSectionOpening = document.querySelector("#opening");

// Set initial value of countdown timer
var timeLeft = 30;

// Show a selected <section> element and hide the other <section> elements
var showSections = function (show) { // Parameter accepts an element selector
    for (var i = 0; i < elemSections.length; i++) {
        elemSections[i].className = "hidden";
    }
    document.querySelector(show).setAttribute("class","");
    console.dir(elemSections[0]);
}

// Display each quiz question
var showQuestions = function() {

    var questionCounter = 1;
    var elemSectionCurrentQ = "section[data-question='" + questionCounter + "']";
    showSections(elemSectionCurrentQ);

    //elemSections[questionCounter].addEventListener('click', alert('asf'));

}

// Run the game until countdown timer hits zero
var runCountdown;
var runGame = function() {

    elemSectionOpening.setAttribute("class", "hidden");
    //console.log(elemSectionOpening);

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

    // Hide all <section>, except for the one that displays the current question
    showSections("#endgame");
}

elemStartBtn.addEventListener('click', runGame);

