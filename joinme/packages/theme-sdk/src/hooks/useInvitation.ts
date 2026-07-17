import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";
import { InvitationData } from "../types";

export interface UseInvitationResult {
  data: InvitationData | null;
  loading: boolean;
  error: Error | null;
}

export function useInvitation(): UseInvitationResult {
  const context = useContext(ThemeContext);
  if (!context) {
    return { data: null, loading: false, error: new Error("ThemeContext not found") };
  }
  
  return {
    data: context.data,
    loading: context.loading,
    error: context.error,
  };
}
