// js/dashboard.js
import { auth } from '../firebase-config.js';
import { signOut } from 'https://www.gstatic.com/firebasejs/9.22.0/firebase-auth.js';

// Global state
let walletAddress = null;
let mftBalance = 100000; // Simulated MFT balance
let profileTier = "STARTER";
let maxStakes = 1;

// Update UI
function updateStats() {
  document.getElementById('nftCount').textContent = window.nftCount || 0;
  document.getElementById('stakedCount').textContent = window.stakedCount || 0;
  document.getElementById('photoCount').textContent = window.photoCount || 0;
  document.getElementById('profileTier').textContent = profileTier;
  document.getElementById('maxStakes').textContent = maxStakes;
  document.getElementById('walletAddress').textContent = walletAddress 
    ? `${walletAddress.slice(0,6)}...${walletAddress.slice(-4)}` 
    : "Not connected";
}

// Connect Wallet
document.getElementById('walletBtn').addEventListener('click', async () => {
  if (window.ethereum) {
    try {
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      walletAddress = accounts[0];
      document.getElementById('walletBtn').textContent = "✅ Wallet Connected";
      updateStats();
    } catch (err) {
      alert("Wallet connection rejected.");
    }
  } else {
    alert("MetaMask not detected. Install it from metamask.io");
  }
});

// Upgrade Tier with Wallet & MFT Deduction
document.getElementById('upgradeTierBtn').addEventListener('click', () => {
  if (!walletAddress) {
    alert("⚠️ Please connect your wallet first.");
    return;
  }

  const tiers = [
    { name: "EXPLORER", cost: 5000, max: 2 },
    { name: "INFLUENCER", cost: 20000, max: 5 },
    { name: "ELITE", cost: 50000, max: 10 },
    { name: "PRESTIGE", cost: 100000, max: Infinity }
  ];

  const currentTierIndex = ["STARTER", "EXPLORER", "INFLUENCER", "ELITE", "PRESTIGE"].indexOf(profileTier);
  if (currentTierIndex >= tiers.length) {
    alert("🎉 You're already at the highest tier!");
    return;
  }

  const nextTier = tiers[currentTierIndex];
  if (!nextTier) return;

  if (mftBalance < nextTier.cost) {
    alert(`❌ Not enough MFT! You need ${nextTier.cost}, but only have ${mftBalance}.`);
    return;
  }

  if (confirm(`Upgrade to ${nextTier.name} for ${nextTier.cost} MFT?`)) {
    mftBalance -= nextTier.cost;
    profileTier = nextTier.name;
    maxStakes = nextTier.max;
    updateStats();
    alert(`✅ Upgraded to ${profileTier} tier! ${nextTier.cost} MFT deducted.`);
  }
});

// Initialize
updateStats();

// Expose to global scope
window.updateStats = updateStats;
window.logout = async () => {
  await signOut(auth);
  window.location.href = "index.html";
};
