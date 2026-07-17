import { useState } from "react";
import { RsvpPayload } from "../types";

export interface UseRSVPResult {
  submitRSVP: (payload: RsvpPayload) => Promise<void>;
  loading: boolean;
  error: Error | null;
  success: boolean;
}

export function useRSVP(): UseRSVPResult {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [success, setSuccess] = useState(false);

  const submitRSVP = async (payload: RsvpPayload): Promise<void> => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      await new Promise<void>((resolve) => setTimeout(resolve, 1000));
      
      try {
        localStorage.setItem(`rsvp_${payload.guestId}`, JSON.stringify(payload));
      } catch (storageError) {
        console.warn("Failed to save RSVP to localStorage:", storageError);
      }

      setSuccess(true);
    } catch (err: any) {
      setError(err instanceof Error ? err : new Error(String(err)));
    } finally {
      setLoading(false);
    }
  };

  return {
    submitRSVP,
    loading,
    error,
    success,
  };
}
