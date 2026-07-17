import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";
import { StoryData } from "../types";

export function useStory(): StoryData | null {
  const context = useContext(ThemeContext);
  
  if (!context || !context.data) {
    return null;
  }

  return context.data.story || null;
}
