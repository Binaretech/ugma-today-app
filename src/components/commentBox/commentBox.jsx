import React from "react";
import { Button } from "@material-ui/core";
import MarkDownEditor from "../markdownEditor";
import { trans } from "../../trans/trans";
import styles from "./styles.module.css";

export default function CommentBox() {
  return (
    <div className={styles.container}>
      <MarkDownEditor />
      <Button className={styles.button} variant="contained" color="primary">
        {trans("words.comment")}
      </Button>
    </div>
  );
}
