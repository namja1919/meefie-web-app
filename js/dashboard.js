// js/dashboard.js
import { auth } from '../firebase-config.js';
import { signOut } from 'https://www.gstatic.com/firebasejs/9.22.0/firebase-auth.js';
let nftCount = 0;
let stakedCount = 0;
let profileTier = "STARTER";
let maxStakes = 1;

// Update UI
function updateStats() {
  document.getElementById('nftCount').textContent = nftCount;
  document.getElementById('stakedCount').textContent = stakedCount;
  document.getElementById('profileTier').textContent = profileTier;
  document.getElementById('maxStakes').textContent = maxStakes;
}

// Upgrade Tier with Wallet & MFT Payment
document.getElementById('upgradeTierBtn').addEventListener('click', () => {
  if (!window.walletAddress) {
    alert("Please connect your wallet first.");
    return;
  }

  const tiers = [
    { name: "EXPLORER", cost: 5000, max: 2 },
    { name: "INFLUENCER", cost: 20000, max: 5 },
    { name: "ELITE", cost: 50000, max: 10 },
    { name: "PRESTIGE", cost: 100000, max: Infinity }
  ];

  const currentTierIndex = ["STARTER", "EXPLORER", "INFLUENCER", "ELITE", "PRESTIGE"].indexOf(profileTier);
  if (currentTierIndex >= tiers.length) return;

  const nextTier = tiers[currentTierIndex];
  if (!nextTier) {
    alert("You're already at the highest tier!");
    return;
  }

  if (confirm(`Upgrade to ${nextTier.name} for ${nextTier.cost} MFT?`)) {
    // Simulate MFT deduction (in production, call smart contract)
    alert(`${nextTier.cost} MFT will be deducted from your wallet.`);
    profileTier = nextTier.name;
    maxStakes = nextTier.max;
    updateStats();
    alert(`✅ Upgraded to ${profileTier} tier!`);
  }
});

// Convert to NFT
document.getElementById('convertToNFT').addEventListener('click', () => {
  if (!window.walletAddress) {
    alert("Please connect your wallet first.");
    return;
  }
  if (confirm("Convert to NFT? 10,000 MFT will be deducted.")) {
    nftCount++;
    updateStats();
    alert("✅ Photo converted to NFT!");
  }
});

// Stake Photo
document.getElementById('stakePhoto').addEventListener('click', () => {
  if (stakedCount >= maxStakes) {
    alert(`You can only stake ${maxStakes} photos as ${profileTier}.`);
    return;
  }
  stakedCount++;
  updateStats();
  alert("✅ Photo staked!");
});

// Upgrade Tier
document.getElementById('upgradeTierBtn').addEventListener('click', () => {
  const tiers = [
    { name: "EXPLORER", cost: 5000, max: 2 },
    { name: "INFLUENCER", cost: 20000, max: 5 },
    { name: "ELITE", cost: 50000, max: 10 },
    { name: "PRESTIGE", cost: 100000, max: Infinity }
  ];

  const nextTier = tiers.find(t => t.name !== profileTier);
  if (nextTier && confirm(`Upgrade to ${nextTier.name} for ${nextTier.cost} MFT?`)) {
    profileTier = nextTier.name;
    maxStakes = nextTier.max;
    updateStats();
    alert(`✅ Upgraded to ${profileTier} tier!`);
  }
});

// Logout
function logout() {
  signOut(auth).then(() => {
    window.location.href = "index.html";
  }).catch((error) => {
    alert("Logout failed: " + error.message);
  });
}

// Attach to button
window.logout = logout;

// Initialize
updateStats();
