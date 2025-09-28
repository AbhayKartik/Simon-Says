let gameseq = [];
let userseq = [];
let color = ["pink", "cadetblue", "orange", "blue"];
let start = false;
let level = 0;
let highScore = 0;
let h3 = document.querySelector("h3");

document.addEventListener("keypress", function () {
  if (start == false) {
    start = true;
    levelUp();
  }
});

function btnFlash(btn) {
  btn.classList.add("flash");

  setTimeout(function () {
    btn.classList.remove("flash");
  }, 250);
}

function userFlash(btn) {
  btn.classList.add("userFlash");
  setTimeout(function () {
    btn.classList.remove("userFlash");
  }, 250);
}

function levelUp() {
  userseq = [];
  level++;
  h3.innerText = `Level ${level}`;

  let idx = Math.floor(Math.random() * 3);
  let randomColor = color[idx];
  let randomBtn = document.querySelector(`.${randomColor}`);

  gameseq.push(randomColor);
  btnFlash(randomBtn);
}

function checkAns(idx) {
  if (userseq[idx] === gameseq[idx]) {
    if (userseq.length == gameseq.length) {
      setTimeout(levelUp, 1000);
    }
  } else {
    if (highScore < level) {
      highScore = level;
    }
    h3.innerHTML = `Game Over! Your Score Was <b> ${level}</b><br> And Your High Score is <b> ${highScore}</b><br> Press Any Key to start `;
    document.querySelector("body").style.backgroundColor = "red";
    setTimeout(function () {
      document.querySelector("body").style.backgroundColor = "white";
    }, 150);
    reset();
  }
}

function btnPress() {
  let btn = this;
  userFlash(btn);

  userColor = btn.getAttribute("id");
  userseq.push(userColor);

  checkAns(userseq.length - 1);
}

let btns = document.querySelectorAll(".btn");
for (btn of btns) {
  btn.addEventListener("click", btnPress);
}

function reset() {
  start = false;
  userseq = [];
  gameseq = [];
  level = 0;
}
