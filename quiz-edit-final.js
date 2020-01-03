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
const song= document.getElementById("song");
// create our questions
let questions = [
    {
        question : "in which country pyramids are located",
        imgSrc : "egypt.jpg",
        choiceA : "Egypt",
        choiceB : "Sudan",
        choiceC : "lebanon",
        correct : "A"
    },{  
        question : "look like in Euorpe! ",
        imgSrc : "london.jpg",
        choiceA : "Germany",
        choiceB : "England",
        choiceC : "switzerland",
        correct : "B"
    },{
        question : "guess where!",
        imgSrc : "milan(italy).jpg",
        choiceA : "Greece",
        choiceB : "Italy",
        choiceC : "Sweden",
        correct : "B"
    },{
        question : "how many years can penguin live?",
        imgSrc : "baby-penguins.jpg",
        choiceA : "up to 20",
        choiceB : "up to 25",
        choiceC : "up to 30",
        correct : "C"
    },{
        question : " mmmm!",
        imgSrc : "germany(tubingen).jpg",
        choiceA : "Germany",
        choiceB : "United states",
        choiceC : "Kanda",
        correct : "A"
    },{
        question : "in which country?",
        imgSrc : "taj-mahel.jpg",
        choiceA : "Jordan",
        choiceB : "Turky",
        choiceC : "India",
        correct : "C"
    },{
        question : "In which year did princess Diana die? " ,
        imgSrc : "diana.jpg",
        choiceA : "1955",
        choiceB : "1997",
        choiceC : "1999",
        correct : "B"
    },{
        question : "Which city has the best coffee in the world?",
        imgSrc : "coffee.jpg",
        choiceA : "london",
        choiceB : "New Zealand",
        choiceC : "Vienna",
        correct : "A"
    }
];

// create some variables

const lastQuestion = questions.length - 1;
let runningQuestion = 0;
let count = 0;
const questionTime = 10; // 10s
const gaugeWidth = 150; // 150px
const gaugeUnit = gaugeWidth / questionTime;
let TIMER;
let score = 0;

// render a question
function renderQuestion(){
    let q = questions[runningQuestion];
    
    question.innerHTML = "<p>"+ q.question +"</p>";
    qImg.innerHTML = "<img src="+ q.imgSrc +">";
    choiceA.innerHTML = q.choiceA;
    choiceB.innerHTML = q.choiceB;
    choiceC.innerHTML = q.choiceC;
}

start.addEventListener("click",startQuiz);

// start quiz
function startQuiz(){
    start.style.display = "none";
    renderQuestion();
    quiz.style.display = "block";
    renderProgress();
    renderCounter();
    TIMER = setInterval(renderCounter,1000); // 1000ms = 1s
}

// render progress
function renderProgress(){
    for(let qIndex = 0; qIndex <= lastQuestion; qIndex++){
        progress.innerHTML += "<div class='prog' id="+ qIndex +"></div>";
    }
}

// counter render

function renderCounter(){
    if(count <= questionTime){
        counter.innerHTML = count;
        timeGauge.style.width = count * gaugeUnit + "px";
        count++
    }else{
        count = 0;
        // change progress color to red
        answerIsWrong();
        if(runningQuestion < lastQuestion){
            runningQuestion++;
            renderQuestion();
        }else{
            // end the quiz and show the score
            clearInterval(TIMER);
            scoreRender();
        }
    }
}

// checkAnwer

function checkAnswer(answer){
    if( answer == questions[runningQuestion].correct){
        // answer is correct
        score++;
        // change progress color to green
        answerIsCorrect();
        
    }else{
        // answer is wrong
        // change progress color to red
        answerIsWrong();
    }
    count = 0;
    if(runningQuestion < lastQuestion){
        runningQuestion++;
        renderQuestion();
    }else{
        // end the quiz and show the score
        clearInterval(TIMER);
        scoreRender();
    }
}

// answer is correct
function answerIsCorrect(){
    document.getElementById(runningQuestion).style.backgroundColor = "#0f0";
  
}

// answer is Wrong
function answerIsWrong(){
    document.getElementById(runningQuestion).style.backgroundColor = "#f00";
}

// score render
function scoreRender(){
    scoreDiv.style.display = "block";
    
    
    // calculate the amount of question percent answered by the user
    const scorePerCent = Math.round(100 * score/questions.length);
    
    // choose the image based on the scorePerCent
    let img = (scorePerCent >= 80) ? "img/5.png" :
              (scorePerCent >= 60) ? "img/4.png" :
              (scorePerCent >= 40) ? "img/3.png" :
              (scorePerCent >= 20) ? "img/2.png" :
              "img/1.png";
    
    scoreDiv.innerHTML = "<img src="+ img +">";
    scoreDiv.innerHTML += "<p>"+ scorePerCent +"%</p>";
    if(scorePerCent >= 75)
    song.play();
}





















