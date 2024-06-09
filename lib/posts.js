import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";
import prism from "remark-prism";

const postsDirectory = path.join(process.cwd(), "_posts");

export function getSortedPostsData() {
  const fileNames = fs.readdirSync(postsDirectory);
  const allPostsData = fileNames.map((fileName) => {
    const id = fileName.replace(/\.md$/, "");

    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, "utf8");

    try {
      const matterResult = matter(fileContents);

      return {
        id,
        ...matterResult.data,
      };
    } catch (error) {
      console.error(`Error processing file: ${fileName}`, error);
      return {
        id,
        title: "Error",
        date: "Invalid date",
      };
    }
  });

  return allPostsData.sort((a, b) => {
    if (a.date < b.date) {
      return 1;
    } else {
      return -1;
    }
  });
}

export function getAllPostIds() {
  const fileNames = fs.readdirSync(postsDirectory);
  return fileNames.map((fileName) => {
    return {
      params: {
        id: fileName.replace(/\.md$/, ""),
      },
    };
  });
}

export async function getPostData(id) {
  const fullPath = path.join(postsDirectory, `${id}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");

  try {
    const matterResult = matter(fileContents);

    const processedContent = await remark()
      .use(html, { sanitize: false })
      .use(prism)
      .process(matterResult.content);
    const contentHtml = processedContent.toString();

    return {
      id,
      contentHtml,
      ...matterResult.data,
    };
  } catch (error) {
    console.error(`Error processing file: ${id}.md`, error);
    return {
      id,
      contentHtml: "Error processing content",
      title: "Error",
      date: "Invalid date",
    };
  }
}
