var qArea = $("#question-area");
var setTimer = 60;



var questions = [{
    question : 'Which member of “The Breakfast Club” was the only one who did not have an appearance on the USA show Psych?',
    answers : ['1) Judd Nelson', '2) Emilio Estevez', '3) Molly Ringwald', '4) Ally Sheedy'],
    correctAnswer : '2) Emilio Estevez', 
},

{ question : 'While the show Psych was set in Santa Barbara, CA, where was it actually filmed?',
    answers : ['1) Vancouver, BC', '2) Santa Monica, CA', '3) Atlanta, GA',  '4) Toronto, ON'],
    correctAnswer : '1) Vancouver, BC', 
},

{ question : 'In the show Psych there is a character named Dobson who is always referred to but never seen. In the final episode which actor is revealed as Dobson? Hint: the actor is mentioned multiple times throughout the series.',
    answers : ['1) Ed Lover', '2) Billy Zane', '3) Val Kilmer', '4) Deon Richmond'],
    correctAnswer : '3) Val Kilmer', 
},


{ question : 'What fruit is shown in (almost) every single episode throughout the entire series in some form?',
    answers : ['1) Lime', '2) Apple', '3) Orange', '4) Pineapple'],
    correctAnswer : '4) Pineapple', 
},


{ question : 'Gus drives a blue Toyota Echo affectionately known as “The Blueberry”. What is the name of the rental car (also a Toyota Echo) that Gus is forced to drive after the Blueberry is ripped in half in an attempt to bring down a balcony in the episode Santabarbaratown 2?',
    answers : ['1) The Strawberry', '2) The Gooseberry', '3) The Cranberry', '4) The Blackberry'],
    correctAnswer : '3) The Cranberry', 
}];

//click events
$(document).on("click", "#start-button", function() {
    $("#sub-wrapper").prepend("<h2>Time Remaining: <span id='counter-number'>60</span> Seconds</h2>");
    quiz.loadQuestion();
  });

$(document).on("click", ".answer-button", function(e) {
    quiz.clicked(e);
})

var timer;
var quiz = {

    questions: questions,
    currentQuestion: 0,
    counter: setTimer,
    correctA: 0,
    incorrectA: 0,

    countdown: function() {
        quiz.counter--;
        $("#counter-number").text(quiz.counter);
        if (quiz.counter === 0) {
          console.log("TIME UP");
          quiz.timeUp();
        }
      },

    loadQuestion: function() {

        timer = setInterval(quiz.countdown, 1000); //set timer for current question
        qArea.html("<h2>" + questions[this.currentQuestion].question + "</h2>"); //to load the first question

        for (var i = 0; i < questions[this.currentQuestion].answers.length; i++) {
            qArea.append("<button class='answer-button' id='button' data-name='" + questions[this.currentQuestion].answers[i] + "'>" + questions[this.currentQuestion].answers[i] + "</button>");
        }
    },

    nextQuestion: function() {
        quiz.counter = setTimer;
        $("#counter-number").text(quiz.counter);
        quiz.currentQuestion++;
        quiz.loadQuestion();
    },





    




};


