import React from "react";
import { useFetchNews } from "./functions";
import Loader from "../../components/loader/Loader";
import NewsTile from "../../components/newsTile";
import { List, ListItem } from "@material-ui/core";
import styles from "./styles.module.css";
import { trans } from "../../trans/trans";

export default function News() {
  const [loading, news] = useFetchNews();

  return loading ? (
    <div className={styles.loader}>
      <Loader />
    </div>
  ) : news.length > 0 ? (
    <List className={styles.container}>
      {news.map((item) => (
        <ListItem key={item.id}>
          <NewsTile news={item} />
        </ListItem>
      ))}
    </List>
  ) : (
    <div className={styles.emptyResults}>
      <p>{trans("words.emptyResults")}</p>
    </div>
  );
}
