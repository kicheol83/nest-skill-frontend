import type { AppProps } from "next/app";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import { dark, light } from "../scss/MaterialTheme";
import { useEffect, useMemo, useState } from "react";
import "../scss/app.scss";
import "../scss/pc/main.scss";
import { appWithTranslation } from "next-i18next";
import { ApolloProvider } from "@apollo/client";
import { useApollo } from "@/apollo/client";

const App = ({ Component, pageProps }: AppProps) => {
  const [mode, setMode] = useState<"light" | "dark">("light");
  const client = useApollo(pageProps.initialApolloState);

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
    <ApolloProvider client={client}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Component {...pageProps} />
      </ThemeProvider>
    </ApolloProvider>
  );
};

export default appWithTranslation(App);
