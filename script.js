const humanCheck = document.getElementById("humanCheck");
const verifyBtn = document.getElementById("verifyBtn");
const mathQuestion = document.getElementById("mathQuestion");
const mathAnswer = document.getElementById("mathAnswer");
const result = document.getElementById("result");
const keyBox = document.getElementById("keyBox");
const copyBtn = document.getElementById("copyBtn");

let a = Math.floor(Math.random() * 10) + 1;
let b = Math.floor(Math.random() * 10) + 1;
mathQuestion.textContent = `What is ${a} + ${b}?`;

let allowVerify = false;

// Delay to block instant bots
setTimeout(() => {
  allowVerify = true;
}, 3000);

humanCheck.addEventListener("change", () => {
  verifyBtn.disabled = !humanCheck.checked;
});

verifyBtn.addEventListener("click", () => {
  if (!allowVerify) {
    alert("Please wait a moment before verifying.");
    return;
  }

  if (parseInt(mathAnswer.value) !== a + b) {
    alert("Incorrect answer.");
    return;
  }

  // Generate + invert key
  const rawKey = "KEY-" + Math.random().toString(36).substring(2, 14).toUpperCase();
  const inverted = rawKey.split("").reverse().join("");

  keyBox.value = inverted;
  result.classList.remove("hidden");
});

copyBtn.addEventListener("click", () => {
  keyBox.select();
  document.execCommand("copy");
  copyBtn.textContent = "Copied!";
  setTimeout(() => copyBtn.textContent = "Copy Key", 1500);
});
