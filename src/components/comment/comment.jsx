import React from 'react';
import { Avatar, Card } from '@material-ui/core';
import LikesAndComments from '../likesAndComments';
import Loader from '../loader/Loader';
import ReactMarkdown from 'react-markdown';
import { trans } from '../../trans/trans';
import { useHandleRepliesPagination } from './functions';
import dayjs from 'dayjs';
import styles from './styles.module.css';
import { Button } from '@material-ui/core';

export default function Comment({ comment, className, dispatch, reply }) {
  const [fetchReplies, loading] = useHandleRepliesPagination(dispatch);

  const loadMore = (page, id) => {
    if (comment?.repliesCount === comment?.replies?.ids?.length) return;

    return loading ? (
      <div className={styles.loadMore}>
        <Loader />
      </div>
    ) : (
      <Button
        className={styles.loadMore}
        variant="flat"
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
            disableComment={reply}
            likesCount={comment?.likes}
            commentsCount={comment?.repliesCount}
          />
          <div className={styles.timestamp}>
            <p>{dayjs(comment?.createdAt).fromNow()}</p>
          </div>
        </div>
      </Card>
      <div className={styles.replies}>
        {loadMore(comment?.replies?.currentPage || 1, comment?.id)}
        {comment?.replies?.ids?.map?.((id) => (
          <Comment
            reply
            className={styles.comment}
            key={id}
            comment={comment.replies.data[id]}
          />
        ))}
      </div>
    </div>
  );
}
