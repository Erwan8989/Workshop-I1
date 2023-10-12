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


function getAnsweredQuestions(){
    const questions = JSON.parse(localStorage.getItem("questions"));
    let answeredQuestions = [];

    console.log(questions);
    
    for(let i = 0;  i < questions.length; i++) {
        console.log(questions[i]["reponse_donnees"]);
        if(questions[i]["reponse_donnees"]){
            break;
        } else{
             answeredQuestions.push(questions[i]);
        }
    }
    return answeredQuestions;
}

console.log("ttt");


joueur1.innerHTML = namePlayer1;
joueur2.innerHTML = namePlayer2;

playerTimeResults1.innerHTML = timer1.formatTime(finalTime1);
playerTimeResults2.innerHTML = timer2.formatTime(finalTime2);

player1Score.innerHTML = isFirstLetterVowel(namePlayer1) ? "Score d'" + namePlayer1 : "Score de " + namePlayer1;
player2Score.innerHTML = isFirstLetterVowel(namePlayer2) ? "Score d' " + namePlayer2 : "Score de " + namePlayer2;


const answeredQuestions = getAnsweredQuestions()

console.log("outside");
console.log(answeredQuestions);
