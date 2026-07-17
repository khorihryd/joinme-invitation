import { createContext, Dispatch, SetStateAction } from "react";
import { InvitationData } from "../types";

export interface ThemeContextType {
  data: InvitationData | null;
  loading: boolean;
  error: Error | null;
  setData: Dispatch<SetStateAction<InvitationData | null>>;
  setLoading: Dispatch<SetStateAction<boolean>>;
  setError: Dispatch<SetStateAction<Error | null>>;
}

export const ThemeContext = createContext<ThemeContextType | undefined>(undefined);
