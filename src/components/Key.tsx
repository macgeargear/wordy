import { useContext } from "react";
import { AppContext } from "../App";

type Props = {
  keyVal: string;
};

const Key = ({ keyVal }: Props) => {
  const { onDelete, onSelectLetter, onEnter } = useContext(AppContext);

  const selectLetter = () => {
    if (keyVal === "ENTER") {
      onEnter();
    } else if (keyVal === "DELETE") {
      onDelete();
    } else {
      onSelectLetter(keyVal);
    }
  };
  const keyWidth = keyVal === "ENTER" || keyVal === "DELETE" ? "w-30" : "w-12";
  const keyStyle = `${keyWidth} h-16 m-1 p-1 rounded-lg grid text-xl text-pink-700 cursor-pointer bg-gray-200 hover:bg-gray-400 hover:text-white ease-in-out duration-300`;
  return (
    <div className={`${keyStyle}`} onClick={selectLetter}>
      {keyVal}
    </div>
  );
};

export default Key;
