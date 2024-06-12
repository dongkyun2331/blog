// pages/index.js
import dynamic from "next/dynamic";
import { getSortedPostsData } from "../lib/posts";
import Head from "next/head";

const DynamicBlogList = dynamic(() => import("../components/DynamicBlogList"));

export async function getStaticProps() {
  const allPostsData = getSortedPostsData();
  return {
    props: {
      allPostsData,
    },
  };
}

export default function Home({ allPostsData }) {
  return (
    <>
      <Head>
        <title>포리</title>
        <meta name="description" content="개발자 포리 블로그" />
        <meta
          name="keywords"
          content="개발, 프론트엔드, 개발자, 블로그, 웹개발"
        />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://fori8181.vercel.app" />
        <meta property="og:title" content="포리" />
        <meta property="og:description" content="개발자 포리 블로그" />
        <meta
          property="og:image"
          content="https://fori8181.vercel.app/image.jpg"
        />
        <meta property="og:url" content="https://www.fori8181.vercel.app" />
        {/* Twitter meta tags */}
        <meta name="twitter:title" content="포리" />
        <meta name="twitter:description" content="개발자 포리 블로그" />
        <meta
          name="twitter:image"
          content="https://fori8181.vercel.app/image.jpg"
        />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="google-adsense-account" content="ca-pub-7533992287093885"></meta>
        <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7533992287093885"
     crossorigin="anonymous"></script>
      </Head>
      <DynamicBlogList allPostsData={allPostsData} />
    </>
  );
}
