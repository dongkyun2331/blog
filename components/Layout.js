// components/Layout.js

import { useState } from "react";
import Head from "next/head";
import Link from "next/link";
import utilStyles from "../styles/utils.module.css";
import YoutubeAudioPlayer from "./YoutubeAudioPlayer";
import Sidebar from "./Sidebar"; // Import the Sidebar component

export default function Layout({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className={utilStyles.container}>
      <Head>
        <title>포리</title>
      </Head>
      <nav className={utilStyles.nav}>
        <Link href="/" style={{ textDecoration: "none", color: "inherit" }}>
          <h1>FORI</h1>
        </Link>
      </nav>
      {children}
      <button onClick={toggleSidebar} className={utilStyles.sidebarButton}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="24"
          viewBox="0 0 4"
          width="24"
          focusable="false"
          style={{
            pointerEvents: "none",
            display: "inherit",
            width: "100%",
            height: "100%",
          }}
        >
          <path d="M21 6H3V5h18v1zm0 5H3v1h18v-1zm0 6H3v1h18v-1z"></path>
        </svg>
      </button>
      <Sidebar isOpen={isSidebarOpen} onClose={toggleSidebar}>
        <YoutubeAudioPlayer />
      </Sidebar>
    </div>
  );
}
