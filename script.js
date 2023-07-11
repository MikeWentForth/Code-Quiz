// create a quiz class

class Quiz {
  constructor(questions) {
    this.score = 0;
    this.questions = questions;
    this.questionIndex = 0;
  }


  getQuestionIndex() {

    return this.questions[this.questionIndex];
  }

  guess(answer) {
    if (this.getQuestionIndex().isCorrectAnswer(answer)) {
      this.score++;
    }
    this.questionIndex++;
  }

  isEnded() {

    return this.questionIndex === this.questions.length;
  }

}

//CREATE A QUESTION CLASS

class Question {
  constructor(text, choices, answer) {
    this.text = text;
    this.choices = choices;
    this.answer = answer;
  }
  isCorrectAnswer(choice) {
    return this.answer === choice;
  }
}

//DISPLAY QUESTION

function displayQuestion() {
  if (quiz.isEnded()) {
    showScores();
  } else {
    let questionElement = document.getElementById("question");
    questionElement.innerHTML = quiz.getQuestionIndex().text;

    //SHOW OPTIONS

    let choices = quiz.getQuestionIndex().choices;
    for (let i = 0; i < choices.length; i++) {
      let choiceElement = document.getElementById("choice" + i);
      choiceElement.innerHTML = choices[i];
      guess("btn" + i, choices[i]);

    }

    showProgress();
  }

};

//GUESS FUNCTION

function guess(id, guess) {

  let button = document.getElementById(id);
  button.onclick = function () {
    quiz.guess(guess);
    displayQuestion();
  }
}

//SHOW QUIZ PROGRESS

function showProgress() {

  let currentQuestionNumber = quiz.questionIndex + 1;
  let progressElement = document.getElementById("progress");
  progressElement.innerHTML =
    `Question ${currentQuestionNumber} of ${quiz.questions.length}
    `;

}

//SHOW SCORE

function showScores() {
  let quizEndHTML =

    `
  <h1>Quiz Completed</h1>
  <h2 id= "score">You Scored: ${quiz.score} of ${quiz.questions.length}</h2>
  <div class= "quiz-repeat">
    <button id= "lastButton">Submit</button>
    
    </div>
  <input type= "text" id="entry-box"/>
  
  `;


  let quizElement = document.getElementById("quiz");
  quizElement.innerHTML = quizEndHTML;
  let submitButton = document.getElementById("lastButton");
  submitButton.addEventListener("click", savedScore)
}


function savedScore() {
  let entryBox = document.getElementById("entry-box");


  console.log(entryBox.value);
  localStorage.getItem('entryBox');


}

// var userInitials = localStorage.getItem("userInitials");













//CREATE QUIZ QUESTIONS

let questions = [
  new Question(
    "What does HTML stand for?", ["Henry Thought Marriage Lasted", "Hypertext Markup Language", "Hyper Tension Muscular Lymphoma", "Harold Taught Mostly Linguistics"], "Hypertext Markup Language"
  ),

  new Question(
    "What would you use to Style your HTML?", ["HTML", "JavaScript", "CSS", "Chat GPT"], "CSS"
  ),

  new Question(
    "Which text element is the largest in HTML format?", ["h1", "h2", "h3", "h4"], "h1"
  ),

  new Question(
    "What is the most common way to define a function in JavaScript?", ["Parameter Bracket", "Parenthesis", "Using Commas", "Function Declaration"], "Function Declaration"
  )
];

let quiz = new Quiz(questions);

//DISPLAY QUESTION

displayQuestion();

//ADD COUNTDOWN

let time = .5;
let quizTimeInMinutes = time * 60 * 60;
quizTime = quizTimeInMinutes / 60;

let counting = document.getElementById("count-down");

function startCountdown() {
  let quizTimer = setInterval(function () {
    if (quizTime <= 0) {
      clearInterval(quizTimer);
      showScores();

    } else {
      quizTime--;
      let sec = Math.floor(quizTime % 30);
      let min = Math.floor(quizTime / 30) % 30;
      counting.innerHTML = `Time left: ${min} : ${sec}`;
    }
  }, 1000)





}

startCountdown();

































// bring in our HTML ELEMENT references
// var startBtn = document.querySelector('.timer__btn');
// var questionTitle = document.getElementById('question-title');

// // we want/need GLOBAL Variables/DATA
// var timerInterval; 
// var counter = 60;


// var questions = [
//   {
//     prompt: "this is my first question?\n(a) ans1\n\
//   (b) ans2\n(c) ans3",
//     choices: [
//       { choiceA: "answer1" },
//       { choiceB: "answer2" },
//       { choiceC: "answer3" },
//     ],
//     answer: "a"
//   },
//   {
//     prompt: "this is my second question?\n(a) ans1\n\ (b) ans2\n(c) ans3",

//     answer: "c"
//   },

//   {
//     prompt: "this is my third question?\n(a) ans1\n\
//     (b) ans2\n(c) ans3",

//     answer: "a"

//   },
// ]

// var score = 0;

// /*
// for (var i = 0; i < questions.length; i++) {

//   var response = window.prompt(questions[i].prompt);
//   if (response == questions[i].answer) {
//     score++;
//     alert("correct!");
//   } else {
//     alert("WRONG!");
//   }
// }
// */

// // alert("you got " + score + "/" + questions.length);


// startBtn.addEventListener('click', function() {
//   console.log("Clicked...");
//   startTimer();
//   showQuestion();
// })







// // GIVEN I am taking a code quiz

// // WHEN I click the start button
//   // 1.) we HAVE TO HAVE A EXISITING HTML ELEMENT
//   // 2.) we have to GRAB REFERENEC to the element
//   // 3.) Add the event listener (type of event --> what should happen (what logic runs?))

// // THEN a timer starts and I am presented with a question
//   // we have two different/unrelated OPERATIONS that need to happen
//   // 1 --> start a timer
//     // * 
//   // 2 --> present user with a question 
//     // * 


//     // setTimeout()   --> usually for a single delay of a an operation
//     // setInterval()  --> something that we want to happen every ITERATION / time varabile

// function startTimer() {
//   console.log("Starting timer...");

//   timerInterval = setInterval(function() {

//     if(counter === 0) {
//       clearInterval(timerInterval);
//       gameOver()
//     }
//     // every 1 second we run the logic in the function
//     console.log("Count: ", counter)
//     // modify that variabile 
//     counter = counter - 1;
//   }, 1000);

// }


// function showQuestion() {
//   // so what operations need to happen here(?)
//   questionTitle.textContent = questions[0].prompt
//  // questionTitle.textContent = questions[0].choices[0]
//  // questionTitle.textContent = questions[0].choices[1]
//  // questionTitle.textContent = questions[0].choices[2]
// }



// // WHEN I answer a question
// // THEN I am presented with another question

// // WHEN I answer a question incorrectly
// // THEN time is subtracted from the clock

// // WHEN all questions are answered or the timer reaches 0
// // THEN the game is over

// function gameOver() {
//   console.log("Game Over!")
//   clearInterval(timerInterval)
// }

// // WHEN the game is over
// // THEN I can save my initials and score
