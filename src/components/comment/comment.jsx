import React from 'react';
import { Avatar, Card } from '@material-ui/core';
import LikesAndComments from '../likesAndComments';
import Loader from '../loader/Loader';
import ReactMarkdown from 'react-markdown';
import { trans } from '../../trans/trans';
import { useHandleRepliesPagination, useOnLike } from './functions';
import dayjs from 'dayjs';
import styles from './styles.module.css';
import { Button } from '@material-ui/core';

export default function Comment({
  comment,
  className,
  dispatch,
  reply,
  replies,
}) {
  const [fetchReplies, loading] = useHandleRepliesPagination(dispatch);
  const [like, unlike] = useOnLike(comment?.id, dispatch, reply);

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
      </div>
    </div>
  );
}
