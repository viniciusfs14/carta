const letters = document.querySelectorAll(".letter");
const lettersContainer = document.querySelector(".letters");
let zIndexCounter = 10;

const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
};

const shuffledThings = Array.from(letters);
shuffleArray(shuffledThings);

shuffledThings.forEach((letter) => {
  lettersContainer.appendChild(letter);
  const center = document.querySelector(".cssletter").offsetWidth / 2 - letter.offsetWidth / 2;
  letter.style.left = `${center}px`;

  function isOverflown(element) {
    return element.scrollHeight > element.clientHeight || element.scrollWidth > element.clientWidth;
  }

  if (!isOverflown(letter)) {
    letter.classList.add("center");
  }

  let offsetX, offsetY;

  const startDrag = (x, y) => {
    const rect = letter.getBoundingClientRect();
    letter.style.position = "fixed";
    letter.style.left = `${rect.left}px`;
    letter.style.top = `${rect.top}px`;
    offsetX = x - rect.left;
    offsetY = y - rect.top;
    letter.style.zIndex = zIndexCounter++;
  };

  const moveAt = (x, y) => {
    letter.style.left = `${x - offsetX}px`;
    letter.style.top = `${y - offsetY}px`;
  };

  const stopDrag = () => {
    document.removeEventListener("mousemove", onMouseMove);
    document.removeEventListener("mouseup", onMouseUp);
    document.removeEventListener("touchmove", onTouchMove);
    document.removeEventListener("touchend", onTouchEnd);
  };

  const onMouseMove = (e) => moveAt(e.clientX, e.clientY);
  const onMouseUp = () => stopDrag();

  const onTouchMove = (e) => {
    if (e.touches.length === 1) {
      moveAt(e.touches[0].clientX, e.touches[0].clientY);
    }
  };

  const onTouchEnd = () => stopDrag();

  letter.addEventListener("mousedown", (e) => {
    if (e.target.tagName !== "BUTTON") {
      e.preventDefault();
      startDrag(e.clientX, e.clientY);
      document.addEventListener("mousemove", onMouseMove);
      document.addEventListener("mouseup", onMouseUp);
    }
  });

  letter.addEventListener("touchstart", (e) => {
    if (e.target.tagName !== "BUTTON" && e.touches.length === 1) {
      startDrag(e.touches[0].clientX, e.touches[0].clientY);
      document.addEventListener("touchmove", onTouchMove, { passive: false });
      document.addEventListener("touchend", onTouchEnd);
    }
  });
});

// Botão para abrir envelope
document.querySelector("#openEnvelope").addEventListener("click", () => {
  document.querySelector(".envelope").classList.add("active");
});

// Botões para fechar cartas
const closeButtons = document.querySelectorAll(".closeLetter");
closeButtons.forEach((button) => {
  button.addEventListener("click", (e) => {
    e.preventDefault();
    const letter = e.target.closest(".letter");
    if (letter) {
      letter.style.display = "none";
    }
  });
});
