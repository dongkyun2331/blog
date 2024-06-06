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
      <nav>
        <Link href="/">
          <h1>FORI</h1>
        </Link>
      </nav>
      {children}
      <button onClick={toggleSidebar} className={utilStyles.sidebarButton}>
        =
      </button>
      <Sidebar isOpen={isSidebarOpen} onClose={toggleSidebar}>
        <h2 className={utilStyles.headingLg}>YouTube Audio Player</h2>
        <YoutubeAudioPlayer />
      </Sidebar>
    </div>
  );
}
