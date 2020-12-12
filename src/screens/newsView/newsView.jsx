import React from 'react';
import Loader from '../../components/loader/Loader';
import NewsContent from '../../components/newsContent';
import Comment from '../../components/comment';
import { useHandleNews, errors } from './function';
import { useHandleComment } from './function';
import CommentBox from '../../components/commentBox/commentBox';
import Ups from '../../components/ups';
import styles from './styles.module.css';

export default function NewsView() {
  const [loading, news, dispatch, error] = useHandleNews();
  const [comment, commentLoader] = useHandleComment(dispatch);

  const showContent = () => {
    switch (error?.type) {
      case errors.INTERNAL_ERROR:
        return <Ups message={error.message} />;
      default:
        return (
          <div>
            <NewsContent news={news} dispatch={dispatch} />
            <div className={styles.comments}>
              {news?.comments?.ids?.map?.((id) => (
                <Comment
                  className={styles.comment}
                  key={id}
                  comment={news.comments.data[id]}
                />
              ))}
              <div className={styles.add_comment}>
                {commentLoader ? (
                  <div className={styles.centerLoader}>
                    <Loader />
                  </div>
                ) : (
                  <CommentBox onClick={comment} />
                )}
              </div>
            </div>
          </div>
        );
    }
  };

  return loading ? (
    <div className={styles.loaderContainer}>
      <Loader />
    </div>
  ) : (
    showContent()
  );
}
