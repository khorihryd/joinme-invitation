import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";

export interface UseGalleryResult {
  images: string[];
  loading: boolean;
  error: Error | null;
}

export function useGallery(): UseGalleryResult {
  const context = useContext(ThemeContext);
  
  if (!context) {
    return {
      images: [],
      loading: false,
      error: new Error("ThemeContext not found"),
    };
  }

  return {
    images: context.data?.gallery || [],
    loading: context.loading,
    error: context.error,
  };
}
