import { useState, useEffect, useCallback } from 'react';

export type DeviceType = 'laptop' | 'tablet' | 'phone';

export interface DeviceInfo {
  deviceType: DeviceType;
  isMobile: boolean;
  isTablet: boolean;
  isLaptop: boolean;
  isIOS: boolean;
  isAndroid: boolean;
  isStandalone: boolean; // PWA installed mode
  hasTouch: boolean;
  orientation: 'portrait' | 'landscape';
  screenWidth: number;
  screenHeight: number;
  hapticFeedback: (type?: 'light' | 'medium' | 'success' | 'error') => void;
}

export function useDeviceDetect(): DeviceInfo {
  const [deviceInfo, setDeviceInfo] = useState<Omit<DeviceInfo, 'hapticFeedback'>>({
    deviceType: 'laptop',
    isMobile: false,
    isTablet: false,
    isLaptop: true,
    isIOS: false,
    isAndroid: false,
    isStandalone: false,
    hasTouch: false,
    orientation: 'landscape',
    screenWidth: typeof window !== 'undefined' ? window.innerWidth : 1200,
    screenHeight: typeof window !== 'undefined' ? window.innerHeight : 800,
  });

  useEffect(() => {
    const checkDevice = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      const ua = navigator.userAgent || '';
      
      const isIOS = /iPad|iPhone|iPod/.test(ua) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
      const isAndroid = /Android/.test(ua);
      const hasTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
      
      // Determine device category
      let deviceType: DeviceType = 'laptop';
      let isMobile = false;
      let isTablet = false;
      let isLaptop = false;

      // PWA / Standalone mode
      const isStandalone =
        window.matchMedia('(display-mode: standalone)').matches ||
        (window.navigator as unknown as { standalone?: boolean }).standalone === true;

      // Tablets: iPads, large Android tablets, or screens between 640px and 1024px with touch
      if ((width >= 640 && width <= 1024 && hasTouch) || /iPad|Tablet|PlayBook|Silk/i.test(ua)) {
        deviceType = 'tablet';
        isTablet = true;
      } else if (width < 640 || (/Mobile|iPhone|Android/i.test(ua) && width <= 768)) {
        deviceType = 'phone';
        isMobile = true;
      } else {
        deviceType = 'laptop';
        isLaptop = true;
      }

      const orientation = width >= height ? 'landscape' : 'portrait';

      setDeviceInfo({
        deviceType,
        isMobile,
        isTablet,
        isLaptop,
        isIOS,
        isAndroid,
        isStandalone,
        hasTouch,
        orientation,
        screenWidth: width,
        screenHeight: height,
      });
    };

    checkDevice();
    window.addEventListener('resize', checkDevice);
    window.addEventListener('orientationchange', checkDevice);

    return () => {
      window.removeEventListener('resize', checkDevice);
      window.removeEventListener('orientationchange', checkDevice);
    };
  }, []);

  // Haptic feedback trigger for mobile & tablet (Android & supported webkit)
  const hapticFeedback = useCallback((type: 'light' | 'medium' | 'success' | 'error' = 'light') => {
    if (typeof window === 'undefined' || !('vibrate' in navigator)) return;

    try {
      switch (type) {
        case 'light':
          navigator.vibrate(12);
          break;
        case 'medium':
          navigator.vibrate(25);
          break;
        case 'success':
          navigator.vibrate([15, 30, 25]);
          break;
        case 'error':
          navigator.vibrate([40, 30, 40]);
          break;
      }
    } catch {
      // Ignore vibration error if blocked by browser policy
    }
  }, []);

  return {
    ...deviceInfo,
    hapticFeedback,
  };
}
