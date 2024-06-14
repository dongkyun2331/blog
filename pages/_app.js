import "prismjs/themes/prism-okaidia.css";
import "../styles/globals.css";
import "../components/Layout";
import Layout from "../components/Layout";
import { ThemeProvider } from "@/context/ThemeContext";
import { useEffect } from 'react';
import Router from 'next/router';

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    const handleRouteChange = (url) => {
      fetch("/api/track", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ path: url }),
      });
    };

    Router.events.on("routeChangeComplete", handleRouteChange);

    // For the initial page load
    handleRouteChange(window.location.pathname);

    return () => {
      Router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, []);

  return (
    <ThemeProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ThemeProvider>
  );
}

export default MyApp;
