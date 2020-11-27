import React from "react";
import { Avatar, Card } from "@material-ui/core";
import styles from "./styles.module.css";
import ThumbUpAltIcon from "@material-ui/icons/ThumbUpAltOutlined";
import InsertCommentOutlinedIcon from "@material-ui/icons/InsertCommentOutlined";

/**
 * @typedef {object} Post
 * @prop {string} title
 *
 * @param {{post: Post}} props
 */
export default function NewsTile({ post }) {
  return (
    <Card className={styles.card}>
      <div className={styles.title}>
        <h2>{post?.title}</h2>
      </div>
      <div className={styles.info}>
        <div className={styles.scores}>
          <div className={styles.score}>
            <ThumbUpAltIcon />
            <p>{post?.likes ?? 0}</p>
          </div>
          <div className={styles.score}>
            <InsertCommentOutlinedIcon />
            <p>{post?.comments ?? 0}</p>
          </div>
        </div>
        <div className={styles.author}>
          <Avatar src={post?.user?.profileImage} />
          <p>{post?.user?.username}</p>
        </div>
      </div>
    </Card>
  );
}
