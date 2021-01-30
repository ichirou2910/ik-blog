import { useState, useEffect, useCallback } from "react";

export const useTheme = () => {
  const [theme, setTheme] = useState("dark");

  const switchTheme = useCallback((theme) => {
    if (theme === "dark" || theme === "light") {
      setTheme(theme);
      localStorage.setItem("theme", theme);
    }
  }, []);

  useEffect(() => {
    const storedData = localStorage.getItem("theme");
    if (storedData) {
      switchTheme(storedData);
    }
  }, [switchTheme]);

  return { theme, switchTheme };
};
