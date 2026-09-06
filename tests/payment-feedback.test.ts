import { usePaymentStore } from '../src/store/paymentStore';
import { computeTactileFeedback } from '../src/utils/ui/tactileFeedback';
import { getAudioCueTone } from '../src/utils/audio/soundSynthesizer';

describe('Day 14 POS Store and Feedback Utilities', () => {
  beforeEach(() => {
    usePaymentStore.getState().clearAmount();
  });

  test('payment store appends digits and manages status', () => {
    const store = usePaymentStore.getState();
    store.appendDigit('5');
    store.appendDigit('0');
    store.appendDigit('.');
    store.appendDigit('5');
    expect(usePaymentStore.getState().amount).toBe('50.5');

    usePaymentStore.getState().setStatus('scanning');
    expect(usePaymentStore.getState().isProcessing).toBe(true);
    expect(usePaymentStore.getState().status).toBe('scanning');

    usePaymentStore.getState().clearAmount();
    expect(usePaymentStore.getState().amount).toBe('0');
    expect(usePaymentStore.getState().status).toBe('idle');
  });

  test('computeTactileFeedback returns distinct metrics per key', () => {
    const num = computeTactileFeedback('7');
    expect(num.scale).toBe(0.95);
    expect(num.vibrateMs).toBe(15);

    const clear = computeTactileFeedback('CLEAR');
    expect(clear.vibrateMs).toBe(25);

    const pay = computeTactileFeedback('PAY');
    expect(pay.vibrateMs).toBe(50);
  });

  test('getAudioCueTone resolves correct frequency profiles', () => {
    const success = getAudioCueTone('success');
    expect(success.frequency).toBe(880);
    expect(success.type).toBe('sine');

    const error = getAudioCueTone('error');
    expect(error.frequency).toBe(220);
    expect(error.type).toBe('sawtooth');
  });
});
