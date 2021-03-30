const UL = document.getElementById("transactions");
const balance = document.querySelector("#balance");
const moneyPlus = document.querySelector("#money-plus");
const moneyMinus = document.querySelector("#money-minus");
const form = document.querySelector("#form");
const inputName = document.querySelector("#name");
const inputAmount = document.querySelector("#amount");

const getLocalStore = JSON.parse(localStorage.getItem("item"));

let transactions = localStorage.getItem("item") !== null ? getLocalStore : [];

const removeTransaction = (id) => {
  transactions = transactions.filter((item) => item.id !== id);
  setLocalStore();
  init();
};

const transactionsOperation = (operations) => {
  const LI = document.createElement("li");
  const operation = operations.amount < 0 ? "-" : "+";
  const ClassOperation = operations.amount < 0 ? "minus" : "plus";
  const transactionsAmount = Math.abs(operations.amount);
  LI.innerHTML = `${operations.name} <span>${operation} R$ ${transactionsAmount} </span> <button class="delete-btn" onClick="removeTransaction(${operations.id})">x</button>`;
  LI.className = ClassOperation;

  UL.append(LI);
};

const getTotal = (amount) =>
  amount.reduce((acc, atual) => acc + atual, 0).toFixed(2);

const getIncome = (amount) =>
  amount
    .filter((item) => item > 0)
    .reduce((acc, total) => acc + total, 0)
    .toFixed(2);

const getExpense = (amount) =>
  Math.abs(
    amount.filter((item) => item < 0).reduce((acc, total) => acc + total, 0)
  ).toFixed(2);

const transactionsTotal = () => {
  const amount = transactions.map((item) => item.amount);
  const total = getTotal(amount);
  const income = getIncome(amount);
  const expense = getExpense(amount);

  balance.textContent = total;
  moneyPlus.textContent = `R$ ${income}`;
  moneyMinus.textContent = `R$ ${expense}`;
};

const init = () => {
  UL.innerHTML = "";
  transactions.forEach(transactionsOperation);
  transactionsTotal();
};

init();

const generateId = () => Math.round(Math.random() * 1000);

const addTransaction = (nameInput, amountInput) => {
  transactions.push({
    id: generateId(),
    name: nameInput,
    amount: Number(amountInput),
  });
};

const setLocalStore = () =>
  localStorage.setItem("item", JSON.stringify(transactions));

function handleForm(e) {
  e.preventDefault();

  const nameInput = inputName.value.trim();
  const amountInput = inputAmount.value.trim();

  if (nameInput === "" || amountInput === "") {
    alert("Preencha todos os campos");
    return;
  }

  addTransaction(nameInput, amountInput);
  setLocalStore();
  init();

  inputName.value = "";
  inputAmount.value = "";
}

form.addEventListener("submit", handleForm);