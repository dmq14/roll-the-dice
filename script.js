var elDiceOne = document.getElementById('dice1');
var elComeOut = document.getElementById('roll');
var elInfoForm = document.getElementById('infoForm');
var diceOne;
window.addEventListener('load', handlePageLoad);
function handlePageLoad() {
  var playedStatus = localStorage.getItem('status');
  var getGiftElement = document.getElementById('get-coupon');
    if (playedStatus === 'played') {
      getGiftElement.style.display = 'block';

    }else{
      getGiftElement.style.display = 'none';
    }
}
elComeOut.onclick = function () {
  var storedStatus = localStorage.getItem('status');
  if (storedStatus && storedStatus === 'played') {
    alert('Mỗi người chơi chỉ có 1 lượt thử vận may!!!')
  }else{
    rollWeightedDice();
    setTimeout(function () {
      getInfo();
      handlePageLoad() 
    }, 1500);
  }

};

function rollWeightedDice() {
  var weightedResults = {
    1: 0.2, //1
    2: 0.2, //5
    3: 0, //6
    4: 0.2, //3
    5: 0.2, //4
    6: 0.2   //2
  };

  var totalWeight = Object.values(weightedResults).reduce((a, b) => a + b, 0);

  var randomValue = Math.random() * totalWeight;
  var cumulativeWeight = 0;


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
}

function updateDiceDisplay(result) {
  for (var i = 1; i <= 6; i++) {
    elDiceOne.classList.remove('show-' + i);
    if (result === i) {
      elDiceOne.classList.add('show-' + i);
    }
  }
}
function getInfo() {

    var coupon = checkPoint(diceOne);
    $('#modalCoupon').modal('show');
    localStorage.setItem('status', 'played');
    localStorage.setItem('dice', diceOne);
    localStorage.setItem('coupon', coupon.code);
    localStorage.setItem('description', coupon.description);

}

function checkPoint() {
    var coupon = {
        code: '',
        description: ''
    };
    
    if (diceOne == 1) {
        coupon.code = 'SALE-Q100';
        coupon.description = 'Coupon giá trị 100K';
    } else if (diceOne == 6) {
        coupon.code = 'SALE-E200';
        coupon.description = 'Coupon giá trị 200K';
    } else if (diceOne == 4) {
        coupon.code = 'SALE-T300';
        coupon.description = 'Coupon giá trị 300K';
    } else if (diceOne == 5) {
        coupon.code = 'SALE-Y400';
        coupon.description = 'Coupon giá trị 400K';
    } else if (diceOne == 2) {
        coupon.code = 'SALE-P500';
        coupon.description = 'Coupon giá trị 500K';
    } else if (diceOne == 3) {
        coupon.code = 'SALE-M600';
        coupon.description = 'Coupon giá trị 600K';
    }  else {
        coupon.code = 'SALE-CD34';
        coupon.description = 'Coupon giá trị 100K';
    }
    return coupon;
}