export interface ServiceWorkerStatus {
  supported: boolean;
  registered: boolean;
  controller: boolean;
}

export class ServiceWorkerManager {
  public static isSupported(): boolean {
    return typeof window !== 'undefined' && 'serviceWorker' in navigator;
  }

  public static getStatus(): ServiceWorkerStatus {
    const supported = this.isSupported();
    return {
      supported,
      registered: supported && !!navigator.serviceWorker.controller,
      controller: supported && !!navigator.serviceWorker.controller,
    };
  }
}
