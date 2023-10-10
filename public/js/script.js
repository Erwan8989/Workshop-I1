function displayQuestion(){

}

function getQuestion(){

    const url = "http://workshop.com/private/get_question.php";

    const http = new XMLHttpRequest();
    http.open("GET", url, true);
    //http.setRequestHeader("Content-Type");
    http.onload = () => {
        console.log(JSON.parse(atob(http.response)));
        
    }

    http.send();
} 


getQuestion();


const btntest = document.getElementById("test");
btntest.addEventListener("click", function(){
    console.log("wrking");
    getQuestion();
});