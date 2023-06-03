import React, { useContext } from "react";
import { boardDefault } from "./words";
import { AppContext } from "../App";

type Props = {
  letterPos: number;
  attemptVal: number;
};

const Letter = ({ letterPos, attemptVal }: Props) => {
  const { board, correctWord } = useContext(AppContext);
  const letter = board[attemptVal][letterPos];

  const correct = correctWord[letterPos] === letter;
  const almost = !correct && letter !== "" && correctWord.includes(letter);
  let letterState = "";
  if (correct) {
    letterState = "correct";
  } else if (almost) {
    letterState = "almost";
  } else {
    letterState = "error";
  }

  return (
    <div
      id={letterState}
      className="text-center text-white m-1 rounded-xl text-2xl w-14 h-14 flex justify-center items-center"
    >
      {letter}
    </div>
  );
};

export default Letter;
