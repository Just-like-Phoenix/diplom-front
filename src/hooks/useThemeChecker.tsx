import { useEffect, useState } from "react";

export function useThemeChecker() {
  const [preferredTheme, setPreferredTheme] = useState("light");

  useEffect(() => {
    setPreferredTheme(
      window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light"
    );
  }, [preferredTheme]);
  return preferredTheme;
}
