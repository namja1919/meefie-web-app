// js/camera.js
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

startCamera();
