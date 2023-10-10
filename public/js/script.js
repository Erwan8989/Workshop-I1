function displayQuestion(){

}

function getQuestion(){

    const url = "http://workshop.com/private/get_question.php";

    const http = new XMLHttpRequest();
    http.open("GET", url, true);
    //http.setRequestHeader("Content-Type");
    http.onload = () => {
        var questions = JSON.parse(atob(http.response));
        console.log(questions.response);
        localStorage.setItem("questions", questions.response);  
    }

    http.send();
} 


const btntest = document.getElementById("test");
btntest.addEventListener("click", function(){
    console.log("wrking");
    getQuestion();
});