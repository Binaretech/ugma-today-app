import React from "react";
import { Avatar, Card } from "@material-ui/core";
import dayjs from "dayjs";
import ReactMarkdown from "react-markdown";
import ThumbUpAltIcon from "@material-ui/icons/ThumbUpAltOutlined";
import InsertCommentOutlinedIcon from "@material-ui/icons/InsertCommentOutlined";
import styles from "./styles.module.css";

export default function NewsContent({ news }) {
  return (
    <Card className={styles.card}>
      <div className={styles.title}>
        <h2>{news?.title}</h2>
      </div>
      <div className={styles.author}>
        <Avatar src={news?.user?.profileImage} />
        <p>
          {news?.user?.profile?.fullname} ({news?.user?.username})
        </p>
      </div>
      <ReactMarkdown>{news?.content}</ReactMarkdown>
      <div className={styles.newsFooter}>
        <div className={styles.scores}>
          <div className={styles.score}>
            <ThumbUpAltIcon />
            <p>{news?.likesCount ?? 0}</p>
          </div>
          <div className={styles.score}>
            <InsertCommentOutlinedIcon />
            <p>{news?.commentsCount ?? 0}</p>
          </div>
        </div>
        <div className={styles.timestamp}>
          <p>{dayjs(news?.createdAt).fromNow()}</p>
        </div>
      </div>
    </Card>
  );
}
