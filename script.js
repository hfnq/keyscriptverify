document.addEventListener("DOMContentLoaded", () => {

  function getKeyFromURL() {
    if (location.hash.startsWith("#KEY=")) {
      return location.hash.replace("#KEY=", "");
    }
    return null;
  }

  function reverse(str) {
    return str.split("").reverse().join("");
  }

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

  if (!verifyBtn) {
    alert("JS failed to load properly. Hard refresh the page.");
    return;
  }

  // Fake loading delay
  setTimeout(() => {
    loader.style.display = "none";
    status.textContent = "Human verification required";
    challengeText.textContent = `Type exactly: "${challenge}"`;
    humanCheck.classList.remove("hidden");
  }, 2000);

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

    const finalKey = `VERIFY-${reverse(realKey)}-OK`;

    humanCheck.classList.add("hidden");
    status.textContent = "Verification complete";

    keyBox.value = finalKey;
    keyBox.classList.remove("hidden");
    copyBtn.classList.remove("hidden");
  });

  copyBtn.addEventListener("click", () => {
    keyBox.select();
    keyBox.setSelectionRange(0, 99999);
    navigator.clipboard.writeText(keyBox.value);
    alert("Key copied!");
  });

});
