const modal = document.getElementById("modal");
const buttons = document.getElementById("buttons");
const question = document.getElementById("question");
const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");
const message = document.getElementById("message");
const sticker = document.getElementById("sticker");

let allowMove = true; // A/Ф удерживается — "Нет" не двигается

// Блокируем движение "Нет" при зажатой A/Ф (латиница/кириллица)
document.addEventListener("keydown", (e) => {
  const k = e.key.toLowerCase();
  if (k === "a" || k === "ф") allowMove = false;
});
document.addEventListener("keyup", (e) => {
  const k = e.key.toLowerCase();
  if (k === "a" || k === "ф") allowMove = true;
});

// Телепортируем "Нет" внутри области .buttons
function teleportNo() {
  if (!allowMove) return;

  const areaRect = buttons.getBoundingClientRect();
  const btnRect = noBtn.getBoundingClientRect();

  const maxX = areaRect.width - btnRect.width;
  const maxY = areaRect.height - btnRect.height;

  const x = Math.random() * Math.max(10, maxX);
  const y = Math.random() * Math.max(10, maxY);

  // Позиция относительно контейнера .buttons
  noBtn.style.left = x + "px";
  noBtn.style.top = y + "px";
  noBtn.style.transform = "none";
}

// На ПК — телепорт при наведении
noBtn.addEventListener("mouseover", teleportNo);

// На телефоне — телепорт при касании
noBtn.addEventListener("touchstart", (e) => {
  teleportNo();
  // Показ стикера сразу на телефоне при касании, чтобы пользователь увидел реакцию
  showSticker();
}, { passive: true });

// Показ стикера при клике на "Нет"
noBtn.addEventListener("mousedown", showSticker); // сработает даже если кнопка потом телепортируется
noBtn.addEventListener("click", showSticker);

function showSticker() {
  sticker.style.display = "block";
  // Небольшое «всплытие» стикера для живости
  sticker.animate(
    [{ transform: "translateY(6px)", opacity: 0 }, { transform: "translateY(0)", opacity: 1 }],
    { duration: 180, easing: "ease-out", fill: "forwards" }
  );
}

// По клику на "Да" — убираем вопрос и кнопки, показываем сообщение и запускаем конфетти
yesBtn.addEventListener("click", () => {
  buttons.style.display = "none";
  question.style.display = "none";
  message.style.display = "block";

  launchConfetti();
});

// Конфетти разлетаются из центра надписи "Я так и знала!"
function launchConfetti(count = 90) {
  const rect = message.getBoundingClientRect();
  const originX = rect.left + rect.width / 2;
  const originY = rect.top + rect.height / 2;

  for (let i = 0; i < count; i++) {
    const piece = document.createElement("div");
    piece.className = "confetti";

    piece.style.backgroundColor = `hsl(${Math.random() * 360}, 90%, 55%)`;

    // Позиционируем относительно модального окна
    const modalRect = modal.getBoundingClientRect();
    piece.style.left = originX - modalRect.left + "px";
    piece.style.top = originY - modalRect.top + "px";

    const angle = Math.random() * Math.PI * 2;
    const distance = 80 + Math.random() * 160;
    const x = Math.cos(angle) * distance + "px";
    const y = Math.sin(angle) * distance + "px";
    piece.style.setProperty("--x", x);
    piece.style.setProperty("--y", y);

    modal.appendChild(piece);
    setTimeout(() => piece.remove(), 2000);
  }
}
