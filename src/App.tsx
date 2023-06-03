import { useState, createContext, useContext, useEffect } from "react";
import Board from "./components/Board";
import KeyBoard from "./components/Keyboard";
import { boardDefault, generateWordSet } from "./components/words";

// export interface appContextValue {
//   board: string;
//   setBoard: React.Dispatch<React.SetStateAction<string>>;
// }

export const AppContext = createContext();

function App() {
  const [board, setBoard] = useState<string[][]>(boardDefault);
  const [currAttempt, setCurrAttempt] = useState({ attempt: 0, letterPos: 0 });
  const correctWord = "RIGHT";
  const [wordSet, setWordSet] = useState<Set<string>>(new Set<string>());

  useEffect(() => {
    generateWordSet().then((words) => setWordSet(words.wordSet));
  }, []);

  const onSelectLetter = (keyVal: string) => {
    if (currAttempt.letterPos > 4) return;
    const newBoard = [...board];
    newBoard[currAttempt.attempt][currAttempt.letterPos] = keyVal;
    setBoard(newBoard);
    setCurrAttempt({ ...currAttempt, letterPos: currAttempt.letterPos + 1 });
    console.log(currAttempt);
  };
  const onDelete = () => {
    if (currAttempt.letterPos === 0) return;
    const newBoard = [...board];
    newBoard[currAttempt.attempt][currAttempt.letterPos - 1] = "";
    setBoard(newBoard);
    setCurrAttempt({ ...currAttempt, letterPos: currAttempt.letterPos - 1 });

    console.log(currAttempt);
  };

  const onEnter = () => {
    if (currAttempt.letterPos !== 5) return;
    let currWord = "";
    for (let i = 0; i < 5; i++) {
      currWord += board[currAttempt.attempt][i];
    }

    if (wordSet.has(currWord))
      setCurrAttempt({ attempt: currAttempt.attempt + 1, letterPos: 0 });
    else alert("Word Not Found");

    if (currWord === correctWord) alert("game ended!!");
  };
  return (
    <>
      <nav className="text-5xl text-center font-Geologica mt-10">Wordy</nav>
      <AppContext.Provider
        value={{
          board,
          setBoard,
          currAttempt,
          setCurrAttempt,
          onDelete,
          onEnter,
          onSelectLetter,
          correctWord,
        }}
      >
        <div className="flex flex-col justify-between">
          <div className="bg-rose-100 mx-auto my-8 rounded-xl p-4">
            <Board />
          </div>
          <KeyBoard />
        </div>
      </AppContext.Provider>
    </>
  );
}

export default App;
