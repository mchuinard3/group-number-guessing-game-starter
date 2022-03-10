$(document).ready(handleReady);

function handleReady() {
  console.log("jquery is loaded!")
  $(`#submit`).on(`click`, handleSubmit);
}

function handleSubmit (){
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
    
  })
}




