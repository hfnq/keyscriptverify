function generateKey() {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let key = "HFNQ-";
  for (let i = 0; i < 32; i++) {
    key += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return key;
}

const params = new URLSearchParams(window.location.search);
let key = params.get("key");

setTimeout(() => {
  document.getElementById("loader").style.display = "none";

  if (!key) {
    key = generateKey();
    window.location.search = "?key=" + key;
    return;
  }

  document.getElementById("status").innerText = "Verification complete";
  document.getElementById("keyBox").value = key;
}, 1500);

document.getElementById("copyBtn").onclick = () => {
  const keyBox = document.getElementById("keyBox");
  keyBox.select();
  keyBox.setSelectionRange(0, 99999);
  navigator.clipboard.writeText(keyBox.value);
  alert("Key copied!");
};
