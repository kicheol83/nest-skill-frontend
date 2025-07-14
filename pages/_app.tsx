import type { AppProps } from "next/app";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import { dark, light } from "../scss/MaterialTheme";
import { useEffect, useMemo, useState } from "react";
import "../scss/app.scss";

export default function App({ Component, pageProps }: AppProps) {
  const [mode, setMode] = useState<"light" | "dark">("light");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedTheme = localStorage.getItem("theme") as
        | "light"
        | "dark"
        | null;
      if (savedTheme) {
        setMode(savedTheme);
      }
    }
  }, []);

  // Theme ni qayta hisoblash
  const theme = useMemo(() => {
    return createTheme(mode === "light" ? light : dark);
  }, [mode]);

  // Toggle qilish funksiyasi (agar kerak bo‘lsa prop orqali uzataman)

  // Theme context yoki makeVar bilan qilishim kerak!!!
  const toggleTheme = () => {
    const newMode = mode === "light" ? "dark" : "light";
    setMode(newMode);
    localStorage.setItem("theme", newMode);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Component {...pageProps} />
    </ThemeProvider>
  );
}
