var elDiceOne = document.getElementById('dice1');
var elComeOut = document.getElementById('roll');
var elInfoForm = document.getElementById('infoForm');
elComeOut.onclick = function () {
  rollWeightedDice();
  openModal()
};

function rollWeightedDice() {
  var weightedResults = {
    1: 0.2, //1
    2: 0.2, //5
    3: 0.2, //6
    4: 0.2, //3
    5: 0.2, //4
    6: 0    //2
  };

  var totalWeight = Object.values(weightedResults).reduce((a, b) => a + b, 0);

  var randomValue = Math.random() * totalWeight;
  var cumulativeWeight = 0;
  var diceOne;

  for (var key in weightedResults) {
    if (weightedResults.hasOwnProperty(key)) {
      cumulativeWeight += weightedResults[key];
      if (randomValue <= cumulativeWeight) {
        diceOne = parseInt(key);
        break;
      }
    }
  }

  updateDiceDisplay(diceOne);
  console.log('Dice: ' + diceOne);
}

function updateDiceDisplay(result) {
  for (var i = 1; i <= 6; i++) {
    elDiceOne.classList.remove('show-' + i);
    if (result === i) {
      elDiceOne.classList.add('show-' + i);
    }
  }
}
function openModal() {
    document.getElementById('infoModal').classList.remove('d-none');
  }
  
  function closeModal() {
    document.getElementById('infoModal').classList.add('d-none');
  }