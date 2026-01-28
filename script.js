function getKeyFromURL() {
  if (window.location.hash.startsWith("#KEY=")) {
    return window.location.hash.replace("#KEY=", "");
  }
  return null;
}

const challenges = [
  "I am human",
  "verify access",
  "not a robot",
  "type this text",
  "human verification"
];

const challenge =
  challenges[Math.floor(Math.random() * challenges.length)];

setTimeout(() => {
  document.getElementById("loader").style.display = "none";
  document.getElementById("status").innerText =
    "Human verification required";

  document.getElementById("challengeText").innerText =
    `Type exactly: "${challenge}"`;

  document.getElementById("humanCheck").style.display = "block";
}, 2000);

document.getElementById("verifyHuman").onclick = () => {
  const input =
    document.getElementById("challengeInput").value.trim();

  if (input !== challenge) {
    alert("Verification failed. Try again.");
    return;
  }

  const key = getKeyFromURL();
  if (!key) {
    document.getElementById("status").innerText =
      "No verification key found.";
    return;
  }

  document.getElementById("humanCheck").style.display = "none";
  document.getElementById("status").innerText =
    "Verification complete";

  document.getElementById("keyBox").style.display = "block";
  document.getElementById("copyBtn").style.display = "block";
  document.getElementById("keyBox").value = key;
};

document.getElementById("copyBtn").onclick = () => {
  const box = document.getElementById("keyBox");
  box.select();
  box.setSelectionRange(0, 99999);
  navigator.clipboard.writeText(box.value);
  alert("Key copied!");
};
