import { useState } from "react";
import styles from "../styles/CreatePost.module.css";

export default function CreatePost() {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [keywords, setKeywords] = useState("");
  const [content, setContent] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch("/api/create-post", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        author,
        keywords: keywords.split(","),
        content,
      }),
    });

    const data = await response.json();
    if (response.ok) {
      setMessage(`포스트가 생성되었습니다: ${data.fileName}`);
      setTitle("");
      setAuthor("");
      setKeywords("");
      setContent("");
    } else {
      setMessage(`오류: ${data.error}`);
    }
  };

  return (
    <div className={styles.container}>
      <h1>새 글 작성하기</h1>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div>
          <label className={styles.label}>제목:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className={styles.input}
            required
          />
        </div>
        <div>
          <label className={styles.label}>작성자:</label>
          <input
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            className={styles.input}
            required
          />
        </div>
        <div>
          <label className={styles.label}>키워드 (쉼표로 구분):</label>
          <input
            type="text"
            value={keywords}
            onChange={(e) => setKeywords(e.target.value)}
            className={styles.input}
          />
        </div>
        <div>
          <label className={styles.label}>내용:</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className={styles.textarea}
            required
            rows="10"
            cols="50"
          />
        </div>
        <button type="submit" className={styles.button}>
          글 작성
        </button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}
