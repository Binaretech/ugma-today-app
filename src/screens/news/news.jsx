import React from "react";
import { useFetchNews } from "./functions";
import Loader from "../../components/loader/Loader";
import NewsTile from "../../components/newsTile";
import { List, ListItem } from "@material-ui/core";
import styles from "./styles.module.css";

export default function News() {
  const [loading, posts] = useFetchNews();

  return loading ? (
    <div>
      <Loader />
    </div>
  ) : (
    <List className={styles.container}>
      {posts.map((post) => (
        <ListItem>
          <NewsTile key={post.id} post={post} />
        </ListItem>
      ))}
    </List>
  );
}
