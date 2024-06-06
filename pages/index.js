// pages/index.js
import dynamic from "next/dynamic";
import { getSortedPostsData } from "../lib/posts";

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
  return <DynamicBlogList allPostsData={allPostsData} />;
}
