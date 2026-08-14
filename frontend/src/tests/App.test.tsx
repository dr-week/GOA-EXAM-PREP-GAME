import { describe, it, expect } from 'vitest';
import { playSound } from '../utils/audio';
import { translations } from '../utils/i18n';

describe('React App Frontend Unit Tests', () => {
  it('verifies Web Audio API synthesizer handles audio playback gracefully', () => {
    expect(() => playSound('correct', true)).not.toThrow();
    expect(() => playSound('wrong', true)).not.toThrow();
    expect(() => playSound('finish', true)).not.toThrow();
  });

  it('verifies i18n translation dictionaries contain required keys', () => {
    expect(translations.en.appTitle).toBe('Goa Exam Master');
    expect(translations.gom.appTitle).toBe('गोंय परीक्षा मास्तर');
    expect(translations.mr.appTitle).toBe('गोवा परीक्षा मास्टर');
  });
});
