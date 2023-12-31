function isPlayer1winner() {
    if (finalTime1 < finalTime2) {
        return false;
    } else if (finalTime1 === finalTime2) {
        finalTime2 -= 1;
        localStorage.setItem("finalTime2", finalTime2);
        return true;
    } else {
        return true
    }
}

function isFirstLetterVowel(str) {
    return /^[aeiouAEIOU]/.test(str);
}

const joueur1 = document.getElementById("player-results1");
const joueur2 = document.getElementById("player-results2");

const playerTimeResults1 = document.getElementById("player-time-results1");
const playerTimeResults2 = document.getElementById("player-time-results2");

const player1Score = document.getElementsByClassName("player1-score")[0];
const player2Score = document.getElementsByClassName("player2-score")[0];

let finalTime1 = localStorage.getItem("finalTime1");
let finalTime2 = localStorage.getItem("finalTime2");

let namePlayer1 = localStorage.getItem("player1");
let namePlayer2 = localStorage.getItem("player2");

const win = document.getElementsByClassName("win")[0];

if (isPlayer1winner() === true) {
    win.innerHTML = namePlayer1 + " a gagné 🎉";
} else {
    win.innerHTML = namePlayer2 + " a gagné 🎉";
}


function getAnsweredQuestions() {
    const questions = JSON.parse(localStorage.getItem("questions"));
    let answeredQuestions = [];

    for (let i = 0; i < questions.length; i++) {
        if (questions[i]["reponse_donnees"]) {
            answeredQuestions.push(questions[i]);
        } else {
            break;
        }
    }
    return answeredQuestions;
}

function isIntEven(number) {

    number = parseInt(number);

    return number % 2 === 0;
}


function constructQuestionRecap(answeredQuestions) {

    const block = document.getElementById("game-recap");
    var sections = "";

    for (var i = 0; i < answeredQuestions.length; i++) {
        var questionNumber = constructQuestionNumber(i);
        var questionText = '<div class="question-text col-12">' + answeredQuestions[i]["description"] + '</div>';
        var questionExplanation = '<div class="question-explanation col-12">' + answeredQuestions[i]["explication"] + '</div>';

        var questionResponse = constructQuestionButtons(answeredQuestions[i]);

        var questionElement = questionNumber + questionText + questionResponse + questionExplanation;


        if (isIntEven(i)) {
            var questionSection = '<div class="question-section row">' + questionElement + '</div>';
        } else {
            var questionSection = '<div class="question-section row">' + questionElement + '</div>';
        }

        sections += questionSection
    }
    block.innerHTML = sections;
}


function constructQuestionNumber(i) {
    let number = 1 + i;
    if (isIntEven(i)) {
        var questionNumber = '<div class="question-number red">Question ' + number + '</div>';
    } else {
        var questionNumber = '<div class="question-number blue">Question ' + number + '</div>';
    }

    return questionNumber;
}

function constructQuestionButtons(question) {
    var buttons = "";

    //console.log(question["reponses"]);


    for (var i = 0; i < question["reponses"].length; i++) {
        if (question["reponses"][i] === question["bonne_reponse"]) {
            buttons += '<button class="btn btn-success mr-3" type="button">' + question["reponses"][i] + '</button>';
        } else if (question["reponses"][i] === question["reponse_donnees"]) {
            buttons += '<button class="btn btn-danger mr-3" type="button">' + question["reponses"][i] + '</button>';
        } else {
            buttons += '<button class="btn btn-info mr-3" type="button">' + question["reponses"][i] + '</button>'
        }
    }

    var questionResponses = '<div class="question-response mx-auto">' + buttons + '</div>';

    return questionResponses;
}

function getUsersGoodAnswerRate(answeredQuestions){
    var userRates = [];
    var goodAns1 = 0;
    var ans1 = 0;

    var goodAns2 = 0;
    var ans2 = 0;

    console.log("tetetet");



    for(var i = 0; i < answeredQuestions.length; i++){
        if(answeredQuestions[i]["bonne_reponse"] === answeredQuestions[i]["reponse_donnees"]) {
            if(isIntEven(i)){
                goodAns2++;
            }
            else{
                goodAns1++;
            }
        }

        if(isIntEven(i)){
            ans2++;
        }
        else{
            ans1++;
        }

    }

   var user1rate = parseInt((goodAns1 / ans1 ) * 100);
   var user2rate = parseInt((goodAns2 / ans2) * 100);

   console.log(user1rate);
   console.log(user2rate);

    const player1rate = document.getElementById("player1-rate");
    player1rate.textContent = user2rate + "%";

    const player2rate = document.getElementById("player2-rate");
    player2rate.textContent = user1rate + "%";
    //(nombre de bonne / nombre total) * 10
}

function questionObjectReorder(question) {

    var responses = [];

    responses.push(question["bonne_reponse"]);
    responses.push(question["reponse_2"]);
    delete question["reponse_2"];

    if (question["reponse_3"]) {
        responses.push(question["reponse_3"]);
        delete question["reponse_3"];
    }
    
    if (question["reponse_4"]) {
        responses.push(question["reponse_4"]);
        delete question["reponse_4"];
    }

    question["reponses"] = responses;

    return question;
}

function reorderQuestionsArray(array) {
    var reorderedQuestions = [];

    for (var i = 0; i < array.length; i++) {
        reorderedQuestions[i] = questionObjectReorder(array[i]);
    }

    return reorderedQuestions;
}

joueur1.innerHTML = namePlayer1;
joueur2.innerHTML = namePlayer2;

playerTimeResults1.innerHTML = timer1.formatTime(finalTime1);
playerTimeResults2.innerHTML = timer2.formatTime(finalTime2);

player1Score.innerHTML = isFirstLetterVowel(namePlayer1) ? "Score d'" + namePlayer1 : "Score de " + namePlayer1;
player2Score.innerHTML = isFirstLetterVowel(namePlayer2) ? "Score d' " + namePlayer2 : "Score de " + namePlayer2;


var answeredQuestions = getAnsweredQuestions()


answeredQuestions = reorderQuestionsArray(answeredQuestions);

constructQuestionRecap(answeredQuestions);

getUsersGoodAnswerRate(answeredQuestions);
