import {
  VIBRATION_PROFILES,
  getVibrationPattern,
  triggerHapticEvent,
} from '../src/utils/feedback/vibrationProfiles';

describe('Haptic Vibration Profiles Suite', () => {
  test('returns distinct multi-pulse vibration patterns for core events', () => {
    const successPattern = getVibrationPattern('PAYMENT_SUCCESS');
    expect(successPattern).toEqual([50, 40, 100]);

    const errorPattern = getVibrationPattern('PAYMENT_ERROR');
    expect(errorPattern).toEqual([100, 50, 100, 50, 150]);

    const scanPattern = getVibrationPattern('QR_SCANNED');
    expect(scanPattern).toEqual([30]);
  });

  test('all registered profiles include descriptive metadata', () => {
    Object.values(VIBRATION_PROFILES).forEach((profile) => {
      expect(profile.name.length).toBeGreaterThan(0);
      expect(profile.pattern.length).toBeGreaterThan(0);
      expect(profile.description.length).toBeGreaterThan(10);
    });
  });

  test('triggerHapticEvent gracefully falls back in non-navigator environments', () => {
    const result = triggerHapticEvent('PAYMENT_SUCCESS');
    expect(typeof result).toBe('boolean');
  });
});
