// js/ai.js
window.addEventListener('photoCaptured', async (e) => {
  const photoDataUrl = e.detail;

  // ✅ Mock AI Detection (for demo)
  setTimeout(() => {
    const celebs = ["Taylor Swift", "Leonardo DiCaprio", "Beyoncé", "Robert Downey Jr.", "Rihanna"];
    const tiers = ["Bronze", "Silver", "Gold", "Platinum", "Diamond"];
    
    const detected = Math.random() > 0.3; // 70% chance of detection
    if (!detected) {
      alert("No celebrity detected. Try again!");
      return;
    }

    const celebrity = celebs[Math.floor(Math.random() * celebs.length)];
    const tier = tiers[Math.floor(Math.random() * tiers.length)];
    const apyMap = { Bronze: 20, Silver: 30, Gold: 40, Platinum: 50, Diamond: 60 };
    const apy = apyMap[tier];

    // Show AI result
    document.getElementById('aiResult').classList.remove('hidden');
    document.getElementById('celebrityName').textContent = celebrity;
    document.getElementById('celebrityTier').textContent = tier;
    document.getElementById('celebrityAPY').textContent = `${apy}%`;
    document.getElementById('capturedPhoto').src = photoDataUrl;

    // Update photo count
    const photoCount = parseInt(document.getElementById('photoCount').textContent) + 1;
    document.getElementById('photoCount').textContent = photoCount;

    // Add to gallery
    window.addPhotoToGallery(photoDataUrl, "Captured", celebrity, apy);
  }, 1500);
});
