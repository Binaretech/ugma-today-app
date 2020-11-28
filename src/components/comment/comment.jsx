import React from "react";
import { Avatar, Card } from "@material-ui/core";
import LikesAndComments from "../likesAndComments";
import ReactMarkdown from "react-markdown";
import dayjs from "dayjs";
import styles from "./styles.module.css";

export default function Comment({ comment, className }) {
  return (
    <Card className={`${styles.comment} ${className || ""}`.trimEnd()}>
      <div className={styles.commentAuthor}>
        <Avatar src={comment?.user?.profileImage} />
        <p>
          {comment?.user?.profile?.fullname} ({comment?.user?.username})
        </p>
      </div>
      <ReactMarkdown>{comment?.comment}</ReactMarkdown>
      <div className={styles.footer}>
        <LikesAndComments
          likesCount={comment?.likes}
          commentsCount={comment?.replies}
        />
        <div className={styles.timestamp}>
          <p>{dayjs(comment.createdAt).fromNow()}</p>
        </div>
      </div>
    </Card>
  );
}
