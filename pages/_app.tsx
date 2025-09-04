import type { AppProps } from "next/app";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import { light } from "../scss/MaterialTheme";
import { useState } from "react";
import "../scss/app.scss";
import "../scss/pc/main.scss";
import { appWithTranslation } from "next-i18next";
import { ApolloProvider } from "@apollo/client";
import { useApollo } from "@/apollo/client";
import { GoogleOAuthProvider } from "@react-oauth/google";

const App = ({ Component, pageProps }: AppProps) => {
  const [mode, setMode] = useState<"light" | "dark">("light");
  const client = useApollo(pageProps.initialApolloState);

  // @ts-ignore
  const [theme, setTheme] = useState(createTheme(light));

  const toggleTheme = () => {
    const newMode = mode === "light" ? "dark" : "light";
    setMode(newMode);
    localStorage.setItem("theme", newMode);
  };

  return (
    <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!}>
      <ApolloProvider client={client}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Component {...pageProps} />
        </ThemeProvider>
      </ApolloProvider>
    </GoogleOAuthProvider>
  );
};

export default appWithTranslation(App);
