// Fonction principale pour initialiser les questions
function main() {
    getQuestion();

    var localStorageQuestions = localStorage.getItem("questions");
    return JSON.parse(localStorageQuestions);
}

// Fonction pour afficher une seule question
function getOneQuestion(questions, ii) {
    if (i === 12) {
        finish();
    }

    let bonneReponse = null;
    let reponses = [];

    console.log(questions)

    questionText.innerHTML = questions[ii]['description'];

    bonneReponse = questions[ii]['bonne_reponse'];
    reponses.push(bonneReponse);

    if (questions[ii]['reponse_2'] != null) {
        reponses.push(questions[ii]['reponse_2']);
    }

    if (questions[ii]['reponse_3'] != null) {
        reponses.push(questions[ii]['reponse_3']);
    }

    if (questions[ii]['reponse_4'] != null) {
        reponses.push(questions[ii]['reponse_4']);
    }

    for (let i = reponses.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [reponses[i], reponses[j]] = [reponses[j], reponses[i]];
    }

    let container = document.getElementsByClassName("response-block")[0];
    container.innerHTML = "";

    for (let j = 0; j < reponses.length; j++) {
        let newDiv = document.createElement("div");
        newDiv.className = "col";

        let newButton = document.createElement("button");
        newButton.type = "button";
        newButton.className = "btn mb-2 response" + j;
        newButton.textContent = reponses[j];

        newButton.addEventListener("click", function () {
            questions[ii]['reponse_donnees'] = reponses[j];

            let allButtons = document.querySelectorAll('.response-block button');
            allButtons.forEach(button => button.disabled = true);

            if (reponses[j] === bonneReponse) {
                if (playerName === "player1") {
                    timer1.addTime(1000);
                    joueur1Add.style.display = "flex";
                    chronoPlayer1.style.color = "green";
                } else {
                    timer2.addTime(1000);
                    joueur2Add.style.display = "flex";
                    chronoPlayer2.style.color = "green";
                }

                newButton.style.backgroundColor = "green";
                newButton.classList.add("ok");
            } else {
                if (playerName === "player1") {
                    timer1.removeTime(1000);
                    joueur1Remove.style.display = "flex";
                    chronoPlayer1.style.color = "red";
                } else {
                    timer2.removeTime(1000);
                    joueur2Remove.style.display = "flex";
                    chronoPlayer2.style.color = "red";
                }

                newButton.style.backgroundColor = "red";
                newButton.classList.add("nok");

                let correctButton = Array.from(allButtons).find(button => button.textContent === bonneReponse);
                correctButton.style.backgroundColor = "green";
                correctButton.classList.add("ok");
            }

            if (playerName === "player1") {
                timer1.stop();
            } else {
                timer2.stop();
            }

            setTimeout(function () {
                if (playerName === "player1") {
                    player2Round()
                    chronoPlayer1.style.color = "black";
                } else {
                    player1Round();
                    chronoPlayer2.style.color = "black";
                }

                joueur1Remove.style.display = "none";
                joueur2Remove.style.display = "none";
                joueur1Add.style.display = "none";
                joueur2Add.style.display = "none";

                i++;
                getOneQuestion(questions, i);
            }, 2500);
        });

        newDiv.appendChild(newButton);
        container.appendChild(newDiv);
    }
}

function finish() {
    localStorage.setItem("questions", JSON.stringify(questions));
    window.location.href = "results.html";
}

// Fonction pour démarrer le jeu
function start() {
    btn_start.style.display = "none";

    var counterElement = document.getElementById("counter");
    counterElement.style.display = "block";
    counterElement.style.backgroundColor = "white";
    counterElement.style.fontSize = "30px";
    counterElement.style.fontWeight = "bold";
    var counterValue = 3;

    counterElement.innerText = counterValue;

    var interval = setInterval(function () {
        counterValue--;

        if (counterValue === 0) {
            counterElement.style.color = "green";
            counterElement.innerText = "C'est parti !";
        } else if (counterValue > 0) {
            counterElement.innerText = counterValue;
        } else {
            clearInterval(interval);
            counterElement.style.display = "none";
            player1Round();
            getOneQuestion(questions, i);
        }
    }, 1000);
}


// Fonction pour le tour du joueur 1
function player1Round() {
    responseBlock.style.display = "flex";
    player1.style.opacity = "1";
    player2.style.opacity = "0.25";
    cardQuizzQuestion.style.display = "block";
    cardQuizzQuestion.style.borderColor = "#16c9c9";
    playerName = "player1";
    timer1.start();
}

// Fonction pour le tour du joueur 2
function player2Round() {
    responseBlock.style.display = "flex";
    player1.style.opacity = "0.25";
    player2.style.opacity = "1";
    cardQuizzQuestion.style.display = "block";
    cardQuizzQuestion.style.borderColor = "#ef2929";
    playerName = "player2";
    timer2.start();
}


/********* QUIZZZ PAGE   **********/
let i = 0;
let questions = main();
let playerName = null;

let chronoPlayer1 = document.getElementById("chrono-player1");
let chronoPlayer2 = document.getElementById("chrono-player2");

let joueur1Add = document.getElementById("joueur1-add");
let joueur2Add = document.getElementById("joueur2-add");
let joueur1Remove = document.getElementById("joueur1-remove");
let joueur2Remove = document.getElementById("joueur2-remove");

let timer1 = new Timer(6000, "chrono-player1");
let timer2 = new Timer(6000, "chrono-player2");

timer1.updateTimer();
timer2.updateTimer();

const playerName1 = localStorage.getItem("player1") ? localStorage.getItem("player1") : "Joueur 1";
const playerName2 = localStorage.getItem("player2") ? localStorage.getItem("player2") : "Joueur 2";
document.getElementById("player-results-quizz1").innerHTML = playerName1;
document.getElementById("player-results-quizz2").innerHTML = playerName2;


let questionText = document.getElementById("question-text");

var btn_start = document.getElementById("btn-start");
btn_start.addEventListener("click", start);

var player1 = document.getElementsByClassName("col1")[0];
var player2 = document.getElementsByClassName("col2")[0];
var cardQuizzQuestion = document.getElementsByClassName("card-quizz-question")[0];
var responseBlock = document.getElementsByClassName("response-block")[0];

setInterval(function () {
    if (timer1.getCountdownDuration() === 0) {
        chronoPlayer1.style.color = "red";
        setInterval(function () {
            finish();
        }, 2000)
    }

    if (timer2.getCountdownDuration() === 0) {
        chronoPlayer2.style.color = "red";
        setInterval(function () {
            finish();
        }, 2000)
    }
}, 10);




function isPlayer1winner() {
    let text = null;

    if (timer1.getCountdownDuration() < timer2.getCountdownDuration()) {
        return false;
    } else if (timer1.getCountdownDuration() === timer2.getCountdownDuration) {
        timer1.setCountdownDuration(timer2.getCountdownDuration() + 1);
        text = namePlayer1;
    } else {
        text = namePlayer2
    }

    win.innerHTML = text + " a gagné 🎉";

    return true;
}

const joueur1 = document.getElementById("player-results1");
const joueur2 = document.getElementById("player-results2");

const win = document.getElementsByClassName("win")[0];

let namePlayer1 = localStorage.getItem("player1") ? localStorage.getItem("player1") : "Joueur 1";
let namePlayer2 = localStorage.getItem("player2") ? localStorage.getItem("player2") : "Joueur 2";

isPlayer1winner();
joueur1.innerHTML = namePlayer1;
joueur2.innerHTML = namePlayer2;