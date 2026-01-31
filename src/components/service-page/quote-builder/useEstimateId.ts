import { useCallback } from 'react';
import { EstimatePayload, ESTIMATE_PREFIX, ESTIMATE_VALIDITY_HOURS } from './types';

/**
 * Generate a unique Estimate ID
 * Format: GRO-XXXXX (base36 timestamp chunk + 3 random chars)
 */
export const generateEstimateId = (): string => {
  const timestampPart = Date.now().toString(36).slice(-3).toUpperCase();
  const randomPart = Math.random().toString(36).substring(2, 5).toUpperCase();
  return `GRO-${timestampPart}${randomPart}`;
};

/**
 * Hook for managing estimate IDs and localStorage persistence
 */
export const useEstimateId = () => {
  const saveEstimate = useCallback((payload: Omit<EstimatePayload, 'id' | 'createdAt' | 'expiresAt'>): EstimatePayload => {
    const id = generateEstimateId();
    const now = new Date();
    const expiresAt = new Date(now.getTime() + ESTIMATE_VALIDITY_HOURS * 60 * 60 * 1000);
    
    const fullPayload: EstimatePayload = {
      ...payload,
      id,
      createdAt: now.toISOString(),
      expiresAt: expiresAt.toISOString(),
    };
    
    try {
      localStorage.setItem(`${ESTIMATE_PREFIX}${id}`, JSON.stringify(fullPayload));
    } catch (e) {
      console.warn('Failed to save estimate to localStorage:', e);
    }
    
    return fullPayload;
  }, []);

  const getEstimate = useCallback((id: string): EstimatePayload | null => {
    try {
      const stored = localStorage.getItem(`${ESTIMATE_PREFIX}${id}`);
      if (!stored) return null;
      
      const payload = JSON.parse(stored) as EstimatePayload;
      
      // Check if expired
      if (new Date(payload.expiresAt) < new Date()) {
        localStorage.removeItem(`${ESTIMATE_PREFIX}${id}`);
        return null;
      }
      
      return payload;
    } catch {
      return null;
    }
  }, []);

  const isEstimateValid = useCallback((id: string): boolean => {
    const estimate = getEstimate(id);
    return estimate !== null;
  }, [getEstimate]);

  return { saveEstimate, getEstimate, isEstimateValid, generateEstimateId };
};
