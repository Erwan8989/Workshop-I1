function displayQuestion(){

}

async function getQuestion() {
    const url = "http://workshop.com/private/get_question.php";

    const http = new XMLHttpRequest();
    http.open("GET", url, true);

    return new Promise((resolve, reject) => {
        http.onload = () => {
            var questions = JSON.parse(atob(http.response));
            localStorage.setItem("questions", JSON.stringify(questions.response));
            resolve(); // Résoudre la promesse une fois que les données sont prêtes
        }

        http.onerror = () => {
            reject(new Error("Erreur lors de la requête")); // Rejeter la promesse en cas d'erreur
        }

        http.send();
    });
}
