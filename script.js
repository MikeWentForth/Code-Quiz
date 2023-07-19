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
  
  <div class="center">
  <input type= "text" id="entry-box"/>
  <button id= "lastButton">Submit</button>
  </div>

  `;


  let quizElement = document.getElementById("quiz");
  quizElement.innerHTML = quizEndHTML;
  let submitButton = document.getElementById("lastButton");
  submitButton.addEventListener("click", savedScore)
}


function savedScore() {
  let entryBox = document.getElementById("entry-box");
  console.log(entryBox.value);

  // Load the previous high scores from localstorage

  let temp = localStorage.getItem("scores");
  let scores = JSON.parse(temp);
  // If scores is null here, initialize as an empty array.
  if (scores == null) scores = [];

  // Add the new score information
  // Data structure is an array of custom objects: 
  // [{ initials: entryBox.value, score: 75 }, { ... }, ...]
  let newScoreObject = { initials: entryBox.value.trim(), score: quiz.score };
  scores.push(newScoreObject);

  // Sort by score, highest first
  scores.sort(function (a, b) {
    return b.score - a.score;
  });

  // Keep/show the top 5?
  scores = scores.slice(0, 5);

  // Save the new dataset back to localstorage
  localStorage.setItem("scores", JSON.stringify(scores));

  // Display the scoreboard on screen
  // Create the HTML to display
  let html = "<h1>High Scores</h1>\n";

  // Loop through the scores array: for (let varname of collection) { ... }
  for (let sc of scores) {
    // Create html to display the initials and score for each object in the array
    // sc = {initials: "MW", score: 99}

    html += `${sc.initials} ${sc.score}<br>\n`;

  }
  html += '<button onclick="startQuiz();">Play Again</button><br>\n';
  // Update innerHTML of div with class highscores (querySelector)
  document.getElementById("quiz").innerHTML = html;

  // Optional button to clear scores




  // what data do we want to keep (?) --> structuing our dataset
  // we want to store the KEY and VALUE of each USER (object [{ username: scoreValue }] ) 

  /*  var newData = {
      username: entryBox.value,
      score: 75
    } */

  // Where are we storing the data (?) --> PERSISTING DATA 
  // localStorage (Browser Storage)  --> Broswer only understands STRING type data (JSON)
  // JSON  --> Stringify / Parse (data conversion)

  // -->  localStorage.setItem("highscores", "[]")   // --> { key: value }


  // Where and what are we displaying (?)
  // on the DOM (in a div or a new HTML page)
}

// var userInitials = ["userInitials", "savedScore"];
// console.log("userInitials");

// -- localStorage Adding / Grabbing data and saving to the BROWSER -- //
/*
// IF WE NEED TO add new KEY : VALUE pairs
localStorage.setItem("highscores", "[]")   // --> { key: value }
var savedData = localStorage.getItem('highscores');
console.log(savedData);
console.log(typeof savedData);

var convertedData = JSON.parse(savedData)
console.log(convertedData);
console.log(typeof convertedData);

var newData = {
  username: "Bob",
  score: 75
}

convertedData.push(newData)
console.log(convertedData);

localStorage.setItem("highscores", JSON.stringify(convertedData) )
  // JS Object
  let obj = {
    name: "Bob"
  }

  console.log(JSON.stringify(obj))
  console.log(typeof JSON.stringify(obj))
  // JS Obj ARRAY
  //let arr = [{ name: "Bob"}, { name: "Sarah"} ]
  //arr.push({ name:"Tom"})
  // console.log(obj)   // --> { name : "Bob", age: 52 }
  // JSON Object --> (JSON as a string data type)
  let jsonObj = {
    "name": "Bob"
  }
  console.log(JSON.parse(jsonObj))
  console.log(typeof JSON.parse(jsonObj))
  // ---> { "name": "Bob", "age": "52" }

*/
// ----------------------- //



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

let quiz;
let time;
let quizTimeInMinutes;
let quizTime;

function startCountdown() {
  let quizTimer = setInterval(function () {
    if (quizTime <= 0) {
      clearInterval(quizTimer);
      showScores();
    } else {
      quizTime--;
      let sec = Math.floor(quizTime % 30);
      let min = Math.floor(quizTime / 30) % 30;
      document.getElementById("count-down").innerHTML = `Time left: ${min} : ${sec}`;
    }
  }, 1000)

}

function startQuiz() {

  // Reset the starting HTML
  document.getElementById("quiz").innerHTML = startingHTML;

  quiz = new Quiz(questions);

  //DISPLAY QUESTION
  displayQuestion();
  
  //ADD COUNTDOWN
  time = .5;
  quizTimeInMinutes = time * 60 * 60;
  quizTime = quizTimeInMinutes / 60;
  startCountdown();

}

let startingHTML = document.getElementById("quiz").innerHTML;
startQuiz();
