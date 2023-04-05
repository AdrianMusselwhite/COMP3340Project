function expandFunction(){
    
    topNavBar = document.getElementById("topNav")
    expandButton = document.getElementById("expand")

    if (topNavBar.classList.contains("expanded")){
        topNavBar.classList.remove("expanded")
        expandButton.firstElementChild.src="./images/chevron-down.svg"
    }
    else {
        topNavBar.classList.add("expanded")
        expandButton.firstElementChild.src="./images/chevron-up.svg"
    }
}

function increaseCount(a, b) {
    var input = b.previousElementSibling;
    var value = parseInt(input.value, 10);
    value = isNaN(value) ? 0 : value;
    value++;
    input.value = value;
  }
  
function decreaseCount(a, b) {
  var input = b.nextElementSibling;
  var value = parseInt(input.value, 10);
  if (value > 1) {
    value = isNaN(value) ? 0 : value;
    value--;
    input.value = value;
  }
}

let openShopping = document.querySelector('.shopping');
let closeShopping = document.querySelector('.closeShopping');
let list = document.querySelector('.list');
let listCard = document.querySelector('.listCard');
let body = document.querySelector('body');
let total = document.querySelector('.total');

openShopping.addEventListener('click', ()=>{
  body.classList.add('active');
})

closeShopping.addEventListener('click', ()=>{
  body.classList.remove('active'); 
})