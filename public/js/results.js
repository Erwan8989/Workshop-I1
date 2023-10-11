function getAsweredQuestions(){
    let questions = JSON.parse(localStorage.getItem("Questions"));
}

const winner = document.getElementById("winner");
winner.addEventListener("click", getAsweredQuestions());