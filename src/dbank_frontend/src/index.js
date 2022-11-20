
import { dbank_backend } from "../../declarations/dbank_backend";

window.addEventListener("load", async function() {
  await queryBalance();
});

document.querySelector("#deposit").addEventListener("submit", async function(event) {
  event.preventDefault();
  
  const button = event.target.querySelector("#submit-btn");

  if(document.getElementById("input-amount").value.length == 0 || parseFloat(document.getElementById("input-amount").value) <= 0) {
    console.log("Amount must have a value more than zero");
    return;
  }

  button.setAttribute("disabled", true);
  const inputAmount = parseFloat(document.getElementById("input-amount").value);

  await dbank_backend.topUp(inputAmount);

  await queryBalance();

  document.getElementById("input-amount").value = "";
  button.removeAttribute("disabled");
});


document.querySelector("#submit-btn-withdraw").addEventListener("click", async function(event) {
  event.preventDefault();
  
  const button = event.target.querySelector("#submit-btn-withdraw");

  if(document.getElementById("withdraw-amount").value.length == 0 || parseFloat(document.getElementById("withdraw-amount").value) <= 0) {
    console.log("Amount must have a value more than zero");
    return;
  }

  const outputAmount = parseFloat(document.getElementById("withdraw-amount").value);

  await dbank_backend.withdraw(outputAmount);

  await queryBalance();
  
  document.getElementById("withdraw-amount").value = "";
});

document.querySelector("#compound-btn").addEventListener("click", async function(event) {
  event.preventDefault();
  
  dbank_backend.compound();

  await queryBalance();
});

async function queryBalance() {
  const currentAmount = await dbank_backend.checkBalance();
  document.getElementById("value").innerText = Math.round(currentAmount * 100) / 100;
}