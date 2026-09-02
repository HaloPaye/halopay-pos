export function triggerHaptic() { if (typeof navigator !== 'undefined' && navigator.vibrate) { navigator.vibrate(10); } }
