import wordBank from "../wordle.txt";
export const boardDefault = [
  ["", "", "", "", ""],
  ["", "", "", "", ""],
  ["", "", "", "", ""],
  ["", "", "", "", ""],
  ["", "", "", "", ""],
  ["", "", "", "", ""],
];

export const generateWordSet = async (): Promise<{ wordSet: Set<string> }> => {
  const res = await fetch(wordBank);
  const data = await res.text();
  const wordArr = data.split("\n");
  const wordSet = new Set(wordArr);
  return { wordSet };
};
