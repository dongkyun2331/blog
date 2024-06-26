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

      // Extract the language class from the code element
      const languageClass = code.className
        .split(" ")
        .find((cls) => cls.startsWith("language-"));
      if (languageClass) {
        const language = languageClass.replace("language-", "");
        const langLabel = document.createElement("span");
        langLabel.innerText = language;
        langLabel.style.position = "absolute";
        langLabel.style.top = "5px";
        langLabel.style.left = "5px";
        langLabel.style.background = "#333";
        langLabel.style.color = "white";
        langLabel.style.padding = "2px 5px";
        langLabel.style.fontSize = "0.8em";
        langLabel.style.borderRadius = "3px";
        langLabel.style.marginRight = "10px"; // Add margin to separate from the code
        pre.appendChild(langLabel);
      }

      pre.style.position = "relative";
      pre.style.paddingTop = "30px"; // Add padding to prevent overlap with the buttons and labels
      pre.appendChild(button);
    });
  }, []);

  return (
    <div className={utilStyles.container}>
      <Head>
        <title>{postData.title}</title>
        <meta name="description" content={postData.description} />
        <meta name="keywords" content={postData.keywords.join(", ")} />
        <meta name="author" content={postData.author} />
        <meta property="og:title" content={postData.title} />
        <meta property="og:description" content={postData.description} />
        <meta property="og:type" content="article" />
        <meta
          property="og:url"
          content={`https://fori8181.vercel.app/posts/${postData.id}`}
        />
        <meta
          property="og:image"
          content="https://fori8181.vercel.app/static/images/og-image.png"
        />
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
