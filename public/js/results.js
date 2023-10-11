function isPlayer1winner(){
    if(timer1.getCountdownDuration() < timer2.getCountdownDuration()){
        return false
    } else if (timer1.getCountdownDuration() == timer2.getCountdownDuration){
        timer1.setCountdownDuration(timer2.getCountdownDuration() + 1);
        return true;
    }
    else{
        return true;
    }
}

const questions = localStorage.getItem('questions');

const joueur1 = document.getElementById("player-results1");
const joueur2 = document.getElementById("player-results2");

let namePlayer1 = localStorage.getItem("player1") ? localStorage.getItem("player1") : "Joueur 1";
let namePlayer2 = localStorage.getItem("player2") ? localStorage.getItem("player2") : "Joueur 2";

let t = localStorage.getItem("questions");

joueur1.innerHTML = namePlayer1;
joueur2.innerHTML = namePlayer2;