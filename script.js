const noBtn = document.getElementById("noBtn");
const yesBtn = document.getElementById("yesBtn");
const message = document.getElementById("message");
const angry = document.getElementById("angry");
const buttons = document.getElementById("buttons");
const question = document.getElementById("question");

let allowMove = true; // по умолчанию кнопка "Нет" двигается

// Следим за клавишами A/Ф
document.addEventListener("keydown", (e) => {
  if (e.key.toLowerCase() === "a" || e.key.toLowerCase() === "ф") {
    allowMove = false;
  }
});
document.addEventListener("keyup", (e) => {
  if (e.key.toLowerCase() === "a" || e.key.toLowerCase() === "ф") {
    allowMove = true;
  }
});

// Кнопка "Нет" убегает при наведении и на телефоне
noBtn.addEventListener("mouseover", teleportNo);
noBtn.addEventListener("touchstart", teleportNo);

function teleportNo() {
  if (!allowMove) return; // если зажата A/Ф — не двигается
  const x = Math.random() * (window.innerWidth - noBtn.offsetWidth);
  const y = Math.random() * (window.innerHeight - noBtn.offsetHeight);
  noBtn.style.position = "absolute";
  noBtn.style.left = x + "px";
  noBtn.style.top = y + "px";
}

// При клике на "Нет" с Ctrl — злой смайлик
noBtn.addEventListener("click", (e) => {
  if (e.ctrlKey) {
    angry.style.display = "block";
    setTimeout(() => (angry.style.display = "none"), 2000);
  }
});

// При клике на "Да" — убираем кнопки и вопрос, показываем сообщение и конфетти
yesBtn.addEventListener("click", () => {
  buttons.style.display = "none";
  question.style.display = "none";
  message.style.display = "block";

  for (let i = 0; i < 100; i++) {
    createConfetti();
  }
});

function createConfetti() {
  const confetti = document.createElement("div");
  confetti.classList.add("confetti");

  // случайный цвет
  confetti.style.backgroundColor = `hsl(${Math.random() * 360}, 100%, 50%)`;

  // позиция относительно текста
  const rect = message.getBoundingClientRect();
  confetti.style.left = rect.left + rect.width / 2 + "px";
  confetti.style.top = rect.top + rect.height / 2 + "px";

  // случайное направление
  const angle = Math.random() * 2 * Math.PI;
  const distance = Math.random() * 300 + 50;
  const x = Math.cos(angle) * distance + "px";
  const y = Math.sin(angle) * distance + "px";
  confetti.style.setProperty("--x", x);
  confetti.style.setProperty("--y", y);

  document.body.appendChild(confetti);

  setTimeout(() => confetti.remove(), 2000);
}