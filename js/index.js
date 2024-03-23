let runners = ["ferrari", "aston", "haas", "mclaren", "redbull"];

let winner;
let timer;
let userBalance = 100;
let raceFinished = false;
let speedway = document.getElementById("speedway").getBoundingClientRect();
let speedwayWidth = speedway.width;

const amountInput = document.getElementById("amountInput");
const runnersSelect = document.getElementById("runnersSelect");
const makeBetButton = document.getElementById("makeBetButton");
const retryButton = document.getElementById("retryButton");

<h1>Urubu do Pix</h1>

let userBalanceElement = document.getElementById("user-balance");
let bet = {
  runnerId: "",
  amount: 0,
}

function startRace() {
  timer = setInterval(moveRunners, 50);
}

function stopRace() {
  clearInterval();
}

function makeABet() {
  let amount = amountInput.value;
  let runnerSelected = runnersSelect.value;

  if (amount < 5) {
    alert("The minimum amount is $5!");
    amountInput.value = "";
    return;
  }
  
  if (amount > userBalance) {
    alert("You don't have enough balance!");
    amountInput.value = "";
    return;
  }
  
  bet.amount = amount;
  bet.runnerId = runnerSelected;

  debit(amount);
  makeBetButton.disabled = true;
  retryButton.disabled = true;
  startRace();
}

function debit(amount) {
  userBalance -= amount;
  userBalanceElement.innerHTML = "$" + userBalance;
}

function moveRunners() {
  if (raceFinished == false) {
    runners.forEach((id) => {
      let randomNumber = Math.floor(Math.random() * 11);
      let element = document.getElementById(id);
      let currentPosition = element.getBoundingClientRect().x;
      let newPosition = currentPosition + randomNumber;

      element.style.translate = newPosition + "px";

      if (newPosition + 100 >= speedwayWidth) {
        winner = id;
        raceFinished = true;
      }
    });

    if (raceFinished) {
      if (winner === bet.runnerId) {
        alert("You won!");
        userBalance += 2 * bet.amount;
        userBalanceElement.innerHTML = "$" + userBalance;
      } else {
        alert("You lost!");
      }
      clearInterval(timer);
      retryButton.disabled = false;
    }

  }
}

function retryBet() {
  runners.forEach(id => {
    let element = document.getElementById(id);
    element.style.translate = "0px";
  });
  makeBetButton.disabled = false;
  retryButton.disabled = true;
  raceFinished = false;
  timer = clearInterval();
}
