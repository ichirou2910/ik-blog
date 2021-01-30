import { useState, useCallback } from "react";

export const useTheme = () => {
  const [theme, setTheme] = useState("dark");

  const switchTheme = useCallback((theme) => {
    if (theme === "dark" || theme === "light") {
      setTheme(theme);
      localStorage.setItem("theme", theme);
    }
  }, []);

  return { theme, switchTheme };
};
