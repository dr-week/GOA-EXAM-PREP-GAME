// Pure Web Audio API Sound Synthesizer (Zero Dependencies)
let audioCtx: AudioContext | null = null;

export const playSound = (type: 'correct' | 'wrong' | 'click' | 'finish', isMuted: boolean = false) => {
  if (isMuted) return;

  try {
    if (!audioCtx) {
      const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      audioCtx = new AudioContextClass();
    }

    if (audioCtx.state === 'suspended') {
      audioCtx.resume();
    }

    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();

    osc.connect(gain);
    gain.connect(audioCtx.destination);

    const now = audioCtx.currentTime;

    if (type === 'correct') {
      // High chime (C5 to G5)
      osc.type = 'sine';
      osc.frequency.setValueAtTime(523.25, now); // C5
      osc.frequency.exponentialRampToValueAtTime(783.99, now + 0.15); // G5

      gain.gain.setValueAtTime(0.15, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.3);

      osc.start(now);
      osc.stop(now + 0.3);
    } else if (type === 'wrong') {
      // Low buzz (F3 to C3)
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(174.61, now); // F3
      osc.frequency.exponentialRampToValueAtTime(130.81, now + 0.2); // C3

      gain.gain.setValueAtTime(0.15, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);

      osc.start(now);
      osc.stop(now + 0.25);
    } else if (type === 'click') {
      // Subtle click
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(400, now);

      gain.gain.setValueAtTime(0.05, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);

      osc.start(now);
      osc.stop(now + 0.05);
    } else if (type === 'finish') {
      // Fanfare chord
      osc.type = 'sine';
      osc.frequency.setValueAtTime(523.25, now);
      osc.frequency.exponentialRampToValueAtTime(1046.50, now + 0.4);

      gain.gain.setValueAtTime(0.2, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.5);

      osc.start(now);
      osc.stop(now + 0.5);
    }
  } catch (e) {
    console.warn('Web Audio error:', e);
  }
};
