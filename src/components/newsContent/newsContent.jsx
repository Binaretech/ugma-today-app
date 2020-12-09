import React from "react";
import { Avatar, Card } from "@material-ui/core";
import dayjs from "dayjs";
import ReactMarkdown from "react-markdown";
import LikesAndComments from "../likesAndComments";
import { useOnLike } from "./functions";
import styles from "./styles.module.css";

export default function NewsContent({ news, dispatch }) {
  const [like, unlike] = useOnLike(news?.id, dispatch);

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
        <LikesAndComments
          likesCount={news.likesCount}
          commentsCount={news.commentsCount}
          buttons
          likedByUser={news.likedByUser}
          onClickLike={news.likedByUser ? unlike : like}
        />
        <div className={styles.timestamp}>
          <p>{dayjs(news?.createdAt).fromNow()}</p>
        </div>
      </div>
    </Card>
  );
}
