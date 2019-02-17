var panel = $("#quiz-area");
var countStartNumber = 30;

// Question set
var questions = [{
  question : '1. What is the first ever Disney Movie?',
  answers : ['A. Cinderella',
         'B. Lion King',
         'C. Snow White and the Seven Dwarfs',
         'D. Pinocchio'],
 correctAnswer : 'C. Snow White and the Seven Dwarfs',
  image :  "assets/images/snowwhite.gif"
}, 

{
  question : '2. Complete the Lyrics: Its the circle of life. And it moves us all Through despair and hope',
  answers : ['A. Till we find our place. On the path unwinding',
         'B. In the cirle of life',
         'C. Its the wheel of fortune. Its the band of hope',
         'D. And some of us soar to stars. And some of us sail through our trouble.'],
 correctAnswer : 'A. Till we find our place. On the path unwinding',
  image :  "assets/images/lionking.gif"
}, 

{
  question : '3. In this Disney Movie, the main character steals from the rich and gives to the poor.',
  answers : ['A. Woody',
         'B. Robin Hood',
         'C. Micky Mouse',
         'D. Gaston'],
  correctAnswer : 'B. Robin Hood',
  image : "assets/images/robinhood.gif"
}, 

{
  question : '4. This is the first Disney Movie to premier on Broadway:',
  answers : ['A. Beauty and the Beast',
         'B. Lion King',
         'C. Little Mermaid',
         'D. Tarzan'],
  correctAnswer : 'A. Beauty and the Beast',
  image : "assets/images/beautybeast.gif"
}, 

{
  question : '5. Disney was founded by:',
  answers : ['A. Roy Disney',
         'B. Walt Disney',
         'C. Bob Iger',
         'D. Walt and Roy Disney'],
  correctAnswer : 'D. Walt and Roy Disney',
  image : "assets/images/waltdisney.gif"
}, 

{
  question : '6. Disney was founded on:',
  answers : ['A. October 16, 1924',
         'B. October 16, 1923',
         'C. December 21, 1937',
         'D. October 1, 1971'],
  correctAnswer : 'B. October 16, 1923',
  image : "assets/images/disney.gif"
}, 

{
 question : '7. How many Disney World Theme Parks are there around the world?',
 answers : ['A. 10',
         'B. 6',
         'C. 5',
         'D. 1'],
  correctAnswer : 'C. 5',
  image : "assets/images/themepark.gif"
}, 

{
  question : '8. The first Disney Pixar film was?',
  answers : ['A. UP',
         'B. Frozen',
         'C. Monsters Inc.',
         'D. Toy Story'],
  correctAnswer : 'D. Toy Story',
  image : "assets/images/toystory.gif"

},

{

  question : '9. This animated Disney film leads the viewers into a world where the citys electricity is powered by the screams of children:',
  answers : ['A. The Incredibles',
         'B. Mulan',
         'C. Monsters Inc.',
         'D. Beauty and the Beast'],
  correctAnswer : 'C. Monsters Inc.',
  image : "assets/images/monstersinc.gif"
},

{

 question : '10. Complete the Lyrics: Be a man. We must be swift as the coursing river! Be a man. With all the force of a great typhoon! Be a man',
  answers : ['A. With all the strenth of a raging fire! Mysterious as the dark side of the moon!',
         'B. Time is racing towards till the Huns arrive. Heed my every order and you might survive.',
         'C. Hope he doesnt see right through me. Now I really wish I knew how to swim',
         'D. Somehow Ill make man out of you'],
  correctAnswer : 'A. With all the strenth of a raging fire! Mysterious as the dark side of the moon!',
  image : "assets/images/mulan.gif"

}];

// Variable to hold our setInterval
var timer;

var game = {

  questions: questions,
  currentQuestion: 0,
  counter: countStartNumber,
  correct: 0,
  incorrect: 0,

  countdown: function() {
    game.counter--;
    $("#counter-number").text(game.counter);
    if (game.counter === 0) {
      console.log("TIME UP");
      game.timeUp();
    }
  },
  loadQuestion: function() {

    timer = setInterval(game.countdown, 1000);

    panel.html("<h2>" + questions[this.currentQuestion].question + "</h2>");

    for (var i = 0; i < questions[this.currentQuestion].answers.length; i++) {
      panel.append("<button class='answer-button' id='button' data-name='" + questions[this.currentQuestion].answers[i]
      + "'>" + questions[this.currentQuestion].answers[i] + "</button>");
    }
  },

  nextQuestion: function() {
    game.counter = countStartNumber;
    $("#counter-number").text(game.counter);
    game.currentQuestion++;
    game.loadQuestion();
  },

  timeUp: function() {

    clearInterval(timer);

    $("#counter-number").html(game.counter);

    panel.html("<h2>Out of Time!</h2>");
    panel.append("<h3>The Correct Answer was: " + questions[this.currentQuestion].correctAnswer);
    panel.append("<img src='" + questions[this.currentQuestion].image + "' />");

    if (game.currentQuestion === questions.length - 1) {
      setTimeout(game.results, 3 * 1000);
    }
    else {
      setTimeout(game.nextQuestion, 3 * 1000);
    }
  },

  results: function() {

    clearInterval(timer);

    panel.html("<h2>All done, heres how you did!</h2>");

    $("#counter-number").text(game.counter);

    panel.append("<h3>Correct Answers: " + game.correct + "</h3>");
    panel.append("<h3>Incorrect Answers: " + game.incorrect + "</h3>");
    panel.append("<h3>Unanswered: " + (questions.length - (game.incorrect + game.correct)) + "</h3>");
    panel.append("<br><button id='start-over'>Start Over?</button>");
  },

  clicked: function(e) {
    clearInterval(timer);
    if ($(e.target).attr("data-name") === questions[this.currentQuestion].correctAnswer) {
      this.answeredCorrectly();
    }
    else {
      this.answeredIncorrectly();
    }
  },

  answeredIncorrectly: function() {

    game.incorrect++;

    clearInterval(timer);

    panel.html("<h2>Nope!</h2>");
    panel.append("<h3>The Correct Answer was: " + questions[game.currentQuestion].correctAnswer + "</h3>");
    panel.append("<img src='" + questions[game.currentQuestion].image + "' />");

    if (game.currentQuestion === questions.length - 1) {
      setTimeout(game.results, 3 * 1000);
    }
    else {
      setTimeout(game.nextQuestion, 3 * 1000);
    }
  },

  answeredCorrectly: function() {

    clearInterval(timer);

    game.correct++;

    panel.html("<h2>Correct!</h2>");
    panel.append("<img src='" + questions[game.currentQuestion].image + "' />");

    if (game.currentQuestion === questions.length - 1) {
      setTimeout(game.results, 3 * 1000);
    }
    else {
      setTimeout(game.nextQuestion, 3 * 1000);
    }
  },

  reset: function() {
    this.currentQuestion = 0;
    this.counter = countStartNumber;
    this.correct = 0;
    this.incorrect = 0;
    this.loadQuestion();
  }
};

// CLICK EVENTS

$(document).on("click", "#start-over", function() {
  game.reset();
});

$(document).on("click", ".answer-button", function(e) {
  game.clicked(e);
});

$(document).on("click", "#start", function() {
  $("#sub-wrapper").prepend("<h2>Time Remaining: <span id='counter-number'>30</span> Seconds</h2>");
  game.loadQuestion();
});