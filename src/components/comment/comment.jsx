import React, { useState } from 'react';
import { Avatar, Card } from '@material-ui/core';
import LikesAndComments from '../likesAndComments';
import Loader from '../loader/Loader';
import ReactMarkdown from 'react-markdown';
import { trans } from '../../trans/trans';
import { useOnReply, useHandleRepliesPagination, useOnLike } from './functions';
import dayjs from 'dayjs';
import styles from './styles.module.css';
import { Button } from '@material-ui/core';
import MarkDownEditor from '../markdownEditor';
import { useSelector } from 'react-redux';

export default function Comment({
  comment,
  className,
  dispatch,
  reply,
  replies,
}) {
  const [fetchReplies, loading] = useHandleRepliesPagination(dispatch);
  const [like, unlike] = useOnLike(comment?.id, dispatch, reply);
  const [minimized, setMinimized] = useState(true);
  const [value, setValue, replyComment] = useOnReply(comment?.id, dispatch);
  const hasLoggedUser = useSelector((state) => !!state.sessionReducer.token);

  const loadMore = (page, id) => {
    if (comment?.repliesCount === replies?.length || !replies) return;

    return loading ? (
      <div className={styles.loadMore}>
        <Loader />
      </div>
    ) : (
      <Button
        className={styles.loadMore}
        variant="text"
        onClick={fetchReplies(page, id)}
      >
        {trans('words.loadMore')}
      </Button>
    );
  };

  function onFocusEditor() {
    setMinimized(false);
  }

  function onBlurEditor() {
    setMinimized(true);
  }

  function onChange(value) {
    setValue(value);
  }

  return (
    <div className={`${styles.comment} ${className || ''}`.trimEnd()}>
      <Card className={styles.commentCard}>
        <div className={styles.commentAuthor}>
          <Avatar src={comment?.user?.profileImage} />
          <p>
            {comment?.user?.profile?.fullname} ({comment?.user?.username})
          </p>
        </div>
        <ReactMarkdown>{comment?.comment}</ReactMarkdown>
        <div className={styles.footer}>
          <LikesAndComments
            likedByUser={comment.likedByUser}
            buttons
            disableComment={reply}
            likesCount={comment?.likes}
            commentsCount={comment?.repliesCount}
            onClickLike={comment?.likedByUser ? unlike : like}
          />
          <div className={styles.timestamp}>
            <p>{dayjs(comment?.createdAt).fromNow()}</p>
          </div>
        </div>
      </Card>
      <div className={styles.replies}>
        {loadMore(replies?.currentPage || 1, comment?.id)}

        {replies?.map?.((reply, index) => (
          <Comment
            reply
            className={styles.comment}
            key={reply?.id + '-' + index}
            comment={reply}
            dispatch={dispatch}
          />
        ))}

        {!comment.reply_to_id && hasLoggedUser && (
          <div className={styles.replyContainer}>
            <MarkDownEditor
              minimized={minimized && !value.trim()}
              onFocus={onFocusEditor}
              onBlur={onBlurEditor}
              onChange={onChange}
              value={value}
            />

            {(!minimized || value.trim()) && (
              <div className={styles.replyButton}>
                <Button
                  onClick={replyComment}
                  variant="contained"
                  color="primary"
                >
                  {trans('words.answer')}
                </Button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
