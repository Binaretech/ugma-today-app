import React from "react";
import Loader from "../../components/loader/Loader";
import NewsContent from "../../components/newsContent";
import Comment from "../../components/comment";
import { useFetchNews } from "./function";
import styles from "./styles.module.css";

export default function NewsView() {
  const [loading, news] = useFetchNews();

  return loading ? (
    <div className={styles.loaderContainer}>
      <Loader />
    </div>
  ) : (
    <div>
      <NewsContent news={news} />
      <div className={styles.comments}>
        {news?.comments?.map((comment) => (
          <Comment
            className={styles.comment}
            key={comment?.id}
            comment={comment}
          />
        ))}
      </div>
    </div>
  );
}
