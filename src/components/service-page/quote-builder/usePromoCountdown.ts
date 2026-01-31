import { useState, useEffect, useCallback } from 'react';
import { DISCOUNT_DEADLINE_KEY, PROMO_DURATION_DAYS } from './types';

interface PromoState {
  isActive: boolean;
  daysLeft: number;
  hoursLeft: number;
  minutesLeft: number;
  secondsLeft: number;
  deadlineDate: Date | null;
}

/**
 * Hook to manage promo countdown state
 * Uses existing deadline from LaunchDiscountSection if present
 */
export const usePromoCountdown = () => {
  const [promoState, setPromoState] = useState<PromoState>({
    isActive: false,
    daysLeft: 0,
    hoursLeft: 0,
    minutesLeft: 0,
    secondsLeft: 0,
    deadlineDate: null,
  });

  const getOrCreateDeadline = useCallback((): Date => {
    try {
      const stored = localStorage.getItem(DISCOUNT_DEADLINE_KEY);
      if (stored) {
        const deadline = new Date(stored);
        if (!isNaN(deadline.getTime())) {
          return deadline;
        }
      }
    } catch {
      // Ignore errors
    }
    
    // Create new deadline
    const deadline = new Date(Date.now() + PROMO_DURATION_DAYS * 24 * 60 * 60 * 1000);
    try {
      localStorage.setItem(DISCOUNT_DEADLINE_KEY, deadline.toISOString());
    } catch {
      // Ignore errors
    }
    return deadline;
  }, []);

  useEffect(() => {
    const deadline = getOrCreateDeadline();
    
    const updateCountdown = () => {
      const now = Date.now();
      const remaining = deadline.getTime() - now;
      
      if (remaining <= 0) {
        setPromoState({
          isActive: false,
          daysLeft: 0,
          hoursLeft: 0,
          minutesLeft: 0,
          secondsLeft: 0,
          deadlineDate: deadline,
        });
        return;
      }
      
      const days = Math.floor(remaining / (1000 * 60 * 60 * 24));
      const hours = Math.floor((remaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((remaining % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((remaining % (1000 * 60)) / 1000);
      
      setPromoState({
        isActive: true,
        daysLeft: days,
        hoursLeft: hours,
        minutesLeft: minutes,
        secondsLeft: seconds,
        deadlineDate: deadline,
      });
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    
    return () => clearInterval(interval);
  }, [getOrCreateDeadline]);

  const formatTimeRemaining = useCallback((): string => {
    const { daysLeft, hoursLeft } = promoState;
    if (daysLeft > 0) {
      return `${daysLeft}d ${hoursLeft}u`;
    }
    return `${hoursLeft}u ${promoState.minutesLeft}m`;
  }, [promoState]);

  return { ...promoState, formatTimeRemaining };
};
