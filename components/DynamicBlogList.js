// components/DynamicBlogList.js
import { useState } from "react";
import Link from "next/link";
import utilStyles from "../styles/utils.module.css";

const popularSearchKeywords = ["React", "Next.js", "JavaScript", "CSS", "HTML"];

export default function DynamicBlogList({ allPostsData }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOrder, setSortOrder] = useState("newest");

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSortChange = (e) => {
    setSortOrder(e.target.value);
  };

  const filteredPosts = allPostsData
    .filter(({ title }) =>
      title.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => {
      if (sortOrder === "newest") {
        return new Date(b.date) - new Date(a.date);
      } else {
        return new Date(a.date) - new Date(b.date);
      }
    });

  return (
    <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
      <h2 className={utilStyles.headingLg}>Blog</h2>

      <input
        type="text"
        placeholder="Search posts..."
        value={searchQuery}
        onChange={handleSearchChange}
        className={utilStyles.searchInput}
      />

      <div className={utilStyles.popularSearches}>
        <ul className={utilStyles.popularSearchList}>
          {popularSearchKeywords.map((keyword) => (
            <li
              key={keyword}
              onClick={() => setSearchQuery(keyword)}
              className={utilStyles.popularSearchItem}
            >
              {keyword}
            </li>
          ))}
        </ul>
      </div>

      <div className={utilStyles.sortOptions}>
        <label>
          Sort by:
          <select
            value={sortOrder}
            onChange={handleSortChange}
            className={utilStyles.sortSelect}
          >
            <option value="newest">Newest</option>
            <option value="oldest">Oldest</option>
          </select>
        </label>
      </div>

      <ul className={utilStyles.list}>
        {filteredPosts.map(({ id, date, title }) => (
          <li className={utilStyles.listItem} key={id}>
            <Link href={`/posts/${id}`}>{title}</Link>
            <br />
            <small className={utilStyles.lightText}>{date}</small>
          </li>
        ))}
      </ul>
    </section>
  );
}
