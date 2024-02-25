var elDiceOne = document.getElementById('dice1');
var elComeOut = document.getElementById('roll');
var elInfoForm = document.getElementById('infoForm');
var gameDiceElement = document.getElementById("gameDice");
var diceOne;
window.addEventListener('load', handlePageLoad);
function handlePageLoad() {
  var playedStatus = localStorage.getItem('status');
  var getGiftElement = document.getElementById('get-coupon');
  gameDiceElement.classList.remove("d-none");
    if (playedStatus === 'played' || playedStatus === 'got') {
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

    if(diceOne == 1){
      setTimeout(function() {
      $('.voucher-game1').addClass('congratulations-effect');
  
      }, 1500);
      setTimeout(function() {
        $('.voucher-game1').removeClass('congratulations-effect');
        }, 2500);
    }
    if(diceOne == 2){
      setTimeout(function() {
      $('.voucher-game5').addClass('congratulations-effect');
  
      }, 1500);
      setTimeout(function() {
        $('.voucher-game5').removeClass('congratulations-effect');
        }, 2500);
    }
    if(diceOne == 3){
      setTimeout(function() {
      $('.voucher-game6').addClass('congratulations-effect');
  
      }, 1500);
      setTimeout(function() {
        $('.voucher-game6').removeClass('congratulations-effect');
        }, 2500);
    }
    if(diceOne == 4){
      setTimeout(function() {
      $('.voucher-game3').addClass('congratulations-effect');
  
      }, 1500);
      setTimeout(function() {
        $('.voucher-game3').removeClass('congratulations-effect');
        }, 2500);
    }
    if(diceOne == 5){
      setTimeout(function() {
      $('.voucher-game4').addClass('congratulations-effect');
  
      }, 1500);
      setTimeout(function() {
        $('.voucher-game4').removeClass('congratulations-effect');
        }, 2500);
    }
    if(diceOne == 6){
      setTimeout(function() {
      $('.voucher-game2').addClass('congratulations-effect');
  
      }, 1500)
      setTimeout(function() {
        $('.voucher-game2').removeClass('congratulations-effect');
        }, 2500);
    }
      
    setTimeout(function () {
      getInfo();
      handlePageLoad() 
    }, 3000);
  }

};
document.getElementById("btnGetCP").addEventListener("click", function() {
  var playedStatus = localStorage.getItem('status');
  var getCoupon = localStorage.getItem('coupon');
  if (playedStatus === 'got') {
    alert('Bạn đã nhận thưởng rồi!! Mã giảm giá của bạn là: ' + getCoupon)

  }else{
  $('#modalInfo').modal('show');
  gameDiceElement.classList.add("d-none");
  }
 

});

$(document).ready(function() {
  $("#submitBtn").click(function() {
    $("#infoForm").submit();
  });

  $("#infoForm").submit(function(e) {
    e.preventDefault();

    if (this.checkValidity()) {
      let Icoupon = document.getElementById('coupon');
      let Idescription = document.getElementById('description');  
      var getCoupon = localStorage.getItem('coupon');
      var getDes = localStorage.getItem('description');
      $('#modalInfo').modal('hide');
      $('#modalCoupon').modal('show');
      gameDiceElement.classList.add("d-none");
    
      Idescription.innerHTML = 'Bạn đã nhận được: ' + getDes;
      Icoupon.innerHTML = 'Mã giảm giá của bạn là: ' + getCoupon;
    
      localStorage.setItem('status', 'got');

    } else {
      alert('Form không hợp lệ. Vui lòng kiểm tra lại thông tin của bạn.');
    }
  });
});

function rollWeightedDice() {
  var weightedResults = {
    1: 0.15, //100k
    2: 0.05, //500k
    3: 0, //600k
    4: 0.3, //300k
    5: 0.2, //400k
    6: 0.3   //200k
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
    $('#modalInfo').modal('show');
    gameDiceElement.classList.add("d-none");
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
        coupon.code = 'SALE-KV100K';
        coupon.description = 'Voucher giá trị 100K';
    } else if (diceOne == 6) {
        coupon.code = 'KV-200K';
        coupon.description = 'Voucher giá trị 200K';
    } else if (diceOne == 4) {
        coupon.code = 'SALE-300K';
        coupon.description = 'Voucher giá trị 300K';
    } else if (diceOne == 5) {
        coupon.code = '2024-400K';
        coupon.description = 'Voucher giá trị 400K';
    } else if (diceOne == 2) {
        coupon.code = 'KM-500K';
        coupon.description = 'Voucher giá trị 500K';
    } else if (diceOne == 3) {
        coupon.code = 'FL-SALE-600';
        coupon.description = 'Voucher giá trị 600K';
    }  else {
        coupon.code = 'SALE-KV100K';
        coupon.description = 'Voucher giá trị 100K';
    }
    return coupon;
}


$(document).ready(function() {
  $('#DSTTDICE').DataTable({
    "language": {
      "lengthMenu": "Hiển thị _MENU_ dòng",
      "zeroRecords": "Không tìm thấy dữ liệu",
      "info": "Hiển thị _START_ đến _END_ của _TOTAL_ dòng",
      "infoEmpty": "Hiển thị 0 đến 0 của 0 dòng",
      "infoFiltered": "(được lọc từ _MAX_ tổng số dòng)",
      "search": "Tìm kiếm:",
      "paginate": {
        "first": "Đầu tiên",
        "previous": "Trước",
        "next": "Tiếp",
        "last": "Cuối cùng"
      }
    }
  });
});


  $(document).ready(function(){
    $(".owl-carousel").owlCarousel({
      items: 5, // Số lượng sản phẩm hiển thị trên mỗi trang
      loop: true, // Lặp lại carousel
      margin: 10, // Khoảng cách giữa các sản phẩm
      autoplay: true, // Tự động chạy
      autoplayTimeout: 5000, 
      nav: true,
      dots: false,
      responsive: {
        0: {
          items: 2
        },
        600: {
          items: 3
        },
        1000: {
          items: 5
        }
      }
    });
  });
