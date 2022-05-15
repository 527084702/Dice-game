'use strict';

let randomNumber = Math.floor(Math.random() * 6) + 1;
let player1 = 0;
let player2 = 0;
//let player1Current = 0;
//let player2Current = 0;
let currentScore = 0;
let activePlayer = 0;
let scores = [0, 0];
let playing = true;

const totalScore1Element = document.querySelector('#score--0');
const totalScore2Element = document.getElementById('score--1');//faster than querySelector
const player1Element = document.querySelector('.player--0');
const player2Element = document.querySelector('.player--1');
const currentScore1Element = document.getElementById(`current--0`);
const currentScore2Element = document.getElementById(`current--1`);
const dice = document.querySelector('.dice');

const btnNewGame = document.querySelector('.btn--new');
const btnRollDice = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

//Starting condition
const init = function(){
    scores = [0, 0];
    currentScore = 0;
    activePlayer = 0;
    playing = true;

    totalScore1Element.textContent = 0;
    totalScore2Element.textContent = 0;   
    currentScore1Element.textContent = 0;
    currentScore2Element.textContent = 0;

    dice.classList.add('hidden');
    player1Element.classList.add('player--active');
    player2Element.classList.remove('player--active');
    player1Element.classList.remove('player--winner');
    player2Element.classList.remove('player--winner');
}

//start
init();

//switch player 
const switchPlayer = function(){
    if(playing){
        //If number is 1, clear the score
        currentScore = 0;
        document.getElementById(`current--${activePlayer}`).textContent = currentScore;

        //Switch to next player
        activePlayer = activePlayer === 0 ? 1 : 0;

        //change player background color
        player1Element.classList.toggle('player--active');
        player2Element.classList.toggle('player--active');
    }
}

// rolling dice function
btnRollDice.addEventListener('click',function(){
    if(playing){
        //get a random number
        randomNumber = Math.trunc(Math.random() * 6) + 1;
        //randomNumber = Math.floor(Math.random() * 6) + 1;
        console.log(randomNumber);

        //Show the correct picture
        dice.classList.remove('hidden');
        dice.src = `dice-${randomNumber}.png`;

        //check if the number is 1. switch player
        if(randomNumber !== 1){
            currentScore += randomNumber;

            document.getElementById(`current--${activePlayer}`).textContent = currentScore;

        }else{
            switchPlayer();
        }
    }
})


btnHold.addEventListener('click',function(){
    if(playing){
        //add current score into active player's score
        scores[activePlayer] += currentScore;

        //Show new total score
        document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer];

        //check if player's score more than 100
        if (scores[activePlayer] >= 10){
            playing = false;
            dice.classList.add('hidden');
            document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
            document.querySelector(`.player--${activePlayer}`).classList.remove('player--active');
        }else{
            //swtich player
            switchPlayer();
        }
    }
})

btnNewGame.addEventListener('click',init);

