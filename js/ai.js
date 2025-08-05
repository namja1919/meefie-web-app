// js/ai.js
import { auth } from '../firebase-config.js';

window.addEventListener('photoCaptured', async (e) => {
  const photoDataUrl = e.detail;

  try {
    // Call Qwen Vision API (you need Alibaba Cloud API key)
    const response = await fetch('https://dashscope.aliyuncs.com/api/v1/services/aigc/multimodal-generation', {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer YOUR_DASHSCOPE_API_KEY',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'qwen-vl-plus',
        input: {
          messages: [
            {
              role: 'user',
              content: [
                { image: photoDataUrl },
                { text: 'Is there a celebrity in this image? If yes, who? Respond in JSON: { "celebrity": "Name", "confidence": 0.9 }' }
              ]
            }
          ]
        }
      })
    });

    const result = await response.json();
    const celebrity = result.output.choices[0].message.content;

    // Mock for demo (remove in production)
    const mockCelebrity = "Taylor Swift";
    const tiers = ["Bronze", "Silver", "Gold", "Platinum", "Diamond"];
    const tier = tiers[Math.floor(Math.random() * tiers.length)];
    const apyMap = { Bronze: 20, Silver: 30, Gold: 40, Platinum: 50, Diamond: 60 };

    // Show AI result
    document.getElementById('aiResult').classList.remove('hidden');
    document.getElementById('celebrityName').textContent = mockCelebrity;
    document.getElementById('celebrityTier').textContent = tier;
    document.getElementById('celebrityAPY').textContent = `${apyMap[tier]}%`;
    document.getElementById('capturedPhoto').src = photoDataUrl;

    // Update counts
    const photoCount = parseInt(document.getElementById('photoCount').textContent) + 1;
    document.getElementById('photoCount').textContent = photoCount;

  } catch (error) {
    alert("AI detection failed. Try again.");
  }
});
