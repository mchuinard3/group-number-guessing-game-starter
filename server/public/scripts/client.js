$(document).ready(handleReady);

let randomNum;

function handleReady() {
  console.log("jquery is loaded!")
  $(`#submit`).on(`click`, handleSubmit);
  $('#restart').on('click', '#restartButton', restartGame);
  $.ajax({
    url: '/random',
    method: 'GET',
  }).then(function (response) {
    console.log(response);
    randomNum = response.randomNumber;
  })

}

function restartGame() {
  $.ajax({
    url: '/random',
    method: 'GET',
  }).then(function (response) {
    console.log(response);
    randomNum = response.randomNumber;

  })
  $(this).closest('button').remove();
  $('div').css('background-color', 'white');
}

// function createRando() {
//   $.ajax({
//     url: '/random',
//     method: 'GET',
//   }).then(function (response) {
//     console.log(response);
//     randomNum = response.randomNumber;
//   })
//   console.log(randomNum);
// }

function handleSubmit() {
  let playerOne = $(`#playerOne`).val();
  let playerTwo = $(`#playerTwo`).val();
  let playerThree = $(`#playerThree`).val();
  let playerFour = $(`#playerFour`).val();


  // createRando();

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

    $('#playerOne').val('');
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
      $(player).append(`<li>Guess: ${guess} - ${hint}</li>`)
    }
    else if (guess < randomNum) {
      hint = 'guess higher';
      $(player).append(`<li>Guess: ${guess} - ${hint}</li>`)
    }
    else if (guess == randomNum) {
      hint = 'You guessed the correct number!!!';

      $(player).append(`<li>Guess: ${guess} - ${hint}</li>`)
      $(player).closest('div').css("background-color", "#49fb35");
      $('#restart').append('<button id="restartButton">Play Again</button>');
    }
    
  }

}

function render(guesses) {

  console.log(randomNum);

  $('#playerOneGuessList').empty();
  $('#playerTwoGuessList').empty();
  $('#playerThreeGuessList').empty();
  $('#playerFourGuessList').empty();

  let pOneGuesses = guesses.playerOneGuess;
  let pTwoGuesses = guesses.playerTwoGuess;
  let pThreeGuesses = guesses.playerThreeGuess;
  let pFourGuesses = guesses.playerFourGuess;

  checkGuesses(pOneGuesses, '#playerOneGuessList');
  checkGuesses(pTwoGuesses, '#playerTwoGuessList');
  checkGuesses(pThreeGuesses, '#playerThreeGuessList');
  checkGuesses(pFourGuesses, '#playerFourGuessList');
}