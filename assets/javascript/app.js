var qArea = $("#question-area");
var setTimer = 10;



var questions = [{
    question : 'Which member of “The Breakfast Club” was the only one who did not have an appearance on the USA show Psych?',
    answers : ['1) Judd Nelson', '2) Emilio Estevez', '3) Molly Ringwald', '4) Ally Sheedy'],
    correctAnswer : '2) Emilio Estevez', 
    image :  "assets/images/emilio.gif"

},

{
    question : 'While the show Psych was set in Santa Barbara, CA, where was it actually filmed?',
    answers : ['1) Vancouver, BC', '2) Santa Monica, CA', '3) Atlanta, GA',  '4) Toronto, ON'],
    correctAnswer : '1) Vancouver, BC',
    image :  "assets/images/vancouver.gif"
},

{
    question : 'In the show Psych there is a character named Dobson who is always referred to but never seen. In the final episode which actor is revealed as Dobson? Hint: the actor is mentioned multiple times throughout the series.',
    answers : ['1) Ed Lover', '2) Billy Zane', '3) Val Kilmer', '4) Deon Richmond'],
    correctAnswer : '3) Val Kilmer', 
    image :  "assets/images/psych_val_kilmer.jpg"
},


{
    question : 'What fruit is shown in (almost) every single episode throughout the entire series in some form?',
    answers : ['1) Lime', '2) Apple', '3) Orange', '4) Pineapple'],
    correctAnswer : '4) Pineapple', 
    image :  "assets/images/pineapple.gif"
},


{
    question : 'Gus drives a blue Toyota Echo affectionately known as “The Blueberry”. What is the name of the rental car (also a Toyota Echo) that Gus is forced to drive after the Blueberry suffers a mishap? Hint: Shawn blows up The Cranberry by accident',
    answers : ['1) The Strawberry', '2) The Gooseberry', '3) The Cranberry', '4) The Blackberry'],
    correctAnswer : '3) The Cranberry', 
    image :  "assets/images/thecranberry.gif"
}];

//click events
$(document).on("click", "#start-button", function() {
    $("#sub-wrapper").prepend("<h2>Time Remaining: <span id='counter-number'>60</span> Seconds</h2>");
    $("#start-button").hide();
    quiz.loadQuestion();
  });

$(document).on("click", "#answer-button", function(e) {
    quiz.answerClicked(e);
});

$(document).on("click", "#redo", function() {
    quiz.reset();
  });

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
          quiz.timesUp();
        }
      },

    loadQuestion: function() {

        timer = setInterval(quiz.countdown, 1000); //set timer for current question
        qArea.html("<h3>" + questions[this.currentQuestion].question + "</h3>"); //to load the first question

        for (var i = 0; i < questions[this.currentQuestion].answers.length; i++) {
            qArea.append("<button class='btn btn-lg btn-block' href='#' role='button' id='answer-button' data-name='" + questions[this.currentQuestion].answers[i]
            + "'>" + questions[this.currentQuestion].answers[i] + "</button>");
        }
    },

    nextQuestion: function() {
        //set the timer
        quiz.counter = setTimer;
        //force the timer to show on the page
        $("#counter-number").text(quiz.counter);
        //go to the next question
        quiz.currentQuestion++;
        //load the next queston
        quiz.loadQuestion();
    },


    timesUp: function() {
        //clear timer
        clearInterval(timer);
        //update timer on page
        $("#counter-number").text(quiz.counter);
        //times up message
        qArea.html("<h3>Times Up!</h3>");
        //show the correct message
        qArea.append("<h3>The Correct Answer was:" + questions[this.currentQuestion].correctAnswer);
        qArea.append("<img src='" + questions[quiz.currentQuestion].image + "' class = 'abg' />");

        if (quiz.currentQuestion === questions.length - 1) {
            quiz.finalResults();
          }
          else {
            setTimeout(quiz.nextQuestion, 3 * 1000);
          }
    },

    answerClicked: function(e) {
        //clear timer
        clearInterval(timer);
        //define if right or wrong question was clicked
        if ($(e.target).attr("data-name") === questions[this.currentQuestion].correctAnswer) {
            this.answeredCorrectly();//if answer was correct run correct function
        }
        else {
            this.answeredIncorrectly();//if answer was incorrect run incorrect function
        }
    },

    answeredIncorrectly: function() {
        //add to correct score
        quiz.incorrectA++;
        //clear timer
        clearInterval(timer);
        //let user know answer was incorrect
        qArea.html("<h3>Sorry!</h3>");
        //let user know the right answer
        qArea.append("<h3>The correct answer was: " + questions[quiz.currentQuestion].correctAnswer + "</h3>");
        qArea.append("<img src='" + questions[quiz.currentQuestion].image + "' class = 'abg' />");


        //check if all questions have been asked
        if (quiz.currentQuestion === questions.legnth - 1) {
            quiz.finalResults();
        }
        else {
            setTimeout(quiz.nextQuestion, 3 * 1000);
        }

    }, 


    answeredCorrectly: function() {

        //add to correct score
        quiz.correctA++;
        //clear timer
        clearInterval(timer);

        //let user know answer was correct
        qArea.html("<h3>Correct!</h3>");
        qArea.append("<img src='" + questions[quiz.currentQuestion].image + "' class = 'abg' />");

        //check if all questions have been asked
        if (quiz.currentQuestion === questions.legnth - 1) {
            quiz.finalResults();
        }
        else {
            setTimeout(quiz.nextQuestion, 3 * 1000);
        }

    }, 

    
    finalResults: function () {
        //clear timer
        clearInterval(timer);
        //show message for results
        qArea.html("<h3>Let's see how you did!</h3>");
        //clear counter
        $("#counter-number").text(quiz.counter);
        //show the number of correct answers
        qArea.append("<h4>Questions you got right: " + quiz.correctA + "</h4>");
        //show the number of correct answers
        qArea.append("<h4>Questions you got wrong: " + quiz.incorrectA + "</h4>");
        //show the number of unanswered questions
        qArea.append("<h4>Did you fall asleep? Unanswered: " + (questions.length - (quiz.correctA + quiz.incorrectA)) + "</h4>");
        qArea.append("<img src='assets/images/final.gif' class = 'abg' />");
        //show button to start over
        qArea.append("<br><button id = 'redo' class = 'btn'>Want a redo?</button>");


    },

    reset: function() {
        this.currentQuestion = 0,
        this.counter = setTimer,
        this.correctA = 0,
        this.incorrectA = 0,
        this.loadQuestion();
    }
};


