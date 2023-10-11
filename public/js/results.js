const joueur1 = document.getElementById("player-results1");
const joueur2 = document.getElementById("player-results2");

let player1 = localStorage.getItem("player1") ? localStorage.getItem("player1") : "Joueur 1";
let player2 = localStorage.getItem("player2") ? localStorage.getItem("player2") : "Joueur 2";

let t = localStorage.getItem("questions");
console.log(JSON.parse(t));

joueur1.innerHTML = player1;
joueur2.innerHTML = player2;
