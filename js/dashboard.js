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

// Photo Gallery
window.photoGallery = [];
window.nftCount = 0;
window.stakedCount = 0;
window.photoCount = 0;

window.addPhotoToGallery = (photoDataUrl, type, celebrity, apy = 0) => {
  window.photoGallery.push({ photoDataUrl, type, celebrity, apy });

  // Update counts
  if (type === "NFT") window.nftCount++;
  if (type === "Staked") window.stakedCount++;
  window.photoCount++;

  // Re-render
  renderPhotoGallery();
  updateStats();
};

function renderPhotoGallery() {
  const gallery = document.getElementById('photoGallery');
  gallery.innerHTML = '';

  window.photoGallery.forEach(item => {
    const div = document.createElement('div');
    div.className = 'gallery-item';
    div.innerHTML = `
      <img src="${item.photoDataUrl}" alt="Photo" style="width: 80px; height: 80px; object-fit: cover; border-radius: 8px;">
      <div style="font-size: 12px; margin-top: 4px;">
        <strong>${item.type}</strong><br>
        ${item.celebrity} (${item.apy}%)
      </div>
    `;
    gallery.appendChild(div);
  });
}

// Initial render
renderPhotoGallery();

// ——— Tier Upgrade/Downgrade Logic ———
const tierSelect = document.getElementById('tierSelect');
const updateTierBtn = document.getElementById('updateTierBtn');

// Tier definitions
const TIER_COSTS = {
  STARTER: 0,
  EXPLORER: 5000,
  INFLUENCER: 20000,
  ELITE: 50000,
  PRESTIGE: 100000
};

const TIER_MAX_STAKES = {
  STARTER: 1,
  EXPLORER: 2,
  INFLUENCER: 5,
  ELITE: 10,
  PRESTIGE: Infinity
};

// Update tier dropdown based on current tier
function syncTierDropdown() {
  tierSelect.value = profileTier;
}

// Update Tier Button Click
updateTierBtn.addEventListener('click', () => {
  const selectedTier = tierSelect.value;

  // Same tier? Do nothing
  if (selectedTier === profileTier) {
    alert(`You're already on the ${profileTier} tier.`);
    return;
  }

  // Downgrade: Instant (no payment)
  if (TIER_COSTS[selectedTier] < TIER_COSTS[profileTier]) {
    if (confirm(`Downgrade to ${selectedTier}?`)) {
      profileTier = selectedTier;
      maxStakes = TIER_MAX_STAKES[profileTier];
      updateStats();
      syncTierDropdown();
      alert(`✅ Downgraded to ${profileTier} tier!`);
    }
    return;
  }

  // Upgrade: Requires wallet & MFT
  if (!walletAddress) {
    alert("⚠️ Please connect your wallet first.");
    return;
  }

  const cost = TIER_COSTS[selectedTier];
  if (mftBalance < cost) {
    alert(`❌ Not enough MFT! You need ${cost}, but only have ${mftBalance}.`);
    return;
  }

  if (confirm(`Upgrade to ${selectedTier} for ${cost} MFT?`)) {
    mftBalance -= cost;
    profileTier = selectedTier;
    maxStakes = TIER_MAX_STAKES[profileTier];
    updateStats();
    syncTierDropdown();
    alert(`✅ Upgraded to ${profileTier} tier! ${cost} MFT deducted.`);
  }
});

// Initialize
syncTierDropdown();
