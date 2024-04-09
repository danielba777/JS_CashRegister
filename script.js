let price = 1.87;
let cid = [
  ["PENNY", 1.01],
  ["NICKEL", 2.05],
  ["DIME", 3.10],
  ["QUARTER", 4.25],
  ["ONE", 90.00],
  ["FIVE", 55.00],
  ["TEN", 20.00],
  ["TWENTY", 60.00],
  ["ONE HUNDRED", 100.00]
];

const changeDrawer = document.getElementById("change-drawer");
const cashInput = document.getElementById("cash");
const purchaseBtn = document.getElementById("purchase-btn");
const cashRegisterDisplay = document.getElementById("cash-register-display");
const changeDue = document.getElementById("change-due");

const updateCid = () =>{
  changeDrawer.innerHTML = `
  <p class="p-header">Change in drawer:</p>
  <p>Pennies: $${cid[0][1]}</p>
  <p>Nickels: $${cid[1][1]}</p>
  <p>Dimes: $${cid[2][1]}</p>
  <p>Quarters: $${cid[3][1]}</p>
  <p>Ones: $${cid[4][1]}</p>
  <p>Fives: $${cid[5][1]}</p>
  <p>Tens: $${cid[6][1]}</p>
  <p>Twenties: $${cid[7][1]}</p>
  <p>Hundreds: $${cid[8][1]}</p>
  ` 
}

const updatePrice = () =>{
  cashRegisterDisplay.innerHTML = `
  <p>Total: $${price}</p>
  `
}

updateCid();
updatePrice();

const cidStock = () =>{
  let sum = 0;
  for(let i=0; i<9; i++){
    
    sum += cid[i][1];
    
  }

  sum = Math.round(sum*100)/100;

  return sum;
}

const change = (cash) =>{

  if(cash < price){
    alert("Customer does not have enough money to purchase the item");
    return;
  }

  if(cash == price){
    changeDue.innerHTML = `No change due - customer paid with exact cash`;
    return;
  }

  let displayChange = ``;
  const copyCid = JSON.parse(JSON.stringify(cid))
  let changeAmountLeft = cash - price;
  changeAmountLeft = (changeAmountLeft * 100) / 100;

  let isClosed = false;

  if (changeAmountLeft == cidStock()){
    changeDue.innerHTML += `<p>Status: CLOSED</p>`;
    isClosed = true;
  }

  console.log(changeAmountLeft);
  console.log(cidStock());

  if(changeAmountLeft > cidStock()){
    changeDue.innerHTML += `<p>Status: INSUFFICIENT_FUNDS</p>`;
    return;
  }

  while(changeAmountLeft >= 100){
    if(cid[8][1] >= 100){
      
      changeAmountLeft -= 100;
      cid[8][1] -= 100;
    }
  }
  while(changeAmountLeft >= 20){
    if(cid[7][1] >= 20){
      
      changeAmountLeft -= 20;
      cid[7][1] -= 20;
    }
  }
  while(changeAmountLeft >= 10){
    if(cid[6][1] >= 10){
      
      changeAmountLeft -= 10;
      cid[6][1] -= 10;
    }
  }
  while(changeAmountLeft >= 5){
    if(cid[5][1] >= 5){
      
      changeAmountLeft -= 5;
      cid[5][1] -= 5;
    }
  }
  while(changeAmountLeft >= 1){
    if(cid[4][1] >= 1){
      
      changeAmountLeft -= 1;
      cid[4][1] -= 1;
    }
  }
  while(changeAmountLeft >= 0.25){
    if(cid[3][1] >= 0.25){
      
      changeAmountLeft -= 0.25;
      cid[3][1] -= 0.25;
    }
    changeAmountLeft = changeAmountLeft.toFixed(2);
  }
  while(changeAmountLeft >= 0.10){
    if(cid[2][1] >= 0.10){
      
      changeAmountLeft -= 0.10;
      cid[2][1] -= 0.10;
    }
    changeAmountLeft = changeAmountLeft.toFixed(2);
  }
  while(changeAmountLeft >= 0.05){
    if(cid[1][1] >= 0.05){
      
      changeAmountLeft -= 0.05;
      cid[1][1] -= 0.05;
    }
    changeAmountLeft = changeAmountLeft.toFixed(2);
  }
  while(changeAmountLeft >= 0.01){
    if(cid[0][1] >= 0.01){
      
      changeAmountLeft -= 0.01;
      cid[0][1] -= 0.01;
    }
    changeAmountLeft = changeAmountLeft.toFixed(2);
  }

  for(let i=8;i>=0;i--){
    if(copyCid[i][1] !== cid[i][1]){
      let sum = (copyCid[i][1]-cid[i][1]).toFixed(2);
      displayChange += `<p>${cid[i][0]}: $${sum}</p>`;
    }
  }

  updateCid();

  if(!isClosed){ 
    changeDue.innerHTML += `<p>Status: OPEN</p>`;
  }
  changeDue.innerHTML += displayChange;
}

purchaseBtn.addEventListener("click", () =>{
  change(cashInput.value);
})



