const timeLeftDisplay = document.querySelector("#time-left");
const pointsDisplay = document.querySelector("#points");
const resultDispaly = document.querySelector("#result");
const startPauseBtn = document.querySelector("#btn-start-pause");
const restartBtn = document.querySelector("#btn-restart");
const squares = document.querySelectorAll(".grid div");
const logsLeft = document.querySelectorAll(".log-left");
const logsRight = document.querySelectorAll(".log-right");
const carsLeft = document.querySelectorAll(".car-left");
const carsRight = document.querySelectorAll(".car-right");

const startSquare = 76;
let currentSquare = startSquare;
const witdh = 9;
let timerId;
let currentTime = 20;
let points = 0;
const startInterval = 1500;
let currentInterval = startInterval;

const moveFrog = (e) => {
  squares[currentSquare].classList.remove("frog");
  switch (e.key) {
    case "w":
      if (currentSquare - witdh >= 0) currentSquare -= witdh;
      break;
    case "s":
      if (currentSquare + witdh < witdh * witdh) currentSquare += witdh;
      break;
    case "d":
      if (currentSquare % witdh < witdh - 1) currentSquare += 1;
      break;
    case "a":
      if (currentSquare % witdh !== 0) currentSquare -= 1;
      break;
  }
  squares[currentSquare].classList.add("frog");
  lose();
  win();
};

const autoMoveEl = () => {
  currentTime -= 1;
  timeLeftDisplay.textContent = currentTime;
  lose();
  logsLeft.forEach((logLeft) => moveLogLeft(logLeft));
  logsRight.forEach((logRight) => moveLogRight(logRight));
  carsLeft.forEach((carLeft) => moveCarLeft(carLeft));
  carsRight.forEach((carRight) => moveCarRight(carRight));
  console.log(currentInterval);
};

const moveLogLeft = (logLeft) => {
  switch (true) {
    case logLeft.classList.contains("l1"):
      logLeft.classList.remove("l1");
      logLeft.classList.add("l2");
      break;
    case logLeft.classList.contains("l2"):
      logLeft.classList.remove("l2");
      logLeft.classList.add("l3");
      break;
    case logLeft.classList.contains("l3"):
      logLeft.classList.remove("l3");
      logLeft.classList.add("l4");
      break;
    case logLeft.classList.contains("l4"):
      logLeft.classList.remove("l4");
      logLeft.classList.add("l5");
      break;
    case logLeft.classList.contains("l5"):
      logLeft.classList.remove("l5");
      logLeft.classList.add("l1");
      break;
  }
};

const moveLogRight = (logRight) => {
  switch (true) {
    case logRight.classList.contains("l1"):
      logRight.classList.remove("l1");
      logRight.classList.add("l5");
      break;
    case logRight.classList.contains("l2"):
      logRight.classList.remove("l2");
      logRight.classList.add("l1");
      break;
    case logRight.classList.contains("l3"):
      logRight.classList.remove("l3");
      logRight.classList.add("l2");
      break;
    case logRight.classList.contains("l4"):
      logRight.classList.remove("l4");
      logRight.classList.add("l3");
      break;
    case logRight.classList.contains("l5"):
      logRight.classList.remove("l5");
      logRight.classList.add("l4");
      break;
  }
};

const moveCarLeft = (carLeft) => {
  switch (true) {
    case carLeft.classList.contains("c1"):
      carLeft.classList.remove("c1");
      carLeft.classList.add("c2");
      break;
    case carLeft.classList.contains("c2"):
      carLeft.classList.remove("c2");
      carLeft.classList.add("c3");
      break;
    case carLeft.classList.contains("c3"):
      carLeft.classList.remove("c3");
      carLeft.classList.add("c1");
  }
};

const moveCarRight = (carRight) => {
  switch (true) {
    case carRight.classList.contains("c1"):
      carRight.classList.remove("c1");
      carRight.classList.add("c3");
      break;
    case carRight.classList.contains("c2"):
      carRight.classList.remove("c2");
      carRight.classList.add("c1");
      break;
    case carRight.classList.contains("c3"):
      carRight.classList.remove("c3");
      carRight.classList.add("c2");
      break;
  }
};

const lose = () => {
  if (
    squares[currentSquare].classList.contains("c1") ||
    squares[currentSquare].classList.contains("l4") ||
    squares[currentSquare].classList.contains("l5") ||
    currentTime <= 0
  ) {
    resultDispaly.textContent = "You Lose!";
    clearInterval(timerId);
    squares[currentSquare].classList.remove("frog");
    document.removeEventListener("keyup", moveFrog);
  }
};

const win = () => {
  if (squares[currentSquare].classList.contains("end-square")) {
    clearInterval(timerId);
    document.removeEventListener("keyup", moveFrog);
    resultDispaly.textContent = "You Win!";
    points += 1;
    pointsDisplay.textContent = points;
    squares[currentSquare].classList.remove("frog");
    squares[startSquare].classList.add("frog");
    currentSquare = startSquare;
    setTimeout(() => {
      currentInterval = currentInterval * 0.9;
      currentTime = 20;
      timeLeftDisplay.textContent = currentTime;
      timerId = setInterval(autoMoveEl, currentInterval);
      resultDispaly.textContent = "";
      document.addEventListener("keyup", moveFrog);
    }, 1000);
  }
};

startPauseBtn.addEventListener("click", () => {
  if (timerId) {
    clearInterval(timerId);
    timerId = null;
    document.removeEventListener("keyup", moveFrog);
  } else {
    timerId = setInterval(autoMoveEl, startInterval);
    document.addEventListener("keyup", moveFrog);
  }
});

restartBtn.addEventListener("click", () => {
  clearInterval(timerId);
  points = 0;
  pointsDisplay.textContent = points;
  resultDispaly.textContent = "";
  currentTime = 20;
  timeLeftDisplay.textContent = currentTime;
  squares[currentSquare].classList.remove("frog");
  squares[startSquare].classList.add("frog");
  currentSquare = startSquare;
  currentInterval = startInterval;
  timerId = setInterval(autoMoveEl, currentInterval);
});
