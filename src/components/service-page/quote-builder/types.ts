// Quote Builder Types

export interface EstimatePayload {
  id: string;
  createdAt: string;
  expiresAt: string;
  serviceKey: string;
  tierKey: string | null;
  options: string[];
  adBudget: string | null;
  priceMin: number;
  priceMax: number;
  discountApplied: boolean;
  discountAmount: number;
}

export interface PricingConfig {
  base: {
    starter: { min: number; max: number };
    growth: { min: number; max: number };
    pro: { min: number; max: number };
  };
  setup: {
    starter: number;
    growth: number;
    pro: number;
  };
  options: Record<string, number>;
  adBudgetModifier: Record<string, number>;
}

export type TierKey = 'starter' | 'growth' | 'pro';

export const DISCOUNT_DEADLINE_KEY = 'groppi_discount_deadline';
export const ESTIMATE_PREFIX = 'groppi_estimate_';
export const DISCOUNT_PERCENTAGE = 20; // 20% discount on one-time fees only
export const ESTIMATE_VALIDITY_HOURS = 24;
export const PROMO_DURATION_DAYS = 10;
