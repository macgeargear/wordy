import React, { useCallback, useContext, useEffect } from "react";
import { keys1 } from "../config";
import { keys2 } from "../config";
import { keys3 } from "../config";
import Key from "./Key";
import { Delete } from "lucide-react";
import { AppContext } from "../App";

type Props = {};

const KeyBoard = (props: Props) => {
  const flexCenter = "flex justify-center m-1";
  const { onDelete, onSelectLetter, onEnter } = useContext(AppContext);
  const handleKeyboard = useCallback(
    (event: KeyboardEvent) => {
      console.log(event);
      if (event.key === "Enter") {
        onEnter();
      } else if (event.key === "Backspace") {
        onDelete();
      } else {
        keys1.forEach((key) => {
          if (event.key.toLowerCase() === key.toLocaleLowerCase())
            onSelectLetter(key);
        });
        keys2.forEach((key) => {
          if (event.key.toLowerCase() === key.toLocaleLowerCase())
            onSelectLetter(key);
        });
        keys3.forEach((key) => {
          if (event.key.toLowerCase() === key.toLocaleLowerCase())
            onSelectLetter(key);
        });
      }
    },
    [onSelectLetter, onDelete, onEnter]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKeyboard);
    return () => {
      document.removeEventListener("keydown", handleKeyboard);
    };
  }, [handleKeyboard]);

  return (
    <div className="my-10" onKeyDown={handleKeyboard}>
      <div className={`${flexCenter}`}>
        {keys1.map((key) => (
          <Key keyVal={key} />
        ))}
      </div>
      <div className={`${flexCenter}`}>
        {keys2.map((key) => (
          <Key keyVal={key} />
        ))}
      </div>
      <div className={`${flexCenter}`}>
        <Key keyVal="ENTER" />
        {keys3.map((key) => (
          <Key keyVal={key} />
        ))}
        <Key keyVal="DELETE" />
      </div>
    </div>
  );
};

export default KeyBoard;
