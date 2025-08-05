// js/web3.js
const walletBtn = document.getElementById('walletBtn');
let walletAddress = null;

walletBtn.addEventListener('click', async () => {
  if (window.ethereum) {
    try {
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      walletAddress = accounts[0];
      document.getElementById('walletAddress').textContent = `${walletAddress.slice(0,6)}...${walletAddress.slice(-4)}`;
      walletBtn.textContent = "✅ Wallet Connected";
    } catch (err) {
      alert("Wallet connection rejected.");
    }
  } else {
    alert("MetaMask not detected. Install it from metamask.io");
  }
});
