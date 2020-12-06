import { useRef } from "react";
import { useState } from "react";

export function useTextEdit() {
  const [value, setValue] = useState("");
  const textarea = useRef(null);

  function moveCursor(pos, value) {
    textarea.current.focus();
    textarea.current.value = value;
    textarea.current.setSelectionRange(pos, pos);
  }

  function insertString(value, cursor, string) {
    console.log(value);
    return value.slice(0, cursor) + string + value.slice(cursor);
  }

  function onChange({ target }) {
    setValue(target.value);
  }

  function onBold() {
    const cursor = textarea.current.selectionEnd;
    const newValue = insertString(value, cursor, "****");
    setValue(newValue);

    moveCursor(cursor + 2, newValue);
  }

  function onItalic() {
    const cursor = textarea.current.selectionEnd;
    const newValue = insertString(value, cursor, "**");
    setValue(newValue);

    moveCursor(cursor + 1, newValue);
  }

  function onOrderedList() {
    const cursor = textarea.current.selectionEnd;
    const newValue = insertString(value, cursor, "\n1. ");
    setValue(newValue);
    moveCursor(cursor + 5, newValue);
  }

  function onUnOrderedList() {
    const cursor = textarea.current.selectionEnd;
    const newValue = insertString(value, cursor, "\n* ");
    setValue(newValue);
    moveCursor(cursor + 4, newValue);
  }

  return [
    value,
    textarea,
    onChange,
    onBold,
    onItalic,
    onOrderedList,
    onUnOrderedList,
  ];
}
