import React, { useEffect, useRef } from 'react';
import Loader from '../../components/loader/Loader';
import NewsContent from '../../components/newsContent';
import Comment from '../../components/comment';
import { Button, Divider } from '@material-ui/core';
import CommentBox from '../../components/commentBox/commentBox';
import HTTPErrorHandler from '../../components/httpErrorHandler';
import styles from './styles.module.css';
import { makeStyles } from '@material-ui/core/styles';
import {
  useHandleNews,
  useHandleComment,
  useHandleCommentPagination,
  NewsContext,
} from './function';
import { trans } from '../../trans/trans';
import { useSelector } from 'react-redux';

const useStyles = makeStyles(() => ({
  divider: {
    width: '100%',
  },
}));

export default function NewsView() {
  const [loading, news, dispatch, error] = useHandleNews();
  const [comment, commentLoader] = useHandleComment(dispatch);
  const hasLoggedUser = useSelector((state) => !!state?.sessionReducer?.token);
  const [fetchComments, commentsLoading] = useHandleCommentPagination(dispatch);
  const classes = useStyles();

  const loadMore = () => {
    if (news?.comments?.ids?.length === news.commentsCount) return;

    return commentsLoading ? (
      <div className={styles.loadMore}>
        <Loader />
      </div>
    ) : (
      <Button
        className={styles.loadMore}
        variant="text"
        onClick={fetchComments(news?.comments?.currentPage + 1)}
      >
        {trans('words.loadMore')}
      </Button>
    );
  };

  return loading ? (
    <div className={styles.loaderContainer}>
      <Loader />
    </div>
  ) : (
    <HTTPErrorHandler error={error}>
      <NewsContext.Provider value={dispatch}>
        <div>
          <NewsContent news={news} dispatch={dispatch} />
          <div className={styles.comments}>
            {news?.comments?.ids?.map?.((id) => (
              <Comment
                className={styles.comment}
                key={id}
                dispatch={dispatch}
                comment={news?.comments?.data?.[id]}
                replies={news?.comments?.data?.[id]?.replies?.ids?.map?.(
                  (id) => news?.replies?.[id],
                )}
              />
            ))}

            {loadMore()}
            <Divider className={classes.divider} />
            {hasLoggedUser && (
              <div className={styles.add_comment}>
                {commentLoader ? (
                  <div className={styles.centerLoader}>
                    <Loader />
                  </div>
                ) : (
                  <CommentBox onClick={comment} />
                )}
              </div>
            )}
          </div>
        </div>
      </NewsContext.Provider>
    </HTTPErrorHandler>
  );
}
