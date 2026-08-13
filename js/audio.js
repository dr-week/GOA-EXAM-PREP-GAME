// Web Audio API Sound Effects & Speech Synthesis Module
const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

export function playSound(type) {
  try {
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.connect(gain);
    gain.connect(audioCtx.destination);

    if (type === 'correct') {
      osc.frequency.setValueAtTime(523.25, audioCtx.currentTime); // C5
      osc.frequency.setValueAtTime(659.25, audioCtx.currentTime + 0.1); // E5
      gain.gain.setValueAtTime(0.2, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.3);
      osc.start();
      osc.stop(audioCtx.currentTime + 0.3);
    } else if (type === 'wrong') {
      osc.frequency.setValueAtTime(220, audioCtx.currentTime); // A3
      osc.frequency.setValueAtTime(196, audioCtx.currentTime + 0.1); // G3
      gain.gain.setValueAtTime(0.3, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.3);
      osc.start();
      osc.stop(audioCtx.currentTime + 0.3);
    }
  } catch (e) {
    console.log("Audio not supported or restricted");
  }
}

// Minimal Native Web Speech API Text-to-Speech (TTS)
export function speakText(text) {
  if (!('speechSynthesis' in window)) {
    alert("Speech synthesis not supported in this browser.");
    return;
  }

  window.speechSynthesis.cancel(); // Stop ongoing speech
  const cleanText = text.replace(/^[A-D]\)\s*/, '');
  const utterance = new SpeechSynthesisUtterance(cleanText);
  utterance.rate = 1.0;
  utterance.pitch = 1.0;
  window.speechSynthesis.speak(utterance);
}
