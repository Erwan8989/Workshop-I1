document.querySelector("form").addEventListener("submit", function (event) {
    event.preventDefault();

    var player1Name = document.getElementById("player1").value;
    var player2Name = document.getElementById("player2").value;

    localStorage.setItem("player1", player1Name);
    localStorage.setItem("player2", player2Name);

    window.location.href = "quizz.html";
});