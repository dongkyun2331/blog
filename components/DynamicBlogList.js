import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import utilStyles from "../styles/utils.module.css";

const popularSearchKeywords = ["우분투", "자바스크립트", "js", "javascript"];

export default function DynamicBlogList({ allPostsData }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOrder, setSortOrder] = useState("newest");
  const [showNavButtons, setShowNavButtons] = useState(false);
  const sliderRef = useRef(null);

  useEffect(() => {
    const handleResize = () => {
      if (sliderRef.current) {
        const isOverflowing =
          sliderRef.current.scrollWidth > sliderRef.current.clientWidth;
        setShowNavButtons(isOverflowing);
      }
    };

    handleResize(); // 초기 실행
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSortChange = (e) => {
    setSortOrder(e.target.value);
  };

  const handleNext = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollLeft += sliderRef.current.offsetWidth;
    }
  };

  const handlePrev = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollLeft -= sliderRef.current.offsetWidth;
    }
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
    <section>
      <input
        type="text"
        placeholder="검색"
        value={searchQuery}
        onChange={handleSearchChange}
        className={utilStyles.searchInput}
      />

      <div className={utilStyles.popularSearches}>
        {showNavButtons && (
          <button onClick={handlePrev} className={utilStyles.navButton}>
            {"<"}
          </button>
        )}
        <div className={utilStyles.slider} ref={sliderRef}>
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
        {showNavButtons && (
          <button onClick={handleNext} className={utilStyles.navButton}>
            {">"}
          </button>
        )}
      </div>

      <div className={utilStyles.sortOptions}>
        <label>
          <select
            value={sortOrder}
            onChange={handleSortChange}
            className={utilStyles.sortSelect}
          >
            <option value="newest">최신순</option>
            <option value="oldest">날짜순</option>
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
