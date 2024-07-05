import fs from "fs";
import path from "path";
import { simpleGit } from "simple-git";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { title, author, keywords, content } = req.body;
    const date = new Date().toISOString().split("T")[0];

    // _posts 디렉터리의 파일 목록을 가져옴
    const postsDir = path.join(process.cwd(), "_posts");
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
      // 파일 작성
      await fs.promises.writeFile(filePath, fileContent);

      // Git 커밋 및 푸시
      const git = simpleGit();
      await git.add(filePath);
      await git.commit(`Add new post: ${nextPostNumber}. ${title}`);
      await git.push("origin", "main"); // 'main' 브랜치에 푸시

      // 성공적으로 응답 전송
      res
        .status(200)
        .json({
          message: "Post created, committed, and pushed",
          fileName: nextFileName,
        });
    } catch (err) {
      // 오류 발생 시 응답 전송
      res.status(500).json({ error: "Failed to create post" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
