/**
 * Web Audio API synthesizer for child-friendly sound effects
 * and Web Speech API helper for reading lessons and questions out loud.
 */

class SoundEngine {
  private ctx: AudioContext | null = null;
  public enabled: boolean = true;
  public speechEnabled: boolean = true;

  private initCtx() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }
  }

  // Play a cheerful chime for correct answers
  playCorrect() {
    if (!this.enabled) return;
    try {
      this.initCtx();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;

      // Two ascending bell-like sine tones
      const osc1 = this.ctx.createOscillator();
      const osc2 = this.ctx.createOscillator();
      const gainNode = this.ctx.createGain();

      osc1.type = 'sine';
      osc2.type = 'triangle';

      osc1.frequency.setValueAtTime(523.25, now); // C5
      osc1.frequency.exponentialRampToValueAtTime(659.25, now + 0.1); // E5
      osc1.frequency.exponentialRampToValueAtTime(783.99, now + 0.2); // G5

      osc2.frequency.setValueAtTime(1046.5, now + 0.15); // C6

      gainNode.gain.setValueAtTime(0.18, now);
      gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.45);

      osc1.connect(gainNode);
      osc2.connect(gainNode);
      gainNode.connect(this.ctx.destination);

      osc1.start(now);
      osc2.start(now + 0.15);
      osc1.stop(now + 0.45);
      osc2.stop(now + 0.45);
    } catch {
      // Audio autoplay gracefully handled
    }
  }

  // Gentle friendly boop for wrong answers (encouraging, not scary)
  playIncorrect() {
    if (!this.enabled) return;
    try {
      this.initCtx();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;

      const osc = this.ctx.createOscillator();
      const gainNode = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(329.63, now); // E4
      osc.frequency.exponentialRampToValueAtTime(261.63, now + 0.18); // C4

      gainNode.gain.setValueAtTime(0.15, now);
      gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.3);

      osc.connect(gainNode);
      gainNode.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.3);
    } catch {}
  }

  // Card flip / click sound
  playCardFlip() {
    if (!this.enabled) return;
    try {
      this.initCtx();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;

      const osc = this.ctx.createOscillator();
      const gainNode = this.ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(440, now);
      osc.frequency.exponentialRampToValueAtTime(880, now + 0.08);

      gainNode.gain.setValueAtTime(0.1, now);
      gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.09);

      osc.connect(gainNode);
      gainNode.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.09);
    } catch {}
  }

  // Victory fanfare for passing level or master test
  playFanfare() {
    if (!this.enabled) return;
    try {
      this.initCtx();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;

      const notes = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6
      notes.forEach((freq, idx) => {
        const osc = this.ctx!.createOscillator();
        const gainNode = this.ctx!.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + idx * 0.12);

        gainNode.gain.setValueAtTime(0.18, now + idx * 0.12);
        gainNode.gain.exponentialRampToValueAtTime(0.01, now + idx * 0.12 + 0.35);

        osc.connect(gainNode);
        gainNode.connect(this.ctx!.destination);

        osc.start(now + idx * 0.12);
        osc.stop(now + idx * 0.12 + 0.35);
      });
    } catch {}
  }

  // Play a gentle cheerful sparkle chime for Study Buddy dialogue
  playBuddyChime() {
    if (!this.enabled) return;
    try {
      this.initCtx();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;

      // Soft high glockenspiel sparkle
      const freqs = [659.25, 830.61, 987.77, 1318.51]; // E5, G#5, B5, E6
      freqs.forEach((freq, idx) => {
        const osc = this.ctx!.createOscillator();
        const gainNode = this.ctx!.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + idx * 0.06);

        gainNode.gain.setValueAtTime(0.08, now + idx * 0.06);
        gainNode.gain.exponentialRampToValueAtTime(0.005, now + idx * 0.06 + 0.25);

        osc.connect(gainNode);
        gainNode.connect(this.ctx!.destination);

        osc.start(now + idx * 0.06);
        osc.stop(now + idx * 0.06 + 0.25);
      });
    } catch {}
  }

  // Speak text aloud using browser SpeechSynthesis
  speakText(
    text: string,
    optionsOrOnEnd?: (() => void) | { onEnd?: () => void; pitch?: number; rate?: number; lang?: string }
  ) {
    if (!this.speechEnabled || typeof window === 'undefined' || !('speechSynthesis' in window)) {
      return;
    }

    try {
      window.speechSynthesis.cancel(); // Stop prior speech
      const cleanText = text.replace(/<[^>]*>/g, '').trim();
      if (!cleanText) return;

      const utterance = new SpeechSynthesisUtterance(cleanText);

      let onEnd: (() => void) | undefined;
      let pitch = 1.1;
      let rate = 0.95;
      let lang = 'en-IN';

      if (typeof optionsOrOnEnd === 'function') {
        onEnd = optionsOrOnEnd;
      } else if (optionsOrOnEnd && typeof optionsOrOnEnd === 'object') {
        onEnd = optionsOrOnEnd.onEnd;
        if (typeof optionsOrOnEnd.pitch === 'number') pitch = optionsOrOnEnd.pitch;
        if (typeof optionsOrOnEnd.rate === 'number') rate = optionsOrOnEnd.rate;
        if (optionsOrOnEnd.lang) lang = optionsOrOnEnd.lang;
      }

      utterance.rate = rate; // Custom mentor pace
      utterance.pitch = pitch; // Custom mentor pitch
      utterance.lang = lang;

      // Try to find matching voice for Hindi, Telugu, Kannada, Malayalam, English
      const voices = window.speechSynthesis.getVoices();
      if (voices && voices.length > 0) {
        const langPrefix = lang.split('-')[0];
        const matchedVoice = voices.find(
          (v) => v.lang.toLowerCase() === lang.toLowerCase() || v.lang.toLowerCase().startsWith(langPrefix)
        );
        if (matchedVoice) {
          utterance.voice = matchedVoice;
        }
      }

      if (onEnd) {
        utterance.onend = onEnd;
        utterance.onerror = onEnd;
      }
      window.speechSynthesis.speak(utterance);
    } catch {}
  }

  stopSpeech() {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
  }
}

export const soundEngine = new SoundEngine();
