// components/Sidebar.js

import { useEffect } from "react";
import styles from "../styles/Sidebar.module.css";
import utilStyles from "../styles/utils.module.css";
import Link from "next/link";

export default function Sidebar({ isOpen, onClose, children }) {
  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [onClose]);

  return (
    <div className={`${styles.sidebar} ${isOpen ? styles.open : ""}`}>
      <div className={styles.sidebarContent}>
        <button onClick={onClose} className={styles.closeButton}>
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
        <nav className={utilStyles.nav}>
          <Link href="/" style={{ textDecoration: "none", color: "inherit" }}>
            <h1>FORI</h1>
          </Link>
        </nav>
        {children}
      </div>
    </div>
  );
}
