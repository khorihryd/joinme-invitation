import React, { useState, useEffect } from "react";
import { ThemeContext, InvitationData } from "@joinme/theme-sdk";
import { fetchInvitation } from "../services/invitationService";

export interface ThemeProviderProps {
  inviteId: string;
  children: React.ReactNode;
}

export function ThemeProvider({ inviteId, children }: ThemeProviderProps) {
  const [data, setData] = useState<InvitationData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    
    fetchInvitation(inviteId)
      .then((invitation) => {
        setData(invitation);
        setLoading(false);
      })
      .catch((err) => {
        setError(err instanceof Error ? err : new Error("Failed to load invitation"));
        setLoading(false);
      });
  }, [inviteId]);

  return (
    <ThemeContext.Provider value={{ data, loading, error, setData, setLoading, setError }}>
      {children}
    </ThemeContext.Provider>
  );
}

