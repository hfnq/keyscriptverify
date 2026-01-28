function getKeyFromURL() {
  if (window.location.hash.startsWith("#KEY=")) {
    return window.location.hash.replace("#KEY=", "");
  }
  return null;
}

setTimeout(() => {
  document.getElementById("loader").style.display = "none";

  const key = getKeyFromURL();

  if (!key) {
    document.getElementById("status").innerText = "No verification key found.";
    return;
  }

  document.getElementById("status").innerText = "Verification complete";
  document.getElementById("keyBox").value = key;
}, 1200);

document.getElementById("copyBtn").onclick = () => {
  const box = document.getElementById("keyBox");
  box.select();
  box.setSelectionRange(0, 99999);
  navigator.clipboard.writeText(box.value);
  alert("Key copied!");
};
