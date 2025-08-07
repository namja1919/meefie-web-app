    // Import Firebase
    import { auth } from './firebase-config.js';
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

    // Logout
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
    updateStats();

    // ——— Camera & AI Detection ———
    const video = document.getElementById('video');
    const canvas = document.getElementById('canvas');
    const captureBtn = document.getElementById('captureBtn');
    let stream = null;

    // Start camera
    async function startCamera() {
      try {
        stream = await navigator.mediaDevices.getUserMedia({ video: true });
        video.srcObject = stream;
      } catch (err) {
        alert("Camera access denied: " + err.message);
      }
    }

    // Capture photo
    captureBtn.addEventListener('click', () => {
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      canvas.getContext('2d').drawImage(video, 0, 0);
      const photoDataUrl = canvas.toDataURL('image/png');

      // Trigger AI detection
      window.dispatchEvent(new CustomEvent('photoCaptured', { detail: photoDataUrl }));
    });

    // AI Detection (Mock for Demo)
    window.addEventListener('photoCaptured', () => {
      setTimeout(() => {
        const celebs = ["Taylor Swift", "Leonardo DiCaprio", "Beyoncé", "Robert Downey Jr.", "Rihanna"];
        const tiers = ["Bronze", "Silver", "Gold", "Platinum", "Diamond"];
        const detected = Math.random() > 0.3;

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
        document.getElementById('capturedPhoto').src = canvas.toDataURL('image/png');

        // Update count
        window.photoCount = (window.photoCount || 0) + 1;
        document.getElementById('photoCount').textContent = window.photoCount;

        // Add to gallery
        window.addPhotoToGallery(canvas.toDataURL('image/png'), "Captured", celebrity, apy);
      }, 1500);
    });

    // Convert to NFT
    document.getElementById('convertToNFT').addEventListener('click', () => {
      if (!walletAddress) {
        alert("Please connect your wallet first.");
        return;
      }
      if (confirm("Convert to NFT? 10,000 MFT will be deducted.")) {
        window.addPhotoToGallery(document.getElementById('capturedPhoto').src, "NFT", document.getElementById('celebrityName').textContent, document.getElementById('celebrityAPY').textContent.replace('%', ''));
        alert("✅ Photo converted to NFT!");
      }
    });

    // Stake Photo
    document.getElementById('stakePhoto').addEventListener('click', () => {
      if (window.stakedCount >= maxStakes) {
        alert(`You can only stake ${maxStakes} photos as ${profileTier}.`);
        return;
      }
      window.addPhotoToGallery(document.getElementById('capturedPhoto').src, "Staked", document.getElementById('celebrityName').textContent, document.getElementById('celebrityAPY').textContent.replace('%', ''));
      alert("✅ Photo staked!");
    });

    // List Item for Sale
    document.getElementById('listItemBtn').addEventListener('click', () => {
      const price = prompt("Enter price in MFT:");
      if (price && !isNaN(price)) {
        alert(`${price} MFT listing created!`);
      }
    });

    // Start camera
    startCamera();
