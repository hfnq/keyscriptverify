// Get REAL_KEY from URL hash
function getKeyFromURL() {
  if (location.hash.startsWith("#KEY=")) {
    return location.hash.replace("#KEY=", "");
  }
  return null;
}

// Reverse helper
function reverse(str) {
  return str.split("").reverse().join("");
}

// Simple human challenge
const challenges = [
  "i am human",
  "verify access",
  "not a robot",
  "human check"
];

const challenge =
  challenges[Math.floor(Math.random() * challenges.length)];

const status = document.getElementById("status");
const loader = document.getElementById("loader");
const humanCheck = document.getElementById("humanCheck");
const challengeText = document.getElementById("challengeText");
const challengeInput = document.getElementById("challengeInput");
const verifyBtn = document.getElementById("verifyHuman");
const keyBox = document.getElementById("keyBox");
const copyBtn = document.getElementById("copyBtn");

// Fake load delay (anti-bot)
setTimeout(() => {
  loader.style.display = "none";
  status.textContent = "Human verification required";
  challengeText.textContent = `Type exactly: "${challenge}"`;
  humanCheck.classList.remove("hidden");
}, 2000);

// Verify human + generate FINAL KEY
verifyBtn.onclick = () => {
  if (challengeInput.value.trim() !== challenge) {
    alert("Verification failed.");
    return;
  }

  const realKey = getKeyFromURL();
  if (!realKey) {
    status.textContent = "No verification key found.";
    return;
  }

  // 🔐 TRANSFORM KEY (MUST MATCH ROBLOX)
  const finalKey = `VERIFY-${reverse(realKey)}-OK`;

  humanCheck.classList.add("hidden");
  status.textContent = "Verification complete";

  keyBox.value = finalKey;
  keyBox.classList.remove("hidden");
  copyBtn.classList.remove("hidden");
};

// Copy
copyBtn.onclick = () => {
  keyBox.select();
  keyBox.setSelectionRange(0, 99999);
  navigator.clipboard.writeText(keyBox.value);
  alert("Key copied!");
};
