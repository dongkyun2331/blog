import { useEffect } from "react";
import styles from "../styles/Sidebar.module.css";
import utilStyles from "../styles/utils.module.css";
import Link from "next/link";
import { useTheme } from "@/context/ThemeContext";

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

  const { theme, toggleTheme } = useTheme();

  return (
    <div className={`${styles.sidebar} ${isOpen ? styles.open : ""}`}>
      <div className={styles.sidebarContent}>
        <button onClick={onClose} className={styles.closeButton}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24"
            viewBox="0 0 24 24"
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
        <button onClick={toggleTheme}>
          Switch to {theme === "light" ? "Dark" : "Light"} Mode
        </button>
        {children}
        <div className={styles.githubIcon}>
          <a
            href="https://github.com/dongkyun2331"
            target="_blank"
            rel="noopener noreferrer"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="feather feather-github"
            >
              <path d="M12 2C6.48 2 2 6.48 2 12c0 4.42 2.87 8.17 6.84 9.5.5.1.66-.21.66-.48v-1.69c-2.78.61-3.37-1.34-3.37-1.34-.45-1.16-1.1-1.47-1.1-1.47-.9-.62.07-.61.07-.61 1 .07 1.53 1.02 1.53 1.02.89 1.53 2.34 1.09 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.56-1.11-4.56-4.95 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.64 0 0 .84-.27 2.75 1.02A9.57 9.57 0 0112 6.8c.85.004 1.71.11 2.52.32 1.91-1.29 2.75-1.02 2.75-1.02.55 1.37.2 2.39.1 2.64.64.7 1.03 1.59 1.03 2.68 0 3.85-2.34 4.7-4.57 4.95.36.31.68.92.68 1.86v2.77c0 .27.16.58.68.48A10.014 10.014 0 0022 12c0-5.52-4.48-10-10-10z"></path>
            </svg>
            Github
          </a>
        </div>
      </div>
    </div>
  );
}
