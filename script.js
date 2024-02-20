var elDiceOne       = document.getElementById('dice1');
var elComeOut       = document.getElementById('roll');

elComeOut.onclick   = function () {rollDice();};

function rollDice() {
    var diceOne = getRandomNumber(1, 6);
    //1 -> 1
    //2 -> 5
    //3 -> 6
    //4 -> 3
    //5 -> 4
    //6 -> 2
    for (var i = 1; i <= 6; i++) {
      elDiceOne.classList.remove('show-' + i);
      if (diceOne === i) {
        elDiceOne.classList.add('show-' + i);
      }
    }
    console.log('Dice: ' + diceOne);
}
function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
