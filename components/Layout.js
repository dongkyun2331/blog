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
      <nav className={utilStyles.nav}>
        <Link href="/" style={{ textDecoration: "none", color: "inherit" }}>
          <h1>FORI</h1>
        </Link>
        <ins
          className="kakao_ad_area"
          style={{ display: "none" }} // 수정된 부분
          data-ad-unit="DAN-4Ps3T4Ev2KEOiBtI"
          data-ad-width="300"
          data-ad-height="250"
        ></ins>
        <script
          type="text/javascript"
          src="//t1.daumcdn.net/kas/static/ba.min.js"
          async
        ></script>
      </nav>
      {children}
      <button onClick={toggleSidebar} className={utilStyles.sidebarButton}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="24"
          viewBox="0 0 24 24" // 여기도 '0 0 24 24'로 수정
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
