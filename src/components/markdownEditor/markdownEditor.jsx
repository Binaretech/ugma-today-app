import React, { useRef, useState } from "react";
import MarkDown from "react-markdown";
import styles from "./styles.module.css";
import FormatItalicIcon from "@material-ui/icons/FormatItalic";
import FormatUnderlinedIcon from "@material-ui/icons/FormatUnderlined";
import FormatBoldIcon from "@material-ui/icons/FormatBold";
import FormatListNumberedIcon from "@material-ui/icons/FormatListNumbered";
import FormatListBulletedIcon from "@material-ui/icons/FormatListBulleted";
import ImageIcon from "@material-ui/icons/Image";
import LinkIcon from "@material-ui/icons/Link";
import { Divider, IconButton } from "@material-ui/core";
import { useTextEdit } from "./functions.js";

export default function MarkDownEditor() {
  const [
    value,
    textarea,
    onChange,
    onBold,
    onItalic,
    onOrderedList,
    onUnOrderedList,
  ] = useTextEdit();
  const preview = useRef();

  function onScroll(event) {
    preview.current.scrollTop = event.target.scrollTop;
  }

  return (
    <div className={styles.container}>
      <div>
        <IconButton onClick={onBold}>
          <FormatBoldIcon />
        </IconButton>
        <IconButton onClick={onItalic}>
          <FormatItalicIcon />
        </IconButton>
        <IconButton onClick={onOrderedList}>
          <FormatListNumberedIcon />
        </IconButton>
        <IconButton onClick={onUnOrderedList}>
          <FormatListBulletedIcon />
        </IconButton>
      </div>
      <div className={styles.editor}>
        <textarea ref={textarea} onChange={onChange} onScroll={onScroll} />
        <Divider orientation="vertical" />
        <div className={styles.preview} ref={preview}>
          <MarkDown>{value}</MarkDown>
        </div>
      </div>
    </div>
  );
}
