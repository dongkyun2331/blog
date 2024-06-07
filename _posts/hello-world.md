---
title: "Hello World"
date: "2024-06-02"
author: "포리"
---

# hello

hello

```jsx
import Head from "next/head";
import { getAllPostIds, getPostData } from "../../lib/posts";
import utilStyles from "../../styles/utils.module.css";
import { useEffect } from "react";

export async function getStaticProps({ params }) {
  const postData = await getPostData(params.id);
  return {
    props: {
      postData,
    },
  };
}

export async function getStaticPaths() {
  const paths = getAllPostIds();
  return {
    paths,
    fallback: false,
  };
}

const copyToClipboard = (text, button) => {
  navigator.clipboard
    .writeText(text)
    .then(() => {
      const originalText = button.innerText;
      button.innerText = "복사됨";
      setTimeout(() => {
        button.innerText = originalText;
      }, 2000);
    })
    .catch((err) => {
      console.error("복사 실패: ", err);
    });
};

export default function Post({ postData }) {
  useEffect(() => {
    document.querySelectorAll("pre").forEach((pre) => {
      const code = pre.querySelector("code");
      const button = document.createElement("button");
      button.innerText = "복사";
      button.style.position = "absolute";
      button.style.top = "5px";
      button.style.right = "5px";
      button.style.background = "#4CAF50";
      button.style.color = "white";
      button.style.border = "none";
      button.style.padding = "5px 10px";
      button.style.cursor = "pointer";

      button.addEventListener("click", () => {
        copyToClipboard(code.innerText, button);
      });

      pre.style.position = "relative";
      pre.appendChild(button);
    });
  }, []);

  return (
    <div className={utilStyles.container}>
      <Head>
        <title>{postData.title}</title>
      </Head>
      <article>
        <h1 className={utilStyles.headingXl}>{postData.title}</h1>
        <div className={utilStyles.lightText}>{postData.date}</div>
        <div className={utilStyles.lightText}>Author: {postData.author}</div>
        <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
      </article>
    </div>
  );
}
```