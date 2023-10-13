async function getQuestion() {
    const url = "https://harasstic.000webhostapp.com/private/get_question.php";

    const http = new XMLHttpRequest();
    http.open("GET", url, true);

    return new Promise((resolve, reject) => {
        http.onload = () => {
            var questions = JSON.parse(http.response);
            localStorage.setItem("questions", JSON.stringify(questions.response));
            resolve(); // Résoudre la promesse une fois que les données sont prêtes
        }

        http.onerror = () => {
            reject(new Error("Erreur lors de la requête")); // Rejeter la promesse en cas d'erreur
        }

        http.send();
    });
}
