export interface SynthesizerTone {
  frequency: number;
  durationSec: number;
  type: OscillatorType;
}

export function getAudioCueTone(status: 'success' | 'error' | 'click'): SynthesizerTone {
  switch (status) {
    case 'success':
      return { frequency: 880, durationSec: 0.15, type: 'sine' };
    case 'error':
      return { frequency: 220, durationSec: 0.3, type: 'sawtooth' };
    case 'click':
    default:
      return { frequency: 440, durationSec: 0.05, type: 'triangle' };
  }
}

export function playAudioCue(status: 'success' | 'error' | 'click'): boolean {
  if (typeof window === 'undefined') return false;
  const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
  if (!AudioCtx) return false;

  try {
    const ctx = new AudioCtx();
    const tone = getAudioCueTone(status);
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = tone.type;
    osc.frequency.setValueAtTime(tone.frequency, ctx.currentTime);
    gain.gain.setValueAtTime(0.1, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + tone.durationSec);

    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + tone.durationSec);
    return true;
  } catch {
    return false;
  }
}
