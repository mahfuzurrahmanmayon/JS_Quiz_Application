// Select All the HTML element

const questionText = document.querySelector(".question-text");
const MyOptions = document.querySelector(".MyOptions");
const nextBtn = document.querySelector("#next-btn");
const scoreText = document.querySelector("#score-text");
const congrates = document.querySelector(".congrates");
const progressBar = document.querySelector(".progressBar");
const timerDiv = document.querySelector(".timerDiv");

// Array Of Quiz Data Objects
const quiz_data = [
    {
        "quiz_name": "What is the purpose of the 'use strict' directive in JavaScript?",
        "options": ["To enable strict mode, which catches common coding errors.", "To allow for lax variable naming conventions.", "To disable all debugging features.", "To enforce case-sensitive variable naming."],
        "points_per_quiz": 10,
        "time": 6,
        "correct_answer": "To enable strict mode, which catches common coding errors."
    },
    {
        "quiz_name": "Basics of JavaScript",
        "options": ["JavaScript is a markup language.", "JavaScript is a scripting language.", "JavaScript is a style sheet language.", "JavaScript is a programming language."],
        "points_per_quiz": 15,
        "time": 90,
        "correct_answer": "JavaScript is a programming language."
    },
    {
        "quiz_name": "Variables and Data Types",
        "options": ["Variables must be declared using the 'var' keyword.", "JavaScript has only one data type: 'string'.", "Arrays can only store numbers in JavaScript.", "JavaScript is loosely typed, meaning variables can hold values of any data type."],
        "points_per_quiz": 20,
        "time": 120,
        "correct_answer": "JavaScript is loosely typed, meaning variables can hold values of any data type."
    },
    {
        "quiz_name": "Functions in JavaScript",
        "options": ["Functions in JavaScript are always anonymous.", "JavaScript functions can only be declared using the 'func' keyword.", "Arrow functions were introduced in ECMAScript 6.", "Functions in JavaScript cannot return values."],
        "points_per_quiz": 12,
        "time": 75,
        "correct_answer": "Arrow functions were introduced in ECMAScript 6."
    },
    {
        "quiz_name": "Which of the following is not a JavaScript data type?",
        "options": ["String", "Boolean", "Float", "Number"],
        "points_per_quiz": 18,
        "time": 80,
        "correct_answer": "Float"
    },
    {
        "quiz_name": "What is the result of the expression: 10 + '20' in JavaScript?",
        "options": ["30", "1020", "20", "Error"],
        "points_per_quiz": 14,
        "time": 70,
        "correct_answer": "1020"
    },
    {
        "quiz_name": "Which keyword is used to declare variables in JavaScript?",
        "options": ["var", "let", "const", "all of the above"],
        "points_per_quiz": 25,
        "time": 100,
        "correct_answer": "all of the above"
    },
    {
        "quiz_name": "What is the purpose of the `setTimeout` function in JavaScript?",
        "options": ["To set a timer that executes a function after a specified delay", "To define a timeout for AJAX requests", "To delay the execution of a function until the next event loop cycle", "To synchronize asynchronous operations"],
        "points_per_quiz": 16,
        "time": 85,
        "correct_answer": "To set a timer that executes a function after a specified delay"
    },
    {
        "quiz_name": "What is the concept of event delegation in JavaScript?",
        "options": ["Assigning a single event listener to a common ancestor for multiple elements", "Delegating events to the browser's default behavior", "Delegating events to a separate JavaScript file", "Assigning multiple event listeners to a single element"],
        "points_per_quiz": 22,
        "time": 110,
        "correct_answer": "Assigning a single event listener to a common ancestor for multiple elements"
    },
    {
        "quiz_name": "What is the purpose of the `this` keyword in JavaScript?",
        "options": ["To refer to the current function", "To refer to the global object", "To refer to the object on which a method is being invoked", "To refer to the prototype object"],
        "points_per_quiz": 18,
        "time": 75,
        "correct_answer": "To refer to the object on which a method is being invoked"
    }
]


// Initial index value
let currentQuestion = 0;
let user_score = 0;

// Shoq Question Function
function showQuestion() {
    const currentQ = quiz_data[currentQuestion];
    const currentOption = currentQ.options;

    // Create and append a new heading element for the question
    const heading = document.createElement('h2');
    heading.textContent = currentQ.quiz_name;
    questionText.appendChild(heading);

    // Create and append buttons for each option
    currentOption.map((item) => {
        const optionEl = document.createElement('div');
        optionEl.className = "options";
        optionEl.textContent = item;
        MyOptions.appendChild(optionEl);
    });

    const options = document.querySelectorAll(".options")
    for(let i = 0; i < options.length;i++){
        options[i].setAttribute("onclick", "checkAnswer(this)");
    }
    
    // call startTimer function 
    startTimer()
    
}
// Check Answer Function
function checkAnswer(answer){
    const currentQ = quiz_data[currentQuestion];
    const correctAnswer = quiz_data[currentQuestion].correct_answer;
    const userAnswer = answer.textContent;
    let all_options = MyOptions.children.length;
    console.log(all_options);

    if(userAnswer == correctAnswer){
        user_score += currentQ.points_per_quiz;
        answer.classList.add("correct");
        congrates.innerHTML = `Congratulations! You have got ${currentQ.points_per_quiz} points.`;
    }else{
        answer.classList.add("incorrect");
        congrates.innerHTML = `Incorrect! You have loss ${currentQ.points_per_quiz} points and correct answer is ${correctAnswer}`;
        user_score -= currentQ.points_per_quiz;
    }

    // After selecting an option, the options are disabled and the next button is displayed.
    for(let i = 0; i < all_options;i++){
        MyOptions.children[i].classList.add("disabled");
    }
}

// When Next Button Click Function
nextBtn.addEventListener("click", function(){
    // clear previous question and options
    questionText.innerHTML = "";
    MyOptions.innerHTML = "";
    congrates.innerHTML = "";
    timerDiv.innerHTML = ""
    // move to next question 
    currentQuestion++;
    if (currentQuestion < quiz_data.length) {
        // call showQuestion and updateProgress function by clicking
        showQuestion();
        updateProgress();
    } else {
        questionText.innerHTML = "<h2>Quiz Finished!</h2>";
        MyOptions.innerHTML = "";
        timerDiv.style.display = "none"
        nextBtn.style.display = "none";
        scoreText.innerHTML = `Your score is: ${user_score}` ;
        scoreText.style.textAlign = "center";
        scoreText.style.color = "#fff";
        scoreText.style.fontSize = "20px";
        scoreText.style.fontWeight = "500";
        
    }
})

// update progress-bar function
function updateProgress(){
    const progress = ((currentQuestion + 1) / quiz_data.length) * 100;
    progressBar.style.width = `${progress}%`;
    progressBar.innerHTML = `${Math.floor(progress)}%`;
}
// call the updateProgress function
updateProgress();

// startTimer Function for every question
function startTimer() {
    let all_options = MyOptions.children.length;
    const currentQ = quiz_data[currentQuestion];
    let timeLeft = currentQ.time;

    function updateTimer() {
        if (timeLeft == 0) {
            clearInterval(timer);
            timerDiv.innerHTML = "";
            for(let i = 0; i < all_options;i++){
                MyOptions.children[i].classList.add("disabled");
            }
        } else {
            timerDiv.innerHTML = timeLeft--;
        }
    }

    let timer = setInterval(updateTimer, 1000);
   
}

// calling showQuestion function
showQuestion();