$(document).ready(handleReady);

let randomNum = 0;
function handleReady() {
  console.log("jquery is loaded!")
  $(`#submit`).on(`click`, handleSubmit);
  randomNum = randomNumber(1, 25);
}

function handleSubmit() {
  let playerOne = $(`#playerOne`).val();
  let playerTwo = $(`#playerTwo`).val();
  let playerThree = $(`#playerThree`).val();
  let playerFour = $(`#playerFour`).val();

  $.ajax({
    url: '/guesses',
    method: 'POST',
    data: {
      guessPlayerOne: playerOne,
      guessPlayerTwo: playerTwo,
      guessPlayerThree: playerThree,
      guessPlayerFour: playerFour
    }
  }).then(function (response) {
    console.log(response);

    $('#playerOne').val('')
    $(`#playerTwo`).val('');
    $(`#playerThree`).val('');
    $(`#playerFour`).val('');

    
  })
  getGuesses();

}

function getGuesses() {

  $.ajax({
    url: '/guesses',
    method: 'GET',
  }).then(function (response) {
    console.log(response);
    render(response);
  })
}

function checkGuesses(guesses, player) {
  let hint = '';
  for (let guess of guesses) {
    if (guess > randomNum) {
      hint = 'guess lower';
    }
    if (guess < randomNum) {
      hint = 'guess higher';
    }
    if (guess === randomNum) {
      hint = 'You guessed the correct number!!!';
    }
  }
  $(player).append(`<li>Guess: ${guess} - ${hint}</li>`)
}

function randomNumber(min, max) {
  return Math.floor(Math.random() * (1 + max - min) + min);
}

function render(guesses) {
  let pOneGuesses = guesses.playerOneGuess;
  let pTwoGuesses = guesses.playerTwoGuess;
  let pThreeGuesses = guesses.playerThreeGuess;
  let pFourGuesses = guesses.playerFourGuess;
  
  checkGuesses(pOneGuesses, '#playerOneGuessList')
  checkGuesses(pTwoGuesses, '#playerTwoGuessList')
  checkGuesses(pThreeGuesses, '#playerThreeGuessList')
  checkGuesses(pFourGuesses, '#playerFourGuessList')
}