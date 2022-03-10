const express = require('express');
const bodyParser = require('body-parser')
const app = express();
const PORT = 5000;

let allGuesses = {
  playerOneGuess: [],
  playerTwoGuess: [],
  playerThreeGuess: [],
  playerFourGuess: []
};

// This must be added before GET & POST routes.
app.use(bodyParser.urlencoded({extended:true}))

// Serve up static files (HTML, CSS, Client JS)
app.use(express.static('server/public'));

// GET & POST Routes go here
app.post(`/guesses`, (req, res) => {
  console.log(`POST guesses`, req.body);
  let dummy = req.body; 
  // // input values

  allGuesses.playerOneGuess.push(dummy.guessPlayerOne);
  allGuesses.playerTwoGuess.push(dummy.guessPlayerTwo);
  allGuesses.playerThreeGuess.push(dummy.guessPlayerThree);
  allGuesses.playerFourGuess.push(dummy.guessPlayerFour);

  // console.log(playerOneGuess);
  // console.log(playerTwoGuess);
  // console.log(playerThreeGuess);
  // console.log(playerFourGuess);

  console.log(allGuesses);
  
  res.sendStatus(201);
})

app.get('/guesses', (req, res) => {
  console.log('GET guesses');
  res.send(allGuesses);
})

app.listen(PORT, () => {
  console.log ('Server is running on port', PORT)
})


