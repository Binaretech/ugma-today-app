import React, { useState } from "react";
import { Button } from "@material-ui/core";
import MarkDownEditor from "../markdownEditor";
import { trans } from "../../trans/trans";
import styles from "./styles.module.css";

export default function CommentBox({ onClick }) {
  const [value, setValue] = useState("");

  async function click() {
    if (onClick) {
      await onClick(value);
      setValue("");
    }
  }

  function onChange(value) {
    setValue(value);
  }

  return (
    <div className={styles.container}>
      <MarkDownEditor name="comment" onChange={onChange} value={value} />
      <Button
        className={styles.button}
        variant="contained"
        color="primary"
        onClick={click}
      >
        {trans("words.comment")}
      </Button>
    </div>
  );
}
