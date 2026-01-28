const status = document.getElementById("status");
const keyBox = document.getElementById("keyBox");
const keyText = document.getElementById("keyText");

// Read key from URL fragment
// Example: https://site/#KEY=ABCD12
const hash = window.location.hash;

if (hash.startsWith("#KEY=")) {
  const key = hash.replace("#KEY=", "").trim();

  if (key.length > 0) {
    status.textContent = "Verification successful.";
    keyText.textContent = key;
    keyBox.classList.remove("hidden");
  } else {
    status.textContent = "Invalid key.";
  }
} else {
  status.textContent = "No verification key found.";
}
