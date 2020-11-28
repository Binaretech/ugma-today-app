import React from "react";
import ThumbUpAltIcon from "@material-ui/icons/ThumbUpAltOutlined";
import InsertCommentOutlinedIcon from "@material-ui/icons/InsertCommentOutlined";
import styles from "./styles.module.css";

export default function LikesAndComents({ likesCount, commentsCount }) {
  return (
    <div className={styles.scores}>
      <div className={styles.score}>
        <ThumbUpAltIcon />
        <p>{likesCount ?? 0}</p>
      </div>
      <div className={styles.score}>
        <InsertCommentOutlinedIcon />
        <p>{commentsCount ?? 0}</p>
      </div>
    </div>
  );
}
