function getKey() {
  if (location.hash.startsWith("#KEY=")) {
    return location.hash.replace("#KEY=", "");
  }
  return null;
}

const phrases = [
  "I am human",
  "verify access",
  "not a robot",
  "manual verification"
];

const phrase = phrases[Math.floor(Math.random() * phrases.length)];

let left = false, right = false, middle = false, f12 = false;

// STEP 0 – Delay
setTimeout(() => {
  document.getElementById("loader").style.display = "none";
  document.getElementById("status").innerText = "Step 1: Type verification";

  document.getElementById("challengeText").innerText =
    `Type exactly: "${phrase}"`;

  document.getElementById("stepTyping").style.display = "block";
}, 2000);

// STEP 1 – Typing
document.getElementById("typingBtn").onclick = () => {
  if (document.getElementById("challengeInput").value.trim() !== phrase) {
    alert("Incorrect text");
    return;
  }

  document.getElementById("stepTyping").style.display = "none";
  document.getElementById("stepMouse").style.display = "block";
  document.getElementById("status").innerText = "Step 2: Mouse actions";
};

// STEP 2 – Mouse clicks
document.addEventListener("click", e => {
  if (e.button === 0) {
    left = true;
    document.getElementById("left").innerText = "✅ Left Click";
  }
});

document.addEventListener("contextmenu", e => {
  right = true;
  document.getElementById("right").innerText = "✅ Right Click";
});

document.addEventListener("mousedown", e => {
  if (e.button === 1) {
    middle = true;
    document.getElementById("middle").innerText = "✅ Middle Click";
  }

  if (left && right && middle) {
    document.getElementById("stepMouse").style.display = "none";
    document.getElementById("stepKey").style.display = "block";
    document.getElementById("status").innerText = "Step 3: Keyboard";
  }
});

// STEP 3 – F12
document.addEventListener("keydown", e => {
  if (e.key === "F12") {
    f12 = true;
    unlock();
  }
});

function unlock() {
  if (!f12) return;

  const key = getKey();
  if (!key) {
    document.getElementById("status").innerText =
      "No verification key found.";
    return;
  }

  document.getElementById("stepKey").style.display = "none";
  document.getElementById("status").innerText = "Verification complete";

  document.getElementById("keyBox").style.display = "block";
  document.getElementById("copyBtn").style.display = "block";
  document.getElementById("keyBox").value = key;
}

document.getElementById("copyBtn").onclick = () => {
  const box = document.getElementById("keyBox");
  box.select();
  navigator.clipboard.writeText(box.value);
  alert("Key copied!");
};
