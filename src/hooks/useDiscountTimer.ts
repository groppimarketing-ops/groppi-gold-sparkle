import { useState, useEffect, useCallback } from 'react';
import { DISCOUNT_CONFIG, generateQuoteCode } from '@/config/pricingConfig';

const STORAGE_KEYS = {
  startedAt: 'gro_discount_startedAt',
  expiresAt: 'gro_discount_expiresAt',
  code: 'gro_discount_code',
} as const;

const TEN_DAYS_MS = DISCOUNT_CONFIG.validDays * 24 * 60 * 60 * 1000;

export interface DiscountTimerState {
  isUnlocked: boolean;
  isExpired: boolean;
  discountCode: string | null;
  timeRemaining: {
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
    total: number;
  } | null;
  percentage: number;
}

/**
 * useDiscountTimer - Persistent 10-day discount countdown
 * 
 * Rules:
 * - Discount is NOT visible by default
 * - Only unlocks when calculator shows price AND payment type = one_time
 * - Once unlocked, countdown persists across refreshes via localStorage
 * - After 10 days, discount expires and code is greyed out
 */
export function useDiscountTimer() {
  const [state, setState] = useState<DiscountTimerState>({
    isUnlocked: false,
    isExpired: false,
    discountCode: null,
    timeRemaining: null,
    percentage: DISCOUNT_CONFIG.percentage,
  });

  // Check localStorage for existing timer on mount
  useEffect(() => {
    const startedAt = localStorage.getItem(STORAGE_KEYS.startedAt);
    const expiresAt = localStorage.getItem(STORAGE_KEYS.expiresAt);
    const code = localStorage.getItem(STORAGE_KEYS.code);

    if (startedAt && expiresAt && code) {
      const expiresAtMs = parseInt(expiresAt, 10);
      const now = Date.now();

      if (now >= expiresAtMs) {
        // Expired
        setState(prev => ({
          ...prev,
          isUnlocked: true,
          isExpired: true,
          discountCode: code,
          timeRemaining: { days: 0, hours: 0, minutes: 0, seconds: 0, total: 0 },
        }));
      } else {
        // Still active
        const remaining = expiresAtMs - now;
        setState(prev => ({
          ...prev,
          isUnlocked: true,
          isExpired: false,
          discountCode: code,
          timeRemaining: calculateTimeRemaining(remaining),
        }));
      }
    }
  }, []);

  // Countdown ticker - updates every second when unlocked and not expired
  useEffect(() => {
    if (!state.isUnlocked || state.isExpired) return;

    const expiresAt = localStorage.getItem(STORAGE_KEYS.expiresAt);
    if (!expiresAt) return;

    const expiresAtMs = parseInt(expiresAt, 10);

    const interval = setInterval(() => {
      const now = Date.now();
      const remaining = expiresAtMs - now;

      if (remaining <= 0) {
        // Timer expired
        setState(prev => ({
          ...prev,
          isExpired: true,
          timeRemaining: { days: 0, hours: 0, minutes: 0, seconds: 0, total: 0 },
        }));
        clearInterval(interval);
      } else {
        setState(prev => ({
          ...prev,
          timeRemaining: calculateTimeRemaining(remaining),
        }));
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [state.isUnlocked, state.isExpired]);

  /**
   * unlockDiscount - Called when calculator meets conditions
   * (has items, payment type = one_time)
   * 
   * Only starts timer if not already started
   */
  const unlockDiscount = useCallback(() => {
    // Already unlocked? Don't reset the timer
    const existingStarted = localStorage.getItem(STORAGE_KEYS.startedAt);
    if (existingStarted) {
      // Just ensure state is synced
      if (!state.isUnlocked) {
        const expiresAt = localStorage.getItem(STORAGE_KEYS.expiresAt);
        const code = localStorage.getItem(STORAGE_KEYS.code);
        if (expiresAt && code) {
          const expiresAtMs = parseInt(expiresAt, 10);
          const now = Date.now();
          const isExpired = now >= expiresAtMs;
          
          setState(prev => ({
            ...prev,
            isUnlocked: true,
            isExpired,
            discountCode: code,
            timeRemaining: isExpired 
              ? { days: 0, hours: 0, minutes: 0, seconds: 0, total: 0 }
              : calculateTimeRemaining(expiresAtMs - now),
          }));
        }
      }
      return;
    }

    // First time unlock - start new timer
    const now = Date.now();
    const expiresAt = now + TEN_DAYS_MS;
    const code = generateQuoteCode();

    localStorage.setItem(STORAGE_KEYS.startedAt, now.toString());
    localStorage.setItem(STORAGE_KEYS.expiresAt, expiresAt.toString());
    localStorage.setItem(STORAGE_KEYS.code, code);

    setState({
      isUnlocked: true,
      isExpired: false,
      discountCode: code,
      timeRemaining: calculateTimeRemaining(TEN_DAYS_MS),
      percentage: DISCOUNT_CONFIG.percentage,
    });
  }, [state.isUnlocked]);

  /**
   * Check if discount should be applied
   * Returns true only if unlocked AND not expired
   */
  const isDiscountActive = state.isUnlocked && !state.isExpired;

  return {
    ...state,
    isDiscountActive,
    unlockDiscount,
  };
}

function calculateTimeRemaining(ms: number): DiscountTimerState['timeRemaining'] {
  if (ms <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, total: 0 };
  }

  const seconds = Math.floor((ms / 1000) % 60);
  const minutes = Math.floor((ms / 1000 / 60) % 60);
  const hours = Math.floor((ms / 1000 / 60 / 60) % 24);
  const days = Math.floor(ms / 1000 / 60 / 60 / 24);

  return { days, hours, minutes, seconds, total: ms };
}

export default useDiscountTimer;
