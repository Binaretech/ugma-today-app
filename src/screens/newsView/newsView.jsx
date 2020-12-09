import React from "react";
import Loader from "../../components/loader/Loader";
import NewsContent from "../../components/newsContent";
import Comment from "../../components/comment";
import { useHandleNews } from "./function";
import { useHandleComment } from "./function";
import CommentBox from "../../components/commentBox/commentBox";
import styles from "./styles.module.css";

export default function NewsView() {
  const [loading, news, dispatch] = useHandleNews();
  const [comment, commentLoader] = useHandleComment(dispatch);
  return loading ? (
    <div className={styles.loaderContainer}>
      <Loader />
    </div>
  ) : (
    <div>
      <NewsContent news={news} dispatch={dispatch} />
      <div className={styles.comments}>
        {news?.comments?.map((comment) => (
          <Comment
            className={styles.comment}
            key={comment?.id}
            comment={comment}
          />
        ))}
        <div className={styles.add_comment}>
					{commentLoader? <div className={styles.centerLoader}><Loader/></div> :<CommentBox onClick={comment} />}
        </div>
      </div>
    </div>
  );
}
