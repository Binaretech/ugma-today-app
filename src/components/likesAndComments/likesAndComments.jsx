import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import ThumbUpAltIconOutlined from '@material-ui/icons/ThumbUpAltOutlined';
import InsertCommentOutlinedIcon from '@material-ui/icons/InsertCommentOutlined';
import styles from './styles.module.css';
import { IconButton } from '@material-ui/core';
import { useState } from 'react';

export default function LikesAndComents({
  likesCount,
  commentsCount,
  likedByUser,
  buttons,
  onClickLike,
  onClickComment,
  disableComment,
}) {
  const [loading, setLoading] = useState(false);

  function clickLike() {
    const result = onClickLike();
    if (result instanceof Promise) {
      setLoading(true);
      result
        .then(() => {
          setLoading(false);
        })
        .catch(() => {
          setLoading(false);
        });
    }
  }

  return (
    <div className={styles.scores}>
      <div className={styles.score}>
        {buttons ? (
          <IconButton onClick={clickLike} disabled={loading}>
            {likedByUser ? (
              <ThumbUpAltIcon color="primary" />
            ) : (
              <ThumbUpAltIconOutlined />
            )}
          </IconButton>
        ) : likedByUser ? (
          <ThumbUpAltIcon color="primary" />
        ) : (
          <ThumbUpAltIconOutlined />
        )}
        <p>{likesCount ?? 0}</p>
      </div>
      {!disableComment && (
        <div className={styles.score}>
          {buttons ? (
            <IconButton onClick={onClickComment}>
              <InsertCommentOutlinedIcon />
            </IconButton>
          ) : (
            <InsertCommentOutlinedIcon />
          )}
          <p>{commentsCount ?? 0}</p>
        </div>
      )}
    </div>
  );
}
