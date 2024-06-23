import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import utilStyles from "../styles/utils.module.css";

const popularSearchKeywords = ["우분투", "js"];

// 영어와 한글 키워드 매핑
const keywordMapping = {
  우분투: "ubuntu",
  ubuntu: "우분투",
  js: "자바스크립트",
  자바스크립트: "js",
};

export default function DynamicBlogList({ allPostsData }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOrder, setSortOrder] = useState("newest");
  const [showNavButtons, setShowNavButtons] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 10;
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
    setCurrentPage(1);
  };

  const handleSortChange = (e) => {
    setSortOrder(e.target.value);
    setCurrentPage(1);
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

  const mapKeyword = (keyword) => {
    return keywordMapping[keyword] || keyword;
  };

  const filteredPosts = allPostsData
    .filter(({ title, keywords }) => {
      const lowerSearchQuery = searchQuery.toLowerCase();
      const mappedSearchQuery = mapKeyword(lowerSearchQuery);
      return (
        (title && title.toLowerCase().includes(lowerSearchQuery)) ||
        (title && title.toLowerCase().includes(mappedSearchQuery)) ||
        (keywords &&
          keywords.some(
            (keyword) =>
              keyword.toLowerCase().includes(lowerSearchQuery) ||
              keyword.toLowerCase().includes(mappedSearchQuery)
          ))
      );
    })
    .sort((a, b) => {
      if (sortOrder === "newest") {
        return new Date(b.date) - new Date(a.date);
      } else {
        return new Date(a.date) - new Date(b.date);
      }
    });

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);

  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);

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
        {currentPosts.map(({ id, date, title, keywords }) => (
          <li key={id}>
            <Link href={`/posts/${id}`}>
              <h3>{title}</h3>
            </Link>
            <p className={utilStyles.lightText}>
              {date} - {keywords ? keywords.join(", ") : ""}
            </p>
          </li>
        ))}
      </ul>

      <div className={utilStyles.pagination}>
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          이전
        </button>
        <span>
          {currentPage} / {totalPages}
        </span>
        <button
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
          }
          disabled={currentPage === totalPages}
        >
          다음
        </button>
      </div>
    </section>
  );
}
