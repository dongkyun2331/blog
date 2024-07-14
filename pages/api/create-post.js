import fs from "fs";
import path from "path";
import { simpleGit } from "simple-git";

const git = simpleGit();

if (process.env.GIT_USER && process.env.GIT_TOKEN) {
  git.env("GIT_ASKPASS", "echo");
  git.env("GIT_USERNAME", process.env.GIT_USER);
  git.env("GIT_PASSWORD", process.env.GIT_TOKEN);
}

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { title, author, keywords, content } = req.body;
    const date = new Date().toISOString().split("T")[0];

    const postsDir = path.join(process.cwd(), "_posts");

    // 폴더가 존재하는지 확인
    if (!fs.existsSync(postsDir)) {
      console.error("Posts directory does not exist:", postsDir);
      return res.status(500).json({ error: "Posts directory does not exist" });
    }

    const files = fs.readdirSync(postsDir);
    const postNumbers = files
      .map((file) => parseInt(file.split(".")[0], 10))
      .filter((num) => !isNaN(num));

    const nextPostNumber = Math.max(0, ...postNumbers) + 1;
    const nextFileName = `${nextPostNumber}. ${title.replace(/\s+/g, "-")}.md`;
    const filePath = path.join(postsDir, nextFileName);

    const fileContent = `---
title: "${nextPostNumber}. ${title}"
date: "${date}"
author: "${author}"
keywords: ${JSON.stringify(keywords)}
---

${content}
`;

    try {
      console.log("Writing file:", filePath);
      await fs.promises.writeFile(filePath, fileContent);

      console.log("Adding to git:", filePath);
      await git.add(filePath);
      console.log("Committing to git:", filePath);
      await git.commit(`Add new post: ${nextPostNumber}. ${title}`);
      console.log("Pushing to git repository");
      await git.push("origin", "main");

      res.status(200).json({
        message: "Post created, committed, and pushed",
        fileName: nextFileName,
      });
    } catch (err) {
      console.error("Error during post creation:", err);
      res
        .status(500)
        .json({ error: "Failed to create post", details: err.message });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
