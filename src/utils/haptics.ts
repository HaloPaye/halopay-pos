export function triggerHaptic() {
  if (typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return;
  }
  if (typeof navigator !== 'undefined' && navigator.vibrate) { 
    navigator.vibrate(10); 
  } 
}
