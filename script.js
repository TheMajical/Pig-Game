'use strict';


//describe Elements
const player0El = document.querySelector(".player--0")
const player1El = document.querySelector(".player--1")
const score0El = document.getElementById("score--0");
const score1El = document.querySelector("#score--1");
const diceEl = document.querySelector(".dice");
const btnNew = document.querySelector(".btn--new");
const btnRoll = document.querySelector(".btn--roll");
const btnHold = document.querySelector(".btn--hold");
const currentScore0 = document.getElementById("current--0")
const currentScore1 = document.getElementById("current--1")

const scores = [0,0];
let currentScore = 0;
let activePlayer = 0;
let isGameInProgress = true;


//function
function switchPlayer(){
    currentScore = 0;
    document.getElementById(`current--${activePlayer}`).textContent = currentScore
    activePlayer = activePlayer === 0 ? 1 : 0;
    player0El.classList.toggle("player--active");
    player1El.classList.toggle("player--active");
}
//Starting condiotions
score0El.textContent = 0;
score1El.textContent = 0;
diceEl.classList.add("hidden");

btnRoll.addEventListener("click", function(){
    if (isGameInProgress){
    const dice = Math.trunc(Math.random() * 6) + 1
    diceEl.classList.remove("hidden");
    diceEl.src = `dice-${dice}.png`;

    if (dice !== 1){
        currentScore += dice;
        document.getElementById(`current--${activePlayer}`).textContent = currentScore; 
    } else {
        switchPlayer();
        
    }
}
})

btnHold.addEventListener("click", function(){
    if (isGameInProgress){
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer];
    if (scores[activePlayer] >= 100){
        document.querySelector(`.player--${activePlayer}`).classList.add("player--winner");
        diceEl.classList.add("hidden");
        isGameInProgress = false;
    } else {    
    switchPlayer();
    }    
}
})

btnNew.addEventListener("click", function(){
    for (let i = 0; i < 2; i++){
        document.querySelector(`.player--${i}`).classList.remove("player--winner");
        scores[i] = 0;
        document.getElementById(`score--${i}`).textContent = 0;
        document.getElementById(`current--${i}`).textContent = 0;
    }
    isGameInProgress = true;
    switchPlayer();
})
