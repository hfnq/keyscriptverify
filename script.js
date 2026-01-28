document.addEventListener("DOMContentLoaded", () => {

  // Get REAL_KEY from URL
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

  // Human challenges
  const challenges = [
    "i am human",
    "verify access",
    "not a robot",
    "human check"
  ];

  const challenge =
    challenges[Math.floor(Math.random() * challenges.length)];

  // Elements
  const status = document.getElementById("status");
  const loader = document.getElementById("loader");
  const humanCheck = document.getElementById("humanCheck");
  const challengeText = document.getElementById("challengeText");
  const challengeInput = document.getElementById("challengeInput");
  const verifyBtn = document.getElementById("verifyHuman");
  const keyBox = document.getElementById("keyBox");
  const copyBtn = document.getElementById("copyBtn");

  // Fake loading delay
  setTimeout(() => {
    loader.style.display = "none";
    status.textContent = "Human verification required";
    challengeText.textContent = `Type exactly: "${challenge}"`;
    humanCheck.classList.remove("hidden");
  }, 2000);

  // Verify human
  verifyBtn.addEventListener("click", () => {
    if (challengeInput.value.trim() !== challenge) {
      alert("Verification failed.");
      return;
    }

    const realKey = getKeyFromURL();
    if (!realKey) {
      status.textContent = "No verification key found.";
      return;
    }

    // 🔐 FINAL KEY (must match Roblox)
    const finalKey = `VERIFY-${reverse(realKey)}-OK`;

    humanCheck.classList.add("hidden");
    status.textContent = "Verification complete";

    keyBox.value = finalKey;
    keyBox.classList.remove("hidden");
    copyBtn.classList.remove("hidden");
  });

  // Copy key
  copyBtn.addEventListener("click", () => {
    keyBox.select();
    keyBox.setSelectionRange(0, 99999);
    navigator.clipboard.writeText(keyBox.value);
    alert("Key copied!");
  });

});
