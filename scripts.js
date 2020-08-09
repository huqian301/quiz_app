// select all elements
const start = document.getElementById("start");
const quiz = document.getElementById("quiz");
const question = document.getElementById("question");
const qImg = document.getElementById("qImg");
const choiceA = document.getElementById("A");
const choiceB = document.getElementById("B");
const choiceC = document.getElementById("C");
const counter = document.getElementById("counter");
const timeGauge = document.getElementById("timeGauge");
const progress = document.getElementById("progress");
const scoreDiv = document.getElementById("scoreContainer");
const btn = document.getElementById("btn");
const list = document.getElementById("list");


// create our questions
let questions = [
    {
        question: "1. You work on a Javascript project. How do you prompt users with messages and at the same time requesting user inputs?",
        imgSrc: "./Asset/img/js.png",
        choiceA: "Alert()",
        choiceB: "Display()",
        choiceC: "Prompt()",
        correct: "C"
    }, {
        question: "2. Which of the following function of Array object reverses the order of the elements of an array?",
        imgSrc: "./Asset/img/js.png",
        choiceA: "reverse()",
        choiceB: "push()",
        choiceC: "reduce()",
        correct: "A"
    }, {

        question: "3. What statement supplies the value of a function?",
        imgSrc: "./Asset/img/js.png",
        choiceA: "continue",
        choiceB: "return",
        choiceC: "cancel",
        correct: "B"
    }, {
        question: "4. How do you find the number with the highest value of x and y?",
        imgSrc: "./Asset/img/js.png",
        choiceA: "Math.max()",
        choiceB: "top()",
        choiceC: "ceil()",
        correct: "A"
    }, {
        question: "5. Inside which HTML element do we put the JavaScript?",
        imgSrc: "./Asset/img/js.png",
        choiceA: "javascript",
        choiceB: "js",
        choiceC: "script",
        correct: "C"
    }, {
        question: "6. How does a FOR loop start?",
        imgSrc: "./Asset/img/js.png",
        choiceA: "for (i = 0; i <= 5)",
        choiceB: "for (i = 0; i <= 5; i++)",
        choiceC: "for i = 1 to 5",
        correct: "B"
    }, {
        question: "7. How do you create a function in JavaScript?",
        imgSrc: "./Asset/img/js.png",
        choiceA: "function = myFunction()",
        choiceB: "function =>()",
        choiceC: "function myFunction()",
        correct: "C"
    }
];

// create some variables

const lastQuestion = questions.length - 1;
let runningQuestion = 0;


let count = 60;
const questionTime = 60; // 10s
const gaugeWidth = 150; // 150px
const gaugeUnit = gaugeWidth / questionTime;


let TIMER;
let score = 0;

// render a question
function renderQuestion() {
    let q = questions[runningQuestion];

    question.innerHTML = "<p>" + q.question + "</p>";
    qImg.innerHTML = "<img src=" + q.imgSrc + ">";
    choiceA.innerHTML = q.choiceA;
    choiceB.innerHTML = q.choiceB;
    choiceC.innerHTML = q.choiceC;

}

start.addEventListener("click", startQuiz);

// start quiz
function startQuiz() {
    start.style.display = "none";
    renderQuestion();
    quiz.style.display = "block";
    renderProgress();
    renderCounter();
    TIMER = setInterval(renderCounter, 1000); // 1000ms = 1s
}


// render progress
function renderProgress() {
    for (let qIndex = 0; qIndex <= lastQuestion; qIndex++) {
        progress.innerHTML += "<div class='prog' id=" + qIndex + "></div>";
    }
}

// counter render

function renderCounter() {
    if (count > 0) {
        count--;
        counter.innerHTML = count;
        timeGauge.style.width = count * gaugeUnit + "px";
    } else {
        count = 0;
        // change progress color to red
        answerIsWrong();
        if (runningQuestion < lastQuestion) {
            runningQuestion++;
            renderQuestion();
        } else {
            // end the quiz and show the score
            clearInterval(TIMER);
            scoreRender();
        }
    }
}

// checkAnwer

function checkAnswer(answer) {
    if (answer === questions[runningQuestion].correct) {
        // answer is correct
        score++;
        // change progress color to green
        answerIsCorrect();
    } else {
        // answer is wrong
        // change progress color to red
        answerIsWrong();
    }
    if (runningQuestion < lastQuestion && count >= 0) {
        runningQuestion++;
        renderQuestion();
    } else {
        // end the quiz and show the score
        clearInterval(TIMER);
        scoreRender();
    }
}

// answer is correct
function answerIsCorrect() {
    document.getElementById(runningQuestion).style.backgroundColor = "#0f0";
}

// answer is Wrong
function answerIsWrong() {
    document.getElementById(runningQuestion).style.backgroundColor = "#f00";
    count -= 19 // for every question answered wrong, you are ducted 20s;
}

// score render
function scoreRender() {
    scoreDiv.style.display = "block";

    // calculate the amount of question percent answered by the user
    const scorePerCent = Math.round(100 * score / questions.length);

    // choose the image based on the scorePerCent
    let img = (scorePerCent >= 80) ? "./Asset/img/5.png" :
        (scorePerCent >= 60) ? "./Asset/img/4.png" :
            (scorePerCent >= 40) ? "./Asset/img/3.png" :
                (scorePerCent >= 20) ? "./Asset/img/2.png" :
                    "./Asset/img/1.png";


    count = 0;
    let user_name = prompt('Game Finished \n what is your name? ')


    scoreDiv.innerHTML = "<img src=" + img + ">";

    scoreDiv.innerHTML += "<p>" + user_name + "\n" + scorePerCent + "%</p>";


    localStorage.setItem(user_name, JSON.stringify(scorePerCent));


}

btn.addEventListener('click', function (event) {
    event.preventDefault();
    list.innerHTML = "";

    for (let i = 0; i < Object.entries(localStorage).length; i++) {
        const name = Object.entries(localStorage)[i][0];
        const scores = Object.entries(localStorage)[i][1];
        const li = document.createElement("li");
        li.textContent = name + "   " + scores + "%";
        list.appendChild(li);
    }
})
